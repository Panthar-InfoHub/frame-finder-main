"use server";
import { API_URL } from "@/lib/apiUtils";
import axios from "axios";
import { getAccessToken } from "./auth";
import { revalidatePath } from "next/cache";
import { getFrameById, getFramePkgByVendorId, getSunglassesPkgByVendorId } from "./products";
import { getSignedViewUrl } from "./cloud-storage";
import { ProductType } from "@/types/product";

export const getWishlist = async () => {
  try {
    const token = await getAccessToken();
    const resp = await axios.get(`${API_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = resp.data;
    if (resp.status !== 200 || !data.success) {
      throw new Error("Failed to load wishlist");
    }

    return data.data; // array of items
  } catch (error) {
    return [];
  }
};

// ✅ Remove single wishlist item
export const removeFromWishlist = async (itemId: string) => {
  try {
    const token = await getAccessToken();
    const resp = await axios.put(
      `${API_URL}/wishlist/remove`,
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

// ✅ Clear entire wishlist
export const clearWishlist = async () => {
  try {
    const token = await getAccessToken();
    const resp = await axios.put(
      `${API_URL}/wishlist/clear`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = resp.data;
    revalidatePath("/cart");
    if (!data.success) {
      const errorMsg = data?.error?.message || data?.message || "Failed to clear wishlist";
      throw new Error(errorMsg);
    }
    return { success: true };
  } catch (error: any) {
    console.error(error);
    const errorMsg =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "Failed to clear wishlist";
    return { success: false, message: errorMsg };
  }
};

// ✅ Add item to wishlist with variant (for frames, sunglasses, etc.)
export const addDirectToWishlist = async (
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
    console.log("Add direct to wishlist payload:", payload);
    const resp = await axios.post(`${API_URL}/wishlist/add`, payload, {
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

// ✅ Add item to wishlist without variant (for accessories)
export const addToWishlistWithoutVariant = async (
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
    console.log("Add to wishlist without variant payload:", payload);
    const resp = await axios.post(`${API_URL}/wishlist/add`, payload, {
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

// ✅ Add full item (with prescription and/or lens package) to wishlist
export const addItemToWishlist = async (payload: any) => {
  try {
    const token = await getAccessToken();
    const resp = await axios.post(`${API_URL}/wishlist/add`, payload, {
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
