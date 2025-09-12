import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Globe, Users, Star, Satellite } from "lucide-react"
import { CelebrationEffects } from "@/components/celebration-effects"

export default function HomePage() {
  return (
    <div className="min-h-screen earth-bg stars-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <CelebrationEffects />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-3 mb-4 animate-glow">
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-white font-bold text-lg">ISS 25th Anniversary</span>
            <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-float">
                <Satellite className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <p className="text-purple-200 text-sm">25 Years of International Cooperation</p>
        </div>

        {/* Game Logo/Title */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center animate-pulse">
              <Rocket className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white text-balance drop-shadow-lg">Cupola Dash</h1>
          
        </div>

        {/* Main Menu Card */}
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-card-foreground">Welcome!</CardTitle>
            <CardDescription>Begin your ISS adventure and explore space like never before</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/login" className="block">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
              >
                <Users className="w-5 h-5 mr-2" />
                Start Anniversary Mission
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/about">
                <Button variant="outline" className="w-full bg-transparent border-purple-400/50 hover:bg-purple-600/10">
                  <Globe className="w-4 h-4 mr-2" />
                  About ISS
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline" className="w-full bg-transparent border-purple-400/50 hover:bg-purple-600/10">
                  Help
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <p className="font-semibold text-purple-200">NASA Space Apps Challenge 2025</p>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-purple-300">🎉 Celebrating 25 Years of the ISS 🎉</p>
          <p className="text-xs text-purple-400">International Space Station</p>
        </div>
      </div>
    </div>
  )
}
