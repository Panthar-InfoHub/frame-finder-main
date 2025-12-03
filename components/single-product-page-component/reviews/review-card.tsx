"use client"
import { Loader2, Star, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"


export function ReviewCard({ review, onDelete, loggedId , isPending }: any) {
  const userInitial = review.user?.email?.charAt(0).toUpperCase() || "U"
  const userName = review.user?.email?.split("@")[0] || "Anonymous User"
  const timeAgo = formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })

  const checkIfSameUser = (userId: string) => {
    if (!loggedId) return false;
    return userId === loggedId;
  }


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
        {checkIfSameUser(review.user._id) && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            disabled={isPending}
            onClick={() => onDelete(review._id)}
          >
            {isPending ? <Loader2 className="animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${index < review.rating ? "fill-orange-500 text-orange-500" : "fill-gray-200 text-gray-200"
              }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-sm leading-relaxed text-foreground">{review.comment}</p>

      {/* Review Images */}
      {review._images && review._images.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {review?._images.map((image, i) => (
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
