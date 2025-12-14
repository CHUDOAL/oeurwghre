'use client'

import { useState, useEffect } from 'react'

type AssistantProps = {
  src: string
  alt?: string
  messages: string[]
  className?: string
  bubblePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export default function Assistant({ src, alt = "Assistant", messages, className = "", bubblePosition = "top-right" }: AssistantProps) {
  const [showBubble, setShowBubble] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')

  const speak = () => {
    if (showBubble) {
      setShowBubble(false)
      return
    }

    const msg = messages[Math.floor(Math.random() * messages.length)]
    setCurrentMessage(msg)
    setShowBubble(true)
    
    setTimeout(() => setShowBubble(false), 4000)
  }

  // Random idle speech
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) { 
        speak()
      }
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  const bubbleStyle = {
    top: bubblePosition.includes('top') ? '-80px' : 'auto',
    bottom: bubblePosition.includes('bottom') ? '100%' : 'auto',
    left: bubblePosition.includes('left') ? '0px' : 'auto',
    right: bubblePosition.includes('right') ? '0px' : 'auto',
    marginBottom: '20px'
  }

  return (
    <div className={`relative cursor-pointer transition-all hover:brightness-110 ${className}`} onClick={speak}>
      {/* Speech Bubble */}
      {showBubble && (
        <div className="modern-bubble z-50 whitespace-pre-wrap" style={bubbleStyle}>
          {currentMessage}
        </div>
      )}

      {/* Image Container with Float Animation */}
      <div className="animate-float w-full h-full relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-contain drop-shadow-xl"
        />
      </div>
    </div>
  )
}
