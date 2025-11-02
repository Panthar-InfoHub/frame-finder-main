import { API_URL } from "@/lib/apiUtils";
import axios from "axios";
import { getAccessToken } from "./auth";

// From here till line 128 these are all the get fuctions of the product
// This is the get request for the frames
export const getAllFrames = async () => {
    try{
        const resp = await axios.get(`${API_URL}/products/`)
        const data = resp.data; 

        if (resp.status!=200 || !data.success) {
            throw new Error("Failed to load the page")
        }
        return data;
    }
    catch(error){
            const message = error instanceof Error ? error.message : "Failed to load the page";
            return {
                success: false,
                message,
            };
    }
}

// This is the get request for the sunglasses
export const getAllSunglasses = async () => {
    try{
        const resp = await axios.get(`${API_URL}/sunglass/`)
        const data = resp.data; 

        if (resp.status!=200 || !data.success) {
            throw new Error("Failed to load the page")
        }
        return data;
    }
    catch(error){
            const message = error instanceof Error ? error.message : "Failed to load the page";
            return {
                success: false,
                message,
            };
    }
}

// This is the get request for the Accessories

export const getAllAccessories = async () => {
    try{
        const resp = await axios.get(`${API_URL}/accessories/`)
        const data = resp.data; 

        if (resp.status!=200 || !data.success) {
            throw new Error("Failed to load the page")
        }
        return data;
    }
    catch(error){
            const message = error instanceof Error ? error.message : "Failed to load the page";
            return {
                success: false,
                message,
            };
    }
}

// This is the get request for the Reader glasses
export const getAllReadingGlass = async () => {
    try{
        const resp = await axios.get(`${API_URL}/reader/`)
        const data = resp.data; 

        if (resp.status!=200 || !data.success) {
            throw new Error("Failed to load the page")
        }
        return data;
    }
    catch(error){
            const message = error instanceof Error ? error.message : "Failed to load the page";
            return {
                success: false,
                message,
            };
    }
}

// This is the get request for the contact lens 

export const getAllContactLens = async () => {
    try{
        const resp = await axios.get(`${API_URL}/contact-lens`)
        const data = resp.data;

        if (resp.status!= 200 || !data.success){
            throw new Error("Failed tp load the page")
        }
        return data;
    }
    catch (error){
        const message = error instanceof Error ? error.message : "Failed to load the page"
        return {
            success : false,
            message,
        }
    }
}


// This is the get request for the color contact lens page 

export const getAllColorContactLens = async () => {
    try{
        const resp = await axios.get(`${API_URL}/color-contact-lens`)
        const data = resp.data;

        if (resp.status!= 200 || !data.success){
            throw new Error("Failed to load the page")
        }
        return data;
    }
    catch (error){
        const message = error instanceof Error ? error.message : "Failed to load the page"
        return {
            success : false,
            message,
        }
    }
}


export const getAllLensSolution = async () => {
    try{
        const resp = await axios.get(`${API_URL}/lens-solution`)
        const data = resp.data;

        if (resp.status!= 200 || !data.success){
            throw new Error("Failed to load the page")
        }
        return data;
    }
    catch (error){
        const message = error instanceof Error ? error.message : "Failed to load the page"
        return {
            success : false,
            message,
        }
    }
}
// now from here are all the get functions of the particular single product page  


export const getFrameById = async (id : any) => {
    try{
        const resp = await axios.get(`${API_URL}/products/${id}`)
        const data = resp.data;

        if (resp.status!=200 || !data.success){
            throw new Error("Failed to load the page")
        }
        return data;    
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load the page"
        return {
            success : false,
            message,
        }
    }
}

// here is the funtion to get the sunglasses by id 

export const getSunglassesById = async (id : any) => {
    try {
        const resp = await axios.get(`${API_URL}/sunglass/${id}`)
        const data = resp.data;

        if (resp.status!=200  || !data.success){
            throw new Error("Failed to load the page")
        }
        return data;
    }

    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load the page"
        return {
            success : false,
            message, 
        }
    }
}


// here  is the function to get the data for a particular accesrroies by id 

export const getAccessoriesById = async (id : any) => {
    try {
        const resp = await axios.get(`${API_URL}/accessories/${id}`)
        const data = resp.data;

        if (resp.status!=200  || !data.success){
            throw new Error("Failed to load the page")
        }
        return data;
    }

    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load the page"
        return {
            success : false,
            message, 
        }
    }
}

// here  is the function to get the data for a particular colorContactLens by id

export const getColorContactLensById = async (id : any) => {
    try {
        const resp = await axios.get(`${API_URL}/color-contact-lens/${id}`)
        const data = resp.data;

        if (resp.status!=200  || !data.success){
            throw new Error("Failed to load the page")
        }
        return data;
    }

    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load the page"
        return {
            success : false,
            message, 
        }
    }
}

export const getContactLensById = async (id : any) => {
    try {
        const resp = await axios.get(`${API_URL}/contact-lens/${id}`)
        const data = resp.data;

        if (resp.status!=200  || !data.success){
            throw new Error("Failed to load the page")
        }
        return data;
    }

    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load the page"
        return {
            success : false,
            message, 
        }
    }
}

export const getReadingGlassById = async (id : any) => {
    try {
        const resp = await axios.get(`${API_URL}/reader/${id}`)
        const data = resp.data;

        if (resp.status!=200  || !data.success){
            throw new Error("Failed to load the page")
        }
        return data;
    }

    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load the page"
        return {
            success : false,
            message, 
        }
    }
}

export const getLensSolutionId = async (id : any) => {
    try {
        const resp = await axios.get(`${API_URL}/lens-solution/${id}`)
        const data = resp.data;

        if (resp.status!=200  || !data.success){
            throw new Error("Failed to load the page")
        }
        return data;
    }

    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to load the page"
        return {
            success : false,
            message, 
        }
    }
}


// now from here is the function for getting the data from the api of the best seller 

export const getbestseller = async () => {
    try {
        const resp = await axios.get(`${API_URL}/api/v1/best-seller/search`)
        const data = resp.data; 

        if (resp.status!=200 || !data.success){
            throw new Error("Failed to load the page")
        }
        return data;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Fialed to load the reasource"
        return {
            success : false, 
            message,
        }
    }
}
export const getFramePkgByVendorId = async (id: string) => {
    try {
      const token = await getAccessToken();
      const resp = await axios.get(`${API_URL}/lens-package/?vendorId=${id}`, {
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
      console.log("Error Message:", message);
      return {
        success: false,
        message,
      };
    }
  };
