"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Stars, Sparkles } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Globe, Play, Pause, RotateCcw } from "lucide-react"
import * as THREE from "three"

function EarthDayNight({ timeOfDay }: { timeOfDay: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  const lightRef = useRef<THREE.DirectionalLight>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.01
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001
    }
  })

  // Calculate sun position based on time of day (0-1)
  const sunAngle = timeOfDay * Math.PI * 2
  const sunX = Math.cos(sunAngle) * 12
  const sunZ = Math.sin(sunAngle) * 12

  const lightIntensity = Math.max(0.1, Math.cos(sunAngle) + 0.3)
  const lightColor = timeOfDay < 0.5 ? "#FFE4B5" : "#4169E1"

  return (
    <group>
      <directionalLight
        ref={lightRef}
        position={[sunX, 0, sunZ]}
        intensity={lightIntensity}
        color={lightColor}
        castShadow
      />

      <ambientLight intensity={0.25} color={timeOfDay < 0.5 ? "#87CEEB" : "#191970"} />

      <pointLight position={[8, 8, 8]} intensity={0.6} color="#FF6B6B" />
      <pointLight position={[-8, -8, -8]} intensity={0.4} color="#4ECDC4" />
      <pointLight position={[0, 10, -10]} intensity={0.5} color="#45B7D1" />

      <Sphere ref={meshRef} args={[2, 128, 128]} receiveShadow castShadow>
        <meshStandardMaterial
          map={new THREE.TextureLoader().load("/earth-texture-map.png")}
          normalMap={new THREE.TextureLoader().load("/earth-normal-map.png")}
          roughness={0.7}
          metalness={0.1}
          bumpScale={0.05}
        />
      </Sphere>

      <Sphere ref={atmosphereRef} args={[2.08, 64, 64]}>
        <meshBasicMaterial
          color={timeOfDay < 0.5 ? "#87CEEB" : "#4169E1"}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial
          color={timeOfDay < 0.5 ? "#FFE4B5" : "#191970"}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.008, 8, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      {/* ISS position indicator */}
      <group position={[Math.cos(timeOfDay * Math.PI * 2) * 2.8, 0, Math.sin(timeOfDay * Math.PI * 2) * 2.8]}>
        <Sphere args={[0.03, 8, 8]}>
          <meshBasicMaterial color="#FFD700" />
        </Sphere>
      </group>

      <Stars
        radius={120}
        depth={70}
        count={timeOfDay > 0.5 ? 12000 : 6000}
        factor={8}
        saturation={0.4}
        fade
        speed={0.8}
      />

      <Sparkles
        count={timeOfDay > 0.5 ? 300 : 100}
        scale={20}
        size={4}
        speed={0.4}
        color={timeOfDay > 0.5 ? "#ffffff" : "#FFE4B5"}
      />
      <Sparkles count={150} scale={30} size={2} speed={0.6} color="#E91E63" />
      <Sparkles count={100} scale={40} size={3} speed={0.2} color="#9C27B0" />

      <mesh>
        <sphereGeometry args={[100, 32, 32]} />
        <meshBasicMaterial
          color={timeOfDay > 0.5 ? "#1A0033" : "#000033"}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, timeOfDay * Math.PI, 0]}>
        <torusGeometry args={[70, 1.5, 8, 100]} />
        <meshBasicMaterial color="#FF6B6B" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

function Scene({ timeOfDay }: { timeOfDay: number }) {
  return (
    <>
      <EarthDayNight timeOfDay={timeOfDay} />
      <OrbitControls enablePan={false} minDistance={3.5} maxDistance={12} enableDamping={true} dampingFactor={0.05} />
    </>
  )
}

