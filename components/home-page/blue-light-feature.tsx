import Image from "next/image"
import { Button } from "@/components/ui/button"

export function BlueLightFeature() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="bg-card rounded-lg overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2 items-center gap-0">
            {/* Left side - Image */}
            <div className="relative h-64 md:h-96 lg:h-[500px] bg-linear-to-b from-muted via-muted-foreground/20 to-muted-foreground/40">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/home-page/blue-computer-glasses.png"
                    alt="Blue light blocking glasses"
                    fill
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="relative p-8 md:p-12 lg:p-16 bg-background">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">BLU COMPUTER GLASSES</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                Blu computer glasses help reduce eye strain and enhance visual comfort during long hours of screen use.
              </p>
              <Button size="lg" variant="outline" className="px-12 bg-transparent">
                Shop
              </Button>
              {/* Decorative stars */}
              <div className="absolute top-8 right-8 w-2 h-2 bg-orange-500 rounded-full" />
              <div className="absolute bottom-12 right-12 w-2 h-2 bg-orange-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
