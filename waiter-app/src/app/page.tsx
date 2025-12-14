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
    `Привет, ${user}! Готов к работе?`,
    "Проверяю столики...",
    "Не забудь выпить воды!",
    "Кажется, новые гости!",
    "Все работает отлично.",
    "Удачи, семпай! ♡"
  ]

  if (loading) return <div className="p-4 text-center text-[#2c2c54] font-bold animate-pulse">ЗАГРУЗКА...</div>

  if (!user) return null

  return (
    <div className="min-h-screen pb-20 relative overflow-x-hidden">
      <div className="scanlines"></div>

      {/* Assistant (Background Layer) */}
      <div className="fixed bottom-0 right-[-20px] z-0 h-[350px] w-[250px] pointer-events-auto opacity-90">
         <Assistant 
            src="/waifu-dashboard.png" 
            messages={dashboardMessages}
            bubblePosition="top-left"
            className="h-full w-full"
         />
      </div>

      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md p-4 shadow-sm flex justify-between items-center border-b-2 border-[#e6e6fa]">
        <div className="flex items-center gap-3">
          <Coffee size={24} className="text-[#ffb7c5]" />
          <div>
            <h1 className="text-xl text-[#2c2c54]" style={{ fontFamily: 'var(--font-retro)' }}>
              TANUKI<span className="text-[#a0d8ef]">CAFE</span>
            </h1>
            <p className="text-xs text-gray-500 font-bold flex items-center gap-1">
              <User size={10} /> ОФИЦИАНТ: {user?.toUpperCase()}
            </p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors">
          <LogOut size={24} />
        </button>
      </header>

      <main className="p-4 space-y-8 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/orders/new" className="group retro-card p-6 flex flex-col items-center justify-center bg-white hover:bg-[#fff0f5]">
            <PlusCircle size={40} className="mb-3 text-[#ffb7c5] group-hover:scale-110 transition-transform" />
            <span className="font-bold text-[#2c2c54] text-sm uppercase">Новый Заказ</span>
          </Link>
          
          <Link href="/menu" className="group retro-card p-6 flex flex-col items-center justify-center bg-white hover:bg-[#e0ffff]">
            <BookOpen size={40} className="mb-3 text-[#a0d8ef] group-hover:scale-110 transition-transform" />
            <span className="font-bold text-[#2c2c54] text-sm uppercase">Меню</span>
          </Link>

          <Link href="/admin" className="col-span-2 group retro-card p-4 flex flex-row items-center justify-center gap-3 bg-white hover:bg-[#f3e5f5]">
            <Pencil size={24} className="text-[#dcd0ff]" />
            <span className="font-bold text-[#2c2c54] text-sm uppercase">Управление Меню (Админ)</span>
          </Link>
        </div>

        <div>
          <h2 className="mb-4 text-lg text-[#2c2c54] uppercase flex items-center gap-2 font-bold bg-white/50 inline-block px-3 py-1 rounded-lg">
            <span className="w-2 h-2 bg-[#ffb7c5] rounded-full animate-pulse"></span>
            Активные Столы
          </h2>
          
          {orders.length === 0 ? (
            <div className="text-gray-400 text-center py-12 border-2 border-dashed border-[#e6e6fa] rounded-xl bg-white/50">
              <p className="font-bold text-sm">НЕТ АКТИВНЫХ ЗАКАЗОВ</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <div className="retro-card p-4 flex justify-between items-center hover:bg-white transition-colors bg-white/90">
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">Столик №</span>
                      <span className="text-3xl font-bold text-[#2c2c54]" style={{ fontFamily: 'var(--font-retro)' }}>{order.table_number}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-gray-400 uppercase font-bold mb-1">Статус</span>
                      <span className={`inline-block px-3 py-1 text-[10px] font-bold rounded-full border border-[#2c2c54] ${order.status === 'active' ? 'bg-[#a0d8ef] text-white' : 'bg-gray-100'}`}>
                        {order.status === 'active' ? 'АКТИВЕН' : order.status}
                      </span>
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
