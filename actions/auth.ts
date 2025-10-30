"use server";

import axios from "axios";

import { API_URL } from "@/lib/apiUtils";
import { auth } from "@/lib/auth";

export const getAccessToken = async () => {
  const session = await auth();
  if (!session?.user?.accessToken) return null;
  return session?.user?.accessToken;
};

export const loginUser = async (email: string, password: string) => {
  try {
    const resp = await axios.post(`${API_URL}/auth/login`, {
      loginId: email,
      password,
      type: "USER",
    });

    if (!resp.data.success) throw new Error("Invalid credentials");
    return resp.data.data; // contains user + accessToken
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};
