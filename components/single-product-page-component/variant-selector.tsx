"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useTransition } from "react"


interface Variant {
  _id: string
  frame_color: string
  temple_color: string
  price: {
    total_price: number
    mrp: number
    base_price: number
  }
  stock: {
    current: number
    minimum: number
  }
}

interface VariantSelectorProps {
  productId : string
  variants: Variant[]
  selectedVariantId: string
}

export function VariantSelector({ productId, variants, selectedVariantId }: VariantSelectorProps) {

  const router = useRouter();
  const [isTransitioning, Transition] = useTransition();

  if (isTransitioning) {
    return (
      <div>LOADING</div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Color Options</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {variants.map((variant) => {
          const isSelected = variant._id === selectedVariantId
          const isOutOfStock = variant.stock.current === 0

          return (
            <Button
              key={variant._id}
              variant="outline"
              className={cn(
                "h-auto p-3 flex flex-col items-start gap-2 relative transition-all",
                isSelected && "border-emerald-600 border-2 bg-emerald-50",
                isOutOfStock && "opacity-60 cursor-not-allowed",
              )}
              onClick={() => {
                if (!isOutOfStock){
                  Transition(() => {
                    router.push(`/frames/${productId}?variantId=${variant._id}`)
                  })
                }
              }}
              disabled={isOutOfStock}
            >
              <div className="text-left w-full space-y-1">
                <p className="text-xs text-muted-foreground">Frame Color:</p>
                <p className="text-sm font-medium capitalize">{variant.frame_color}</p>
                <p className="text-xs text-muted-foreground mt-2">Temple Color:</p>
                <p className="text-sm font-medium capitalize">{variant.temple_color}</p>
                <p className="text-xs text-muted-foreground mt-2">₹{variant.price.total_price}</p>
              </div>
              {isOutOfStock && (
                <span className="absolute top-1 right-1 text-[10px] bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded">
                  Out of Stock
                </span>
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
