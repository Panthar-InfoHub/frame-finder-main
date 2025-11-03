import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Package } from "lucide-react"

interface EmptyStateProps {
    name: string
}

export function EmptyComponent({ name }: EmptyStateProps) {
    return (
        <Empty className="from-primary/50 to-[#C8F0E1] h-full text-primary-foreground bg-linear-to-b from-30% max-w-7xl mx-auto" >
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Package />
                </EmptyMedia>
                <EmptyTitle>No {name} found</EmptyTitle>
                <EmptyDescription>
                    {`There are no ${name.toLowerCase()} to display at the moment.`}
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
