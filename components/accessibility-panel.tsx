"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Eye, Volume2, Mouse, Keyboard, Palette, Type } from "lucide-react"

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large'
  contrast: 'normal' | 'high' | 'inverted'
  motion: 'normal' | 'reduced'
  sound: 'on' | 'off'
  keyboard: 'on' | 'off'
  screenReader: 'on' | 'off'
}

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'medium',
    contrast: 'normal',
    motion: 'normal',
    sound: 'on',
    keyboard: 'on',
    screenReader: 'off'
  })

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibilitySettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
      applySettings(JSON.parse(savedSettings))
    }
  }, [])

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement
    
    // Apply font size
    const fontSizeMap = {
      'small': '14px',
      'medium': '16px',
      'large': '18px',
      'extra-large': '20px'
    }
    root.style.fontSize = fontSizeMap[newSettings.fontSize]
    
    // Apply contrast
    if (newSettings.contrast === 'high') {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    // Apply motion
    if (newSettings.motion === 'reduced') {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }
    
    // Save to localStorage
    localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings))
  }

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    applySettings(newSettings)
  }

  return (
    <>
      {/* Accessibility Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg"
        aria-label="Open accessibility settings"
      >
        <Settings className="w-4 h-4 mr-2" />
        Accessibility
      </Button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-md border border-white/20 shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Accessibility Settings</span>
              </CardTitle>
              <CardDescription className="text-purple-200">
                Customize your experience for better accessibility and learning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Font Size */}
              <div>
                <label className="text-sm font-medium text-white mb-3 block flex items-center space-x-2">
                  <Type className="w-4 h-4" />
                  <span>Text Size</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['small', 'medium', 'large', 'extra-large'] as const).map((size) => (
                    <Button
                      key={size}
                      onClick={() => updateSetting('fontSize', size)}
                      variant={settings.fontSize === size ? 'default' : 'outline'}
                      className={`text-xs ${settings.fontSize === size ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}`}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1).replace('-', ' ')}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Contrast */}
              <div>
                <label className="text-sm font-medium text-white mb-3 block flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Contrast</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['normal', 'high', 'inverted'] as const).map((contrast) => (
                    <Button
                      key={contrast}
                      onClick={() => updateSetting('contrast', contrast)}
                      variant={settings.contrast === contrast ? 'default' : 'outline'}
                      className={`text-xs ${settings.contrast === contrast ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}`}
                    >
                      {contrast.charAt(0).toUpperCase() + contrast.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Motion */}
              <div>
                <label className="text-sm font-medium text-white mb-3 block flex items-center space-x-2">
                  <Mouse className="w-4 h-4" />
                  <span>Motion</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['normal', 'reduced'] as const).map((motion) => (
                    <Button
                      key={motion}
                      onClick={() => updateSetting('motion', motion)}
                      variant={settings.motion === motion ? 'default' : 'outline'}
                      className={`text-xs ${settings.motion === motion ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}`}
                    >
                      {motion.charAt(0).toUpperCase() + motion.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sound */}
              <div>
                <label className="text-sm font-medium text-white mb-3 block flex items-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <span>Sound Effects</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['on', 'off'] as const).map((sound) => (
                    <Button
                      key={sound}
                      onClick={() => updateSetting('sound', sound)}
                      variant={settings.sound === sound ? 'default' : 'outline'}
                      className={`text-xs ${settings.sound === sound ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}`}
                    >
                      {sound.charAt(0).toUpperCase() + sound.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Keyboard Navigation */}
              <div>
                <label className="text-sm font-medium text-white mb-3 block flex items-center space-x-2">
                  <Keyboard className="w-4 h-4" />
                  <span>Keyboard Navigation</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['on', 'off'] as const).map((keyboard) => (
                    <Button
                      key={keyboard}
                      onClick={() => updateSetting('keyboard', keyboard)}
                      variant={settings.keyboard === keyboard ? 'default' : 'outline'}
                      className={`text-xs ${settings.keyboard === keyboard ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}`}
                    >
                      {keyboard.charAt(0).toUpperCase() + keyboard.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Screen Reader Support */}
              <div>
                <label className="text-sm font-medium text-white mb-3 block flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Screen Reader Support</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['on', 'off'] as const).map((screenReader) => (
                    <Button
                      key={screenReader}
                      onClick={() => updateSetting('screenReader', screenReader)}
                      variant={settings.screenReader === screenReader ? 'default' : 'outline'}
                      className={`text-xs ${settings.screenReader === screenReader ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}`}
                    >
                      {screenReader.charAt(0).toUpperCase() + screenReader.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Current Settings Summary */}
              <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                <h4 className="text-sm font-medium text-white mb-2">Current Settings</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-white">
                  <div><strong>Text:</strong> {settings.fontSize.replace('-', ' ')}</div>
                  <div><strong>Contrast:</strong> {settings.contrast}</div>
                  <div><strong>Motion:</strong> {settings.motion}</div>
                  <div><strong>Sound:</strong> {settings.sound}</div>
                  <div><strong>Keyboard:</strong> {settings.keyboard}</div>
                  <div><strong>Screen Reader:</strong> {settings.screenReader}</div>
                </div>
              </div>

              {/* Help Text */}
              <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-400/30">
                <h4 className="text-sm font-medium text-blue-200 mb-2">Accessibility Features</h4>
                <ul className="text-xs text-blue-100 space-y-1">
                  <li>• <strong>Large Text:</strong> Makes text easier to read</li>
                  <li>• <strong>High Contrast:</strong> Improves visibility for low vision</li>
                  <li>• <strong>Reduced Motion:</strong> Minimizes animations for motion sensitivity</li>
                  <li>• <strong>Keyboard Navigation:</strong> Use Tab, Enter, and arrow keys</li>
                  <li>• <strong>Screen Reader:</strong> Optimizes content for assistive technology</li>
                </ul>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                >
                  Apply & Close
                </Button>
                <Button
                  onClick={() => {
                    const defaultSettings: AccessibilitySettings = {
                      fontSize: 'medium',
                      contrast: 'normal',
                      motion: 'normal',
                      sound: 'on',
                      keyboard: 'on',
                      screenReader: 'off'
                    }
                    setSettings(defaultSettings)
                    applySettings(defaultSettings)
                  }}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
