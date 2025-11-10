import { Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface RatingDistributionProps {
  distribution: any
  totalReviews: number
}

export function RatingDistribution({ distribution, totalReviews }: RatingDistributionProps) {
  console.log("distribution", distribution)
  console.log("totalReviews", totalReviews)
  return (
    <div className="space-y-3">
      {Object.entries(distribution).map(([stars, count]: any) => (
        <div key={stars} className="flex items-center gap-3">
          <div className="flex items-center gap-1 w-8">
            <span className="text-sm font-medium">{stars}</span>
            <Star className="h-4 w-4 fill-current text-foreground" />
          </div>
          <Progress value={(count * 100) / totalReviews} className="flex-1 h-2" />
          <span className="text-sm text-muted-foreground w-16 text-right">{count > 1000 ? `${(count / 1000).toFixed(1)}K` : count}</span>
        </div>
      ))}
    </div>
  )
}
