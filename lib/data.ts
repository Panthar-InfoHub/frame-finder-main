export const siteConfig = {
  name: "Frame Finder",
  description: "Premium eyewear collection",
  colors: {
    primary: "#10B981", // Green from screenshots
    secondary: "#6B7280",
    accent: "#F3F4F6",
  },
};

export const heroSlides = [
  {
    id: 1,
    title: "ECO-ACETATE",
    subtitle: "From Nature, With Love",
    image: "/hero/hero-section-image-1.png",
  },
  {
    id: 2,
    title: "PREMIUM COLLECTION",
    subtitle: "Crafted for Perfection",
    image: "/hero/hero-section-image-2.png",
  },
  {
    id: 3,
    title: "TIMELESS STYLE",
    subtitle: "Elegance Redefined",
    image: "/hero/hero-section-image-3.png",
  },
];

export const promoData = {
  text: "New edit: Eco-Acetate - Shop For 2 Pay For 1",
  icon: "🎁",
};

export const navigationLinks = [
  { label: "FRAMES", href: "/frames" },
  { label: "READING GLASSES", href: "/readingGlasses" },
  { label: "SUNGLASSES", href: "/sunglasses" },
  { label: "CONTACT LENSES", href: "/contactLens" },
  { label: "CONTACT LENSES SOLUTIONS", href: "/contactLensSolution" },
  { label: "ACCESSORIES", href: "/accessories" },
];


export const productCategories = [
  {
    id: 1,
    name: "Rimless Glasses",
    image: "/transparent-frame-eyeglasses-line-drawing.jpg",
    href: "/search?query=rimless",
  },
  {
    id: 2,
    name: "Transparent Frame",
    image: "/transparent-frame-eyeglasses-line-drawing.jpg",
    href: "/search?query=transparent",
  },
  {
    id: 3,
    name: "Rich Acetate eyeglass",
    image: "/acetate-eyeglasses-line-drawing.jpg",
    href: "/search?query=acetate",
  },
  {
    id: 4,
    name: "Blue Computer Glasses",
    image: "/acetate-eyeglasses-line-drawing.jpg",
    href: "/search?query=computer",
  },
  {
    id: 5,
    name: "Metalwork",
    image: "/metal-frame-eyeglasses-line-drawing.jpg",
    href: "/search?query=metal",
  },
];

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
};

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
            href: "/frames?gender=male",
            image: "/nav/nav_man.png",
          },
          {
            name: "Women",
            href: "/frames?gender=female",
            image: "/nav/nav_women.png",
          },
          {
            name: "Kids",
            href: "/frames?gender=kids",
            image: "/nav/nav_child.png",
          },
        ],
      },
      {
        title: "Frame Type",
        type: "text-list",
        items: [
          { name: "Rectangle Frame", href: "/frames?shape=rectangle" },
          { name: "Square Frame", href: "/frames?shape=square" },
          { name: "Round Frame", href: "/frames?shape=round" },
          { name: "Cat-Eye Frame", href: "/frames?shape=cat-eye" },
          { name: "Oval Frame", href: "/frames?shape=oval" },
        ],
      },
      {
        title: "Style",
        type: "text-list",
        items: [
          { name: "Rimmed", href: "/frames?style=rimmed" },
          { name: "Semi-Rimmed", href: "/frames?style=semi-rimmed" },
          { name: "Rimless", href: "/frames?style=rimless" },
        ],
      },
    ],
    featuredImage: "/nav/nav.png",
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
            href: "/sunglasses?gender=male",
            image: "/nav/nav_man.png",
          },
          {
            name: "Women",
            href: "/sunglasses?gender=female",
            image: "/nav/nav_women.png",
          },
        ],
      },
      {
        title: "Shape",
        type: "text-list",
        items: [
          { name: "Aviator", href: "/sunglasses?shape=aviator" },
          { name: "Wayfarer", href: "/sunglasses?shape=wayfarer" },
          { name: "Wraparound", href: "/sunglasses?shape=wraparound" },
          { name: "Rectangle", href: "/sunglasses?shape=rectangle" },
          { name: "Round", href: "/sunglasses?shape=round" },
        ],
      },
    ],
    featuredImage: "/nav/nav_sun.png",
  },
  "POWER SUNGLASSES": {
    type: "simple",
    items: [
      { name: "Prescription Sunglasses", href: "/power-sunglasses?prescription=prescription" },
      { name: "Progressive Sunglasses", href: "/power-sunglasses?progressive=progressive" },
      { name: "Reading Sunglasses", href: "/power-sunglasses?reading=reading" },
      { name: "Distance Sunglasses", href: "/power-sunglasses?distance=distance" },
    ],
  },
  "CONTACT LENSES": {
    type: "simple-categories",
    categories: [
      { name: "By Disposibility", href: "/contact-lenses?disposibility=disposibility" },
      { name: "By Color", href: "/contact-lenses?color=color" },
    ],
  },
  ACCESSORIES: {
    type: "simple-categories",
    categories: [
      { name: "Contact lens Solutions", href: "/accessories?name=solution" },
      { name: "Chains", href: "/accessories?name=chains" },
      { name: "Packaging Case", href: "/accessories?name=packaging" },
    ],
  },
  USER: {
    type: "user-menu",
    items: [
      { name: "Your Account", href: "/account", action: null },
      { name: "Your orders", href: "/orders", action: null },
      { name: "Sign Out", href: null, action: "logout" },
    ],
  },
};

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
  price: {
    base_price: number;
    mrp: number;
  };
  _image?: string;
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
  label: string;
  value: string;
  count?: number;
}

