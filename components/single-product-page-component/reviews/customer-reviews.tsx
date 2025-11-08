"use client"

import { useState, useMemo } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RatingDistribution } from "./rating-distribution"
import { ReviewCard } from "./review-card"
import { WriteReviewForm } from "./write-review-form"

interface CustomerReviewsProps {
  reviews: {
    success: boolean
    message: string
    data: {
      reviews: Array<{
        _id: string
        user: {
          _id: string
          img: {
            url: string
          }
          email: string
        }
        rating: number
        comment: string
        images: Array<{
          url: string
          _id: string
        }>
        createdAt: string
      }>
      user_reviews: Array<{
        _id: string
        user: null
        product: {
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
      }>
    }
  }
  averageRating: number
  totalReviews: number
  distribution: Array<{
    stars: number
    count: number
    percentage: number
  }>
  reviewData : {
  vendorId: string;
  productId: string;
  onModel: string;
}
}

export function CustomerReviews({ reviews, averageRating, totalReviews, distribution , reviewData  }: CustomerReviewsProps) {
  const [sortBy, setSortBy] = useState("recent")
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [visibleReviews, setVisibleReviews] = useState(3)

  const allReviews = useMemo(() => {
    return [...reviews.data.user_reviews, ...reviews.data.reviews]
  }, [reviews.data.user_reviews, reviews.data.reviews])

  const displayedReviews = useMemo(() => {
    return allReviews.slice(0, visibleReviews)
  }, [allReviews, visibleReviews])

  const hasMoreReviews = allReviews.length > visibleReviews

  const showMoreReviews = () => {
    setVisibleReviews((prev) => Math.min(prev + 3, allReviews.length))
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
          <RatingDistribution distribution={distribution} />
        </div>

        {/* Write Review Section */}
        <div className="lg:col-span-2">
          {!showWriteReview ? (
            <div className="flex justify-center lg:justify-start">
              <Button
                onClick={() => setShowWriteReview(true)}
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              >
                Write a Review
              </Button>
            </div>
          ) : (
            <WriteReviewForm 
                reviewData = {reviewData}
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
              <SelectItem value="helpful">Most Helpful</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Review Cards - user_reviews displayed first */}
        <div className="space-y-4">
          {displayedReviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
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
