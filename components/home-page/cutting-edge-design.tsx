import Image from "next/image"

export function CuttingEdgeDesign() {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative w-full aspect-[16/5] md:aspect-[21/6] lg:aspect-[24/6] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/banner_1.png"
            alt="Cutting Edge Design Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}
