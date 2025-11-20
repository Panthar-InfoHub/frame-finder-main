import { getAccessoriesById, getProductReview } from "@/actions/products";
import { BlueLightFeature } from "@/components/home-page/blue-light-feature";
import { AddToCartBtn } from "@/components/multiple-products-page-component/add-to-cart-btn";
import { ProductDetailsAccordion } from "@/components/single-product-page-component/product-details-accordion";
import { ProductImageGallery } from "@/components/single-product-page-component/product-image-gallery";
import { ProductInfo } from "@/components/single-product-page-component/product-info";
import { ProductPrice } from "@/components/single-product-page-component/product-price";
import { ProductRating } from "@/components/single-product-page-component/product-rating";
import { CustomerReviews } from "@/components/single-product-page-component/reviews/customer-reviews";
import { SimilarProducts } from "@/components/single-product-page-component/similar-products";
import { TrustBadges } from "@/components/single-product-page-component/trust-badges";
import { auth } from "@/lib/auth";
import { getImageUrls, transformReviewImages } from "@/lib/helper";
import { mockSimilarProducts, trustBadges } from "@/lib/mock-data";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ProductPageParams {
  params: Promise<{ id: string }>;
  // searchParams: Promise<{ variantId: string | undefined }>
}

export default async function ProductPage({ params,  }: ProductPageParams) {
  

  const { id } = await params;
  // const query = await searchParams;
  const session = await auth();

  const isActionDisabled = !!session?.user;

  
// if (!id || !query.variantId) {
//     return redirect('/');
//   }

 const [res, reviews] = await Promise.all([
     getAccessoriesById(id),
     getProductReview(id),
   ])

  if (!res?.success || !res.data) {
    return <p>{`product not found - ${id}`}</p>;
  }

  const product = res.data;
  // const variant = product.variants.find((f) => f._id === query.variantId);

  // if (!variant) {
  //   const newVariantId = product.variants[0]._id;
  //   console.log('variant not found', 'redirecting to', newVariantId);
  //   return redirect(`/frames/${id}?variantId=${newVariantId}`)
  // }


  const rawDim = product.dimension || {};
  const dimensionArray = Object.entries(rawDim).map(([k, v]) => ({
    label: k,
    value: String(v ?? ""),
  }));
  const imageUrls = await getImageUrls(product.images.map((i) => i.url));

  const reviewData = {
    vendorId: product.vendorId._id,
    productId: product._id,
    onModel: product.type,
  }
  const allReviews = await transformReviewImages(reviews);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-muted-foreground">Home | Accessories | {product.brand_name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div>
            <ProductImageGallery imageUrls={imageUrls} brandName={product.brand_name} />
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            <ProductInfo
              brandName={product.brand_name}
              productCode={product.productCode}
              status={product.status}
              vendor={product.vendorId}
              createdAt={product.createdAt}
            />

            <ProductRating rating={product.rating} totalReviews={product.total_reviews} />

            <ProductPrice
              totalPrice={product.price.base_price}
              mrp={product.price.mrp}
              basePrice={product.price.base_price}
            />

            {/* Description */}
            {product.desc && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Description:</p>
                <p className="text-sm text-muted-foreground">{product.desc}</p>
              </div>
            )}

            {/* Stock Status */}
            {product.stock.current > 0 ? (
              <p className="text-sm text-green-600 font-medium">
                In Stock ({product.stock.current} available)
              </p>
            ) : (
              <p className="text-sm text-destructive font-medium">Out of Stock</p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <AddToCartBtn
                isDisabled={product.stock.current === 0 || !isActionDisabled}
                productId={product._id}
                productType="Accessories"
                btnText="Add to Cart"
              />
            </div>

            {/* Manufacturing Date */}
            {product.mfg_date && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Manufacturing Date:{" "}
                  <span className="text-muted-foreground">
                    {new Date(product.mfg_date).toLocaleDateString()}
                  </span>
                </p>
              </div>
            )}

            {/* HSN Code */}
            {product.hsn_code && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  HSN Code: <span className="text-muted-foreground">{product.hsn_code}</span>
                </p>
              </div>
            )}

            {/* Accordion Details */}
            <ProductDetailsAccordion
              material={product.material}
              shape={product.shape}
              style={product.style}
              gender={product.gender}
              sizes={product.sizes}
              isPower={product.is_Power}
              vendorName={product?.vendorId?.business_name || "Business name"}
              vendorRating={product?.vendorId?.rating || 2.75}
              vendorRatingCount={product?.vendorId?.total_reviews || 4}
              sellerSince={product?.vendorId?.year_of_experience || 5}
            />
          </div>
        </div>

        <BlueLightFeature />

        {/* Trust Badges */}
        <div className="mt-12">
          <TrustBadges badges={trustBadges} />
        </div>

        <div className="mt-12">
          <CustomerReviews
            allReviews={allReviews}
            averageRating={product.rating}
            totalReviews={reviews.data.totalReviews}
            distribution={reviews.data.ratingDistribution}
            isActionDisabled={isActionDisabled}
            reviewData={reviewData}
            session={session}
          />
        </div>

        {/* Similar Products */}
        {/* <SimilarProducts products={mockSimilarProducts} /> */}
      </div>
    </div>
  );
}
