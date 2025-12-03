import { brands } from "@/lib/data";
import {
  frameStyles,
  frameShapes,
  frameColors,
  frameMaterials,
  genderOptions,
  frameSizes,
  accessoryTypeOptions,
  FilterOption,
  disposabilityOptions,
  lensTypeOptions,
  lensPerBoxOptions,
  lensColorOptions,
  colorLensTypeOptions,
  solutionTypeOptions,
  frameCategory,
} from "@/lib/filters/filter-data";

// Filter configuration type
export interface FilterConfig {
  id: string;
  label: string;
  paramKey: string;
  options: FilterOption[];
}

// Filter configuration for Frames page
export const framesFilterConfig: FilterConfig[] = [
  {
    id: "category",
    label: "Category",
    paramKey: "category",
    options: frameCategory,
  },
  {
    id: "brand",
    label: "Brand",
    paramKey: "brand",
    options: brands,
  },
  {
    id: "frame_style",
    label: "Frame Style",
    paramKey: "style",
    options: frameStyles,
  },
  {
    id: "frame_shape",
    label: "Frame Shape",
    paramKey: "shape",
    options: frameShapes,
  },
  {
    id: "frame_color",
    label: "Frame Color",
    paramKey: "color",
    options: frameColors,
  },
  {
    id: "frame_material",
    label: "Frame Material",
    paramKey: "material",
    options: frameMaterials,
  },
  {
    id: "gender",
    label: "Gender",
    paramKey: "gender",
    options: genderOptions,
  },
  {
    id: "frame_size",
    label: "Frame Size",
    paramKey: "size",
    options: frameSizes,
  },
];

// Filter configuration for Sunglasses page same as frames
export const sunglassesFilterConfig: FilterConfig[] = [
  //add lens color if they provide values in future
  ...framesFilterConfig,
];

// Filter configuration for Accessories page
export const accessoriesFilterConfig: FilterConfig[] = [
  {
    id: "type",
    label: "Type",
    paramKey: "type",
    options: accessoryTypeOptions,
  },
  {
    id: "brand",
    label: "Brand",
    paramKey: "brand",
    options: brands,
  },
];

// Filter configuration for Contact Lens page
export const contactLensFilterConfig: FilterConfig[] = [
  {
    id: "disposability",
    label: "Disposability",
    paramKey: "disposability",
    options: disposabilityOptions,
  },
  {
    id: "brand",
    label: "Brand",
    paramKey: "brand",
    options: brands,
  },
  {
    id: "type",
    label: "Type",
    paramKey: "type",
    options: lensTypeOptions,
  },
  {
    id: "lens_per_box",
    label: "Lens Per Box",
    paramKey: "lens_per_box",
    options: lensPerBoxOptions,
  },
];

// Filter configuration for Color Contact Lens page
export const colorContactLensFilterConfig: FilterConfig[] = [
  {
    id: "disposability",
    label: "Disposability",
    paramKey: "disposability",
    options: disposabilityOptions,
  },
  {
    id: "brand",
    label: "Brand",
    paramKey: "brand",
    options: brands,
  },
  {
    id: "type",
    label: "Type",
    paramKey: "type",
    options: colorLensTypeOptions,
  },
  {
    id: "color",
    label: "Color",
    paramKey: "color",
    options: lensColorOptions,
  },
  {
    id: "lens_per_box",
    label: "Lens Per Box",
    paramKey: "lens_per_box",
    options: lensPerBoxOptions,
  },
];

// Filter configuration for Contact Lens Solution page
export const contactLensSolutionFilterConfig: FilterConfig[] = [
  {
    id: "type",
    label: "Type",
    paramKey: "type",
    options: solutionTypeOptions,
  },
  {
    id: "brand",
    label: "Brand",
    paramKey: "brand",
    options: brands,
  },
];

// Export a function to get filter config by product type
export function getFilterConfig(productType?: string): FilterConfig[] {
  switch (productType) {
    case "frames":
      return framesFilterConfig;
    case "sunglasses":
      return sunglassesFilterConfig;
    case "accessories":
      return accessoriesFilterConfig;
    case "contactLens":
      return contactLensFilterConfig;
    case "colorContactLens":
      return colorContactLensFilterConfig;
    case "contactLensSolution":
      return contactLensSolutionFilterConfig;
    default:
      return [];
  }
}
