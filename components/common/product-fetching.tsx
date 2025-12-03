// components/products/ProductPageLayout.tsx
import { SimplifiedFilterSidebar } from "@/components/filters";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/lib/data";
import { SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { Suspense, ReactNode } from "react";
import LoadingSkeleton from "@/components/loading-skeleton";
import { CategoryTab } from "./category-tab";
import { getFilterConfig } from "@/lib/filters/filter-configs";
import { FilterErrorBoundary } from "@/components/filters/FilterErrorBoundary";
import { FilterParams } from "@/lib/filters/filter-utils";
import Link from "next/link";

interface ProductPageLayoutProps {
  pageTitle: string;
  heroImageSrc: string;
  children: ReactNode; // Dynamic product list goes here
  category?: any;
  productType?: string;
  searchParams?: FilterParams; // NEW: Pass search params for filters
  basePath?: string; // NEW: Base path for filter URLs
}

export function ProductFetchingLayout({
  pageTitle,
  heroImageSrc,
  children,
  category,
  productType,
  searchParams = {},
  basePath = "",
}: ProductPageLayoutProps) {
  // Automatically get filter config based on product type
  const filterConfig = getFilterConfig(productType);

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
          {/* Desktop Sidebar - SIMPLIFIED */}
          <aside className="hidden lg:block shrink-0 w-64">
            <div className="sticky top-8">
              <FilterErrorBoundary>
                <SimplifiedFilterSidebar
                  filterConfig={filterConfig}
                  searchParams={searchParams}
                  basePath={basePath}
                />
              </FilterErrorBoundary>
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
                    <FilterErrorBoundary>
                      <SimplifiedFilterSidebar
                        filterConfig={filterConfig}
                        searchParams={searchParams}
                        basePath={basePath}
                      />
                    </FilterErrorBoundary>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Product count placeholder - will be replaced by streaming content */}

              <Link href={basePath} scroll={false}>
                <Button variant="ghost" className="text-sm font-semibold">
                  RESET
                </Button>
              </Link>
            </div>

            {/* Category Tabs - STATIC */}
            {(productType === "frames" ||
              productType === "colorContactLens" ||
              productType === "contactLens" ||
              productType === "sunglasses") && <CategoryTab categories={category} />}

            {/* DYNAMIC CONTENT WITH SUSPENSE - STREAMS */}
            <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
