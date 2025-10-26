export const siteConfig = {
  name: "Frame Finder",
  description: "Premium eyewear collection",
  colors: {
    primary: "#10B981", // Green from screenshots
    secondary: "#6B7280",
    accent: "#F3F4F6",
  },
}

export const navigationItems = [
  { name: "EYEGLASSES", href: "/eyeglasses" },
  { name: "COMPUTER GLASSES", href: "/computer-glasses" },
  { name: "SUNGLASSES", href: "/sunglasses" },
  { name: "POWER SUNGLASSES", href: "/power-sunglasses" },
  { name: "CONTACT LENSES", href: "/contact-lenses" },
  { name: "ACCESSORIES", href: "/accessories" },
  { name: "User", href: "/user" },
]

export const topPicks = [
  {
    id: 1,
    name: "Tecla",
    price: 5000,
    rating: 4.5,
    colors: ["#EF4444", "#000000"],
    image: "/black-rimless-glasses.jpg",
  },
  {
    id: 2,
    name: "Tecla",
    price: 5000,
    rating: 4.5,
    colors: ["#06B6D4", "#000000"],
    image: "/colorful-rainbow-frame-glasses.jpg",
  },
  {
    id: 3,
    name: "Tecla",
    price: 5000,
    rating: 4.5,
    colors: ["#84CC16", "#000000"],
    image: "/gray-metallic-glasses.jpg",
  },
  {
    id: 4,
    name: "Tecla",
    price: 5000,
    rating: 4.5,
    colors: ["#EF4444", "#000000"],
    image: "/black-rimless-glasses.jpg",
  },
  {
    id: 5,
    name: "Tecla",
    price: 5000,
    rating: 4.5,
    colors: ["#06B6D4", "#000000"],
    image: "/colorful-rainbow-frame-glasses.jpg",
  },
  {
    id: 6,
    name: "Tecla",
    price: 5000,
    rating: 4.5,
    colors: ["#84CC16", "#000000"],
    image: "/gray-metallic-glasses.jpg",
  },
]

export const eyewareCategories = [
  {
    name: "Rimless Glasses",
    image: "/rimless-glasses-icon.jpg",
  },
  {
    name: "Transparent Frame",
    image: "/transparent-frame-glasses.jpg",
  },
  {
    name: "Rich Acetate eyeglass",
    image: "/acetate-frame-glasses.jpg",
  },
  {
    name: "Blue Computer Glasses",
    image: "/blue-light-blocking-glasses.png",
  },
  {
    name: "Metalwork",
    image: "/metal-frame-glasses.jpg",
  },
]

export const sunglassCategories = [
  {
    name: "Rimless Glasses",
    image: "/rimless-sunglasses.jpg",
  },
  {
    name: "Transparent Frame",
    image: "/transparent-sunglasses.jpg",
  },
  {
    name: "Rich Acetate eyeglass",
    image: "/acetate-sunglasses.jpg",
  },
  {
    name: "Blue Computer Glasses",
    image: "/blue-tinted-sunglasses.jpg",
  },
  {
    name: "Metalwork",
    image: "/metal-frame-sunglasses.jpg",
  },
]

