import { Button } from "@/components/ui/button";
import { ShoppingCart, Package } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  name: string;
}

export function EmptyComponent({ name }: EmptyStateProps) {
  const isCart = name.toLowerCase().includes("cart");
  const Icon = isCart ? ShoppingCart : Package;

  return (
    <div className="flex items-center justify-center container min-h-[60vh] bg-white/20 backdrop-blur-sm rounded-2xl shadow-md border">
      <div className="text-center space-y-4 p-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-100 rounded-full p-6">
            <Icon className="w-16 h-16 text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">Your {name.toLowerCase()} is empty</h2>

        <p className="text-gray-500 max-w-sm mx-auto">
          {isCart ? "Add items to your cart to get started" : `No ${name.toLowerCase()} to display`}
        </p>

        <Button asChild className="mt-4">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
