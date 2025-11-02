interface Prescription {
  right_eye: {
    spherical: number
    cylindrical: number
    axis: number
  }
  left_eye: {
    spherical: number
    cylindrical: number
    axis: number
  }
  pd: number
}

interface PrescriptionsTabProps {
  prescription: Prescription
}

export function PrescriptionsTab({ prescription }: PrescriptionsTabProps) {
  return (
    <div className="space-y-4">
      <div className="border-2 border-[#00AA78] rounded-2xl p-8">
        <h3 className="text-xl font-semibold mb-6 text-black">Prescription Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Right Eye */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-[#00AA78] mb-3">Right Eye</h4>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Spherical:</span> {prescription.right_eye.spherical}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Cylindrical:</span> {prescription.right_eye.cylindrical}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Axis:</span> {prescription.right_eye.axis}°
              </p>
            </div>
          </div>

          {/* Left Eye */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-[#00AA78] mb-3">Left Eye</h4>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Spherical:</span> {prescription.left_eye.spherical}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Cylindrical:</span> {prescription.left_eye.cylindrical}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Axis:</span> {prescription.left_eye.axis}°
              </p>
            </div>
          </div>
        </div>

        {/* PD */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-700">
            <span className="font-medium">Pupillary Distance (PD):</span> {prescription.pd} mm
          </p>
        </div>
      </div>
    </div>
  )
}
