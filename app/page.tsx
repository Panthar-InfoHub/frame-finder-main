import { TopBanner } from "@/components/home-page/top-banner"
import { Navigation } from "@/components/home-page/navigation"
import { HeroSection } from "@/components/home-page/hero-section"
import { ProductCategories } from "@/components/home-page/product-categories"
import { TopOurPicks } from "@/components/home-page/top-picks"
import { SunGlassesSection } from "@/components/home-page/sun-glasses-section"
import { CuttingEdgeDesign } from "@/components/home-page/cutting-edge-design"
import { BlueLightFeature } from "@/components/home-page/blue-light-feature"
import { FeaturedVendors } from "@/components/home-page/featured-vendors"
import { ShapesSection } from "@/components/home-page/shapes-section"
import { Footer } from "@/components/home-page/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <div className="relative">
        <Navigation />
        <HeroSection />
      </div>
      <main className="flex-1">
        <ProductCategories />
        <TopOurPicks />
        <CuttingEdgeDesign />
        <SunGlassesSection />
        <BlueLightFeature />
        <ShapesSection />
        <FeaturedVendors />
      </main>
      <Footer />
    </div>
  )
}
