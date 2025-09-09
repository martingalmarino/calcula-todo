"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface SEOTitleManagerProps {
  fallbackTitle?: string
}

/**
 * Componente que extrae automáticamente el H1 de la página y lo usa como page title
 * Previene que los títulos SEO se pisen en futuros deploys
 */
export function SEOTitleManager({ fallbackTitle }: SEOTitleManagerProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Función para extraer el título del H1
    const extractTitleFromH1 = (): string | null => {
      const h1Element = document.querySelector('h1')
      if (h1Element) {
        return h1Element.textContent?.trim() || null
      }
      return null
    }

    // Función para actualizar el título de la página
    const updatePageTitle = (title: string) => {
      document.title = title
      
      // También actualizar meta tags de Open Graph y Twitter
      const ogTitle = document.querySelector('meta[property="og:title"]')
      const twitterTitle = document.querySelector('meta[name="twitter:title"]')
      
      if (ogTitle) {
        ogTitle.setAttribute('content', title)
      }
      if (twitterTitle) {
        twitterTitle.setAttribute('content', title)
      }
    }

    // Intentar extraer el título del H1
    const h1Title = extractTitleFromH1()
    
    if (h1Title) {
      updatePageTitle(h1Title)
    } else if (fallbackTitle) {
      updatePageTitle(fallbackTitle)
    }

    // Observer para detectar cambios en el H1 (útil para SPAs)
    const observer = new MutationObserver(() => {
      const newH1Title = extractTitleFromH1()
      if (newH1Title) {
        updatePageTitle(newH1Title)
      }
    })

    // Observar cambios en el body
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    })

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [pathname, fallbackTitle])

  // Este componente no renderiza nada
  return null
}

/**
 * Hook personalizado para obtener el título actual de la página
 */
export function usePageTitle(): string {
  if (typeof window !== 'undefined') {
    return document.title
  }
  return ''
}

/**
 * Función utilitaria para formatear títulos de calculadoras
 */
export function formatCalculatorTitle(h1Text: string): string {
  // Si ya contiene "Calculadora de", lo devolvemos tal como está
  if (h1Text.includes('Calculadora de')) {
    return h1Text
  }
  
  // Si no, agregamos el prefijo "Calculadora de"
  return `Calculadora de ${h1Text}`
}
