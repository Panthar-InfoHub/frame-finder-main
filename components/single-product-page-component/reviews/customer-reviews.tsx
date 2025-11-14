"use client"

import { useState, useMemo, useTransition } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RatingDistribution } from "./rating-distribution"
import { ReviewCard } from "./review-card"
import { WriteReviewForm } from "./write-review-form"
import { toast } from "sonner"
import { deleteReview } from "@/actions/products"
import { useRouter } from "next/navigation"

interface CustomerReviewsProps {
  allReviews: any
  averageRating: number
  totalReviews: number
  distribution: Array<{
    stars: number
    count: number
    percentage: number
  }>
  reviewData: {
    vendorId: string;
    productId: string;
    onModel: string;
  }
  isActionDisabled?: boolean
  session: any
  variantId?: string

}

export function CustomerReviews({ allReviews, averageRating, totalReviews, distribution, reviewData, isActionDisabled, session, variantId }: CustomerReviewsProps) {
  const [sortBy, setSortBy] = useState("recent")
  const [isPending, startTransition] = useTransition()
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [visibleReviews, setVisibleReviews] = useState(3)
  const router = useRouter();

  const displayedReviews = useMemo(() => {
    return allReviews.slice(0, visibleReviews)
  }, [allReviews, visibleReviews])

  const hasMoreReviews = allReviews.length > visibleReviews

  const showMoreReviews = () => {
    setVisibleReviews((prev) => Math.min(prev + 3, allReviews.length))
  }

  const handleDeleteReview = async (reviewId: string) => {
    try {
      if (!reviewId) return toast.error("not a valid review id")

      const data = {
        vendorId: reviewData.vendorId,
        reviewId: reviewId,
        variantId
      }

      startTransition(async () => {
        const resposne = await deleteReview(data);

        if (resposne.success) {
          toast.success("Your review for the product has been deleted successfully");
          router.refresh();
        } else {
          toast.warning("Review could not be deleted. Please try again.");
        }
      });
    } catch (error) {
      toast.error("Failed to delete the review. Please try again.");
    }
  }


  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold">Average rating:</span>
            <span className="text-lg font-semibold">{averageRating}</span>
            <Star className="h-5 w-5 fill-orange-500 text-orange-500" />
          </div>
          <span className="text-muted-foreground">({totalReviews.toLocaleString()})</span>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <RatingDistribution distribution={distribution} totalReviews={totalReviews} />
        </div>

        {/* Write Review Section */}
        <div className="lg:col-span-2">
          {!showWriteReview ? (
            <div className="flex justify-center lg:justify-start">
              <Button
                onClick={() => setShowWriteReview(true)}
                variant="outline"
                disabled={!isActionDisabled}
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-500"
              >
                Write a Review
              </Button>
            </div>
          ) : (
            <WriteReviewForm
              reviewData={reviewData}
              setShowWriteReview={setShowWriteReview}
              variantId={variantId}
            // afterSubmit={(review) => {
            //   console.log('review is here', review)
            //   setAllReviews([review, ...allReviews,])
            //   console.log('New reviews array', [review, ...allReviews])}}
            />
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {/* Reviews Header with Sort */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Reviews</h3>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 border-emerald-600 text-emerald-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Review Cards - user_reviews displayed first */}
        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <ReviewCard key={review._id}  review={review} onDelete={handleDeleteReview} loggedId={session?.user?.id} isPending={isPending} />
          ))}
        </div>

        {/* Show More button */}
        {hasMoreReviews && (
          <div className="flex justify-center pt-4">
            <Button
              onClick={showMoreReviews}
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 bg-transparent"
            >
              Show More
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
