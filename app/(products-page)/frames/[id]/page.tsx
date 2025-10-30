import Image from "next/image";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFrameById } from "@/actions/products";
import { AddFrameButton } from "@/components/products-page/add-frame-btn";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getFrameById(id);

  if (!res?.success || !res.data) {
    return <p>{JSON.stringify(res)}</p>;
  }

  const product = res.data;
  const variant = product.variants?.[0]; // default variant
  const images = variant?.images || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left section - Images */}
        <div>
          <div className="rounded-2xl shadow-md overflow-hidden mb-4">
            <Image
              //   src={images[0]?.url || "/placeholder.jpg"}
              src={"https://placehold.co/600x400/png"}
              alt={product.brand_name}
              width={600}
              height={400}
              className="object-contain w-full h-[400px] bg-white"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {images.map((img: any, i: number) => (
              <div
                key={i}
                className="border rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-400"
              >
                <Image
                  //   src={img.url}
                  src={"https://placehold.co/120x80/png"}
                  alt={`Image ${i + 1}`}
                  width={120}
                  height={80}
                  className="object-contain w-full h-[80px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right section - Details */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.brand_name}</h1>
          <p className="text-gray-600 text-sm mb-4">{product.productCode}</p>

          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }
                fill={i < product.rating ? "currentColor" : "none"}
              />
            ))}
            <span className="text-sm text-gray-600">
              ({product.total_reviews} reviews)
            </span>
          </div>

          <p className="text-2xl font-bold mb-3">
            ₹{variant?.price?.total_price || variant?.price?.base_price}/-
          </p>
          <p className="text-sm text-gray-500 mb-6">
            MRP: ₹{variant?.price?.mrp} (Incl. of all taxes)
          </p>

          <div className="flex gap-4 mb-6">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <Link href={`/cart/onboarding/${product._id}`}>
                Select Lenses and Purchase
              </Link>
            </Button>
            <AddFrameButton productId={product._id} variantId={variant?._id} />
          </div>

          <div className="border-t pt-6 space-y-3 text-sm text-gray-700">
            <p>
              <strong>Material:</strong> {product.material.join(", ")}
            </p>
            <p>
              <strong>Shape:</strong> {product.shape.join(", ")}
            </p>
            <p>
              <strong>Style:</strong> {product.style.join(", ")}
            </p>
            <p>
              <strong>Gender:</strong> {product.gender.join(", ")}
            </p>
            <p>
              <strong>Sizes:</strong> {product.sizes.join(", ")}
            </p>
            <p>
              <strong>Vendor:</strong> {product.vendorId?.business_name} (
              {product.vendorId?.email})
            </p>
            <p>
              <strong>Status:</strong> {product.status}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-14">
        <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="border rounded-2xl shadow-sm hover:shadow-lg p-3 transition"
            >
              <Image
                src={"https://placehold.co/200x150/png"}
                alt="Similar Product"
                width={200}
                height={150}
                className="object-contain w-full h-[150px] mb-3"
              />
              <p className="text-sm text-gray-600">{product.brand_name}</p>
              <p className="font-semibold text-base">
                ₹{variant?.price?.total_price}/-
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
