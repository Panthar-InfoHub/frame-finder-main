"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronUp } from "lucide-react"
import { brands, styles, materials, categories } from "@/lib/data"

interface FilterSidebarProps {
  selectedCategories: string[]
  selectedBrands: string[]
  selectedStyles: string[]
  selectedMaterials: string[]
  priceRange: number[]
  onCategoryChange: (category: string) => void
  onBrandChange: (brand: string) => void
  onStyleChange: (style: string) => void
  onMaterialChange: (material: string) => void
  onPriceChange: (price: number[]) => void
}

export function FilterSidebar({
  selectedCategories,
  selectedBrands,
  selectedStyles,
  selectedMaterials,
  priceRange,
  onCategoryChange,
  onBrandChange,
  onStyleChange,
  onMaterialChange,
  onPriceChange,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    style: true,
    material: true,
    price: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="font-semibold text-lg">Filters</div>

      {/* Category Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full font-medium text-left"
        >
          Category
          {expandedSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.category && (
          <div className="space-y-2 pl-1">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.value}`}
                  checked={selectedCategories.includes(category.value)}
                  onCheckedChange={() => onCategoryChange(category.value)}
                />
                <Label htmlFor={`category-${category.value}`} className="text-sm font-normal cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("brand")}
          className="flex items-center justify-between w-full font-medium text-left"
        >
          Brand
          {expandedSections.brand ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.brand && (
          <div className="space-y-2 pl-1">
            {brands.map((brand) => (
              <div key={brand.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.value}`}
                  checked={selectedBrands.includes(brand.value)}
                  onCheckedChange={() => onBrandChange(brand.value)}
                />
                <Label htmlFor={`brand-${brand.value}`} className="text-sm font-normal cursor-pointer">
                  {brand.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Style Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("style")}
          className="flex items-center justify-between w-full font-medium text-left"
        >
          Style
          {expandedSections.style ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.style && (
          <div className="space-y-2 pl-1">
            {styles.map((style) => (
              <div key={style.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`style-${style.value}`}
                  checked={selectedStyles.includes(style.value)}
                  onCheckedChange={() => onStyleChange(style.value)}
                />
                <Label htmlFor={`style-${style.value}`} className="text-sm font-normal cursor-pointer">
                  {style.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Material Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("material")}
          className="flex items-center justify-between w-full font-medium text-left"
        >
          Material
          {expandedSections.material ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.material && (
          <div className="space-y-2 pl-1">
            {materials.map((material) => (
              <div key={material.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`material-${material.value}`}
                  checked={selectedMaterials.includes(material.value)}
                  onCheckedChange={() => onMaterialChange(material.value)}
                />
                <Label htmlFor={`material-${material.value}`} className="text-sm font-normal cursor-pointer">
                  {material.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full font-medium text-left"
        >
          Price Range
          {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.price && (
          <div className="space-y-4 pl-1">
            <div className="text-sm text-muted-foreground">
              Rs. {priceRange[0]} - Rs. {priceRange[1]}
            </div>
            <Slider
              value={priceRange}
              onValueChange={onPriceChange}
              min={0}
              max={10000}
              step={500}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  )
}
