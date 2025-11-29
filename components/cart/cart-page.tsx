"use client";

import { clearCart, removeFromCart, applyCoupon } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyComponent } from "../empty-component";
import { Trash2, Tag, Package, ShoppingBag, Info, X } from "lucide-react";
import { CouponBreakdownDialog } from "./coupon-breakdown-dialog";
import Link from "next/link";

interface PriceBreakdown {
  total_price: number;
  shipping_price: number;
  lens_package_price: number;
  sub_total: number;
}

interface CartItem {
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
  // For accessories - images and price at item level
  images?: Array<{
    url: string;
    _id: string;
  }>;
  price?: {
    base_price: number;
    mrp: number;
    total_price: number;
  };
  // For products with variants
  variant?: {
    frame_color?: string;
    temple_color?: string;
    lens_color?: string;
    price: {
      base_price: number;
      mrp: number;
      shipping_price: {
        custom: boolean;
        value: number;
      };
      total_price: number;
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
  quantity: number;
  prescription?: any;
  lens_package_detail?: {
    package_type: string;
    package_price: number;
  };
}

export default function CartPageClient({
  cartItems,
  priceBreakdown,
}: {
  cartItems: CartItem[];
  priceBreakdown: PriceBreakdown | null;
}) {
  const router = useRouter();
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleRemove = async (itemId: string) => {
    setRemovingItemId(itemId);
    try {
      const res = await removeFromCart(itemId);
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
      const res = await clearCart();
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

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);
    try {
      const result = await applyCoupon(couponCode);

      if (result.success && result.data) {
        setAppliedCoupon(result.data);
        setIsDialogOpen(true);
        toast.success("Coupon applied successfully!");
      } else {
        // Show user-friendly error message
        const errorMessage = result.message || "Invalid coupon code";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      // Fallback for unexpected errors
      toast.error("Something went wrong. Please try again.");
      console.error("Coupon application error:", error);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  // Helper function to get item price (handles both variants and accessories)
  const getItemPrice = (item: CartItem) => {
    // For products with variants
    if (item.variant) {
      return item.variant.price.total_price;
    }
    // For accessories - check item-level price first
    if (item.price?.total_price) {
      return item.price.total_price;
    }
    if (item.price?.base_price) {
      return item.price.base_price;
    }
    return 0;
  };

  // Helper function to get item MRP (handles both variants and accessories)
  const getItemMRP = (item: CartItem) => {
    // For products with variants
    if (item.variant?.price?.mrp) {
      return item.variant.price.mrp;
    }
    // For accessories - check item-level price
    if (item.price?.mrp) {
      return item.price.mrp;
    }
    return null;
  };

  // Helper function to get item image (checks all possible locations)
  const getItemImage = (item: CartItem) => {
    // First check for variant images (products with variants)
    if (item.variant?.images?.[0]?.url) {
      return item.variant.images[0].url;
    }
    // Then check for item-level images (accessories)
    if (item.images?.[0]?.url) {
      return item.images[0].url;
    }
    return "https://placehold.co/120x120/png";
  };

  // Helper function to format package type
  const formatPackageType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (!cartItems?.length) {
    return <EmptyComponent name="Your Cart is empty" />;
  }

  return (
    <div className="container mx-auto my-4 px-4 py-8 bg-white/20 backdrop-blur-sm rounded-2xl shadow-md border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-8 h-8" />
            Shopping Cart
          </h1>
          <p className="text-muted-foreground mt-2">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                disabled={isClearing || removingItemId !== null}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isClearing ? "Clearing..." : "Clear Cart"}
              </Button>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
                      <Image
                        src={getItemImage(item)}
                        alt={item.product.brand_name}
                        fill
                        className="rounded-lg object-contain bg-gray-50 p-2"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg line-clamp-1">
                            {item.product.brand_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.product.productCode}
                          </p>
                          <Badge variant="secondary" className="mt-1">
                            {item.onModel}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(item._id)}
                          disabled={removingItemId === item._id || isClearing}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {removingItemId === item._id ? (
                            <span className="text-xs">...</span>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      {/* Variant Details */}
                      {item.variant && (
                        <div className="mt-3 space-y-2">
                          <div className="flex flex-wrap gap-2 text-xs">
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
                        </div>
                      )}

                      {/* Lens Package Info */}
                      {item.lens_package_detail && (
                        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Package className="w-4 h-4 text-blue-600 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-blue-900">
                                {formatPackageType(item.lens_package_detail.package_type)}
                              </p>
                              <p className="text-xs text-blue-700 mt-1">
                                Package Price: ₹
                                {item.lens_package_detail.package_price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          {item.prescription && (
                            <div className="mt-2 pt-2 border-t border-blue-200">
                              <p className="text-xs text-blue-700 font-medium">
                                Prescription Added
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Price and Quantity */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Qty:</span>
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div className="text-right">
                          {getItemMRP(item) && (
                            <p className="text-sm text-muted-foreground line-through">
                              ₹{getItemMRP(item)?.toLocaleString()}
                            </p>
                          )}
                          <p className="text-lg font-bold text-primary">
                            ₹{getItemPrice(item).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Coupon Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Apply Coupon
                </h3>

                {appliedCoupon ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900 text-sm">
                            {appliedCoupon.coupon_code}
                          </p>
                          <p className="text-xs text-green-700">
                            Save ₹{appliedCoupon.total_discount_price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsDialogOpen(true)}
                          className="h-8 px-2"
                        >
                          <Info className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveCoupon}
                          className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1"
                        disabled={isApplyingCoupon}
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        variant="secondary"
                        disabled={isApplyingCoupon || !couponCode.trim()}
                      >
                        {isApplyingCoupon ? "Applying..." : "Apply"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Enter your coupon code to get instant discount
                    </p>
                  </>
                )}
              </div>

              {/* Price Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="font-medium">
                      ₹{priceBreakdown?.sub_total?.toLocaleString() || 0}
                    </span>
                  </div>

                  {priceBreakdown?.lens_package_price ? (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        Lens Package
                      </span>
                      <span className="font-medium">
                        ₹{priceBreakdown.lens_package_price.toLocaleString()}
                      </span>
                    </div>
                  ) : null}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      ₹{priceBreakdown?.shipping_price?.toLocaleString() || 0}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Coupon Discount ({appliedCoupon.coupon_code})
                      </span>
                      <span className="font-medium">
                        - ₹{appliedCoupon.total_discount_price.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-base">Total Amount</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹
                        {(
                          (priceBreakdown?.total_price || 0) -
                          (appliedCoupon?.total_discount_price || 0)
                        ).toLocaleString()}
                      </span>
                    </div>
                    {appliedCoupon && (
                      <div className="mt-2 text-xs text-green-600 text-right">
                        You saved ₹{appliedCoupon.total_discount_price.toLocaleString()}!
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => {
                    // Navigate to checkout with coupon in URL params (if applied)
                    // Cart data will be fetched fresh from backend on checkout page
                    if (appliedCoupon && appliedCoupon.coupon_code) {
                      router.push(
                        `/checkout?coupon=${encodeURIComponent(appliedCoupon.coupon_code)}`
                      );
                    } else {
                      router.push("/checkout");
                    }
                  }}
                  className="w-full mt-6"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon Breakdown Dialog */}
      {appliedCoupon && (
        <CouponBreakdownDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          couponData={appliedCoupon}
        />
      )}
    </div>
  );
}
