"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Monitor, Zap, Eye } from "lucide-react"

interface VRModeProps {
  onVRModeChange?: (enabled: boolean) => void
}

export function VRMode({ onVRModeChange }: VRModeProps) {
  const [isVRSupported, setIsVRSupported] = useState(false)
  const [isVREnabled, setIsVREnabled] = useState(false)
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile' | 'unknown'>('unknown')

  useEffect(() => {
    // Check if device supports VR
    const checkVRSupport = () => {
      if (typeof navigator !== 'undefined') {
        // Check for WebXR support
        const hasWebXR = 'xr' in navigator
        const hasVRDisplay = 'getVRDisplays' in navigator
        
        // Check device type
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        const isDesktop = !isMobile && window.innerWidth > 768
        
        setDeviceType(isMobile ? 'mobile' : isDesktop ? 'desktop' : 'unknown')
        setIsVRSupported(hasWebXR || hasVRDisplay)
      }
    }

    checkVRSupport()
  }, [])

  const handleVRToggle = () => {
    const newVREnabled = !isVREnabled
    setIsVREnabled(newVREnabled)
    onVRModeChange?.(newVREnabled)
    
    if (newVREnabled) {
      // Add VR-specific styles and behaviors
      document.body.classList.add('vr-mode')
      // Request fullscreen for better VR experience
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(console.error)
      }
    } else {
      document.body.classList.remove('vr-mode')
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(console.error)
      }
    }
  }

  const getVRInstructions = () => {
    switch (deviceType) {
      case 'mobile':
        return [
          "• Use your phone's gyroscope for head tracking",
          "• Move your device to look around",
          "• Tap and hold to interact with objects",
          "• Use landscape mode for best experience"
        ]
      case 'desktop':
        return [
          "• Use mouse to look around",
          "• WASD keys for movement",
          "• Click and drag to rotate view",
          "• Press F for fullscreen mode"
        ]
      default:
        return [
          "• Use available input methods",
          "• Look around to explore",
          "• Interact with highlighted objects"
        ]
    }
  }

  if (!isVRSupported) {
    return (
      <Card className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-base flex items-center space-x-2">
            <Eye className="w-5 h-5 text-purple-300" />
            <span>VR Mode</span>
          </CardTitle>
          <CardDescription className="text-purple-100">
            Enhanced immersive experience
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center space-y-3">
            <div className="p-4 bg-yellow-600/20 rounded-lg border border-yellow-400/30">
              <p className="text-yellow-200 text-sm font-medium">
                VR not supported on this device
              </p>
              <p className="text-yellow-300 text-xs mt-1">
                Try using a VR-compatible browser or device
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-white">Alternative Experience:</h4>
              <ul className="text-xs space-y-1 text-purple-200">
                <li>• Use fullscreen mode (F key)</li>
                <li>• Enable device rotation</li>
                <li>• Use mouse for 360° view</li>
                <li>• Maximize browser window</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md border border-white/20 shadow-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-base flex items-center space-x-2">
          <Eye className="w-5 h-5 text-purple-300" />
          <span>VR Mode</span>
          <Badge 
            variant={isVREnabled ? "default" : "outline"} 
            className={isVREnabled ? "bg-green-500 text-white" : "border-purple-400/50 text-purple-200"}
          >
            {isVREnabled ? "ON" : "OFF"}
          </Badge>
        </CardTitle>
        <CardDescription className="text-purple-100">
          Enhanced immersive experience
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div className="text-center">
          <Button
            onClick={handleVRToggle}
            className={`w-full transition-all duration-300 ${
              isVREnabled
                ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            {isVREnabled ? "Exit VR Mode" : "Enter VR Mode"}
          </Button>
        </div>

        {isVREnabled && (
          <div className="space-y-3">
            <div className="p-3 bg-green-600/20 rounded-lg border border-green-400/30">
              <p className="text-green-200 text-sm font-medium text-center">
                🥽 VR Mode Active
              </p>
              <p className="text-green-300 text-xs text-center mt-1">
                Enjoy the immersive experience!
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-white flex items-center space-x-2">
                {deviceType === 'mobile' ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                <span>VR Controls</span>
              </h4>
              <ul className="text-xs space-y-1 text-purple-200">
                {getVRInstructions().map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!isVREnabled && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-white">VR Features:</h4>
            <ul className="text-xs space-y-1 text-purple-200">
              <li>• 360° immersive view</li>
              <li>• Enhanced 3D graphics</li>
              <li>• Motion-based controls</li>
              <li>• Fullscreen experience</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default VRMode
