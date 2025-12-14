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
    if (!tableNumber) return alert('ВВЕДИТЕ НОМЕР СТОЛА')
    if (cart.length === 0) return alert('ВЫБЕРИТЕ БЛЮДА')
    
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
      alert('Ошибка создания заказа: ' + orderError.message)
      setSubmitting(false)
      return
    }

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
            description: 'Добавлено вручную',
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
        order_id: order.id,
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
      alert('Ошибка добавления блюд: ' + itemsError.message)
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
    <div className="min-h-screen pb-32 relative bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
      <div className="scanlines"></div>

      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md p-4 shadow-sm flex items-center gap-4 border-b-2 border-[#ffb7c5]">
        <Link href="/" className="text-[#ffb7c5] hover:text-[#2c2c54] transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-[#2c2c54]" style={{ fontFamily: 'var(--font-retro)' }}>НОВЫЙ ЗАКАЗ ({user})</h1>
      </header>

      <div className="p-4 space-y-6 relative z-10">
        {/* Table Number */}
        <div className="retro-card p-4 bg-white">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">НОМЕР СТОЛА</label>
          <input
            type="text"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full text-2xl font-bold p-2 retro-input text-center text-[#2c2c54]"
            placeholder="00"
          />
        </div>

        {/* Selected Items Preview */}
        {cart.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-bold text-[#2c2c54] text-xs uppercase bg-white/80 inline-block px-2 rounded">В корзине:</h3>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white border-2 border-[#ffb7c5] p-3 rounded-lg shadow-sm">
                <div className="flex-1">
                  <p className="font-bold text-[#2c2c54] text-sm uppercase">{item.title}</p>
                  <p className="text-xs text-[#ffb7c5] font-bold">{item.price} ₽ {item.isCustom && '(РУЧНОЙ)'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-[#ffb7c5] hover:text-[#2c2c54]"><Minus size={16} /></button>
                  <span className="font-bold text-[#2c2c54] w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-[#ffb7c5] hover:text-[#2c2c54]"><Plus size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Item Button */}
        <div className="space-y-2">
          {!showCustomInput ? (
            <button 
              onClick={() => setShowCustomInput(true)}
              className="w-full py-3 border-2 border-dashed border-[#a0d8ef] text-[#a0d8ef] font-bold rounded-xl hover:bg-[#a0d8ef] hover:text-white transition-colors flex items-center justify-center gap-2 uppercase text-xs shadow-none"
            >
              <PlusCircle size={20} />
              Добавить блюдо вручную
            </button>
          ) : (
            <div className="retro-card p-4 space-y-3 animate-in fade-in bg-white">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#2c2c54] text-xs uppercase">Свое блюдо</h3>
                <button onClick={() => setShowCustomInput(false)} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
              </div>
              <input
                type="text"
                placeholder="Название (например: Особый Сок)"
                value={customDishName}
                onChange={(e) => setCustomDishName(e.target.value)}
                className="w-full retro-input"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Цена"
                  value={customDishPrice}
                  onChange={(e) => setCustomDishPrice(e.target.value)}
                  className="w-1/3 retro-input"
                />
                <button 
                  onClick={addCustomItem}
                  disabled={!customDishName}
                  className="flex-1 bg-[#a0d8ef] text-white border-2 border-[#2c2c54] rounded-lg font-bold uppercase hover:shadow-md disabled:opacity-50"
                >
                  Добавить
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Menu Search */}
        <div className="space-y-4 pt-4 border-t-2 border-[#e6e6fa] bg-white/50 p-2 rounded-xl">
          <input
            type="text"
            placeholder="ПОИСК ПО МЕНЮ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full retro-input uppercase"
          />

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1 text-[10px] font-bold uppercase border-2 rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#ffb7c5] text-white border-[#2c2c54] shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#ffb7c5]'
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
                <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg border-2 border-transparent hover:border-[#a0d8ef] shadow-sm transition-all">
                  <div className="flex-1">
                    <p className="font-bold text-[#2c2c54] text-sm uppercase">{item.title}</p>
                    <p className="text-[10px] text-gray-500">{item.price} ₽</p>
                  </div>
                  
                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="p-2 text-[#a0d8ef] hover:text-[#ffb7c5] transition-colors bg-[#f0f8ff] rounded-full"
                    >
                      <Plus size={18} />
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-[#f0f8ff] px-2 py-1 rounded-full border border-[#a0d8ef]">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-[#a0d8ef]"><Minus size={14} /></button>
                      <span className="font-bold text-[#2c2c54] w-4 text-center">{qty}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-[#a0d8ef]"><Plus size={14} /></button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-[#ffb7c5] p-4 shadow-lg pb-safe z-30">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 text-xs uppercase font-bold">{totalItems} ПОЗИЦИЙ</span>
            <span className="font-bold text-xl text-[#2c2c54]" style={{ fontFamily: 'var(--font-retro)' }}>
              {cart.reduce((sum, i) => sum + i.price * i.quantity, 0)} ₽
            </span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full retro-button text-lg flex items-center justify-center gap-2"
          >
            {submitting ? 'ОФОРМЛЯЕМ...' : (
              <>
                <ShoppingCart size={20} />
                СОЗДАТЬ ЗАКАЗ
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
