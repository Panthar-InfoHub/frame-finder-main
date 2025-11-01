"use client";
import { useMemo, useState } from "react";
import { getSignedUploadUrl } from "@/actions/cloud-storage";

type Props = {
  onNext: (data: any) => void;
  onBack: () => void;
};

export default function StepPrescription({ onNext, onBack, product }: Props & { product: any }) {
  const [method, setMethod] = useState<"upload" | "manual" | null>(null);
  const [form, setForm] = useState({
    rightSPH: "",
    rightCYL: "",
    rightAXIS: "",
    leftSPH: "",
    leftCYL: "",
    leftAXIS: "",
    pd: "",
    under18: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleSubmit = () => {
    onNext({ prescription: { method: "manual", values: form } });
  };

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selected = e.target.files?.[0] || null;
    if (!selected) {
      setFile(null);
      return;
    }
    if (!selected.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, or similar).");
      e.target.value = "";
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError("Max file size is 5MB.");
      e.target.value = "";
      return;
    }
    setFile(selected);
  };

  const uploadPrescription = async () => {
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }
    setIsUploading(true);
    setError(null);
    try {
      const { url, path } = await getSignedUploadUrl({
        filename: file.name,
        contentType: file.type,
        rootFolder: "user",
        folderName: "prescriptions",
      });

      const putResp = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!putResp.ok) {
        throw new Error("Upload failed. Please try again.");
      }

      onNext({ prescription: { method: "upload", url: path } });
    } catch (err: any) {
      setError(err?.message || "Something went wrong while uploading.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Add Your Prescription</h2>

      {!method && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Product card */}
          <div className="rounded-2xl border p-4">
            <div className="rounded-xl overflow-hidden bg-white mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product?._signedImage || product?.variants?.[0]?.images?.[0]?.url || "https://placehold.co/400x300"} alt={product?.brand_name} className="w-full h-52 object-contain bg-white" />
            </div>
            <div className="font-semibold">{product?.brand_name || "Frame"}</div>
            <div className="text-sm text-gray-600">₹{product?.variants?.[0]?.price?.total_price || product?.variants?.[0]?.price?.base_price}/-</div>
          </div>
          {/* Right: Choose method */}
          <div>
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-2xl border p-5 flex items-center gap-4 hover:border-green-500 cursor-pointer" onClick={() => setMethod("upload")}>
                <div className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">⬆</div>
                <div>
                  <div className="font-medium">Upload Prescription</div>
                  <div className="text-xs text-gray-500">Upload a clear photo of your prescription.</div>
                </div>
                <div className="ml-auto">›</div>
              </div>
              <div className="rounded-2xl border p-5 flex items-center gap-4 hover:border-green-500 cursor-pointer" onClick={() => setMethod("manual")}>
                <div className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">✎</div>
                <div>
                  <div className="font-medium">Fill it out Manually</div>
                  <div className="text-xs text-gray-500">Enter your prescription details manually.</div>
                </div>
                <div className="ml-auto">›</div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button className="text-gray-600" onClick={onBack}>← Back</button>
              <div />
            </div>
          </div>
        </div>
      )}

      {method === "upload" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Product card */}
          <div className="rounded-2xl border p-4">
            <div className="rounded-xl overflow-hidden bg-white mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product?._signedImage || product?.variants?.[0]?.images?.[0]?.url || "https://placehold.co/400x300"} alt={product?.brand_name} className="w-full h-52 object-contain bg-white" />
            </div>
            <div className="font-semibold">{product?.brand_name || "Frame"}</div>
            <div className="text-sm text-gray-600">₹{product?.variants?.[0]?.price?.total_price || product?.variants?.[0]?.price?.base_price}/-</div>
          </div>
          {/* Right: Uploader */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-dashed p-8 text-center hover:border-green-500 transition bg-white">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 8L12 4L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 16V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm text-gray-700">Drag and drop your prescription image here</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB. Only one image.</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <label className="inline-flex cursor-pointer items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                  Choose Image
                  <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                </label>
                {file && (
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setError(null);
                    }}
                    className="text-sm text-gray-700 hover:text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
              {file && (
                <div className="mt-4 flex items-center justify-center">
                  <span className="max-w-[80%] truncate rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                    {file.name}
                  </span>
                </div>
              )}
              {previewUrl && (
                <div className="mt-6 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Selected prescription preview"
                    className="h-44 w-auto rounded-xl border object-contain bg-gray-50"
                  />
                </div>
              )}
            </div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}
            <div className="flex justify-between items-center">
              <button
                className="text-gray-600"
                onClick={onBack}
                disabled={isUploading}
              >
                ← Back
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  isUploading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={uploadPrescription}
                disabled={isUploading || !file}
              >
                {isUploading ? "Uploading..." : "Upload & Continue →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {method === "manual" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Product card */}
          <div className="rounded-2xl border p-4">
            <div className="rounded-xl overflow-hidden bg-white mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product?._signedImage || product?.variants?.[0]?.images?.[0]?.url || "https://placehold.co/400x300"} alt={product?.brand_name} className="w-full h-52 object-contain bg-white" />
            </div>
            <div className="font-semibold">{product?.brand_name || "Frame"}</div>
            <div className="text-sm text-gray-600">₹{product?.variants?.[0]?.price?.total_price || product?.variants?.[0]?.price?.base_price}/-</div>
          </div>
          {/* Right: Manual form */}
          <div>
            <div className="rounded-2xl border overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 text-center font-semibold py-2">
                <div></div>
                <div>SPH</div>
                <div>CYL</div>
                <div>Axis</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-2 p-3 border-t">
                <div className="font-medium text-sm">OD Right Eye</div>
                <input value={form.rightSPH} onChange={(e) => setForm({ ...form, rightSPH: e.target.value })} className="border rounded-lg px-2 py-2" />
                <input value={form.rightCYL} onChange={(e) => setForm({ ...form, rightCYL: e.target.value })} className="border rounded-lg px-2 py-2" />
                <input value={form.rightAXIS} onChange={(e) => setForm({ ...form, rightAXIS: e.target.value })} className="border rounded-lg px-2 py-2" />
              </div>
              <div className="grid grid-cols-4 items-center gap-2 p-3 border-t">
                <div className="font-medium text-sm">OS Left Eye</div>
                <input value={form.leftSPH} onChange={(e) => setForm({ ...form, leftSPH: e.target.value })} className="border rounded-lg px-2 py-2" />
                <input value={form.leftCYL} onChange={(e) => setForm({ ...form, leftCYL: e.target.value })} className="border rounded-lg px-2 py-2" />
                <input value={form.leftAXIS} onChange={(e) => setForm({ ...form, leftAXIS: e.target.value })} className="border rounded-lg px-2 py-2" />
              </div>
              <div className="grid grid-cols-4 items-center gap-2 p-3 border-t">
                <div className="font-medium text-sm">PD Pupillary Distance</div>
                <input placeholder="Enter your PD" value={form.pd} onChange={(e) => setForm({ ...form, pd: e.target.value })} className="col-span-3 border rounded-lg px-2 py-2" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={form.under18} onChange={(e) => setForm({ ...form, under18: e.target.checked })} />
                Wearer is under 18 years old
              </label>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button className="text-gray-600" onClick={onBack}>← Back</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={handleSubmit}>Continue →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
