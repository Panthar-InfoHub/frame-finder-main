import { getAllReadingGlass } from "@/actions/products";
import { getSignedViewUrl } from "@/actions/cloud-storage";
import { ProductFetchingLayout } from "@/components/common/product-fetching";
import LoadingSkeleton from "@/components/loading-skeleton";
import { ProductCard } from "@/components/multiple-products-page-component/product-card-with-variant";
import Link from "next/link";
import { Suspense } from "react";
import { transformImages } from "@/lib/helper";

interface searchParamsProps {
  searchParams: Promise<{
    gender: string | string[];
    style: string | string[];
    material: string | string[];
    brand: string | string[];
  }>;
}

export default async function Frames({ searchParams }: searchParamsProps) {
  const params = await searchParams;

  // Build filters object from all possible params
  const filters: Record<string, string | string[]> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      filters[key] = value;
    }
  });

  return (
    <ProductFetchingLayout
      pageTitle="READING GLASSES"
      heroImageSrc="/images/bg/frame_bg.png"
      productType="readingGlasses"
      searchParams={params}
      basePath="/readingGlasses"
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductList filters={filters} />
      </Suspense>
    </ProductFetchingLayout>
  );
}

// DATA FETCHING SEPARATED COMPONENT : FOR PPR
async function ProductList({ filters }: { filters: Record<string, string | string[]> }) {
  const response = await getAllReadingGlass(filters);

  if (!response.success) {
    return <p>Error: Failed to load products</p>;
  }

  const productsWithImages = await transformImages(response.data.result.products);

  const totalProducts = response.data.result.pagination?.totalProducts || productsWithImages.length;

  return (
    <>
      <div className="flex items-center gap-4 flex-1 justify-center lg:justify-start mb-6">
        <span className="font-semibold">{totalProducts} PRODUCTS</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 auto-rows-fr">
        {productsWithImages.map((product) => (
          <ProductCard key={product._id} product={product} productType="readingGlasses" />
        ))}
      </div>
    </>
  );
}
