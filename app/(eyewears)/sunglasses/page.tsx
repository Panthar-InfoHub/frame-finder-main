import { HeroSection } from "@/components/eye-wear-page/hero-section"
import { ProductGrid } from "@/components/eye-wear-page/product-grid"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { getAllSunglasses } from "@/actions/products"

export default async function Sunglasses() {

  const response = await getAllSunglasses();

  if (!response.success){
    return <p>Error : failed to load the page</p>
  }
  console.log(response.data);
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductGrid />
      <Footer />
    </main>
  )
} 