"use client";
import { useMemo, useState } from "react";
import StepLensType from "./step-lens-type";
import StepPrescription from "./step-prescription";
import StepLensPackage from "./step-lens-package";
import StepSummary from "./step-summary";
const StepSummaryAny: any = StepSummary as any;
import { useRouter } from "next/navigation";
import { addItemToWishlist } from "@/actions/cart";
import { ProductType } from "@/types/product";

export default function AddToCartForm({
  product,
  vendorId,
  productType,
}: {
  product: any;
  vendorId?: string;
  productType: ProductType
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    lensType: null as null | { value: string; title: string },
    prescription: null as any,
    lensPackageId: null as any,
  });
  const [packages, setPackages] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const productImg = useMemo(
    () =>
      product?._signedImage ||
      product?.variants?.[0]?.images?.[0]?.url ||
      "https://placehold.co/400x300",
    [product]
  );
  const productPrice = useMemo(
    () =>
      product?.variants?.[0]?.price?.total_price ||
      product?.variants?.[0]?.price?.base_price,
    [product]
  );

  const nextStep = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  // Fetch packages lazily when moving to step 3 and we have lensType + vendorId
  const handlePackagesLoaded = (list: any[]) => {
    setPackages(list || []);
  };

  const handleFinish = async () => {
    const variant = product?.variants?.[0];
    const selectedPackage = (packages || []).find(
      (p: any) => p._id === formData.lensPackageId
    );

    const payload = {
      item: {
        productId: product?._id,
        variantId: variant?._id,
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
        lens_package_detail: selectedPackage
          ? {
              id: selectedPackage._id,
              package_type: selectedPackage.prescription_type,
              package_design: selectedPackage.lens_type,
              package_price:
                selectedPackage?.price?.total_price ||
                selectedPackage?.price?.base_price,
            }
          : undefined,
      },
    };
    console.log("Final Payload:", payload);
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const resp = await addItemToWishlist(payload);
      if (!resp?.success)
        throw new Error(resp?.message || "Failed to add to wishlist");
      // On success, navigate or show a confirmation. For now, go back to cart.
      router.push("/cart");
    } catch (err: any) {
      setSubmitError(err?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-5xl mx-auto mt-6">
      {step === 1 && (
        <StepLensType
          product={product}
          onCancel={() => router.back()}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <StepPrescription
          product={product}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <StepLensPackage
          product={product}
          vendorId={vendorId}
          productType={productType}
          lensTypeValue={formData.lensType?.value}
          onPackagesLoaded={handlePackagesLoaded}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 4 && (
        <>
          <StepSummaryAny
            product={product}
            packages={packages}
            data={formData}
            onBack={prevStep}
            onFinish={handleFinish}
            isSubmitting={isSubmitting}
          />
          {submitError && (
            <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
              {submitError}
            </div>
          )}
        </>
      )}

      <div className="flex justify-center text-sm text-gray-500 mt-4">
        Step {step} of 4
      </div>
    </div>
  );
}
