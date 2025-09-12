"use client"

import { useState, useEffect } from 'react'
import { SITE, Calculator } from '@/lib/site.config'
import { Chip, ChipsContainer } from '@/components/Chip'

interface CalculatorWithCategory {
  label: string
  href: string
  icon: string
  categoryKey: string
  categoryLabel: string
}

// Calculadoras populares por categoría (2 de cada una) con URLs italianas
const popularCalculatorsByCategoryIT = {
  'matematicas': [
    { slug: 'frazioni', label: 'Calcolatrice di Frazioni', href: '/it/matematicas/frazioni/' },
    { slug: 'percentuali', label: 'Calcolatrice di Percentuali', href: '/it/matematicas/percentuali/' }
  ],
  'finanzas': [
    { slug: 'interesse-semplice', label: 'Interesse Semplice', href: '/it/finanze/interesse-semplice/' },
    { slug: 'calcolatrice-mutuo', label: 'Calcolatrice di Mutuo', href: '/it/finanze/calcolatrice-mutuo/' }
  ],
  'marketing': [
    { slug: 'cac', label: 'CAC - Costo di Acquisizione', href: '/it/marketing/cac/' },
    { slug: 'ltv', label: 'LTV - Lifetime Value', href: '/it/marketing/ltv/' }
  ],
  'curiosas': [
    { slug: 'caffe-risparmio', label: 'Caffè vs. Risparmio', href: '/it/curiosas/caffe-risparmio/' },
    { slug: 'pizza-persona', label: 'Pizza per Persona', href: '/it/curiosas/pizza-persona/' }
  ],
  'tecnologia': [
    { slug: 'conversione-archiviazione', label: 'Conversione di Archiviazione', href: '/it/tecnologia/conversione-archiviazione/' },
    { slug: 'velocita-download', label: 'Velocità di Download', href: '/it/tecnologia/velocita-download/' }
  ],
  'geometria': [
    { slug: 'cerchio', label: 'Area e Perimetro del Cerchio', href: '/it/geometria/cerchio/' },
    { slug: 'rettangolo', label: 'Area e Perimetro del Rettangolo', href: '/it/geometria/rettangolo/' }
  ],
  'salud': [
    { slug: 'imc', label: 'Indice di Massa Corporea (IMC)', href: '/it/salute/imc/' },
    { slug: 'tmb', label: 'Tasso Metabolico Basale (TMB)', href: '/it/salute/tmb/' }
  ],
  'calendario': [
    { slug: 'contatore-giorni-date', label: 'Contatore di Giorni tra Date', href: '/it/calendario/contatore-giorni-date/' },
    { slug: 'calcolatrice-eta', label: 'Calcolatrice dell\'Età', href: '/it/calendario/calcolatrice-eta/' }
  ],
  'otras': [
    { slug: 'calcolatrice-mance', label: 'Calcolatrice di Mance', href: '/it/altre/calcolatrice-mance/' },
    { slug: 'scala-di-voti', label: 'Scala di Voti', href: '/it/altre/scala-di-voti/' }
  ]
}

export function PopularCalculatorsPillsIT() {
  const [randomCalculators, setRandomCalculators] = useState<CalculatorWithCategory[]>([])

  useEffect(() => {
    // Función para obtener calculadoras aleatorias
    const getRandomCalculators = () => {
      const allCalculators: CalculatorWithCategory[] = []
      
      // Recopilar todas las calculadoras populares
      Object.entries(popularCalculatorsByCategoryIT).forEach(([categoryKey, calculators]) => {
        const category = SITE.clusters[categoryKey as keyof typeof SITE.clusters]
        if (category) {
          calculators.forEach(calc => {
            allCalculators.push({
              label: calc.label,
              href: calc.href,
              icon: 'calculator',
              categoryKey,
              categoryLabel: category.label
            })
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
          Calcolatrici Popolari
        </h2>
        <p className="text-gray-600">
          Le calcolatrici più utilizzate dai nostri utenti
        </p>
      </div>
      
      <ChipsContainer>
        {randomCalculators.map((calculator, index) => (
          <Chip
            key={`${calculator.categoryKey}-${calculator.href}-${index}`}
            href={calculator.href}
            icon={calculator.icon || 'calculator'}
            className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            {calculator.label}
          </Chip>
        ))}
      </ChipsContainer>
    </div>
  )
}
