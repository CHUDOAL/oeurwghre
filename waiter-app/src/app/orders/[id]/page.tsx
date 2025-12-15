'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CheckCircle, Circle, Clock, Plus, Trash2, Flame, Snowflake, Coffee } from 'lucide-react'

type OrderItem = {
  id: string
  menu_item_id: string
  quantity: number
  served: boolean
  created_at: string
  item_title?: string
  item_price?: number
  item_station?: string
  menu_items: {
    title: string
    price: number
    station?: string
    image_url?: string
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
        item_station,
        menu_items ( title, price, station, image_url )
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

  const deleteItem = async (itemId: string) => {
    if (!confirm('Удалить эту позицию?')) return

    const { error } = await supabase
      .from('order_items')
      .delete()
      .eq('id', itemId)

    if (error) {
      alert('Ошибка удаления: ' + error.message)
    } else {
      setItems(items.filter(i => i.id !== itemId))
    }
  }

  const closeOrder = async () => {
    if (!confirm('Закрыть счет?')) return

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

  const groupedItems = items.reduce((acc, item) => {
    const station = item.item_station || item.menu_items?.station || 'other'
    if (!acc[station]) acc[station] = []
    acc[station].push(item)
    return acc
  }, {} as Record<string, OrderItem[]>)

  const stationOrder = ['drinks', 'rolls_cold', 'rolls_hot', 'cold', 'hot', 'other']
  
  const getStationLabel = (key: string) => {
    switch (key) {
      case 'drinks': return { label: 'Напитки', icon: <Coffee size={18} className="text-blue-500" /> }
      case 'rolls_cold': return { label: 'Роллы (Хол)', icon: <Snowflake size={18} className="text-cyan-500" /> }
      case 'rolls_hot': return { label: 'Роллы (Гор)', icon: <Flame size={18} className="text-orange-500" /> }
      case 'cold': return { label: 'Холодный цех', icon: <Snowflake size={18} className="text-cyan-500" /> }
      case 'hot': return { label: 'Горячий цех', icon: <Flame size={18} className="text-orange-500" /> }
      default: return { label: 'Прочее', icon: <Circle size={18} className="text-slate-400" /> }
    }
  }

  if (loading) return <div className="p-10 text-center text-slate-400 font-medium">Загрузка...</div>
  if (!order) return null

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      
      <header className="bg-white sticky top-0 z-30 border-b border-slate-100 px-4 py-3 flex items-center justify-between safe-top">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Столик {order.table_number}</h1>
            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold ${order.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'active' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
              {order.status === 'active' ? 'Открыт' : 'Закрыт'}
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {order.status === 'active' && (
          <Link 
            href={`/orders/${id}/add`}
            className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-600 hover:text-orange-600 hover:border-orange-200 font-bold rounded-2xl shadow-sm active:scale-95 transition-all"
          >
            <Plus size={20} />
            Добавить позиции
          </Link>
        )}

        {items.length === 0 ? (
           <div className="text-center py-12 text-slate-400 font-medium bg-white rounded-3xl border border-dashed border-slate-200">
             Заказ пуст
           </div>
        ) : (
          <div className="space-y-6">
            {stationOrder.map(stationKey => {
              const stationItems = groupedItems[stationKey]
              if (!stationItems || stationItems.length === 0) return null
              
              const { label, icon } = getStationLabel(stationKey)

              return (
                <div key={stationKey} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2 font-bold text-slate-700 text-sm uppercase tracking-wide">
                    {icon}
                    {label}
                  </div>
                  
                  {stationItems.map((item) => {
                    const timer = getTimerStatus(item.created_at)
                    const title = item.item_title || item.menu_items?.title || 'Неизвестно'

                    return (
                      <div 
                        key={item.id} 
                        onClick={() => toggleServed(item.id, item.served)}
                        className={`flex items-start p-5 border-b border-slate-50 last:border-0 transition-colors cursor-pointer active:bg-slate-50 ${
                          item.served ? 'bg-slate-50/50' : 'bg-white'
                        }`}
                      >
                        <div className="mt-0.5 mr-4">
                          {item.served ? (
                            <CheckCircle className="text-green-500" size={24} />
                          ) : (
                            <Circle className="text-slate-300" size={24} />
                          )}
                        </div>

                        {item.menu_items?.image_url && (
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden mr-4 flex-shrink-0 bg-slate-100">
                            <Image 
                              src={item.menu_items.image_url} 
                              alt={title} 
                              fill 
                              className={`object-cover ${item.served ? 'grayscale opacity-50' : ''}`} 
                              sizes="64px"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className={`font-bold text-base leading-tight ${item.served ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                              {title}
                            </p>
                            
                            {!item.served && (
                              <div className={`ml-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold font-mono ${timer.bg} ${timer.color}`}>
                                <Clock size={12} />
                                {timer.text}
                              </div>
                            )}
                          </div>
                          
                          {item.quantity > 1 && (
                            <span className="inline-block mt-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-md">
                              x{item.quantity}
                            </span>
                          )}
                        </div>

                        {!item.served && order.status === 'active' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteItem(item.id)
                            }}
                            className="ml-2 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {order.status === 'active' && (
        <div className="fixed bottom-6 left-4 right-4 max-w-2xl mx-auto z-30">
          <button
            onClick={closeOrder}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/20 active:scale-95 transition-transform"
          >
            Закрыть стол
          </button>
        </div>
      )}
    </div>
  )
}
