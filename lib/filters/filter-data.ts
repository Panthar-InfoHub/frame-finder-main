
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
  displayOnly?: boolean; // If true, shows as text only (not clickable)
}


// Frame-specific filters

export const frameCategory: FilterOption[] = [
  { label: "Eyeglasses", value: "eyeglasses" },
  { label: "Sunglasses", value: "sunglasses" },
  { label: "Frames", value: "frames" },
];

export const frameStyles: FilterOption[] = [
  { label: "Full Frame", value: "Full Frame" },
  { label: "Half Frame", value: "Half Frame" },
  { label: "Frameless", value: "Frameless" },
];

export const frameShapes: FilterOption[] = [
  { label: "Aviator", value: "Aviator" },
  { label: "Cat-Eye", value: "Cat-Eye" },
  { label: "Sporty", value: "Sporty" },
  { label: "Geometric", value: "Geometric" },
  { label: "Navigator", value: "navigator" },
  { label: "Oval", value: "Oval" },
  { label: "Rectangle", value: "Rectangle" },
  { label: "Round", value: "Round" },
  { label: "Square", value: "Square" },
  { label: "Way-Farer", value: "Way-Farer" },
  { label: "Hexagon", value: "Hexagon" },
];

export const frameColors: FilterOption[] = [
  { label: "Orange", value: "Orange" },
  { label: "Purple", value: "Purple" },
  { label: "Yellow", value: "Yellow" },
  { label: "Black", value: "Black" },
  { label: "Blue", value: "Blue" },
  { label: "Green", value: "Green" },
  { label: "Grey", value: "Grey" },
  { label: "Brown", value: "Brown" },
  { label: "Pink", value: "Pink" },
  { label: "Red", value: "Red" },
  { label: "Transparent", value: "Transparent" },
  { label: "Multicolor", value: "Multicolor" },
  { label: "Gun metal", value: "Gun metal" },
  { label: "Gold", value: "Gold" },
  { label: "Silver", value: "Silver" },
  { label: "Rose Gold", value: "Rose Gold" },
  { label: "Double Color", value: "Double Color" },
];

export const frameMaterials: FilterOption[] = [
  { label: "Plastic", value: "Plastic" },
  { label: "TR-90", value: "TR-90" },
  { label: "Polycarbonate", value: "Polycarbonate" },
  { label: "Acetate", value: "Acetate" },
  { label: "Metal", value: "Metal" },
  { label: "Stainless Steel", value: "Satinless Steel" },
  { label: "Titanium", value: "titanium" },
];

export const genderOptions: FilterOption[] = [
  { label: "All", value: "All" },
  { label: "Men", value: "Men" },
  { label: "Women", value: "Women" },
  { label: "Unisex", value: "Unisex" },
  { label: "Kids", value: "kids" },
];

export const frameSizes: FilterOption[] = [
  { label: "Small", value: "Small" },
  { label: "Medium", value: "Medium" },
  { label: "Large", value: "Large" },
  { label: "Ultra Large", value: "Ultra Large" },
];

// Contact Lens filters
export const disposabilityOptions: FilterOption[] = [
  { label: "Daily", value: "Daily" },
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Yearly", value: "yearly" },
  { label: "Quaterly", value: "Quaterly" },
];

export const lensTypeOptions: FilterOption[] = [
  { label: "Spherical/ Non-Toric", value: "Spherical/ Non-Toric" },
  { label: "Toric", value: "Toric" },
  { label: "Multi-Focal", value: "Multi-Focal" },
];

export const lensPerBoxOptions: FilterOption[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "10", value: "10" },
  { label: "15", value: "15" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
];

// Color Contact Lens filters
export const lensColorOptions: FilterOption[] = [
  { label: "Aqua", value: "Aqua" },
  { label: "Clear", value: "Clear" },
  { label: "Hazel", value: "Hazel" },
  { label: "Purple", value: "Purple" },
  { label: "Violet", value: "Violet" },
  { label: "Green", value: "Green" },
  { label: "Blue", value: "Blue" },
  { label: "Grey", value: "Grey" },
  { label: "Brown", value: "Brown" },
  { label: "Pink", value: "Pink" },
  { label: "Topaz", value: "Topaz" },
  { label: "Turquoise", value: "Turquoise" },
];

export const colorLensTypeOptions: FilterOption[] = [
  { label: "Zero power", value: "Zero power" },
  { label: "Spherical/ Non-Toric", value: "Spherical/ Non-Toric" },
];

// Lens Solution filters
export const solutionTypeOptions: FilterOption[] = [
  { label: "Solutions", value: "Solutions", displayOnly: true },
];
// accessories filters
export const accessoryTypeOptions: FilterOption[] = [
  { label: "Accessories", value: "Accessories", displayOnly: true },
];
