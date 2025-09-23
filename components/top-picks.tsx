import { topPicks } from "@/lib/data"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"

export function TopPicks() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">TOP OUR PICKS</h2>
          <div className="flex justify-center space-x-4 mb-8">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full">
              View Arrivals
            </Button>
            <Button variant="outline" className="px-6 py-2 rounded-full bg-transparent">
              Best Seller
            </Button>
          </div>
          <div className="flex justify-end">
            <Button variant="link" className="text-emerald-500">
              See More
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}