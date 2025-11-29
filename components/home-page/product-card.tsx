import Image from "next/image"
import { Heart, Star } from "lucide-react"

interface ProductCardProps {
  id: number
  name: string
  price: number
  rating: number
  image: string
}

export function ProductCard({ name, price, rating, image }: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="relative aspect-4/3 bg-muted rounded-lg overflow-hidden mb-3">
        {/* Product Image */}
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium">
          <Star className="w-3 h-3 fill-white" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base md:text-lg font-medium text-foreground mb-1">{name}</h3>
          <p className="text-base md:text-lg font-semibold text-foreground">₹ {price}/-</p>
        </div>

        {/* Wishlist Heart */}
        <button className="p-1 hover:scale-110 transition-transform" aria-label="Add to wishlist">
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-foreground hover:fill-red-500 hover:text-red-500 transition-colors" />
        </button>
      </div>
    </div>
  )
}
