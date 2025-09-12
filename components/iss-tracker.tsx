"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Satellite, Users, Globe, Zap } from "lucide-react"

interface ISSData {
  location: {
    latitude: number
    longitude: number
    altitude: number
    velocity: number
    timestamp: number
  } | null
  crew: {
    total: number
    members: Array<{ name: string; craft: string }>
  } | null
  spaceWeather: {
    solarActivity: { level: string; flareRisk: string; kpIndex: number }
    radiation: { level: string; dose: number }
    magnetosphere: { status: string; storms: string }
  } | null
}

export function ISSTracker() {
  const [issData, setISSData] = useState<ISSData>({
    location: null,
    crew: null,
    spaceWeather: null,
  })
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchISSData = async () => {
    try {
      const [locationRes, crewRes, weatherRes] = await Promise.all([
        fetch("/api/iss-location"),
        fetch("/api/iss-crew"),
        fetch("/api/space-weather"),
      ])

      const [locationData, crewData, weatherData] = await Promise.all([
        locationRes.json(),
        crewRes.json(),
        weatherRes.json(),
      ])

      setISSData({
        location: locationData.success ? locationData : null,
        crew: crewData.success ? { total: crewData.total, members: crewData.crew } : null,
        spaceWeather: weatherData.success ? weatherData : null,
      })

      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to fetch ISS data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchISSData()

    // Update every 30 seconds
    const interval = setInterval(fetchISSData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getLocationName = (lat: number, lon: number) => {
    // Simple location approximation
    if (lat > 40 && lon > -10 && lon < 40) return "Over Europe"
    if (lat > 25 && lat < 50 && lon > -125 && lon < -65) return "Over North America"
    if (lat > -35 && lat < 35 && lon > 95 && lon < 155) return "Over Asia-Pacific"
    if (lat < -20 && lon > -80 && lon < -30) return "Over South America"
    if (lat < -10 && lon > 10 && lon < 50) return "Over Africa"
    if (lat < 60 && lat > -60) return "Over Ocean"
    return "Over Earth"
  }

  if (loading) {
    return (
      <Card className="bg-card/90 backdrop-blur-sm border-border/50">
        <CardContent className="p-6 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading live ISS data...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* ISS Location */}
      {issData.location && (
        <Card className="bg-card/90 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Satellite className="w-5 h-5 text-primary" />
              <span>Live ISS Position</span>
            </CardTitle>
            <CardDescription>Real-time location from NASA</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Latitude:</span>
                <div className="font-mono font-bold">{issData.location.latitude.toFixed(2)}°</div>
              </div>
              <div>
                <span className="text-muted-foreground">Longitude:</span>
                <div className="font-mono font-bold">{issData.location.longitude.toFixed(2)}°</div>
              </div>
              <div>
                <span className="text-muted-foreground">Altitude:</span>
                <div className="font-bold">{issData.location.altitude} km</div>
              </div>
              <div>
                <span className="text-muted-foreground">Speed:</span>
                <div className="font-bold">{issData.location.velocity.toLocaleString()} km/h</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">
                {getLocationName(issData.location.latitude, issData.location.longitude)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ISS Crew */}
      {issData.crew && (
        <Card className="bg-card/90 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Current ISS Crew</span>
            </CardTitle>
            <CardDescription>{issData.crew.total} astronauts aboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {issData.crew.members.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="font-medium">{member.name}</span>
                  <Badge variant="outline">Astronaut</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Space Weather */}
      {issData.spaceWeather && (
        <Card className="bg-card/90 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Space Weather</span>
            </CardTitle>
            <CardDescription>Current conditions affecting the ISS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Solar Activity:</span>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      issData.spaceWeather.solarActivity.level === "High"
                        ? "destructive"
                        : issData.spaceWeather.solarActivity.level === "Moderate"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {issData.spaceWeather.solarActivity.level}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Radiation:</span>
                <div className="flex items-center space-x-2">
                  <Badge variant={issData.spaceWeather.radiation.level === "Elevated" ? "secondary" : "outline"}>
                    {issData.spaceWeather.radiation.level}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Kp Index:</span>
                <div className="font-bold">{issData.spaceWeather.solarActivity.kpIndex}/9</div>
              </div>
              <div>
                <span className="text-muted-foreground">Dose Rate:</span>
                <div className="font-bold">{issData.spaceWeather.radiation.dose} μSv/h</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {lastUpdate && (
        <p className="text-xs text-center text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</p>
      )}
    </div>
  )
}
