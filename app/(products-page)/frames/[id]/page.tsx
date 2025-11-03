import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFrameById } from "@/actions/products";

import Link from "next/link";
import { Heart, Share2 } from "lucide-react";
import { ProductImageGallery } from "@/components/single-product-page-component/product-image-gallery";
import { ProductRating } from "@/components/single-product-page-component/product-rating";
import { ProductPrice } from "@/components/single-product-page-component/product-price";
import { ProductInfo } from "@/components/single-product-page-component/product-info";
import { FrameDimensions } from "@/components/single-product-page-component/frame-dimensions";
import { ProductDetailsAccordion } from "@/components/single-product-page-component/product-details-accordion";
import { TrustBadges } from "@/components/single-product-page-component/trust-badges";
import { SimilarProducts } from "@/components/single-product-page-component/similar-products";
import { mockSimilarProducts, frameDimensions, trustBadges } from "@/lib/mock-data";
import { AddToCartBtn } from "@/components/multiple-products-page-component/add-to-cart-btn";
import { getImageUrls } from "@/lib/helper";
// import { mockProduct, mockSimilarProducts, frameDimensions, trustBadges } from "@/lib/mock-data"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getFrameById(id);

  if (!res?.success || !res.data) {
    return <p>{`product not found - ${id}`}</p>;
  }

  const product = res.data;
  const variant = product.variants?.[0]; // default variant
  const images = variant?.images || [];

  // Process image URLs - check if they're already complete URLs or need signed URLs
  const imageUrls = await getImageUrls(images.map((img: any) => img.url));

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-muted-foreground">Home | Eyeware | {product.brand_name}</p>
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
              totalPrice={variant.price.total_price}
              mrp={variant.price.mrp}
              basePrice={variant.price.base_price}
            />

            {/* Color Selection */}
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Frame Color:{" "}
                <span className="text-muted-foreground capitalize">{variant.frame_color}</span>
              </p>
              <p className="text-sm font-medium">
                Temple Color:{" "}
                <span className="text-muted-foreground capitalize">{variant.temple_color}</span>
              </p>
            </div>

            {/* Stock Status */}
            {variant.stock.current > 0 ? (
              <p className="text-sm text-green-600 font-medium">
                In Stock ({variant.stock.current} available)
              </p>
            ) : (
              <p className="text-sm text-destructive font-medium">Out of Stock</p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                asChild
                size="lg"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Link href={`/cart/onboarding/frames/${product._id}`}>
                  Select Lenses and Purchase
                </Link>
              </Button>
              <AddToCartBtn
                productId={product._id}
                variantId={variant._id}
                productType="Product"
                btnText="Add to Cart"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Heart size={20} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 size={20} />
              </Button>
            </div>

            {/* Frame Dimensions */}
            <FrameDimensions dimensions={frameDimensions} />

            {/* Accordion Details */}
            <ProductDetailsAccordion
              material={product.material}
              shape={product.shape}
              style={product.style}
              gender={product.gender}
              sizes={product.sizes}
              isPower={product.is_Power}
            />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12">
          <TrustBadges badges={trustBadges} />
        </div>

        {/* Similar Products */}
        <SimilarProducts products={mockSimilarProducts} />
      </div>
    </div>
  );
}
