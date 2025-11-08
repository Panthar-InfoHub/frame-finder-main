import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductRatingProps {
  rating: number
  totalReviews: number
  className?: string
}

export function ProductRating({ rating, totalReviews, className }: ProductRatingProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {[...Array(Math.floor(rating))].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={cn("transition-colors", i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
      </span>
    </div>
  )
}
