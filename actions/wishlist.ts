"use server";

import axios from "axios";
import { API_URL } from "@/lib/apiUtils";
import { getAccessToken } from "./auth";
import { revalidatePath } from "next/cache";
import { ProductType } from "@/types/product";

// ✅ Get user's wishlist
export const getWishlist = async () => {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, message: "Authentication required", data: null };
    }

    const resp = await axios.get(`${API_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = resp.data;
    if (!data.success) {
      throw new Error(data.message || "Failed to load wishlist");
    }

    return { success: true, data: data.data };
  } catch (error: any) {
    console.error("Error fetching wishlist:", error);
    const errorMsg = error?.response?.data?.message || error?.message || "Failed to load wishlist";
    return { success: false, message: errorMsg, data: null };
  }
};

// ✅ Add item to wishlist
export const addToWishlist = async (
  productId: string,
  productType: ProductType,
  variantId?: string
) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, message: "Please login to add items to wishlist" };
    }

    const payload: {
      item: {
        productId: string;
        type: ProductType;
        variantId?: string;
      };
    } = {
      item: {
        productId,
        type: productType,
      },
    };

    // Only add variantId if it exists
    if (variantId) {
      payload.item.variantId = variantId;
    }

    const resp = await axios.post(`${API_URL}/wishlist/add`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = resp.data;
    if (!data.success) {
      const errorMsg = data?.message || "Failed to add to wishlist";
      throw new Error(errorMsg);
    }

    revalidatePath("/account/wishlist");
    return { success: true, message: "Added to wishlist!" };
  } catch (error: any) {
    console.error("Error adding to wishlist:", error);
    const errorMsg =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "Failed to add to wishlist";
    return { success: false, message: errorMsg };
  }
};

// ✅ Remove item from wishlist
export const removeFromWishlist = async (itemId: string) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, message: "Authentication required" };
    }

    const resp = await axios.put(
      `${API_URL}/wishlist/remove`,
      { itemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = resp.data;
    if (!data.success) {
      const errorMsg = data?.message || "Failed to remove item";
      throw new Error(errorMsg);
    }

    revalidatePath("/account/wishlist");
    return { success: true, message: "Removed from wishlist" };
  } catch (error: any) {
    console.error("Error removing from wishlist:", error);
    const errorMsg =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "Failed to remove item";
    return { success: false, message: errorMsg };
  }
};

// ✅ Clear entire wishlist
export const clearWishlist = async () => {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, message: "Authentication required" };
    }

    const resp = await axios.put(
      `${API_URL}/wishlist/clear`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = resp.data;
    if (!data.success) {
      const errorMsg = data?.message || "Failed to clear wishlist";
      throw new Error(errorMsg);
    }

    revalidatePath("/account/wishlist");
    return { success: true, message: "Wishlist cleared successfully" };
  } catch (error: any) {
    console.error("Error clearing wishlist:", error);
    const errorMsg =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "Failed to clear wishlist";
    return { success: false, message: errorMsg };
  }
};

// ✅ Check if item is in wishlist and get its ID
export const getWishlistItemId = async (productId: string, variantId?: string) => {
  try {
    const result = await getWishlist();
    if (!result.success || !result.data?.items) {
      return null;
    }

    const item = result.data.items.find((item: any) => {
      const matchesProduct = item.product?.id === productId;
      if (variantId) {
        return matchesProduct && item.variant?._id === variantId;
      }
      return matchesProduct;
    });

    return item?._id || null;
  } catch (error) {
    return null;
  }
};

// ✅ Check if item is in wishlist (client-side helper)
export const isInWishlist = async (productId: string, variantId?: string) => {
  const itemId = await getWishlistItemId(productId, variantId);
  return itemId !== null;
};