export default function DayNightPage() {
  const [timeOfDay, setTimeOfDay] = useState([0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [orbitCount, setOrbitCount] = useState(0)
  const [sunriseCount, setSunriseCount] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeOfDay(([current]) => {
          const newTime = (current + 0.01) % 1

          // Count sunrises (when crossing from night to day)
          if (current > 0.9 && newTime < 0.1) {
            setSunriseCount((prev) => {
              const newCount = prev + 1
              return newCount
            })
          }

          // Count full orbits
          if (current > 0.95 && newTime < 0.05) {
            setOrbitCount((prev) => {
              const newCount = prev + 1
              return newCount
            })
          }

          return [newTime]
        })
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  // Update progress when counts change
  useEffect(() => {
    const progress = Math.min(100, (orbitCount >= 1 ? 50 : 0) + (sunriseCount >= 5 ? 50 : 0))
    localStorage.setItem(`levelProgress_2`, progress.toString())
  }, [orbitCount, sunriseCount])

  const getTimeDescription = (time: number) => {
    if (time < 0.25) return "Dawn"
    if (time < 0.5) return "Day"
    if (time < 0.75) return "Dusk"
    return "Night"
  }

  const getTimeColor = (time: number) => {
    if (time < 0.25) return "text-orange-400" // Dawn
    if (time < 0.5) return "text-yellow-400"  // Day
    if (time < 0.75) return "text-pink-400"   // Dusk
    return "text-blue-400"                    // Night
  }

  const resetSimulation = () => {
    setTimeOfDay([0])
    setIsPlaying(false)
    setOrbitCount(0)
    setSunriseCount(0)
  }

  return (
    <div className="min-h-screen space-bg stars-bg flex flex-col relative overflow-hidden">
      {/* Clean background overlay to remove any watermarks */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none"></div>
      
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border-b border-white/10 relative z-10">
        <Link href="/levels">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center space-x-3 text-white">
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 text-xs"
          >
            <Globe className="w-3 h-3 mr-1" />
            Day/Night
          </Badge>
          <div className="text-xs bg-black/20 px-2 py-1 rounded-full">
            <span className="font-bold text-blue-400">{orbitCount}</span>
          </div>
          <div className="text-xs bg-black/20 px-2 py-1 rounded-full">
            <span className="font-bold text-yellow-400">{sunriseCount}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row relative z-10">
        <div className="flex-1 relative">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} shadows>
            <Suspense fallback={null}>
              <Scene timeOfDay={timeOfDay[0]} />
            </Suspense>
          </Canvas>

          <div className="absolute top-2 left-2 right-2 lg:right-auto lg:max-w-sm">
            <div className="bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={`text-sm px-3 py-1 border transition-all duration-300 ${
                    getTimeDescription(timeOfDay[0]) === "Day"
                      ? "border-yellow-400 text-yellow-400 bg-yellow-400/10"
                      : getTimeDescription(timeOfDay[0]) === "Dawn"
                      ? "border-orange-400 text-orange-400 bg-orange-400/10"
                      : getTimeDescription(timeOfDay[0]) === "Dusk"
                      ? "border-pink-400 text-pink-400 bg-pink-400/10"
                      : "border-blue-400 text-blue-400 bg-blue-400/10"
                  }`}
                >
                  {getTimeDescription(timeOfDay[0])}
                </Badge>
                <span className="text-xs text-white/90 ml-2">16 cycles/day</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-72 p-3 space-y-3 bg-gradient-to-b from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
          {/* Simulation Controls */}
          <Card className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base">Controls</CardTitle>
              <CardDescription className="text-purple-200 text-xs">ISS orbit simulation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="space-y-2">
                <label className="text-xs font-medium text-white">Time Position</label>
                <Slider
                  value={timeOfDay}
                  onValueChange={setTimeOfDay}
                  max={1}
                  step={0.01}
                  className="w-full [&_[role=slider]]:bg-gradient-to-r [&_[role=slider]]:from-purple-500 [&_[role=slider]]:to-pink-500"
                />
                <div className="flex justify-between text-xs text-purple-200">
                  <span>Dawn</span>
                  <span>Day</span>
                  <span>Dusk</span>
                  <span>Night</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  size="sm"
                  className={`flex-1 transition-all duration-300 text-xs ${
                    isPlaying
                      ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500"
                      : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetSimulation}
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent px-3 py-2 transition-all duration-150 hover:scale-105"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base">ISS Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-white/80">
                  Period: <span className="text-purple-200 font-medium">93min</span>
                </div>
                <div className="text-white/80">
                  Altitude: <span className="text-purple-200 font-medium">408km</span>
                </div>
                <div className="text-white/80">
                  Speed: <span className="text-purple-200 font-medium">27,600km/h</span>
                </div>
                <div className="text-white/80">
                  Sunrises: <span className="text-purple-200 font-medium">16/day</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base">Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>Overall Progress</span>
                    <span>{Math.min(100, (orbitCount >= 1 ? 50 : 0) + (sunriseCount >= 5 ? 50 : 0))}%</span>
                  </div>
                  <Progress value={Math.min(100, (orbitCount >= 1 ? 50 : 0) + (sunriseCount >= 5 ? 50 : 0))} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white">Orbits Completed</span>
                    <Badge variant={orbitCount >= 1 ? "default" : "outline"} className="text-xs px-2 py-0">
                      {orbitCount}/1
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white">Sunrises Observed</span>
                    <Badge variant={sunriseCount >= 5 ? "default" : "outline"} className="text-xs px-2 py-0">
                      {sunriseCount}/5
                    </Badge>
                  </div>
                </div>
                {orbitCount >= 1 && sunriseCount >= 5 && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-lg text-center border border-yellow-400/30">
                    <p className="font-semibold text-yellow-400 text-sm">🎉 Complete!</p>
                    <p className="text-xs text-yellow-200">Orbital cycle mastered!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-base">Did You Know?</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs leading-relaxed text-white/90">
                ISS astronauts see sunrise/sunset every 45 minutes, experiencing Earth's atmosphere and weather patterns
                from a unique orbital perspective.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
