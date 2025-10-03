import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        {product.badge && (
          <Badge className="mb-3 bg-emerald-500 hover:bg-emerald-600 text-white">{product.badge}</Badge>
        )}

        <div className="aspect-square bg-neutral-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {/* Placeholder for product image */}
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-32 h-32 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-base font-medium">Rs. {product.price}/-</p>

          <div className="flex gap-2 pt-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className="w-6 h-6 rounded-full border-2 border-neutral-300 hover:border-neutral-500 transition-colors"
                style={{ backgroundColor: color }}
                aria-label={`Color option ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
