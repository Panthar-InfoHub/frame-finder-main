import { getAllFrames } from "@/actions/products";
import { ProductFetchingLayout } from "@/components/common/product-fetching";
import LoadingSkeleton from "@/components/loading-skeleton";
import { ProductCard } from "@/components/multiple-products-page-component/product-card-with-variant";
import { transformImages } from "@/lib/helper";
import { searchParamsProps } from "@/lib/type";
import Link from "next/link";
import { Suspense } from "react";



export default async function Frames({ searchParams }: searchParamsProps) {
  const { gender, style, material, brand, frame_color, temple_color } = await searchParams;

  const filters = {
    gender: gender as string || null,
    style: style as string || null,
    material: material as string || null,
    brand: brand as string || null,
    frame_color: frame_color as string || null,
    temple_color: temple_color as string || null,
  };

  const category = [
  { label: "Eyeglasses", value: "eyeglasses" },
  { label: "Prescription", value: "prescription" },
  { label: "Non-Prescription", value: "non-prescription" },
];

  return (

    <ProductFetchingLayout pageTitle="EYEWARE GLASSES" heroImageSrc="/images/bg/frame_bg.png" category={category} productType="frames" >
      {/* Product Grid with streaming */}
      <Suspense fallback={<LoadingSkeleton />}>
        <ProductList filters={filters} />
      </Suspense>
    </ProductFetchingLayout>

  );
}


// DATA FETCHING SEPARATED COMPONENT : FOR PPR
async function ProductList({ filters }: { filters: any }) {
  const response = await getAllFrames(filters);

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
        {newArrivals.map((product) => (
          <ProductCard key={product._id} product={product} productType="frames" />
          // <Link href={`/frames/${product._id}?variantId=${product?.variants?.[0]?._id}`} key={product._id}>
          // </Link>
        ))}  
      </div>
    </>
  );
}