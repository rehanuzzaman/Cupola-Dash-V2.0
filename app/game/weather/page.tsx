"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Stars, Sparkles, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CloudRain, Wind, Thermometer, Droplets, Eye, RotateCcw, Zap, AlertTriangle } from "lucide-react"
import * as THREE from "three"

// Weather patterns and storm systems
const weatherSystems = [
  {
    id: 1,
    name: "Hurricane Maria",
    position: [-60, 15, 0],
    type: "hurricane",
    intensity: "Category 4",
    windSpeed: 150,
    pressure: 920,
    description: "Major hurricane affecting the Caribbean",
    color: "#ff4444",
  },
  {
    id: 2,
    name: "Typhoon Haima",
    position: [140, 20, 0],
    type: "typhoon",
    intensity: "Category 3",
    windSpeed: 120,
    pressure: 940,
    description: "Typhoon approaching the Philippines",
    color: "#ff8800",
  },
  {
    id: 3,
    name: "Storm System Alpha",
    position: [-80, 45, 0],
    type: "storm",
    intensity: "Severe",
    windSpeed: 80,
    pressure: 980,
    description: "Severe thunderstorm system over North America",
    color: "#ffaa00",
  },
  {
    id: 4,
    name: "Monsoon System",
    position: [80, 10, 0],
    type: "monsoon",
    intensity: "Active",
    windSpeed: 60,
    pressure: 1000,
    description: "Active monsoon season in South Asia",
    color: "#00aaff",
  },
  {
    id: 5,
    name: "Polar Vortex",
    position: [0, 70, 0],
    type: "polar",
    intensity: "Strong",
    windSpeed: 100,
    pressure: 950,
    description: "Arctic weather system affecting northern regions",
    color: "#00ffff",
  },
]

