import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LensPowerSelectorProps {
  lensPowers: string[]
}

export function LensPowerSelector({ lensPowers }: LensPowerSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Lens Power</h3>
      <Select>
        <SelectTrigger className="w-full h-12 rounded-full border-2 border-border hover:border-foreground transition-colors">
          <SelectValue placeholder="Select your power" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {lensPowers.map((power) => (
            <SelectItem key={power} value={power} className="cursor-pointer text-base py-3">
              {power}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
