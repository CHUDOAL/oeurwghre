'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Search, Image as ImageIcon, X } from 'lucide-react'

type MenuItem = {
  id: string
  title: string
  description: string
  image_url: string
  price: number
  category: string
}

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Все')
  const [categories, setCategories] = useState<string[]>(['Все'])
  
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    const { data } = await supabase.from('menu_items').select('*')
    if (data) {
      setItems(data)
      const uniqueCategories = Array.from(new Set(data.map((i) => i.category || 'Прочее')))
      setCategories(['Все', ...uniqueCategories])
    }
    setLoading(false)
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      <header className="bg-white sticky top-0 z-30 border-b border-slate-100 px-4 py-3 flex items-center gap-4 safe-top">
        <Link href="/" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-slate-900">Меню</h1>
      </header>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        
        {/* Search & Filter */}
        <div className="space-y-3 sticky top-16 z-20 bg-slate-50 pt-2 pb-2">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Поиск блюд..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="app-input pl-11 rounded-full shadow-sm"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white shadow-md'
                    : 'bg-white text-slate-500 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 font-medium">Загрузка меню...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 text-slate-400 font-medium">Ничего не найдено</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="app-card overflow-hidden group cursor-pointer hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                  {item.image_url ? (
                     <Image 
                       src={item.image_url} 
                       alt={item.title}
                       fill
                       className="object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-slate-100">
                      <ImageIcon className="text-slate-300" />
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">{item.title}</h3>
                    <span className="font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg text-sm whitespace-nowrap ml-2">
                      {item.price} ₽
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2">{item.description || 'Нажмите, чтобы прочитать описание'}</p>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Подробнее</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in zoom-in-95 max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 backdrop-blur-sm transition-colors"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <div className="aspect-video relative bg-slate-100 shrink-0">
               {selectedItem.image_url ? (
                  <Image 
                      src={selectedItem.image_url} 
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                  />
               ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon size={48} />
                  </div>
               )}
            </div>

            {/* Content with Scroll */}
            <div className="p-6 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">{selectedItem.title}</h3>
                  <p className="text-orange-500 font-bold text-xl bg-orange-50 px-3 py-1 rounded-xl ml-4 whitespace-nowrap">{selectedItem.price} ₽</p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Описание / Состав</h4>
                <p className="text-slate-700 leading-relaxed text-base">
                  {selectedItem.description || "Описание отсутствует"}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{selectedItem.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
