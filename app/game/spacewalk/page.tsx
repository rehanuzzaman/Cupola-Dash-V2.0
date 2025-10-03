"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Wrench, Timer, RotateCcw, AlertTriangle } from "lucide-react"
import * as THREE from "three"

// Advanced spacewalk challenges
const spacewalkTasks = [
  {
    id: 1,
    name: "Replace Solar Panel Battery",
    position: [4, 2, -1],
    completed: false,
    difficulty: "Hard",
    timeLimit: 120,
    description: "Carefully remove old battery and install new one",
  },
  {
    id: 2,
    name: "Repair Communication Array",
    position: [-3, 1, 2],
    completed: false,
    difficulty: "Medium",
    timeLimit: 90,
    description: "Realign the antenna and secure loose connections",
  },
  {
    id: 3,
    name: "Install Science Experiment",
    position: [1, -2, 3],
    completed: false,
    difficulty: "Hard",
    timeLimit: 150,
    description: "Mount delicate equipment to external platform",
  },
  {
    id: 4,
    name: "Emergency Coolant Leak Fix",
    position: [-2, -1, -2],
    completed: false,
    difficulty: "Critical",
    timeLimit: 60,
    description: "Stop coolant leak before system failure",
  },
]

function AdvancedAstronaut({
  position,
  onPositionChange,
  hasTools,
}: {
  position: THREE.Vector3
  onPositionChange: (pos: THREE.Vector3) => void
  hasTools: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const velocity = useRef(new THREE.Vector3(0, 0, 0))
  const [isThrusting, setIsThrusting] = useState(false)
  const [thrusterDirection, setThrusterDirection] = useState(new THREE.Vector3())

  useFrame((state, delta) => {
    if (groupRef.current) {
      // More realistic physics with momentum
      const currentPos = groupRef.current.position.clone()
      const newPosition = currentPos.add(velocity.current.clone().multiplyScalar(delta))

      // Boundary constraints around ISS
      newPosition.x = Math.max(-8, Math.min(8, newPosition.x))
      newPosition.y = Math.max(-5, Math.min(5, newPosition.y))
      newPosition.z = Math.max(-6, Math.min(6, newPosition.z))

      // Gradual damping (space has minimal resistance)
      velocity.current.multiplyScalar(0.995)

      // Slight rotation based on movement for realism
      if (velocity.current.length() > 0.01) {
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05
      }

      // Update position through callback instead of direct mutation
      groupRef.current.position.copy(newPosition)
      onPositionChange(newPosition)
    }
  })

  const thrust = (direction: THREE.Vector3) => {
    if (velocity.current) {
      // More precise thrust control, affected by tools
      const thrustPower = hasTools ? 0.06 : 0.08
      velocity.current.add(direction.multiplyScalar(thrustPower))
      setThrusterDirection(direction.clone())
      setIsThrusting(true)
      setTimeout(() => setIsThrusting(false), 200)
    }
  }

  useEffect(() => {
    ;(window as any).thrustAdvancedAstronaut = thrust
  }, [hasTools])

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      {/* Astronaut Body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={isThrusting ? "#f59e0b" : "#e5e7eb"} />
      </mesh>

      {/* Helmet with reflection */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.4} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Life Support Backpack */}
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[0.4, 0.5, 0.2]} />
        <meshStandardMaterial color="#666666" />
      </mesh>

      {/* Astronaut Gloves/Hands */}
      <mesh position={[0.3, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.4}
          roughness={0.3}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </mesh>
      <mesh position={[-0.3, 0, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.4}
          roughness={0.3}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Enhanced Tools/Gloves */}
      {hasTools && (
        <group position={[0.4, 0, 0]}>
          {/* Main tool body */}
          <mesh>
            <boxGeometry args={[0.15, 0.5, 0.08]} />
            <meshStandardMaterial 
              color="#fbbf24" 
              metalness={0.8}
              roughness={0.2}
              emissive="#fbbf24"
              emissiveIntensity={0.1}
            />
          </mesh>
          {/* Tool grip */}
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[0.12, 0.15, 0.06]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          {/* Tool tip */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.08, 0.1, 0.04]} />
            <meshStandardMaterial 
              color="#c0c0c0" 
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          {/* Glowing effect */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.18, 0.55, 0.1]} />
            <meshBasicMaterial 
              color="#fbbf24" 
              transparent 
              opacity={0.2} 
            />
          </mesh>
        </group>
      )}

      {/* Advanced Thruster Effects */}
      {isThrusting && (
        <>
          <mesh position={thrusterDirection.clone().multiplyScalar(-0.5)}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} />
          </mesh>
          <mesh position={thrusterDirection.clone().multiplyScalar(-0.7)}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
          </mesh>
        </>
      )}
    </group>
  )
}

