"use client";
import { useMemo, useState } from "react";
import StepPrescription from "./step-prescription";
import { useRouter } from "next/navigation";
import { addItemToWishlist } from "@/actions/cart";
import { ProductType } from "@/types/product";
import { toast } from "sonner";

export default function AddToCartFormLens({
  product,
  productType,
}: {
  product: any;
  productType: ProductType;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prescription: null as any,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productImg = useMemo(
    () =>
      product?._signedImage ||
      product?.variants?.[0]?.images?.[0]?.url ||
      product?.images?.[0]?.url ||
      "https://placehold.co/400x300",
    [product]
  );

  const nextStep = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  const handleFinish = async () => {
    const variant = product?.variants?.[0] || product?.variant || {};
    
    // Payload only includes prescription, no lens package
    const payload = {
      item: {
        productId: product?._id,
        variantId: variant?._id || product?._id,
        quantity: 1,
        type: productType,
        prescription:
          formData?.prescription?.method === "manual"
            ? {
                ...formData.prescription.values,
                under18: formData.prescription.values?.under18 || false,
              }
            : formData?.prescription?.method === "upload"
            ? { url: formData.prescription.url }
            : {},
      },
    };
    console.log("Final Payload:", payload);
    setIsSubmitting(true);
    try {
      const resp = await addItemToWishlist(payload);
      if (!resp?.success) {
        const errorMsg = resp?.message || "Failed to add to wishlist";
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
      {step === 1 && (
        <StepPrescription
          product={product}
          onNext={nextStep}
          onBack={() => router.back()}
        />
      )}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Product card */}
            <div className="rounded-2xl border p-4">
              <div className="rounded-xl overflow-hidden bg-white mb-3">
                <img
                  src={productImg}
                  alt={product?.brand_name || product?.name}
                  className="w-full h-52 object-contain bg-white"
                />
              </div>
              <div className="font-semibold">{product?.brand_name || product?.name || "Product"}</div>
              <div className="text-sm text-gray-600">
                ₹{product?.variants?.[0]?.price?.total_price || 
                  product?.variants?.[0]?.price?.base_price || 
                  product?.price || 
                  0}/-
              </div>
            </div>
            {/* Right: Prescription summary */}
            <div className="space-y-4">
              <div className="rounded-2xl border p-4">
                <h3 className="font-semibold mb-3">Prescription</h3>
                {formData.prescription?.method === "upload" ? (
                  <div>
                    <p className="text-sm text-gray-600">Prescription uploaded</p>
                    <p className="text-xs text-gray-500 mt-1">Method: Upload</p>
                  </div>
                ) : formData.prescription?.method === "manual" ? (
                  <div className="text-sm space-y-2">
                    {formData.prescription.values?.rightSPH && (
                      <div>
                        <strong>Right Eye:</strong> SPH: {formData.prescription.values.rightSPH}
                        {formData.prescription.values.rightCYL && `, CYL: ${formData.prescription.values.rightCYL}`}
                        {formData.prescription.values.rightAXIS && `, Axis: ${formData.prescription.values.rightAXIS}`}
                      </div>
                    )}
                    {formData.prescription.values?.leftSPH && (
                      <div>
                        <strong>Left Eye:</strong> SPH: {formData.prescription.values.leftSPH}
                        {formData.prescription.values.leftCYL && `, CYL: ${formData.prescription.values.leftCYL}`}
                        {formData.prescription.values.leftAXIS && `, Axis: ${formData.prescription.values.leftAXIS}`}
                      </div>
                    )}
                    {formData.prescription.values?.pd && (
                      <div>
                        <strong>PD:</strong> {formData.prescription.values.pd}
                      </div>
                    )}
                    {formData.prescription.values?.under18 && (
                      <div className="text-xs text-orange-600">Wearer is under 18</div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No prescription added</p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={prevStep}
                  disabled={isSubmitting}
                >
                  ← Back
                </button>
                <button
                  className={`px-6 py-2 rounded-lg text-white font-medium ${
                    isSubmitting
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  onClick={handleFinish}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding to Cart..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center text-sm text-gray-500 mt-4">
        Step {step} of 2
      </div>
    </div>
  );
}

