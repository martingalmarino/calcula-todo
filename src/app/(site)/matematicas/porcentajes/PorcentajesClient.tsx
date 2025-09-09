"use client"

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config'
import { 
  percentageOf,
  percentageOfNumber,
  variationPercent,
  originalValueAfterIncrease,
  originalValueAfterDecrease,
  type PercentageResult
} from '@/lib/math/percentage'

export default function PorcentajesClient() {
  const [activeTab, setActiveTab] = useState('percentage')
  const [results, setResults] = useState<PercentageResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [percentageValues, setPercentageValues] = useState({ value: '', total: '' })
  const [percentageOfValues, setPercentageOfValues] = useState({ percentage: '', number: '' })
  const [changeValues, setChangeValues] = useState({ original: '', new: '' })
  const [originalValues, setOriginalValues] = useState({ percentage: '', result: '' })

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'percentage':
          if (!percentageValues.value || !percentageValues.total) {
            setError('Por favor, completa ambos campos')
            return
          }
          const value = parseFloat(percentageValues.value)
          const total = parseFloat(percentageValues.total)
          if (total === 0) {
            setError('El total no puede ser 0')
            return
          }
          result = percentageOf(value, total)
          break
        case 'percentage-of':
          if (!percentageOfValues.percentage || !percentageOfValues.number) {
            setError('Por favor, completa ambos campos')
            return
          }
          const percentage = parseFloat(percentageOfValues.percentage)
          const number = parseFloat(percentageOfValues.number)
          if (percentage < 0 || percentage > 100) {
            setError('El porcentaje debe estar entre 0 y 100')
            return
          }
          result = percentageOfNumber(percentage, number)
          break
        case 'change':
          if (!changeValues.original || !changeValues.new) {
            setError('Por favor, completa ambos campos')
            return
          }
          const original = parseFloat(changeValues.original)
          const newValue = parseFloat(changeValues.new)
          if (original === 0) {
            setError('El valor original no puede ser 0')
            return
          }
          result = variationPercent(original, newValue)
          break
        case 'original':
          if (!originalValues.percentage || !originalValues.result) {
            setError('Por favor, completa ambos campos')
            return
          }
          const percentageOrig = parseFloat(originalValues.percentage)
          const resultValue = parseFloat(originalValues.result)
          if (percentageOrig === 0) {
            setError('El porcentaje no puede ser 0')
            return
          }
          result = originalValueAfterIncrease(resultValue, percentageOrig)
          break
        default:
          setError('Tipo de cálculo no válido')
          return
      }
      setResults(result)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error en el cálculo')
    }
  }

  const handleExampleClick = (values: Record<string, unknown>) => {
    switch (activeTab) {
      case 'percentage':
        setPercentageValues({ 
          value: (values.value as number).toString(), 
          total: (values.total as number).toString() 
        })
        break
      case 'percentage-of':
        setPercentageOfValues({ 
          percentage: (values.percentage as number).toString(), 
          number: (values.number as number).toString() 
        })
        break
      case 'change':
        setChangeValues({ 
          original: (values.original as number).toString(), 
          new: (values.new as number).toString() 
        })
        break
      case 'original':
        setOriginalValues({ 
          percentage: (values.percentage as number).toString(), 
          result: (values.result as number).toString() 
        })
        break
    }
  }

  const examples = [
    { label: '25 de 100', values: { value: 25, total: 100 } },
    { label: '20% de 150', values: { percentage: 20, number: 150 } },
    { label: 'Cambio de 100 a 120', values: { original: 100, new: 120 } },
    { label: '30% de X = 60', values: { percentage: 30, result: 60 } }
  ]

  const faqItems = [
    {
      question: "¿Cómo se calcula un porcentaje?",
      answer: "Para calcular qué porcentaje representa un valor de un total, se usa la fórmula: (valor / total) × 100. Por ejemplo: (25 / 100) × 100 = 25%."
    },
    {
      question: "¿Cómo se calcula el porcentaje de un número?",
      answer: "Para calcular el X% de un número, se multiplica el número por X y se divide entre 100. Por ejemplo: 20% de 150 = (20 × 150) / 100 = 30."
    },
    {
      question: "¿Cómo se calcula el cambio porcentual?",
      answer: "El cambio porcentual se calcula como: ((nuevo valor - valor original) / valor original) × 100. Un resultado positivo indica aumento, negativo indica disminución."
    },
    {
      question: "¿Qué es un descuento?",
      answer: "Un descuento es una reducción del precio original. Se calcula restando el porcentaje de descuento del precio original. Por ejemplo: 10% de descuento en $100 = $100 - $10 = $90."
    },
    {
      question: "¿Qué es un aumento porcentual?",
      answer: "Un aumento porcentual es cuando un valor se incrementa en un cierto porcentaje. Se calcula sumando el porcentaje de aumento al valor original."
    }
  ]

  const relatedLinks = getRelatedCalculators('matematicas', 'porcentajes').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Porcentajes',
            description: 'Calcula porcentajes, aumentos, descuentos y cambios porcentuales',
            url: '/matematicas/porcentajes/',
            category: 'Matemáticas'
          })),
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={getBreadcrumbs('/matematicas/porcentajes/')} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Porcentajes"
            description="Calcula porcentajes, aumentos, descuentos y cambios porcentuales"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="percentage" className="calculator-tab">% de Y</TabsTrigger>
                <TabsTrigger value="percentage-of" className="calculator-tab">% de número</TabsTrigger>
                <TabsTrigger value="change" className="calculator-tab">Cambio %</TabsTrigger>
                <TabsTrigger value="original" className="calculator-tab">Valor Original</TabsTrigger>
              </TabsList>

              <TabsContent value="percentage" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="perc-value" className="calculator-label">
                        Valor
                      </label>
                      <Input
                        id="perc-value"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 25"
                        value={percentageValues.value}
                        onChange={(e) => setPercentageValues({ ...percentageValues, value: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="perc-total" className="calculator-label">
                        Total
                      </label>
                      <Input
                        id="perc-total"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 100"
                        value={percentageValues.total}
                        onChange={(e) => setPercentageValues({ ...percentageValues, total: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcular Porcentaje
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="percentage-of" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="perc-of-percentage" className="calculator-label">
                        Porcentaje (%)
                      </label>
                      <Input
                        id="perc-of-percentage"
                        type="number"
                        step="0.001"
                        min="0"
                        max="100"
                        placeholder="Ej: 20"
                        value={percentageOfValues.percentage}
                        onChange={(e) => setPercentageOfValues({ ...percentageOfValues, percentage: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="perc-of-number" className="calculator-label">
                        Número
                      </label>
                      <Input
                        id="perc-of-number"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 150"
                        value={percentageOfValues.number}
                        onChange={(e) => setPercentageOfValues({ ...percentageOfValues, number: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcular Porcentaje de Número
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="change" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="change-original" className="calculator-label">
                        Valor Original
                      </label>
                      <Input
                        id="change-original"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 100"
                        value={changeValues.original}
                        onChange={(e) => setChangeValues({ ...changeValues, original: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="change-new" className="calculator-label">
                        Valor Nuevo
                      </label>
                      <Input
                        id="change-new"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 120"
                        value={changeValues.new}
                        onChange={(e) => setChangeValues({ ...changeValues, new: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcular Cambio Porcentual
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="original" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="orig-percentage" className="calculator-label">
                        Porcentaje (%)
                      </label>
                      <Input
                        id="orig-percentage"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 30"
                        value={originalValues.percentage}
                        onChange={(e) => setOriginalValues({ ...originalValues, percentage: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="orig-result" className="calculator-label">
                        Resultado
                      </label>
                      <Input
                        id="orig-result"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 60"
                        value={originalValues.result}
                        onChange={(e) => setOriginalValues({ ...originalValues, result: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcular Valor Original
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Resultados */}
            {error && (
              <Card className="border-destructive bg-destructive/10">
                <CardContent className="pt-6">
                  <p className="text-destructive">{error}</p>
                </CardContent>
              </Card>
            )}

            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Resultado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    {results.result}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Pasos:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      {results.steps.map((step: string, index: number) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            )}
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
