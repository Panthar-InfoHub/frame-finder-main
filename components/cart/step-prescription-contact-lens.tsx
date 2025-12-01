"use client";

import { useState } from "react";
import { getSignedUploadUrl } from "@/actions/cloud-storage";

interface StepPrescriptionContactLensProps {
  product: any;
  lensType: "toric" | "non_toric" | "multi_focal" | null;
  onBack: () => void;
  onNext: (data: any) => void;
  isSubmitting: boolean;
}

export default function StepPrescriptionContactLens({
  product,
  lensType,
  onBack,
  onNext,
  isSubmitting,
}: StepPrescriptionContactLensProps) {
  const [method, setMethod] = useState<"upload" | "manual" | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({
    rightSPH: "",
    rightCYL: "",
    rightAXIS: "",
    rightAP: "", // Add Power for multifocal
    leftSPH: "",
    leftCYL: "",
    leftAXIS: "",
    leftAP: "", // Add Power for multifocal
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, etc.)");
      return;
    }

    // Validate file size (5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const uploadPrescription = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      // Get signed URL
      const { url, path } = await getSignedUploadUrl({
        filename: file.name,
        contentType: file.type,
        rootFolder: "user",
        folderName: "prescriptions",
      });

      // Upload file to signed URL
      const uploadResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      // Pass the prescription data to next step
      onNext({
        prescriptionMethod: "upload",
        prescriptionImageKey: path,
      });
    } catch (err: any) {
      setError(err.message || "Failed to upload prescription. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = () => {
    // Validate based on lens type
    if (lensType === "toric" || lensType === "non_toric") {
      if (!form.rightSPH.trim() || !form.leftSPH.trim()) {
        setError("Please fill in spherical power for both eyes");
        return;
      }
      if (lensType === "toric") {
        if (
          !form.rightCYL.trim() ||
          !form.rightAXIS.trim() ||
          !form.leftCYL.trim() ||
          !form.leftAXIS.trim()
        ) {
          setError("Please fill in cylindrical and axis values for both eyes");
          return;
        }
      }
    } else if (lensType === "multi_focal") {
      if (
        !form.rightSPH.trim() ||
        !form.leftSPH.trim() ||
        !form.rightAP.trim() ||
        !form.leftAP.trim()
      ) {
        setError("Please fill in spherical power and add power for both eyes");
        return;
      }
    }

    const prescriptionData: any = {
      prescriptionMethod: "manual",
      rightSPH: form.rightSPH,
      leftSPH: form.leftSPH,
    };

    if (lensType === "toric") {
      prescriptionData.rightCYL = form.rightCYL;
      prescriptionData.rightAXIS = form.rightAXIS;
      prescriptionData.leftCYL = form.leftCYL;
      prescriptionData.leftAXIS = form.leftAXIS;
    } else if (lensType === "multi_focal") {
      prescriptionData.rightAP = form.rightAP;
      prescriptionData.leftAP = form.leftAP;
    }

    onNext(prescriptionData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Add Prescription</h2>
      <p className="text-gray-600 mb-6">
        Upload or manually enter your prescription details
        {lensType === "toric" && " (Toric lenses require cylindrical and axis values)"}
        {lensType === "multi_focal" && " (Multifocal lenses require spherical and add power)"}
      </p>

      {!method && (
        <div className="space-y-4">
          <button
            className="w-full border-2 border-gray-200 rounded-xl p-6 text-left hover:border-green-500 hover:bg-green-50 transition"
            onClick={() => setMethod("upload")}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Upload Prescription</div>
                <div className="text-sm text-gray-600">Upload your prescription image</div>
              </div>
            </div>
          </button>

          <button
            className="w-full border-2 border-gray-200 rounded-xl p-6 text-left hover:border-green-500 hover:bg-green-50 transition"
            onClick={() => setMethod("manual")}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Enter Manually</div>
                <div className="text-sm text-gray-600">Enter your prescription details</div>
              </div>
            </div>
          </button>

          <div className="mt-6 flex justify-between items-center">
            <button className="text-gray-600" onClick={onBack}>
              ← Back
            </button>
          </div>
        </div>
      )}

      {method === "upload" && (
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
            <div className="font-semibold">{product?.brand_name || "Contact Lens"}</div>
            <div className="text-sm text-gray-600">
              ₹
              {product?.variants?.[0]?.price?.total_price ||
                product?.variants?.[0]?.price?.base_price}
              /-
            </div>
          </div>
          {/* Right: Upload */}
          <div>
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-green-500 transition"
              onClick={() =>
                document.querySelector<HTMLInputElement>('input[type="file"]')?.click()
              }
            >
              <div className="flex justify-center mb-3">
                <svg
                  className="w-16 h-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
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
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg mt-4">
                {error}
              </div>
            )}
            <div className="flex justify-between items-center mt-4">
              <button
                className="text-gray-600"
                onClick={() => {
                  setMethod(null);
                  setFile(null);
                  setError(null);
                }}
                disabled={isUploading}
              >
                ← Back
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  isUploading
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={uploadPrescription}
                disabled={isUploading || !file}
              >
                {isUploading ? "Uploading..." : "Upload & Add to Cart →"}
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
            <div className="font-semibold">{product?.brand_name || "Contact Lens"}</div>
            <div className="text-sm text-gray-600">
              ₹
              {product?.variants?.[0]?.price?.total_price ||
                product?.variants?.[0]?.price?.base_price}
              /-
            </div>
          </div>
          {/* Right: Manual form */}
          <div>
            <div className="rounded-2xl border overflow-hidden">
              {/* For Toric lenses: SPH, CYL, Axis */}
              {lensType === "toric" && (
                <>
                  <div className="grid grid-cols-4 bg-gray-50 text-center font-semibold py-2 text-sm">
                    <div></div>
                    <div>
                      Spherical
                      <br />
                      <span className="text-xs text-gray-600">SPH</span>
                    </div>
                    <div>
                      Cylindrical
                      <br />
                      <span className="text-xs text-gray-600">CYL</span>
                    </div>
                    <div>
                      Axis
                      <br />
                      <span className="text-xs text-gray-600">0-180</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2 p-3 border-t">
                    <div className="font-medium text-sm">Right (OD)</div>
                    <input
                      type="text"
                      placeholder="e.g., -2.50"
                      value={form.rightSPH}
                      onChange={(e) => setForm({ ...form, rightSPH: e.target.value })}
                      className="border rounded-lg px-2 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="e.g., -1.25"
                      value={form.rightCYL}
                      onChange={(e) => setForm({ ...form, rightCYL: e.target.value })}
                      className="border rounded-lg px-2 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="e.g., 90"
                      value={form.rightAXIS}
                      onChange={(e) => setForm({ ...form, rightAXIS: e.target.value })}
                      className="border rounded-lg px-2 py-2 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2 p-3 border-t">
                    <div className="font-medium text-sm">Left (OS)</div>
                    <input
                      type="text"
                      placeholder="e.g., -2.75"
                      value={form.leftSPH}
                      onChange={(e) => setForm({ ...form, leftSPH: e.target.value })}
                      className="border rounded-lg px-2 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="e.g., -1.50"
                      value={form.leftCYL}
                      onChange={(e) => setForm({ ...form, leftCYL: e.target.value })}
                      className="border rounded-lg px-2 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="e.g., 85"
                      value={form.leftAXIS}
                      onChange={(e) => setForm({ ...form, leftAXIS: e.target.value })}
                      className="border rounded-lg px-2 py-2 text-sm"
                    />
                  </div>
                </>
              )}

              {/* For Non-Toric lenses: Only SPH */}
              {lensType === "non_toric" && (
                <>
                  <div className="grid grid-cols-3 bg-gray-50 text-center font-semibold py-2">
                    <div></div>
                    <div>Right Eye (OD)</div>
                    <div>Left Eye (OS)</div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2 p-4 border-t">
                    <div className="font-medium text-sm">Spherical (SPH)</div>
                    <input
                      type="text"
                      placeholder="e.g., -2.50"
                      value={form.rightSPH}
                      onChange={(e) => setForm({ ...form, rightSPH: e.target.value })}
                      className="border rounded-lg px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="e.g., -2.75"
                      value={form.leftSPH}
                      onChange={(e) => setForm({ ...form, leftSPH: e.target.value })}
                      className="border rounded-lg px-3 py-2"
                    />
                  </div>
                </>
              )}

              {/* For Multifocal lenses: SPH and Add Power */}
              {lensType === "multi_focal" && (
                <>
                  <div className="grid grid-cols-3 bg-gray-50 text-center font-semibold py-2">
                    <div></div>
                    <div>Right Eye (OD)</div>
                    <div>Left Eye (OS)</div>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2 p-4 border-t">
                    <div className="font-medium text-sm">Spherical (SPH)</div>
                    <input
                      type="text"
                      placeholder="e.g., -2.50"
                      value={form.rightSPH}
                      onChange={(e) => setForm({ ...form, rightSPH: e.target.value })}
                      className="border rounded-lg px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="e.g., -2.75"
                      value={form.leftSPH}
                      onChange={(e) => setForm({ ...form, leftSPH: e.target.value })}
                      className="border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-2 p-4 border-t">
                    <div className="font-medium text-sm">Add Power (AP)</div>
                    <input
                      type="text"
                      placeholder="e.g., +1.50"
                      value={form.rightAP}
                      onChange={(e) => setForm({ ...form, rightAP: e.target.value })}
                      className="border rounded-lg px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="e.g., +1.50"
                      value={form.leftAP}
                      onChange={(e) => setForm({ ...form, leftAP: e.target.value })}
                      className="border rounded-lg px-3 py-2"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-600 bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg">
              <p className="font-medium text-blue-900">Note:</p>
              <p>
                {lensType === "toric" &&
                  "Enter all values including cylindrical power and axis for toric lenses. Axis should be between 0-180."}
                {lensType === "non_toric" &&
                  "Enter spherical power values. Use + for farsightedness and - for nearsightedness."}
                {lensType === "multi_focal" &&
                  "Enter spherical power and add power. Add power is typically positive and represents additional magnification for reading."}
              </p>
            </div>

            {error && (
              <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div className="mt-6 flex justify-between items-center">
              <button
                className="text-gray-600"
                onClick={() => {
                  setMethod(null);
                  setForm({
                    rightSPH: "",
                    rightCYL: "",
                    rightAXIS: "",
                    rightAP: "",
                    leftSPH: "",
                    leftCYL: "",
                    leftAXIS: "",
                    leftAP: "",
                  });
                  setError(null);
                }}
                disabled={isSubmitting}
              >
                ← Back
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-white ${
                  isSubmitting
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding to Cart..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