function SpaceStation({ tasks, onTaskComplete }: { tasks: any[]; onTaskComplete: (id: number) => void }) {
  return (
    <group>
      {/* Main ISS Structure */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 1, 1]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Solar Panels */}
      <mesh position={[4, 0, 0]}>
        <boxGeometry args={[0.1, 3, 6]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.5} roughness={0.1} />
      </mesh>
      <mesh position={[-4, 0, 0]}>
        <boxGeometry args={[0.1, 3, 6]} />
        <meshStandardMaterial color="#1e3a8a" metalness={0.5} roughness={0.1} />
      </mesh>

      {/* Connecting Modules */}
      <mesh position={[0, 0, 2]}>
        <boxGeometry args={[2, 0.8, 1]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[0, 0, -2]}>
        <boxGeometry args={[2, 0.8, 1]} />
        <meshStandardMaterial color="#888888" />
      </mesh>

      {/* Task Locations with improved visibility */}
      {tasks.map((task) => {
        const getDifficultyColor = (difficulty: string) => {
          switch (difficulty) {
            case "Medium":
              return "#f59e0b"
            case "Hard":
              return "#ef4444"
            case "Critical":
              return "#dc2626"
            default:
              return "#10b981"
          }
        }

        return (
          <group key={task.id} position={task.position}>
            <mesh>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial
                color={task.completed ? "#10b981" : getDifficultyColor(task.difficulty)}
                transparent
                opacity={task.completed ? 0.4 : 0.9}
                emissive={task.completed ? "#000000" : getDifficultyColor(task.difficulty)}
                emissiveIntensity={task.completed ? 0 : 0.2}
              />
            </mesh>
            {/* Task indicator beacon */}
            <mesh position={[0, 1.2, 0]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial
                color={task.completed ? "#10b981" : "#ffffff"}
                transparent
                opacity={task.completed ? 0.5 : 1.0}
              />
            </mesh>
          </group>
        )
      })}

      {/* Earth in background */}
      <mesh position={[0, -30, -20]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshStandardMaterial color="#4f46e5" transparent opacity={0.6} emissive="#1e40af" emissiveIntensity={0.1} />
      </mesh>
    </group>
  )
}

function AdvancedScene({ tasks, onTaskComplete, astronautPosition, onAstronautMove, hasTools }: any) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <pointLight position={[0, 0, 0]} intensity={0.8} color="#ffffff" />

      {/* Earth in the background */}
      <mesh position={[0, 0, -20]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshStandardMaterial 
          color="#4A90E2" 
          metalness={0.1} 
          roughness={0.8}
          emissive="#1a365d"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Earth atmosphere */}
      <mesh position={[0, 0, -20]}>
        <sphereGeometry args={[6.2, 32, 32]} />
        <meshBasicMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      <AdvancedAstronaut position={astronautPosition} onPositionChange={onAstronautMove} hasTools={hasTools} />
      <SpaceStation tasks={tasks} onTaskComplete={onTaskComplete} />

      <OrbitControls enablePan={false} minDistance={8} maxDistance={25} />
    </>
  )
}

