import Image from "next/image"
import Link from "next/link"
import { productCategories } from "@/lib/data"

export function ProductCategories() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12">Eyeware Glasses</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {productCategories.map((category) => (
            <Link key={category.id} href={category.href} className="flex flex-col items-center gap-4 group">
              <div className="relative w-full aspect-3/2 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-center text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
