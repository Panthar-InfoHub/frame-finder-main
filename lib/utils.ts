import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CheckCircle, Package, Truck, Clock, XCircle } from "lucide-react"
import { Order } from "./type"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOrderStatusConfig(status: Order["order_status"]) {
  switch (status) {
    case "delivered":
      return {
        variant: "default" as const,
        icon: CheckCircle,
        label: "Delivered",
        className: "bg-green-100 text-green-800 hover:bg-green-100",
      }
    case "shipped":
      return {
        variant: "secondary" as const,
        icon: Truck,
        label: "Shipped",
        className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      }
    case "processing":
      return {
        variant: "secondary" as const,
        icon: Package,
        label: "Processing",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      }
    case "pending":
      return {
        variant: "secondary" as const,
        icon: Clock,
        label: "Pending",
        className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      }
    case "cancelled":
      return {
        variant: "destructive" as const,
        icon: XCircle,
        label: "Cancelled",
        className: "bg-red-100 text-red-800 hover:bg-red-100",
      }
  }
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}