import { Card } from "@/components/ui/card"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"
import { vendors } from "@/lib/data"

export function FeaturedVendors() {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Vendors</h2>
          <p className="text-muted-foreground">Trusted Partners bringing you quality eyewear</p>
        </div>

        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-6 min-w-max pb-4">
            {vendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="p-6 hover:shadow-lg transition-shadow w-[340px] md:w-[380px] flex-shrink-0"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {vendor.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1">{vendor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{vendor.rating}</p>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{vendor.review}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{vendor.location}</span>
                  </div>
                  <Link href="#" className="text-cyan-600 hover:text-cyan-700 font-medium text-sm">
                    Visit Store
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
