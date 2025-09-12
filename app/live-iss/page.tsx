"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Satellite } from "lucide-react"
import { ISSTracker } from "@/components/iss-tracker"
import { NASAImageGallery } from "@/components/nasa-image-gallery"

export default function LiveISSPage() {
  return (
    <div className="min-h-screen earth-orbit-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
      <div className="absolute inset-0 stars-bg animate-pulse-slow" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex items-center justify-between p-4 bg-purple-900/30 backdrop-blur-md border-b border-purple-500/20">
          <Link href="/levels">
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-500/20 border border-purple-400/30">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Levels
            </Button>
          </Link>
          <div className="flex items-center space-x-2 text-white">
            <Satellite className="w-5 h-5 text-purple-300" />
            <span className="font-semibold text-shadow-glow">Live ISS Data</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-white text-shadow-glow">Live ISS Mission Control</h1>
              <p className="text-purple-100 text-lg">Real-time data from the International Space Station</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Live ISS Data */}
              <div>
                <ISSTracker />
              </div>

              {/* NASA Images */}
              <div>
                <NASAImageGallery
                  query="International Space Station Earth"
                  title="ISS Earth Photography"
                  description="Recent images captured from the ISS"
                />
              </div>
            </div>

            <Card className="bg-purple-900/80 backdrop-blur-md border-purple-400/50 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white text-xl">About Live ISS Tracking</CardTitle>
                <CardDescription className="text-purple-100">
                  Understanding real-time space station data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-200 text-lg">🛰️ Orbital Mechanics</h4>
                    <p className="text-white leading-relaxed">
                      The ISS orbits Earth every 93 minutes at an altitude of approximately 408 km. Its position changes
                      constantly as it travels at 27,600 km/h, completing about 16 orbits per day.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-200 text-lg">☀️ Space Weather Impact</h4>
                    <p className="text-white leading-relaxed">
                      Solar activity and space weather affect the ISS and its crew. High radiation levels can require
                      astronauts to shelter in protected areas, while solar storms can disrupt communications.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-200 text-lg">👨‍🚀 Crew Rotations</h4>
                    <p className="text-white leading-relaxed">
                      The ISS typically hosts 3-7 crew members from different countries. Crew rotations happen every 6
                      months, with astronauts arriving via SpaceX Dragon or Russian Soyuz spacecraft.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-200 text-lg">🌍 Earth Observation</h4>
                    <p className="text-white leading-relaxed">
                      From the ISS, astronauts photograph Earth for scientific research, disaster monitoring, and
                      educational purposes. These images help us understand climate change and natural phenomena.
                    </p>
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
