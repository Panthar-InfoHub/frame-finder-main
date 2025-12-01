"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Menu, Phone, Search, ShoppingCart } from "lucide-react";
import { navigationLinks, promoData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EyeglassesMegaMenu } from "./dropdown-components/eyeglasses-mega-menu";
import { SunglassesMegaMenu } from "./dropdown-components/sunglasses-mega-menu";
import { ContactLensesMegaMenu } from "./dropdown-components/contact-lenses-mega-menu";
import { AccessoriesMegaMenu } from "./dropdown-components/accessories-mega-menu";
import { UserAccountMenu } from "./dropdown-components/user-account-menu";
import Image from "next/image";

interface HeaderProps {
  alwaysBlurred?: boolean;
}

export function Header({ alwaysBlurred = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger sticky nav after scrolling 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldBlur = alwaysBlurred || isScrolled;

  return (
    <header className="sticky top-0 z-100 ">
      {/* Top Banner - Removed sticky positioning so only nav sticks */}
      <div className=" bg-emerald-500 text-white py-2 px-4 max-w-full overflow-hidden">
        <div className="container mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/contact" className="flex items-center gap-2">
              <span className="font-semibold text-xs md:text-sm">
                Contact Us
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs font-medium">9026819208</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs md:text-sm text-center">
            <span>{promoData.text}</span>
            <span>{promoData.icon}</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/search">
              <Button
                variant="ghost"
                size="icon"
                className={`${
                  shouldBlur
                    ? "text-black hover:bg-black/10"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Search className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
            </Link>
            <UserAccountMenu shouldBlur={shouldBlur} />
            <Button
              variant="ghost"
              size="icon"
              className={`${
                shouldBlur ? "text-black" : "text-white hover:bg-[#00AA78]"
              }`}
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
              </Link>
            </Button>
            {/* <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${
                shouldBlur
                  ? "text-black hover:bg-black/10"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5 md:h-6 md:w-6" />
            </Button> */}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${
                shouldBlur
                  ? "text-black hover:bg-black/10"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Heart className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation - Made sticky with blur effect when scrolled */}
      <nav className={`sticky top-0 z-50 left-0 right-0 bg-emerald-500`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="shrink-0">
              <Image
                src="/frame-finder-logo.png"
                alt="FrameFinder - An Eyewear Hub"
                width={200}
                height={60}
                className="h-10 md:h-12 lg:h-14 w-auto"
                priority
              />
            </Link>
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
              <NavigationMenu viewport={false}>
                <NavigationMenuList className="gap-2">
                  {navigationLinks.map((link) => {
                    const textColorClass = shouldBlur
                      ? "text-black hover:text-black/70"
                      : "text-white hover:text-white/80";
                    const bgClass = shouldBlur
                      ? "bg-transparent hover:bg-emerald-500 data-[state=open]:bg-emerald-500"
                      : "bg-transparent hover:bg-transparent data-[state=open]:bg-transparent";

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
                      );
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
                      );
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
                      );
                    }

                    return (
                      <NavigationMenuItem key={link.href}>
                        <Link href={link.href}>
                          <NavigationMenuLink
                            asChild
                            className={`text-[9px] md:text-[10px] lg:text-xs font-medium ${textColorClass} transition-colors uppercase tracking-wide hover:bg-accent hover:text-accent-foreground`}
                          >
                            <span>{link.label}</span>
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-top gap-3 md:gap-4 lg:ml-auto w-full lg:w-auto justify-end">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`lg:hidden ${
                      shouldBlur
                        ? "text-black hover:bg-black/10"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <Menu className="h-5 w-5 md:h-6 md:w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="bg-emerald-500 border-emerald-600 w-[280px] sm:w-[350px]"
                >
                  <SheetHeader>
                    <SheetTitle className="text-white text-lg font-bold">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-1 mt-8">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-sm font-medium text-white hover:bg-white/10 transition-colors uppercase tracking-wide py-3 px-4 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
