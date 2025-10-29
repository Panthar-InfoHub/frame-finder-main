"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { DropdownMenu } from "./dropdown-menu"

interface NavigationItemProps {
  name: string
  href: string
}

export function NavigationItem({ name, href }: NavigationItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const itemRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div ref={itemRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        href={href}
        className="text-white hover:text-emerald-300 transition-colors text-xs font-medium uppercase tracking-wide"
      >
        {name}
      </Link>
      <DropdownMenu menuKey={name} isOpen={isOpen} onClose={handleClose} />
    </div>
  )
}
