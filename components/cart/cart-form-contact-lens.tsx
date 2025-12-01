"use client";
import { useState } from "react";
import StepPrescriptionContactLens from "./step-prescription-contact-lens";
import { useRouter } from "next/navigation";
import { addItemToCart } from "@/actions/cart";
import { toast } from "sonner";

export default function AddToCartFormContactLens({ product }: { product: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get lens_type from product
  const lensType =
    product?.lens_type || product?.variant?.lens_type || product?.variants?.[0]?.lens_type;

  // Validate lens_type
  const validLensTypes = ["toric", "non_toric", "multi_focal"];
  if (!lensType || !validLensTypes.includes(lensType)) {
    return (
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-5xl mx-auto mt-6">
        <div className="text-center py-12">
          <p className="text-gray-600">
            This product does not have a valid lens type configuration.
          </p>
          <button
            className="mt-4 text-green-600 hover:text-green-700"
            onClick={() => router.back()}
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleFinish = async (prescriptionData: any) => {
    const variant = product?.variants?.[0] || product?.variant || {};

    // Build prescription object based on method and lens type
    let prescription = {};

    if (prescriptionData) {
      if (prescriptionData.prescriptionMethod === "upload") {
        prescription = { url: prescriptionData.prescriptionImageKey };
      } else if (prescriptionData.prescriptionMethod === "manual") {
        prescription = {
          rightSPH: prescriptionData.rightSPH,
          leftSPH: prescriptionData.leftSPH,
        };

        if (lensType === "toric") {
          prescription = {
            ...prescription,
            rightCYL: prescriptionData.rightCYL,
            rightAXIS: prescriptionData.rightAXIS,
            leftCYL: prescriptionData.leftCYL,
            leftAXIS: prescriptionData.leftAXIS,
          };
        } else if (lensType === "multi_focal") {
          prescription = {
            ...prescription,
            rightAP: prescriptionData.rightAP,
            leftAP: prescriptionData.leftAP,
          };
        }
      }
    }

    const payload = {
      item: {
        productId: product?._id,
        variantId: variant?._id || product?._id,
        quantity: 1,
        type: "ContactLens" as const,
        lensType: lensType,
        prescription,
      },
    };

    console.log("Final Payload:", payload);
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
      <StepPrescriptionContactLens
        product={product}
        lensType={lensType}
        onNext={handleFinish}
        onBack={() => router.back()}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
