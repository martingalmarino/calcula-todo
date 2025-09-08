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
  increase, 
  decrease, 
  variationPercent,
  originalValueAfterIncrease,
  originalValueAfterDecrease
} from '@/lib/math/percentage'


export default function PorcentajesPage() {
  const [activeTab, setActiveTab] = useState('percentage-of')
  const [results, setResults] = useState<{
    result: number;
    formula: string;
    steps: string[];
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [percentageOfValues, setPercentageOfValues] = useState({ x: '', y: '' })
  const [percentageOfNumberValues, setPercentageOfNumberValues] = useState({ percentage: '', base: '' })
  const [increaseValues, setIncreaseValues] = useState({ value: '', percentage: '' })
  const [decreaseValues, setDecreaseValues] = useState({ value: '', percentage: '' })
  const [variationValues, setVariationValues] = useState({ oldValue: '', newValue: '' })
  const [originalAfterIncreaseValues, setOriginalAfterIncreaseValues] = useState({ finalValue: '', percentage: '' })
  const [originalAfterDecreaseValues, setOriginalAfterDecreaseValues] = useState({ finalValue: '', percentage: '' })

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'percentage-of':
          if (!percentageOfValues.x || !percentageOfValues.y) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = percentageOf(Number(percentageOfValues.x), Number(percentageOfValues.y))
          break
        case 'percentage-of-number':
          if (!percentageOfNumberValues.percentage || !percentageOfNumberValues.base) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = percentageOfNumber(Number(percentageOfNumberValues.percentage), Number(percentageOfNumberValues.base))
          break
        case 'increase':
          if (!increaseValues.value || !increaseValues.percentage) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = increase(Number(increaseValues.value), Number(increaseValues.percentage))
          break
        case 'decrease':
          if (!decreaseValues.value || !decreaseValues.percentage) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = decrease(Number(decreaseValues.value), Number(decreaseValues.percentage))
          break
        case 'variation':
          if (!variationValues.oldValue || !variationValues.newValue) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = variationPercent(Number(variationValues.oldValue), Number(variationValues.newValue))
          break
        case 'original-after-increase':
          if (!originalAfterIncreaseValues.finalValue || !originalAfterIncreaseValues.percentage) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = originalValueAfterIncrease(Number(originalAfterIncreaseValues.finalValue), Number(originalAfterIncreaseValues.percentage))
          break
        case 'original-after-decrease':
          if (!originalAfterDecreaseValues.finalValue || !originalAfterDecreaseValues.percentage) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = originalValueAfterDecrease(Number(originalAfterDecreaseValues.finalValue), Number(originalAfterDecreaseValues.percentage))
          break
        default:
          setError('Tipo de cálculo no válido')
          return
      }
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el cálculo')
    }
  }

  const handleExampleClick = (values: Record<string, unknown>) => {
    switch (activeTab) {
      case 'percentage-of':
        setPercentageOfValues({ x: (values.x as number).toString(), y: (values.y as number).toString() })
        break
      case 'percentage-of-number':
        setPercentageOfNumberValues({ percentage: (values.percentage as number).toString(), base: (values.base as number).toString() })
        break
      case 'increase':
        setIncreaseValues({ value: (values.value as number).toString(), percentage: (values.percentage as number).toString() })
        break
      case 'decrease':
        setDecreaseValues({ value: (values.value as number).toString(), percentage: (values.percentage as number).toString() })
        break
      case 'variation':
        setVariationValues({ oldValue: (values.oldValue as number).toString(), newValue: (values.newValue as number).toString() })
        break
      case 'original-after-increase':
        setOriginalAfterIncreaseValues({ finalValue: (values.finalValue as number).toString(), percentage: (values.percentage as number).toString() })
        break
      case 'original-after-decrease':
        setOriginalAfterDecreaseValues({ finalValue: (values.finalValue as number).toString(), percentage: (values.percentage as number).toString() })
        break
    }
  }

  const examples = [
    { label: '25% de 200', values: { percentage: 25, base: 200 } },
    { label: '¿Qué % es 50 de 200?', values: { x: 50, y: 200 } },
    { label: 'Descuento del 20%', values: { value: 100, percentage: 20 } },
    { label: 'Aumento del 15%', values: { value: 200, percentage: 15 } },
    { label: 'Variación de 100 a 120', values: { oldValue: 100, newValue: 120 } }
  ]

  const faqItems = [
    {
      question: "¿Cómo se calcula un porcentaje?",
      answer: "Un porcentaje se calcula dividiendo la parte por el todo y multiplicando por 100. Por ejemplo, 25% de 200 = (25/100) × 200 = 50."
    },
    {
      question: "¿Qué es la variación porcentual?",
      answer: "La variación porcentual mide el cambio relativo entre dos valores. Se calcula como: ((valor nuevo - valor anterior) / valor anterior) × 100."
    },
    {
      question: "¿Cómo se calcula un descuento?",
      answer: "Un descuento se calcula restando el porcentaje del valor original. Por ejemplo, 20% de descuento en $100 = $100 - (20% de $100) = $80."
    },
    {
      question: "¿Qué es un aumento porcentual?",
      answer: "Un aumento porcentual se calcula sumando el porcentaje al valor original. Por ejemplo, 15% de aumento en $200 = $200 + (15% de $200) = $230."
    },
    {
      question: "¿Cómo se encuentra el valor original después de un aumento?",
      answer: "Para encontrar el valor original después de un aumento, divide el valor final por (1 + porcentaje/100). Por ejemplo, si $115 es el resultado de un 15% de aumento, el valor original es $115 ÷ 1.15 = $100."
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
            description: 'Calcula porcentajes, descuentos, aumentos y variaciones porcentuales con explicaciones paso a paso',
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
            description="Calcula porcentajes, descuentos, aumentos y variaciones porcentuales con explicaciones paso a paso"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="percentage-of" className="calculator-tab">% de Y</TabsTrigger>
                <TabsTrigger value="percentage-of-number" className="calculator-tab">% de número</TabsTrigger>
                <TabsTrigger value="increase" className="calculator-tab">Aumento</TabsTrigger>
                <TabsTrigger value="decrease" className="calculator-tab">Descuento</TabsTrigger>
              </TabsList>

              <TabsContent value="percentage-of" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="x" className="calculator-label">
                        Valor X
                      </label>
                      <Input
                        id="x"
                        type="number"
                        placeholder="Ej: 50"
                        value={percentageOfValues.x}
                        onChange={(e) => setPercentageOfValues({ ...percentageOfValues, x: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="y" className="calculator-label">
                        Valor Y (total)
                      </label>
                      <Input
                        id="y"
                        type="number"
                        placeholder="Ej: 200"
                        value={percentageOfValues.y}
                        onChange={(e) => setPercentageOfValues({ ...percentageOfValues, y: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Porcentaje
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="percentage-of-number" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="percentage" className="calculator-label">
                        Porcentaje (%)
                      </label>
                      <Input
                        id="percentage"
                        type="number"
                        placeholder="Ej: 25"
                        value={percentageOfNumberValues.percentage}
                        onChange={(e) => setPercentageOfNumberValues({ ...percentageOfNumberValues, percentage: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="base" className="calculator-label">
                        Número base
                      </label>
                      <Input
                        id="base"
                        type="number"
                        placeholder="Ej: 200"
                        value={percentageOfNumberValues.base}
                        onChange={(e) => setPercentageOfNumberValues({ ...percentageOfNumberValues, base: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="increase" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="value-increase" className="calculator-label">
                        Valor original
                      </label>
                      <Input
                        id="value-increase"
                        type="number"
                        placeholder="Ej: 100"
                        value={increaseValues.value}
                        onChange={(e) => setIncreaseValues({ ...increaseValues, value: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="percentage-increase" className="calculator-label">
                        Porcentaje de aumento (%)
                      </label>
                      <Input
                        id="percentage-increase"
                        type="number"
                        placeholder="Ej: 15"
                        value={increaseValues.percentage}
                        onChange={(e) => setIncreaseValues({ ...increaseValues, percentage: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Aumento
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="decrease" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="value-decrease" className="calculator-label">
                        Valor original
                      </label>
                      <Input
                        id="value-decrease"
                        type="number"
                        placeholder="Ej: 100"
                        value={decreaseValues.value}
                        onChange={(e) => setDecreaseValues({ ...decreaseValues, value: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="percentage-decrease" className="calculator-label">
                        Porcentaje de descuento (%)
                      </label>
                      <Input
                        id="percentage-decrease"
                        type="number"
                        placeholder="Ej: 20"
                        value={decreaseValues.percentage}
                        onChange={(e) => setDecreaseValues({ ...decreaseValues, percentage: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Descuento
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
                    {results.result.toFixed(2)}%
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Fórmula utilizada:</h4>
                    <code className="bg-muted px-2 py-1 rounded text-sm">
                      {results.formula}
                    </code>
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
