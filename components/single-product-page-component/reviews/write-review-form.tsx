"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import { Camera, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { postProductReview } from "@/actions/products"
import { ImageUploader } from "@/components/account/profile-img-dialog"
import { toast } from "sonner"
import { getSignedUploadUrl } from "@/actions/cloud-storage"

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
  const [imgs, setImgs] = useState<string[]>([])
  const [pendingImageFile, setPendingImageFile] = useState<File | File[] | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | string[] | null>(null)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    // The command below this will stop the page from refreshing
    e.preventDefault();

    setIsSubmitting(true);

    try {
      let uploadedImagePaths: string[] = [];

      // Image handling : Take image convert into array -> get signed URLs -> upload -> collect paths -> map path to review payload
      if (pendingImageFile) {
        toast.loading("Uploading images...");

        // Normalize to array for consistent processing
        const filesToUpload = Array.isArray(pendingImageFile) ? pendingImageFile : [pendingImageFile];

        // Get signed URLs for all files
        const signedUrlPromises = filesToUpload.map(async (file) => {
          try {
            const { url, path } = await getSignedUploadUrl({
              filename: file.name,
              contentType: file.type,
              rootFolder: "user",
              folderName: "reviews",
            });
            return { file, url, path, error: null };
          } catch (err: any) {
            console.error(`[ReviewForm] Failed to get signed URL for ${file.name}:`, err);
            return { file, url: null, path: null, error: err.message };
          }
        });

        const signedUrlResults = await Promise.all(signedUrlPromises);

        // Upload files to cloud storage
        const uploadPromises = signedUrlResults.map(async (result) => {
          if (result.error || !result.url || !result.path) {
            return { success: false, path: null, error: result.error || "Failed to get upload URL" };
          }

          try {
            const res = await fetch(result.url, {
              method: "PUT",
              headers: { "Content-Type": result.file.type },
              body: result.file,
            });

            if (!res.ok) {
              throw new Error(`Upload failed with status ${res.status}`);
            }

            return { success: true, path: result.path, error: null };
          } catch (err: any) {
            console.error(`[ReviewForm] Upload failed for ${result.file.name}:`, err);
            return { success: false, path: null, error: err.message };
          }
        });

        const uploadResults = await Promise.all(uploadPromises);

        // Collect successful uploads
        const successfulUploads = uploadResults.filter(r => r.success && r.path);
        const failedUploads = uploadResults.filter(r => !r.success);

        if (successfulUploads.length > 0) {
          uploadedImagePaths = successfulUploads.map(r => r.path!);
          console.log("[ReviewForm] Successfully uploaded images:", uploadedImagePaths);
        }

        if (failedUploads.length > 0) {
          console.error("[ReviewForm] Some uploads failed:", failedUploads);
          toast.warning(`${failedUploads.length} image(s) failed to upload`);
        }

        // Clean up preview URLs
        if (previewUrl) {
          if (Array.isArray(previewUrl)) {
            previewUrl.forEach(url => URL.revokeObjectURL(url));
          } else {
            URL.revokeObjectURL(previewUrl);
          }
        }

        toast.dismiss();
      }

      // Prepare review data with uploaded image paths
      const reviewPayload = {
        ...reviewData,
        rating: rating,
        comment: comment,
        images: uploadedImagePaths.map(path => ({ url: path }))
      };

      toast.loading("Submitting review...");

      // Submit the review
      const result = await postProductReview(reviewPayload);

      toast.dismiss();

      if (result?.success) {
        toast.success("Review submitted successfully!");
        // Clear form
        setComment("");
        setRating(0);
        setPendingImageFile(null);
        setPreviewUrl(null);
        setImgs([]);
        setShowWriteReview(false);
      } else {
        toast.error(result?.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("[ReviewForm] Error submitting review:", error);
      toast.dismiss();
      toast.error("An error occurred while submitting your review");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Selection */}
        <div className="flex justify-between items-center">


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
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Add Photos (Optional)</Label>
            <div className="relative">
              <ImageUploader
                images={imgs}
                onChange={(file) => {
                  console.log("[ReviewForm] Image file selected:", file)
                  setPendingImageFile(file)
                  const preview = Array.isArray(file) ? file.map(f => URL.createObjectURL(f)) : URL.createObjectURL(file)
                  setPreviewUrl(preview)
                  toast.success("Image selected. It will be uploaded when you submit the review.")
                }}
                maxImages={5}
                buttonLabel="Upload Review Photos"
                maxFileSize={5}
              >
                <Button type="button" className="bg-[#00AA78] text-white hover:bg-[#00AA78]/90 transition-opacity">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photos
                </Button>
              </ImageUploader>
              {previewUrl && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {(Array.isArray(previewUrl) ? previewUrl : [previewUrl]).map((url, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border">
                      <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
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
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowWriteReview(false)}
            disabled={isSubmitting}
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
