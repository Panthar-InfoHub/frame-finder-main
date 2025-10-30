export default function StepLensType({ onNext }) {
  const options = [
    {
      id: "single",
      title: "Single Vision",
      desc: "For distance or near vision (like reading glasses)",
    },
    {
      id: "bifocal",
      title: "Bi-Focal",
      desc: "For distance and near vision in one lens",
    },
    {
      id: "progressive",
      title: "Progressive",
      desc: "For distance, intermediate, and near vision",
    },
  ];

  const handleSelect = (type) => {
    onNext({ lensType: type });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Lens Type</h2>
      <div className="space-y-3">
        {options.map((opt) => (
          <div
            key={opt.id}
            className="p-4 border rounded-xl hover:border-green-500 cursor-pointer transition"
            onClick={() => handleSelect(opt)}
          >
            <h3 className="font-medium">{opt.title}</h3>
            <p className="text-sm text-gray-500">{opt.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
