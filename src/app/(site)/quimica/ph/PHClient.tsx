"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FlaskRound, AlertCircle, Info } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface PHResult {
  ph: number
  nature: 'ácida' | 'neutra' | 'básica'
  description: string
  color: string
}

export default function PHClient() {
  const [concentration, setConcentration] = useState('')
  const [results, setResults] = useState<PHResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculatePH = (hConcentration: number): PHResult => {
    const ph = -Math.log10(hConcentration)
    
    let nature: 'ácida' | 'neutra' | 'básica'
    let description: string
    let color: string

    if (ph < 7) {
      nature = 'ácida'
      description = 'La solución es ácida'
      color = 'text-red-600'
    } else if (ph === 7) {
      nature = 'neutra'
      description = 'La solución es neutra'
      color = 'text-green-600'
    } else {
      nature = 'básica'
      description = 'La solución es básica'
      color = 'text-blue-600'
    }

    return {
      ph: Math.round(ph * 100) / 100,
      nature,
      description,
      color
    }
  }

  const handleCalculate = () => {
    setError(null)
    
    if (!concentration) {
      setError('Por favor, ingresa la concentración de iones hidrógeno [H⁺]')
      return
    }

    try {
      const concentrationNum = parseFloat(concentration)
      
      if (isNaN(concentrationNum)) {
        setError('Por favor, ingresa un valor numérico válido')
        return
      }

      if (concentrationNum <= 0) {
        setError('La concentración debe ser mayor que 0')
        return
      }

      const result = calculatePH(concentrationNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular el pH')
    }
  }

  const breadcrumbs = getBreadcrumbs('/quimica/ph')

  const examples = [
    {
      label: 'Ejemplo: HCl 0.1 M',
      values: { concentration: '0.1' }
    },
    {
      label: 'Ejemplo: HCl 0.01 M',
      values: { concentration: '0.01' }
    },
    {
      label: 'Ejemplo: Agua pura (25°C)',
      values: { concentration: '0.0000001' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es el pH?',
      answer: 'El pH es una medida de la acidez o basicidad de una solución acuosa. Se define como el logaritmo negativo de la concentración de iones hidrógeno [H⁺].'
    },
    {
      question: '¿Cómo se calcula el pH?',
      answer: 'El pH se calcula usando la fórmula: pH = -log[H⁺], donde [H⁺] es la concentración de iones hidrógeno en mol/L.'
    },
    {
      question: '¿Cuáles son los rangos de pH?',
      answer: 'pH < 7: ácido, pH = 7: neutro, pH > 7: básico. El rango típico es de 0 a 14, aunque pueden existir valores fuera de este rango.'
    },
    {
      question: '¿Qué significa una solución ácida?',
      answer: 'Una solución ácida tiene un pH menor a 7, lo que significa que tiene una mayor concentración de iones hidrógeno [H⁺] que de iones hidróxido [OH⁻].'
    },
    {
      question: '¿Qué significa una solución básica?',
      answer: 'Una solución básica tiene un pH mayor a 7, lo que significa que tiene una menor concentración de iones hidrógeno [H⁺] que de iones hidróxido [OH⁻].'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de pH',
            description: 'Calcula el pH de una solución a partir de la concentración de iones hidrógeno [H⁺]',
            url: '/quimica/ph/',
            category: 'Química'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de pH"
            description="Calcula el pH de una solución a partir de la concentración de iones hidrógeno [H⁺]"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values: Record<string, unknown>) => {
              setConcentration((values.concentration as string) || '')
              setResults(null)
              setError(null)
            }}
          >
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FlaskRound className="w-5 h-5 text-emerald-600" />
                  Calculadora de pH
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="concentration" className="text-sm font-medium">
                    Concentración de iones hidrógeno [H⁺] (mol/L)
                  </label>
                  <Input
                    id="concentration"
                    type="number"
                    step="any"
                    placeholder="Ej: 0.1"
                    value={concentration}
                    onChange={(e) => setConcentration(e.target.value)}
                    className="w-full"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600">{error}</span>
                  </div>
                )}

                <Button 
                  onClick={handleCalculate}
                  className="w-full calculator-button"
                >
                  <FlaskRound className="h-4 w-4 mr-2" />
                  Calcular pH
                </Button>

                {results && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        pH = {results.ph}
                      </div>
                      <div className={`text-lg font-semibold ${results.color}`}>
                        {results.description}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          <strong>Fórmula utilizada:</strong> pH = -log[H⁺]
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          <strong>Concentración ingresada:</strong> {concentration} mol/L
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
