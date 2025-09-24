"use client"
import Link from "next/link"
import Image from "next/image"
import { navigationMenuData } from "@/lib/data"

interface DropdownMenuProps {
  menuKey: string
  isOpen: boolean
  onClose: () => void
}

export function DropdownMenu({ menuKey, isOpen, onClose }: DropdownMenuProps) {
  const menuData = navigationMenuData[menuKey as keyof typeof navigationMenuData]

  if (!menuData || !isOpen) return null

  if (menuData.type === "simple") {
    return (
      <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50">
        {menuData.items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-colors"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
      </div>
    )
  }

  if (menuData.type === "mega") {
    return (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-6 z-50 w-[800px]">
        <div className="flex gap-8">
          <div className="flex-1 grid grid-cols-3 gap-6">
            {menuData.sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-emerald-600 font-semibold text-sm mb-4 uppercase tracking-wide">{section.title}</h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.name}>
                      {section.type === "image-list" ? (
                        <Link
                          href={item.href}
                          className="flex items-center gap-3 text-gray-700 hover:text-emerald-600 transition-colors group"
                          onClick={onClose}
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg?height=40&width=40"}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm group-hover:text-emerald-600">{item.name}</span>
                        </Link>
                      ) : (
                        <Link
                          href={item.href}
                          className="block text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                          onClick={onClose}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {menuData.featuredImage && (
            <div className="w-64 flex-shrink-0">
              <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={menuData.featuredImage || "/placeholder.svg"}
                  alt="Featured product"
                  width={256}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}