export const categories: FilterOption[] = [
  { label: "Eyeglasses", value: "eyeglasses" },
  { label: "Sunglasses", value: "sunglasses" },
  { label: "Frames", value: "frames" },
];

export const brands: FilterOption[] = [
  { label: "Clarity", value: "Clarity" },
  { label: "Barnspecs", value: "Barnspecs" },
  { label: "HarrisView", value: "HarrisView" },
  { label: "SunQuest", value: "SunQuest" },
  { label: "Visionary", value: "Visionary" },
];

export const styles: FilterOption[] = [
  { label: "Classic", value: "Classic" },
  { label: "Modern", value: "Modern" },
  { label: "Retro", value: "Retro" },
  { label: "Sporty", value: "Sporty" },
];

export const materials: FilterOption[] = [
  { label: "Metal", value: "Metal" },
  { label: "Plastic", value: "Plastic" },
  { label: "Mixed", value: "Mixed" },
  { label: "Titanium", value: "Titanium" },
];

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
};

export const socialLinks = [
  { name: "Instagram", icon: "instagram", href: "#" },
  { name: "LinkedIn", icon: "linkedin", href: "#" },
  { name: "Threads", icon: "threads", href: "#" },
  { name: "X", icon: "x", href: "#" },
];

export const sunglassesCategories = [
  { id: 1, name: "Rimless Glasses", href: "/sunglasses?style=rimless", icon: "/sunglasses/sun_1.jpg" },
  { id: 2, name: "Transparent Frame", href: "/sunglasses?style=transparent", icon: "/sunglasses/sun_2.jpg" },
  { id: 3, name: "Rich Acetate eyeglass", href: "/sunglasses?style=rich-acetate", icon: "/sunglasses/sun_3.jpg" },
  { id: 4, name: "Blue Computer Glasses", href: "/sunglasses?style=blue-computer", icon: "/sunglasses/sun_1.jpg" },
  { id: 5, name: "Metalwork", href: "/sunglasses?style=metalwork", icon: "/sunglasses/sun_2.jpg" },
];

export const vendors = [
  {
    id: 1,
    name: "Armen Sargsyan",
    initial: "A",
    rating: "5 point ratings",
    review: "loream ipsum dolor sit amet consectetur adipisicing elit loream10",
    location: "1,234/Now",
  },
  {
    id: 2,
    name: "Arora Optical",
    initial: "A",
    rating: "5 point ratings",
    review: "loream ipsum dolor sit amet consectetur adipisicing elit loream10",
    location: "1,234/Now",
  },
  {
    id: 3,
    name: "Armen Sargsyan",
    initial: "A",
    rating: "5 point ratings",
    review: "loream ipsum dolor sit amet consectetur adipisicing elit loream10",
    location: "1,234/Now",
  },
  {
    id: 4,
    name: "Armen Sargsyan",
    initial: "A",
    rating: "5 point ratings",
    review: "loream ipsum dolor sit amet consectetur adipisicing elit loream10",
    location: "1,234/Now",
  },
];

export const shapes = [
  {
    id: 1,
    name: "Round",
    image: "/shapes/shape_1.png",
  },
  {
    id: 2,
    name: "Square",
    image: "/shapes/shape_2.png",
  },
  {
    id: 3,
    name: "Cat Eyes",
    image: "/shapes/shape_3.png",
  },
  {
    id: 4,
    name: "Wayfarer",
    image: "/shapes/shape_4.png",
  },
  {
    id: 5,
    name: "Hexagon",
    image: "/shapes/shape_1.png",
  },
];
