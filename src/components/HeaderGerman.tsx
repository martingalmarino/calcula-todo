"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Calculator, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/Container"
import { LanguageSelector } from "@/components/LanguageSelector"

const navigationItems = [
  { label: "Finanzen", href: "/de/finanzen", hasDropdown: true },
  { label: "Gesundheit", href: "/de/gesundheit", hasDropdown: true },
  { label: "Mathematik", href: "/de/mathematik", hasDropdown: true },
  { label: "Kurioses", href: "/de/kurioses", hasDropdown: true },
  { label: "Geometrie", href: "/de/geometrie", hasDropdown: true },
  { label: "Kalender", href: "/de/kalender", hasDropdown: true },
  { label: "Andere", href: "/de/andere", hasDropdown: true },
]

export function HeaderGerman() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-blue-900 sticky top-0 z-50 w-full shadow-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/de" className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-white" />
            <span className="text-lg font-bold text-white">CalculaAlles.online</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-blue-200 transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Selector */}
          <div className="hidden md:flex">
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-blue-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-800 py-4">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-blue-200 transition-colors font-medium px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 py-2">
                <LanguageSelector />
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}
