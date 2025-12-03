export interface IUser {
  _id?: string;
  first_name?: string;
  last_name?: string;
  img?: {
    url?: string;
  };
  phone?: string;
  email?: string;
  gender?: "male" | "female" | "others";

  wallet_point?: number;
  prescription?: any;

  address?: Address[];

  isActive?: boolean;
  role?: "USER" | "ADMIN" | "SUPER_ADMIN" | string;

  createdAt?: string | Date;
  updatedAt?: string | Date;
  _image?: string;
}

export interface Address {
  _id: string;
  address_line_1: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  _id: string;
  productName: string;
  price: number;
  quantity: number;
  prescription?: {
    power?: string;
  };
  lens_package_detail?: {
    package_type?: string;
    package_design?: string;
    package_price?: number;
  };
  product_snapshot: {
    productCode: string;
    brand_name: string;
    variant_details: {
      total_price: number;
      frame_color?: string;
      temple_color?: string;
      image_url: string;
    };
  };
  vendor_snapshot: {
    business_name: string;
    business_owner: string;
  };
}

export interface Order {
  _id: string;
  orderCode: string;
  createdAt: string;
  total_amount: number;
  order_status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  shipping_address: {
    address_line_1: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  discount: number;
  tax: number;
  shipping_cost: number;
  coupon_code?: string;
  tracking_id?: string;
}

export interface searchParamsProps {
  searchParams: Promise<{
    // Frame filters
    category?: string | string[];
    frame_style?: string | string[];
    frame_shape?: string | string[];
    frame_color?: string | string[];
    frame_material?: string | string[];
    gender?: string | string[];
    frame_size?: string | string[];
    brand?: string | string[];
    price?: string | string[];
    // Legacy support
    style?: string | string[];
    material?: string | string[];
    temple_color?: string | string[];
  }>;
}
