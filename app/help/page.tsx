"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Gamepad2, Mouse, Keyboard, Eye, Globe, Zap, Wrench, HelpCircle, Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeft as ArrowLeftIcon, ArrowRight, ChevronUp, ChevronDown } from "lucide-react"
import { SpaceStation3D } from "@/components/celebration-effects"

export default function HelpPage() {
  return (
    <div className="min-h-screen earth-orbit-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-pink-900/40 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      <SpaceStation3D />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-purple-900/30 backdrop-blur-md border-b border-purple-500/20">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-500/20 border border-purple-400/30">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center space-x-2 text-white">
            <HelpCircle className="w-5 h-5 text-purple-300" />
            <span className="font-semibold text-shadow-glow">Help & Instructions</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-white text-shadow-glow">Help & Instructions</h1>
              <p className="text-purple-100 text-lg">Learn how to navigate and master the ISS training missions</p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-purple-900/50 backdrop-blur-sm border border-purple-400/30">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">Overview</TabsTrigger>
                <TabsTrigger value="controls" className="text-white data-[state=active]:bg-purple-600">Controls</TabsTrigger>
                <TabsTrigger value="games" className="text-white data-[state=active]:bg-purple-600">Games</TabsTrigger>
                <TabsTrigger value="troubleshooting" className="text-white data-[state=active]:bg-purple-600">Troubleshooting</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">Getting Started</CardTitle>
                    <CardDescription className="text-purple-100">
                      Welcome to Cupola Dash - your ISS training adventure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">🎯 Mission Overview</h4>
                        <p className="text-white">
                          Cupola Dash is an interactive educational experience that lets you explore the International Space Station 
                          through various training missions. Learn about Earth observation, orbital mechanics, and astronaut training.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">🎮 Game Structure</h4>
                        <ul className="text-white space-y-1">
                          <li>• 6 Training Levels (Beginner to Advanced)</li>
                          <li>• Real-time ISS Data Integration</li>
                          <li>• Interactive 3D Simulations</li>
                          <li>• Educational Content & Facts</li>
                          <li>• Progress Tracking & Achievements</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">Navigation Guide</CardTitle>
                    <CardDescription className="text-purple-100">
                      How to move through the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-black/20 p-4 rounded-lg border border-purple-400/30">
                        <h4 className="font-semibold text-purple-200 mb-2">🏠 Home Page</h4>
                        <p className="text-white text-sm">Start your mission, learn about the ISS, or get help</p>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg border border-purple-400/30">
                        <h4 className="font-semibold text-purple-200 mb-2">👨‍🚀 Login</h4>
                        <p className="text-white text-sm">Create your astronaut identity and choose an avatar</p>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg border border-purple-400/30">
                        <h4 className="font-semibold text-purple-200 mb-2">🎯 Mission Control</h4>
                        <p className="text-white text-sm">Select training levels and track your progress</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Controls Tab */}
              <TabsContent value="controls" className="space-y-6">
                <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center space-x-2">
                      <Gamepad2 className="w-6 h-6 text-purple-300" />
                      <span>General Controls</span>
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                      Basic navigation and interaction controls
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-purple-200 text-lg flex items-center space-x-2">
                          <Mouse className="w-5 h-5" />
                          <span>Mouse Controls</span>
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">Rotate 3D View</span>
                            <Badge variant="outline" className="text-xs">Click & Drag</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">Zoom In/Out</span>
                            <Badge variant="outline" className="text-xs">Scroll Wheel</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">Select Objects</span>
                            <Badge variant="outline" className="text-xs">Click</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-purple-200 text-lg flex items-center space-x-2">
                          <Keyboard className="w-5 h-5" />
                          <span>Keyboard Shortcuts</span>
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">Reset View</span>
                            <Badge variant="outline" className="text-xs">R Key</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">Pause/Play</span>
                            <Badge variant="outline" className="text-xs">Spacebar</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">Fullscreen</span>
                            <Badge variant="outline" className="text-xs">F Key</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">3D Movement Controls</CardTitle>
                    <CardDescription className="text-purple-100">
                      How to control your astronaut in 3D space
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">🎮 Touch/Mouse Controls</h4>
                        <div className="grid grid-cols-3 gap-2 max-w-xs">
                          <div></div>
                          <div className="bg-purple-600/30 p-2 rounded text-center text-white text-xs">↑ UP</div>
                          <div className="bg-purple-600/30 p-2 rounded text-center text-white text-xs">⬆ FWD</div>
                          <div className="bg-purple-600/30 p-2 rounded text-center text-white text-xs">← LEFT</div>
                          <div className="bg-purple-600/30 p-2 rounded text-center text-white text-xs">↓ DOWN</div>
                          <div className="bg-purple-600/30 p-2 rounded text-center text-white text-xs">→ RIGHT</div>
                          <div></div>
                          <div></div>
                          <div className="bg-purple-600/30 p-2 rounded text-center text-white text-xs">⬇ BACK</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">⌨️ Keyboard Controls</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">W / ↑</span>
                            <span className="text-purple-200">Move Up</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">S / ↓</span>
                            <span className="text-purple-200">Move Down</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">A / ←</span>
                            <span className="text-purple-200">Move Left</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">D / →</span>
                            <span className="text-purple-200">Move Right</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">W / ↑</span>
                            <span className="text-purple-200">Move Forward</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-black/20 rounded">
                            <span className="text-white">S / ↓</span>
                            <span className="text-purple-200">Move Backward</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Games Tab */}
              <TabsContent value="games" className="space-y-6">
                <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center space-x-2">
                      <Eye className="w-6 h-6 text-purple-300" />
                      <span>Cupola Training</span>
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                      Earth observation from the ISS cupola
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">🎯 Objective</h4>
                        <p className="text-white">
                          Click on glowing markers to identify Earth features and learn about different locations 
                          visible from the International Space Station.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">🎮 How to Play</h4>
                        <ul className="text-white space-y-1">
                          <li>• Look for glowing blue markers on Earth</li>
                          <li>• Click on markers to learn about locations</li>
                          <li>• Earn 100 points per discovered location</li>
                          <li>• Complete all 5 locations to finish</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center space-x-2">
                      <Globe className="w-6 h-6 text-purple-300" />
                      <span>Day/Night Cycles</span>
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                      Experience orbital mechanics and day/night cycles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">🎯 Objective</h4>
                        <p className="text-white">
                          Watch the Earth's day and night cycle as the ISS orbits, experiencing 16 sunrises 
                          and sunsets per day.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">🎮 How to Play</h4>
                        <ul className="text-white space-y-1">
                          <li>• Use the slider to control time</li>
                          <li>• Click Play to start automatic simulation</li>
                          <li>• Watch for sunrises and sunsets</li>
                          <li>• Complete 1 orbit and 5 sunrises</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center space-x-2">
                      <Zap className="w-6 h-6 text-purple-300" />
                      <span>NBL Training</span>
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                      Master weightlessness in the Neutral Buoyancy Lab
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">🎯 Objective</h4>
                        <p className="text-white">
                          Navigate in 3D space using thrusters to complete training objectives. 
                          Learn how momentum works in weightlessness.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">🎮 How to Play</h4>
                        <ul className="text-white space-y-1">
                          <li>• Use 6-directional thruster controls</li>
                          <li>• Get close to glowing objectives</li>
                          <li>• Complete all 4 training tasks</li>
                          <li>• Remember: momentum carries you forward!</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center space-x-2">
                      <Wrench className="w-6 h-6 text-purple-300" />
                      <span>Spacewalk Training</span>
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                      Advanced EVA (Extravehicular Activity) simulation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">🎯 Objective</h4>
                        <p className="text-white">
                          Complete spacewalk tasks under time pressure while managing oxygen levels. 
                          Experience the challenges of working in space.
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-purple-200 text-lg">🎮 How to Play</h4>
                        <ul className="text-white space-y-1">
                          <li>• Navigate to colored task markers</li>
                          <li>• Stay close for 3 seconds to complete</li>
                          <li>• Watch your oxygen levels</li>
                          <li>• Complete tasks before time runs out</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Troubleshooting Tab */}
              <TabsContent value="troubleshooting" className="space-y-6">
                <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">Common Issues & Solutions</CardTitle>
                    <CardDescription className="text-purple-100">
                      Troubleshooting guide for common problems
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="bg-black/20 p-4 rounded-lg border border-purple-400/30">
                        <h4 className="font-semibold text-purple-200 mb-2">🐌 Game Running Slowly</h4>
                        <p className="text-white text-sm mb-2">If the 3D graphics are slow or choppy:</p>
                        <ul className="text-white text-sm space-y-1 ml-4">
                          <li>• Close other browser tabs</li>
                          <li>• Update your graphics drivers</li>
                          <li>• Try a different browser (Chrome recommended)</li>
                          <li>• Disable browser extensions temporarily</li>
                        </ul>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg border border-purple-400/30">
                        <h4 className="font-semibold text-purple-200 mb-2">🎮 Controls Not Working</h4>
                        <p className="text-white text-sm mb-2">If movement controls aren't responding:</p>
                        <ul className="text-white text-sm space-y-1 ml-4">
                          <li>• Click on the 3D area first to focus</li>
                          <li>• Try refreshing the page</li>
                          <li>• Check if you're in the correct game mode</li>
                          <li>• Use keyboard controls as alternative</li>
                        </ul>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg border border-purple-400/30">
                        <h4 className="font-semibold text-purple-200 mb-2">📱 Mobile Issues</h4>
                        <p className="text-white text-sm mb-2">For mobile device problems:</p>
                        <ul className="text-white text-sm space-y-1 ml-4">
                          <li>• Use landscape orientation for better controls</li>
                          <li>• Ensure stable internet connection</li>
                          <li>• Try using Chrome or Safari browser</li>
                          <li>• Clear browser cache if needed</li>
                        </ul>
                      </div>
                      <div className="bg-black/20 p-4 rounded-lg border border-purple-400/30">
                        <h4 className="font-semibold text-purple-200 mb-2">🔄 Progress Not Saving</h4>
                        <p className="text-white text-sm mb-2">If your progress isn't being saved:</p>
                        <ul className="text-white text-sm space-y-1 ml-4">
                          <li>• Check if cookies are enabled</li>
                          <li>• Don't use private/incognito mode</li>
                          <li>• Complete levels fully before leaving</li>
                          <li>• Refresh the page if needed</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">Performance Tips</CardTitle>
                    <CardDescription className="text-purple-100">
                      Optimize your experience for the best performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-purple-200">💻 Desktop</h4>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Use Chrome or Edge browser</li>
                          <li>• Enable hardware acceleration</li>
                          <li>• Close unnecessary applications</li>
                          <li>• Use a dedicated graphics card if available</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-purple-200">📱 Mobile</h4>
                        <ul className="text-white text-sm space-y-1">
                          <li>• Use landscape orientation</li>
                          <li>• Ensure good internet connection</li>
                          <li>• Close background apps</li>
                          <li>• Use the latest browser version</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Contact & Support */}
            <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Need More Help?</CardTitle>
                <CardDescription className="text-purple-100">
                  Additional resources and support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-black/20 rounded-lg border border-purple-400/30">
                    <h4 className="font-semibold text-purple-200 mb-2">📚 About ISS</h4>
                    <p className="text-white text-sm mb-3">Learn more about the International Space Station</p>
                    <Link href="/about">
                      <Button size="sm" variant="outline" className="border-purple-400/50 text-white hover:bg-purple-500/30">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                  <div className="text-center p-4 bg-black/20 rounded-lg border border-purple-400/30">
                    <h4 className="font-semibold text-purple-200 mb-2">🎮 Start Training</h4>
                    <p className="text-white text-sm mb-3">Begin your ISS adventure</p>
                    <Link href="/login">
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Start Mission
                      </Button>
                    </Link>
                  </div>
                  <div className="text-center p-4 bg-black/20 rounded-lg border border-purple-400/30">
                    <h4 className="font-semibold text-purple-200 mb-2">🛰️ Live Data</h4>
                    <p className="text-white text-sm mb-3">View real-time ISS information</p>
                    <Link href="/live-iss">
                      <Button size="sm" variant="outline" className="border-purple-400/50 text-white hover:bg-purple-500/30">
                        View Live Data
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
