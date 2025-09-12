import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock space weather data (NASA's space weather API requires authentication)
    // In a real implementation, you would use NASA's Space Weather API
    const mockData = {
      success: true,
      solarActivity: {
        level: Math.random() > 0.7 ? "High" : Math.random() > 0.4 ? "Moderate" : "Low",
        flareRisk: Math.random() > 0.8 ? "Elevated" : "Normal",
        kpIndex: Math.floor(Math.random() * 9) + 1,
      },
      radiation: {
        level: Math.random() > 0.6 ? "Elevated" : "Normal",
        dose: Math.floor(Math.random() * 50) + 10, // microsieverts per hour
      },
      magnetosphere: {
        status: Math.random() > 0.5 ? "Disturbed" : "Quiet",
        storms: Math.random() > 0.8 ? "Active" : "None",
      },
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Space Weather API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch space weather data" }, { status: 500 })
  }
}
