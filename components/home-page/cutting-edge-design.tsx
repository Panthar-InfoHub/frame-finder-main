import Image from "next/image"

export function CuttingEdgeDesign() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative bg-card rounded-lg overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2 items-center">
            {/* Left side - Text */}
            <div className="relative p-8 md:p-12 lg:p-16 bg-gradient-to-br from-primary/10 to-background">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2">CUTTING</h2>
                <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium">EDGE DESIGN</p>
              </div>
              {/* Diagonal accent line */}
              <div className="absolute top-0 right-0 w-32 h-3 bg-primary" />
            </div>

            {/* Right side - Image */}
            <div className="relative h-64 md:h-80 lg:h-96 bg-muted">
              <div className="absolute inset-0 bg-gradient-to-l from-muted-foreground/5 to-transparent" />
              <Image
                src="/tortoiseshell-eyeglasses-modern-design.jpg"
                alt="Cutting edge eyeglass design"
                fill
                className="object-contain p-8"
              />
              {/* Diagonal geometric element */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent transform -skew-x-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
