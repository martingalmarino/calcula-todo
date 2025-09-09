"use client"

import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FAQ } from '@/components/FAQ'
import { jsonLdCollection } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'
import Link from 'next/link'
import { Calculator, LucideIcon } from 'lucide-react'
import { Category, Calculator as CalculatorType } from '@/lib/site.config'
import { usePathname } from 'next/navigation'

interface CategoryPageLayoutProps {
  category: Category
  customIcons?: Record<string, LucideIcon>
  customStats?: Array<{
    icon: LucideIcon
    value: string
    label: string
    color: 'blue' | 'green' | 'purple'
  }>
  faqItems: Array<{
    question: string
    answer: string
  }>
  breadcrumbs?: Array<{
    label: string
    href: string
  }>
}

export function CategoryPageLayout({ 
  category, 
  customIcons = {}, 
  customStats,
  faqItems,
  breadcrumbs: customBreadcrumbs
}: CategoryPageLayoutProps) {
  const calculators = category.calculators
  const pathname = usePathname()
  const isItalian = pathname.startsWith('/it')

  // Stats por defecto si no se proporcionan personalizadas
  const defaultStats = [
    {
      icon: Calculator,
      value: calculators.length.toString(),
      label: 'Calculadoras Disponibles',
      color: 'blue' as const
    },
    {
      icon: Calculator,
      value: '100%',
      label: 'Gratuitas',
      color: 'green' as const
    },
    {
      icon: Calculator,
      value: 'Precisas',
      label: 'Cálculos',
      color: 'purple' as const
    }
  ]

  const stats = customStats || defaultStats

  const getColorClasses = (color: 'blue' | 'green' | 'purple') => {
    switch (color) {
      case 'blue':
        return {
          bg: 'from-blue-100 to-blue-200',
          text: 'text-blue-600',
          title: 'text-blue-600'
        }
      case 'green':
        return {
          bg: 'from-green-100 to-green-200',
          text: 'text-green-600',
          title: 'text-green-600'
        }
      case 'purple':
        return {
          bg: 'from-purple-100 to-purple-200',
          text: 'text-purple-600',
          title: 'text-purple-600'
        }
    }
  }

  const getIcon = (calculator: CalculatorType) => {
    const href = calculator.href
    const customIcon = customIcons[href]
    if (customIcon && href in customIcons) {
      const IconComponent = customIcon
      return <IconComponent className="h-6 w-6" />
    }
    return <Calculator className="h-6 w-6" />
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection({
            name: category.label,
            description: category.description,
            url: category.href,
            calculators: calculators.map(calc => ({
              name: calc.label,
              url: calc.href,
              description: `Calculadora de ${calc.label.toLowerCase()} - ${category.description}`
            }))
          }))
        }}
      />

      <Container>
        <div className="py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={customBreadcrumbs || getBreadcrumbs(category.href)} />

          {/* Header */}
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
              {category.label}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {category.description}
            </p>
            <div className="w-32 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => {
              const colors = getColorClasses(stat.color)
              const IconComponent = stat.icon
              
              return (
                <Card key={index} className="text-center calculator-card shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-6">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center mb-6`}>
                      <IconComponent className={`h-8 w-8 ${colors.text}`} />
                    </div>
                    <CardTitle className={`text-4xl font-bold ${colors.title} mb-2`}>{stat.value}</CardTitle>
                    <CardDescription className="text-lg text-gray-600">{stat.label}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          {/* Calculadoras */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {calculators.map((calculator) => (
              <Card key={calculator.href} className="calculator-card shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      {getIcon(calculator)}
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {calculator.label}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    {calculator.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full calculator-button">
                    <Link href={calculator.href}>
                      {isItalian ? 'Usa Calcolatrice' : 'Usar Calculadora'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
            <CardHeader className="pb-6">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Calculator className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
                {isItalian ? 'Hai bisogno di una calcolatrice specifica?' : '¿Necesitas una calculadora específica?'}
              </CardTitle>
              <CardDescription className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {isItalian ? 'Se non trovi la calcolatrice che ti serve, contattaci e la aggiungeremo alla nostra collezione' : 'Si no encuentras la calculadora que necesitas, contáctanos y la agregaremos a nuestra colección'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href={isItalian ? "/it/contacto/" : "/contacto/"}>
                  {isItalian ? 'Richiedi Calcolatrice' : 'Solicitar Calculadora'}
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* FAQ */}
          <div className="mt-16">
            <FAQ 
              items={faqItems} 
              title={isItalian ? "Domande Frequenti" : "Preguntas Frecuentes"}
            />
          </div>
        </div>
      </Container>
    </>
  )
}
