"use client"

import { SITE_IT } from '@/lib/site-config-it'
import { Calculator, Circle, Square, Triangle, Heart, DollarSign, Target, Coffee, HardDrive, RectangleHorizontal, Scale, Calendar, Wrench, LucideIcon } from 'lucide-react'

// Mapeo de iconos por categoría
const categoryIcons: Record<string, LucideIcon> = {
  'matematicas': Calculator,
  'finanze': DollarSign,
  'marketing': Target,
  'curiosas': Coffee,
  'tecnologia': HardDrive,
  'geometria': Square,
  'salute': Heart,
  'calendario': Calendar,
  'altre': Wrench
}

// Mapeo de colores por categoría
const categoryColors: Record<string, string> = {
  'matematicas': 'text-blue-600',
  'finanze': 'text-green-600',
  'marketing': 'text-purple-600',
  'curiosas': 'text-orange-600',
  'tecnologia': 'text-indigo-600',
  'geometria': 'text-pink-600',
  'salute': 'text-red-600',
  'calendario': 'text-teal-600',
  'altre': 'text-gray-600'
}

export function CategoryClusterIT() {
  // Usar la configuración específica de italiano
  const categories = Object.entries(SITE_IT.clusters)
    .map(([key, cluster]) => ({
      key,
      ...cluster,
      calculatorCount: cluster.calculators.length
    }))

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl mx-auto">
      {categories.map((category) => {
        const IconComponent = categoryIcons[category.key] || Calculator
        const textColor = categoryColors[category.key] || 'text-gray-600'
        
        return (
          <a
            key={category.key}
            href={category.href}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors`}>
                <IconComponent className={`w-6 h-6 ${textColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {category.label}
                </h3>
                <p className="text-xs text-gray-500">
                  {category.calculatorCount} calcolatrici
                </p>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}
