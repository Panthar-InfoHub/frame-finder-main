import Link from "next/link"
import { shapes } from "@/lib/data"

export function ShapesSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">Shapes</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {shapes.map((shape) => (
            <Link key={shape.id} href={`/shapes/${shape.id}`} className="flex flex-col items-center gap-3 group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-muted flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden">
                <div className="w-20 h-10 md:w-24 md:h-12 relative">
                  <div
                    className="absolute inset-0 border-2 border-foreground rounded-full"
                    style={{
                      clipPath:
                        "polygon(0 30%, 15% 30%, 15% 0, 35% 0, 35% 30%, 65% 30%, 65% 0, 85% 0, 85% 30%, 100% 30%, 100% 70%, 85% 70%, 85% 100%, 65% 100%, 65% 70%, 35% 70%, 35% 100%, 15% 100%, 15% 70%, 0 70%)",
                    }}
                  />
                </div>
              </div>
              <p className="text-xs md:text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors">
                {shape.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
