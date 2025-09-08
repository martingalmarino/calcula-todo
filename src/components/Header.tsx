"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Calculator, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Container } from "@/components/Container"

const navigationItems = [
  { label: "Finanzas", href: "/finanzas", hasDropdown: true },
  { label: "Salud", href: "/salud", hasDropdown: true },
  { label: "Matemática", href: "/matematicas", hasDropdown: true },
  { label: "Estadística", href: "/estadistica", hasDropdown: true },
  { label: "Geometría", href: "/geometria", hasDropdown: true },
  { label: "Calendario", href: "/calendario", hasDropdown: true },
  { label: "Otras", href: "/otras", hasDropdown: true },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header-bg sticky top-0 z-50 w-full">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 header-text" />
            <span className="text-xl font-bold header-text">Calculatodo.com</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="header-text text-sm font-medium transition-colors hover:opacity-80 flex items-center space-x-1"
              >
                <span>{item.label}</span>
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-1 header-text">
              <Globe className="h-4 w-4" />
              <span className="text-sm">ES</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="header-text hover:bg-white/10"
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
                  className="block px-3 py-2 text-base font-medium header-text hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
