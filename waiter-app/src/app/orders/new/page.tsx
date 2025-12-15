'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Minus, Plus, ShoppingBag, Search, X, Image as ImageIcon, Info } from 'lucide-react'

type MenuItem = {
  id: string
  title: string
  price: number
  category: string
  station?: string
  image_url?: string
  description?: string
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
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<string[]>(['Все'])
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState<string | null>(null)
  
  const [selectedItemInfo, setSelectedItemInfo] = useState<MenuItem | null>(null)

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
    const { data } = await supabase.from('menu_items').select('id, title, price, category, station, image_url, description')
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

  const handleSubmit = async () => {
    if (!tableNumber) return alert('Введите номер стола')
    if (cart.length === 0) return alert('Выберите блюда')
    
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
      alert('Ошибка: ' + itemsError.message)
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
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 border-b border-slate-100 px-4 py-3 flex items-center gap-4 safe-top">
        <Link href="/" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-slate-900">Новый заказ</h1>
          <p className="text-xs text-slate-400 font-medium">Официант: {user}</p>
        </div>
      </header>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        
        {/* Table Input */}
        <div className="app-card p-6 flex flex-col items-center">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Номер стола</label>
          <input
            type="number"
            inputMode="numeric"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="text-5xl font-black text-center w-full bg-transparent outline-none placeholder:text-slate-200 text-slate-800"
            placeholder="#"
          />
        </div>

        {/* Cart Preview */}
        {cart.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-500 uppercase px-1">Корзина</h3>
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
            + Добавить блюдо вручную
          </button>
        ) : (
          <div className="app-card p-5 space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-700">Свое блюдо</h3>
              <button onClick={() => setShowCustomInput(false)} className="text-slate-400"><X size={20} /></button>
            </div>
            <input
              type="text"
              placeholder="Название блюда"
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
              placeholder="Поиск по меню..."
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
        <div className="grid grid-cols-2 gap-3 pb-24">
          {filteredItems.map((item) => {
            const inCart = cart.find(c => c.id === item.id)
            const qty = inCart ? inCart.quantity : 0
            
            return (
              <div 
                key={item.id} 
                className={`bg-white rounded-2xl overflow-hidden shadow-sm border-2 transition-all relative cursor-pointer group ${qty > 0 ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-transparent'}`}
                onClick={() => addToCart(item)}
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-slate-100 relative">
                    {item.image_url ? (
                        <Image 
                            src={item.image_url} 
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                            <ImageIcon size={32} />
                            <span className="text-[10px] mt-2 font-medium">Нет фото</span>
                        </div>
                    )}
                    
                    {/* Qty Badge */}
                    {qty > 0 && (
                        <div className="absolute top-2 right-2 bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-lg animate-in zoom-in">
                            {qty}
                        </div>
                    )}

                    {/* Info Button - Opens Modal */}
                    {item.description && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation() // Don't add to cart
                          setSelectedItemInfo(item)
                        }}
                        className="absolute bottom-2 right-2 bg-white/90 text-slate-600 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm hover:bg-white hover:text-orange-500 transition-colors"
                      >
                        <Info size={16} />
                      </button>
                    )}
                </div>

                <div className="p-3">
                  <p className="font-bold text-slate-800 text-sm leading-tight line-clamp-2 min-h-[2.5em]">{item.title}</p>
                  <div className="flex justify-between items-end mt-2">
                      <p className="text-slate-500 font-medium text-xs bg-slate-100 px-2 py-1 rounded-lg">{item.price} ₽</p>
                      
                      {!qty && (
                          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Plus size={14} />
                          </div>
                      )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating Action Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-2xl mx-auto z-40">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-orange-500 text-white rounded-2xl p-4 shadow-xl shadow-orange-500/30 flex items-center justify-between font-bold active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 px-3 py-1 rounded-lg text-sm">
                {totalItems} шт
              </div>
              <span>Оформить заказ</span>
            </div>
            <span className="text-lg">{totalPrice} ₽</span>
          </button>
        </div>
      )}

      {/* Description Modal */}
      {selectedItemInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in zoom-in-95">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItemInfo(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 backdrop-blur-sm transition-colors"
            >
              <X size={18} />
            </button>

            {/* Image */}
            <div className="aspect-video relative bg-slate-100">
               {selectedItemInfo.image_url ? (
                  <Image 
                      src={selectedItemInfo.image_url} 
                      alt={selectedItemInfo.title}
                      fill
                      className="object-cover"
                  />
               ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon size={48} />
                  </div>
               )}
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{selectedItemInfo.title}</h3>
              <p className="text-orange-500 font-bold text-lg mb-4">{selectedItemInfo.price} ₽</p>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Состав / Описание</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedItemInfo.description || "Описание отсутствует"}
                </p>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedItemInfo)
                  setSelectedItemInfo(null)
                }}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Добавить в заказ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
