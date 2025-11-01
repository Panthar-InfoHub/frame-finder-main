"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { addDirectToWishlist } from "@/actions/cart";
import { toast } from "sonner"; // optional if you use toast
import { ProductType } from "@/types/product";

export function AddToCartBtn({
  productId,
  variantId,
  productType,
  btnText
}: {
  productId: string;
  variantId: string;
  productType: ProductType;
  btnText?: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleAdd = async () => {
    startTransition(async () => {
      const res = await addDirectToWishlist(productId, variantId, 1,productType);
      if (res?.success) {
        toast?.success?.("Added to cart!");
      } else {
        toast?.error?.("Failed to add to cart");
      }
    });
  };

  const buttonText = btnText || "Add to Cart";

  return (
    <Button
      variant="outline"
      onClick={handleAdd}
      disabled={isPending}
      className="min-w-[130px]"
    >
      {isPending ? "Adding..." : buttonText}
    </Button>
  );
}
