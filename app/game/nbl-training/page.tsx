"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Zap, Target, Timer, RotateCcw } from "lucide-react"
import * as THREE from "three"

// Training objectives
const trainingObjectives = [
  { id: 1, name: "Navigate to Tool Station", position: [3, 2, 0], completed: false },
  { id: 2, name: "Collect Wrench", position: [-2, 3, 1], completed: false },
  { id: 3, name: "Reach Solar Panel", position: [0, -2, 2], completed: false },
  { id: 4, name: "Return to Airlock", position: [0, 0, 0], completed: false },
]

function Astronaut({
  position,
  onPositionChange,
}: { position: THREE.Vector3; onPositionChange: (pos: THREE.Vector3) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const velocity = useRef(new THREE.Vector3(0, 0, 0))
  const [isThrusting, setIsThrusting] = useState(false)

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Apply physics - momentum conservation in weightlessness
      const currentPos = groupRef.current.position.clone()
      const newPosition = currentPos.add(velocity.current.clone().multiplyScalar(delta))

      // Boundary constraints to keep astronaut in training area
      newPosition.x = Math.max(-5, Math.min(5, newPosition.x))
      newPosition.y = Math.max(-3, Math.min(3, newPosition.y))
      newPosition.z = Math.max(-4, Math.min(4, newPosition.z))

      // Damping (slight resistance)
      velocity.current.multiplyScalar(0.98)

      // Update position through callback instead of direct mutation
      groupRef.current.position.copy(newPosition)
      onPositionChange(newPosition)
    }
  })

  const thrust = (direction: THREE.Vector3) => {
    if (velocity.current) {
      velocity.current.add(direction.multiplyScalar(0.15))
      setIsThrusting(true)
      setTimeout(() => setIsThrusting(false), 200)
    }
  }

  // Expose thrust function to parent
  useEffect(() => {
    ;(window as any).thrustAstronaut = thrust
  }, [])

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      {/* Astronaut Body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={isThrusting ? "#f59e0b" : "#ffffff"} />
      </mesh>

      {/* Helmet */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </mesh>

      {/* Life Support Backpack */}
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[0.3, 0.4, 0.15]} />
        <meshStandardMaterial color="#666666" />
      </mesh>

      {/* Astronaut Gloves/Hands */}
      <mesh position={[0.25, 0, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[-0.25, 0, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Thruster Effects */}
      {isThrusting && (
        <mesh position={[0, -0.4, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#ff6b35" transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  )
}

function TrainingEnvironment({
  objectives,
  onObjectiveComplete,
}: { objectives: any[]; onObjectiveComplete: (id: number) => void }) {
  return (
    <group>
      {/* Space Training Facility - ISS Module */}
      <mesh position={[0, -4, 0]}>
        <boxGeometry args={[10, 0.1, 8]} />
        <meshStandardMaterial color="#374151" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[10, 0.1, 8]} />
        <meshStandardMaterial color="#374151" transparent opacity={0.4} />
      </mesh>

      {/* Space Module Side Walls */}
      <mesh position={[-5, 0, 0]}>
        <boxGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#374151" transparent opacity={0.3} />
      </mesh>
      <mesh position={[5, 0, 0]}>
        <boxGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#374151" transparent opacity={0.3} />
      </mesh>

      {/* Space Module Equipment Panels */}
      <mesh position={[-4.5, 0, 0]}>
        <boxGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[4.5, 0, 0]}>
        <boxGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Space Training Objectives */}
      {objectives.map((objective) => (
        <group key={objective.id} position={objective.position}>
          {/* Main equipment module */}
          <mesh>
            <boxGeometry args={[0.8, 0.6, 0.4]} />
            <meshStandardMaterial
              color={objective.completed ? "#10b981" : "#6366f1"}
              transparent
              opacity={objective.completed ? 0.6 : 0.9}
              metalness={0.7}
              roughness={0.3}
              emissive={objective.completed ? "#000000" : "#6366f1"}
              emissiveIntensity={objective.completed ? 0 : 0.2}
            />
          </mesh>
          {/* Equipment panel */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.6, 0.1, 0.2]} />
            <meshStandardMaterial
              color={objective.completed ? "#10b981" : "#1f2937"}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Status indicator light */}
          <mesh position={[0, 0.8, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial 
              color={objective.completed ? "#10b981" : "#f59e0b"} 
              emissive={objective.completed ? "#10b981" : "#f59e0b"}
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* ISS Module Mock-up */}
      <mesh position={[0, 0, -3]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#666666" />
      </mesh>

      {/* Training Platform */}
      <mesh position={[0, -2, 0]}>
        <boxGeometry args={[4, 0.2, 3]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
    </group>
  )
}

function Scene({ objectives, onObjectiveComplete, astronautPosition, onAstronautMove }: any) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.0} />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#87CEEB" />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />

      <Astronaut position={astronautPosition} onPositionChange={onAstronautMove} />
      <TrainingEnvironment objectives={objectives} onObjectiveComplete={onObjectiveComplete} />

      <OrbitControls enablePan={true} minDistance={3} maxDistance={12} />
    </>
  )
}

export default function NBLTrainingPage() {
  const [objectives, setObjectives] = useState(trainingObjectives)
  const [astronautPosition, setAstronautPosition] = useState(new THREE.Vector3(0, 0, 0))
  const [score, setScore] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [completedObjectives, setCompletedObjectives] = useState(0)

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted])

  // Check objective completion
  useEffect(() => {
    objectives.forEach((objective) => {
      if (!objective.completed) {
        const distance = astronautPosition.distanceTo(new THREE.Vector3(...objective.position))
        if (distance < 1) {
          handleObjectiveComplete(objective.id)
        }
      }
    })
  }, [astronautPosition, objectives])

  const handleObjectiveComplete = (id: number) => {
    setObjectives((prev) => prev.map((obj) => (obj.id === id ? { ...obj, completed: true } : obj)))
    setScore((prev) => prev + 250)
    setCompletedObjectives((prev) => {
      const newCount = prev + 1
      // Update progress (25% per objective, 100% when all 4 are completed)
      const newProgress = Math.min(100, newCount * 25)
      localStorage.setItem(`levelProgress_5`, newProgress.toString())
      return newCount
    })
  }

  const handleMovement = (direction: string) => {
    if (!(window as any).thrustAstronaut) return

    const thrustVector = new THREE.Vector3()
    switch (direction) {
      case "up":
        thrustVector.set(0, 1, 0)
        break
      case "down":
        thrustVector.set(0, -1, 0)
        break
      case "left":
        thrustVector.set(-1, 0, 0)
        break
      case "right":
        thrustVector.set(1, 0, 0)
        break
      case "forward":
        thrustVector.set(0, 0, 1)
        break
      case "backward":
        thrustVector.set(0, 0, -1)
        break
    }
    ;(window as any).thrustAstronaut(thrustVector)
    if (!gameStarted) setGameStarted(true)
  }

  const resetTraining = () => {
    setObjectives(trainingObjectives.map((obj) => ({ ...obj, completed: false })))
    setAstronautPosition(new THREE.Vector3(0, 0, 0))
    setScore(0)
    setTimeElapsed(0)
    setGameStarted(false)
    setCompletedObjectives(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = (completedObjectives / objectives.length) * 100

  return (
    <div className="min-h-screen earth-orbit-bg relative overflow-hidden">
      {/* Space Background - NBL Training in Space */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
        <div className="absolute inset-0 bg-[url('/space-backgrounds/iss-in-orbit.png')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent"></div>
        {/* Space environment overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-indigo-500/20 to-blue-800/30"></div>
      </div>

      {/* Floating space particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/30 backdrop-blur-sm border-b border-white/10">
          <Link href="/levels">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Levels
            </Button>
          </Link>
          <div className="flex items-center space-x-4 text-white">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-100 border-purple-400/50">
              <Zap className="w-4 h-4 mr-1" />
              Space Training
            </Badge>
            <div className="flex items-center space-x-2 text-sm">
              <Timer className="w-4 h-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <div className="text-sm">
              Score: <span className="font-bold text-purple-300">{score}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">
          {/* 3D Training Environment */}
          <div className="flex-1 relative">
            <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
              <Suspense fallback={null}>
                <Scene
                  objectives={objectives}
                  onObjectiveComplete={handleObjectiveComplete}
                  astronautPosition={astronautPosition}
                  onAstronautMove={setAstronautPosition}
                />
              </Suspense>
            </Canvas>

            {/* Movement Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <Card className="bg-card/90 backdrop-blur-sm border-cyan-400/30 shadow-lg shadow-cyan-500/20">
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                    {/* Top Row */}
                    <div></div>
                    <Button
                      onTouchStart={(e) => {
                        e.preventDefault()
                        handleMovement("up")
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        handleMovement("up")
                      }}
                      variant="outline"
                      size="sm"
                      className="bg-purple-500/20 hover:bg-purple-500/30 active:bg-purple-500/40 text-white border-purple-400/50 h-12 shadow-lg shadow-purple-500/20 active:scale-95 transition-all duration-150"
                    >
                      ↑ UP
                    </Button>
                    <Button
                      onTouchStart={(e) => {
                        e.preventDefault()
                        handleMovement("forward")
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        handleMovement("forward")
                      }}
                      variant="outline"
                      size="sm"
                      className="bg-purple-500/20 hover:bg-purple-500/30 active:bg-purple-500/40 text-white border-purple-400/50 h-12 shadow-lg shadow-purple-500/20 active:scale-95 transition-all duration-150"
                    >
                      ⬆ FWD
                    </Button>

                    {/* Middle Row */}
                    <Button
                      onTouchStart={(e) => {
                        e.preventDefault()
                        handleMovement("left")
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        handleMovement("left")
                      }}
                      variant="outline"
                      size="sm"
                      className="bg-purple-500/20 hover:bg-purple-500/30 active:bg-purple-500/40 text-white border-purple-400/50 h-12 shadow-lg shadow-purple-500/20 active:scale-95 transition-all duration-150"
                    >
                      ← LEFT
                    </Button>
                    <Button
                      onTouchStart={(e) => {
                        e.preventDefault()
                        handleMovement("down")
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        handleMovement("down")
                      }}
                      variant="outline"
                      size="sm"
                      className="bg-purple-500/20 hover:bg-purple-500/30 active:bg-purple-500/40 text-white border-purple-400/50 h-12 shadow-lg shadow-purple-500/20 active:scale-95 transition-all duration-150"
                    >
                      ↓ DOWN
                    </Button>
                    <Button
                      onTouchStart={(e) => {
                        e.preventDefault()
                        handleMovement("right")
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        handleMovement("right")
                      }}
                      variant="outline"
                      size="sm"
                      className="bg-purple-500/20 hover:bg-purple-500/30 active:bg-purple-500/40 text-white border-purple-400/50 h-12 shadow-lg shadow-purple-500/20 active:scale-95 transition-all duration-150"
                    >
                      → RIGHT
                    </Button>

                    {/* Bottom Row */}
                    <div></div>
                    <div></div>
                    <Button
                      onTouchStart={(e) => {
                        e.preventDefault()
                        handleMovement("backward")
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        handleMovement("backward")
                      }}
                      variant="outline"
                      size="sm"
                      className="bg-purple-500/20 hover:bg-purple-500/30 active:bg-purple-500/40 text-white border-purple-400/50 h-12 shadow-lg shadow-purple-500/20 active:scale-95 transition-all duration-150"
                    >
                      ⬇ BACK
                    </Button>
                  </div>
                  <div className="text-center mt-3 space-y-1">
                    <p className="text-xs text-purple-200 font-medium">
                      Use thrusters to navigate in weightlessness
                    </p>
                    <p className="text-xs text-purple-300">
                      Remember: momentum carries you forward!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Training Panel */}
          <div className="w-full lg:w-96 p-4 space-y-4 bg-black/20 backdrop-blur-sm overflow-y-auto border-l border-white/10">
            {/* Mission Progress */}
            <Card className="bg-purple-900/80 backdrop-blur-sm border-purple-400/50 shadow-lg shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  Training Progress
                  <Button
                    onClick={resetTraining}
                    variant="outline"
                    size="sm"
                    className="border-purple-400/50 text-white hover:bg-purple-500/30 bg-purple-500/20"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Complete all objectives to finish space training
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>Objectives Complete</span>
                    <span>
                      {completedObjectives}/{objectives.length}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                <div className="space-y-2">
                  {objectives.map((objective) => (
                    <div
                      key={objective.id}
                      className={`flex items-center justify-between p-2 rounded ${
                        objective.completed
                          ? "bg-green-500/30 border border-green-400/50"
                          : "bg-purple-500/20 border border-purple-400/30"
                      }`}
                    >
                      <span className="text-sm text-white font-medium">{objective.name}</span>
                      {objective.completed ? (
                        <Badge variant="secondary" className="bg-green-500 text-white">
                          <Target className="w-3 h-3 mr-1" />
                          Complete
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-purple-400/50 text-white bg-purple-500/20">
                          Pending
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                {completedObjectives === objectives.length && (
                  <div className="mt-4 p-3 bg-green-500/30 rounded-lg text-center border border-green-400/50">
                    <p className="font-semibold text-white">Training Complete!</p>
                    <p className="text-sm text-green-100">
                      Time: {formatTime(timeElapsed)} | Score: {score}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Neutral Buoyancy Lab */}
            <Card className="bg-purple-900/80 backdrop-blur-sm border-purple-400/50 shadow-lg shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Neutral Buoyancy Lab</CardTitle>
                <CardDescription className="text-purple-100">
                  NASA's space training simulation facility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed text-white">
                  This space training simulation replicates the weightlessness of space, allowing astronauts to train 
                  for complex EVA tasks in a controlled environment that mimics the International Space Station.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-white">Training Facts:</h4>
                  <ul className="text-sm space-y-1 text-purple-100">
                    <li>• Simulates zero-gravity environment</li>
                    <li>• Full-scale ISS module mockups</li>
                    <li>• Advanced thruster control systems</li>
                    <li>• Realistic space physics simulation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Weightlessness Physics */}
            <Card className="bg-purple-900/80 backdrop-blur-sm border-purple-400/50 shadow-lg shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Weightlessness Physics</CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <p className="text-sm leading-relaxed">
                  In space, there's no air resistance or gravity to stop your movement. Every action has an equal and
                  opposite reaction - when you push off something, you'll keep moving until you hit something else.
                  Astronauts use small thrusters to control their movement during spacewalks.
                </p>
              </CardContent>
            </Card>

            {/* Controls Help */}
            <Card className="bg-purple-900/80 backdrop-blur-sm border-purple-400/50 shadow-lg shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Movement Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs text-white">
                  <div>↑↓ - Up/Down</div>
                  <div>←→ - Left/Right</div>
                  <div>⬆⬇ - Forward/Back</div>
                  <div>🎯 - Get close to objectives</div>
                </div>
                <p className="text-xs mt-2 text-purple-100">
                  Remember: In weightlessness, you'll keep moving until you use thrusters to stop!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
