"use server"
import { API_URL } from "@/lib/apiUtils";
import axios from "axios";
import { getAccessToken } from "./auth";
import { auth } from "@/lib/auth";

// From here till line 128 these are all the get fuctions of the product
// This is the get request for the frames
export const getAllFrames = async (params: any) => {
  try {
    const resp = await axios.get(`${API_URL}/products/`, { params });
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

// This is the get request for the sunglasses
export const getAllSunglasses = async () => {
  try {
    const resp = await axios.get(`${API_URL}/sunglass/`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

// This is the get request for the Accessories

export const getAllAccessories = async (params: any) => {
  try {
    const resp = await axios.get(`${API_URL}/accessories/`, { params });
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

// This is the get request for the Reader glasses
export const getAllReadingGlass = async (params: any) => {
  try {
    const resp = await axios.get(`${API_URL}/reader/`, { params });
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

// This is the get request for the contact lens

export const getAllContactLens = async (params: any) => {
  try {
    const resp = await axios.get(`${API_URL}/contact-lens`, { params });
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed tp load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

// This is the get request for the color contact lens page

export const getAllColorContactLens = async (params: any) => {
  try {
    const resp = await axios.get(`${API_URL}/color-contact-lens`, { params });
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

export const getAllLensSolution = async () => {
  try {
    const resp = await axios.get(`${API_URL}/lens-solution`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};
// now from here are all the get functions of the particular single product page

export const getFrameById = async (id: any) => {
  try {
    
    const resp = await axios.get(`${API_URL}/products/${id}`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};
export const getSunglassesById = async (id: any) => {
  try {
    const resp = await axios.get(`${API_URL}/sunglass/${id}`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

export const getAccessoryById = async (id: any) => {
  try {
    const resp = await axios.get(`${API_URL}/accessories/${id}`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

export const getReaderById = async (id: any) => {
  try {
    const resp = await axios.get(`${API_URL}/reader/${id}`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

// here  is the function to get the data for a particular accesrroies by id

export const getAccessoriesById = async (id: any) => {
  try {
    const resp = await axios.get(`${API_URL}/accessories/${id}`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

// here  is the function to get the data for a particular colorContactLens by id

export const getColorContactLensById = async (id: any) => {
  try {
    const resp = await axios.get(`${API_URL}/color-contact-lens/${id}`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

export const getContactLensById = async (id: any) => {
  try {
    const resp = await axios.get(`${API_URL}/contact-lens/${id}`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

export const getReadingGlassById = async (id: any) => {
  try {
    const resp = await axios.get(`${API_URL}/reader/${id}`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

export const getLensSolutionId = async (id: any) => {
  try {
    const resp = await axios.get(`${API_URL}/lens-solution/${id}`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

// now from here is the function for getting the data from the api of the best seller

export const getbestseller = async () => {
  try {
    const resp = await axios.get(`${API_URL}/api/v1/best-seller/search`);
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Fialed to load the reasource";
    return {
      success: false,
      message,
    };
  }
};
export const getFramePkgByVendorId = async (id: string, lensType?: string) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      throw new Error("No access token found");
    }
    const baseUrl = new URL(`${API_URL}/lens-package/`);
    baseUrl.searchParams.set("vendorId", id);
    if (lensType) baseUrl.searchParams.set("type", lensType);
    const resp = await axios.get(baseUrl.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = resp.data;

    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    console.error("Error in getFramePkgByVendorId:", message);
    return {
      success: false,
      message,
    };
  }
};

export const getSunglassesPkgByVendorId = async (
  id: string,
  lensType?: string
) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      throw new Error("No access token found");
    }
    const baseUrl = new URL(`${API_URL}/sun-lens-package/`);
    baseUrl.searchParams.set("vendorId", id);
    if (lensType) baseUrl.searchParams.set("type", lensType);
    const resp = await axios.get(baseUrl.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = resp.data;
    if (resp.status != 200 || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    console.error("Error in getSunglassesPkgByVendorId:", message);
    return {
      success: false,
      message,
    };
  }
};

// this the function for getting reviews of any product using it's id

export const getProductReview = async (id: any) => {
  try {
    const token = await getAccessToken();
    // if (!token) {
    //   throw new Error("No access token found");
    // }
    const resp = await axios.get(`${API_URL}/review/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = resp.data;
    // console.log(data);
    if ((resp.status !== 200 && resp.status !== 201) || !data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    // console.log("Error : ", error.response);
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};

export const postProductReview = async (payload: any) => {
    try {
      // console.log(payload)
    // first we will get the user and token -> here since we are using the auth js we will do it using the meathod given below 
    const session = await auth()
    if (!session){
      throw new Error("Was not able to get the session");
    }
    const userId = session.user.id
    // console.log(userId)
    // console.log("error 1")
    const token = await getAccessToken();
    // console.log("error 2")
    if (!token) {
      throw new Error("No access token found");
    }
    // console.log("error 3")
    // now we will transform the data that will be sent over in order so that it matches the expected API structure
    // console.log()
    const finalData = {
      vendorId: payload.vendorId,
      user: userId, 
      product: payload.productId ,
      onModel: payload.onModel, 
      rating: payload.rating,
      comment: payload.comment,
      images : payload.images || []
    }
    // console.log(finalData)
    const resp = await axios.post(`${API_URL}/review`, finalData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = resp.data.data;
    // console.log('this is my data', data);  
    if ((resp.status !== 200 && resp.status !== 201) || !resp.data.success) {
      throw new Error("Failed to load the page");
    }
    return data;
  } catch (error) {
    console.log("Error : ", error.response);
    const message =
      error instanceof Error ? error.message : "Failed to load the page";
    return {
      success: false,
      message,
    };
  }
};
