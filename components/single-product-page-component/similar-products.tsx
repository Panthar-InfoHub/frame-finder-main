import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface SimilarProduct {
  _id: string
  brand_name: string
  productCode: string
  variants: Array<{
    price: {
      total_price: number
      mrp: number
    }
    images: Array<{ url: string }>
  }>
}

interface SimilarProductsProps {
  products: SimilarProduct[]
}

export function SimilarProducts({ products }: SimilarProductsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => {
          const variant = product.variants[0]
          return (
            <Link key={product._id} href={`/products/${product._id}`}>
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <CardContent className="p-3">
                  <div className="relative aspect-4/3 w-full mb-3 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src="https://placehold.co/200x150/png"
                      alt={product.brand_name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground truncate">{product.brand_name}</p>
                    <p className="text-muted-foreground text-xs">{product.productCode}</p>
                    <p className="font-semibold text-base">₹{variant.price.total_price.toLocaleString("en-IN")}/-</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
