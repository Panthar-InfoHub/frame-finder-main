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
export async function getOrderByUser() {
    try {
        const headers = await getAuthHeaders()
        const res = await axios.get(`${API_URL}/order/my-order`, { headers })
        return res.data
    } catch (error: any) {
        console.error("getOrderByUser error", error)
        return { success: false, error: error.response?.data?.message || `Failed to fetch order` }
    }
}