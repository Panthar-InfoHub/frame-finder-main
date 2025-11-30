import { Ruler } from "lucide-react"

interface FrameDimensionsProps {
  dimension: {
    lens_width: string
    bridge_width: string
    temple_length: string
    lens_height: string
  }
}

export function FrameDimensions({ dimension }: FrameDimensionsProps) {
  console.log("FrameDimensions dimension prop:", dimension);
  return (
    <div className="border rounded-lg p-4 bg-muted/30">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Ruler size={16} />
        Frame Dimensions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Lens Width</div>
          <div className="text-sm font-semibold">{dimension.lens_width} mm</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Bridge Width</div>
          <div className="text-sm font-semibold">{dimension.bridge_width} mm</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Temple Length</div>
          <div className="text-sm font-semibold">{dimension.temple_length} mm</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">Lens Height</div>
          <div className="text-sm font-semibold">{dimension.lens_height} mm</div>
        </div>
      </div>
    </div>
  )
}
