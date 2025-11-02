import { Package, RefreshCw, ShieldCheck } from "lucide-react"

interface TrustBadge {
  title: string
  icon: string
}

interface TrustBadgesProps {
  badges: TrustBadge[]
}

export function TrustBadges({ badges }: TrustBadgesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "package":
        return <Package size={32} className="text-foreground" />
      case "return":
        return <RefreshCw size={32} className="text-foreground" />
      case "warranty":
        return <ShieldCheck size={32} className="text-foreground" />
      default:
        return <Package size={32} className="text-foreground" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-border">
      {badges.map((badge, i) => (
        <div key={i} className="flex flex-col items-center text-center gap-3">
          {getIcon(badge.icon)}
          <p className="text-sm font-medium text-foreground">{badge.title}</p>
        </div>
      ))}
    </div>
  )
}
