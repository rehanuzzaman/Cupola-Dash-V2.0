"use client"

import { Suspense, useRef, useState } from "react"
import Link from "next/link"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Html, Stars, Sparkles } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, Info, RotateCcw } from "lucide-react"
import * as THREE from "three"

// Earth locations with educational content
const earthLocations = [
  {
    id: 1,
    name: "Amazon Rainforest",
    position: [-60, -5, 0],
    fact: "The Amazon produces 20% of Earth's oxygen and is visible from space as a vast green carpet.",
    image: "/amazon-rainforest-from-space.png",
    coordinates: "3°S 60°W",
  },
  {
    id: 2,
    name: "Sahara Desert",
    position: [15, 25, 0],
    fact: "Sahara dust travels across the Atlantic, fertilizing Amazon rainforests with nutrients.",
    image: "/sahara-desert-from-space.png",
    coordinates: "25°N 15°E",
  },
  {
    id: 3,
    name: "Great Barrier Reef",
    position: [145, -18, 0],
    fact: "The Great Barrier Reef is the only living structure visible from space, stretching over 2,300 km.",
    image: "/great-barrier-reef-from-space.png",
    coordinates: "18°S 145°E",
  },
  {
    id: 4,
    name: "Himalayas",
    position: [85, 28, 0],
    fact: "The Himalayas create their own weather patterns and can be seen creating cloud formations from orbit.",
    image: "/himalayas-from-space.png",
    coordinates: "28°N 85°E",
  },
  {
    id: 5,
    name: "Nile River",
    position: [32, 26, 0],
    fact: "The Nile appears as a green ribbon through the desert, supporting 95% of Egypt's population.",
    image: "/nile-river-from-space.png",
    coordinates: "26°N 32°E",
  },
]

function LocationMarker({ position, location, hovered, onHover, onClick }: {
  position: [number, number, number]
  location: any
  hovered: boolean
  onHover: (isHovered: boolean) => void
  onClick: () => void
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + location.id) * 0.02
      
      // Pulsing scale animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3 + location.id) * 0.1
      groupRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Pulsing outer ring - larger and more visible */}
      <Sphere args={[0.12, 16, 16]}>
        <meshBasicMaterial 
          color={hovered ? "#f59e0b" : "#0891b2"} 
          transparent 
          opacity={0.4} 
        />
      </Sphere>
      {/* Main marker - more prominent */}
      <Sphere
        args={[0.08, 16, 16]}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onClick}
      >
        <meshBasicMaterial 
          color={hovered ? "#f59e0b" : "#0891b2"} 
          transparent 
          opacity={1.0}
          emissive={hovered ? "#f59e0b" : "#0891b2"}
          emissiveIntensity={0.3}
        />
      </Sphere>
      {/* Glowing effect - more visible */}
      <Sphere args={[0.16, 16, 16]}>
        <meshBasicMaterial 
          color={hovered ? "#f59e0b" : "#0891b2"} 
          transparent 
          opacity={0.2} 
        />
      </Sphere>
      {/* Animated pulse ring */}
      <Sphere args={[0.2, 16, 16]}>
        <meshBasicMaterial 
          color={hovered ? "#f59e0b" : "#0891b2"} 
          transparent 
          opacity={0.1} 
        />
      </Sphere>
      {hovered && (
        <Html distanceFactor={6}>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border border-white/20">
            <div className="font-semibold">{location.name}</div>
            <div className="text-xs opacity-90">{location.coordinates}</div>
          </div>
        </Html>
      )}
    </group>
  )
}

