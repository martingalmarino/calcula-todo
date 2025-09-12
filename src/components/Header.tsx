"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Calculator, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/Container"
import { LanguageSelector } from "@/components/LanguageSelector"

const navigationItems = [
  { label: "Finanzas", href: "/finanzas", hasDropdown: true },
  { label: "Salud", href: "/salud", hasDropdown: true },
  { label: "Matemática", href: "/matematicas", hasDropdown: true },
  { label: "Curiosas", href: "/curiosas", hasDropdown: true },
  { label: "Geometría", href: "/geometria", hasDropdown: true },
  { label: "Calendario", href: "/calendario", hasDropdown: true },
  { label: "Otras", href: "/otras", hasDropdown: true },
  { label: "Trivias", href: "/trivias", hasDropdown: false },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-blue-900 sticky top-0 z-50 w-full shadow-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-white" />
            <span className="text-lg font-bold text-white">CalculaTodo.online</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white text-sm font-medium transition-colors hover:text-blue-400 flex items-center space-x-1"
              >
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-white/20">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-white hover:text-blue-400 hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2 border-t border-white/20 mt-2 pt-4">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