function EarthWeather({ onWeatherClick }: { onWeatherClick: (weather: any) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.01
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001
    }
  })

  const convertToSphereCoords = (lon: number, lat: number) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    const radius = 2

    return [radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)]
  }

  const getWeatherIcon = (type: string) => {
    switch (type) {
      case "hurricane":
      case "typhoon":
        return "🌀"
      case "storm":
        return "⛈️"
      case "monsoon":
        return "🌧️"
      case "polar":
        return "❄️"
      default:
        return "🌤️"
    }
  }

  return (
    <group>
      <Sphere ref={meshRef} args={[2, 128, 128]}>
        <meshStandardMaterial
          map={new THREE.TextureLoader().load("/earth-texture-map.png")}
          normalMap={new THREE.TextureLoader().load("/earth-normal-map.png")}
          roughness={0.7}
          metalness={0.1}
          bumpScale={0.05}
        />
      </Sphere>

      {weatherSystems.map((weather) => {
        const [x, y, z] = convertToSphereCoords(weather.position[0], weather.position[1])
        return (
          <group key={weather.id} position={[x, y, z]}>
            {/* Weather system marker */}
            <Sphere
              args={[0.08, 16, 16]}
              onPointerEnter={() => setHovered(weather.id)}
              onPointerLeave={() => setHovered(null)}
              onClick={() => onWeatherClick(weather)}
            >
              <meshBasicMaterial color={hovered === weather.id ? "#ffffff" : weather.color} transparent opacity={0.8} />
            </Sphere>
            {/* Pulsing effect */}
            <Sphere args={[0.12, 16, 16]}>
              <meshBasicMaterial color={weather.color} transparent opacity={0.3} />
            </Sphere>
            {/* Weather icon */}
            {hovered === weather.id && (
              <Html distanceFactor={8}>
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border border-white/20">
                  <div className="font-semibold flex items-center space-x-2">
                    <span>{getWeatherIcon(weather.type)}</span>
                    <span>{weather.name}</span>
                  </div>
                  <div className="text-xs opacity-90">{weather.intensity}</div>
                </div>
              </Html>
            )}
          </group>
        )
      })}

      {/* Enhanced atmosphere with weather effects */}
      <Sphere ref={atmosphereRef} args={[2.08, 64, 64]}>
        <meshBasicMaterial color="#87CEEB" transparent opacity={0.2} side={THREE.BackSide} />
      </Sphere>
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial color="#B0E0E6" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>

      {/* Cloud layer */}
      <Sphere args={[2.05, 64, 64]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.BackSide} />
      </Sphere>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.005, 8, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function WeatherScene({ onWeatherClick }: { onWeatherClick: (weather: any) => void }) {
  return (
    <>
      <ambientLight intensity={0.3} color="#4A90E2" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#FFA726" />
      <pointLight position={[5, -8, 10]} intensity={0.4} color="#E91E63" />

      <Stars radius={150} depth={80} count={6000} factor={6} saturation={0.3} fade speed={1.2} />

      <Sparkles count={150} scale={15} size={3} speed={0.6} color="#ffffff" />
      <Sparkles count={100} scale={25} size={2} speed={0.3} color="#87CEEB" />

      <mesh>
        <sphereGeometry args={[80, 32, 32]} />
        <meshBasicMaterial color="#4A148C" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      <EarthWeather onWeatherClick={onWeatherClick} />
      <OrbitControls
        enablePan={false}
        minDistance={3.5}
        maxDistance={10}
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  )
}

export default function WeatherMonitoringPage() {
  const [selectedWeather, setSelectedWeather] = useState<any>(null)
  const [score, setScore] = useState(0)
  const [monitored, setMonitored] = useState<number[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleWeatherClick = (weather: any) => {
    try {
      setError(null)
      setSelectedWeather(weather)
      if (!monitored.includes(weather.id)) {
        setMonitored([...monitored, weather.id])
        setScore(score + 200)
        
        // Update progress (20% per weather system, 100% when all 5 are monitored)
        const newProgress = Math.min(100, (monitored.length + 1) * 20)
        localStorage.setItem(`levelProgress_3`, newProgress.toString())
      }
      if (!gameStarted) setGameStarted(true)
    } catch (err) {
      setError("Failed to monitor weather system. Please try again.")
      console.error("Weather monitoring error:", err)
    }
  }

  const resetGame = () => {
    setScore(0)
    setMonitored([])
    setSelectedWeather(null)
    setGameStarted(false)
    setError(null)
  }

  const getIntensityColor = (intensity: string) => {
    if (intensity.includes("Category 4") || intensity.includes("Category 5")) return "bg-red-500"
    if (intensity.includes("Category 3")) return "bg-orange-500"
    if (intensity.includes("Category 2")) return "bg-yellow-500"
    if (intensity.includes("Severe")) return "bg-red-500"
    if (intensity.includes("Strong")) return "bg-orange-500"
    return "bg-blue-500"
  }

  return (
    <div className="min-h-screen earth-orbit-bg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border-b border-white/10">
        <Link href="/levels">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center space-x-4 text-white">
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 text-xs"
          >
            <CloudRain className="w-3 h-3 mr-1" />
            Weather Monitoring
          </Badge>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 px-3 py-2 rounded-lg border border-blue-400/50">
            <span className="text-sm font-bold text-blue-300">Score:</span>
            <span className="text-lg font-bold text-blue-400">{score}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-600/30 to-emerald-600/30 px-3 py-2 rounded-lg border border-green-400/50">
            <span className="text-sm font-bold text-green-300">Monitored:</span>
            <span className="text-lg font-bold text-green-400">{monitored.length}/5</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 relative">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} shadows>
            <Suspense fallback={null}>
              <WeatherScene onWeatherClick={handleWeatherClick} />
            </Suspense>
          </Canvas>

          <div className="absolute top-2 left-2 right-2 lg:right-auto lg:max-w-xs space-y-2">
            <div className="bg-gradient-to-r from-blue-900/90 to-cyan-900/90 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center space-x-2 text-xs text-white">
                <Eye className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                <span>Click weather systems to monitor</span>
              </div>
            </div>
            
            {error && (
              <div className="bg-gradient-to-r from-red-900/90 to-pink-900/90 backdrop-blur-md border border-red-400/50 rounded-lg px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-2 text-xs text-white">
                  <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-2 right-2">
            <Button
              onClick={resetGame}
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-blue-600/90 to-cyan-600/90 backdrop-blur-md border-white/20 text-white hover:from-blue-500/90 hover:to-cyan-500/90 transition-all duration-300 text-xs px-3 py-1"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Weather Information Panel */}
        <div className="w-full lg:w-80 p-3 space-y-3 bg-gradient-to-b from-blue-900/20 to-cyan-900/20 backdrop-blur-sm overflow-y-auto">
          {selectedWeather ? (
            <Card className="bg-gradient-to-br from-blue-900/80 to-cyan-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-white text-base">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">
                      {selectedWeather.type === "hurricane" || selectedWeather.type === "typhoon" ? "🌀" : 
                       selectedWeather.type === "storm" ? "⛈️" : 
                       selectedWeather.type === "monsoon" ? "🌧️" : 
                       selectedWeather.type === "polar" ? "❄️" : "🌤️"}
                    </span>
                    <span>{selectedWeather.name}</span>
                  </div>
                  <Badge className={getIntensityColor(selectedWeather.intensity)}>
                    {selectedWeather.intensity}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-blue-200 text-xs">Weather System</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <p className="text-xs leading-relaxed text-white/90">{selectedWeather.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-black/20 p-2 rounded">
                    <div className="flex items-center space-x-1 text-blue-200">
                      <Wind className="w-3 h-3" />
                      <span>Wind Speed</span>
                    </div>
                    <div className="text-white font-bold">{selectedWeather.windSpeed} mph</div>
                  </div>
                  <div className="bg-black/20 p-2 rounded">
                    <div className="flex items-center space-x-1 text-blue-200">
                      <Droplets className="w-3 h-3" />
                      <span>Pressure</span>
                    </div>
                    <div className="text-white font-bold">{selectedWeather.pressure} mb</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-blue-200 bg-black/20 p-2 rounded">
                  <span>Altitude: 408 km</span>
                  <span>ISS Speed: 27,600 km/h</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-blue-900/80 to-cyan-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-white">Weather Monitoring</CardTitle>
                <CardDescription className="text-blue-200 text-xs">ISS Earth observation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <p className="text-xs leading-relaxed text-white/90">
                  Monitor weather systems and natural disasters from the International Space Station. 
                  Track hurricanes, storms, and climate patterns in real-time.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-white">Objectives:</h4>
                  <ul className="text-xs space-y-1 text-blue-200">
                    <li>• Identify weather systems</li>
                    <li>• Monitor storm intensity</li>
                    <li>• Track climate patterns</li>
                    <li>• Learn Earth observation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-blue-900/80 to-cyan-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white">Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {weatherSystems.map((weather) => (
                  <div
                    key={weather.id}
                    className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
                      monitored.includes(weather.id)
                        ? "bg-gradient-to-r from-green-600/30 to-blue-600/30 border border-green-400/30"
                        : "bg-black/20 border border-white/10"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {weather.type === "hurricane" || weather.type === "typhoon" ? "🌀" : 
                         weather.type === "storm" ? "⛈️" : 
                         weather.type === "monsoon" ? "🌧️" : 
                         weather.type === "polar" ? "❄️" : "🌤️"}
                      </span>
                      <span className="text-xs text-white">{weather.name}</span>
                    </div>
                    {monitored.includes(weather.id) ? (
                      <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 text-xs px-2 py-0">
                        ✓
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-white/30 text-white/70 text-xs px-2 py-0">
                        ?
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              {monitored.length === weatherSystems.length && (
                <div className="mt-3 p-3 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-lg text-center border border-yellow-400/30">
                  <p className="font-semibold text-yellow-400 text-sm">🎉 Complete!</p>
                  <p className="text-xs text-yellow-200">Weather monitoring expert!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/80 to-cyan-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white">Weather Facts</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-xs text-white/90">
                <p>• ISS orbits Earth 16 times per day</p>
                <p>• Astronauts see weather patterns from space</p>
                <p>• Hurricane eyes are clearly visible from orbit</p>
                <p>• Space weather affects Earth's atmosphere</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
