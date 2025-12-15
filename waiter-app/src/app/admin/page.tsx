'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, Save, Image as ImageIcon, Crop, X } from 'lucide-react'
import { getCroppedImg } from '@/lib/cropImage'
import dynamic from 'next/dynamic'

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
        }).catch(() => []) 
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
    const publicUrl = supabase.storage.from('menu-images').getPublicUrl(imageName).data.publicUrl;
    setCropImage(publicUrl);
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

      const res = await fetch('/api/images/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: croppedImageBase64, filename })
      })

      if (res.ok) {
        const { path } = await res.json()
        
        await supabase
          .from('menu_items')
          .update({ image_url: path })
          .eq('id', selectedItem.id)

        setItems(items.map(i => i.id === selectedItem.id ? { ...i, image_url: path } : i))
        setSelectedItem({ ...selectedItem, image_url: path })
        setCropImage(null) 
      } else {
        alert('Ошибка сохранения')
      }
    } catch (e) {
      console.error(e)
      alert('Ошибка')
    }
  }

  const filteredItems = items.filter(i => 
    i.title.toLowerCase().includes(filter.toLowerCase())
  )
  
  return (
    <div className="min-h-screen bg-white flex flex-col h-screen font-sans">
      <header className="bg-white p-4 flex items-center justify-between shrink-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-bold text-slate-900">Редактор меню</h1>
        </div>
        <div className="text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
          База: {images.length} фото
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-slate-50 border-r border-slate-100 flex flex-col max-w-sm">
          <div className="p-4">
            <input
              type="text"
              placeholder="Поиск блюда..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="app-input bg-white shadow-sm"
            />
          </div>
          <div className="overflow-y-auto flex-1 px-3 pb-3 space-y-1">
             {loading && items.length === 0 ? (
                 <div className="p-8 text-center text-slate-400 font-medium">Загрузка...</div>
             ) : (
                filteredItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${
                      selectedItem?.id === item.id 
                        ? 'bg-white shadow-md ring-1 ring-black/5' 
                        : 'hover:bg-white/50 hover:shadow-sm'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-200 shrink-0 overflow-hidden relative">
                      {item.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400" />
                      )}
                    </div>
                    <div className="truncate flex-1">
                      <div className="font-bold text-slate-700 text-sm truncate">{item.title}</div>
                      <div className="text-xs text-slate-400 font-medium">{item.category}</div>
                    </div>
                  </button>
                ))
             )}
          </div>
        </div>

        {/* Right Area: Image Gallery */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden relative">
          
          {selectedItem ? (
            <div className="flex flex-col h-full relative z-10">
              <div className="p-6 border-b border-slate-100 shrink-0 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedItem.title}</h2>
                  <p className="text-sm text-slate-500 mt-1">Выберите фото для обрезки</p>
                </div>
                {selectedItem.image_url && (
                   <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selectedItem.image_url} alt="" className="w-full h-full object-cover" />
                   </div>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map(img => (
                    <button
                      key={img}
                      onClick={() => handleSelectImageToCrop(img)}
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={supabase.storage.from('menu-images').getPublicUrl(img).data.publicUrl} 
                        alt="" 
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white p-3 rounded-full shadow-lg">
                          <Crop className="text-slate-900" size={20} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ImageIcon size={32} className="text-slate-300" />
              </div>
              <p className="font-medium">Выберите блюдо из списка слева</p>
            </div>
          )}
        </div>
      </div>

      {/* Crop Modal */}
      {cropImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <h3 className="font-bold text-lg text-slate-900">Кадрирование</h3>
              <button onClick={() => setCropImage(null)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 relative bg-slate-100">
              {/* @ts-ignore */}
              <Cropper
                image={cropImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3} 
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-white shrink-0">
              <div className="flex items-center gap-4 w-1/3">
                <span className="text-xs font-bold uppercase text-slate-400">Зум</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setCropImage(null)}
                  className="px-6 py-3 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSaveCrop}
                  className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition-colors shadow-lg shadow-slate-900/20 flex items-center gap-2"
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
