"use client";

import { Button } from "../ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";


export function CategoryTab({ categories }) {
   const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClick = (value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("category"); // remove filter
    } else {
      params.set("category", value); // update filter
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const activeCategory = searchParams.get("category");
    return (
    <div className="flex flex-wrap gap-2 mb-6">

      {/* ALL */}
      <Button
        onClick={() => handleClick("all")}
        className={`rounded-full transition-colors
          ${!activeCategory ? "bg-emerald-500 text-white" : "bg-transparent border border-black text-black"}
        `}
      >
        All
      </Button>

      {/* All categories */}
      {categories.map((category) => {
        const isActive = activeCategory === category.value;

        return (
          <Button
            key={category.value}
            onClick={() => handleClick(category.value)}
            className={`rounded-full transition-colors
              ${isActive
                ? "bg-emerald-500 text-white"
                : "bg-transparent border border-black text-black"
              }
            `}
          >
            {category.label}
          </Button>
        );
      })}
    </div>
  );
}