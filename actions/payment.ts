"use server";

import Razorpay from "razorpay";
import { getAccessToken } from "./auth";
import crypto from "crypto";
import axios from "axios";
import { API_URL } from "@/lib/apiUtils";
import { auth } from "@/lib/auth";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

interface OrderItem {
  order_id: string;
  total_amount: number;
  discount: number;
}

interface CreateRazorpayOrderParams {
  orders: OrderItem[];
}

/**
 * Create a Razorpay order with multiple order IDs in notes
 */
export async function createRazorpayOrder(params: CreateRazorpayOrderParams) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    const token = session?.user?.accessToken;
    if (!token || !userId) {
      return {
        success: false,
        message: "Authentication required",
      } as const;
    }

    // Calculate total amount (sum of all order amounts)
    const totalAmount = params.orders.reduce((sum, order) => sum + order.total_amount, 0);

    // Convert to paise (Razorpay expects amount in smallest currency unit)
    const amountInPaise = Math.round(totalAmount * 100);

    // Create order IDs array for notes
    const orderIds = params.orders.map((order) => order.order_id);

    // Razorpay order options
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        order_ids: orderIds.join(","), // Store comma-separated order IDs
        user_id: userId,
      },
    };

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create(options);

    return {
      success: true,
      data: {
        razorpay_order_id: razorpayOrder.id,
        amount: totalAmount,
        currency: razorpayOrder.currency,
        order_ids: orderIds,
      },
    } as const;
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return {
      success: false,
      message: error?.message || "Failed to create payment order",
    } as const;
  }
}

/**
 * Verify Razorpay payment signature
 */
export async function verifyRazorpayPayment(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
) {
  try {
    const token = await getAccessToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      } as const;
    }

    // Generate signature for verification
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    // Verify signature
    if (generatedSignature !== razorpaySignature) {
      return {
        success: false,
        message: "Payment verification failed",
      } as const;
    }

    // If you want to update order status in your backend, do it here
    // Example:
    // await axios.post(`${API_URL}/order/update-payment-status`, {
    //   razorpay_order_id: razorpayOrderId,
    //   razorpay_payment_id: razorpayPaymentId,
    //   payment_status: "success"
    // }, {
    //   headers: { Authorization: `Bearer ${token}` }
    // });

    return {
      success: true,
      message: "Payment verified successfully",
      data: {
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
      },
    } as const;
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return {
      success: false,
      message: error?.message || "Payment verification failed",
    } as const;
  }
}

/**
 * Get Razorpay key for client-side
 */
export async function getRazorpayKey() {
  return process.env.RAZORPAY_KEY_ID || "";
}
