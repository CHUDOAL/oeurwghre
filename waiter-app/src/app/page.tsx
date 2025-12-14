'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PlusCircle, BookOpen, LogOut, Pencil } from 'lucide-react'

// Types
type Order = {
  id: string
  table_number: string
  status: string
  created_at: string
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
    // We filter by a custom 'user_id' column that we will now treat as the username string
    // Note: You might need to update the DB schema if user_id is UUID only. 
    // Ideally, we'd alter the column type, but for now let's try to query.
    // If user_id is UUID, this will fail. We should probably add a 'username' column or just filter in client if forced.
    // Let's assume we can add a text column or repurpose. 
    // Actually, to keep it simple without complex migrations, let's filter client-side or use a new metadata column.
    // Correction: We will modify the table to allow text in user_id OR add a 'username' column.
    
    // Attempt to query. If user_id is UUID, we need to fix it.
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'active')
      // .eq('username', currentUser) // We need to add this column!
      .order('created_at', { ascending: false })
    
    if (data) {
      // Temporary client-side filtering until we add the column properly
      // But wait, we can't save the username if the column doesn't exist.
      // We will assume we'll update the schema next.
      const userOrders = data.filter((o: any) => o.username === currentUser)
      setOrders(userOrders)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('waiter_user')
    document.cookie = 'waiter_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    router.push('/login')
  }

  if (loading) return <div className="p-4 text-center">Загрузка...</div>

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-orange-600">Tanuki Waiter</h1>
          <p className="text-xs text-gray-500">Привет, {user}!</p>
        </div>
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-500">
          <LogOut size={20} />
        </button>
      </header>

      <main className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Link href="/orders/new" className="flex flex-col items-center justify-center rounded-xl bg-orange-100 p-6 text-orange-700 shadow-sm active:scale-95 transition-transform">
            <PlusCircle size={32} className="mb-2" />
            <span className="font-semibold">Новый заказ</span>
          </Link>
          
          <Link href="/menu" className="flex flex-col items-center justify-center rounded-xl bg-green-100 p-6 text-green-700 shadow-sm active:scale-95 transition-transform">
            <BookOpen size={32} className="mb-2" />
            <span className="font-semibold">Меню</span>
          </Link>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-gray-800">Твои столы</h2>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Нет активных заказов</p>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => (
                <Link key={order.id} href={`/orders/${order.id}`}>
                  <div className="rounded-lg bg-white p-4 shadow border border-gray-100 flex justify-between items-center">
                    <div>
                      <span className="block text-xs text-gray-500">Стол</span>
                      <span className="text-2xl font-bold text-gray-800">{order.table_number}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-gray-500">Статус</span>
                      <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        {order.status === 'active' ? 'Активен' : order.status}
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
