'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { navigationItems } from "@/lib/data"
import { Search, User, Menu } from "lucide-react"
import { NavigationItem } from "@/components/navigation/navigation-item"
import { DropdownMenu } from "./navigation/dropdown-menu"
import { useState, useRef, useEffect } from "react"


export function HeroSection() {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const itemRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
  return (
    <section className="relative h-[600px] md:h-screen overflow-hidden">
      {/* Top banner */}
      <div className="absolute left-0 right-0 z-20">
        <div className=" w-full px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-56 h-16 flex items-center justify-center relative">
                <Image src="/assest/logo.svg" fill className="w-full h-full object-cover" alt="logo"/>
              </div>
            </Link>

            {/* Navigation */}  
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <NavigationItem key={item.name} name={item.name} href={item.href} />
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white hover:text-emerald-300 hover:bg-white/10">
                <Search className="h-4 w-4" />
              </Button>
              
                <div ref={itemRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <Link href="/login" className="text-white hover:text-emerald-300 transition-colors text-xs font-medium uppercase tracking-wide">
                  <Button variant="ghost" size="icon" className="text-white hover:text-emerald-300 hover:bg-white/10">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                {/* <DropdownMenu menuKey={name} isOpen={isOpen} onClose={handleClose} /> */}
                </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:text-emerald-300 hover:bg-white/10"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0">
        <Image
          src="/couple-wearing-stylish-glasses-fashion-portrait.jpg"
          alt="Couple wearing stylish glasses"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-end justify-center">
        <div className="text-center text-white mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-bold">Z</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">ECO-ACETATE</h1>
          </div>
          <p className="text-lg md:text-xl mb-8 font-light">From Nature, With Love</p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full">
            Discover Now
          </Button>
        </div>
      </div>
    </section>
  )
}