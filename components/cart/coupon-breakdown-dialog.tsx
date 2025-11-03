"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, Store, Tag } from "lucide-react";

interface CouponBreakdownDialogProps {
  isOpen: boolean;
  onClose: () => void;
  couponData: any;
}

export function CouponBreakdownDialog({
  isOpen,
  onClose,
  couponData,
}: CouponBreakdownDialogProps) {
  if (!couponData) return null;

  const { coupon, items_breakdown, total_discount_price } = couponData;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Tag className="w-6 h-6 text-primary" />
            Coupon Applied Successfully!
          </DialogTitle>
          <DialogDescription>
            {couponData.message || `${coupon.code} has been applied to your cart`}
          </DialogDescription>
        </DialogHeader>

        {/* Coupon Details */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-semibold text-green-900 text-lg">{coupon.code}</p>
              <p className="text-sm text-green-700">
                {coupon.type === "percentage" ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-700">Total Savings</p>
              <p className="text-2xl font-bold text-green-900">
                ₹{total_discount_price.toLocaleString()}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="mt-2">
            {coupon.scope === "vendor" ? "Vendor Specific" : "Global Coupon"}
          </Badge>
        </div>

        {/* Items Breakdown by Vendor */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Discount Breakdown</h3>
          
          {items_breakdown.map((vendorBreakdown: any, index: number) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${
                vendorBreakdown.is_coupon_vendor
                  ? "bg-green-50 border-green-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              {/* Vendor Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">{vendorBreakdown.vendor.business_name}</p>
                    <p className="text-xs text-gray-500">
                      by {vendorBreakdown.vendor.business_owner}
                    </p>
                  </div>
                </div>
                {vendorBreakdown.is_coupon_vendor && (
                  <Badge className="bg-green-600">
                    <Check className="w-3 h-3 mr-1" />
                    Eligible
                  </Badge>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-2 mb-3">
                {vendorBreakdown.items.map((item: any, itemIndex: number) => (
                  <div
                    key={itemIndex}
                    className="flex justify-between items-center text-sm bg-white rounded p-2"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-xs text-gray-500">
                        {item.product_snapshot.productCode} • Qty: {item.quantity}
                      </p>
                      {item.lens_package_detail && (
                        <p className="text-xs text-blue-600">
                          + {item.lens_package_detail.package_type}
                        </p>
                      )}
                    </div>
                    <p className="font-medium">₹{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-3" />

              {/* Vendor Summary */}
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{vendorBreakdown.sub_total.toLocaleString()}</span>
                </div>
                {vendorBreakdown.is_coupon_vendor && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Discount</span>
                    <span>- ₹{vendorBreakdown.discount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total Discount Summary */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total Discount Applied</span>
            <span className="text-2xl font-bold text-primary">
              - ₹{total_discount_price.toLocaleString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
