"use server"
import axios from "axios"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { auth } from "../auth"
import { API_URL } from "../apiUtils"

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"

// Resolve the Bearer token from next-auth session (preferred) or cookies (fallback)
async function getAuthHeaders() {
    const jar = await cookies()
    const session = await auth().catch(() => null) // guards against auth() throwing
    const token =
        session?.accessToken ||
        jar.get("accessToken")?.value ||
        jar.get("token")?.value
    return token ? { Authorization: `Bearer ${token}` } : {}
}

// ───────────────────────────────────────────────────────────────────────────────
export async function getNewArrival() {
    try {
        const headers = await getAuthHeaders()
        const res = await axios.get(`${API_URL}/products`, { headers })
        // console.log("getNewArrival response", res.data)
        return { success: true, data: res.data }
    } catch (error) {
        console.error("getNewArrival error", error)
        return { success: false, error: error.response?.data?.message || "getNewArrival failed" }
    }
}

export async function getBestSeller(params: any) {
    try {
        const headers = await getAuthHeaders()
        const res = await axios.get(`${API_URL}/best-seller/search`, { headers, params })
        // console.log("getBestSeller response", res.data)
        return { success: true, data: res.data }
    } catch (error) {
        console.error("getBestSeller error", error)
        return { success: false, error: error.response?.data?.message || "getBestSeller failed" }
    }
}
