import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Fetch current ISS location
    const response = await fetch("http://api.open-notify.org/iss-now.json")
    const data = await response.json()

    if (data.message === "success") {
      return NextResponse.json({
        success: true,
        timestamp: data.timestamp,
        latitude: Number.parseFloat(data.iss_position.latitude),
        longitude: Number.parseFloat(data.iss_position.longitude),
        altitude: 408, // ISS average altitude in km
        velocity: 27600, // ISS average velocity in km/h
      })
    }

    throw new Error("Failed to fetch ISS location")
  } catch (error) {
    console.error("ISS Location API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch ISS location" }, { status: 500 })
  }
}
