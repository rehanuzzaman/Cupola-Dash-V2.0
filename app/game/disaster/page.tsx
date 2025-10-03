"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Stars, Sparkles, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Satellite, AlertTriangle, MapPin, Users, Phone, RotateCcw, Eye, Zap, Shield } from "lucide-react"
import * as THREE from "three"

// Disaster events and emergency response scenarios
const disasterEvents = [
  {
    id: 1,
    name: "Wildfire - California",
    position: [-120, 35, 0],
    type: "wildfire",
    severity: "Critical",
    affectedArea: "500,000 acres",
    population: "50,000 evacuated",
    priority: 1,
    description: "Massive wildfire threatening residential areas",
    color: "#ff4444",
    status: "active",
  },
  {
    id: 2,
    name: "Flooding - Bangladesh",
    position: [90, 24, 0],
    type: "flood",
    severity: "High",
    affectedArea: "2,000 sq km",
    population: "1.2 million affected",
    priority: 2,
    description: "Monsoon flooding affecting major cities",
    color: "#0066cc",
    status: "active",
  },
  {
    id: 3,
    name: "Earthquake - Turkey",
    position: [35, 39, 0],
    type: "earthquake",
    severity: "Critical",
    affectedArea: "100,000 sq km",
    population: "500,000 displaced",
    priority: 1,
    description: "Major earthquake with extensive damage",
    color: "#ff8800",
    status: "active",
  },
  {
    id: 4,
    name: "Hurricane - Florida",
    position: [-80, 25, 0],
    type: "hurricane",
    severity: "High",
    affectedArea: "300,000 sq km",
    population: "2 million evacuated",
    priority: 2,
    description: "Category 4 hurricane approaching coast",
    color: "#ff6600",
    status: "monitoring",
  },
  {
    id: 5,
    name: "Drought - Ethiopia",
    position: [40, 9, 0],
    type: "drought",
    severity: "Medium",
    affectedArea: "500,000 sq km",
    population: "5 million at risk",
    priority: 3,
    description: "Severe drought affecting agricultural regions",
    color: "#ffaa00",
    status: "monitoring",
  },
]

