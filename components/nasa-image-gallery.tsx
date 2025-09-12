"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Camera, Calendar, MapPin, RefreshCw } from "lucide-react"

interface NASAImage {
  id: string
  title: string
  description: string
  date: string
  image: string
  photographer: string
  location: string
}

interface NASAImageGalleryProps {
  query?: string
  title?: string
  description?: string
}

export function NASAImageGallery({
  query = "ISS Earth",
  title = "NASA Image Gallery",
  description = "Real images from NASA's archives",
}: NASAImageGalleryProps) {
  const [images, setImages] = useState<NASAImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<NASAImage | null>(null)

  const fetchImages = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/nasa-images?q=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.success) {
        setImages(data.images)
      }
    } catch (error) {
      console.error("Failed to fetch NASA images:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [query])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <Card className="bg-card/90 backdrop-blur-sm border-border/50">
        <CardContent className="p-6 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading NASA images...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card/90 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-primary" />
                <span>{title}</span>
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <Button onClick={fetchImages} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {images.map((image) => (
                <div key={image.id} className="cursor-pointer group" onClick={() => setSelectedImage(image)}>
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={image.image || "/placeholder.svg"}
                      alt={image.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=200&width=300&text=NASA+Image"
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <div className="text-white">
                        <h4 className="font-semibold text-sm line-clamp-2">{image.title}</h4>
                        <div className="flex items-center space-x-2 mt-1 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(image.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No images found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Detail Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-lg">{selectedImage.title}</CardTitle>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedImage.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedImage.location}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={selectedImage.image || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=400&width=600&text=NASA+Image"
                }}
              />
              <p className="text-sm leading-relaxed">{selectedImage.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  <Camera className="w-3 h-3 mr-1" />
                  {selectedImage.photographer}
                </Badge>
                <Button onClick={() => setSelectedImage(null)} variant="outline" size="sm">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
