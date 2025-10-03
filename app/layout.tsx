import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AccessibilityPanel } from "@/components/accessibility-panel"
import "./globals.css"

export const metadata: Metadata = {
  title: "Cupola Dash",
  description:
    "Celebrate 25 years of the International Space Station through interactive learning and space exploration",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" }
    ],
    apple: [
      { url: "/favicon.ico", sizes: "180x180", type: "image/x-icon" }
    ]
  },
  manifest: "/site.webmanifest"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
          <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
            <Suspense fallback={null}>{children}</Suspense>
            <AccessibilityPanel />
            <Analytics />
          </body>
    </html>
  )
}
