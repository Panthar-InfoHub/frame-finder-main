interface VendorRatingGaugeProps {
  rating: number
  maxRating?: number
}

export function VendorRatingGauge({ rating, maxRating = 5 }: VendorRatingGaugeProps) {
  const percentage = (rating / maxRating) * 100
  const totalBars = 20
  const filledBars = Math.round((percentage / 100) * totalBars)

  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <div className="relative w-48 h-24">
        {/* Semi-circular gauge */}
        <div className="flex justify-center items-end h-full">
          {Array.from({ length: totalBars }).map((_, index) => {
            const angle = (index / (totalBars - 1)) * 180 - 90
            const isFilled = index < filledBars

            return (
              <div
                key={index}
                className="absolute bottom-0 origin-bottom"
                style={{
                  left: "50%",
                  transform: `rotate(${angle}deg) translateY(-40px)`,
                  transformOrigin: "bottom center",
                }}
              >
                <div
                  className={`w-1.5 h-8 rounded-full ${isFilled ? "bg-emerald-500" : "bg-gray-300"}`}
                  style={{
                    transform: "translateX(-50%)",
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Rating number in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-foreground">{rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="text-sm font-medium text-emerald-600">Vendor Rating</p>
    </div>
  )
}
    