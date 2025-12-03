import { getAllAccessories } from "@/actions/products";
import { ProductFetchingLayout } from "@/components/common/product-fetching";
import LoadingSkeleton from "@/components/loading-skeleton";
import { ProductCard } from "@/components/multiple-products-page-component/product-card-without-variant";
import { transformImages } from "@/lib/helper";
import Link from "next/link";
import { Suspense } from "react";

interface searchParamsProps {
  searchParams: Promise<{
    gender: string | string[];
    style: string | string[];
    material: string | string[];
    brand: string | string[];
  }>;
}

export default async function Accessories({ searchParams }: searchParamsProps) {
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
      pageTitle="ACCESSORIES"
      heroImageSrc="/images/bg/frame_bg.png"
      productType="accessories"
      searchParams={params}
      basePath="/accessories"
    >
      {/* Product Grid with streaming */}
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductList filters={filters} />
      </Suspense>
    </ProductFetchingLayout>
  );
}

// DATA FETCHING SEPARATED COMPONENT : FOR PPR
async function ProductList({ filters }: { filters: Record<string, string | string[]> }) {
  const response = await getAllAccessories(filters);

  if (!response.success) {
    return <p>Error : failed to load the products</p>;
  }

  const products = await transformImages(response.data.accessories);

  return (
    <>
      <div className="flex items-center gap-4 flex-1 justify-center lg:justify-start mb-6">
        <span className="font-semibold">{products.length} PRODUCTS</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product: any) => (
          <ProductCard key={product._id} product={product} productType="accessories" />
        ))}
      </div>
    </>
  );
}
