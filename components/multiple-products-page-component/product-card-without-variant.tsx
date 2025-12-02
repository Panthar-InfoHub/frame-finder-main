"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/data";
import Image from "next/image";
import { ShareButton } from "../share-component";
import Link from "next/link";
import { WishlistHeartButton } from "@/components/common/wishlist-heart-button";

interface ProductCardProps {
  product: Product;
  productType: string;
}

export function ProductCard({ product, productType }: ProductCardProps) {

  const productPrice = product.price.base_price;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border shadow-md transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="relative p-5">
        <div className="felx items-center justify-between relative mb-15">
          {(productType === "sunglasses" || productType === "frames") && (
            <>
              {product.is_Power ? (
                <div className="absolute -left-10 top-0 z-10">
                  <Badge className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 text-white text-sm">
                    Prescription Only
                  </Badge>
                </div>
              ) : (
                <div className="absolute -left-10 top-0 z-10">
                  <Badge className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 text-white text-sm">
                    Non-prescription
                  </Badge>
                </div>
              )}
            </>
          )}
          
          <div className="absolute right-5 top-5 z-10">
            <WishlistHeartButton
              productId={product._id}
              productType={product.type as any}
              size="sm"
            />
          </div>

        </div>
       

        <div
          className={`aspect-4/3 w-full rounded-xl bg-neutral-100 flex items-center justify-center relative`}
        >
          {/* Placeholder only; will be replaced with actual image later */}
          <Image
            src={product._image}
            alt="Accessories"
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
            <p className="text-sm text-muted-foreground">
              Inclusive of all taxes
            </p>
          </div>
          <span className="self-start justify-self-end text-sm font-medium text-neutral-400">{`${product.rating} Rating`}</span>
          <Link
            href={`/${productType}/${product._id}?variantId=${product?.variants?.[0]?._id}`}
            key={product._id}
          >
            <Button
              size="sm"
              className="self-end justify-self-end rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
              aria-label={`Add ${product.brand_name} to cart`}
            >
              View details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
