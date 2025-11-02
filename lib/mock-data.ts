// Mock product data based on API structure
export const mockProduct = {
  _id: "68f203fd1e3977dba3b2a92d",
  productCode: "FRM123",
  brand_name: "RayBan",
  material: ["metal", "plastic"],
  shape: ["round"],
  style: ["aviator"],
  hsn_code: "900410",
  sizes: ["M", "L"],
  gender: ["unisex"],
  vendorId: {
    _id: "68c5a84eff9547b8ed3166fa",
    business_name: "Shiva Optics",
    email: "shiva4@gmail.com",
    phone: "1234567899",
  },
  rating: 4,
  total_reviews: 12,
  status: "active",
  is_Power: true,
  type: "Product",
  variants: [
    {
      price: {
        shipping_price: {
          custom: false,
          value: 0,
        },
        base_price: 1200,
        mrp: 1500,
        total_price: 1300,
      },
      stock: {
        current: 10,
        minimum: 5,
      },
      frame_color: "black",
      temple_color: "silver",
      images: [
        {
          url: "https://cdn.site.com/p1.jpg",
          _id: "68f203fd1e3977dba3b2a92f",
        },
      ],
      _id: "68f203fd1e3977dba3b2a92e",
    },
  ],
  createdAt: "2025-10-17T08:53:17.250Z",
  updatedAt: "2025-10-17T09:20:59.640Z",
  __v: 0,
}

export const mockSimilarProducts = [
  {
    _id: "1",
    brand_name: "Oakley",
    productCode: "OAK456",
    variants: [
      {
        price: { total_price: 1500, mrp: 1800 },
        images: [{ url: "https://cdn.site.com/p2.jpg" }],
      },
    ],
  },
  {
    _id: "2",
    brand_name: "Prada",
    productCode: "PRA789",
    variants: [
      {
        price: { total_price: 2200, mrp: 2500 },
        images: [{ url: "https://cdn.site.com/p3.jpg" }],
      },
    ],
  },
  {
    _id: "3",
    brand_name: "Gucci",
    productCode: "GUC101",
    variants: [
      {
        price: { total_price: 3000, mrp: 3500 },
        images: [{ url: "https://cdn.site.com/p4.jpg" }],
      },
    ],
  },
  {
    _id: "4",
    brand_name: "Versace",
    productCode: "VER202",
    variants: [
      {
        price: { total_price: 2800, mrp: 3200 },
        images: [{ url: "https://cdn.site.com/p5.jpg" }],
      },
    ],
  },
]

export const frameDimensions = [
  { label: "Lens Width", value: "55 mm", icon: "lens" },
  { label: "Bridge Width", value: "18 mm", icon: "bridge" },
  { label: "Temple Length", value: "150 mm", icon: "temple" },
  { label: "Lens Height", value: "45 mm", icon: "height" },
]

export const trustBadges = [
  {
    title: "Delivery in 3-7 Days",
    icon: "package",
  },
  {
    title: "14 Days Return/Exchange*",
    icon: "return",
  },
  {
    title: "1 Year Warranty",
    icon: "warranty",
  },
]
