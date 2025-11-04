import { getSignedViewUrl } from "@/actions/cloud-storage";
import { getAllFrames } from "@/actions/products";
import { FilterSidebar } from "@/components/multiple-products-page-component/filter-sidebar";
import { ProductCard } from "@/components/multiple-products-page-component/product-card-with-variant";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/lib/data";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface searchParamsProps {
  searchParams: Promise<{
    gender: string | string[]
    style: string | string[]
    material: string | string[]
    brand: string | string[]

  }>
}

export default async function Frames({ searchParams }: searchParamsProps) {
  const FilterContent = () => <FilterSidebar />;

  const { gender, style, material, brand } = await searchParams

  const response = await getAllFrames({
    gender: gender as string || null,
    style: style as string || null,
    material: material as string || null,
    brand: brand as string || null
  });

  if (!response.success) {
    return <p>Error : failed to load the page</p>;
  }

  const newArrivals = await Promise.all(
    response.data.products.map(async (product: any) => {
      const rawUrl: string | undefined = product?.variants?.[0]?.images?.[0]?.url
      const isHttp = rawUrl && /^https?:\/\//i.test(rawUrl)
      const signedUrl = rawUrl ? (isHttp ? rawUrl : await getSignedViewUrl(rawUrl)) : ""
      return { ...product, _image: signedUrl }
    })
  )


  const data = {
    pagination: {
      totalProducts: newArrivals.length
    },
    products: newArrivals
  };

  return (
    <main className="min-h-screen">
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-neutral-800">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-0">
          {/* Placeholder for hero image */}
          <div className="w-full h-full bg-linear-to-br from-neutral-700 to-neutral-900" />
        </div>
        <div className="relative z-20 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider">
            EYEWARE GLASSES
          </h1>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar - Always visible and static */}
          <aside className="hidden lg:block shrink-0 w-64">
            <div className="sticky top-8">
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="lg:hidden bg-transparent"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    FILTER
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <div className="py-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-4 flex-1 justify-center lg:justify-start">
                <span className="font-semibold">
                  {data.pagination.totalProducts} PRODUCTS
                </span>
              </div>

              <Button variant="ghost" className="text-sm font-semibold">
                RESET
              </Button>
            </div>

            {/* Category Tabs - Static, no click handlers */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="default" className="rounded-full">
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant="outline"
                  className="rounded-full bg-transparent"
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.products.map((product) => (
                <Link href={`/frames/${product._id}`} key={product._id}>
                  <ProductCard key={product._id} product={product} />
                </Link>
              ))}
            </div>  

          </div>
        </div>
      </div>

    </main>
  );
}
