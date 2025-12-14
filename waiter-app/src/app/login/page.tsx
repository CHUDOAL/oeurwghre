'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Assistant from '@/components/Assistant'

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
      setError('Ошибка доступа. Попробуйте "gross" или "maxim"')
    }
  }

  const loginMessages = [
    "Добро пожаловать!",
    "Готов к работе?",
    "Не забудь свой бейджик!",
    "Сегодня будет отличный день! ♡",
    "Тануки ждет тебя!"
  ]

  return (
    <div className="flex min-h-screen relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
      <div className="scanlines"></div>
      
      {/* Left Side: Character Art */}
      <div className="hidden lg:block w-1/2 h-full relative pointer-events-auto">
        <div className="absolute bottom-0 left-10 w-full h-[90%]">
          <Assistant 
            src="/waifu-login.png" 
            messages={loginMessages}
            bubblePosition="top-right"
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative z-10">
        
        <div className="w-full max-w-md retro-card p-8 relative bg-white/90">
          <h1 className="mb-6 text-center text-3xl font-bold text-[#2c2c54] tracking-wider">
            ВХОД В СИСТЕМУ
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#2c2c54] uppercase">Идентификатор</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full retro-input text-lg"
                placeholder="Ваше имя..."
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 font-bold border-2 border-red-200 bg-red-50 p-2 rounded-lg text-center">
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full retro-button"
            >
              Начать смену
            </button>
          </form>
          
          <div className="mt-6 text-center text-xs text-gray-400">
            Tanuki System v2.0 © 1998
          </div>
        </div>
      </div>
    </div>
  )
}
