"use client"

import { useState } from 'react'
import { CardCalculator } from '@/components/CardCalculator'
import { Pill } from '@/components/Pill'

interface Calculator {
  label: string
  description: string
  href: string
  category: string
}

interface MatematicasClientProps {
  calculators: Calculator[]
}

export function MatematicasClient({ calculators }: MatematicasClientProps) {
  // Estado para el filtrado
  const [activeFilter, setActiveFilter] = useState<string>('todas')

  // Agrupar calculadoras por categoría
  const calculatorsByCategory = calculators.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = []
    }
    acc[calc.category].push(calc)
    return acc
  }, {} as Record<string, Calculator[]>)

  // Filtrar calculadoras según la categoría activa
  const filteredCalculators = activeFilter === 'todas' 
    ? calculators 
    : calculators.filter(calc => calc.category === activeFilter)

  return (
    <>
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Pill 
          active={activeFilter === 'todas'}
          onClick={() => setActiveFilter('todas')}
          className="cursor-pointer hover:bg-red-100 transition-colors"
        >
          Todas
        </Pill>
        {Object.keys(calculatorsByCategory).map((category) => (
          <Pill 
            key={category}
            active={activeFilter === category}
            onClick={() => setActiveFilter(category)}
            className="cursor-pointer hover:bg-red-100 transition-colors"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Pill>
        ))}
      </div>

      {/* Calculators by Category */}
      {activeFilter === 'todas' ? (
        Object.entries(calculatorsByCategory).map(([category, categoryCalculators]) => (
          <section key={category} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 capitalize text-gray-900 border-b-2 border-red-200 pb-2">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryCalculators.map((calculator) => (
                <CardCalculator
                  key={calculator.href}
                  title={calculator.label}
                  description={calculator.description}
                  href={calculator.href}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 capitalize text-gray-900 border-b-2 border-red-200 pb-2">
            {activeFilter}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calculator) => (
              <CardCalculator
                key={calculator.href}
                title={calculator.label}
                description={calculator.description}
                href={calculator.href}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Calculators Grid - Solo mostrar cuando no hay filtro activo */}
      {activeFilter === 'todas' && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b-2 border-red-200 pb-2">
            Todas las Calculadoras
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calculator) => (
              <CardCalculator
                key={calculator.href}
                title={calculator.label}
                description={calculator.description}
                href={calculator.href}
              />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
