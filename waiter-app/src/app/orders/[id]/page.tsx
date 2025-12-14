'use client'

import { useEffect, useState, use } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Circle, Clock } from 'lucide-react'
import { useParams } from 'next/navigation'

type OrderItem = {
  id: string
  menu_item_id: string
  quantity: number
  served: boolean
  created_at: string
  item_title?: string // New denormalized field
  item_price?: number // New denormalized field
  menu_items: {
    title: string
    price: number
  } | null
}

type Order = {
  id: string
  table_number: string
  status: string
  created_at: string
}

export default function OrderPage() {
  const params = useParams()
  const id = params?.id as string
  const router = useRouter()
  
  const [order, setOrder] = useState<Order | null>(null)
  const [items, setItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(Date.now())

  useEffect(() => {
    if (id) fetchOrder()
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [id])

  const fetchOrder = async () => {
    // Fetch Order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (orderError) {
      alert('Заказ не найден')
      router.push('/')
      return
    }
    setOrder(orderData)

    // Fetch Items
    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .select(`
        id, 
        menu_item_id, 
        quantity, 
        served,
        created_at,
        item_title,
        item_price,
        menu_items ( title, price )
      `)
      .eq('order_id', id)
      .order('created_at', { ascending: true })

    if (itemsData) {
      // @ts-ignore
      setItems(itemsData)
    }
    setLoading(false)
  }

  const toggleServed = async (itemId: string, currentStatus: boolean) => {
    setItems(items.map(i => i.id === itemId ? { ...i, served: !currentStatus } : i))

    const { error } = await supabase
      .from('order_items')
      .update({ served: !currentStatus })
      .eq('id', itemId)

    if (error) {
      setItems(items.map(i => i.id === itemId ? { ...i, served: currentStatus } : i))
      alert('Ошибка обновления')
    }
  }

  const closeOrder = async () => {
    if (!confirm('Закрыть стол?')) return

    const { error } = await supabase
      .from('orders')
      .update({ status: 'completed' })
      .eq('id', id)

    if (error) {
      alert('Ошибка закрытия')
    } else {
      router.push('/')
    }
  }

  const getTimerStatus = (createdAt: string) => {
    const created = new Date(createdAt).getTime()
    const diff = currentTime - created
    const tenMinutes = 10 * 60 * 1000
    const remaining = tenMinutes - diff

    const absRemaining = Math.abs(remaining)
    const minutes = Math.floor(absRemaining / 60000)
    const seconds = Math.floor((absRemaining % 60000) / 1000)
    const formatted = `${remaining < 0 ? '-' : ''}${minutes}:${seconds.toString().padStart(2, '0')}`

    if (remaining <= 0) {
        return { text: formatted, color: 'text-red-600', bg: 'bg-red-50' }
    }
    
    if (remaining < 2 * 60 * 1000) {
        return { text: formatted, color: 'text-orange-600', bg: 'bg-orange-50' }
    }
    return { text: formatted, color: 'text-green-600', bg: 'bg-green-50' }
  }

  if (loading) return <div className="p-10 text-center text-gray-500">Загрузка заказа...</div>
  if (!order) return null

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-orange-500 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Стол {order.table_number}</h1>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {order.status === 'active' ? 'Открыт' : 'Закрыт'}
            </span>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4 max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {items.map((item) => {
            const timer = getTimerStatus(item.created_at)
            
            // Prefer denormalized title, fallback to joined title, finally unknown
            const title = item.item_title || item.menu_items?.title || 'Неизвестное блюдо'

            return (
              <div 
                key={item.id} 
                onClick={() => toggleServed(item.id, item.served)}
                className={`flex items-start p-4 border-b border-gray-100 last:border-0 cursor-pointer transition-colors ${
                  item.served ? 'bg-gray-50' : 'hover:bg-gray-50 active:bg-gray-100'
                }`}
              >
                <div className="mt-1 mr-4">
                  {item.served ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <Circle className="text-gray-300" size={24} />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className={`font-medium text-lg leading-tight ${item.served ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {title}
                    </p>
                    
                    {!item.served && (
                      <div className={`ml-2 flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono font-bold ${timer.bg} ${timer.color}`}>
                        <Clock size={12} />
                        {timer.text}
                      </div>
                    )}
                  </div>
                  
                  {item.quantity > 1 && (
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-2 py-0.5 rounded-full mt-2">
                      x{item.quantity}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {order.status === 'active' && (
          <button
            onClick={closeOrder}
            className="w-full rounded-xl bg-gray-900 py-4 text-white font-bold shadow-lg hover:bg-gray-800 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Закрыть стол
          </button>
        )}
      </div>
    </div>
  )
}
