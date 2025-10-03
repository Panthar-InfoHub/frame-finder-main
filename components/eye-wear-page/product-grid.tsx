"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "./product-card"
import { FilterSidebar } from "./filter-sidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ChevronRight, ChevronLeft, SlidersHorizontal } from "lucide-react"
import { products, categories } from "@/lib/data"

export function ProductGrid() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000])
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const handleStyleChange = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]))
  }

  const handleMaterialChange = (material: string) => {
    setSelectedMaterials((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]))
  }

  const handleReset = () => {
    setActiveTab("all")
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedStyles([])
    setSelectedMaterials([])
    setPriceRange([0, 10000])
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Tab filter
      if (activeTab !== "all" && product.category !== activeTab) {
        return false
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false
      }

      // Style filter
      if (selectedStyles.length > 0 && !selectedStyles.includes(product.style)) {
        return false
      }

      // Material filter
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
        return false
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false
      }

      return true
    })
  }, [activeTab, selectedCategories, selectedBrands, selectedStyles, selectedMaterials, priceRange])

  const FilterContent = () => (
    <FilterSidebar
      selectedCategories={selectedCategories}
      selectedBrands={selectedBrands}
      selectedStyles={selectedStyles}
      selectedMaterials={selectedMaterials}
      priceRange={priceRange}
      onCategoryChange={handleCategoryChange}
      onBrandChange={handleBrandChange}
      onStyleChange={handleStyleChange}
      onMaterialChange={handleMaterialChange}
      onPriceChange={setPriceRange}
    />
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${
            isSidebarCollapsed ? "w-12" : "w-64"
          }`}
        >
          <div className="sticky top-8">
            <div className="flex items-center gap-2 mb-6">
              <Button
                variant="ghost"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="text-sm font-semibold p-0 h-auto hover:bg-transparent"
              >
                {isSidebarCollapsed ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <>
                    FILTER <ChevronLeft className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
            {!isSidebarCollapsed && <FilterContent />}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden bg-transparent">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  FILTER
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <div className="py-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-4 flex-1 justify-center lg:justify-start">
              <span className="font-semibold">{filteredProducts.length} PRODUCTS</span>
            </div>

            <Button variant="ghost" onClick={handleReset} className="text-sm font-semibold">
              RESET
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={activeTab === "all" ? "default" : "outline"}
              onClick={() => setActiveTab("all")}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeTab === category.value ? "default" : "outline"}
                onClick={() => setActiveTab(category.value)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Premium Banner */}
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden bg-gradient-to-r from-blue-200 to-blue-300">
            <div className="absolute inset-0 flex items-center justify-between px-8">
              <div className="w-1/2">{/* Placeholder for glasses image */}</div>
              <div className="text-right">
                <h2 className="text-3xl md:text-5xl font-bold text-neutral-800">PREMIUM</h2>
                <p className="text-lg md:text-xl text-neutral-700">QUALITY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 