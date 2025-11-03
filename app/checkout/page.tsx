import { getWishlist, applyCoupon } from "@/actions/cart";
import { CheckoutPageClient } from "@/components/checkout/checkout-page";
import { redirect } from "next/navigation";

interface CheckoutPageProps {
  searchParams: Promise<{ coupon?: string }>;
}

export default async function Checkout({ searchParams }: CheckoutPageProps) {
  // Await searchParams (Next.js 15+)
  const params = await searchParams;

  // Fetch fresh cart data from backend
  const wishlist = await getWishlist();

  // Extract items and price breakdown
  const items = wishlist?.items || [];
  const priceBreakdown = wishlist?.price_breakdown || null;

  // Redirect to cart if empty
  if (!items || items.length === 0) {
    redirect("/cart");
  }

  // Fetch coupon data if coupon code is in URL
  let couponData = null;
  if (params.coupon && params.coupon !== "undefined") {
    try {
      console.log("📍 Applying coupon from URL:", params.coupon);
      const result = await applyCoupon(params.coupon);
      console.log("📍 Coupon API result:", result);
      console.log("📍 result.data content:", JSON.stringify(result.data, null, 2));

      if (result.success && result.data) {
        // Extract coupon code from API response structure
        couponData = {
          coupon_code: result.data.coupon?.code || params.coupon, // From result.data.coupon.code
          total_discount_price: result.data.total_discount_price,
          vendors: result.data.items_breakdown || [],
        };
        console.log("✅ Coupon data set:", couponData);
      } else {
        console.log("❌ Coupon validation failed:", result.message);
      }
    } catch (error) {
      console.error("❌ Error applying coupon:", error);
      // Coupon invalid or expired, will show without discount
    }
  } else {
    console.log("ℹ️ No coupon in URL params");
  } // Prepare checkout data
  const checkoutData = {
    priceBreakdown: priceBreakdown || {
      sub_total: 0,
      shipping_price: 0,
      lens_package_price: 0,
      total_price: 0,
    },
    totalItems: items.length,
    appliedCoupon: couponData,
  };

  return <CheckoutPageClient initialCheckoutData={checkoutData} />;
}
