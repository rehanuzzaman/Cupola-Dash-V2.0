"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Globe, Zap, Eye, CloudRain, Wrench, Satellite, Trophy, Radio, Star } from "lucide-react"
import { SpaceStation3D } from "@/components/celebration-effects"
import VRMode from "@/components/vr-mode"

// Game levels will be dynamically created with progress
const baseGameLevels = [
  {
    id: 1,
    title: "Cupola Training",
    description: "Learn to identify Earth features from the ISS cupola",
    icon: Eye,
    difficulty: "Beginner",
    unlocked: true,
    href: "/game/cupola-training",
  },
  {
    id: 2,
    title: "Day/Night Cycles",
    description: "Experience 16 sunsets and sunrises in orbit",
    icon: Globe,
    difficulty: "Beginner",
    unlocked: true,
    href: "/game/day-night",
  },
  {
    id: 3,
    title: "Weather Monitoring",
    description: "Track storms and climate patterns from space",
    icon: CloudRain,
    difficulty: "Intermediate",
    unlocked: true,
    href: "/game/weather",
  },
  {
    id: 4,
    title: "Disaster Response",
    description: "Help coordinate Earth emergency response",
    icon: Satellite,
    difficulty: "Intermediate",
    unlocked: true,
    href: "/game/disaster",
  },
  {
    id: 5,
    title: "NBL Training",
    description: "Master weightlessness in the Neutral Buoyancy Lab",
    icon: Zap,
    difficulty: "Advanced",
    unlocked: true,
    href: "/game/nbl-training",
  },
  {
    id: 6,
    title: "Spacewalk Prep",
    description: "Advanced weightlessness physics challenges",
    icon: Wrench,
    difficulty: "Advanced",
    unlocked: true,
    href: "/game/spacewalk",
  },
]

export default function LevelsPage() {
  const [astronaut, setAstronaut] = useState<any>(null)
  const [levelProgress, setLevelProgress] = useState<Record<number, number>>({})

  useEffect(() => {
    const stored = localStorage.getItem("astronaut")
    if (stored) {
      setAstronaut(JSON.parse(stored))
    }

    // Load progress from individual level storage
    const progress: Record<number, number> = {}
    for (let i = 1; i <= 6; i++) {
      const levelProgress = localStorage.getItem(`levelProgress_${i}`)
      if (levelProgress) {
        progress[i] = parseInt(levelProgress)
      }
    }
    setLevelProgress(progress)
  }, [])

  // Update progress when levelProgress changes
  useEffect(() => {
    localStorage.setItem("levelProgress", JSON.stringify(levelProgress))
  }, [levelProgress])

  const updateProgress = (levelId: number, progress: number) => {
    setLevelProgress(prev => ({
      ...prev,
      [levelId]: Math.max(prev[levelId] || 0, progress)
    }))
  }

  // Create game levels with current progress
  const gameLevels = baseGameLevels.map(level => ({
    ...level,
    progress: levelProgress[level.id] || 0
  }))

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-accent"
      case "Advanced":
        return "bg-red-500"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="min-h-screen earth-orbit-bg flex flex-col p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-pink-900/40 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      <SpaceStation3D />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <Link href="/login">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        {astronaut && (
          <div className="flex items-center space-x-3 text-white backdrop-blur-sm bg-white/10 rounded-lg px-3 py-2 border border-white/20">
            <span className="text-2xl">{astronaut.avatar?.emoji}</span>
            <div>
              <div className="font-semibold">{astronaut.name}</div>
              <div className="text-sm text-slate-200">Mission Commander</div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-md border border-purple-400/50 rounded-full px-6 py-3 mb-4 shadow-lg">
          <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
          <span className="text-white font-bold text-base">ISS 25th Anniversary</span>
          <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg text-shadow-glow">Mission Control</h1>
        <p className="text-slate-200 text-lg">Select your anniversary training mission</p>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-4 relative z-10">
        {gameLevels.map((level) => {
          const Icon = level.icon
          return (
            <Card
              key={level.id}
              className={`bg-white/10 backdrop-blur-md border-white/20 transition-all shadow-xl ${
                level.unlocked
                  ? "hover:bg-white/15 cursor-pointer hover:border-purple-400/50 hover:shadow-2xl"
                  : "opacity-60 cursor-not-allowed"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{level.title}</CardTitle>
                      <CardDescription className="text-sm text-slate-200">{level.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(level.difficulty)}>{level.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between text-sm mb-1 text-slate-200">
                      <span>Progress</span>
                      <span>{level.progress}%</span>
                    </div>
                    <Progress value={level.progress} className="h-2" />
                  </div>
                  {level.unlocked ? (
                    <Link href={level.href}>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        Start
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" disabled>
                      Locked
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}

        <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border-purple-400/50 transition-all hover:from-purple-600/30 hover:to-pink-600/30 cursor-pointer shadow-xl hover:shadow-2xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
                  <Radio className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg text-white">Live ISS Data</CardTitle>
                  <CardDescription className="text-sm text-slate-200">
                    Real-time ISS tracking and NASA imagery
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-yellow-500 text-black animate-pulse">Live</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <p className="text-sm text-slate-200">
                  Connect with real NASA APIs for live ISS position, crew info, and space weather
                </p>
              </div>
              <Link href="/live-iss">
                <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  Explore
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-2 text-yellow-400">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">Achievements: 0/12</span>
            </div>
            <p className="text-sm text-slate-200 mt-1">Complete missions to earn astronaut badges</p>
          </CardContent>
        </Card>
        
        <VRMode />
      </div>
    </div>
  )
}
