"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Pill } from '@/components/Pill'
import { GraduationCap, Fuel, Type, Hash, MousePointer } from 'lucide-react'
import Link from 'next/link'

export default function OtrasClient() {
  const [activeCategory, setActiveCategory] = useState('todas')

  const calculators = [
    {
      id: 'escala-notas',
      title: 'Escala de Notas',
      description: 'Convierte puntuaciones a escala A, B, C, D, F',
      icon: <GraduationCap className="h-6 w-6" />,
      href: '/otras/escala-notas',
      category: 'educacion'
    },
    {
      id: 'gasto-gasolina',
      title: 'Gasto Gasolina',
      description: 'Calcula el costo de combustible por kilómetro',
      icon: <Fuel className="h-6 w-6" />,
      href: '/otras/gasto-gasolina',
      category: 'transporte'
    },
    {
      id: 'contador-palabras',
      title: 'Contador de Palabras',
      description: 'Cuenta palabras, caracteres y tiempo de lectura',
      icon: <Type className="h-6 w-6" />,
      href: '/otras/contador-palabras',
      category: 'texto'
    },
    {
      id: 'numeros-romanos',
      title: 'Números Romanos',
      description: 'Convierte entre números arábigos y romanos',
      icon: <Hash className="h-6 w-6" />,
      href: '/otras/numeros-romanos',
      category: 'conversion'
    },
    {
      id: 'contador-clicks',
      title: 'Contador de Clicks',
      description: 'CPS Test - Mide tu velocidad de clicks',
      icon: <MousePointer className="h-6 w-6" />,
      href: '/otras/contador-clicks',
      category: 'juegos'
    }
  ]

  const categories = [
    { id: 'todas', label: 'Todas' },
    { id: 'educacion', label: 'Educación' },
    { id: 'transporte', label: 'Transporte' },
    { id: 'texto', label: 'Texto' },
    { id: 'conversion', label: 'Conversión' },
    { id: 'juegos', label: 'Juegos' }
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
              Otras Calculadoras
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Herramientas útiles para el día a día: educación, transporte, texto, conversión y más.
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
