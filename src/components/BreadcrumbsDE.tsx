"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface BreadcrumbsDEProps {
  items: BreadcrumbItem[]
  className?: string
}

export function BreadcrumbsDE({ items, className }: BreadcrumbsDEProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center space-x-2 text-sm text-gray-600 mb-8", className)}
    >
      <Link 
        href="/de" 
        className="flex items-center hover:text-blue-600 transition-colors duration-200"
        aria-label="Startseite"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Startseite</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.current ? (
            <span className="font-semibold text-blue-600" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link 
              href={item.href}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
