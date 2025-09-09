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
      {/* Category Pills - Mejorado con nuevo branding */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Pill 
          active={activeFilter === 'todas'}
          onClick={() => setActiveFilter('todas')}
          size="lg"
          className="cursor-pointer"
        >
          Todas
        </Pill>
        {Object.keys(calculatorsByCategory).map((category) => (
          <Pill 
            key={category}
            active={activeFilter === category}
            onClick={() => setActiveFilter(category)}
            size="lg"
            className="cursor-pointer"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Pill>
        ))}
      </div>

      {/* Calculators by Category - Mejorado con nuevo branding */}
      {activeFilter === 'todas' ? (
        Object.entries(calculatorsByCategory).map(([category, categoryCalculators]) => (
          <section key={category} className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 capitalize text-blue-600">
                {category}
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 capitalize text-blue-600">
              {activeFilter}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 text-blue-600">
              Todas las Calculadoras
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