export default function SpacewalkPage() {
  const [tasks, setTasks] = useState(spacewalkTasks)
  const [astronautPosition, setAstronautPosition] = useState(new THREE.Vector3(0, 3, 0))
  const [currentTask, setCurrentTask] = useState<any>(null)
  const [taskTimer, setTaskTimer] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [score, setScore] = useState(0)
  const [hasTools, setHasTools] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [oxygenLevel, setOxygenLevel] = useState(100)

  // Game timers
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted) {
      interval = setInterval(() => {
        setTotalTime((prev) => prev + 1)
        setOxygenLevel((prev) => Math.max(0, prev - 0.1)) // Oxygen depletes slowly

        if (currentTask && !currentTask.completed) {
          setTaskTimer((prev) => prev + 1)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, currentTask])

  // Check task completion and proximity
  useEffect(() => {
    tasks.forEach((task) => {
      if (!task.completed) {
        const distance = astronautPosition.distanceTo(new THREE.Vector3(...task.position))
        if (distance < 1.2) {
          if (!currentTask || currentTask.id !== task.id) {
            setCurrentTask(task)
            setTaskTimer(0)
          }

          // Auto-complete after being close for 3 seconds
          if (currentTask && currentTask.id === task.id && taskTimer >= 3) {
            handleTaskComplete(task.id)
          }
        }
      }
    })
  }, [astronautPosition, tasks, currentTask, taskTimer])

  const handleTaskComplete = (id: number) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: true } : t)))

    // Scoring based on difficulty and time
    let points = 500
    if (task.difficulty === "Hard") points = 750
    if (task.difficulty === "Critical") points = 1000

    // Time bonus
    const timeBonus = Math.max(0, (task.timeLimit - taskTimer) * 5)

    setScore((prev) => prev + points + timeBonus)
    setCompletedTasks((prev) => {
      const newCount = prev + 1
      // Update progress (25% per task, 100% when all 4 are completed)
      const newProgress = Math.min(100, newCount * 25)
      localStorage.setItem(`levelProgress_6`, newProgress.toString())
      return newCount
    })
    setCurrentTask(null)
    setTaskTimer(0)
  }

  const handleMovement = (direction: string) => {
    if (!(window as any).thrustAdvancedAstronaut) return

    const thrustVector = new THREE.Vector3()
    const thrustPower = hasTools ? 0.8 : 1.0 // Tools make movement slightly harder

    switch (direction) {
      case "up":
        thrustVector.set(0, thrustPower, 0)
        break
      case "down":
        thrustVector.set(0, -thrustPower, 0)
        break
      case "left":
        thrustVector.set(-thrustPower, 0, 0)
        break
      case "right":
        thrustVector.set(thrustPower, 0, 0)
        break
      case "forward":
        thrustVector.set(0, 0, thrustPower)
        break
      case "backward":
        thrustVector.set(0, 0, -thrustPower)
        break
    }
    ;(window as any).thrustAdvancedAstronaut(thrustVector)
    if (!gameStarted) setGameStarted(true)
  }

  const resetSpacewalk = () => {
    setTasks(spacewalkTasks.map((task) => ({ ...task, completed: false })))
    setAstronautPosition(new THREE.Vector3(0, 3, 0))
    setCurrentTask(null)
    setTaskTimer(0)
    setTotalTime(0)
    setScore(0)
    setHasTools(true)
    setGameStarted(false)
    setCompletedTasks(0)
    setOxygenLevel(100)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = (completedTasks / tasks.length) * 100

  return (
    <div className="min-h-screen earth-orbit-bg relative overflow-hidden">
      {/* Deep Space Background with ISS Theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
        <div className="absolute inset-0 bg-[url('/space-backgrounds/iss-in-orbit.png')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent"></div>
        {/* Nebula overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10"></div>
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
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0">
              <Wrench className="w-4 h-4 mr-1" />
              EVA Spacewalk
            </Badge>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 px-3 py-2 rounded-lg border border-blue-400/50">
              <Timer className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-bold text-blue-300">Time:</span>
              <span className="text-lg font-bold text-blue-400">{formatTime(totalTime)}</span>
            </div>
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
              oxygenLevel < 30 ? "bg-gradient-to-r from-red-600/30 to-pink-600/30 border-red-400/50" : "bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border-cyan-400/50"
            }`}>
              <span className="text-sm font-bold text-white">O₂:</span>
              <span className={`text-lg font-bold ${oxygenLevel < 30 ? "text-red-400" : "text-cyan-400"}`}>
                {Math.round(oxygenLevel)}%
              </span>
            </div>
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
              hasTools ? "bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border-yellow-400/50" : "bg-gradient-to-r from-gray-600/30 to-slate-600/30 border-gray-400/50"
            }`}>
              <span className="text-sm font-bold text-white">Tools:</span>
              <span className={`text-lg font-bold ${hasTools ? "text-yellow-400" : "text-gray-400"}`}>
                {hasTools ? '🛠️ Ready' : '❌ Missing'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">
          {/* 3D Spacewalk Environment */}
          <div className="flex-1 relative">
            <Canvas camera={{ position: [8, 8, 8], fov: 60 }}>
              <Suspense fallback={null}>
                <AdvancedScene
                  tasks={tasks}
                  onTaskComplete={handleTaskComplete}
                  astronautPosition={astronautPosition}
                  onAstronautMove={setAstronautPosition}
                  hasTools={hasTools}
                />
              </Suspense>
            </Canvas>

            {/* Current Task Overlay */}
            {currentTask && (
              <div className="absolute top-4 left-4 right-4">
                <Card className="bg-card/90 backdrop-blur-sm border-purple-400/30 shadow-lg shadow-purple-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{currentTask.name}</h3>
                        <p className="text-sm text-purple-200">{currentTask.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={currentTask.difficulty === "Critical" ? "destructive" : "secondary"}>
                          {currentTask.difficulty}
                        </Badge>
                        <div className="text-sm mt-1 text-purple-200">
                          {taskTimer >= 3 ? "Completing..." : `Hold position: ${3 - taskTimer}s`}
                        </div>
                      </div>
                    </div>
                    {taskTimer > currentTask.timeLimit && (
                      <div className="flex items-center mt-2 text-red-400">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <span className="text-sm">Time limit exceeded!</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4">
              <Card className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-sm border-purple-400/30 shadow-lg shadow-purple-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm text-center">EVA Movement Controls</CardTitle>
                  <CardDescription className="text-purple-200 text-xs text-center">
                    Use thrusters to navigate in space • Earth visible in background
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
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
                      className="bg-gradient-to-b from-purple-500/30 to-purple-600/40 hover:from-purple-500/40 hover:to-purple-600/50 active:from-purple-500/50 active:to-purple-600/60 text-white border-purple-400/50 h-12 shadow-lg shadow-purple-500/20 active:scale-95 transition-all duration-150"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-lg">↑</span>
                        <span className="text-xs">UP</span>
                      </div>
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
                      Advanced EVA Controls
                    </p>
                    <p className="text-xs text-purple-300">
                      Tools affect maneuverability - Use precise movements
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mission Control Panel */}
          <div className="w-full lg:w-96 p-4 space-y-4 bg-black/20 backdrop-blur-sm overflow-y-auto border-l border-white/10">
            {/* Mission Status */}
            <Card className="bg-purple-900/80 backdrop-blur-sm border-purple-400/50 shadow-lg shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  EVA Progress
                  <Button
                    onClick={resetSpacewalk}
                    variant="outline"
                    size="sm"
                    className="border-purple-400/50 text-white hover:bg-purple-500/30 bg-purple-500/20"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </CardTitle>
                <CardDescription className="text-purple-100">Advanced spacewalk mission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white">
                    <span>Tasks Complete</span>
                    <span>
                      {completedTasks}/{tasks.length}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-white">
                  <div>
                    <span className="text-purple-100">Score:</span>
                    <div className="font-bold text-white">{score}</div>
                  </div>
                  <div>
                    <span className="text-purple-100">EVA Time:</span>
                    <div className="font-bold text-white">{formatTime(totalTime)}</div>
                  </div>
                </div>

                {completedTasks === tasks.length && (
                  <div className="mt-4 p-3 bg-green-500/30 rounded-lg text-center border border-green-400/50">
                    <p className="font-semibold text-white">EVA Complete!</p>
                    <p className="text-sm text-green-100">Perfect spacewalk execution</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Task List */}
            <Card className="bg-purple-900/80 backdrop-blur-sm border-purple-400/50 shadow-lg shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">EVA Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded border ${
                      task.completed
                        ? "bg-green-500/30 border-green-500/50"
                        : currentTask?.id === task.id
                          ? "bg-purple-500/30 border-purple-400/50"
                          : "bg-purple-500/20 border-purple-400/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{task.name}</span>
                      <Badge
                        variant={
                          task.difficulty === "Critical"
                            ? "destructive"
                            : task.difficulty === "Hard"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs text-white bg-purple-500/30 border-purple-400/50"
                      >
                        {task.difficulty}
                      </Badge>
                    </div>
                    <p className="text-xs text-purple-100">{task.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-white">Time Limit: {task.timeLimit}s</span>
                      {task.completed && (
                        <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                          Complete
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* EVA Information */}
            <Card className="bg-purple-900/80 backdrop-blur-sm border-purple-400/50 shadow-lg shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Spacewalk (EVA) Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed text-white">
                  Extravehicular Activity (EVA) is one of the most challenging aspects of space missions. Astronauts
                  must work in the vacuum of space while maintaining life support and precise control.
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-white">EVA Challenges:</h4>
                  <ul className="text-sm space-y-1 text-purple-100">
                    <li>• No air resistance for tool control</li>
                    <li>• Limited oxygen supply (6-8 hours)</li>
                    <li>• Extreme temperature variations</li>
                    <li>• Precise movements in bulky suits</li>
                    <li>• Communication delays with ground</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
