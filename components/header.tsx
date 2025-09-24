import Link from "next/link"
import { navigationItems } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Search, ShoppingCart, User, Heart } from "lucide-react"

export function Header() {
  return (
    <div className="sticky top-0 z-50 h-11  left-0 right-0 bg-emerald-500 text-white text-center py-2 text-sm ">
        New edit: Eco-Acetate - Shop For 2 Pay For 1 🛍️
      </div>  
  )
}