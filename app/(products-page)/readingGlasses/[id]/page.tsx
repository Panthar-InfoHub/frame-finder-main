import Image from "next/image";
import { Star } from "lucide-react";
import { getReaderById } from "@/actions/products";
import { AddToCartBtn } from "@/components/products-page/add-to-cart-btn";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getReaderById(id);

  if (!res?.success || !res.data) {
    return <p>{`product not found - ${id}`}</p>;
  }

  const product = res.data;
  const variant = product.variants?.[0] || product.variant || {};
  const images = variant?.images || product.images || [];

  // Safely extract price information
  const price = variant?.price?.total_price || variant?.price?.base_price || product.price || 0;
  const mrp = variant?.price?.mrp || product.mrp || price;
  const brandName = product.brand_name || product.name || "Product";
  const productCode = product.productCode || product.code || "";
  const rating = product.rating || 0;
  const totalReviews = product.total_reviews || 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left section - Images */}
        <div>
          <div className="rounded-2xl shadow-md overflow-hidden mb-4">
            <Image
              src={"https://placehold.co/600x400/png"}
              alt={brandName}
              width={600}
              height={400}
              className="object-contain w-full h-[400px] bg-white"
            />
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img: any, i: number) => (
                <div
                  key={i}
                  className="border rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400"
                >
                  <Image
                    src={"https://placehold.co/120x80/png"}
                    alt={`Image ${i + 1}`}
                    width={120}
                    height={80}
                    className="object-contain w-full h-[80px]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right section - Details */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">{brandName}</h1>
          {productCode && <p className="text-gray-600 text-sm mb-4">{productCode}</p>}

          {rating > 0 && (
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < rating ? "text-yellow-400" : "text-gray-300"}
                  fill={i < rating ? "currentColor" : "none"}
                />
              ))}
              {totalReviews > 0 && (
                <span className="text-sm text-gray-600">({totalReviews} reviews)</span>
              )}
            </div>
          )}

          <p className="text-2xl font-bold mb-3">₹{price.toLocaleString()}/-</p>
          {mrp && mrp > price && (
            <p className="text-sm text-gray-500 mb-6">
              MRP: ₹{mrp.toLocaleString()} (Incl. of all taxes)
            </p>
          )}

          <div className="flex gap-4 mb-6">
            <AddToCartBtn 
              productId={product._id} 
              variantId={variant?._id || variant?._id || product._id} 
              productType="Reader" 
            />
          </div>

          <div className="border-t pt-6 space-y-3 text-sm text-gray-700">
            {product.material && (
              <p>
                <strong>Material:</strong> {Array.isArray(product.material) ? product.material.join(", ") : product.material}
              </p>
            )}
            {product.shape && (
              <p>
                <strong>Shape:</strong> {Array.isArray(product.shape) ? product.shape.join(", ") : product.shape}
              </p>
            )}
            {product.style && (
              <p>
                <strong>Style:</strong> {Array.isArray(product.style) ? product.style.join(", ") : product.style}
              </p>
            )}
            {product.description && (
              <p>
                <strong>Description:</strong> {product.description}
              </p>
            )}
            {product.status && (
              <p>
                <strong>Status:</strong> {product.status}
              </p>
            )}
            {product.createdAt && (
              <p>
                <strong>Created:</strong> {new Date(product.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

