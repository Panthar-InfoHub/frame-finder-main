import { useEffect, useState, useTransition } from "react";
import { getLensPackages } from "@/actions/cart";

export default function StepLensPackage({
  onNext,
  onBack,
  product,
  vendorId,
  lensTypeValue,
  onPackagesLoaded,
  productType,
}) {
  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    if (!(vendorId && lensTypeValue)) return;
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    startTransition(async () => {
      try {
        const resp = await getLensPackages(
          vendorId,
          lensTypeValue,
          productType
        );
        if (cancelled) return;
        console.log("Lens Packages Response:", resp);
        if (!resp?.success)
          throw new Error(resp?.message || "Failed to load lens packages");
        const raw = (resp as any)?.data;
        const arr = Array.isArray(raw)
          ? raw
          : raw && Array.isArray((raw as any).lensPackages)
          ? (raw as any).lensPackages
          : [];
        const list = arr.map((pkg: any) => ({
          ...pkg,
          _signedImage:
            pkg?._signedImage ||
            pkg?.images?.[0]?.url ||
            "https://placehold.co/120x80",
        }));
        setPackages(list);
        onPackagesLoaded?.(list);
      } catch (err: any) {
        if (!cancelled) setError(err?.message || "Something went wrong");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  };

  useEffect(() => {
    const cancel = load();
    return cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorId, lensTypeValue]);

  const handleSelect = (pkg) => {
    onNext({ lensPackageId: pkg._id });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose Lens Package</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Product card */}
        <div className="rounded-2xl border p-4">
          <div className="rounded-xl overflow-hidden bg-white mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                product?._signedImage ||
                product?.variants?.[0]?.images?.[0]?.url ||
                "https://placehold.co/400x300"
              }
              alt={product?.brand_name}
              className="w-full h-52 object-contain bg-white"
            />
          </div>
          <div className="font-semibold">{product?.brand_name || "Frame"}</div>
          <div className="text-sm text-gray-600">
            ₹
            {product?.variants?.[0]?.price?.total_price ||
              product?.variants?.[0]?.price?.base_price}
            /-
          </div>
        </div>

        {/* Right: Package list */}
        <div>
          {isLoading && (
            <div className="space-y-3" aria-busy="true" aria-live="polite">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="p-4 border rounded-2xl bg-white animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-28 rounded-xl bg-gray-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 bg-gray-100 rounded" />
                      <div className="h-3 w-1/2 bg-gray-100 rounded" />
                      <div className="h-3 w-2/3 bg-gray-100 rounded" />
                    </div>
                    <div className="h-4 w-16 bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div
              className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-4"
              role="alert"
            >
              <div className="font-medium mb-2">Unable to load packages</div>
              <div className="text-sm mb-3">{error}</div>
              <button
                className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm"
                onClick={load}
              >
                Try again
              </button>
            </div>
          )}

          {!isLoading && !error && (
            <>
              {!packages || packages.length === 0 ? (
                <div className="rounded-xl border p-4 text-sm text-gray-700 bg-gray-50">
                  No lens packages found for the selected lens type.
                </div>
              ) : (
                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
                  {(packages || []).map((pkg: any) => (
                    <div
                      key={pkg._id}
                      className="p-4 border rounded-2xl hover:border-green-500 cursor-pointer"
                      onClick={() => handleSelect(pkg)}
                    >
                      <div className="flex items-center gap-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={
                            pkg?._signedImage ||
                            pkg?.images?.[0]?.url ||
                            "https://placehold.co/120x80"
                          }
                          alt={pkg.display_name}
                          className="h-20 w-28 object-cover rounded-xl bg-white"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{pkg.display_name}</h3>
                          <p className="text-xs text-gray-600">
                            {pkg.brand_name} • Index {pkg.index}
                          </p>
                          <ul className="mt-1 text-xs text-gray-600 list-disc pl-5">
                            <li>
                              Prescription:{" "}
                              {pkg.prescription_type?.replace(/_/g, " ")}
                            </li>
                            <li>
                              Lens Type: {pkg.lens_type?.replace(/_/g, " ")}
                            </li>
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
              )}
            </>
          )}

          <div className="flex justify-between mt-6">
            <button className="text-gray-600" onClick={onBack}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
