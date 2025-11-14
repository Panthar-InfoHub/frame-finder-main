// components/products/ProductPageLayout.tsx
import { FilterSidebar } from "@/components/multiple-products-page-component/filter-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/lib/data";
import { SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { Suspense, ReactNode } from "react";
import LoadingSkeleton from "@/components/loading-skeleton";

interface ProductPageLayoutProps {
  pageTitle: string;
  heroImageSrc: string;
  children: ReactNode; // Dynamic product list goes here
}

export function ProductFetchingLayout({
  pageTitle,
  heroImageSrc,
  children,
}: ProductPageLayoutProps) {
  return (
    <main className="min-h-screen">
      {/* Hero Section - STATIC */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-neutral-800">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-0">
          <Image src={heroImageSrc} alt="Hero Image" fill className="object-cover h-full w-full" />
        </div>
        <div className="relative z-20 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider">
            {pageTitle}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar - STATIC */}
          <aside className="hidden lg:block shrink-0 w-64">
            <div className="sticky top-8">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header - STATIC */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              {/* Mobile Filter - STATIC */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    FILTER
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <div className="py-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Product count placeholder - will be replaced by streaming content */}

              <Button variant="ghost" className="text-sm font-semibold">
                RESET
              </Button>
            </div>

            {/* Category Tabs - STATIC */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="default" className="rounded-full">All</Button>
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

            {/* DYNAMIC CONTENT WITH SUSPENSE - STREAMS */}
            <Suspense fallback={<LoadingSkeleton />}>
              {children}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
