"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigationMenuData } from "@/lib/data";
import { logoutUser } from "@/actions/auth";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function UserAccountMenu({ shouldBlur }: { shouldBlur: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const userData = navigationMenuData.USER;

  if (!userData || userData.type !== "user-menu") {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    toast.dismiss();

    try {
      const result = await logoutUser();
      if (result.success) {
        toast.success("Logged out successfully!");
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
      setIsLoggingOut(false);
    }
  };

  // If user is not logged in, show login button
  if (status === "unauthenticated") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/login")}
        className={`${shouldBlur ? "text-black" : "text-white hover:bg-[#00AA78]!"}`}
      >
        <User className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
    );
  }

  // If loading, show the icon without action
  if (status === "loading") {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className={`${shouldBlur ? "text-black" : "text-white"}`}
      >
        <User className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
    );
  }

  // If user is logged in, show dropdown menu
  return (
    <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`${shouldBlur ? "text-black" : "text-white hover:bg-[#00AA78]!"}`}
          >
            <User className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white">
          {userData.items.map((item) => {
            // Handle logout action
            if (item.action === "logout") {
              return (
                <DropdownMenuItem
                  key={item.name}
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  {isLoggingOut ? "Logging out..." : item.name}
                </DropdownMenuItem>
              );
            }

            // Handle regular links
            return (
              <DropdownMenuItem key={item.name} asChild>
                <Link
                  href={item.href || "#"}
                  className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer w-full"
                >
                  {item.name}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
