"use client";

import { ReactNode } from "react";
import Script from "next/script";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Load Razorpay script globally for checkout pages */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onError={(e) => {
          console.error("Failed to load Razorpay script:", e);
        }}
      />

      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        <main className="flex-1 h-full w-full">{children}</main>
      </div>
    </>
  );
}
