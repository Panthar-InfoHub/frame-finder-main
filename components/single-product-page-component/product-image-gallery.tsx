"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductImage {
  url: string
  _id: string
}

interface ProductImageGalleryProps {
  images: ProductImage[]
  brandName: string
}

export function ProductImageGallery({ images, brandName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // Create array of 4 images for display (repeat if less than 4)
  const displayImages = Array.from({ length: 4 }, (_, i) => images[i % images.length] || images[0])

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="rounded-2xl shadow-md overflow-hidden bg-white border border-border">
        <div className="relative aspect-4/3 w-full">
          <Image src="https://placehold.co/600x400/png" alt={brandName} fill className="object-contain p-8" priority />
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-3">
        {displayImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={cn(
              "border rounded-xl overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary",
              selectedImage === i && "ring-2 ring-primary",
            )}
          >
            <div className="relative aspect-3/2 w-full bg-white">
              <Image
                src="https://placehold.co/120x80/png"
                alt={`${brandName} view ${i + 1}`}
                fill
                className="object-contain p-2"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
