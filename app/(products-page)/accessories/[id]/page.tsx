import { Button } from "@/components/ui/button";
import { getAccessoriesById } from "@/actions/products";
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

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getAccessoriesById(id);

  if (!res?.success || !res.data) {
    return <p>{`product not found - ${id}`}</p>;
  }

  const product = res.data;
  console.log("Product Data:", product);

  // Process image URLs - check if they're already complete URLs or need signed URLs
  const imageUrls = await getImageUrls(product.images?.map((img: any) => img.url) || []);

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
                productId={product._id}
                variantId={""}
                productType="Accessories"
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
