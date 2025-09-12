import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Fetch current ISS crew
    const response = await fetch("http://api.open-notify.org/astros.json")
    const data = await response.json()

    if (data.message === "success") {
      // Filter for ISS crew only
      const issCrew = data.people.filter((person: any) => person.craft === "ISS")

      return NextResponse.json({
        success: true,
        total: issCrew.length,
        crew: issCrew.map((member: any) => ({
          name: member.name,
          craft: member.craft,
        })),
      })
    }

    throw new Error("Failed to fetch ISS crew")
  } catch (error) {
    console.error("ISS Crew API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch ISS crew" }, { status: 500 })
  }
}