function EarthDisaster({ onDisasterClick }: { onDisasterClick: (disaster: any) => void }) {
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
    const radius = 2.05  // Slightly outside Earth surface for better visibility

    return [radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)]
  }

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case "wildfire":
        return "🔥"
      case "flood":
        return "🌊"
      case "earthquake":
        return "🌍"
      case "hurricane":
        return "🌀"
      case "drought":
        return "☀️"
      default:
        return "⚠️"
    }
  }

  return (
    <group>
      <Sphere ref={meshRef} args={[2, 128, 128]}>
        <meshStandardMaterial
          map={new THREE.TextureLoader().load("/earth-texture-map.png", undefined, undefined, (error) => {
            console.warn("Earth texture failed to load:", error)
          })}
          normalMap={new THREE.TextureLoader().load("/earth-normal-map.png", undefined, undefined, (error) => {
            console.warn("Earth normal map failed to load:", error)
          })}
          roughness={0.7}
          metalness={0.1}
          bumpScale={0.05}
        />
      </Sphere>

      {disasterEvents.map((disaster) => {
        const [x, y, z] = convertToSphereCoords(disaster.position[0], disaster.position[1])
        return (
          <group key={disaster.id} position={[x, y, z]}>
            {/* Disaster marker - more visible */}
            <Sphere
              args={[0.12, 16, 16]}
              onPointerEnter={() => setHovered(disaster.id)}
              onPointerLeave={() => setHovered(null)}
              onClick={() => onDisasterClick(disaster)}
            >
              <meshBasicMaterial 
                color={hovered === disaster.id ? "#ffffff" : disaster.color} 
                transparent 
                opacity={1.0}
                emissive={disaster.color}
                emissiveIntensity={0.3}
              />
            </Sphere>
            {/* Pulsing alert effect - more visible */}
            <Sphere args={[0.18, 16, 16]}>
              <meshBasicMaterial color={disaster.color} transparent opacity={0.4} />
            </Sphere>
            {/* Priority indicator - more prominent */}
            <Sphere args={[0.08, 8, 8]} position={[0, 0.25, 0]}>
              <meshBasicMaterial 
                color={disaster.priority === 1 ? "#ff0000" : disaster.priority === 2 ? "#ffaa00" : "#00aa00"}
                emissive={disaster.priority === 1 ? "#ff0000" : disaster.priority === 2 ? "#ffaa00" : "#00aa00"}
                emissiveIntensity={0.2}
              />
            </Sphere>
            {/* Sparkles for better visibility */}
            <Sparkles 
              count={15} 
              scale={0.2} 
              size={1.5} 
              speed={0.8} 
              color={disaster.color} 
            />
            {/* Disaster info */}
            {hovered === disaster.id && (
              <Html distanceFactor={8}>
                <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border border-white/20">
                  <div className="font-semibold flex items-center space-x-2">
                    <span>{getDisasterIcon(disaster.type)}</span>
                    <span>{disaster.name}</span>
                  </div>
                  <div className="text-xs opacity-90">{disaster.severity} Priority</div>
                </div>
              </Html>
            )}
          </group>
        )
      })}

      {/* Enhanced atmosphere with disaster effects */}
      <Sphere ref={atmosphereRef} args={[2.08, 64, 64]}>
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.15} side={THREE.BackSide} />
      </Sphere>
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.1} side={THREE.BackSide} />
      </Sphere>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.005, 8, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function DisasterScene({ onDisasterClick }: { onDisasterClick: (disaster: any) => void }) {
  return (
    <>
      <ambientLight intensity={0.3} color="#ff6b6b" />
      <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#ff4444" />
      <pointLight position={[5, -8, 10]} intensity={0.4} color="#ff8800" />

      <Stars radius={150} depth={80} count={5000} factor={6} saturation={0.3} fade speed={1.2} />

      <Sparkles count={100} scale={15} size={3} speed={0.6} color="#ffffff" />
      <Sparkles count={80} scale={25} size={2} speed={0.3} color="#ff6b6b" />

      <mesh>
        <sphereGeometry args={[80, 32, 32]} />
        <meshBasicMaterial color="#4A148C" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      <EarthDisaster onDisasterClick={onDisasterClick} />
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

export default function DisasterResponsePage() {
  const [selectedDisaster, setSelectedDisaster] = useState<any>(null)
  const [score, setScore] = useState(0)
  const [responded, setResponded] = useState<number[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [responseActions, setResponseActions] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`levelProgress_4`)
      if (savedProgress) {
        // Progress is already handled in the click handler
      }
    } catch (err) {
      console.warn("Failed to load progress:", err)
    }
  }, [])

  const handleDisasterClick = (disaster: any) => {
    try {
      setError(null)
      if (!disaster || !disaster.id) {
        throw new Error("Invalid disaster data")
      }
      
      setSelectedDisaster(disaster)
      if (!responded.includes(disaster.id)) {
        setResponded([...responded, disaster.id])
        setScore(score + 300)
        
        // Update progress (20% per disaster event, 100% when all 5 are responded to)
        const newProgress = Math.min(100, (responded.length + 1) * 20)
        localStorage.setItem(`levelProgress_4`, newProgress.toString())
      }
      if (!gameStarted) setGameStarted(true)
    } catch (err) {
      setError("Failed to respond to disaster. Please try again.")
      console.error("Disaster response error:", err)
    }
  }

  const resetGame = () => {
    setScore(0)
    setResponded([])
    setSelectedDisaster(null)
    setGameStarted(false)
    setResponseActions([])
    setError(null)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "text-red-400"
      case 2:
        return "text-orange-400"
      case 3:
        return "text-yellow-400"
      default:
        return "text-blue-400"
    }
  }

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case "wildfire":
        return "🔥"
      case "flood":
        return "🌊"
      case "earthquake":
        return "🌍"
      case "hurricane":
        return "🌀"
      case "drought":
        return "☀️"
      default:
        return "⚠️"
    }
  }

  return (
    <div className="min-h-screen earth-orbit-bg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-sm border-b border-white/10">
        <Link href="/levels">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 transition-all duration-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex items-center space-x-4 text-white">
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-red-600 to-orange-600 text-white border-0 text-xs"
          >
            <AlertTriangle className="w-3 h-3 mr-1" />
            Disaster Response
          </Badge>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-red-600/30 to-orange-600/30 px-3 py-2 rounded-lg border border-red-400/50">
            <span className="text-sm font-bold text-red-300">Score:</span>
            <span className="text-lg font-bold text-red-400">{score}</span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-600/30 to-emerald-600/30 px-3 py-2 rounded-lg border border-green-400/50">
            <span className="text-sm font-bold text-green-300">Responded:</span>
            <span className="text-lg font-bold text-green-400">{responded.length}/5</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 relative">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} shadows>
            <Suspense fallback={null}>
              <DisasterScene onDisasterClick={handleDisasterClick} />
            </Suspense>
          </Canvas>

          <div className="absolute top-2 left-2 right-2 lg:right-auto lg:max-w-xs space-y-2">
            <div className="bg-gradient-to-r from-red-900/90 to-orange-900/90 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center space-x-2 text-xs text-white">
                <Eye className="w-3 h-3 text-red-400 flex-shrink-0" />
                <span>Click disaster events to coordinate response</span>
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
              className="bg-gradient-to-r from-red-600/90 to-orange-600/90 backdrop-blur-md border-white/20 text-white hover:from-red-500/90 hover:to-orange-500/90 transition-all duration-300 text-xs px-3 py-1"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Disaster Response Panel */}
        <div className="w-full lg:w-80 p-3 space-y-3 bg-gradient-to-b from-red-900/20 to-orange-900/20 backdrop-blur-sm overflow-y-auto">
          {selectedDisaster ? (
            <Card className="bg-gradient-to-br from-red-900/80 to-orange-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-white text-base">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getDisasterIcon(selectedDisaster.type)}</span>
                    <span>{selectedDisaster.name}</span>
                  </div>
                  <Badge className={getSeverityColor(selectedDisaster.severity)}>
                    {selectedDisaster.severity}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-red-200 text-xs">Emergency Response</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <p className="text-xs leading-relaxed text-white/90">{selectedDisaster.description}</p>
                
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="bg-black/20 p-2 rounded">
                    <div className="flex items-center space-x-1 text-red-200">
                      <MapPin className="w-3 h-3" />
                      <span>Affected Area</span>
                    </div>
                    <div className="text-white font-bold">{selectedDisaster.affectedArea}</div>
                  </div>
                  <div className="bg-black/20 p-2 rounded">
                    <div className="flex items-center space-x-1 text-red-200">
                      <Users className="w-3 h-3" />
                      <span>Population Impact</span>
                    </div>
                    <div className="text-white font-bold">{selectedDisaster.population}</div>
                  </div>
                  <div className="bg-black/20 p-2 rounded">
                    <div className="flex items-center space-x-1 text-red-200">
                      <Zap className="w-3 h-3" />
                      <span>Priority Level</span>
                    </div>
                    <div className={`font-bold ${getPriorityColor(selectedDisaster.priority)}`}>
                      Level {selectedDisaster.priority}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-white">Response Actions:</h4>
                  <div className="space-y-1">
                    <Button size="sm" variant="outline" className="w-full text-xs bg-red-600/20 border-red-400/50 text-white hover:bg-red-500/30">
                      <Phone className="w-3 h-3 mr-1" />
                      Alert Emergency Services
                    </Button>
                    <Button size="sm" variant="outline" className="w-full text-xs bg-orange-600/20 border-orange-400/50 text-white hover:bg-orange-500/30">
                      <Satellite className="w-3 h-3 mr-1" />
                      Deploy Monitoring
                    </Button>
                    <Button size="sm" variant="outline" className="w-full text-xs bg-yellow-600/20 border-yellow-400/50 text-white hover:bg-yellow-500/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Coordinate Relief
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-red-200 bg-black/20 p-2 rounded">
                  <span>ISS Altitude: 408 km</span>
                  <span>Response Time: 15 min</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-red-900/80 to-orange-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-white">Disaster Response</CardTitle>
                <CardDescription className="text-red-200 text-xs">ISS Emergency Coordination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <p className="text-xs leading-relaxed text-white/90">
                  Coordinate emergency response efforts from the International Space Station. 
                  Monitor disasters, assess damage, and coordinate relief operations.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-white">Objectives:</h4>
                  <ul className="text-xs space-y-1 text-red-200">
                    <li>• Monitor disaster events</li>
                    <li>• Assess damage and impact</li>
                    <li>• Coordinate emergency response</li>
                    <li>• Support relief operations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-red-900/80 to-orange-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white">Emergency Events</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {disasterEvents.map((disaster) => (
                  <div
                    key={disaster.id}
                    className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
                      responded.includes(disaster.id)
                        ? "bg-gradient-to-r from-green-600/30 to-red-600/30 border border-green-400/30"
                        : "bg-black/20 border border-white/10"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getDisasterIcon(disaster.type)}</span>
                      <div>
                        <div className="text-xs text-white font-medium">{disaster.name}</div>
                        <div className="text-xs text-red-200">{disaster.severity}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(disaster.priority)}`}></div>
                      {responded.includes(disaster.id) ? (
                        <Badge className="bg-gradient-to-r from-green-500 to-red-500 text-white border-0 text-xs px-2 py-0">
                          ✓
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-white/30 text-white/70 text-xs px-2 py-0">
                          ?
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {responded.length === disasterEvents.length && (
                <div className="mt-3 p-3 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-lg text-center border border-yellow-400/30">
                  <p className="font-semibold text-yellow-400 text-sm">🎉 Complete!</p>
                  <p className="text-xs text-yellow-200">Emergency response coordinator!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/80 to-orange-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white">Response Facts</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-xs text-white/90">
                <p>• ISS provides real-time disaster monitoring</p>
                <p>• Astronauts can coordinate with ground teams</p>
                <p>• Space imagery helps assess damage</p>
                <p>• International cooperation in emergencies</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
