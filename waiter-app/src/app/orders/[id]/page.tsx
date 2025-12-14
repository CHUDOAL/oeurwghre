'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Circle, Clock, PlusCircle, Trash2, Flame, Snowflake, Coffee } from 'lucide-react'
import { useParams } from 'next/navigation'

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
        menu_items ( title, price, station )
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

    // Colors: Retro Anime Palette
    if (remaining <= 0) {
        return { text: formatted, color: 'text-white', bg: 'bg-[#ffb7c5] border border-[#2c2c54]' } // Late (Pink)
    }
    
    if (remaining < 2 * 60 * 1000) {
        return { text: formatted, color: 'text-[#2c2c54]', bg: 'bg-[#fffdd0] border border-[#2c2c54]' } // Warning (Cream/Yellow)
    }
    return { text: formatted, color: 'text-white', bg: 'bg-[#a0d8ef] border border-[#2c2c54]' } // Good (Blue)
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
      case 'drinks': return { label: 'НАПИТКИ', icon: <Coffee size={18} className="text-[#a0d8ef]" /> }
      case 'rolls_cold': return { label: 'РОЛЛЫ (ХОЛ)', icon: <Snowflake size={18} className="text-[#a0d8ef]" /> }
      case 'rolls_hot': return { label: 'РОЛЛЫ (ГОР)', icon: <Flame size={18} className="text-[#ffb7c5]" /> }
      case 'cold': return { label: 'ХОЛОДНЫЙ ЦЕХ', icon: <Snowflake size={18} className="text-[#a0d8ef]" /> }
      case 'hot': return { label: 'ГОРЯЧИЙ ЦЕХ', icon: <Flame size={18} className="text-[#ffb7c5]" /> }
      default: return { label: 'ПРОЧЕЕ', icon: <Circle size={18} className="text-gray-400" /> }
    }
  }

  if (loading) return <div className="p-10 text-center text-[#2c2c54] font-bold animate-pulse">ЗАГРУЗКА ДАННЫХ...</div>
  if (!order) return null

  return (
    <div className="min-h-screen pb-20 relative bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
      <div className="scanlines"></div>

      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md p-4 shadow-sm flex items-center justify-between border-b-2 border-[#ffb7c5]">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[#ffb7c5] hover:text-[#2c2c54] transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#2c2c54]" style={{ fontFamily: 'var(--font-retro)' }}>СТОЛИК {order.table_number}</h1>
            <span className={`text-[10px] px-2 py-0.5 font-bold uppercase border rounded-full ${order.status === 'active' ? 'bg-[#a0d8ef] text-white border-[#2c2c54]' : 'bg-gray-200 text-gray-500 border-gray-400'}`}>
              {order.status === 'active' ? 'ОТКРЫТ' : 'ЗАКРЫТ'}
            </span>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6 max-w-lg mx-auto relative z-10">
        {order.status === 'active' && (
          <Link 
            href={`/orders/${id}/add`}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-[#a0d8ef] text-[#a0d8ef] hover:bg-[#a0d8ef] hover:text-white font-bold uppercase rounded-xl transition-all shadow-sm active:translate-y-1"
          >
            <PlusCircle size={20} />
            ДОБАВИТЬ ПОЗИЦИИ
          </Link>
        )}

        {items.length === 0 ? (
           <div className="retro-card p-8 text-center text-gray-400 font-bold bg-white">НЕТ БЛЮД</div>
        ) : (
          <div className="space-y-6">
            {stationOrder.map(stationKey => {
              const stationItems = groupedItems[stationKey]
              if (!stationItems || stationItems.length === 0) return null
              
              const { label, icon } = getStationLabel(stationKey)

              return (
                <div key={stationKey} className="retro-card p-0 bg-white overflow-hidden">
                  <div className="bg-[#f0f8ff] px-4 py-2 border-b-2 border-[#e6e6fa] flex items-center gap-2 font-bold text-[#2c2c54] uppercase text-xs">
                    {icon}
                    {label}
                  </div>
                  
                  {stationItems.map((item) => {
                    const timer = getTimerStatus(item.created_at)
                    const title = item.item_title || item.menu_items?.title || 'НЕИЗВЕСТНО'

                    return (
                      <div 
                        key={item.id} 
                        className={`flex items-start p-4 border-b border-dashed border-gray-200 last:border-0 transition-colors ${
                          item.served ? 'bg-gray-50 opacity-60 grayscale' : 'hover:bg-[#fff0f5]'
                        }`}
                      >
                        <div 
                          onClick={() => toggleServed(item.id, item.served)}
                          className="flex-1 flex items-start cursor-pointer"
                        >
                          <div className="mt-1 mr-4">
                            {item.served ? (
                              <CheckCircle className="text-[#a0d8ef]" size={24} />
                            ) : (
                              <Circle className="text-gray-300" size={24} />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className={`font-bold text-lg leading-tight uppercase ${item.served ? 'text-gray-400 line-through' : 'text-[#2c2c54]'}`} style={{ fontFamily: 'var(--font-soft)' }}>
                                {title}
                              </p>
                              
                              {!item.served && (
                                <div className={`ml-2 flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-lg shadow-sm ${timer.bg} ${timer.color}`}>
                                  <Clock size={10} />
                                  {timer.text}
                                </div>
                              )}
                            </div>
                            
                            {item.quantity > 1 && (
                              <span className="inline-block mt-2 px-2 py-0.5 bg-[#e6e6fa] text-[#2c2c54] text-xs font-bold rounded-full border border-[#2c2c54]">
                                x{item.quantity}
                              </span>
                            )}
                          </div>
                        </div>

                        {!item.served && order.status === 'active' && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteItem(item.id)
                            }}
                            className="ml-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
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

        {order.status === 'active' && (
          <button
            onClick={closeOrder}
            className="w-full retro-button bg-[#2c2c54] text-white border-white hover:bg-[#1a1a3a] shadow-lg"
          >
            ЗАКРЫТЬ СТОЛ (СЧЕТ)
          </button>
        )}
      </div>
    </div>
  )
}
