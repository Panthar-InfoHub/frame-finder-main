type StepSummaryProps = {
  product: any;
  packages: any;
  data: any;
  onBack: any;
  onFinish: any;
  isSubmitting?: boolean;
};

export default function StepSummary({ product, packages, data, onBack, onFinish, isSubmitting = false }: StepSummaryProps) {
  const productImg = product?._signedImage || product?.variants?.[0]?.images?.[0]?.url || "https://placehold.co/400x300";
  const price = product?.variants?.[0]?.price?.total_price || product?.variants?.[0]?.price?.base_price;

  const prescription = data?.prescription || {};
  const selectedPackage = (packages || []).find((p: any) => p._id === data?.lensPackageId);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Confirm Your Prescription</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={productImg} alt={product?.brand_name} className="w-full h-52 object-contain bg-white rounded-xl" />
          <div className="mt-3 font-semibold">{product?.brand_name}</div>
          <div className="text-sm text-gray-600">₹{price}/-</div>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-500">Prescription</div>
              <div className="text-sm">
                {data?.lensType?.title || "—"}
              </div>
            </div>
            <div className="text-sm">
              {prescription?.method === "upload" ? (
                <div className="space-y-1">
                  <div className="font-medium">Uploaded Prescription</div>
                  <div className="text-xs text-gray-600 break-all">{prescription?.url}</div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-4 text-center bg-gray-50 rounded-lg">
                    <div></div>
                    <div className="py-2 font-semibold">SPH</div>
                    <div className="py-2 font-semibold">CYL</div>
                    <div className="py-2 font-semibold">Axis</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <div className="text-sm">Right</div>
                    <div className="text-sm">{prescription?.values?.rightSPH || "0.00"}</div>
                    <div className="text-sm">{prescription?.values?.rightCYL || "0.00"}</div>
                    <div className="text-sm">{prescription?.values?.rightAXIS || "0"}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <div className="text-sm">Left</div>
                    <div className="text-sm">{prescription?.values?.leftSPH || "0.00"}</div>
                    <div className="text-sm">{prescription?.values?.leftCYL || "0.00"}</div>
                    <div className="text-sm">{prescription?.values?.leftAXIS || "0"}</div>
                  </div>
                  <div className="text-sm">PD: {prescription?.values?.pd || "—"}</div>
                  <div className="text-sm">Under 18: {prescription?.values?.under18 ? "Yes" : "No"}</div>
                </div>
              )}
            </div>

            {selectedPackage && (
              <div className="pt-2 border-t">
                <div className="text-sm text-gray-500">Selected Package</div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">{selectedPackage.display_name}</div>
                  <div className="text-green-600 font-semibold">₹{selectedPackage?.price?.total_price || selectedPackage?.price?.base_price || "—"}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button className="text-gray-600 disabled:opacity-60" onClick={onBack} disabled={isSubmitting}>
          ← Back
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={onFinish}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add to Cart →"}
        </button>
      </div>
    </div>
  );
}
