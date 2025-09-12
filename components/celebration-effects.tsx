"use client"

import { useEffect, useState } from "react"

interface Balloon {
  id: number
  x: number
  y: number
  color: string
  speed: number
}

interface Confetti {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  speed: number
}

export function CelebrationEffects() {
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [confetti, setConfetti] = useState<Confetti[]>([])
  const [showEffects, setShowEffects] = useState(false)

  useEffect(() => {
    // Trigger celebration effects on mount
    setShowEffects(true)

    // Create balloons
    const newBalloons: Balloon[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      color: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3"][Math.floor(Math.random() * 6)],
      speed: 0.5 + Math.random() * 0.5,
    }))

    // Create confetti
    const newConfetti: Confetti[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 50,
      color: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3", "#a8e6cf"][
        Math.floor(Math.random() * 7)
      ],
      rotation: Math.random() * 360,
      speed: 1 + Math.random() * 2,
    }))

    setBalloons(newBalloons)
    setConfetti(newConfetti)

    // Animate balloons and confetti
    const interval = setInterval(() => {
      setBalloons((prev) =>
        prev
          .map((balloon) => ({
            ...balloon,
            y: balloon.y - balloon.speed,
          }))
          .filter((balloon) => balloon.y > -20),
      )

      setConfetti((prev) =>
        prev
          .map((piece) => ({
            ...piece,
            y: piece.y + piece.speed,
            rotation: piece.rotation + 5,
          }))
          .filter((piece) => piece.y < 120),
      )
    }, 50)

    // Clean up after 10 seconds
    const timeout = setTimeout(() => {
      setShowEffects(false)
      setBalloons([])
      setConfetti([])
    }, 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  if (!showEffects) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Balloons */}
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute w-8 h-10 rounded-full animate-bounce"
          style={{
            left: `${balloon.x}%`,
            top: `${balloon.y}%`,
            backgroundColor: balloon.color,
            boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.2)`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="absolute top-full left-1/2 w-px h-8 bg-gray-400 transform -translate-x-1/2"></div>
        </div>
      ))}

      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg) translateX(-50%)`,
          }}
        />
      ))}
    </div>
  )
}

export function SpaceStation3D() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {/* ISS Model - Simplified 3D representation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
          <div className="relative">
            {/* Main body */}
            <div className="w-32 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg shadow-lg transform rotate-12 animate-spin-slow">
              {/* Solar panels */}
              <div className="absolute -left-16 top-1/2 w-16 h-2 bg-blue-400 transform -translate-y-1/2 animate-pulse"></div>
              <div className="absolute -right-16 top-1/2 w-16 h-2 bg-blue-400 transform -translate-y-1/2 animate-pulse"></div>
              <div className="absolute -left-16 top-1/2 w-16 h-2 bg-blue-500 transform -translate-y-1/2 translate-y-1"></div>
              <div className="absolute -right-16 top-1/2 w-16 h-2 bg-blue-500 transform -translate-y-1/2 translate-y-1"></div>
            </div>
            {/* Cupola */}
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-gray-200 rounded-full transform -translate-x-1/2 -translate-y-2"></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-purple-300 rounded-full animate-ping animation-delay-2000"></div>
      </div>
    </div>
  )
}
