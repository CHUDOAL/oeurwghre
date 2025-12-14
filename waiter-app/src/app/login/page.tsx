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
      setError('Ошибка доступа')
    }
  }

  const loginMessages = [
    "Идентификация...",
    "Добро пожаловать.",
    "Система готова.",
    "Хорошей смены."
  ]

  return (
    <div className="flex min-h-screen relative overflow-hidden bg-[#f4f4f0]">
      {/* Decorative Circle (Rising Sun) */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] rounded-full bg-[#bc002d] opacity-10"></div>
      
      {/* Left: Assistant */}
      <div className="hidden lg:block w-1/3 h-full relative pointer-events-auto border-r border-[#e0e0e0] bg-white">
        <div className="absolute bottom-0 left-10 w-full h-[80%]">
          <Assistant 
            src="/waifu-login.png" 
            messages={loginMessages}
            bubblePosition="top-right"
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md space-y-12">
          <div className="text-center space-y-2">
            <h1 className="text-4xl tracking-widest uppercase">Tanuki<span className="text-[#bc002d]">.Sys</span></h1>
            <p className="text-sm text-gray-400 tracking-[0.2em] uppercase">Staff Access Terminal</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Идентификатор</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="jp-input text-2xl"
                placeholder="Имя сотрудника"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-[#bc002d] border-l-2 border-[#bc002d] pl-4 py-2 bg-red-50">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full jp-button jp-button-red h-14"
            >
              ВХОД В СИСТЕМУ
            </button>
          </form>
          
          <div className="flex justify-center gap-4 text-[10px] text-gray-300 uppercase tracking-widest">
            <span>Secure</span>
            <span>•</span>
            <span>Private</span>
            <span>•</span>
            <span>Logged</span>
          </div>
        </div>
      </div>
    </div>
  )
}
