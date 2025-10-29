"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { brands, styles, materials, categories } from "@/lib/data"

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000])

  const handleCategoryChange = (value: string) => {
    setSelectedCategories((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  const handleBrandChange = (value: string) => {
    setSelectedBrands((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  const handleStyleChange = (value: string) => {
    setSelectedStyles((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  const handleMaterialChange = (value: string) => {
    setSelectedMaterials((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  return (
    <div className="space-y-6">
      <div className="font-semibold text-lg">Filters</div>

      {/* Category Filter */}
      <div className="space-y-3">
        <div className="font-medium">Category</div>
        <div className="space-y-2 pl-1">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.value}`}
                checked={selectedCategories.includes(category.value)}
                onCheckedChange={() => handleCategoryChange(category.value)}
              />
              <Label htmlFor={`category-${category.value}`} className="text-sm font-normal cursor-pointer">
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-3">
        <div className="font-medium">Brand</div>
        <div className="space-y-2 pl-1">
          {brands.map((brand) => (
            <div key={brand.value} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.value}`}
                checked={selectedBrands.includes(brand.value)}
                onCheckedChange={() => handleBrandChange(brand.value)}
              />
              <Label htmlFor={`brand-${brand.value}`} className="text-sm font-normal cursor-pointer">
                {brand.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Style Filter */}
      <div className="space-y-3">
        <div className="font-medium">Style</div>
        <div className="space-y-2 pl-1">
          {styles.map((style) => (
            <div key={style.value} className="flex items-center space-x-2">
              <Checkbox
                id={`style-${style.value}`}
                checked={selectedStyles.includes(style.value)}
                onCheckedChange={() => handleStyleChange(style.value)}
              />
              <Label htmlFor={`style-${style.value}`} className="text-sm font-normal cursor-pointer">
                {style.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div className="space-y-3">
        <div className="font-medium">Material</div>
        <div className="space-y-2 pl-1">
          {materials.map((material) => (
            <div key={material.value} className="flex items-center space-x-2">
              <Checkbox
                id={`material-${material.value}`}
                checked={selectedMaterials.includes(material.value)}
                onCheckedChange={() => handleMaterialChange(material.value)}
              />
              <Label htmlFor={`material-${material.value}`} className="text-sm font-normal cursor-pointer">
                {material.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <div className="font-medium">Price Range</div>
        <div className="space-y-4 pl-1">
          <div className="text-sm text-muted-foreground">
            Rs. {priceRange[0]} - Rs. {priceRange[1]}
          </div>
          <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={10000} step={500} className="w-full" />
        </div>
      </div>
    </div>
  )
}
