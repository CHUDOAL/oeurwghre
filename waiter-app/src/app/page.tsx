'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PlusCircle, BookOpen, LogOut, Pencil, User } from 'lucide-react'
import Assistant from '@/components/Assistant'

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

  const dashboardMessages = [
    `С возвращением, ${user}.`,
    "Новые заказы?",
    "Ожидаю указаний.",
    "Система в норме."
  ]

  if (loading) return <div className="p-8 text-center tracking-widest uppercase text-gray-400">Загрузка...</div>

  if (!user) return null

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#f4f4f0]">
      
      {/* Assistant */}
      <div className="fixed -bottom-12 right-0 z-0 h-[450px] w-[350px] pointer-events-auto opacity-100">
         <Assistant 
            src="/waifu-dashboard.png" 
            messages={dashboardMessages}
            bubblePosition="top-left"
            className="h-full w-full"
         />
      </div>

      <header className="sticky top-0 z-20 bg-[#f4f4f0]/95 backdrop-blur-sm p-6 flex justify-between items-center border-b border-[#e0e0e0]">
        <div>
          <h1 className="text-xl tracking-widest font-serif">TANUKI</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#bc002d] rounded-full"></span>
            {user?.toUpperCase()}
          </p>
        </div>
        <button onClick={handleLogout} className="text-gray-400 hover:text-[#bc002d] transition-colors border border-gray-300 rounded-full p-2">
          <LogOut size={16} />
        </button>
      </header>

      <main className="p-6 relative z-10 pb-40 max-w-3xl mx-auto xl:mx-0">
        <div className="grid grid-cols-2 gap-6 mb-12">
          <Link href="/orders/new" className="jp-card p-8 flex flex-col items-center justify-center gap-4 group cursor-pointer aspect-square">
            <PlusCircle size={32} className="text-gray-800 group-hover:scale-110 transition-transform" />
            <span className="font-serif tracking-widest text-sm uppercase border-b border-transparent group-hover:border-[#bc002d] pb-1 transition-all">Новый Заказ</span>
          </Link>
          
          <Link href="/menu" className="jp-card p-8 flex flex-col items-center justify-center gap-4 group cursor-pointer aspect-square">
            <BookOpen size={32} className="text-gray-800 group-hover:scale-110 transition-transform" />
            <span className="font-serif tracking-widest text-sm uppercase border-b border-transparent group-hover:border-[#bc002d] pb-1 transition-all">Меню</span>
          </Link>

          <Link href="/admin" className="col-span-2 jp-card p-6 flex flex-row items-center justify-center gap-4 group cursor-pointer">
            <Pencil size={18} className="text-gray-400 group-hover:text-gray-800" />
            <span className="font-serif tracking-widest text-xs uppercase text-gray-500 group-hover:text-gray-800">Редактор Меню</span>
          </Link>
        </div>

        <div>
          <h2 className="mb-6 text-sm text-gray-400 uppercase tracking-[0.2em] font-bold border-l-4 border-[#bc002d] pl-3">
            Активные Столы
          </h2>
          
          {orders.length === 0 ? (
            <div className="text-gray-300 text-center py-16 border border-dashed border-gray-300">
              <p className="font-serif tracking-widest">ПУСТО</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <div className="jp-card p-6 flex justify-between items-center cursor-pointer group bg-white/90 backdrop-blur-sm">
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase tracking-widest mb-1">Table</span>
                      <span className="text-3xl font-serif">{order.table_number}</span>
                    </div>
                    <div className="text-right">
                      <div className={`text-[10px] font-bold uppercase tracking-widest border px-3 py-1 ${order.status === 'active' ? 'border-[#bc002d] text-[#bc002d]' : 'border-gray-300 text-gray-400'}`}>
                        {order.status === 'active' ? 'ACTIVE' : 'CLOSED'}
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
