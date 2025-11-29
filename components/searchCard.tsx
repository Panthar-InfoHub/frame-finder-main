"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/data";
import Image from "next/image";
import { WishlistHeartButton } from "@/components/common/wishlist-heart-button";

interface ProductCardProps {
  product: Product;
}

export function SearchCard({ product }: ProductCardProps) {
  const productPrice = product?.variants?.[0]?.price.base_price || product?.price.base_price;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border shadow-md transition-shadow duration-300 hover:shadow-lg h-full">
      <CardContent className="relative">
        <div
          className={`*:flex items-center justify-between relative ${
            product.is_Power ? "mb-15" : ""
          }`}
        >
          {product.is_Power && (
            <div className="absolute -left-10 top-0 z-10">
              <Badge className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 text-white text-sm">
                Prescription Only
              </Badge>
            </div>
          )}

          {/* Top-right wishlist heart */}
          <div className="absolute top-0 self-end right-0 z-10">
            <WishlistHeartButton
              productId={product._id}
              productType={product.type as any}
              variantId={product.variants?.[0]?._id}
              size="sm"
            />
          </div>
        </div>

        <div
          className={`aspect-[4/3] w-full rounded-xl bg-neutral-100 flex items-center justify-center relative`}
        >
          {/* Placeholder only; will be replaced with actual image later */}
          <Image
            src={product._image}
            alt={product.brand_name}
            fill
            className="object-cover h-full w-full"
          />
        </div>

        {/* Bottom content */}
        <div className="mt-4 grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-4">
          <div className="row-span-2">
            <h3 className="text-xl font-semibold leading-tight tracking-tight">
              {product.brand_name}
            </h3>
            <p className="mt-1 text-base font-semibold">{`Rs. ${productPrice}/-`}</p>
            <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
          </div>
          <span className="self-start justify-self-end text-sm font-medium text-neutral-400">{`${product.rating} Rating`}</span>
          <Button
            size="sm"
            className="self-end justify-self-end rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
            aria-label={`Add ${product.brand_name} to cart`}
          >
            Add to cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
