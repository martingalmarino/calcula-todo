"use client"

import { useState, useEffect } from 'react'
import { SITE, Calculator } from '@/lib/site.config'
import { Chip, ChipsContainer } from '@/components/Chip'

interface CalculatorWithCategory extends Calculator {
  categoryKey: string
  categoryLabel: string
}

// Calculadoras populares por categoría (2 de cada una)
const popularCalculatorsByCategory = {
  'matematicas': ['fracciones', 'porcentajes'],
  'finanzas': ['interes-simple', 'hipoteca'],
  'marketing': ['cac', 'ltv'],
  'curiosas': ['cafe-ahorro', 'pizza-persona'],
  'tecnologia': ['conversion-almacenamiento', 'velocidad-descarga'],
  'geometria': ['circulo', 'rectangulo'],
  'salud': ['imc', 'tmb'],
  'calendario': ['dias-entre-fechas', 'calculadora-edad'],
  'otras': ['calculadora-propinas', 'escala-notas']
}

export function PopularCalculatorsPills() {
  const [randomCalculators, setRandomCalculators] = useState<CalculatorWithCategory[]>([])

  useEffect(() => {
    // Función para obtener calculadoras aleatorias
    const getRandomCalculators = () => {
      const allCalculators: CalculatorWithCategory[] = []
      
      // Recopilar todas las calculadoras populares
      Object.entries(popularCalculatorsByCategory).forEach(([categoryKey, calculatorSlugs]) => {
        const category = SITE.clusters[categoryKey as keyof typeof SITE.clusters]
        if (category) {
          calculatorSlugs.forEach(slug => {
            const calculator = category.calculators.find(calc => 
              calc.href.includes(slug)
            )
            if (calculator) {
              allCalculators.push({
                ...calculator,
                categoryKey,
                categoryLabel: category.label
              })
            }
          })
        }
      })
      
      // Mezclar y tomar 12 calculadoras aleatorias
      const shuffled = allCalculators.sort(() => 0.5 - Math.random())
      setRandomCalculators(shuffled.slice(0, 12))
    }

    getRandomCalculators()
    
    // Actualizar cada 30 segundos para mantener el contenido dinámico
    const interval = setInterval(getRandomCalculators, 30000)
    
    return () => clearInterval(interval)
  }, [])

  if (randomCalculators.length === 0) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Calculadoras Populares
        </h2>
        <p className="text-gray-600">
          Las calculadoras más utilizadas por nuestros usuarios
        </p>
      </div>
      
      <ChipsContainer>
        {randomCalculators.map((calculator, index) => (
          <Chip
            key={`${calculator.categoryKey}-${calculator.href}-${index}`}
            href={calculator.href}
            variant="outline"
            className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            {calculator.label}
          </Chip>
        ))}
      </ChipsContainer>
    </div>
  )
}
