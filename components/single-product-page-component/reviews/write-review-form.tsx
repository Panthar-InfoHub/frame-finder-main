"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { postProductReview } from "@/actions/products"

interface reviewDataProps {
  reviewData: {
    vendorId: string;
    productId: string;
    onModel: string;
  }
  setShowWriteReview: (show: boolean) => void
}

export function WriteReviewForm({ reviewData, setShowWriteReview }: reviewDataProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    // The command belo this will stop the page from refreshing
    e.preventDefault();
    const data = {
      ...reviewData,
      rating: rating,
      comment: comment
    }
    console.log(comment)
    console.log(rating)
    postProductReview(data);
    console.log(comment)
    console.log(rating)
    // the next command will clear the rating and text written
    setComment("");
    setRating(0);
    setShowWriteReview(false);
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Selection */}
        <div className="space-y-2">
          <Label>Your Rating</Label>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setRating(index + 1)}
                onMouseEnter={() => setHoveredRating(index + 1)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${index < (hoveredRating || rating)
                    ? "fill-orange-500 text-orange-500"
                    : "fill-gray-200 text-gray-200"
                    }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <Label htmlFor="review-comment">Your Review</Label>
          <Textarea
            id="review-comment"
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            className="resize-none"
          />
        </div>

        <div className="flex gap-2 items-center justify-between">
          {/* Submit Button */}
          <Button type="submit" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
            Submit Review
          </Button>

          <Button type="button" variant="outline" onClick={() => setShowWriteReview(false)} className="cursor-pointer">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
