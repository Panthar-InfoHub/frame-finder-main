"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/home-page/product-card"
import { newArrivals, bestSellers } from "@/lib/data"
import Link from "next/link"

export function TopOurPicks() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">TOP OUR PICKS</h2>

        <Tabs defaultValue="new-arrivals" className="w-full">
          {/* Tabs Header with See More */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 md:mb-12">
            <TabsList className="bg-transparent border border-primary rounded-full p-1 h-auto">
              <TabsTrigger
                value="new-arrivals"
                className="rounded-full px-6 md:px-8 py-2 md:py-3 text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                New Arrivals
              </TabsTrigger>
              <TabsTrigger
                value="best-seller"
                className="rounded-full px-6 md:px-8 py-2 md:py-3 text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Best Seller
              </TabsTrigger>
            </TabsList>

            <Link
              href="/products"
              className="text-primary hover:underline text-sm md:text-base font-medium md:absolute md:right-8"
            >
              See More
            </Link>
          </div>

          {/* New Arrivals Content */}
          <TabsContent value="new-arrivals" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>

          {/* Best Seller Content */}
          <TabsContent value="best-seller" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
