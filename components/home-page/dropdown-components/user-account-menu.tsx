"use client"

import { useState } from "react"
import Link from "next/link"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { navigationMenuData } from "@/lib/data"

export function UserAccountMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const userData = navigationMenuData.USER

  if (!userData || userData.type !== "user-menu") {
    return null
  }

  return (
    <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <User className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-white">
          {userData.items.map((item) => (
            <DropdownMenuItem key={item.name} asChild>
              <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer w-full">
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
