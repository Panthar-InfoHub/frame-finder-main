"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import type { Product  } from "@/lib/data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const productPrice = product.price.base_price;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border shadow-md transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="relative p-5">
        {product.is_Power && (
          <div className="absolute left-5 top-5 z-10">
            <Badge className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 text-white text-sm">
              Prescription Only
            </Badge>
          </div>
        )}

        {/* Top-right wishlist heart */}
        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setLiked((v) => !v)}
          className="absolute right-5 top-5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-neutral-600 shadow-sm hover:bg-white"
        >
          <Heart className="h-5 w-5" fill={liked ? "currentColor" : "none"} />
        </button>

        <div
          className={`${product.is_Power ? "mt-5" : "mt-2"} aspect-4/3 w-full rounded-xl bg-neutral-100 flex items-center justify-center`}
        >
          {/* Placeholder only; will be replaced with actual image later */}
          <svg
            className="h-24 w-36 text-neutral-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>

        {/* Bottom content */}
        <div className="mt-4 grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-4">
          <div className="row-span-2">
            <h3 className="text-xl font-semibold leading-tight tracking-tight">{product.brand_name}</h3>
            <p className="mt-1 text-base font-semibold">{`Rs. ${productPrice}/-`}</p>
            <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
          </div>
          <span className="self-start justify-self-end text-sm font-medium text-neutral-400">{`${product.rating} Rating`}</span>
          <Button
            size="sm"
            className="self-end justify-self-end rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
            aria-label={`Add ${product.brand_name} to cart`}
          >
            Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
