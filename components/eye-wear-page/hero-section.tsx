export function HeroSection() {
  return (
    <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-neutral-800">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 z-0">
        {/* Placeholder for hero image */}
        <div className="w-full h-full bg-gradient-to-br from-neutral-700 to-neutral-900" />
      </div>
      <div className="relative z-20 flex items-center justify-center h-full">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider">EYEWARE GLASSES</h1>
      </div>
    </section>
  )
}