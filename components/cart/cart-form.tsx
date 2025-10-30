"use client"
import { useState } from "react";
import StepLensType from "./step-lens-type";
import StepPrescription from "./step-prescription";
import StepLensPackage from "./step-lens-package";
import StepSummary from "./step-summary";

export default function AddToCartForm({ product, packages }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    lensType: null,
    prescription: null,
    lensPackageId: null,
  });

  const nextStep = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleFinish = () => {
    const variant = product?.variants?.[0];
    const selectedPackage = (packages || []).find((p: any) => p._id === formData.lensPackageId);

    const payload = {
      item: {
        productId: product?._id,
        variantId: variant?._id,
        quantity: 1,
        type: "Product",
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
              package_type: selectedPackage.prescription_type?.replace(/_/g, " "),
              package_design: selectedPackage.lens_type?.replace(/_/g, " "),
              package_price: selectedPackage?.price?.total_price || selectedPackage?.price?.base_price,
            }
          : undefined,
      },
    };
    // TODO: submit payload to API
    console.log("Final payload", payload);
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-5xl mx-auto mt-6">
      {step === 1 && <StepLensType onNext={nextStep} />}
      {step === 2 && <StepPrescription product={product} onNext={nextStep} onBack={prevStep} />}
      {step === 3 && (
        <StepLensPackage packages={packages} onNext={nextStep} onBack={prevStep} />
      )}
      {step === 4 && (
        <StepSummary product={product} packages={packages} data={formData} onBack={prevStep} onFinish={handleFinish} />
      )}

      <div className="flex justify-center text-sm text-gray-500 mt-4">Step {step} of 4</div>
    </div>
  );
}
