import { HeroSection } from "@/components/hero-section"
import { TopPicks } from "@/components/top-picks"
import { CuttingEdgeBanner } from "@/components/cutting-edge-banner"
import { CategorySection } from "@/components/category-section"
import { FeatureSection } from "@/components/feature-section"
import { Footer } from "@/components/footer"
import { eyewareCategories, sunglassCategories } from "@/lib/data"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategorySection title="Eyeware Glasses" categories={eyewareCategories} />
      <TopPicks />
      <CuttingEdgeBanner />
      <CategorySection title="Sun Glasses" categories={sunglassCategories} showSeeMore={true} />
      <FeatureSection />
      <Footer />
    </div>
  )
}