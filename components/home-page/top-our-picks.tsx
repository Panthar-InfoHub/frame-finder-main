import { ProductCard } from "@/components/home-page/product-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getBestSeller, getNewArrival } from "@/lib/actions/homePage"
import { getSignedViewUrl } from "@/actions/cloud-storage"
import Link from "next/link"
import { Suspense } from "react"
import LoadingSkeleton from "../loading-skeleton"

export async function TopOurPicks() {

  const [res, bestSellerRes] = await Promise.all([getNewArrival(), getBestSeller({ period: "all_time" })])
  console.debug("best seller data ", bestSellerRes.data.data)

  if (!res.success || !bestSellerRes.success) return;

  const newArrivals = await Promise.all(
    res.data.data.products.map(async (product: any) => {
      const rawUrl: string | undefined = product?.variants?.[0]?.images?.[0]?.url
      const isHttp = rawUrl && /^https?:\/\//i.test(rawUrl)
      const signedUrl = rawUrl ? (isHttp ? rawUrl : await getSignedViewUrl(rawUrl)) : ""
      return { ...product, _image: signedUrl }
    })
  )

  const bestSellers = await Promise.all(
    bestSellerRes.data.data.data.map(async (item: any) => {
      const rawUrl: string | undefined = item?.productId?.variants?.[0]?.images?.[0]?.url
      const isHttp = rawUrl && /^https?:\/\//i.test(rawUrl)
      const signedUrl = rawUrl ? (isHttp ? rawUrl : await getSignedViewUrl(rawUrl)) : ""
      return { ...item, _image: signedUrl }
    })
  )
  console.log(bestSellers)

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
              href="/frames"
              className="text-primary hover:underline text-sm md:text-base font-medium md:absolute md:right-8"
            >
              See More
            </Link>
          </div>

          {/* New Arrivals Content */}
          <Suspense fallback={<LoadingSkeleton />}>

            <TabsContent value="new-arrivals" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {newArrivals.map((product: any) => (
                  <Link href={`/frames/${product._id}`} key={product._id}>
                    <ProductCard key={product._id}
                    name={product.brand_name}
                    price={product.variants[0].price.total_price}
                    rating={product.rating}
                    image={product._image}
                    id={product._id} />
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* Best Seller Content */}
            <TabsContent value="best-seller" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {bestSellers.map((product: any) => (
                  <Link href={`/frames/${product._id}`} key={product._id}>
                    <ProductCard key={product.productId._id}
                    name={product.productId.brand_name}
                    price={product.productId.variants[0].price.total_price}
                    rating={product.productId.rating}
                    image={product._image}
                    id={product.productId._id} />
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Suspense>
        </Tabs>
      </div>
    </section>
  )
}
