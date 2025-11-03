"use client";

import { clearWishlist, removeFromWishlist } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyComponent } from "../empty-component";

export default function CartPageClient({ wishlist }: { wishlist: any[] }) {
  const router = useRouter();
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const handleRemove = async (itemId: string) => {
    setRemovingItemId(itemId);
    try {
      const res = await removeFromWishlist(itemId);
      if (res?.success) {
        toast.success("Item removed from cart");
        router.refresh();
      } else {
        const errorMsg = res?.message || "Failed to remove item";
        toast.error(errorMsg);
      }
    } catch (error: any) {
      const errorMsg = error?.message || "Failed to remove item";
      toast.error(errorMsg);
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleClear = async () => {
    setIsClearing(true);
    try {
      const res = await clearWishlist();
      if (res?.success) {
        toast.success("Cart cleared successfully");
        router.refresh();
      } else {
        const errorMsg = res?.message || "Failed to clear cart";
        toast.error(errorMsg);
      }
    } catch (error: any) {
      const errorMsg = error?.message || "Failed to clear cart";
      toast.error(errorMsg);
    } finally {
      setIsClearing(false);
    }
  };

  if (!wishlist?.length) {
    return (
      <EmptyComponent name="Cart" />
    );
  }

  return (
    <div className="max-w-5xl w-full grid md:grid-cols-3 gap-8 bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow min-h-[70vh]">
      {/* Left section */}
      <div className="md:col-span-2 flex flex-col">
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[60vh]">
          {wishlist.map((item: any) => (
            <div
              key={item.variant._id}
              className="flex flex-col sm:flex-row gap-4 border p-4 rounded-lg bg-white shadow-sm"
            >
              <Image
                src={"https://placehold.co/100x100/png"}
                alt={item.product.brand_name}
                width={100}
                height={100}
                className="rounded-lg object-contain"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.brand_name}</h3>
                <p className="text-sm text-gray-500">{item.product.productCode}</p>
                <p className="mt-2 font-medium text-primary">
                  ₹{item.variant.price.base_price.toLocaleString()}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemove(item._id)}
                disabled={removingItemId === item._id || isClearing}
              >
                {removingItemId === item._id ? "Removing..." : "Remove"}
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="mt-4"
          onClick={handleClear}
          disabled={isClearing || removingItemId !== null}
        >
          {isClearing ? "Clearing..." : "Clear Cart"}
        </Button>
      </div>

      {/* Bill details */}
      <div className="border p-4 rounded-lg bg-white h-fit">
        <h3 className="font-semibold mb-3">Bill Details</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>Total Items: {wishlist.length}</p>
          <p>
            Total Price: ₹
            {wishlist
              .reduce((sum: number, item: any) => sum + item.variant.price.base_price, 0)
              .toLocaleString()}
          </p>
        </div>
        <Button className="w-full mt-4">Proceed to Checkout</Button>
      </div>
    </div>
  );
}
