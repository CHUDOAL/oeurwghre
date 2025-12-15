'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, Search, Image as ImageIcon } from 'lucide-react'

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
              <div key={item.id} className="app-card overflow-hidden group cursor-pointer hover:shadow-lg">
                <div className="aspect-video w-full bg-slate-100 relative overflow-hidden">
                  {item.image_url ? (
                     // eslint-disable-next-line @next/next/no-img-element
                     <img 
                       src={item.image_url} 
                       alt={item.title}
                       className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  <p className="text-sm text-slate-500 line-clamp-2">{item.description || 'Описание отсутствует'}</p>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
