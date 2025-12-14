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
      localStorage.setItem('waiter_user', user)
      document.cookie = `waiter_user=${user}; path=/; max-age=86400`
      router.push('/')
      router.refresh()
    } else {
      setError('ACCESS DENIED. TRY "gross" OR "maxim"')
    }
  }

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* Background Anime Grid */}
      <div className="absolute inset-0 z-[-1] perspective-grid opacity-30"></div>
      
      {/* Left Side: Character Art Placeholder */}
      <div className="hidden lg:block w-1/2 h-full relative">
        <div className="absolute bottom-0 left-10 w-full h-[90%] pointer-events-none">
          {/* PLACEHOLDER FOR WAIFU - REPLACE src with "/waifu-login.png" */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://placehold.co/600x900/ff2a6d/white/png?text=YOUR+WAIFU+HERE" 
            alt="Character" 
            className="h-full object-contain drop-shadow-[0_0_15px_rgba(255,42,109,0.5)]"
          />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative z-10">
        <div className="absolute top-10 right-10 w-32 h-32 border-r-2 border-t-2 border-neon-blue opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border-l-2 border-b-2 border-neon-pink opacity-50"></div>
        
        <div className="w-full max-w-md cyber-card p-8 relative">
          <h1 className="mb-8 text-center text-3xl font-bold text-white tracking-widest glitch-text" data-text="SYSTEM LOGIN">
            SYSTEM LOGIN
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neon-blue uppercase tracking-widest">Identify Yourself</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-gray-700 text-white p-3 rounded-none focus:border-neon-pink focus:outline-none focus:ring-1 focus:ring-neon-pink transition-all font-mono text-lg tracking-wider cyber-input"
                placeholder="CODENAME"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 font-bold tracking-wide animate-pulse border border-red-500/50 p-2 bg-red-500/10 text-center">
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-neon-pink/10 border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-black font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,42,109,0.6)] clip-path-badge"
            >
              Initialize Link
            </button>
          </form>
          
          <div className="mt-6 text-center text-[10px] text-gray-500 font-mono">
            SECURE CONNECTION ESTABLISHED // V.2026
          </div>
        </div>
      </div>
    </div>
  )
}
