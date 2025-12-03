"use client";
import { useMemo, useState } from "react";
import StepPrescriptionColorContactLens from "./step-prescription-color-contact-lens";
import { useRouter } from "next/navigation";
import { addItemToCart } from "@/actions/cart";
import { toast } from "sonner";

export default function AddToCartFormColorContactLens({ product }: { product: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinish = async (prescriptionData: any) => {
    const variant = product?.variants?.[0] || product?.variant || {};

    // Build prescription object based on method
    let prescription = {};

    if (prescriptionData) {
      if (prescriptionData.prescriptionMethod === "upload") {
        prescription = { url: prescriptionData.prescriptionImageKey };
      } else if (prescriptionData.prescriptionMethod === "manual") {
        prescription = {
          rightSPH: prescriptionData.rightSPH,
          leftSPH: prescriptionData.leftSPH,
        };
      }
    }

    const payload = {
      item: {
        productId: product?._id,
        variantId: variant?._id || product?._id,
        quantity: 1,
        type: "ColorContactLens" as const,
        prescription,
      },
    };

    setIsSubmitting(true);
    try {
      const resp = await addItemToCart(payload);
      if (!resp.success) {
        const errorMsg = resp?.message || "Failed to add to cart";
        toast.error(errorMsg);
        return;
      }
      toast.success("Product added to cart successfully!");
      router.push("/cart");
    } catch (err: any) {
      const errorMsg = err?.message || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-5xl mx-auto mt-6">
      <StepPrescriptionColorContactLens
        product={product}
        onNext={handleFinish}
        onBack={() => router.back()}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
