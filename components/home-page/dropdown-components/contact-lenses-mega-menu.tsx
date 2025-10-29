import Link from "next/link"
import { navigationMenuData } from "@/lib/data"

export function ContactLensesMegaMenu() {
  const menuData = navigationMenuData["CONTACT LENSES"]

  if (!menuData || menuData.type !== "simple-categories") {
    return null
  }

  return (
    <div className="w-[280px] p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col gap-4">
        {menuData.categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="text-base text-gray-500 hover:text-gray-700 transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
