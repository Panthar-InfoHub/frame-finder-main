"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Trash2, ShoppingCart, Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { removeFromWishlist, clearWishlist } from "@/actions/wishlist";
import { addDirectToCart, addToCartWithoutVariant } from "@/actions/cart";
import { useRouter } from "next/navigation";

interface WishlistItem {
  _id: string;
  product: {
    id: string;
    brand_name: string;
    productCode: string;
    vendorId: {
      _id: string;
      business_name: string;
      business_owner: string;
    };
  };
  onModel: string;
  images?: string[];
  price?: {
    base_price: number;
    mrp: number;
    total_price: number;
    shipping_price?: {
      custom: boolean;
      value: number;
    };
  };
  variant?: {
    frame_color?: string;
    temple_color?: string;
    lens_color?: string;
    price: {
      base_price: number;
      mrp: number;
      total_price: number;
      shipping_price: {
        custom: boolean;
        value: number;
      };
    };
    images: Array<{
      url: string;
      _id: string;
    }>;
    stock: {
      current: number;
      minimum: number;
    };
    _id: string;
  };
}

interface WishlistTabProps {
  items: WishlistItem[];
}

export function WishlistTab({ items: initialItems }: WishlistTabProps) {
  const router = useRouter();
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [movingToCartId, setMovingToCartId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);

  const handleRemove = async (itemId: string) => {
    setRemovingItemId(itemId);
    try {
      const result = await removeFromWishlist(itemId);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to remove item");
    } finally {
      setRemovingItemId(null);
    }
  };

  const handleClearAll = async () => {
    setIsClearing(true);
    try {
      const result = await clearWishlist();
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to clear wishlist");
    } finally {
      setIsClearing(false);
    }
  };

  const handleMoveToCart = async (item: WishlistItem) => {
    setMovingToCartId(item._id);
    try {
      let result;

      // Add to cart based on whether item has variant
      if (item.variant) {
        result = await addDirectToCart(item.product.id, item.variant._id, 1, item.onModel as any);
      } else {
        result = await addToCartWithoutVariant(item.product.id, 1, item.onModel as any);
      }

      if (result.success) {
        // Remove from wishlist after successfully adding to cart
        const removeResult = await removeFromWishlist(item._id);
        if (removeResult.success) {
          toast.success("Moved to cart!");
          router.refresh();
        }
      } else {
        toast.error(result.message || "Failed to add to cart");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to move to cart");
    } finally {
      setMovingToCartId(null);
    }
  };

  // Helper function to get item image
  const getItemImage = (item: WishlistItem) => {
    if (item.variant?.images?.[0]?.url) {
      return item.variant.images[0].url;
    }
    if (item.images?.[0]) {
      return item.images[0];
    }
    return "https://placehold.co/120x120/png";
  };

  // Helper function to get item price
  const getItemPrice = (item: WishlistItem) => {
    if (item.variant?.price) {
      return item.variant.price;
    }
    return item.price;
  };

  if (!initialItems || initialItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
        <p className="text-gray-500 mb-6">Add items you love to your wishlist</p>
        <Button onClick={() => router.push("/")}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with clear all button */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">
            {initialItems.length} {initialItems.length === 1 ? "item" : "items"} in your wishlist
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearAll}
          disabled={isClearing || removingItemId !== null || movingToCartId !== null}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          {isClearing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Clearing...
            </>
          ) : (
            <>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </>
          )}
        </Button>
      </div>

      {/* Wishlist Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialItems.map((item) => {
          const price = getItemPrice(item);
          const isRemoving = removingItemId === item._id;
          const isMoving = movingToCartId === item._id;
          const isDisabled = isRemoving || isMoving || isClearing;

          return (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow relative"
            >
              {/* Remove button - top right */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(item._id)}
                disabled={isDisabled}
                className="absolute top-2 right-2 text-red-600 hover:text-red-700 hover:bg-red-50 z-10"
              >
                {isRemoving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>

              {/* Product Image */}
              <div className="relative w-full aspect-square mb-4">
                <Image
                  src={getItemImage(item)}
                  alt={item.product.brand_name}
                  fill
                  className="rounded-lg object-contain bg-gray-50 p-2"
                />
              </div>

              {/* Product Details */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg line-clamp-1">{item.product.brand_name}</h3>
                <p className="text-sm text-gray-500">{item.product.productCode}</p>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.onModel}
                  </Badge>
                  {item.product.vendorId && (
                    <span className="text-xs text-gray-500">
                      by {item.product.vendorId.business_name}
                    </span>
                  )}
                </div>

                {/* Variant Details */}
                {item.variant && (
                  <div className="flex flex-wrap gap-1 text-xs">
                    {item.variant.frame_color && (
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        Frame: {item.variant.frame_color}
                      </span>
                    )}
                    {item.variant.temple_color && (
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        Temple: {item.variant.temple_color}
                      </span>
                    )}
                    {item.variant.lens_color && (
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        Lens: {item.variant.lens_color}
                      </span>
                    )}
                  </div>
                )}

                {/* Price */}
                {price && (
                  <div className="pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">
                        ₹{price.total_price?.toLocaleString() || price.base_price?.toLocaleString()}
                      </span>
                      {price.mrp && price.mrp > (price.total_price || price.base_price) && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{price.mrp.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Move to Cart Button */}
                <Button
                  onClick={() => handleMoveToCart(item)}
                  disabled={isDisabled}
                  className="w-full mt-3"
                  size="sm"
                >
                  {isMoving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Moving...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Move to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
