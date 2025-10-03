import { HeroSection } from "@/components/eye-wear-page/hero-section"
import { ProductGrid } from "@/components/eye-wear-page/product-grid"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductGrid />
      <Footer />
    </main>
  )
}