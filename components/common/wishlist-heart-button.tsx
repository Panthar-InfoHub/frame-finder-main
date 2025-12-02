"use client";

import { useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";
import { addToWishlist, removeFromWishlist, getWishlistItemId } from "@/actions/wishlist";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types/product";

interface WishlistHeartButtonProps {
  productId: string;
  productType: ProductType;
  variantId?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function WishlistHeartButton({
  productId,
  productType,
  variantId,
  className = "",
  size = "md",
}: WishlistHeartButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  // Check if item is already in wishlist on mount
  useEffect(() => {
    const checkWishlist = async () => {
      if (status === "authenticated") {
        setIsChecking(true);
        const itemId = await getWishlistItemId(productId, variantId);
        setIsInWishlistState(itemId !== null);
        setIsChecking(false);
      } else {
        setIsChecking(false);
      }
    };

    checkWishlist();
  }, [productId, variantId, status]);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    if (status !== "authenticated") {
      toast.error("Please login to add items to wishlist");
      router.push("/login");
      return;
    }

    setIsLoading(true);

    try {
      if (isInWishlistState) {
        // Remove from wishlist - get the item ID first
        const itemId = await getWishlistItemId(productId, variantId);
        if (itemId) {
          const result = await removeFromWishlist(itemId);
          if (result.success) {
            setIsInWishlistState(false);
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        }
      } else {
        // Add to wishlist
        const result = await addToWishlist(productId, productType, variantId);
        if (result.success) {
          setIsInWishlistState(true);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isLoading || isChecking}
      className={`
        ${sizeClasses[size]}
        rounded-full
        flex items-center justify-center
        transition-all duration-200
        ${
          isInWishlistState
            ? "bg-red-100 text-red-600 hover:bg-red-200"
            : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-600"
        }
        ${isLoading || isChecking ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
        backdrop-blur-sm shadow-sm
        ${className}
      `}
      aria-label={isInWishlistState ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isLoading || isChecking ? (
        <Loader2 size={iconSizes[size]} className="animate-spin" />
      ) : (
        <Heart size={iconSizes[size]} className={isInWishlistState ? "fill-current" : ""} />
      )}
    </button>
  );
}
