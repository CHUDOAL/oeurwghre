'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, Save, Image as ImageIcon, Crop, X } from 'lucide-react'
import { getCroppedImg } from '@/lib/cropImage'
import dynamic from 'next/dynamic'

// Dynamically import Cropper with SSR disabled to prevent build errors
const Cropper = dynamic(() => import('react-easy-crop'), { ssr: false })

type MenuItem = {
  id: string
  title: string
  image_url: string | null
  category: string
}

export default function AdminPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [filter, setFilter] = useState('')
  
  // Crop state
  const [cropImage, setCropImage] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [menuRes, imagesRes] = await Promise.all([
        supabase.from('menu_items').select('*').order('title'),
        fetch('/api/images').then(r => {
           if (!r.ok) throw new Error('Failed to fetch images')
           return r.json()
        }).catch(() => []) // Fallback to empty array on error
      ])

      if (menuRes.data) setItems(menuRes.data)
      if (Array.isArray(imagesRes)) setImages(imagesRes)
    } catch (error) {
      console.error('Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectImageToCrop = (imageName: string) => {
    setCropImage(`/menu-images/${imageName}`)
    setZoom(1)
    setCrop({ x: 0, y: 0 })
  }

  const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleSaveCrop = async () => {
    if (!cropImage || !selectedItem || !croppedAreaPixels) return

    try {
      const croppedImageBase64 = await getCroppedImg(cropImage, croppedAreaPixels)
      const filename = `crop_${selectedItem.id}_${Date.now()}.jpg`

      // Save to server
      const res = await fetch('/api/images/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: croppedImageBase64, filename })
      })

      if (res.ok) {
        const { path } = await res.json()
        
        // Update item in DB
        await supabase
          .from('menu_items')
          .update({ image_url: path })
          .eq('id', selectedItem.id)

        // Optimistic update
        setItems(items.map(i => i.id === selectedItem.id ? { ...i, image_url: path } : i))
        setSelectedItem({ ...selectedItem, image_url: path })
        setCropImage(null) // Close modal
      } else {
        alert('Ошибка сохранения картинки')
      }
    } catch (e) {
      console.error(e)
      alert('Ошибка обрезки')
    }
  }

  const filteredItems = items.filter(i => 
    i.title.toLowerCase().includes(filter.toLowerCase())
  )

  // Avoid hydration mismatch by showing loading or empty state initially if needed,
  // but here we just return the layout.
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col h-screen">
      <header className="bg-white p-4 shadow-sm flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-orange-500">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Редактор меню</h1>
        </div>
        <div className="text-sm text-gray-500">
          Найдено картинок: {images.length}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col max-w-sm">
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              placeholder="Поиск блюда..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 outline-none text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-1">
             {loading && items.length === 0 ? (
                 <div className="p-4 text-center text-gray-400">Загрузка...</div>
             ) : (
                filteredItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${
                      selectedItem?.id === item.id 
                        ? 'bg-orange-50 border-orange-200 border text-orange-900' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="w-10 h-10 rounded bg-gray-200 shrink-0 overflow-hidden relative">
                      {item.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                      )}
                    </div>
                    <div className="truncate">
                      <div className="font-medium truncate">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.category}</div>
                    </div>
                  </button>
                ))
             )}
          </div>
        </div>

        {/* Right Area: Image Gallery */}
        <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
          {selectedItem ? (
            <div className="flex flex-col h-full">
              <div className="p-4 bg-white border-b border-gray-200 shrink-0">
                <h2 className="text-lg font-bold text-gray-800 mb-1">{selectedItem.title}</h2>
                <p className="text-sm text-gray-500">Выберите картинку, чтобы обрезать её для этого блюда:</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map(img => (
                    <button
                      key={img}
                      onClick={() => handleSelectImageToCrop(img)}
                      className="group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-orange-300 transition-all bg-white"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={`/menu-images/${img}`} 
                        alt="" 
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <Crop className="text-white opacity-0 group-hover:opacity-100 drop-shadow-md" size={32} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Выберите блюдо слева</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Crop Modal */}
      {cropImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-white rounded-xl overflow-hidden w-full max-w-4xl h-[80vh] flex flex-col relative">
            <div className="flex justify-between items-center p-4 border-b shrink-0">
              <h3 className="font-bold text-lg">Обрезка изображения</h3>
              <button onClick={() => setCropImage(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 relative bg-gray-900">
              <Cropper
                image={cropImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3} // Standard food photo aspect
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="p-4 border-t flex justify-between items-center bg-white shrink-0">
              <div className="flex items-center gap-2 w-1/3">
                <span className="text-sm text-gray-500">Zoom</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCropImage(null)}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSaveCrop}
                  className="px-6 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 flex items-center gap-2"
                >
                  <Save size={18} />
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
