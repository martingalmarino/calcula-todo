"use client"

import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { SITE } from '@/lib/site.config'
import { Calculator, HardDrive, Download, Clock, Palette, Shield, Zap, Users } from 'lucide-react'

const tecnologiaCluster = SITE.clusters.tecnologia

export function TecnologiaClient() {
  const customIcons = {
    '/tecnologia/conversion-almacenamiento/': HardDrive,
    '/tecnologia/velocidad-descarga/': Download,
    '/tecnologia/uptime-downtime/': Clock,
    '/tecnologia/conversion-colores/': Palette,
    '/tecnologia/analisis-contraseñas/': Shield,
    '/tecnologia/analisis-latencia/': Zap
  }

  const customStats = [
    {
      icon: Calculator,
      value: tecnologiaCluster.calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: HardDrive,
      value: '6',
      label: 'Herramientas Tecnológicas',
      color: 'green' as const
    },
    {
      icon: Users,
      value: '100%',
      label: 'Gratuito',
      color: 'purple' as const
    }
  ]

  const faqItems = [
    {
      question: "¿Cómo funciona la conversión de almacenamiento?",
      answer: "Convierte entre diferentes unidades de almacenamiento (KB, MB, GB, TB) usando tanto el sistema decimal (1000) como binario (1024) según el contexto."
    },
    {
      question: "¿Qué es la velocidad de descarga en Mbps vs MB/s?",
      answer: "Mbps (megabits por segundo) es la velocidad de tu conexión, mientras que MB/s (megabytes por segundo) es la velocidad real de descarga. 1 byte = 8 bits."
    },
    {
      question: "¿Cómo calculo uptime y downtime?",
      answer: "El uptime es el tiempo que un servicio está funcionando, mientras que el downtime es el tiempo que está fuera de servicio. Se calcula como porcentaje del tiempo total."
    },
    {
      question: "¿Qué formatos de color soporta la calculadora?",
      answer: "Soporta conversión entre HEX (hexadecimal), RGB (Red, Green, Blue), y CMYK (Cyan, Magenta, Yellow, Black) para diferentes usos en diseño y impresión."
    },
    {
      question: "¿Cómo analizo la seguridad de mis contraseñas?",
      answer: "La calculadora evalúa la fortaleza de tu contraseña basándose en longitud, complejidad, caracteres especiales y patrones comunes para determinar su nivel de seguridad."
    }
  ]

  return (
    <CategoryPageLayout
      category={tecnologiaCluster}
      customIcons={customIcons}
      customStats={customStats}
      faqItems={faqItems}
    />
  )
}