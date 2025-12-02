"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { addDirectToCart, addToCartWithoutVariant } from "@/actions/cart";
import { toast } from "sonner";
import { ProductType } from "@/types/product";

export function AddToCartBtn({
  productId,
  variantId,
  productType,
  btnText,
  isDisabled,
}: {
  productId: string;
  variantId?: string; // Optional for accessories
  productType: ProductType;
  btnText?: string;
  isDisabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleAdd = async () => {
    startTransition(async () => {
      let res;

      // Use appropriate function based on whether variantId is provided
      if (variantId) {
        // Products with variants (frames, sunglasses, etc.)
        res = await addDirectToCart(productId, variantId, 1, productType);
      } else {
        // Products without variants (accessories)
        res = await addToCartWithoutVariant(productId, 1, productType);
      }

      if (res?.success) {
        toast.success("Added to cart!");
      } else {
        const errorMsg = res?.message || "Failed to add to cart";
        toast.error(errorMsg);
      }
    });
  };

  
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleAdd}
      disabled={isPending || isDisabled}
      className="min-w-[130px] flex-1 bg-transparent"
    >
      {productType === "Product" || productType === "Sunglass" ? "Buy only Frame" : "Add to cart"}
    </Button>
  );
}
