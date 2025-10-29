import type React from "react"
import type { Metadata } from "next"
import { Lexend_Deca } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const lexendDeca = Lexend_Deca({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FrameFinder - Eco-Acetate Eyewear",
  description: "Premium eco-acetate eyewear from nature, with love",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lexendDeca.className} font-sans antialiased overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
