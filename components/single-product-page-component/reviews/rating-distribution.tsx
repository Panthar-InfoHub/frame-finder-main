import { Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface RatingDistributionProps {
  distribution: Array<{
    stars: number
    count: number
    percentage: number
  }>
}

export function RatingDistribution({ distribution }: RatingDistributionProps) {
  return (
    <div className="space-y-3">
      {distribution.map((item) => (
        <div key={item.stars} className="flex items-center gap-3">
          <div className="flex items-center gap-1 w-8">
            <span className="text-sm font-medium">{item.stars}</span>
            <Star className="h-4 w-4 fill-current text-foreground" />
          </div>
          <Progress value={item.percentage} className="flex-1 h-2" />
          <span className="text-sm text-muted-foreground w-16 text-right">{(item.count / 1000).toFixed(1)}K</span>
        </div>
      ))}
    </div>
  )
}
