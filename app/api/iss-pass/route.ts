import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get("lat") || "40.7128"
  const lon = searchParams.get("lon") || "-74.0060"

  try {
    // Fetch ISS pass times for a location
    const response = await fetch(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${lon}&n=5`)
    const data = await response.json()

    if (data.message === "success") {
      const passes = data.response.map((pass: any) => ({
        risetime: pass.risetime,
        duration: pass.duration,
        date: new Date(pass.risetime * 1000).toLocaleString(),
      }))

      return NextResponse.json({
        success: true,
        location: { latitude: Number.parseFloat(lat), longitude: Number.parseFloat(lon) },
        passes: passes,
      })
    }

    throw new Error("Failed to fetch ISS pass times")
  } catch (error) {
    console.error("ISS Pass API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch ISS pass times" }, { status: 500 })
  }
}
