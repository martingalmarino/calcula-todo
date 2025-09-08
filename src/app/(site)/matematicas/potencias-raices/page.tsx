"use client"

import { useState } from 'react'
import { Calculator, Zap, Square, Box } from 'lucide-react'
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
  pow,
  root,
  sqrt,
  cbrt,
  toScientificNotation,
  powerOfTen,
  perfectRoot,
  perfectPower
} from '@/lib/math/powerRoot'

export default function PotenciasRaicesPage() {
  const [activeTab, setActiveTab] = useState('power')
  const [results, setResults] = useState<{
    result: number;
    formula: string;
    steps: string[];
    isValid?: boolean;
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [powerValues, setPowerValues] = useState({ 
    base: '', 
    exponent: '' 
  })
  const [rootValues, setRootValues] = useState({ 
    value: '', 
    index: '' 
  })
  const [scientificValues, setScientificValues] = useState({ 
    value: '' 
  })
  const [powerOfTenValues, setPowerOfTenValues] = useState({ 
    exponent: '' 
  })

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'power':
          if (!powerValues.base || !powerValues.exponent) {
            setError('Por favor, completa todos los campos')
            return
          }
          const base = Number(powerValues.base)
          const exponent = Number(powerValues.exponent)
          result = pow(base, exponent)
          break
        case 'root':
          if (!rootValues.value || !rootValues.index) {
            setError('Por favor, completa todos los campos')
            return
          }
          const value = Number(rootValues.value)
          const index = Number(rootValues.index)
          result = root(value, index)
          break
        case 'sqrt':
          if (!rootValues.value) {
            setError('Por favor, ingresa un número')
            return
          }
          const sqrtValue = Number(rootValues.value)
          result = sqrt(sqrtValue)
          break
        case 'cbrt':
          if (!rootValues.value) {
            setError('Por favor, ingresa un número')
            return
          }
          const cbrtValue = Number(rootValues.value)
          result = cbrt(cbrtValue)
          break
        case 'scientific':
          if (!scientificValues.value) {
            setError('Por favor, ingresa un número')
            return
          }
          const sciValue = Number(scientificValues.value)
          const sciResult = toScientificNotation(sciValue)
          result = {
            result: sciValue,
            formula: sciResult.notation,
            steps: [
              `Número: ${sciValue}`,
              `Coeficiente: ${sciResult.coefficient}`,
              `Exponente: ${sciResult.exponent}`,
              `Notación científica: ${sciResult.notation}`
            ]
          }
          break
        case 'powerOfTen':
          if (!powerOfTenValues.exponent) {
            setError('Por favor, ingresa el exponente')
            return
          }
          const tenExponent = Number(powerOfTenValues.exponent)
          result = powerOfTen(tenExponent)
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
      case 'power':
        setPowerValues({ 
          base: (values.base as number).toString(), 
          exponent: (values.exponent as number).toString() 
        })
        break
      case 'root':
        setRootValues({ 
          value: (values.value as number).toString(), 
          index: (values.index as number).toString() 
        })
        break
      case 'sqrt':
        setRootValues({ 
          value: (values.value as number).toString(), 
          index: '2' 
        })
        break
      case 'cbrt':
        setRootValues({ 
          value: (values.value as number).toString(), 
          index: '3' 
        })
        break
      case 'scientific':
        setScientificValues({ 
          value: (values.value as number).toString() 
        })
        break
      case 'powerOfTen':
        setPowerOfTenValues({ 
          exponent: (values.exponent as number).toString() 
        })
        break
    }
  }

  const examples = [
    { label: '2³', values: { base: 2, exponent: 3 } },
    { label: '√16', values: { value: 16, index: 2 } },
    { label: '∛27', values: { value: 27, index: 3 } },
    { label: '10⁵', values: { exponent: 5 } },
    { label: '0.0001', values: { value: 0.0001 } }
  ]

  const faqItems = [
    {
      question: "¿Qué es una potencia?",
      answer: "Una potencia es una operación matemática que representa la multiplicación repetida de un número por sí mismo. Se expresa como base^exponente."
    },
    {
      question: "¿Qué es una raíz?",
      answer: "Una raíz es la operación inversa de una potencia. La raíz n-ésima de un número es el valor que, elevado a n, da como resultado el número original."
    },
    {
      question: "¿Cuál es la diferencia entre raíz cuadrada y cúbica?",
      answer: "La raíz cuadrada (√) es la raíz de índice 2, mientras que la raíz cúbica (∛) es la raíz de índice 3. La raíz cuadrada de un número es el valor que al cuadrado da el número original."
    },
    {
      question: "¿Qué es la notación científica?",
      answer: "La notación científica es una forma de escribir números muy grandes o muy pequeños usando potencias de 10. Se expresa como a × 10^n, donde a es un número entre 1 y 10."
    },
    {
      question: "¿Puedo calcular raíces de números negativos?",
      answer: "Sí, pero solo para raíces de índice impar (como raíz cúbica). Las raíces de índice par de números negativos no tienen solución en los números reales."
    }
  ]

  const relatedLinks = getRelatedCalculators('matematicas', 'potencias-raices').map(calc => ({
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
            name: 'Calculadora de Potencias y Raíces',
            description: 'Calcula potencias, raíces cuadradas, cúbicas y n-ésimas con explicaciones paso a paso',
            url: '/matematicas/potencias-raices/',
            category: 'Matemáticas'
          })),
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={getBreadcrumbs('/matematicas/potencias-raices/')} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Potencias y Raíces"
            description="Calcula potencias, raíces cuadradas, cúbicas y n-ésimas con explicaciones paso a paso"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="power" className="calculator-tab">Potencia</TabsTrigger>
                <TabsTrigger value="sqrt" className="calculator-tab">√ Cuadrada</TabsTrigger>
                <TabsTrigger value="cbrt" className="calculator-tab">∛ Cúbica</TabsTrigger>
                <TabsTrigger value="root" className="calculator-tab">Raíz n</TabsTrigger>
                <TabsTrigger value="powerOfTen" className="calculator-tab">10^n</TabsTrigger>
                <TabsTrigger value="scientific" className="calculator-tab">Científica</TabsTrigger>
              </TabsList>

              <TabsContent value="power" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="base" className="calculator-label">
                        Base
                      </label>
                      <Input
                        id="base"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={powerValues.base}
                        onChange={(e) => setPowerValues({ ...powerValues, base: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="exponent" className="calculator-label">
                        Exponente
                      </label>
                      <Input
                        id="exponent"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={powerValues.exponent}
                        onChange={(e) => setPowerValues({ ...powerValues, exponent: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Potencia
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="sqrt" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="sqrt-value" className="calculator-label">
                      Número
                    </label>
                    <Input
                      id="sqrt-value"
                      type="number"
                      step="0.001"
                      placeholder="Ej: 16"
                      value={rootValues.value}
                      onChange={(e) => setRootValues({ ...rootValues, value: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Square className="h-4 w-4 mr-2" />
                    Calcular Raíz Cuadrada
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="cbrt" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cbrt-value" className="calculator-label">
                      Número
                    </label>
                    <Input
                      id="cbrt-value"
                      type="number"
                      step="0.001"
                      placeholder="Ej: 27"
                      value={rootValues.value}
                      onChange={(e) => setRootValues({ ...rootValues, value: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Box className="h-4 w-4 mr-2" />
                    Calcular Raíz Cúbica
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="root" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="root-value" className="calculator-label">
                        Número
                      </label>
                      <Input
                        id="root-value"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 32"
                        value={rootValues.value}
                        onChange={(e) => setRootValues({ ...rootValues, value: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="root-index" className="calculator-label">
                        Índice
                      </label>
                      <Input
                        id="root-index"
                        type="number"
                        step="1"
                        placeholder="Ej: 5"
                        value={rootValues.index}
                        onChange={(e) => setRootValues({ ...rootValues, index: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Raíz n-ésima
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="powerOfTen" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="ten-exponent" className="calculator-label">
                      Exponente
                    </label>
                    <Input
                      id="ten-exponent"
                      type="number"
                      step="1"
                      placeholder="Ej: 5"
                      value={powerOfTenValues.exponent}
                      onChange={(e) => setPowerOfTenValues({ ...powerOfTenValues, exponent: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Zap className="h-4 w-4 mr-2" />
                    Calcular 10^n
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="scientific" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="scientific-value" className="calculator-label">
                      Número
                    </label>
                    <Input
                      id="scientific-value"
                      type="number"
                      step="0.000001"
                      placeholder="Ej: 0.0001"
                      value={scientificValues.value}
                      onChange={(e) => setScientificValues({ ...scientificValues, value: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Convertir a Notación Científica
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
                    {results.formula} = {results.result.toFixed(6)}
                  </div>
                  {results.isValid === false && (
                    <div className="text-destructive font-medium">
                      ⚠️ Resultado no válido
                    </div>
                  )}
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
