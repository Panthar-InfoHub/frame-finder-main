import { getAllSunglasses } from "@/actions/products";
import { ProductFetchingLayout } from "@/components/common/product-fetching";
import LoadingSkeleton from "@/components/loading-skeleton";
import { ProductCard } from "@/components/multiple-products-page-component/product-card-with-variant";
import { transformImages } from "@/lib/helper";
import { searchParamsProps } from "@/lib/type";
import Link from "next/link";
import { Suspense } from "react";

export default async function Sunglasses({ searchParams }: searchParamsProps) {
  const params = await searchParams;

  // Build filters object from all possible params
  const filters: Record<string, string | string[]> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      filters[key] = value;
    }
  });

  const category = [
    { label: "Sunglasses", value: "sunglasses" },
    { label: "Prescription Sunglasses", value: "prescription-sunglasses" },
    { label: "Non-Prescription Sunglasses", value: "non-prescription-sunglasses" },
  ];

  return (
    <ProductFetchingLayout
      pageTitle="SUNGLASSES"
      heroImageSrc="/images/bg/sun_bg.jpg"
      category={category}
      productType="sunglasses"
      searchParams={params}
      basePath="/sunglasses"
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
  const response = await getAllSunglasses(filters);

  if (!response.success) {
    return <p>Error : failed to load the products</p>;
  }

  const newArrivals = await transformImages(response.data.result.products);

  return (
    <>
      <div className="flex items-center gap-4 flex-1 justify-center lg:justify-start mb-6">
        <span className="font-semibold">{newArrivals.length} PRODUCTS</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {newArrivals.map((product) => (
          <ProductCard key={product._id} product={product} productType="sunglasses" />
        ))}
      </div>
    </>
  );
}
