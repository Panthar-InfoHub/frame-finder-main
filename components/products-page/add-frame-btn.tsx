"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { addOnlyFrameToWishlist } from "@/actions/cart";
import { toast } from "sonner"; // optional if you use toast

export function AddFrameButton({ productId, variantId }: { productId: string; variantId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAdd = async () => {
    startTransition(async () => {
      const res = await addOnlyFrameToWishlist(productId, variantId, 1);
      if (res?.success) {
        toast?.success?.("Added to wishlist!");
      } else {
        toast?.error?.("Failed to add to wishlist");
      }
    });
  };

  return (
    <Button variant="outline" onClick={handleAdd} disabled={isPending} className="min-w-[130px]">
      {isPending ? "Adding..." : "Only Frame"}
    </Button>
  );
}
