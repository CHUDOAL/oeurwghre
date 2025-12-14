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
  
  return (
    <div className="min-h-screen bg-[#e6e6fa] flex flex-col h-screen font-sans text-[#2c2c54]">
      <header className="bg-white p-4 shadow-sm flex items-center justify-between shrink-0 z-10 border-b-2 border-[#ffb7c5]">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[#ffb7c5] hover:text-[#2c2c54]">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold font-serif uppercase tracking-wider">РЕДАКТОР МЕНЮ</h1>
        </div>
        <div className="text-sm font-bold bg-[#f0f8ff] px-3 py-1 rounded-full border border-[#a0d8ef] text-[#a0d8ef]">
          КАРТИНОК В БАЗЕ: {images.length}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-white border-r-2 border-[#e6e6fa] flex flex-col max-w-sm shadow-lg z-10">
          <div className="p-4 border-b border-[#f0f0f0]">
            <input
              type="text"
              placeholder="ПОИСК БЛЮДА..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full retro-input uppercase text-sm"
            />
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-1">
             {loading && items.length === 0 ? (
                 <div className="p-4 text-center text-gray-400 font-bold">ЗАГРУЗКА...</div>
             ) : (
                filteredItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all border-2 ${
                      selectedItem?.id === item.id 
                        ? 'bg-[#fff0f5] border-[#ffb7c5] shadow-sm' 
                        : 'bg-white border-transparent hover:border-[#e6e6fa]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded bg-gray-100 shrink-0 overflow-hidden relative border border-gray-200">
                      {item.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />
                      )}
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-sm truncate uppercase">{item.title}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.category}</div>
                    </div>
                  </button>
                ))
             )}
          </div>
        </div>

        {/* Right Area: Image Gallery */}
        <div className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] flex flex-col overflow-hidden relative">
          <div className="scanlines"></div>
          
          {selectedItem ? (
            <div className="flex flex-col h-full relative z-10">
              <div className="p-4 bg-white/90 border-b-2 border-[#a0d8ef] shrink-0 backdrop-blur-sm">
                <h2 className="text-lg font-bold text-[#2c2c54] font-serif uppercase">{selectedItem.title}</h2>
                <p className="text-xs text-gray-500 font-bold uppercase">ВЫБЕРИТЕ ИЗОБРАЖЕНИЕ ДЛЯ ОБРЕЗКИ:</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map(img => (
                    <button
                      key={img}
                      onClick={() => handleSelectImageToCrop(img)}
                      className="group relative aspect-square rounded-xl overflow-hidden border-2 border-white hover:border-[#ffb7c5] transition-all bg-white shadow-sm hover:shadow-md hover:-translate-y-1"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={supabase.storage.from('menu-images').getPublicUrl(img).data.publicUrl} 
                        alt="" 
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#ffb7c5]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                        <Crop className="text-white drop-shadow-md" size={32} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 relative z-10">
              <div className="text-center bg-white/50 p-8 rounded-2xl border-2 border-dashed border-[#e6e6fa]">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50 text-[#a0d8ef]" />
                <p className="font-bold text-sm uppercase">ВЫБЕРИТЕ БЛЮДО СЛЕВА</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Crop Modal */}
      {cropImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2c2c54]/80 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl overflow-hidden w-full max-w-4xl h-[80vh] flex flex-col relative border-4 border-[#ffb7c5] shadow-[0_0_0_4px_white]">
            <div className="flex justify-between items-center p-4 border-b-2 border-[#f0f0f0] shrink-0 bg-white">
              <h3 className="font-bold text-lg font-serif uppercase text-[#2c2c54]">КАДРИРОВАНИЕ</h3>
              <button onClick={() => setCropImage(null)} className="text-gray-400 hover:text-red-400 transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 relative bg-gray-100">
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

            <div className="p-4 border-t-2 border-[#f0f0f0] flex justify-between items-center bg-white shrink-0">
              <div className="flex items-center gap-2 w-1/3">
                <span className="text-xs font-bold uppercase text-gray-500">МАСШТАБ</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-[#ffb7c5]"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCropImage(null)}
                  className="px-4 py-2 rounded-lg text-gray-500 font-bold uppercase hover:bg-gray-100 transition-colors"
                >
                  ОТМЕНА
                </button>
                <button
                  onClick={handleSaveCrop}
                  className="px-6 py-2 rounded-lg bg-[#ffb7c5] text-white font-bold uppercase hover:bg-[#ffadd0] flex items-center gap-2 shadow-md border-2 border-[#fff0f5]"
                >
                  <Save size={18} />
                  СОХРАНИТЬ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
