import { getAllFrames } from "@/actions/products";
import { ProductFetchingLayout } from "@/components/common/product-fetching";
import LoadingSkeleton from "@/components/loading-skeleton";
import { ProductCard } from "@/components/multiple-products-page-component/product-card-with-variant";
import { transformImages } from "@/lib/helper";
import { searchParamsProps } from "@/lib/type";
import { Suspense } from "react";

export default async function Frames({ searchParams }: searchParamsProps) {
  const params = await searchParams;

  // Build filters object from all possible params
  const filters: Record<string, string | string[]> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      filters[key] = value;
    }
  });

  const category = [
    { label: "Eyeglasses", value: "eyeglasses" },
    { label: "Prescription", value: "prescription" },
    { label: "Non-Prescription", value: "non-prescription" },
  ];

  return (
    <ProductFetchingLayout
      pageTitle="EYEWARE GLASSES"
      heroImageSrc="/images/bg/frame_bg.png"
      category={category}
      productType="frames"
      searchParams={params}
      basePath="/frames"
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
  try {
    const response = await getAllFrames(filters);

    if (!response.success) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading products</p>
          <p className="text-sm text-gray-600">
            {response.message || "Failed to load the products"}
          </p>
        </div>
      );
    }

    const products = await transformImages(response.data.products);

    if (products.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <p className="text-gray-600 text-lg mb-2">No products found</p>
          <p className="text-sm text-gray-500">Try adjusting your filters to see more results</p>
        </div>
      );
    }

    return (
      <>
        <div className="flex items-center gap-4 flex-1 justify-center lg:justify-start mb-6">
          <span className="font-semibold">
            {products.length} {products.length === 1 ? "PRODUCT" : "PRODUCTS"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} productType="frames" />
          ))}
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <p className="text-red-600 font-semibold mb-2">Unexpected Error</p>
        <p className="text-sm text-gray-600">
          {error instanceof Error ? error.message : "An unexpected error occurred"}
        </p>
      </div>
    );
  }
}
