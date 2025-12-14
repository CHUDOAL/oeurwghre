'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
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

export default function NewOrderPage() {
  const router = useRouter()
  const [tableNumber, setTableNumber] = useState('')
  const [items, setItems] = useState<MenuItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<string[]>(['Все'])
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState<string | null>(null)

  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customDishName, setCustomDishName] = useState('')
  const [customDishPrice, setCustomDishPrice] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('waiter_user')
    if (!storedUser) {
      router.push('/login')
      return
    }
    setUser(storedUser)
    fetchMenu()
  }, [router])

  const fetchMenu = async () => {
    const { data } = await supabase.from('menu_items').select('id, title, price, category, station')
    if (data) {
      setItems(data)
      const uniqueCategories = Array.from(new Set(data.map((i) => i.category || 'Прочее')))
      setCategories(['Все', ...uniqueCategories])
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

  const handleSubmit = async () => {
    if (!tableNumber) return alert('НОМЕР СТОЛА?')
    if (cart.length === 0) return alert('БЛЮДА?')
    
    setSubmitting(true)
    
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        table_number: tableNumber,
        status: 'active',
        username: user
      })
      .select()
      .single()

    if (orderError) {
      alert('Ошибка: ' + orderError.message)
      setSubmitting(false)
      return
    }

    const itemsToInsert = cart.map(item => ({
        order_id: order.id,
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
      alert('Ошибка блюд: ' + itemsError.message)
    } else {
      router.push(`/orders/${order.id}`)
    }
    setSubmitting(false)
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalItems = cart.reduce((a, b) => a + b.quantity, 0)

  return (
    <div className="min-h-screen pb-32 bg-[#f4f4f0] relative">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")'}}></div>

      <header className="sticky top-0 z-20 bg-[#f4f4f0]/95 backdrop-blur-md p-6 flex items-center justify-between border-b border-[#e0e0e0]">
        <Link href="/" className="text-gray-400 hover:text-black transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-serif tracking-widest uppercase">Заказ</h1>
      </header>

      <div className="p-6 space-y-8 relative z-10">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Номер Стола</label>
          <input
            type="text"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full text-4xl font-serif bg-transparent border-b-2 border-gray-200 focus:border-[#bc002d] outline-none py-2 text-center transition-colors placeholder:text-gray-200"
            placeholder="00"
          />
        </div>

        {cart.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b border-gray-200 pb-2">Выбрано</h3>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center group">
                <div className="flex-1">
                  <p className="font-serif text-lg">{item.title}</p>
                  <p className="text-xs text-gray-400 font-mono mt-1">{item.price} ₽</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-300 hover:text-black"><Minus size={16} /></button>
                  <span className="font-mono text-lg w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-300 hover:text-black"><Plus size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {!showCustomInput ? (
            <button 
              onClick={() => setShowCustomInput(true)}
              className="w-full py-4 border border-dashed border-gray-300 text-gray-400 hover:border-gray-500 hover:text-gray-600 transition-all font-serif tracking-widest text-xs uppercase"
            >
              + Ручной Ввод
            </button>
          ) : (
            <div className="bg-white border border-gray-200 p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-sm">Свое Блюдо</h3>
                <button onClick={() => setShowCustomInput(false)} className="text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
              <input
                type="text"
                placeholder="Название"
                value={customDishName}
                onChange={(e) => setCustomDishName(e.target.value)}
                className="jp-input"
              />
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Цена"
                  value={customDishPrice}
                  onChange={(e) => setCustomDishPrice(e.target.value)}
                  className="jp-input w-1/3"
                />
                <button 
                  onClick={addCustomItem}
                  disabled={!customDishName}
                  className="flex-1 bg-gray-900 text-white font-serif tracking-widest text-xs uppercase hover:bg-black transition-colors"
                >
                  Добавить
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="pt-8 border-t border-gray-200 space-y-6">
          <input
            type="text"
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="jp-input uppercase text-sm placeholder:text-gray-300"
          />

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#bc002d] text-white'
                    : 'bg-white text-gray-400 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-2">
            {filteredItems.map((item) => {
              const inCart = cart.find(c => c.id === item.id)
              const qty = inCart ? inCart.quantity : 0
              
              return (
                <div key={item.id} className="flex justify-between items-center p-4 bg-white border border-transparent hover:border-gray-200 transition-all cursor-pointer" onClick={() => addToCart(item)}>
                  <div className="flex-1">
                    <p className="font-serif text-sm">{item.title}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-mono">{item.price} ₽</p>
                  </div>
                  
                  {qty > 0 && (
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full font-mono text-sm">
                      {qty}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-2xl pb-safe z-30">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] uppercase tracking-widest text-gray-400">{totalItems} Позиций</span>
            <span className="font-serif text-xl">
              {cart.reduce((sum, i) => sum + i.price * i.quantity, 0)} ₽
            </span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full jp-button jp-button-red h-14 text-sm"
          >
            {submitting ? 'Обработка...' : 'ПОДТВЕРДИТЬ'}
          </button>
        </div>
      )}
    </div>
  )
}