export const footerData = {
  shop: [
    { name: "Eyeglasses", href: "/eyeglasses" },
    { name: "SunGlasses", href: "/sunglasses" },
    { name: "Collections", href: "/collections" },
    { name: "Size Guide", href: "/size-guide" },
  ],
  aboutUs: [
    { name: "Our Story", href: "/our-story" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
    { name: "Store Locator", href: "/store-locator" },
  ],
  information: [
    { name: "Help", href: "/help" },
    { name: "Shipping Handling", href: "/shipping" },
    { name: "Exchange & Returns", href: "/returns" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  contact: {
    phone: "+91 - 9999999999",
    chatText: "Chat with us",
  },
  socialLinks: [
    { name: "Instagram", href: "#", icon: "instagram" },
    { name: "LinkedIn", href: "#", icon: "linkedin" },
    { name: "Pinterest", href: "#", icon: "pinterest" },
    { name: "Twitter", href: "#", icon: "twitter" },
  ],
}

export const navigationMenuData = {
  EYEGLASSES: {
    type: "mega",
    sections: [
      {
        title: "Gender",
        type: "image-list",
        items: [
          {
            name: "Men",
            href: "/eyeglasses/men",
            image: "/professional-man-wearing-glasses.jpg",
          },
          {
            name: "Women",
            href: "/eyeglasses/women",
            image: "/professional-woman-wearing-glasses.jpg",
          },
          {
            name: "Kids",
            href: "/eyeglasses/kids",
            image: "/placeholder-kkch7.png",
          },
        ],
      },
      {
        title: "Frame Type",
        type: "text-list",
        items: [
          { name: "Rectangle Frame", href: "/eyeglasses/rectangle" },
          { name: "Square Frame", href: "/eyeglasses/square" },
          { name: "Round Frame", href: "/eyeglasses/round" },
          { name: "Cat-Eye Frame", href: "/eyeglasses/cat-eye" },
          { name: "Oval Frame", href: "/eyeglasses/oval" },
        ],
      },
      {
        title: "Style",
        type: "text-list",
        items: [
          { name: "Rimmed", href: "/eyeglasses/rimmed" },
          { name: "Semi-Rimmed", href: "/eyeglasses/semi-rimmed" },
          { name: "Rimless", href: "/eyeglasses/rimless" },
        ],
      },
    ],
    featuredImage: "/stylish-eyeglasses-on-elegant-background.jpg",
  },
  "COMPUTER GLASSES": {
    type: "simple",
    items: [
      { name: "Blue Light Blocking", href: "/computer-glasses/blue-light" },
      { name: "Anti-Glare", href: "/computer-glasses/anti-glare" },
      { name: "Gaming Glasses", href: "/computer-glasses/gaming" },
      { name: "Office Collection", href: "/computer-glasses/office" },
    ],
  },
  SUNGLASSES: {
    type: "mega",
    sections: [
      {
        title: "Gender",
        type: "image-list",
        items: [
          {
            name: "Men",
            href: "/sunglasses/men",
            image: "/man-wearing-sunglasses.jpg",
          },
          {
            name: "Women",
            href: "/sunglasses/women",
            image: "/woman-wearing-sunglasses.jpg",
          },
        ],
      },
      {
        title: "Shape",
        type: "text-list",
        items: [
          { name: "Aviator", href: "/sunglasses/aviator" },
          { name: "Way farer", href: "/sunglasses/wayfarer" },
          { name: "Wraparound", href: "/sunglasses/wraparound" },
          { name: "Rectangle", href: "/sunglasses/rectangle" },
          { name: "Round", href: "/sunglasses/round" },
        ],
      },
    ],
    featuredImage: "/premium-sunglasses-on-luxury-background.jpg",
  },
  "POWER SUNGLASSES": {
    type: "simple",
    items: [
      { name: "Prescription Sunglasses", href: "/power-sunglasses/prescription" },
      { name: "Progressive Sunglasses", href: "/power-sunglasses/progressive" },
      { name: "Reading Sunglasses", href: "/power-sunglasses/reading" },
      { name: "Distance Sunglasses", href: "/power-sunglasses/distance" },
    ],
  },
  "CONTACT LENSES": {
    type: "simple",
    items: [
      { name: "Contact lens Solutions", href: "/contact-lenses/solutions" },
      { name: "Chains", href: "/contact-lenses/chains" },
      { name: "Lens Cleaner", href: "/contact-lenses/cleaner" },
      { name: "Packaging Case", href: "/contact-lenses/packaging" },
    ],
  },
  ACCESSORIES: {
    type: "simple",
    items: [
      { name: "Glasses Cases", href: "/accessories/cases" },
      { name: "Cleaning Cloths", href: "/accessories/cloths" },
      { name: "Chains & Straps", href: "/accessories/chains" },
      { name: "Repair Kits", href: "/accessories/repair" },
      { name: "Lens Cleaners", href: "/accessories/cleaners" },
    ],
  },
  "User": {
    type: "simple",
    items: [
      { name: "Your Account", href: "#" },
      { name: "sign out", href: "#" },
    ],
  },
}
// primitives
export type ObjectId = string;
export type ISODateString = string;
export type CurrencyAmount = number;

// top-level response
export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export interface Pagination {
  totalProducts: number;
  totalPages: number;
}

// product entity (keys unchanged)
export interface Product {
  _id: ObjectId;
  productCode: string;
  brand_name: string;
  material: string[];
  shape: string[];
  style: string[];
  hsn_code: string;
  sizes: string[];
  gender: string[];
  vendorId: ObjectId;
  rating?: number;
  total_reviews?: number;
  status: "active" | "inactive" | string; // keep open for future statuses
  is_Power: boolean;
  type: "Product" | string;
  variants: Variant[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
  __v: number;

  // only present on some items
  dimension?: Dimension;
}

// optional nested dimension block
export interface Dimension {
  lens_width: string;
  bridge_width: string;
  temple_length: string;
  lens_height: string;
}

// variant entity
export interface Variant {
  frame_color: string;
  temple_color: string;
  price: Price;
  images: ImageItem[];
  stock: Stock;
  _id: ObjectId;
}

// price breakdown (keys unchanged)
export interface Price {
  base_price: CurrencyAmount;
  mrp: CurrencyAmount;
  shipping_price: ShippingPrice;
  total_price: CurrencyAmount;
}

export interface ShippingPrice {
  custom: boolean;
  value: CurrencyAmount;
}

// image item (keys unchanged)
export interface ImageItem {
  url: string;
  _id: ObjectId;
}

// stock info
export interface Stock {
  current: number;
  minimum: number;
}


export interface FilterOption {
  label: string
  value: string
  count?: number
}

export const categories: FilterOption[] = [
  { label: "Eyeglasses", value: "eyeglasses" },
  { label: "Sunglasses", value: "sunglasses" },
  { label: "Frames", value: "frames" },
]

export const brands: FilterOption[] = [
  { label: "Clarity", value: "Clarity" },
  { label: "Barnspecs", value: "Barnspecs" },
  { label: "HarrisView", value: "HarrisView" },
  { label: "SunQuest", value: "SunQuest" },
  { label: "Visionary", value: "Visionary" },
]

export const styles: FilterOption[] = [
  { label: "Classic", value: "Classic" },
  { label: "Modern", value: "Modern" },
  { label: "Retro", value: "Retro" },
  { label: "Sporty", value: "Sporty" },
]

export const materials: FilterOption[] = [
  { label: "Metal", value: "Metal" },
  { label: "Plastic", value: "Plastic" },
  { label: "Mixed", value: "Mixed" },
  { label: "Titanium", value: "Titanium" },
]

export const footerLinks = {
  shop: [
    { label: "EyeGlasses", href: "/eyeglasses" },
    { label: "SunGlasses", href: "/sunglasses" },
    { label: "Collections", href: "/collections" },
    { label: "Size Guide", href: "/size-guide" },
  ],
  aboutUs: [
    { label: "Our Story", href: "/our-story" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
    { label: "Store Locator", href: "/store-locator" },
  ],
  information: [
    { label: "Help", href: "/help" },
    { label: "Shipping Handling", href: "/shipping" },
    { label: "Exchange & Returns", href: "/returns" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
}

export const socialLinks = [
  { name: "Instagram", icon: "instagram", href: "#" },
  { name: "LinkedIn", icon: "linkedin", href: "#" },
  { name: "Threads", icon: "threads", href: "#" },
  { name: "X", icon: "x", href: "#" },
]


