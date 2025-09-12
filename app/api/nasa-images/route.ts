import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || "ISS Earth"

  try {
    // NASA Images and Video Library API
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page_size=10`,
    )
    const data = await response.json()

    if (data.collection && data.collection.items) {
      const images = data.collection.items.map((item: any) => ({
        id: item.data[0].nasa_id,
        title: item.data[0].title,
        description: item.data[0].description,
        date: item.data[0].date_created,
        image: item.links?.[0]?.href || "/placeholder.svg?height=300&width=400",
        photographer: item.data[0].photographer || "NASA",
        location: item.data[0].location || "International Space Station",
      }))

      return NextResponse.json({
        success: true,
        images: images.slice(0, 6), // Limit to 6 images
      })
    }

    throw new Error("No images found")
  } catch (error) {
    console.error("NASA Images API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch NASA images" }, { status: 500 })
  }
}
