'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
      // Simple "auth" by storing user in localStorage
      localStorage.setItem('waiter_user', user)
      document.cookie = `waiter_user=${user}; path=/; max-age=86400` // Also set cookie for middleware if needed later
      router.push('/')
      router.refresh()
    } else {
      setError('Неверный логин. Используйте gross или maxim')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Вход для официантов</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Логин</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Введите логин (например, gross)"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}
