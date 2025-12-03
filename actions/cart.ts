"use server";
import { API_URL } from "@/lib/apiUtils";
import axios from "axios";
import { getAccessToken } from "./auth";
import { revalidatePath } from "next/cache";
import { getFrameById, getFramePkgByVendorId, getSunglassesPkgByVendorId } from "./products";
import { getSignedViewUrl } from "./cloud-storage";
import { ProductType } from "@/types/product";

// ✅ Apply coupon and get breakdown
export const applyCoupon = async (couponCode: string) => {
  try {
    const token = await getAccessToken();
    const resp = await axios.get(`${API_URL}/coupon/breakdown?code=${couponCode}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = resp.data;
    if (!data.success) {
      const errorMsg = data?.error?.message || data?.message || "Invalid coupon code";
      return { success: false, message: errorMsg };
    }
    return { success: true, data: data.data };
  } catch (error: any) {
    console.error(error);

    // Extract user-friendly error message
    let errorMsg = "Failed to apply coupon";

    if (error?.response?.data) {
      const errorData = error.response.data;
      // Handle error.message format
      if (errorData?.error?.message) {
        errorMsg = errorData.error.message;
      }
      // Handle direct message format
      else if (errorData?.message) {
        errorMsg = errorData.message;
      }
    }
    // Handle thrown errors
    else if (error?.message) {
      errorMsg = error.message;
    }

    // Don't show technical error codes/types to users
    if (
      errorMsg.toLowerCase().includes("404") ||
      errorMsg.toLowerCase().includes("500") ||
      errorMsg.toLowerCase().includes("operationalerror")
    ) {
      errorMsg = "Invalid coupon code";
    }

    return { success: false, message: errorMsg };
  }
};

export const getCart = async () => {
  try {
    const token = await getAccessToken();
    const resp = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = resp.data;
    if (resp.status !== 200 || !data.success) {
      throw new Error("Failed to load cart");
    }

    return data.data; // array of items
  } catch (error) {
    return [];
  }
};

// ✅ Remove single cart item
export const removeFromCart = async (itemId: string) => {
  try {
    const token = await getAccessToken();
    const resp = await axios.put(
      `${API_URL}/cart/remove`,
      { itemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = resp.data;
    revalidatePath("/cart");
    if (!data.success) {
      const errorMsg = data?.error?.message || data?.message || "Failed to remove item";
      throw new Error(errorMsg);
    }
    return { success: true };
  } catch (error: any) {
    console.error(error);
    const errorMsg =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "Failed to remove item";
    return { success: false, message: errorMsg };
  }
};

// ✅ Clear entire cart
export const clearCart = async () => {
  try {
    const token = await getAccessToken();
    const resp = await axios.put(
      `${API_URL}/cart/clear`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = resp.data;
    revalidatePath("/cart");
    if (!data.success) {
      const errorMsg = data?.error?.message || data?.message || "Failed to clear cart";
      throw new Error(errorMsg);
    }
    return { success: true };
  } catch (error: any) {
    console.error(error);
    const errorMsg =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "Failed to clear cart";
    return { success: false, message: errorMsg };
  }
};

// ✅ Add item to cart with variant (for frames, sunglasses, etc.)
export const addDirectToCart = async (
  productId: string,
  variantId: string,
  quantity: number,
  productType: ProductType
) => {
  try {
    const token = await getAccessToken();
    const payload = {
      item: {
        productId,
        variantId,
        quantity,
        type: productType,
      },
    };
    const resp = await axios.post(`${API_URL}/cart/add`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = resp.data;
    if (!data.success) {
      const errorMsg = data?.error?.message || data?.message || "Failed to add item";
      throw new Error(errorMsg);
    }
    return { success: true };
  } catch (error: any) {
    console.error(error);
    const errorMsg =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "Failed to add item";
    return { success: false, message: errorMsg };
  }
};

// ✅ Add item to cart without variant (for accessories)
export const addToCartWithoutVariant = async (
  productId: string,
  quantity: number,
  productType: ProductType
) => {
  try {
    const token = await getAccessToken();
    const payload = {
      item: {
        productId,
        quantity,
        type: productType,
      },
    };
    const resp = await axios.post(`${API_URL}/cart/add`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = resp.data;
    if (!data.success) {
      const errorMsg = data?.error?.message || data?.message || "Failed to add item";
      throw new Error(errorMsg);
    }
    return { success: true };
  } catch (error: any) {
    console.error(error);
    const errorMsg =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "Failed to add item";
    return { success: false, message: errorMsg };
  }
};

// ✅ Add full item (with prescription and/or lens package) to cart
export const addItemToCart = async (payload: any) => {
  try {
    const token = await getAccessToken();
    const resp = await axios.post(`${API_URL}/cart/add`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = resp.data;
    if (!data.success) {
      const errorMsg = data?.error?.message || data?.message || "Failed to add item";
      throw new Error(errorMsg);
    }
    return { success: true } as const;
  } catch (error: any) {
    console.error(error);
    const errorMsg =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "Failed to add item";
    return {
      success: false,
      message: errorMsg,
    } as const;
  }
};

// Lazily fetch lens packages by vendor and optional lens type filter
export const getLensPackages = async (
  vendorId: string,
  lensType?: string,
  productType?: ProductType
) => {
  try {
    let resp;
    if (productType === "Product") {
      resp = await getFramePkgByVendorId(vendorId, lensType);
    } else if (productType === "Sunglass") {
      resp = await getSunglassesPkgByVendorId(vendorId, lensType);
    }
    if (!resp || !resp.success) {
      throw new Error("Failed to fetch lens package details");
    }
    const raw = resp.data as any;
    const list = Array.isArray(raw)
      ? raw
      : raw && Array.isArray(raw.lensPackages)
      ? raw.lensPackages
      : [];
    const signed = await Promise.all(
      list.map(async (pkg: any) => {
        const rawUrl: string | undefined = pkg?.images?.[0]?.url;
        const isHttp = rawUrl && /^https?:\/\//i.test(rawUrl);
        const signedUrl = rawUrl
          ? isHttp
            ? rawUrl
            : await getSignedViewUrl(rawUrl)
          : "https://placehold.co/120x80";
        return { ...pkg, _signedImage: signedUrl };
      })
    );
    return { success: true, data: signed } as const;
  } catch (error) {
    console.error("Error in getLensPackages:", error);
    return {
      success: false,
      message: "Failed to fetch lens packages",
    } as const;
  }
};

export const createOrder = async (orderData: {
  shipping_address: {
    name: string;
    phone: string;
    pincode: string;
    address_line_1: string;
    city: string;
    state: string;
    landmark?: string;
  };
  coupon_code?: string;
}) => {
  try {
    const token = await getAccessToken();

    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      } as const;
    }

    const response = await axios.post(`${API_URL}/order`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = response.data;

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to create order",
      } as const;
    }

    return {
      success: true,
      message: "Order created successfully",
      data: result.data,
    } as const;
  } catch (error: any) {
    console.error("Error in createOrder:", error);

    // Extract user-friendly error message
    let errorMsg = "Failed to create order";

    if (error?.response?.data) {
      const errorData = error.response.data;
      errorMsg = errorData?.error?.message || errorData?.message || errorMsg;
    }

    return {
      success: false,
      message: errorMsg,
    } as const;
  }
};
