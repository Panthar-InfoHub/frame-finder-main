export default function StepLensType({ onNext, onCancel, product }) {
  const options = [
    {
      id: "single_vision",
      title: "Single Vision",
      desc: "For distance or near vision (like reading glasses)",
      img: "https://placehold.co/120x80",
    },
    {
      id: "bi_focal",
      title: "Bi-Focal",
      desc: "For distance and near vision in one lens",
      img: "https://placehold.co/120x80",
    },
    {
      id: "multi_focal",
      title: "Progressive (Multi-Focal)",
      desc: "For distance, intermediate, and near vision",
      img: "https://placehold.co/120x80",
    },
  ];

  const handleSelect = (opt) => {
    onNext({ lensType: { value: opt.id, title: opt.title } });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Lens Type</h2>
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
        {/* Right: Options + Cancel */}
        <div>
          <div className="grid grid-cols-1 gap-4">
            {options.map((opt) => (
              <div
                key={opt.id}
                className="p-4 border rounded-xl hover:border-green-500 cursor-pointer transition bg-white"
                onClick={() => handleSelect(opt)}
              >
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={opt.img} alt={opt.title} className="h-16 w-20 object-cover rounded-md bg-white" />
                  <div>
                    <h3 className="font-medium">{opt.title}</h3>
                    <p className="text-sm text-gray-500">{opt.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <button className="text-gray-600" onClick={onCancel}>Cancel</button>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
