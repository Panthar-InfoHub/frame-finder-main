import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { navigationItems } from "@/lib/data"
import { Search, User, Menu } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Top banner */}
      <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-white text-center py-2 text-sm z-20">
        New edit: Eco-Acetate - Shop For 2 Pay For 1 🛍️
      </div>

      <div className="absolute top-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-32 h-8 bg-emerald-500 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">FRAME FINDER</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-emerald-300 transition-colors text-xs font-medium uppercase tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white hover:text-emerald-300 hover:bg-white/10">
                <Search className="h-4 w-4" />
              </Button>
              <Link href="/login">
                <Button variant="ghost" size="icon" className="text-white hover:text-emerald-300 hover:bg-white/10">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
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

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center text-white">
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