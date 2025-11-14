"use server"
import { API_URL } from "@/lib/apiUtils";
import axios from "axios";

export const globalSearchAction = async (query: any) => {
    try {
        const resp = await axios.get(`${API_URL}/frontend/global-search?query=${encodeURIComponent(query)}`);
        const data = resp.data;
        console.log("Global search action response ==> ", data);
        if ((resp.status !== 200 && resp.status !== 201) || !data.success) {
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