'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Search, Minus, Plus, ShoppingCart, PlusCircle, Trash2 } from 'lucide-react'

type MenuItem = {
  id: string
  title: string
  price: number
  category: string
}

type CartItem = {
  id: string
  title: string
  price: number
  quantity: number
  isCustom?: boolean
}

export default function NewOrderPage() {
  const router = useRouter()
  const [tableNumber, setTableNumber] = useState('')
  const [items, setItems] = useState<MenuItem[]>([])
  // Cart stores both ID-based items and custom ones. 
  // For standard items: key is ID. For custom: key is `custom_${timestamp}`
  const [cart, setCart] = useState<CartItem[]>([]) 
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<string[]>(['All'])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [submitting, setSubmitting] = useState(false)
  const [user, setUser] = useState<string | null>(null)

  // Custom Item State
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
    const { data } = await supabase.from('menu_items').select('id, title, price, category')
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
      return [...prev, { ...item, quantity: 1 }]
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
      isCustom: true
    }
    
    setCart(prev => [...prev, newItem])
    setCustomDishName('')
    setCustomDishPrice('')
    setShowCustomInput(false)
  }

  const handleSubmit = async () => {
    if (!tableNumber) return alert('Введите номер стола')
    if (cart.length === 0) return alert('Добавьте блюда')
    
    setSubmitting(true)
    
    // Create Order
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
      alert('Error creating order: ' + orderError.message)
      setSubmitting(false)
      return
    }

    // Prepare Items
    const itemsToInsert = cart.map(item => {
        return {
            order_id: order.id,
            menu_item_id: item.isCustom ? null : item.id, // Null for custom items, ID for menu items
            quantity: item.quantity,
            served: false,
            item_title: item.title, // Denormalized title
            item_price: item.price  // Denormalized price
        }
    })

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsToInsert)

    if (itemsError) {
      alert('Error adding items: ' + itemsError.message)
    } else {
      router.push(`/orders/${order.id}`)
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
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm flex items-center gap-4">
        <Link href="/" className="text-gray-500 hover:text-orange-500">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Новый заказ ({user})</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Table Number */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-1">Номер стола</label>
          <input
            type="text"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full text-lg font-bold p-2 bg-gray-50 border border-gray-300 rounded-lg focus:border-orange-500 outline-none text-center text-gray-900 placeholder:text-gray-400"
            placeholder="#"
          />
        </div>

        {/* Selected Items Preview */}
        {cart.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Выбрано:</h3>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-orange-50 p-3 rounded-lg border border-orange-100">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.price} ₽ {item.isCustom && '(своё)'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-orange-600"><Minus size={16} /></button>
                  <span className="font-bold text-orange-900 w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-orange-600"><Plus size={16} /></button>
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
               className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-orange-400 hover:text-orange-600 transition-colors flex items-center justify-center gap-2"
             >
               <PlusCircle size={20} />
               Добавить блюдо вручную
             </button>
           ) : (
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-3 animate-in fade-in slide-in-from-top-2">
               <div className="flex justify-between items-center">
                 <h3 className="font-semibold text-gray-800">Новое блюдо</h3>
                 <button onClick={() => setShowCustomInput(false)} className="text-gray-400"><Trash2 size={18} /></button>
               </div>
               <input
                 type="text"
                 placeholder="Название (например: Сок)"
                 value={customDishName}
                 onChange={(e) => setCustomDishName(e.target.value)}
                 className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
               />
               <div className="flex gap-2">
                 <input
                   type="number"
                   placeholder="Цена"
                   value={customDishPrice}
                   onChange={(e) => setCustomDishPrice(e.target.value)}
                   className="w-1/3 p-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400"
                 />
                 <button 
                   onClick={addCustomItem}
                   disabled={!customDishName}
                   className="flex-1 bg-gray-900 text-white rounded-lg font-medium disabled:opacity-50"
                 >
                   Добавить
                 </button>
               </div>
             </div>
           )}
        </div>

        {/* Menu Search */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <input
            type="text"
            placeholder="Поиск по меню..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none"
          />

          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
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
                <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.price} ₽</p>
                  </div>
                  
                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="rounded-full bg-orange-100 p-2 text-orange-600 hover:bg-orange-200"
                    >
                      <Plus size={18} />
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-orange-50 rounded-full px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-orange-600"><Minus size={16} /></button>
                      <span className="font-bold text-orange-700 w-4 text-center">{qty}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-orange-600"><Plus size={16} /></button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg pb-safe">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">{totalItems} позиций</span>
            <span className="font-bold text-lg text-gray-900">
              {cart.reduce((sum, i) => sum + i.price * i.quantity, 0)} ₽
            </span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full rounded-xl bg-orange-600 py-3 text-white font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            {submitting ? 'Создаем...' : (
              <>
                <ShoppingCart size={20} />
                Создать заказ
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
