"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Pill } from '@/components/Pill'
import { Heart, Activity, Scale, Zap, Droplets, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function SaludClient() {
  const [activeCategory, setActiveCategory] = useState('todas')

  const calculators = [
    {
      id: 'imc',
      title: 'Calculadora de IMC',
      description: 'Índice de Masa Corporal - Evalúa tu peso ideal',
      icon: <Scale className="h-6 w-6" />,
      href: '/salud/imc',
      category: 'peso'
    },
    {
      id: 'tmb',
      title: 'Calculadora de TMB',
      description: 'Tasa Metabólica Basal - Calorías que quemas en reposo',
      icon: <Activity className="h-6 w-6" />,
      href: '/salud/tmb',
      category: 'metabolismo'
    },
    {
      id: 'grasa-corporal',
      title: 'Grasa Corporal',
      description: 'Porcentaje de grasa corporal - Composición corporal',
      icon: <Heart className="h-6 w-6" />,
      href: '/salud/grasa-corporal',
      category: 'composicion'
    },
    {
      id: 'pafi',
      title: 'Calculadora PaFi',
      description: 'Presión arterial y frecuencia cardíaca - Salud cardiovascular',
      icon: <Zap className="h-6 w-6" />,
      href: '/salud/pafi',
      category: 'cardiovascular'
    },
    {
      id: 'agua-diaria',
      title: 'Agua Diaria',
      description: 'Ingesta recomendada de agua - Hidratación saludable',
      icon: <Droplets className="h-6 w-6" />,
      href: '/salud/agua-diaria',
      category: 'hidratacion'
    },
    {
      id: 'ovulacion',
      title: 'Ovulación',
      description: 'Días fértiles y ciclo menstrual - Planificación familiar',
      icon: <Calendar className="h-6 w-6" />,
      href: '/salud/ovulacion',
      category: 'reproductivo'
    }
  ]

  const categories = [
    { id: 'todas', label: 'Todas' },
    { id: 'peso', label: 'Peso' },
    { id: 'metabolismo', label: 'Metabolismo' },
    { id: 'composicion', label: 'Composición' },
    { id: 'cardiovascular', label: 'Cardiovascular' },
    { id: 'hidratacion', label: 'Hidratación' },
    { id: 'reproductivo', label: 'Reproductivo' }
  ]

  const filteredCalculators = activeCategory === 'todas' 
    ? calculators 
    : calculators.filter(calc => calc.category === activeCategory)

  return (
    <div className="min-h-screen bg-background">
      <Container>
        <div className="py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              Calculadoras de Salud
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Herramientas médicas online para evaluar tu salud: IMC, TMB, grasa corporal y más.
            </p>
          </div>

          {/* Filtros por categoría */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Pill
                key={category.id}
                active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Pill>
            ))}
          </div>

          {/* Grid de calculadoras */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredCalculators.map((calculator) => (
              <Link key={calculator.id} href={calculator.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit group-hover:bg-blue-200 transition-colors">
                      {calculator.icon}
                    </div>
                    <CardTitle className="text-lg">{calculator.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-blue-600 font-medium group-hover:text-blue-700">
                      Calcular →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              ¿Necesitas una calculadora específica?
            </h2>
            <p className="text-gray-700 mb-6">
              Si no encuentras la calculadora que buscas, contáctanos y la agregaremos.
            </p>
            <Link 
              href="/contacto"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contactar
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
