import { Ruler } from "lucide-react"

interface FrameDimension {
  label: string
  value: string
  icon: string
}

interface FrameDimensionsProps {
  dimensions: FrameDimension[]
}

export function FrameDimensions({ dimensions }: FrameDimensionsProps) {
  return (
    <div className="border rounded-lg p-4 bg-muted/30">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Ruler size={16} />
        Frame Dimensions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dimensions.map((dim, i) => (
          <div key={i} className="text-center">
            <div className="text-xs text-muted-foreground mb-1">{dim.label}</div>
            <div className="text-sm font-semibold">{dim.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
