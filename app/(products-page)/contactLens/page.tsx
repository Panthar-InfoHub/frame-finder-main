import { getAllContactLens } from "@/actions/products";
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

  const category = [
    { label: "Spherical/Non-Toric", value: "spherical-non-toric" },
    { label: "Toric", value: "toric" },
    { label: "Multifocal", value: "multifocal" },
  ];

  return (
    <ProductFetchingLayout
      pageTitle="CONTACT LENSES"
      heroImageSrc="/images/bg/cl_bg.png"
      category={category}
      productType="contactLens"
      searchParams={params}
      basePath="/contactLens"
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
  const response = await getAllContactLens(filters);

  if (!response.success) {
    return <p>Error : failed to load the products</p>;
  }

  const transformedData = await transformImages(response.data.products);

  return (
    <>
      <div className="flex items-center gap-4 flex-1 justify-center lg:justify-start mb-6">
        <span className="font-semibold">{transformedData.length} PRODUCTS</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {transformedData.map((product: any) => (
          <ProductCard key={product._id} product={product} productType="contactLens" />
        ))}
      </div>
    </>
  );
}