function Earth({ onLocationClick }: { onLocationClick: (location: any) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001
    }
  })

  const convertToSphereCoords = (lon: number, lat: number) => {
    // Convert latitude and longitude to 3D sphere coordinates
    const phi = (90 - lat) * (Math.PI / 180)  // Polar angle (0 to π)
    const theta = (lon + 180) * (Math.PI / 180)  // Azimuthal angle (0 to 2π)
    const radius = 2.05  // Slightly outside Earth surface for visibility

    // Convert spherical to Cartesian coordinates
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)

    return [x, y, z]
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

      {earthLocations.map((location) => {
        const [x, y, z] = convertToSphereCoords(location.position[0], location.position[1])
        return (
          <LocationMarker
            key={location.id}
            position={[x, y, z]}
            location={location}
            hovered={hovered === location.id}
            onHover={(isHovered) => setHovered(isHovered ? location.id : null)}
            onClick={() => onLocationClick(location)}
          />
        )
      })}

      <Sphere ref={atmosphereRef} args={[2.08, 64, 64]}>
        <meshBasicMaterial color="#4FC3F7" transparent opacity={0.15} side={THREE.BackSide} />
      </Sphere>
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial color="#81C784" transparent opacity={0.08} side={THREE.BackSide} />
      </Sphere>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.005, 8, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function Scene({ onLocationClick }: { onLocationClick: (location: any) => void }) {
  return (
    <>
      <ambientLight intensity={0.2} color="#4A90E2" />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#FFA726" />
      <pointLight position={[5, -8, 10]} intensity={0.6} color="#E91E63" />
      <pointLight position={[-8, 5, -10]} intensity={0.4} color="#9C27B0" />

      <Stars radius={150} depth={80} count={8000} factor={6} saturation={0.3} fade speed={1.2} />

      <Sparkles count={200} scale={15} size={3} speed={0.6} color="#ffffff" />
      <Sparkles count={100} scale={25} size={4} speed={0.3} color="#E91E63" />
      <Sparkles count={80} scale={35} size={2} speed={0.8} color="#9C27B0" />

      <mesh>
        <sphereGeometry args={[80, 32, 32]} />
        <meshBasicMaterial color="#4A148C" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[60, 2, 8, 100]} />
        <meshBasicMaterial color="#E91E63" transparent opacity={0.1} />
      </mesh>

      <Earth onLocationClick={onLocationClick} />
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

export default function CupolaTrainingPage() {
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [score, setScore] = useState(0)
  const [discovered, setDiscovered] = useState<number[]>([])

  const handleLocationClick = (location: any) => {
    setSelectedLocation(location)
    if (!discovered.includes(location.id)) {
      setDiscovered([...discovered, location.id])
      setScore(score + 100)
      
      // Update progress (20% per location, 100% when all 5 are discovered)
      const newProgress = Math.min(100, (discovered.length + 1) * 20)
      localStorage.setItem(`levelProgress_1`, newProgress.toString())
    }
  }

  const resetGame = () => {
    setScore(0)
    setDiscovered([])
    setSelectedLocation(null)
  }

  return (
    <div className="min-h-screen space-bg stars-bg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border-b border-white/10">
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
            <Eye className="w-3 h-3 mr-1" />
            Cupola
          </Badge>
          <div className="text-xs bg-black/20 px-2 py-1 rounded-full">
            <span className="font-bold text-yellow-400">{score}</span>
          </div>
          <div className="text-xs bg-black/20 px-2 py-1 rounded-full">
            <span className="font-bold text-green-400">{discovered.length}/5</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 relative">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} shadows>
            <Suspense fallback={null}>
              <Scene onLocationClick={handleLocationClick} />
            </Suspense>
          </Canvas>

          <div className="absolute top-2 left-2 right-2 lg:right-auto lg:max-w-xs">
            <div className="bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center space-x-2 text-xs text-white">
                <Info className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                <span>Tap glowing markers to explore</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 right-2">
            <Button
              onClick={resetGame}
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-md border-white/20 text-white hover:from-purple-500/90 hover:to-pink-500/90 transition-all duration-300 text-xs px-3 py-1"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Information Panel */}
        <div className="w-full lg:w-80 p-3 space-y-3 bg-gradient-to-b from-purple-900/20 to-pink-900/20 backdrop-blur-sm overflow-y-auto">
          {selectedLocation ? (
            <Card className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-white text-base">
                  {selectedLocation.name}
                  <Badge variant="outline" className="border-white/30 text-white text-xs">
                    {selectedLocation.coordinates}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-purple-200 text-xs">ISS View</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={selectedLocation.image || "/placeholder.svg"}
                    alt={selectedLocation.name}
                    className="w-full h-32 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <p className="text-xs leading-relaxed text-white/90">{selectedLocation.fact}</p>
                <div className="flex items-center justify-between text-xs text-purple-200 bg-black/20 p-2 rounded">
                  <span>408 km</span>
                  <span>27,600 km/h</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-white">ISS Cupola</CardTitle>
                <CardDescription className="text-purple-200 text-xs">Earth observation deck</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <p className="text-xs leading-relaxed text-white/90">
                  360° Earth views for monitoring, experiments, and photography.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-xs text-white">Objectives:</h4>
                  <ul className="text-xs space-y-1 text-purple-200">
                    <li>• Identify Earth features</li>
                    <li>• Learn climate patterns</li>
                    <li>• Understand orbital view</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white">Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {earthLocations.map((location) => (
                  <div
                    key={location.id}
                    className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
                      discovered.includes(location.id)
                        ? "bg-gradient-to-r from-green-600/30 to-blue-600/30 border border-green-400/30"
                        : "bg-black/20 border border-white/10"
                    }`}
                  >
                    <span className="text-xs text-white">{location.name}</span>
                    {discovered.includes(location.id) ? (
                      <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 text-xs px-2 py-0">
                        ✨
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-white/30 text-white/70 text-xs px-2 py-0">
                        ?
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              {discovered.length === earthLocations.length && (
                <div className="mt-3 p-3 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 rounded-lg text-center border border-yellow-400/30">
                  <p className="font-semibold text-yellow-400 text-sm">🎉 Complete!</p>
                  <p className="text-xs text-yellow-200">Cupola master achieved!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
