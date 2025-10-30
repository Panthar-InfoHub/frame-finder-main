import Image from "next/image"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    rating: number
    colors: string[]
    image: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="aspect-square relative bg-gray-50 rounded-t-lg overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {product.rating}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">₹ {product.price}/-</span>
          <div className="flex space-x-1">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}