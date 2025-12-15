'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChefHat } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validUsers = ['gross', 'maxim']
    const user = username.trim().toLowerCase()

    if (validUsers.includes(user)) {
      localStorage.setItem('waiter_user', user)
      document.cookie = `waiter_user=${user}; path=/; max-age=86400`
      router.push('/')
      router.refresh()
    } else {
      setError('Неверный логин')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-sm bg-white rounded-[32px] shadow-xl p-8 border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
            <ChefHat size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Tanuki Waiter</h1>
          <p className="text-slate-500">Вход для персонала</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Ваш Логин</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="app-input"
              placeholder="gross / maxim"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-2xl text-center animate-in fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="app-button w-full text-lg py-4 shadow-lg shadow-orange-500/20"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}
