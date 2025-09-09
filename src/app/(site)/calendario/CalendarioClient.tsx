"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Pill } from '@/components/Pill'
import { Calendar, Clock, User, Plus, Plane } from 'lucide-react'
import Link from 'next/link'

export default function CalendarioClient() {
  const [activeCategory, setActiveCategory] = useState('todas')

  const calculators = [
    {
      id: 'dias-entre-fechas',
      title: 'Días entre Fechas',
      description: 'Calcula la diferencia en días entre dos fechas',
      icon: <Calendar className="h-6 w-6" />,
      href: '/calendario/dias-entre-fechas',
      category: 'fechas'
    },
    {
      id: 'calculadora-edad',
      title: 'Calculadora de Edad',
      description: 'Calcula tu edad exacta en años, meses y días',
      icon: <User className="h-6 w-6" />,
      href: '/calendario/calculadora-edad',
      category: 'edad'
    },
    {
      id: 'sumar-restar-dias',
      title: 'Sumar/Restar Días',
      description: 'Suma o resta días a una fecha específica',
      icon: <Plus className="h-6 w-6" />,
      href: '/calendario/sumar-restar-dias',
      category: 'fechas'
    },
    {
      id: 'horas-minutos',
      title: 'Horas y Minutos',
      description: 'Suma y resta horas y minutos',
      icon: <Clock className="h-6 w-6" />,
      href: '/calendario/horas-minutos',
      category: 'tiempo'
    },
    {
      id: 'dias-vacaciones',
      title: 'Días de Vacaciones',
      description: 'Calcula días laborables excluyendo fines de semana',
      icon: <Plane className="h-6 w-6" />,
      href: '/calendario/dias-vacaciones',
      category: 'vacaciones'
    }
  ]

  const categories = [
    { id: 'todas', label: 'Todas' },
    { id: 'fechas', label: 'Fechas' },
    { id: 'edad', label: 'Edad' },
    { id: 'tiempo', label: 'Tiempo' },
    { id: 'vacaciones', label: 'Vacaciones' }
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
              Calculadoras de Calendario
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Herramientas útiles para trabajar con fechas, tiempo y calendarios. Calcula edades, diferencias de fechas, horas y días de vacaciones.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                      Usar →
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
              Si no encuentras la calculadora de calendario que buscas, contáctanos y la agregaremos.
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
