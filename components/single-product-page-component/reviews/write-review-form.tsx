"use client"

import type React from "react"

import { useState } from "react"
import { Star, Upload, X } from "lucide-react"
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
  afterSubmit: (review : any) => void 
  setShowWriteReview: (show: boolean) => void
}

export function WriteReviewForm({ reviewData, setShowWriteReview , afterSubmit }: reviewDataProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {

    console.log({images : uploadedImages})
    // The command belo this will stop the page from refreshing
    e.preventDefault();
    const data = {
      ...reviewData,
      rating: rating,
      comment: comment
      
    }
    
    const postedReview = await postProductReview(data); // this command will send the post requesty to the user 
    // console.log('Running after submit review')
    afterSubmit(postedReview)// this fuctntion will store the command locally and will display it as well
    // the next command will clear the rating and text written
    setComment("");
    setRating(0);
    setShowWriteReview(false);

  }

  // The next line of code will check weather the file that ha been uploaded is actually a image 
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: string[] = []
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          newImages.push(reader.result as string)
          if (newImages.length === files.length) {
            setUploadedImages((prev) => [...prev, ...newImages])
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
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

        <div className="space-y-2">
          <Label>Upload Product Images (Optional)</Label>
          <div className="space-y-3">
            {/* Upload Button */}
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="review-images"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="review-images">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer bg-transparent"
                  onClick={() => document.getElementById("review-images")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Images
                </Button>
              </label>
              <span className="text-sm text-muted-foreground">Max 5 images</span>
            </div>

            {/* Image Preview Grid */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
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
