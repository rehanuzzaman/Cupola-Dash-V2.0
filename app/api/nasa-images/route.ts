import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || "ISS Earth"
  const category = searchParams.get("category") || "general"

  try {
    // Enhanced NASA Images and Video Library API with specific categories
    let searchQuery = query
    
    // Add specific NASA resource queries based on category
    switch (category) {
      case "cupola":
        searchQuery = "cupola ISS observation window Earth"
        break
      case "nbl":
        searchQuery = "Neutral Buoyancy Laboratory NBL training astronaut"
        break
      case "eva":
        searchQuery = "spacewalk EVA astronaut ISS"
        break
      case "research":
        searchQuery = "ISS research experiment space station"
        break
      case "earth":
        searchQuery = "Earth from space ISS observation"
        break
      default:
        searchQuery = query
    }

    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchQuery)}&media_type=image&page_size=12`,
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
        keywords: item.data[0].keywords || [],
        center: item.data[0].center || "NASA",
        nasa_id: item.data[0].nasa_id,
        media_type: item.data[0].media_type || "image"
      }))

      return NextResponse.json({
        success: true,
        images: images.slice(0, 8), // Increased to 8 images
        category: category,
        total_results: data.collection.metadata?.total_hits || images.length
      })
    }

    throw new Error("No images found")
  } catch (error) {
    console.error("NASA Images API Error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch NASA images" }, { status: 500 })
  }
}
