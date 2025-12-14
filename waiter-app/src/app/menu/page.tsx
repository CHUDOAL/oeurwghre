'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, Image as ImageIcon } from 'lucide-react'

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
    <div className="min-h-screen pb-20 relative bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
      <div className="scanlines"></div>

      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md p-4 shadow-sm flex items-center gap-4 border-b-2 border-[#a0d8ef]">
        <Link href="/" className="text-[#a0d8ef] hover:text-[#2c2c54] transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-[#2c2c54]" style={{ fontFamily: 'var(--font-retro)' }}>БАЗА МЕНЮ</h1>
      </header>

      <div className="p-4 space-y-6 relative z-10">
        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#a0d8ef]" />
            <input
              type="text"
              placeholder="ПОИСК БЛЮД..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full retro-input pl-10 uppercase text-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-1 text-[10px] font-bold uppercase border-2 rounded-full transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#a0d8ef] text-white border-[#2c2c54] shadow-md transform -translate-y-1'
                  : 'bg-white text-[#2c2c54] border-[#e6e6fa] hover:border-[#a0d8ef]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-10 text-[#2c2c54] font-bold animate-pulse">ЗАГРУЗКА БАЗЫ ДАННЫХ...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-10 text-gray-400 font-bold">
            {items.length === 0 ? 'БАЗА ПУСТА.' : 'НИЧЕГО НЕ НАЙДЕНО.'}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="retro-card flex flex-row overflow-hidden group bg-white hover:bg-[#f0f8ff]">
                <div className="w-1/3 bg-gray-100 relative shrink-0 border-r-2 border-[#e6e6fa]">
                  {item.image_url ? (
                     // eslint-disable-next-line @next/next/no-img-element
                     <img 
                       src={item.image_url} 
                       alt={item.title}
                       className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                     />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-[#f8f8f8]">
                      <ImageIcon className="text-gray-300" />
                    </div>
                  )}
                </div>
                
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#2c2c54] text-sm uppercase mb-1 leading-tight" style={{ fontFamily: 'var(--font-retro)' }}>{item.title}</h3>
                    <p className="text-[10px] text-gray-500 line-clamp-2 mb-2 font-serif italic">{item.description || 'Описание отсутствует'}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] text-[#a0d8ef] border border-[#a0d8ef] px-1 rounded uppercase font-bold">{item.category}</span>
                    <span className="font-bold text-[#ffb7c5] text-lg">{item.price} <span className="text-xs text-[#2c2c54]">₽</span></span>
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
