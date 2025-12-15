'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Minus, Plus, Search, X } from 'lucide-react'

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
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<string[]>(['Все'])
  const [selectedCategory, setSelectedCategory] = useState('Все')
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
      const uniqueCategories = Array.from(new Set(data.map((i) => i.category || 'Прочее')))
      setCategories(['Все', ...uniqueCategories])
    }
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
    if (cart.length === 0) return alert('Выберите блюда')
    
    setSubmitting(true)
    
    const itemsToInsert = cart.map(item => ({
        order_id: orderId,
        menu_item_id: item.isCustom ? null : item.id,
        quantity: item.quantity,
        served: false,
        item_title: item.title,
        item_price: item.price,
        item_station: item.station
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsToInsert)

    if (itemsError) {
      alert('Ошибка: ' + itemsError.message)
    } else {
      router.push(`/orders/${orderId}`)
    }
    setSubmitting(false)
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalItems = cart.reduce((a, b) => a + b.quantity, 0)
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      
      <header className="bg-white sticky top-0 z-30 border-b border-slate-100 px-4 py-3 flex items-center gap-4 safe-top">
        <Link href={`/orders/${orderId}`} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-slate-900">Добавить блюда</h1>
      </header>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        
        {/* Cart Preview */}
        {cart.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-500 uppercase px-1">Выбрано</h3>
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800">{item.title}</p>
                  <p className="text-xs text-orange-500 font-bold mt-0.5">{item.price} ₽</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 active:scale-95 transition-transform"><Minus size={14} /></button>
                  <span className="font-bold text-slate-700 w-4 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 active:scale-95 transition-transform"><Plus size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Manual Entry Toggle */}
        {!showCustomInput ? (
          <button 
            onClick={() => setShowCustomInput(true)}
            className="w-full py-4 border border-dashed border-slate-300 rounded-2xl text-slate-400 font-medium hover:border-orange-300 hover:text-orange-500 transition-colors"
          >
            + Добавить вручную
          </button>
        ) : (
          <div className="app-card p-5 space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-700">Свое блюдо</h3>
              <button onClick={() => setShowCustomInput(false)} className="text-slate-400"><X size={20} /></button>
            </div>
            <input
              type="text"
              placeholder="Название"
              value={customDishName}
              onChange={(e) => setCustomDishName(e.target.value)}
              className="app-input"
            />
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Цена"
                value={customDishPrice}
                onChange={(e) => setCustomDishPrice(e.target.value)}
                className="app-input w-1/3"
              />
              <button 
                onClick={addCustomItem}
                disabled={!customDishName}
                className="flex-1 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-colors disabled:opacity-50"
              >
                Добавить
              </button>
            </div>
          </div>
        )}

        {/* Menu Search & Categories */}
        <div className="sticky top-16 z-20 bg-slate-50 pt-4 pb-2 space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Поиск..."
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

        {/* Menu Grid */}
        <div className="grid gap-3">
          {filteredItems.map((item) => {
            const inCart = cart.find(c => c.id === item.id)
            const qty = inCart ? inCart.quantity : 0
            
            return (
              <div 
                key={item.id} 
                onClick={() => addToCart(item)}
                className={`app-card p-4 flex justify-between items-center cursor-pointer border-2 transition-all ${qty > 0 ? 'border-orange-500 bg-orange-50/30' : 'border-transparent'}`}
              >
                <div>
                  <p className="font-bold text-slate-800">{item.title}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{item.price} ₽</p>
                </div>
                
                {qty > 0 ? (
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {qty}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Plus size={16} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating Action Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-2xl mx-auto z-40">
          <button
            onClick={handleAddItems}
            disabled={submitting}
            className="w-full bg-orange-500 text-white rounded-2xl p-4 shadow-xl shadow-orange-500/30 flex items-center justify-between font-bold active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 px-3 py-1 rounded-lg text-sm">
                +{totalItems} шт
              </div>
              <span>Добавить в заказ</span>
            </div>
            <span className="text-lg">{totalPrice} ₽</span>
          </button>
        </div>
      )}
    </div>
  )
}
