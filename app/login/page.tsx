"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Rocket, Star } from "lucide-react"
import { CelebrationEffects, SpaceStation3D } from "@/components/celebration-effects"

const astronautAvatars = [
  { id: 1, name: "Commander Nova", emoji: "👨‍🚀" },
  { id: 2, name: "Captain Luna", emoji: "👩‍🚀" },
  { id: 3, name: "Pilot Cosmos", emoji: "🧑‍🚀" },
  { id: 4, name: "Engineer Star", emoji: "👩‍🚀" },
]

export default function LoginPage() {
  const [selectedAvatar, setSelectedAvatar] = useState(1)
  const [astronautName, setAstronautName] = useState("")

  const handleStartMission = () => {
    if (astronautName.trim()) {
      // Store user data in localStorage for demo
      localStorage.setItem(
        "astronaut",
        JSON.stringify({
          name: astronautName,
          avatar: astronautAvatars.find((a) => a.id === selectedAvatar),
        }),
      )
      window.location.href = "/levels"
    }
  }

  // Keyboard navigation for avatars
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setSelectedAvatar((prev) => Math.max(1, prev - 1))
      } else if (event.key === "ArrowRight") {
        setSelectedAvatar((prev) => Math.min(astronautAvatars.length, prev + 1))
      } else if (event.key === "Enter") {
        handleStartMission()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedAvatar, astronautName])

  return (
    <div className="min-h-screen iss-bg stars-bg flex flex-col p-4 relative overflow-hidden">
      <CelebrationEffects />
      <SpaceStation3D />

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center space-x-2 text-white">
          <Rocket className="w-5 h-5" />
          <span className="font-semibold">ISS Explorer</span>
        </div>
      </div>

      <div className="text-center mb-6 relative z-10">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-3 mb-4">
          <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
          <span className="text-white font-bold text-lg">ISS 25th Anniversary</span>
          <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
        </div>
        <p className="text-purple-200 text-sm">Celebrating 25 Years of International Space Station</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="max-w-md w-full">
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-card-foreground">Astronaut Registration</CardTitle>
              <CardDescription>Join the ISS 25th Anniversary Mission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center mb-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                  <div className="text-2xl">🛰️</div>
                </div>
                <p className="text-xs text-muted-foreground">International Space Station</p>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Astronaut Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your astronaut name"
                  value={astronautName}
                  onChange={(e) => setAstronautName(e.target.value)}
                />
              </div>

              {/* Avatar Selection */}
              <div className="space-y-3">
                <Label>Choose Your Avatar</Label>
                <div className="grid grid-cols-2 gap-3">
                  {astronautAvatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedAvatar === avatar.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{avatar.emoji}</div>
                      <div className="text-sm font-medium">{avatar.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Button */}
              <Button
                onClick={handleStartMission}
                disabled={!astronautName.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Launch to ISS Anniversary Mission
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
