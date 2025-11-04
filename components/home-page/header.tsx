"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart } from "lucide-react"
import { navigationLinks, promoData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { EyeglassesMegaMenu } from "./dropdown-components/eyeglasses-mega-menu"
import { SunglassesMegaMenu } from "./dropdown-components/sunglasses-mega-menu"
import { ContactLensesMegaMenu } from "./dropdown-components/contact-lenses-mega-menu"
import { AccessoriesMegaMenu } from "./dropdown-components/accessories-mega-menu"
import { UserAccountMenu } from "./dropdown-components/user-account-menu"

interface HeaderProps {
  alwaysBlurred?: boolean
}

export function Header({ alwaysBlurred = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Trigger sticky nav after scrolling 50px
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const shouldBlur = alwaysBlurred || isScrolled

  return (
    <>
      {/* Top Banner - Removed sticky positioning so only nav sticks */}
      <div className="bg-[#00AA78] text-white py-2 px-4 max-w-full overflow-hidden z-40 relative">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm md:text-base">FrameFinder</span>
          </div>
          <div className="flex items-center gap-2 text-xs md:text-sm text-center flex-1 justify-center">
            <span>{promoData.text}</span>
            <span>{promoData.icon}</span>
          </div>
              {/* <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white/40" />
              </div> */}
        </div>
      </div>

      {/* Navigation - Made sticky with blur effect when scrolled */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${shouldBlur ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
              <NavigationMenu viewport={false}>
                <NavigationMenuList className="gap-2">
                  {navigationLinks.map((link) => {
                    const textColorClass = shouldBlur
                      ? "text-black hover:text-black/70"
                      : "text-white hover:text-white/80"
                    const bgClass = shouldBlur
                      ? "bg-transparent hover:bg-black/5 data-[state=open]:bg-black/5"
                      : "bg-transparent hover:bg-transparent data-[state=open]:bg-transparent"

                    if (link.label === "EYEGLASSES") {
                      return (
                        <NavigationMenuItem key={link.href}>
                          <Link href="/frames">
                            <NavigationMenuTrigger 
                            className={`text-[9px] md:text-[10px] lg:text-xs font-medium transition-colors uppercase tracking-wide ${textColorClass} ${bgClass}`}
                          >
                            {link.label}
                          </NavigationMenuTrigger>
                          </Link>
                          <NavigationMenuContent>
                            <EyeglassesMegaMenu />
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      )
                    }

                    if (link.label === "SUNGLASSES") {
                      return (
                        <NavigationMenuItem key={link.href}>
                          <Link href="/sunglasses">
                            <NavigationMenuTrigger
                            className={`text-[9px] md:text-[10px] lg:text-xs font-medium transition-colors uppercase tracking-wide ${textColorClass} ${bgClass}`}
                          >
                            {link.label}
                          </NavigationMenuTrigger>
                          </Link>
                          <NavigationMenuContent>
                            <SunglassesMegaMenu />
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      )
                    }

                    if (link.label === "CONTACT LENSES") {
                      return (
                        <NavigationMenuItem key={link.href}>
                          <Link href="/contactLens">
                            <NavigationMenuTrigger
                            className={`text-[9px] md:text-[10px] lg:text-xs font-medium transition-colors uppercase tracking-wide ${textColorClass} ${bgClass}`}
                          >
                            {link.label}
                          </NavigationMenuTrigger>
                          </Link>
                          <NavigationMenuContent>
                            <ContactLensesMegaMenu />
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      )
                    }

                    if (link.label === "ACCESSORIES") {
                      return (
                        <NavigationMenuItem key={link.href}>
                        <Link href="/accessories">
                         <NavigationMenuTrigger
                            className={`text-[9px] md:text-[10px] lg:text-xs font-medium transition-colors uppercase tracking-wide ${textColorClass} ${bgClass}`}
                          >
                            {link.label}
                          </NavigationMenuTrigger>
                        </Link>
                          <NavigationMenuContent>
                            <AccessoriesMegaMenu />
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      )
                    }

                    return (
                      <NavigationMenuItem key={link.href}>
                        <Link href={link.href}>
                          <NavigationMenuLink
                            asChild
                            className={`text-[9px] md:text-[10px] lg:text-xs font-medium transition-colors uppercase tracking-wide whitespace-nowrap ${textColorClass}`}
                          >
                            <span>{link.label}</span>
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    )
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center gap-3 md:gap-4 lg:ml-auto w-full lg:w-auto justify-end">
              <Button
                variant="ghost"
                size="icon"
                className={`${shouldBlur ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"}`}
              >
                <Search className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
              <UserAccountMenu shouldBlur={shouldBlur} />
              <Button
                variant="ghost"
                size="icon"
                className={`${shouldBlur ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"}`}
              >
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden ${shouldBlur ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden py-4 bg-black/90 backdrop-blur-sm">
              <div className="flex flex-col gap-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-white hover:text-white/80 transition-colors uppercase tracking-wide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
