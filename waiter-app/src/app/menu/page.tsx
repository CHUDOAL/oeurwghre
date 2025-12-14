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
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [categories, setCategories] = useState<string[]>(['All'])

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    const { data } = await supabase.from('menu_items').select('*')
    if (data) {
      setItems(data)
      const uniqueCategories = Array.from(new Set(data.map((i) => i.category || 'Other')))
      setCategories(['All', ...uniqueCategories])
    }
    setLoading(false)
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen pb-20 relative">
      <header className="sticky top-0 z-10 bg-[#01012b]/90 backdrop-blur-md p-4 shadow-[0_2px_10px_rgba(211,0,197,0.2)] flex items-center gap-4 border-b border-neon-purple/30">
        <Link href="/" className="text-neon-pink hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-white uppercase tracking-widest font-mono glitch-text" data-text="MENU DATABASE">Menu Database</h1>
      </header>

      <div className="p-4 space-y-6 relative z-10">
        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neon-blue" />
            <input
              type="text"
              placeholder="SEARCH ENTRIES..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/50 border border-neon-blue/50 text-white py-2 pl-10 pr-4 text-sm focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink font-mono uppercase placeholder:text-gray-600 rounded-none clip-path-input"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-1 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-neon-pink text-black border-neon-pink shadow-[0_0_10px_var(--neon-pink)]'
                  : 'bg-transparent text-neon-blue border-neon-blue hover:bg-neon-blue/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-10 text-neon-blue font-mono animate-pulse">ACCESSING DATABASE...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-10 text-gray-500 font-mono">
            {items.length === 0 ? 'DATABASE EMPTY.' : 'NO MATCHING RECORDS.'}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="cyber-card flex flex-row overflow-hidden group hover:border-neon-pink/50 transition-colors">
                <div className="w-1/3 bg-black relative shrink-0">
                  {item.image_url ? (
                     // eslint-disable-next-line @next/next/no-img-element
                     <img 
                       src={item.image_url} 
                       alt={item.title}
                       className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                     />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-gray-900">
                      <ImageIcon className="text-gray-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#01012b]/90"></div>
                </div>
                
                <div className="p-3 flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-1 font-mono leading-tight">{item.title}</h3>
                    <p className="text-[10px] text-gray-400 line-clamp-2 mb-2 font-mono">{item.description || 'NO DATA'}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-neon-blue border border-neon-blue px-1 uppercase">{item.category}</span>
                    <span className="font-bold text-neon-pink text-lg font-mono">{item.price} <span className="text-xs">¥</span></span>
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
