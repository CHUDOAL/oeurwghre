'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, ShoppingCart, PlusCircle, Trash2 } from 'lucide-react'

type MenuItem = {
  id: string
  title: string
  price: number
  category: string
  station?: string
}

type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  isCustom?: boolean
  station?: string
}

export default function AddItemsToOrderPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params?.id as string

  const [items, setItems] = useState<MenuItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<string[]>(['All'])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [submitting, setSubmitting] = useState(false)

  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customDishName, setCustomDishName] = useState('')
  const [customDishPrice, setCustomDishPrice] = useState('')

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    const { data } = await supabase.from('menu_items').select('id, title, price, category, station')
    if (data) {
      setItems(data)
      const uniqueCategories = Array.from(new Set(data.map((i) => i.category || 'Other')))
      setCategories(['All', ...uniqueCategories])
    }
    setLoading(false)
  }

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1, station: item.station }]
    })
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta)
          return { ...item, quantity: newQty }
        }
        return item
      }).filter(item => item.quantity > 0)
    })
  }

  const addCustomItem = () => {
    if (!customDishName) return
    const price = parseFloat(customDishPrice) || 0
    
    const newItem: CartItem = {
      id: `custom_${Date.now()}`,
      title: customDishName,
      price: price,
      quantity: 1,
      isCustom: true,
      station: 'other'
    }
    
    setCart(prev => [...prev, newItem])
    setCustomDishName('')
    setCustomDishPrice('')
    setShowCustomInput(false)
  }

  const handleAddItems = async () => {
    if (cart.length === 0) return alert('SELECT ITEMS')
    
    setSubmitting(true)
    
    const itemsToInsert = []

    for (const item of cart) {
      let menuItemId = item.id

      if (item.isCustom) {
        const { data: customMenu, error: customError } = await supabase
          .from('menu_items')
          .insert({
            title: item.title,
            price: item.price,
            category: 'Custom',
            description: 'Custom entry by waiter',
            station: item.station
          })
          .select()
          .single()
        
        if (customError) {
          console.error('Failed to create custom item', customError)
          continue
        }
        menuItemId = customMenu.id
      }

      itemsToInsert.push({
        order_id: orderId,
        menu_item_id: menuItemId,
        quantity: item.quantity,
        served: false,
        item_title: item.title,
        item_price: item.price,
        item_station: item.station
      })
    }

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsToInsert)

    if (itemsError) {
      alert('Error adding items: ' + itemsError.message)
    } else {
      router.push(`/orders/${orderId}`)
    }
    setSubmitting(false)
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalItems = cart.reduce((a, b) => a + b.quantity, 0)

  return (
    <div className="min-h-screen pb-32 relative">
      <header className="sticky top-0 z-10 bg-[#01012b]/90 backdrop-blur-md p-4 shadow-[0_2px_10px_rgba(5,217,232,0.2)] flex items-center gap-4 border-b border-neon-blue/30">
        <Link href={`/orders/${orderId}`} className="text-neon-pink hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-white uppercase tracking-widest font-mono glitch-text" data-text="ADD SUPPLEMENTS">ADD SUPPLEMENTS</h1>
      </header>

      <div className="p-4 space-y-6 relative z-10">
        {cart.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-bold text-white text-xs uppercase tracking-widest">Selected Payload:</h3>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-neon-pink/10 p-3 border border-neon-pink/30 clip-path-badge">
                <div className="flex-1">
                  <p className="font-bold text-white font-mono text-sm uppercase">{item.title}</p>
                  <p className="text-[10px] text-neon-pink">{item.price} ¥ {item.isCustom && '(MANUAL)'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-neon-pink hover:bg-neon-pink hover:text-black transition-colors"><Minus size={16} /></button>
                  <span className="font-bold text-white font-mono w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-neon-pink hover:bg-neon-pink hover:text-black transition-colors"><Plus size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          {!showCustomInput ? (
            <button 
              onClick={() => setShowCustomInput(true)}
              className="w-full py-3 border border-dashed border-gray-600 text-gray-400 font-mono hover:border-neon-blue hover:text-neon-blue transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
            >
              <PlusCircle size={20} />
              MANUAL ENTRY OVERRIDE
            </button>
          ) : (
            <div className="cyber-card p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-neon-blue text-xs uppercase tracking-widest">New Entry</h3>
                <button onClick={() => setShowCustomInput(false)} className="text-gray-500 hover:text-red-500"><Trash2 size={18} /></button>
              </div>
              <input
                type="text"
                placeholder="ITEM NAME"
                value={customDishName}
                onChange={(e) => setCustomDishName(e.target.value)}
                className="w-full p-2 bg-black/50 border border-gray-700 text-white font-mono text-sm placeholder:text-gray-700 focus:border-neon-blue outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="PRICE"
                  value={customDishPrice}
                  onChange={(e) => setCustomDishPrice(e.target.value)}
                  className="w-1/3 p-2 bg-black/50 border border-gray-700 text-white font-mono text-sm placeholder:text-gray-700 focus:border-neon-blue outline-none"
                />
                <button 
                  onClick={addCustomItem}
                  disabled={!customDishName}
                  className="flex-1 bg-neon-blue/20 text-neon-blue border border-neon-blue hover:bg-neon-blue hover:text-black font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ADD
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-800">
          <input
            type="text"
            placeholder="SEARCH DATABASE..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/50 border border-neon-blue/30 text-white py-2 px-4 text-sm font-mono uppercase placeholder:text-gray-600 focus:border-neon-pink focus:outline-none clip-path-input"
          />

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-neon-pink text-black border-neon-pink'
                    : 'bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredItems.map((item) => {
              const inCart = cart.find(c => c.id === item.id)
              const qty = inCart ? inCart.quantity : 0
              
              return (
                <div key={item.id} className="flex justify-between items-center bg-black/40 p-3 border border-gray-800 hover:border-neon-blue/50 transition-colors group">
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm uppercase font-mono group-hover:text-neon-blue transition-colors">{item.title}</p>
                    <p className="text-[10px] text-gray-500">{item.price} ¥</p>
                  </div>
                  
                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="p-2 text-gray-500 hover:text-neon-pink transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-neon-blue/10 px-2 py-1 border border-neon-blue/30">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-neon-blue hover:text-white"><Minus size={14} /></button>
                      <span className="font-bold text-white font-mono w-4 text-center">{qty}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-neon-blue hover:text-white"><Plus size={14} /></button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#01012b] border-t border-neon-pink/50 p-4 shadow-[0_-5px_20px_rgba(255,42,109,0.2)] pb-safe z-20">
          <div className="flex justify-between items-center mb-4 font-mono">
            <span className="text-gray-400 text-xs uppercase tracking-widest">{totalItems} UNITS</span>
            <span className="font-bold text-xl text-neon-pink">
              {cart.reduce((sum, i) => sum + i.price * i.quantity, 0)} ¥
            </span>
          </div>
          <button
            onClick={handleAddItems}
            disabled={submitting}
            className="w-full py-3 bg-neon-pink text-black font-bold uppercase tracking-[0.2em] shadow-[0_0_15px_var(--neon-pink)] hover:bg-white hover:text-neon-pink transition-all flex items-center justify-center gap-2 cyber-button-hot"
          >
            {submitting ? 'PROCESSING...' : (
              <>
                <ShoppingCart size={20} />
                CONFIRM SUPPLEMENTS
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
