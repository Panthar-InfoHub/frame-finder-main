"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart } from "lucide-react"
import { navigationLinks } from "@/lib/data"
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


export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="absolute top-10 left-0 right-0 z-40 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link) => {
                  if (link.label === "EYEGLASSES") {
                    return (
                      <NavigationMenuItem key={link.href}>
                        <NavigationMenuTrigger className="text-[9px] md:text-[10px] lg:text-xs font-medium text-white hover:text-white/80 transition-colors uppercase tracking-wide bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <EyeglassesMegaMenu />
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  }

                  if (link.label === "SUNGLASSES") {
                    return (
                      <NavigationMenuItem key={link.href}>
                        <NavigationMenuTrigger className="text-[9px] md:text-[10px] lg:text-xs font-medium text-white hover:text-white/80 transition-colors uppercase tracking-wide bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <SunglassesMegaMenu />
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  }

                  if (link.label === "CONTACT LENSES") {
                    return (
                      <NavigationMenuItem key={link.href}>
                        <NavigationMenuTrigger className="text-[9px] md:text-[10px] lg:text-xs font-medium text-white hover:text-white/80 transition-colors uppercase tracking-wide bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ContactLensesMegaMenu />
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  }

                  if (link.label === "ACCESSORIES") {
                    return (
                      <NavigationMenuItem key={link.href}>
                        <NavigationMenuTrigger className="text-[9px] md:text-[10px] lg:text-xs font-medium text-white hover:text-white/80 transition-colors uppercase tracking-wide bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <AccessoriesMegaMenu />
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  }

                  return (
                    <NavigationMenuItem key={link.href}>
                      <Link href={link.href}>
                        {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */
                        }
                        <NavigationMenuLink className="text-[9px] md:text-[10px] lg:text-xs font-medium text-white hover:text-white/80 transition-colors uppercase tracking-wide whitespace-nowrap">
                          {link.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3 md:gap-4 lg:ml-auto w-full lg:w-auto justify-end">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Search className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
            <Link href="/login"><UserAccountMenu /></Link>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 lg:hidden"
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
  );
}
