'use client'

import { useEffect, useState, use } from 'react'
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
      alert('Order not found')
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
      alert('Error updating status')
    }
  }

  const deleteItem = async (itemId: string) => {
    if (!confirm('DELETE ITEM FROM DATABASE?')) return

    const { error } = await supabase
      .from('order_items')
      .delete()
      .eq('id', itemId)

    if (error) {
      alert('Delete error: ' + error.message)
    } else {
      setItems(items.filter(i => i.id !== itemId))
    }
  }

  const closeOrder = async () => {
    if (!confirm('CLOSE ORDER?')) return

    const { error } = await supabase
      .from('orders')
      .update({ status: 'completed' })
      .eq('id', id)

    if (error) {
      alert('Error closing order')
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
        return { text: formatted, color: 'text-neon-pink', bg: 'bg-black border border-neon-pink' }
    }
    
    if (remaining < 2 * 60 * 1000) {
        return { text: formatted, color: 'text-neon-yellow', bg: 'bg-black border border-neon-yellow' }
    }
    return { text: formatted, color: 'text-neon-blue', bg: 'bg-black border border-neon-blue' }
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
      case 'drinks': return { label: 'DRINKS', icon: <Coffee size={18} className="text-neon-blue" /> }
      case 'rolls_cold': return { label: 'ROLLS [COLD]', icon: <Snowflake size={18} className="text-neon-blue" /> }
      case 'rolls_hot': return { label: 'ROLLS [HOT]', icon: <Flame size={18} className="text-neon-pink" /> }
      case 'cold': return { label: 'COLD KITCHEN', icon: <Snowflake size={18} className="text-neon-blue" /> }
      case 'hot': return { label: 'HOT KITCHEN', icon: <Flame size={18} className="text-neon-pink" /> }
      default: return { label: 'OTHER', icon: <Circle size={18} className="text-gray-400" /> }
    }
  }

  if (loading) return <div className="p-10 text-center text-neon-blue font-mono animate-pulse">DOWNLOADING ORDER DATA...</div>
  if (!order) return null

  return (
    <div className="min-h-screen pb-20 relative">
      <header className="sticky top-0 z-10 bg-[#01012b]/90 backdrop-blur-md p-4 shadow-[0_2px_10px_rgba(5,217,232,0.2)] flex items-center justify-between border-b border-neon-blue/30">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-neon-blue hover:text-neon-pink transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white uppercase tracking-widest font-mono glitch-text" data-text={`TABLE ${order.table_number}`}>TABLE {order.table_number}</h1>
            <span className={`text-[10px] px-2 py-0.5 font-bold uppercase tracking-widest border ${order.status === 'active' ? 'text-neon-blue border-neon-blue' : 'text-gray-500 border-gray-500'}`}>
              {order.status === 'active' ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6 max-w-lg mx-auto relative z-10">
        {order.status === 'active' && (
          <Link 
            href={`/orders/${id}/add`}
            className="w-full flex items-center justify-center gap-2 py-3 bg-neon-blue/10 border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black font-bold uppercase tracking-[0.2em] transition-all duration-300"
          >
            <PlusCircle size={20} />
            ADD ITEMS
          </Link>
        )}

        {items.length === 0 ? (
           <div className="cyber-card p-8 text-center text-gray-400 font-mono">NO ITEMS DETECTED</div>
        ) : (
          <div className="space-y-6">
            {stationOrder.map(stationKey => {
              const stationItems = groupedItems[stationKey]
              if (!stationItems || stationItems.length === 0) return null
              
              const { label, icon } = getStationLabel(stationKey)

              return (
                <div key={stationKey} className="cyber-card p-0">
                  <div className="bg-black/40 px-4 py-2 border-b border-neon-blue/30 flex items-center gap-2 font-bold text-neon-blue uppercase tracking-widest text-xs">
                    {icon}
                    {label}
                  </div>
                  
                  {stationItems.map((item) => {
                    const timer = getTimerStatus(item.created_at)
                    const title = item.item_title || item.menu_items?.title || 'UNKNOWN ENTITY'

                    return (
                      <div 
                        key={item.id} 
                        className={`flex items-start p-4 border-b border-gray-700/50 last:border-0 transition-colors ${
                          item.served ? 'bg-black/60 opacity-50' : 'hover:bg-white/5'
                        }`}
                      >
                        <div 
                          onClick={() => toggleServed(item.id, item.served)}
                          className="flex-1 flex items-start cursor-pointer"
                        >
                          <div className="mt-1 mr-4">
                            {item.served ? (
                              <CheckCircle className="text-neon-pink" size={24} />
                            ) : (
                              <Circle className="text-gray-600" size={24} />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className={`font-bold text-lg leading-tight uppercase font-mono ${item.served ? 'text-gray-500 line-through decoration-neon-pink' : 'text-white'}`}>
                                {title}
                              </p>
                              
                              {!item.served && (
                                <div className={`ml-2 flex items-center gap-1 px-2 py-1 text-[10px] font-mono font-bold ${timer.bg} ${timer.color}`}>
                                  <Clock size={10} />
                                  {timer.text}
                                </div>
                              )}
                            </div>
                            
                            {item.quantity > 1 && (
                              <span className="inline-block mt-2 px-2 py-0.5 bg-neon-purple text-black text-xs font-bold uppercase">
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
                            className="ml-2 p-2 text-gray-500 hover:text-red-500 transition-colors"
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
            className="w-full py-4 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_15px_rgba(255,42,109,0.3)] hover:shadow-[0_0_30px_rgba(255,42,109,0.6)]"
          >
            TERMINATE SESSION (CLOSE TABLE)
          </button>
        )}
      </div>
    </div>
  )
}
