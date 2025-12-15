'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, BookOpen, LogOut, Settings, User, UtensilsCrossed } from 'lucide-react'

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
    const { data } = await supabase
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

  if (loading) return null // Clean loading state

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 border-b border-slate-100 px-6 py-4 flex justify-between items-center safe-top">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Tanuki</h1>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <User size={12} /> {user}
          </p>
        </div>
        <button 
          onClick={handleLogout} 
          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LogOut size={18} />
        </button>
      </header>

      <main className="p-6 max-w-5xl mx-auto space-y-8">
        
        {/* Quick Actions (Bento Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/orders/new" className="app-card app-card-interactive p-6 flex flex-col justify-between h-40 md:col-span-2 bg-orange-500 text-white border-none shadow-orange-200 shadow-xl">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Plus size={24} className="text-white" />
            </div>
            <div>
              <span className="text-white/80 text-sm font-medium">Создать</span>
              <h3 className="text-2xl font-bold text-white">Новый Заказ</h3>
            </div>
          </Link>

          <Link href="/menu" className="app-card app-card-interactive p-6 flex flex-col justify-between h-40 bg-white">
            <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-500">
              <BookOpen size={24} />
            </div>
            <span className="font-bold text-slate-700">Меню</span>
          </Link>

          <Link href="/admin" className="app-card app-card-interactive p-6 flex flex-col justify-between h-40 bg-white">
            <div className="bg-purple-50 w-12 h-12 rounded-2xl flex items-center justify-center text-purple-500">
              <Settings size={24} />
            </div>
            <span className="font-bold text-slate-700">Админ</span>
          </Link>
        </div>

        {/* Active Tables Section */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-bold text-slate-800">Активные столы</h2>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
              {orders.length}
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <UtensilsCrossed size={32} />
              </div>
              <p className="text-slate-500 font-medium">Нет активных заказов</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order) => (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <div className="app-card app-card-interactive p-5 flex items-center justify-between group hover:border-orange-200">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-xl text-slate-700 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                        {order.table_number}
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Столик</div>
                        <div className="text-slate-500 text-xs font-medium mt-0.5">
                          {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"></div>
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
