import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || "all"

  try {
    // NASA Station Research and Technology API
    // This would typically connect to NASA's research database
    
    const researchData = {
      experiments: [
        {
          id: "exp_001",
          name: "Earth Observation from Cupola",
          description: "Astronauts use the Cupola observation module to study Earth's weather patterns, natural disasters, and environmental changes",
          category: "Earth Science",
          status: "Active",
          duration: "Ongoing",
          crew_members: ["Commander", "Flight Engineer"],
          objectives: [
            "Monitor weather systems",
            "Track natural disasters", 
            "Study environmental changes",
            "Document Earth's beauty"
          ],
          equipment: ["Cupola observation module", "High-resolution cameras", "Spectral imaging equipment"],
          results: "Over 1 million Earth observation images captured"
        },
        {
          id: "exp_002", 
          name: "Neutral Buoyancy Lab Training",
          description: "Astronauts train for spacewalks in the NBL, simulating zero-gravity conditions underwater",
          category: "Training",
          status: "Active",
          duration: "6-8 hours per session",
          crew_members: ["EVA Specialists", "Training Instructors"],
          objectives: [
            "Practice spacewalk procedures",
            "Test new equipment",
            "Train emergency procedures",
            "Develop muscle memory"
          ],
          equipment: ["NBL pool", "Space suits", "Training tools", "Underwater cameras"],
          results: "Over 1000 hours of training completed"
        },
        {
          id: "exp_003",
          name: "Space Station Assembly",
          description: "Construction and maintenance of the International Space Station modules and systems",
          category: "Engineering",
          status: "Active", 
          duration: "Ongoing",
          crew_members: ["Mission Specialists", "Engineers"],
          objectives: [
            "Assemble new modules",
            "Maintain existing systems",
            "Install new equipment",
            "Conduct repairs"
          ],
          equipment: ["Robotic arms", "Space tools", "Safety tethers", "Communication systems"],
          results: "Successfully assembled 15 major modules"
        }
      ],
      technology_demonstrations: [
        {
          id: "tech_001",
          name: "Advanced Life Support Systems",
          description: "Testing new technologies for recycling air and water in space",
          status: "In Development",
          potential_impact: "Enables longer space missions"
        },
        {
          id: "tech_002", 
          name: "3D Printing in Space",
          description: "Manufacturing tools and parts using 3D printing technology in microgravity",
          status: "Operational",
          potential_impact: "Reduces need for resupply missions"
        }
      ],
      educational_outreach: [
        {
          id: "edu_001",
          name: "Cupola Earth Observation Program",
          description: "Students can request specific Earth observations from the Cupola",
          participants: "K-12 students worldwide",
          impact: "Over 10,000 student requests fulfilled"
        }
      ]
    }

    // Filter by category if specified
    let filteredData = researchData
    if (category !== "all") {
      filteredData = {
        ...researchData,
        experiments: researchData.experiments.filter(exp => 
          exp.category.toLowerCase() === category.toLowerCase()
        )
      }
    }

    return NextResponse.json({
      success: true,
      data: filteredData,
      source: "NASA Station Research and Technology",
      last_updated: new Date().toISOString()
    })

  } catch (error) {
    console.error("NASA Research API Error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch research data" 
    }, { status: 500 })
  }
}
