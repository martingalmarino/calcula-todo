"use client"

import { createContext, useContext, useEffect } from 'react'

interface AnalyticsContextType {
  track: (event: string, properties?: Record<string, unknown>) => void
  page: (url: string, title?: string) => void
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  track: () => {},
  page: () => {},
})

export function useAnalytics() {
  return useContext(AnalyticsContext)
}

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Inicializar analytics cuando esté disponible
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Aquí se puede inicializar Google Analytics, Mixpanel, etc.
      console.log('Analytics initialized')
    }
  }, [])

  const track = (event: string, properties?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Enviar evento a analytics
      console.log('Analytics event:', event, properties)
    }
  }

  const page = (url: string, title?: string) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Enviar página a analytics
      console.log('Analytics page:', url, title)
    }
  }

  return (
    <AnalyticsContext.Provider value={{ track, page }}>
      {children}
    </AnalyticsContext.Provider>
  )
}
