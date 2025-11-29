"use server";

import axios from "axios";

import { API_URL } from "@/lib/apiUtils";
import { auth, signOut } from "@/lib/auth";

export const getAccessToken = async () => {
  const session = await auth();
  if (!session?.user?.accessToken) return null;
  return session?.user?.accessToken;
};

export const loginUser = async (email: string, password?: string) => {
  try {
    let resp;
    if (password) {
      resp = await axios.post(`${API_URL}/auth/login`, {
        loginId: email,
        password,
        type: "USER",
      });
    } else {
      resp = await axios.post(`${API_URL}/auth/login`, {
        loginId: email,
        type: "USER",
      });
    }

    if (!resp.data.success) throw new Error("Invalid credentials");
    const data = resp.data.data;
    return { success: true, data: data }; // contains user + accessToken
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Login failed" };
  }
};

export const registerUser = async (userData: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  try {
    const resp = await axios.post(`${API_URL}/user`, userData);

    if (!resp.data.success) {
      throw new Error(resp.data.message || "Registration failed");
    }

    return { success: true, data: resp.data.data };
  } catch (error: any) {
    console.error("Error registering user:", error);

    // Handle specific error messages from backend
    if (error.response?.data?.message) {
      return { success: false, message: error.response.data.message };
    }

    if (error.response?.status === 400) {
      return { success: false, message: "Invalid input. Please check your details." };
    }

    if (error.response?.status === 409) {
      return { success: false, message: "Email or phone already exists." };
    }

    return { success: false, message: "Registration failed. Please try again." };
  }
};

export const logoutUser = async () => {
  try {
    await signOut({ redirectTo: "/login" });
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, message: "Logout failed" };
  }
};
