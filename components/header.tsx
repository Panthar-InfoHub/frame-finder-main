import Link from "next/link"
import { navigationItems } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart, User, Heart } from "lucide-react"

export function Header() {
  return (
    <header className="w-full">
      {/* Top banner */}
      <div className="bg-emerald-500 text-white text-center py-2 text-sm">
        New edit: Eco-Acetate - Shop For 2 Pay For 1 🛍️
      </div>

      {/* Main header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-emerald-500">
              FRAME FINDER
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-emerald-500 transition-colors text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}