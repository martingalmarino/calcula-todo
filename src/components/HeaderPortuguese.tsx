"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Calculator, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/Container"
import { LanguageSelector } from "@/components/LanguageSelector"

const navigationItems = [
  { label: "Finanças", href: "/pt/financas", hasDropdown: true },
  { label: "Saúde", href: "/pt/saude", hasDropdown: true },
  { label: "Matemática", href: "/pt/matematica", hasDropdown: true },
  { label: "Curiosas", href: "/pt/curiosas", hasDropdown: true },
  { label: "Geometria", href: "/pt/geometria", hasDropdown: true },
  { label: "Calendário", href: "/pt/calendario", hasDropdown: true },
  { label: "Tecnologia", href: "/pt/tecnologia", hasDropdown: true },
  { label: "Outras", href: "/pt/outras", hasDropdown: true },
]

export function HeaderPortuguese() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-blue-900 sticky top-0 z-50 w-full shadow-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/pt" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">CalculaTudo.online</span>
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
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:text-blue-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-800">
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-white hover:text-blue-400 hover:bg-blue-800 rounded-md transition-colors"
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
