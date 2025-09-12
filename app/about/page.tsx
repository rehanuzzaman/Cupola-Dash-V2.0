"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Globe, Users, Calendar, Rocket, Satellite, Star, Award, BookOpen, Zap } from "lucide-react"
import { SpaceStation3D } from "@/components/celebration-effects"
import VRMode from "@/components/vr-mode"

export default function AboutPage() {
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
            <Globe className="w-5 h-5 text-purple-300" />
            <span className="font-semibold text-shadow-glow">About the ISS</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-white text-shadow-glow">About the International Space Station</h1>
              <p className="text-purple-100 text-lg">Celebrating 25 Years of International Cooperation in Space</p>
            </div>

            {/* ISS Overview */}
            <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center space-x-2">
                  <Satellite className="w-6 h-6 text-purple-300" />
                  <span>What is the ISS?</span>
                </CardTitle>
                <CardDescription className="text-purple-100 text-lg">
                  The International Space Station is a marvel of engineering and international cooperation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white leading-relaxed text-lg">
                  The International Space Station (ISS) is a habitable artificial satellite in low Earth orbit. 
                  It serves as a microgravity and space environment research laboratory where scientific research 
                  is conducted in astrobiology, astronomy, meteorology, physics, and other fields.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-200 text-lg">🛰️ Key Facts</h4>
                    <ul className="text-white space-y-1">
                      <li>• Altitude: 408 km above Earth</li>
                      <li>• Speed: 27,600 km/h (7.66 km/s)</li>
                      <li>• Orbital Period: 93 minutes</li>
                      <li>• Sunrises/Sunsets: 16 per day</li>
                      <li>• Mass: ~450,000 kg</li>
                      <li>• Length: 109 meters (end-to-end)</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-200 text-lg">🌍 International Partners</h4>
                    <ul className="text-white space-y-1">
                      <li>• NASA (United States)</li>
                      <li>• Roscosmos (Russia)</li>
                      <li>• ESA (Europe)</li>
                      <li>• JAXA (Japan)</li>
                      <li>• CSA (Canada)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mission Timeline */}
            <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-purple-300" />
                  <span>Mission Timeline</span>
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Key milestones in the ISS's 25-year journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">1998 - First Module Launch</h4>
                      <p className="text-purple-100">Zarya, the first ISS module, was launched by Russia, marking the beginning of the space station's construction.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">2000 - First Crew</h4>
                      <p className="text-purple-100">Expedition 1 crew arrived, beginning continuous human presence aboard the ISS that continues today.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">2011 - Assembly Complete</h4>
                      <p className="text-purple-100">The ISS reached its current configuration with the installation of the final major components.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">2023 - 25th Anniversary</h4>
                      <p className="text-purple-100">Celebrating 25 years of international cooperation, scientific discovery, and human achievement in space.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scientific Research */}
            <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-purple-300" />
                  <span>Scientific Research</span>
                </CardTitle>
                <CardDescription className="text-purple-100">
                  The ISS enables groundbreaking research in microgravity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white leading-relaxed">
                  The ISS provides a unique platform for scientific research that cannot be conducted on Earth. 
                  The microgravity environment allows scientists to study phenomena in ways impossible in Earth's gravity.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black/20 p-4 rounded-lg border border-purple-400/30">
                    <h4 className="font-semibold text-purple-200 mb-2">🧬 Biology & Medicine</h4>
                    <p className="text-white text-sm">Studying how microgravity affects human physiology, cell growth, and disease progression.</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg border border-purple-400/30">
                    <h4 className="font-semibold text-purple-200 mb-2">🌍 Earth Science</h4>
                    <p className="text-white text-sm">Monitoring climate change, natural disasters, and environmental phenomena from space.</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg border border-purple-400/30">
                    <h4 className="font-semibold text-purple-200 mb-2">🚀 Technology</h4>
                    <p className="text-white text-sm">Testing new technologies for future space exploration missions to Mars and beyond.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cupola Dash Project */}
            <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-purple-300" />
                  <span>About Cupola Dash</span>
                </CardTitle>
                <CardDescription className="text-purple-100">
                  An interactive educational experience celebrating the ISS
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white leading-relaxed">
                  Cupola Dash is an educational web application created for the NASA Space Apps Challenge 2025. 
                  It combines interactive 3D simulations with real-time NASA data to provide an immersive 
                  learning experience about the International Space Station.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-200 text-lg">🎮 Features</h4>
                    <ul className="text-white space-y-2">
                      <li>• Interactive 3D Earth observation</li>
                      <li>• Real-time ISS tracking</li>
                      <li>• Astronaut training simulations</li>
                      <li>• Educational space games</li>
                      <li>• Live NASA data integration</li>
                      <li>• Virtual spacewalk experiences</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-200 text-lg">🎯 Learning Goals</h4>
                    <ul className="text-white space-y-2">
                      <li>• Understand orbital mechanics</li>
                      <li>• Learn about Earth from space</li>
                      <li>• Experience weightlessness physics</li>
                      <li>• Explore space technology</li>
                      <li>• Discover ISS operations</li>
                      <li>• Appreciate international cooperation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="text-center space-y-4">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Your ISS Adventure
                </Button>
              </Link>
              <p className="text-purple-200 text-sm">
                Experience the wonders of space exploration and learn about the International Space Station
              </p>
            </div>

            {/* VR Mode */}
            <div className="max-w-md mx-auto">
              <VRMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
