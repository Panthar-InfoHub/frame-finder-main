import Link from "next/link"
import Image from "next/image"
import { navigationMenuData } from "@/lib/data"

export function SunglassesMegaMenu() {
  const menuData = navigationMenuData.SUNGLASSES

  if (!menuData || menuData.type !== "mega") {
    return null
  }

  return (
    <div className="w-[650px] p-6 bg-white rounded-lg">
      <div className="grid grid-cols-[auto_auto_1fr] gap-8">
        {/* Render sections (Gender and Shape) */}
        {menuData.sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-base font-semibold text-primary mb-4">{section.title}</h3>
            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link href={item.href} className="flex items-center gap-3 hover:text-emerald-200 transition-colors group">
                    {section.type === "image-list" && item.image && (
                      <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <span className="text-sm text-gray-700 transition-colors hover:text-emerald-500">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Featured image section */}
        {menuData.featuredImage && (
          <div className="bg-liner-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-6">
            <div className="relative w-full h-40">
              <Image
                src={menuData.featuredImage || "/placeholder.svg"}
                alt="Featured Sunglasses"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
