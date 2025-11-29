"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { WishlistHeartButton } from "@/components/common/wishlist-heart-button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  productType?: string;
  variantId?: string;
}

export function ProductCard({
  id,
  name,
  price,
  rating,
  image,
  productType,
  variantId,
}: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="relative aspect-4/3 bg-muted rounded-lg overflow-hidden mb-3">
        {/* Product Image */}
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md flex items-center gap-1 text-xs font-medium">
          <Star className="w-3 h-3 fill-white" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base md:text-lg font-medium text-foreground mb-1">{name}</h3>
          <p className="text-base md:text-lg font-semibold text-foreground">₹ {price}/-</p>
        </div>

        {/* Wishlist Heart */}
        {id && productType && (
          <WishlistHeartButton
            productId={id}
            productType={productType as any}
            variantId={variantId}
            size="sm"
            className="mt-1"
          />
        )}
      </div>
    </div>
  );
}
