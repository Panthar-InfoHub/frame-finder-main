import Link from "next/link"
import Image from "next/image"
import { navigationMenuData } from "@/lib/data"

export function EyeglassesMegaMenu() {
  const menuData = navigationMenuData.EYEGLASSES

  if (!menuData || menuData.type !== "mega") {
    return null
  }

  return (
    <div className="w-[800px] p-6 bg-white">
      <div className="grid grid-cols-4 gap-6">
        {/* Render sections */}
        {menuData.sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-semibold text-primary mb-4">{section.title}</h3>
            <ul className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link href={item.href} className="flex items-center gap-3 hover:text-primary transition-colors">
                    {section.type === "image-list" && item.image && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <span className="text-sm text-gray-700 hover:text-primary">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Featured image section */}
        {menuData.featuredImage && (
          <div className="bg-black rounded-lg overflow-hidden flex items-center justify-center p-4">
            <div className="relative w-full h-48">
              <Image
                src={menuData.featuredImage || "/placeholder.svg"}
                alt="Featured Product"
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
