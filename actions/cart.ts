"use server";
import { API_URL } from "@/lib/apiUtils";
import axios from "axios";
import { getAccessToken } from "./auth";
import { revalidatePath } from "next/cache";
import { getFrameById, getFramePkgByVendorId } from "./products";

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
    if (!data.success) throw new Error("Failed to remove item");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
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
    if (!data.success) throw new Error("Failed to clear wishlist");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

// ✅ Add item to wishlist only frame

export const addOnlyFrameToWishlist = async (
  productId: string,
  variantId: string,
  quantity: number
) => {
  try {
    const token = await getAccessToken();
    const resp = await axios.post(
      `${API_URL}/wishlist/add`,
      {
        item: {
          productId,
          variantId,
          quantity,
          type: "Product",
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = resp.data;
    if (!data.success) throw new Error("Failed to add item");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export const getPkgFromProductId = async (productId: string) => {
  try {
    const resp = await getFrameById(productId);

    if (!resp || !resp.success) {
      throw new Error("Failed to fetch product details");
    }
    const prooductdetails = resp.data;
    const vendrorId = prooductdetails.vendorId._id;

    const resp2 = await getFramePkgByVendorId(vendrorId);
    if (!resp2 || !resp2.success) {
      throw new Error("Failed to fetch package details");
    }
    const pkgDetails = resp2.data;

    return {
      success: true,
      data: { product: prooductdetails, packages: pkgDetails },
    }; // package details
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to fetch package details",
    };
  }
};
