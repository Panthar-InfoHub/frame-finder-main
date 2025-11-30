import { getAllColorContactLens } from "@/actions/products";
import { ProductFetchingLayout } from "@/components/common/product-fetching";
import LoadingSkeleton from "@/components/loading-skeleton";
import { ProductCard } from "@/components/multiple-products-page-component/product-card-with-variant";
import { transformImages } from "@/lib/helper";
import Link from "next/link";
import { Suspense } from "react";

interface searchParamsProps {
  searchParams: Promise<{
    gender: string | string[]
    style: string | string[]
    material: string | string[]
    brand: string | string[]

  }>
}

export default async function ColorContactLens({ searchParams }: searchParamsProps) {
  const { gender, style, material, brand } = await searchParams;

  const filters = {
    gender: gender as string || null,
    style: style as string || null,
    material: material as string || null,
    brand: brand as string || null,
  };
  const category = [
  { label: "Zero", value: "zero" },
  { label: "Power", value: "power" },
  { label: "Toric", value: "toric" },
];

  return (
    <ProductFetchingLayout
      pageTitle="COLOR CONTACT LENSES"
      heroImageSrc="/images/bg/cl_bg.png"
      category={category}
      productType="colorContactLens"
    >
      {/* Product Grid with streaming */}
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductList filters={filters} />
      </Suspense>
    </ProductFetchingLayout>
  );
}

// DATA FETCHING SEPARATED COMPONENT : FOR PPR
async function ProductList({ filters }: { filters: any }) {
  const response = await getAllColorContactLens(filters);

  if (!response.success) {
    return <p>Error : failed to load the products</p>;
  }

  const newArrivals = await transformImages(response.data.products)

  return (
    <>
      <div className="flex items-center gap-4 flex-1 justify-center lg:justify-start mb-6">
        <span className="font-semibold">
          {newArrivals.length} PRODUCTS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {newArrivals.map((product: any) => (   
            <ProductCard key={product._id} product={product} productType="colorContactLens"/>
        ))}
      </div>
    </>
  );
}