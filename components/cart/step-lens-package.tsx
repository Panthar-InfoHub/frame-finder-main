export default function StepLensPackage({ onNext, onBack, packages }) {
  const handleSelect = (pkg) => {
    onNext({ lensPackageId: pkg._id });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose Lens Package</h2>

      <div className="space-y-3">
        {(packages || []).map((pkg: any) => (
          <div
            key={pkg._id}
            className="p-4 border rounded-2xl hover:border-green-500 cursor-pointer"
            onClick={() => handleSelect(pkg)}
          >
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pkg?._signedImage || pkg?.images?.[0]?.url || "https://placehold.co/120x80"}
                alt={pkg.display_name}
                className="h-20 w-28 object-cover rounded-xl bg-white"
              />
              <div className="flex-1">
                <h3 className="font-medium">{pkg.display_name}</h3>
                <p className="text-xs text-gray-600">{pkg.brand_name} • Index {pkg.index}</p>
                <ul className="mt-1 text-xs text-gray-600 list-disc pl-5">
                  <li>Prescription: {pkg.prescription_type?.replace(/_/g, " ")}</li>
                  <li>Lens Type: {pkg.lens_type?.replace(/_/g, " ")}</li>
                  <li>Warranty: {pkg.duration} months</li>
                </ul>
              </div>
              <span className="text-green-600 font-semibold whitespace-nowrap">
                ₹{pkg?.price?.total_price || pkg?.price?.base_price}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button className="text-gray-600" onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}

