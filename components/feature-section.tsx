import Image from "next/image"
import { Button } from "@/components/ui/button"

export function FeatureSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/computer-glasses-on-dark-background-professional.jpg"
              alt="Computer glasses"
              width={400}
              height={400}
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">BLU COMPUTER GLASSES</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Blu computer glasses help reduce eye strain and enhance visual comfort during long hours of screen use.
            </p>
            <Button size="lg" className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3">
              Shop
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}