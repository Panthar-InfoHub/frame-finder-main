import Link from "next/link"
import { sunglassesCategories } from "@/lib/data"

export function SunGlassesSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Sun Glasses</h2>
          <Link
            href="/sunglasses"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:underline text-sm md:text-base"
          >
            See More
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {sunglassesCategories.map((category) => (
            <Link
              key={category.id}
              href={`/sunglasses/${category.id}`}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-muted flex items-center justify-center transition-transform group-hover:scale-105">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-foreground rounded-sm flex items-center justify-center">
                  <div className="w-12 h-3 md:w-16 md:h-4 bg-background rounded-full" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
