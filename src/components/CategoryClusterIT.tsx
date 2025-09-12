"use client"

import { SITE } from '@/lib/site.config'
import { Calculator, Circle, Square, Triangle, Heart, DollarSign, Target, Coffee, HardDrive, RectangleHorizontal, Scale, Calendar, Wrench, Zap, BarChart3, FlaskRound, LucideIcon } from 'lucide-react'

// Mapeo de iconos por categoría
const categoryIcons: Record<string, LucideIcon> = {
  'matematicas': Calculator,
  'finanzas': DollarSign,
  'marketing': Target,
  'curiosas': Coffee,
  'tecnologia': HardDrive,
  'geometria': Square,
  'salud': Heart,
  'calendario': Calendar,
  'otras': Wrench,
  'fisica': Zap,
  'estadistica': BarChart3,
  'quimica': FlaskRound
}

// Mapeo de colores por categoría
const categoryColors: Record<string, string> = {
  'matematicas': 'text-blue-600',
  'finanzas': 'text-green-600',
  'marketing': 'text-purple-600',
  'curiosas': 'text-orange-600',
  'tecnologia': 'text-indigo-600',
  'geometria': 'text-pink-600',
  'salud': 'text-red-600',
  'calendario': 'text-teal-600',
  'otras': 'text-gray-600',
  'fisica': 'text-yellow-600',
  'estadistica': 'text-cyan-600',
  'quimica': 'text-emerald-600'
}

// Mapeo de etiquetas en italiano
const categoryLabelsIT: Record<string, string> = {
  'matematicas': 'Matematica',
  'finanzas': 'Finanze',
  'marketing': 'Marketing',
  'curiosas': 'Curiose',
  'tecnologia': 'Tecnologia',
  'geometria': 'Geometria',
  'salud': 'Salute',
  'calendario': 'Calendario',
  'otras': 'Altre',
  'fisica': 'Fisica',
  'estadistica': 'Statistica',
  'quimica': 'Chimica'
}

// Mapeo de URLs en italiano
const categoryUrlsIT: Record<string, string> = {
  'matematicas': '/it/matematicas',
  'finanzas': '/it/finanze',
  'marketing': '/it/marketing',
  'curiosas': '/it/curiosas',
  'tecnologia': '/it/tecnologia',
  'geometria': '/it/geometria',
  'salud': '/it/salute',
  'calendario': '/it/calendario',
  'otras': '/it/altre',
  'fisica': '/it/fisica',
  'estadistica': '/it/statistica',
  'quimica': '/it/chimica'
}

export function CategoryClusterIT() {
  // Filtrar categorías excluyendo estadistica y quimica
  const excludedCategories = ['estadistica', 'quimica']
  
  const categories = Object.entries(SITE.clusters)
    .filter(([key]) => !excludedCategories.includes(key))
    .map(([key, cluster]) => ({
      key,
      ...cluster,
      calculatorCount: cluster.calculators.length,
      labelIT: categoryLabelsIT[key] || cluster.label,
      urlIT: categoryUrlsIT[key] || cluster.href
    }))

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl mx-auto">
      {categories.map((category) => {
        const IconComponent = categoryIcons[category.key] || Calculator
        const textColor = categoryColors[category.key] || 'text-gray-600'
        
        return (
          <a
            key={category.key}
            href={category.urlIT}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors`}>
                <IconComponent className={`w-6 h-6 ${textColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {category.labelIT}
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
