'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PlusCircle, BookOpen, LogOut, Pencil, User, Terminal } from 'lucide-react'

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

  if (loading) return <div className="p-4 text-center text-neon-blue font-mono animate-pulse">LOADING SYSTEM...</div>

  if (!user) return null

  return (
    <div className="min-h-screen pb-20 relative overflow-x-hidden">
      {/* Holographic Assistant (Fixed Bottom Right) */}
      <div className="fixed bottom-0 right-[-20px] z-0 pointer-events-none opacity-80 mix-blend-screen h-[400px] w-[300px]">
         {/* Holographic Assistant */}
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img 
            src="/waifu-dashboard.png" 
            alt="Assistant" 
            className="h-full w-full object-contain drop-shadow-[0_0_20px_rgba(5,217,232,0.4)]"
          />
      </div>

      <header className="sticky top-0 z-10 bg-[#01012b]/90 backdrop-blur-md p-4 shadow-[0_2px_10px_rgba(5,217,232,0.2)] flex justify-between items-center border-b border-neon-blue/30">
        <div className="flex items-center gap-3">
          <Terminal size={24} className="text-neon-pink" />
          <div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple tracking-widest uppercase" style={{ fontFamily: 'var(--font-orbitron)' }}>
              TANUKI<span className="text-neon-blue">2077</span>
            </h1>
            <p className="text-[10px] text-neon-blue font-mono tracking-wider flex items-center gap-1">
              <User size={10} /> OPERATOR: {user?.toUpperCase()}
            </p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-neon-blue hover:text-neon-pink transition-colors">
          <LogOut size={24} />
        </button>
      </header>

      <main className="p-4 space-y-8 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/orders/new" className="group cyber-card p-6 flex flex-col items-center justify-center rounded-sm hover:scale-[1.02] transition-transform duration-300">
            <PlusCircle size={40} className="mb-3 text-neon-pink group-hover:animate-spin-slow" />
            <span className="font-bold text-neon-pink tracking-widest text-sm uppercase">New Order</span>
          </Link>
          
          <Link href="/menu" className="group cyber-card p-6 flex flex-col items-center justify-center rounded-sm hover:scale-[1.02] transition-transform duration-300">
            <BookOpen size={40} className="mb-3 text-neon-blue group-hover:animate-pulse" />
            <span className="font-bold text-neon-blue tracking-widest text-sm uppercase">Menu DB</span>
          </Link>

          <Link href="/admin" className="col-span-2 group cyber-card p-4 flex flex-row items-center justify-center gap-3 rounded-sm hover:scale-[1.02] transition-transform duration-300 border-neon-purple/50">
            <Pencil size={24} className="text-neon-purple" />
            <span className="font-bold text-neon-purple tracking-widest text-sm uppercase">System Config (Admin)</span>
          </Link>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 bg-neon-blue rounded-full animate-ping"></span>
            Active Missions
          </h2>
          
          {orders.length === 0 ? (
            <div className="text-gray-500 text-center py-12 border border-dashed border-gray-700 rounded-lg">
              <p className="font-mono text-xs">NO ACTIVE ORDERS DETECTED</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <div className="cyber-card p-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                    <div>
                      <span className="block text-[10px] text-neon-blue uppercase tracking-wider font-mono">Table Unit</span>
                      <span className="text-3xl font-bold text-white font-mono glitch-text" data-text={order.table_number}>{order.table_number}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Status</span>
                      <span className="inline-block px-3 py-1 text-[10px] font-bold text-black bg-neon-blue uppercase tracking-widest clip-path-badge">
                        {order.status === 'active' ? 'ACTIVE' : order.status}
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
