"use server"
import axios from "axios"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { API_URL } from "@/lib/apiUtils"
import { auth } from "@/lib/auth"

// Resolve the Bearer token from next-auth session (preferred) or cookies (fallback)
export async function getAuthHeaders() {
    const jar = await cookies()
    const session = await auth().catch(() => null)
    if (!session?.user?.accessToken) return null;
    const token =
        session?.user?.accessToken ||
        jar.get("accessToken")?.value ||
        jar.get("token")?.value

    return token ? { Authorization: `Bearer ${token}` } : {}
}

// ───────────────────────────────────────────────────────────────────────────────
// GET: User
export async function getUser() {
    try {
        const headers = await getAuthHeaders()
        const res = await axios.get(`${API_URL}/user`, { headers })
        // console.log("getUser response", res.data)
        return res.data
    } catch (error: any) {
        console.error("getUser error", error)
        return { success: false, error: error.response?.data?.message || `Failed to fetch user` }
    }
}


export async function updateUser(data: any) {
    try {
        const headers = await getAuthHeaders()
        const res = await axios.put(`${API_URL}/user`, data, { headers })
        // console.log("getUser response", res.data)
        revalidatePath("/account")
        return res.data
    } catch (error: any) {
        console.error("getUser error", error)
        return { success: false, error: error.response?.data?.message || `Failed to fetch user` }
    }
}