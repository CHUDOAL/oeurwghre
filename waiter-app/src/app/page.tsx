'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PlusCircle, BookOpen, LogOut, Pencil, User, Coffee } from 'lucide-react'
import Assistant from '@/components/Assistant'

// Types
type Order = {
  id: string
  table_number: string
  status: string
  created_at: string
  username?: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<string | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check local auth
    const storedUser = localStorage.getItem('waiter_user')
    if (!storedUser) {
      router.push('/login')
    } else {
      setUser(storedUser)
      fetchOrders(storedUser)
    }
    setLoading(false)
  }, [router])

  const fetchOrders = async (currentUser: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
    
    if (data) {
      const userOrders = data.filter((o: any) => o.username === currentUser)
      setOrders(userOrders)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('waiter_user')
    document.cookie = 'waiter_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  const dashboardMessages = [
    `Привет, ${user}! \nПолон сил?`,
    "Проверяю столики...",
    "Не забудь передохнуть!",
    "Кажется, новые гости!",
    "Работаем красиво! ✨",
    "Удачи! ♡"
  ]

  if (loading) return <div className="p-4 text-center text-indigo-500 font-bold animate-pulse">Загрузка системы...</div>

  if (!user) return null

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-slate-50">
      
      {/* Assistant (Background Layer) */}
      {/* Moved down (-bottom-12) to hide cut-off edge during float animation */}
      <div className="fixed -bottom-12 right-0 z-0 h-[400px] w-[300px] pointer-events-auto opacity-100">
         <Assistant 
            src="/waifu-dashboard.png" 
            messages={dashboardMessages}
            bubblePosition="top-left"
            className="h-full w-full"
         />
      </div>

      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md p-4 shadow-sm flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <Coffee size={20} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              Tanuki<span className="text-indigo-600">App</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <User size={10} /> {user?.toUpperCase()}
            </p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full">
          <LogOut size={20} />
        </button>
      </header>

      {/* Main Content with padding to avoid overlapping assistant */}
      <main className="p-4 space-y-8 relative z-10 pb-40 max-w-2xl mx-auto xl:mx-0 xl:max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/orders/new" className="group anime-card p-6 flex flex-col items-center justify-center bg-white hover:bg-indigo-50/50 cursor-pointer">
            <div className="bg-indigo-100 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <PlusCircle size={32} className="text-indigo-600" />
            </div>
            <span className="font-bold text-slate-700 text-sm">Новый Заказ</span>
          </Link>
          
          <Link href="/menu" className="group anime-card p-6 flex flex-col items-center justify-center bg-white hover:bg-pink-50/50 cursor-pointer">
            <div className="bg-pink-100 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <BookOpen size={32} className="text-pink-600" />
            </div>
            <span className="font-bold text-slate-700 text-sm">Меню</span>
          </Link>

          <Link href="/admin" className="col-span-2 group anime-card p-4 flex flex-row items-center justify-center gap-3 bg-white hover:bg-slate-50 cursor-pointer">
            <Pencil size={20} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
            <span className="font-semibold text-slate-500 group-hover:text-slate-700 transition-colors text-sm">Редактор Меню</span>
          </Link>
        </div>

        <div>
          <h2 className="mb-4 text-lg text-slate-800 font-bold flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            Активные Столы
          </h2>
          
          {orders.length === 0 ? (
            <div className="text-slate-400 text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <p className="font-medium text-sm">Нет активных заказов</p>
              <p className="text-xs mt-1">Нажмите "Новый Заказ" чтобы начать</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {orders.map((order) => (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <div className="anime-card p-5 flex justify-between items-center hover:border-indigo-200 cursor-pointer bg-white/95 backdrop-blur-sm">
                    <div>
                      <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Столик</span>
                      <span className="text-4xl font-black text-slate-800">{order.table_number}</span>
                    </div>
                    <div className="text-right">
                      <div className={`status-badge ${order.status === 'active' ? 'status-active' : 'status-closed'}`}>
                        {order.status === 'active' ? 'Активен' : order.status}
                      </div>
                      <div className="text-xs text-slate-400 mt-2 font-medium">
                        {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
