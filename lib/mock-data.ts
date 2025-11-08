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
export const mockReviews = {
  success: true,
  message: "Product reviews fetched successfully",
  data: {
    reviews: [
      {
        _id: "68f2070b97a8a2ae634dd21a",
        user: {
          _id: "690443c10a3d933bedc86fcf",
          img: {
            url: "/user-avatar.jpg",
          },
          email: "user@gmail.com",
        },
        product: "68f203fd1e3977dba3b2a92d",
        onModel: "Product",
        rating: 2,
        comment: "Test review update.",
        images: [
          {
            url: "/product-review.jpg",
            _id: "68f2070b97a8a2ae634dd21b",
          },
        ],
        createdAt: "2025-10-17T09:06:19.065Z",
        updatedAt: "2025-10-17T09:06:19.065Z",
        __v: 0,
      },
    ],
    user_reviews: [
      {
        _id: "68f20a7bc4932c0503f310fd",
        user: null,
        product: {
          _id: "68f203fd1e3977dba3b2a92d",
          productCode: "FRM123",
          brand_name: "RayBan",
        },
        onModel: "Product",
        rating: 2,
        comment: "Updated comment.",
        images: [
          {
            url: "/product-review.jpg",
            _id: "68f20a7bc4932c0503f310fe",
          },
        ],
        createdAt: "2025-10-17T09:20:59.515Z",
        updatedAt: "2025-10-17T09:30:42.073Z",
        __v: 0,
      },
      {
        _id: "68f20a7ac4932c0503f310f3",
        user: null,
        product: {
          _id: "68f203fd1e3977dba3b2a92d",
          productCode: "FRM123",
          brand_name: "RayBan",
        },
        onModel: "Product",
        rating: 2,
        comment: "Test review update.",
        images: [
          {
            url: "/product-review.jpg",
            _id: "68f20a7ac4932c0503f310f4",
          },
        ],
        createdAt: "2025-10-17T09:20:58.480Z",
        updatedAt: "2025-10-17T09:20:58.480Z",
        __v: 0,
      },
      {
        _id: "68f20a79c4932c0503f310e9",
        user: null,
        product: {
          _id: "68f203fd1e3977dba3b2a92d",
          productCode: "FRM123",
          brand_name: "RayBan",
        },
        onModel: "Product",
        rating: 2,
        comment: "Test review update.",
        images: [
          {
            url: "/product-review.jpg",
            _id: "68f20a79c4932c0503f310ea",
          },
        ],
        createdAt: "2025-10-17T09:20:57.566Z",
        updatedAt: "2025-10-17T09:20:57.566Z",
        __v: 0,
      },
      {
        _id: "68f20a78c4932c0503f310df",
        user: null,
        product: {
          _id: "68f203fd1e3977dba3b2a92d",
          productCode: "FRM123",
          brand_name: "RayBan",
        },
        onModel: "Product",
        rating: 2,
        comment: "Test review update.",
        images: [
          {
            url: "/product-review.jpg",
            _id: "68f20a78c4932c0503f310e0",
          },
        ],
        createdAt: "2025-10-17T09:20:56.605Z",
        updatedAt: "2025-10-17T09:20:56.605Z",
        __v: 0,
      },
      {
        _id: "68f2090dbc556db77b325bb1",
        user: null,
        product: {
          _id: "68f203fd1e3977dba3b2a92d",
          productCode: "FRM123",
          brand_name: "RayBan",
        },
        onModel: "Product",
        rating: 2,
        comment: "Test review update.",
        images: [
          {
            url: "/product-review.jpg",
            _id: "68f2090dbc556db77b325bb2",
          },
        ],
        createdAt: "2025-10-17T09:14:53.352Z",
        updatedAt: "2025-10-17T09:14:53.352Z",
        __v: 0,
      },
      {
        _id: "68f208a4bc556db77b325ba7",
        user: null,
        product: {
          _id: "68f203fd1e3977dba3b2a92d",
          productCode: "FRM123",
          brand_name: "RayBan",
        },
        onModel: "Product",
        rating: 2,
        comment: "Test review update.",
        images: [
          {
            url: "/product-review.jpg",
            _id: "68f208a4bc556db77b325ba8",
          },
        ],
        createdAt: "2025-10-17T09:13:08.853Z",
        updatedAt: "2025-10-17T09:13:08.853Z",
        __v: 0,
      },
      {
        _id: "68f20819b06085685819e8e7",
        user: null,
        product: {
          _id: "68f203fd1e3977dba3b2a92d",
          productCode: "FRM123",
          brand_name: "RayBan",
        },
        onModel: "Product",
        rating: 2,
        comment: "Test review update.",
        images: [
          {
            url: "/product-review.jpg",
            _id: "68f20819b06085685819e8e8",
          },
        ],
        createdAt: "2025-10-17T09:10:49.666Z",
        updatedAt: "2025-10-17T09:10:49.666Z",
        __v: 0,
      },
      {
        _id: "68f2075af554398f68410fd4",
        user: null,
        product: {
          _id: "68f203fd1e3977dba3b2a92d",
          productCode: "FRM123",
          brand_name: "RayBan",
        },
        onModel: "Product",
        rating: 2,
        comment: "Test review update.",
        images: [
          {
            url: "/product-review.jpg",
            _id: "68f2075af554398f68410fd5",
          },
        ],
        createdAt: "2025-10-17T09:07:38.918Z",
        updatedAt: "2025-10-17T09:07:38.918Z",
        __v: 0,
      },
    ],
  },
}

export const ratingDistribution = [
  { stars: 5, count: 4280, percentage: 80 },
  { stars: 4, count: 4280, percentage: 70 },
  { stars: 3, count: 4280, percentage: 30 },
  { stars: 2, count: 4280, percentage: 40 },
  { stars: 1, count: 4280, percentage: 20 },
]
