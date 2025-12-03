import { getAllLensSolution } from "@/actions/products";
import { ProductFetchingLayout } from "@/components/common/product-fetching";
import LoadingSkeleton from "@/components/loading-skeleton";
import { ProductCard } from "@/components/multiple-products-page-component/product-card-with-variant";
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
export default async function AllContactlens({ searchParams }: searchParamsProps) {
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
      pageTitle="CONTACT LENS SOLUTION"
      heroImageSrc="/images/bg/solution_bg.png"
      productType="contactLensSolution"
      searchParams={params}
      basePath="/contactLensSolution"
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductList filters={filters} />
      </Suspense>
    </ProductFetchingLayout>
  );
}

// DATA FETCHING SEPARATED COMPONENT : FOR PPR
async function ProductList({ filters }: { filters: Record<string, string | string[]> }) {
  const response = await getAllLensSolution(filters);

  if (!response.success) {
    return <p>Error: Failed to load products</p>;
  }

  const transformedProducts = await transformImages(response.data.products);
  const totalProducts = response.data.pagination?.totalProducts || transformedProducts.length;

  return (
    <>
      <div className="flex items-center gap-4 flex-1 justify-center lg:justify-start mb-6">
        <span className="font-semibold">{totalProducts} PRODUCTS</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {transformedProducts.map((product) => (
          <ProductCard key={product._id} product={product} productType="contactLensSolution" />
        ))}
      </div>
    </>
  );
}
