"use client";

import { createOrder } from "@/actions/cart";
import { createRazorpayOrder, getRazorpayKey } from "@/actions/payment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  Loader2,
  Map,
  MapPin,
  Navigation,
  Package,
  Phone,
  ShoppingBag,
  Tag,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Declare Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CheckoutPageClientProps {
  initialCheckoutData: {
    priceBreakdown: {
      sub_total: number;
      shipping_price: number;
      lens_package_price: number;
      total_price: number;
    };
    appliedCoupon: {
      coupon_code: string;
      total_discount_price: number;
      vendors: any[];
    } | null;
    totalItems: number;
  };
}

export function CheckoutPageClient({ initialCheckoutData }: CheckoutPageClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"shipping" | "payment" | "summary">("shipping");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    address_line_1: "",
    city: "",
    state: "",
    landmark: "",
  });

  // Use checkout data directly from server (includes coupon from URL params)
  const checkoutData = initialCheckoutData;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async (orders: any[]): Promise<boolean> => {
    try {
      // Get Razorpay key
      const razorpayKey = await getRazorpayKey();
      if (!razorpayKey) {
        toast.error("Payment configuration error");
        setIsSubmitting(false);
        return false;
      }

      // Create Razorpay order
      const razorpayOrderResult = await createRazorpayOrder({
        orders: orders,
      });

      if (!razorpayOrderResult.success) {
        toast.error(razorpayOrderResult.message || "Failed to create payment order");
        setIsSubmitting(false);
        return false;
      }

      const { razorpay_order_id, amount, currency } = razorpayOrderResult.data;

      // Configure Razorpay options
      const options = {
        key: razorpayKey,
        amount: amount * 100, // Amount in paise
        currency: currency,
        name: "Frame Finder",
        description: `Payment for Order`,
        order_id: razorpay_order_id,
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: "#3399cc",
        },
        handler: async function (response: any) {
          console.log("Razorpay payment response:", response);
          toast.success("Order Placed Successfully! 🎉");
          router.push("/account?tab=orders");
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
            setIsSubmitting(false);
          },
        },
      };

      // Open Razorpay payment modal
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
        return true;
      } else {
        toast.error("Payment gateway not loaded. Please refresh and try again.");
        setIsSubmitting(false);
        return false;
      }
    } catch (error) {
      console.error("Razorpay payment error:", error);
      toast.error("Failed to initiate payment");
      setIsSubmitting(false);
      return false;
    }
  };

  const handleContinue = async () => {
    // Validate required fields
    const requiredFields = ["pincode", "address_line_1", "city", "state", "name", "phone"] as const;

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    // Validate phone number (10 digits)
    if (formData.phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    // Validate pincode (6 digits)
    if (formData.pincode.length !== 6) {
      toast.error("Pincode must be 6 digits");
      return;
    }

    // Prepare data in backend format
    const backendData = {
      pincode: formData.pincode,
      address_line_1: formData.address_line_1,
      city: formData.city,
      state: formData.state,
      name: formData.name,
      phone: formData.phone,
      ...(formData.landmark && { landmark: formData.landmark }),
    };

    // Prepare order data for backend API (only coupon_code and shipping_address)
    const orderData = {
      shipping_address: backendData,
      ...(checkoutData?.appliedCoupon && {
        coupon_code: checkoutData.appliedCoupon.coupon_code,
      }),
    };

    // Submit order to backend
    setIsSubmitting(true);
    try {
      const result = await createOrder(orderData);

      if (result.success) {
        // Order created successfully, now initiate payment
        const orders = result.data.orders;
        console.log("📍 Created orders:", orders);

        // Check if Razorpay is loaded (check window.Razorpay directly)
        if (!window.Razorpay) {
          toast.error("Payment gateway not loaded. Please refresh and try again.");
          setIsSubmitting(false);
          return;
        }

        // Initiate Razorpay payment
        const paymentSuccess = await handleRazorpayPayment(orders);

        // If payment didn't initiate successfully, reset loading state
        if (!paymentSuccess) {
          setIsSubmitting(false);
        }
      } else {
        toast.error(result.message || "Failed to create order");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Order creation error:", error);
      setIsSubmitting(false);
    }
  };

  // Calculate bill details from checkout data
  const billDetails = {
    totalItemPrice: checkoutData.priceBreakdown.total_price,
    totalDiscount: checkoutData.appliedCoupon?.total_discount_price || 0,
    totalPayable:
      checkoutData.priceBreakdown.total_price -
      (checkoutData.appliedCoupon?.total_discount_price || 0),
    subTotal: checkoutData.priceBreakdown.sub_total,
    shippingPrice: checkoutData.priceBreakdown.shipping_price,
    lensPackagePrice: checkoutData.priceBreakdown.lens_package_price,
    totalItems: checkoutData.totalItems,
    couponCode: checkoutData.appliedCoupon?.coupon_code,
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
          <p className="text-muted-foreground mt-2">Complete your order in a few simple steps</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {checkoutData.appliedCoupon && (
              <div className="inline-flex items-center gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full">
                <Tag className="w-3 h-3" />
                <span>Coupon {checkoutData.appliedCoupon.coupon_code} applied</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Add Delivery Address</h2>
                  <p className="text-sm text-muted-foreground">Enter your shipping details</p>
                </div>
              </div>

              <Separator className="mb-6" />

              <form className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="h-12 text-base"
                    aria-required="true"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      +91
                    </span>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="10-digit phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="h-12 text-base pl-14"
                      maxLength={10}
                      aria-required="true"
                    />
                  </div>
                </div>

                {/* Pincode */}
                <div className="space-y-2">
                  <Label htmlFor="pincode" className="text-sm font-medium flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-primary" />
                    Pincode <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="6-digit pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                    className="h-12 text-base"
                    maxLength={6}
                    aria-required="true"
                  />
                </div>

                {/* Address Line 1 */}
                <div className="space-y-2">
                  <Label
                    htmlFor="address_line_1"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-primary" />
                    House Number, Building Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address_line_1"
                    type="text"
                    placeholder="House number, Building Name"
                    value={formData.address_line_1}
                    onChange={(e) => handleInputChange("address_line_1", e.target.value)}
                    className="h-12 text-base"
                    aria-required="true"
                  />
                </div>

                {/* City & State - Two Column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium flex items-center gap-2">
                      <Map className="w-4 h-4 text-primary" />
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="h-12 text-base"
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium flex items-center gap-2">
                      <Map className="w-4 h-4 text-primary" />
                      State <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="h-12 text-base"
                      aria-required="true"
                    />
                  </div>
                </div>

                {/* Landmark (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="landmark" className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Landmark <span className="text-xs text-muted-foreground">(Optional)</span>
                  </Label>
                  <Input
                    id="landmark"
                    type="text"
                    placeholder="E.g., Near City Mall"
                    value={formData.landmark}
                    onChange={(e) => handleInputChange("landmark", e.target.value)}
                    className="h-12 text-base"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="button"
                    onClick={handleContinue}
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin mr-2" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        Place Order
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Section - Bill Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Cart Summary */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Order Summary</h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Subtotal ({billDetails.totalItems} items)
                    </span>
                    <span className="font-medium">₹{billDetails.subTotal.toLocaleString()}</span>
                  </div>

                  {billDetails.lensPackagePrice > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        Lens Package
                      </span>
                      <span className="font-medium">
                        ₹{billDetails.lensPackagePrice.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      ₹{billDetails.shippingPrice.toLocaleString()}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Price</span>
                    <span className="font-medium">
                      ₹{billDetails.totalItemPrice.toLocaleString()}
                    </span>
                  </div>

                  {billDetails.totalDiscount > 0 && (
                    <>
                      <div className="flex justify-between items-center text-green-600">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          Coupon Discount {billDetails.couponCode && `(${billDetails.couponCode})`}
                        </span>
                        <span className="font-medium">
                          - ₹{billDetails.totalDiscount.toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="flex justify-between items-center text-lg font-bold pt-2">
                    <span>Total Payable</span>
                    <span className="text-primary">
                      ₹{billDetails.totalPayable.toLocaleString()}
                    </span>
                  </div>
                </div>

                {billDetails.totalDiscount > 0 && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium text-center">
                      🎉 You saved ₹{billDetails.totalDiscount.toLocaleString()} on this order!
                    </p>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-900">
                  <strong>Note:</strong> All orders are processed within 1-2 business days. You will
                  receive a confirmation email once your order is shipped.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export as CheckoutPage for backward compatibility
export { CheckoutPageClient as CheckoutPage };
