import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || "ISS"
  const page = searchParams.get("page") || "1"

  try {
    // NASA Johnson Space Center Flickr API (using Flickr public API)
    // Note: In a real implementation, you would use NASA's official Flickr API
    const flickrApiKey = process.env.FLICKR_API_KEY || "demo_key"
    
    // For demo purposes, we'll return curated NASA images
    const curatedImages = [
      {
        id: "nasa_jsc_001",
        title: "ISS Cupola Observation Window",
        description: "Astronaut view from the Cupola observation module on the International Space Station",
        date: "2023-01-15",
        image: "/space-backgrounds/earth-from-iss.png",
        photographer: "NASA Johnson Space Center",
        location: "International Space Station",
        tags: ["cupola", "observation", "earth", "iss"],
        source: "NASA JSC Flickr"
      },
      {
        id: "nasa_jsc_002", 
        title: "Neutral Buoyancy Laboratory Training",
        description: "Astronauts training for spacewalks in the NBL at Johnson Space Center",
        date: "2023-02-20",
        image: "/space-backgrounds/astronaut-spacewalk.png",
        photographer: "NASA Johnson Space Center",
        location: "Johnson Space Center, Houston",
        tags: ["nbl", "training", "astronaut", "spacewalk"],
        source: "NASA JSC Flickr"
      },
      {
        id: "nasa_jsc_003",
        title: "ISS in Orbit",
        description: "International Space Station orbiting Earth as seen from space",
        date: "2023-03-10",
        image: "/space-backgrounds/iss-in-orbit.png",
        photographer: "NASA Johnson Space Center", 
        location: "Low Earth Orbit",
        tags: ["iss", "orbit", "earth", "space"],
        source: "NASA JSC Flickr"
      },
      {
        id: "nasa_jsc_004",
        title: "Space Station Research",
        description: "Scientific experiments being conducted aboard the ISS",
        date: "2023-04-05",
        image: "/space-backgrounds/nebula-space.png",
        photographer: "NASA Johnson Space Center",
        location: "International Space Station",
        tags: ["research", "experiment", "science", "iss"],
        source: "NASA JSC Flickr"
      }
    ]

    // Filter images based on query
    const filteredImages = curatedImages.filter(img => 
      img.title.toLowerCase().includes(query.toLowerCase()) ||
      img.description.toLowerCase().includes(query.toLowerCase()) ||
      img.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )

    return NextResponse.json({
      success: true,
      images: filteredImages,
      page: parseInt(page),
      total_pages: 1,
      total_results: filteredImages.length,
      source: "NASA Johnson Space Center"
    })

  } catch (error) {
    console.error("NASA Flickr API Error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch NASA Flickr images" 
    }, { status: 500 })
  }
}
