import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface ReviewCardProps {
  review: {
    _id: string
    user: {
      _id: string
      img: {
        url: string
      }
      email: string
    } | null
    product?: {
      _id: string
      productCode: string
      brand_name: string
    }
    rating: number
    comment: string
    images: Array<{
      url: string
      _id: string
    }>
    createdAt: string
    _images?: string[]
  }
}

export function ReviewCard({ review }: ReviewCardProps) {
  const userInitial = review.user?.email?.charAt(0).toUpperCase() || "U"
  const userName = review.user?.email?.split("@")[0] || "Anonymous User"
  const timeAgo = formatDistanceToNow(new Date(review.createdAt ?? new Date()), { addSuffix: true })
  
  // alert(JSON.stringify(review))
  return (
    <Card className="p-4 space-y-3">
      {/* User Info */}
      <div className="flex items-start gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={review.user?.img?.url || "/placeholder.svg"} alt={userName} />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-medium text-sm capitalize">{userName}</p>
          <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < review.rating ? "fill-orange-500 text-orange-500" : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-sm leading-relaxed text-foreground">{review.comment}</p>

      {/* Review Images */}
      {review._images && review._images.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {review?._images.map((image,i) => (
            <img
              key={`review-image-${i}`}
              src={image || "/placeholder.svg"}
              alt="Review"
              className="h-20 w-20 object-cover rounded border border-border"
            />
          ))}
        </div>
      )}
    </Card>
  )
}
