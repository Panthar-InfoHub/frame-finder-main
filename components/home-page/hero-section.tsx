"use client"

import Image from "next/image"
import { heroSlides } from "@/lib/data"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

export function HeroSection() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  return (
    <section className="absolute top-0 left-0 right-0 h-[100dvh] w-full overflow-hidden z-0">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full h-full"
      >
        <CarouselContent className="h-[100dvh]">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="h-[100dvh]">
              <div className="relative h-full w-full">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-xl md:text-2xl">{slide.subtitle}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
