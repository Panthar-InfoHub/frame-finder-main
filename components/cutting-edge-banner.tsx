import Image from "next/image"

export function CuttingEdgeBanner() {
  return (
    <section className="bg-gray-100">
      <div className="h-1 bg-blue-400"></div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">CUTTING</h2>
              <p className="text-lg text-gray-600">EDGE DESIGN</p>
            </div>
          </div>

          {/* Right side - Glasses image */}
          <div className="relative">
            <Image
              src="/stylish-tortoiseshell-glasses-on-crossed-arms-mini.jpg"
              alt="Cutting edge design glasses"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}