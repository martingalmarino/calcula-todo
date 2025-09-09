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
  sqrt,
  cbrt,
  root,
  pow,
  powerOfTen,
  toScientificNotation,
  type PowerResult,
  type RootResult
} from '@/lib/math/powerRoot'

export default function PotenciasRaicesClient() {
  const [activeTab, setActiveTab] = useState('square-root')
  const [results, setResults] = useState<{ result: number; steps: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [squareRootValue, setSquareRootValue] = useState('')
  const [cubeRootValue, setCubeRootValue] = useState('')
  const [nthRootValues, setNthRootValues] = useState({ number: '', n: '' })
  const [powerValues, setPowerValues] = useState({ base: '', exponent: '' })
  const [powerOf10Value, setPowerOf10Value] = useState('')
  const [scientificValues, setScientificValues] = useState({ number: '', precision: '2' })

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'square-root':
          if (!squareRootValue) {
            setError('Por favor, ingresa un número')
            return
          }
          const num = parseFloat(squareRootValue)
          if (num < 0) {
            setError('No se puede calcular la raíz cuadrada de un número negativo')
            return
          }
          result = sqrt(num)
          break
        case 'cube-root':
          if (!cubeRootValue) {
            setError('Por favor, ingresa un número')
            return
          }
          result = cbrt(parseFloat(cubeRootValue))
          break
        case 'nth-root':
          if (!nthRootValues.number || !nthRootValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          const number = parseFloat(nthRootValues.number)
          const n = parseInt(nthRootValues.n)
          if (n <= 0) {
            setError('El índice debe ser un número positivo')
            return
          }
          if (number < 0 && n % 2 === 0) {
            setError('No se puede calcular la raíz par de un número negativo')
            return
          }
          result = root(number, n)
          break
        case 'power':
          if (!powerValues.base || !powerValues.exponent) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = pow(parseFloat(powerValues.base), parseFloat(powerValues.exponent))
          break
        case 'power-of-10':
          if (!powerOf10Value) {
            setError('Por favor, ingresa un exponente')
            return
          }
          result = powerOfTen(parseInt(powerOf10Value))
          break
        case 'scientific':
          if (!scientificValues.number) {
            setError('Por favor, ingresa un número')
            return
          }
          const precision = parseInt(scientificValues.precision) || 2
          if (precision < 0 || precision > 10) {
            setError('La precisión debe estar entre 0 y 10')
            return
          }
          const notation = toScientificNotation(parseFloat(scientificValues.number))
          result = { result: notation.coefficient * Math.pow(10, notation.exponent), steps: [notation.notation] }
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
      case 'square-root':
        setSquareRootValue((values.number as number).toString())
        break
      case 'cube-root':
        setCubeRootValue((values.number as number).toString())
        break
      case 'nth-root':
        setNthRootValues({ 
          number: (values.number as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'power':
        setPowerValues({ 
          base: (values.base as number).toString(), 
          exponent: (values.exponent as number).toString() 
        })
        break
      case 'power-of-10':
        setPowerOf10Value((values.exponent as number).toString())
        break
      case 'scientific':
        setScientificValues({ 
          number: (values.number as number).toString(), 
          precision: (values.precision as number).toString() 
        })
        break
    }
  }

  const examples = [
    { label: '√16', values: { number: 16 } },
    { label: '∛27', values: { number: 27 } },
    { label: '⁴√81', values: { number: 81, n: 4 } },
    { label: '2³', values: { base: 2, exponent: 3 } },
    { label: '10⁵', values: { exponent: 5 } },
    { label: 'Notación científica de 1234', values: { number: 1234, precision: 2 } }
  ]

  const faqItems = [
    {
      question: "¿Qué es una raíz cuadrada?",
      answer: "La raíz cuadrada de un número x es el número que, multiplicado por sí mismo, da x. Se denota como √x. Por ejemplo: √16 = 4 porque 4 × 4 = 16."
    },
    {
      question: "¿Qué es una raíz cúbica?",
      answer: "La raíz cúbica de un número x es el número que, elevado al cubo, da x. Se denota como ∛x. Por ejemplo: ∛27 = 3 porque 3³ = 27."
    },
    {
      question: "¿Qué es una raíz n-ésima?",
      answer: "La raíz n-ésima de un número x es el número que, elevado a la potencia n, da x. Se denota como ⁿ√x. Por ejemplo: ⁴√81 = 3 porque 3⁴ = 81."
    },
    {
      question: "¿Qué es la notación científica?",
      answer: "La notación científica es una forma de escribir números muy grandes o muy pequeños usando potencias de 10. Se expresa como a × 10ⁿ, donde 1 ≤ |a| < 10."
    },
    {
      question: "¿Cuáles son las reglas de los exponentes?",
      answer: "Las reglas principales son: xᵃ × xᵇ = xᵃ⁺ᵇ, xᵃ ÷ xᵇ = xᵃ⁻ᵇ, (xᵃ)ᵇ = xᵃᵇ, x⁰ = 1, x⁻ᵃ = 1/xᵃ."
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
            description: 'Calcula raíces cuadradas, cúbicas, n-ésimas, potencias y notación científica',
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
            description="Calcula raíces cuadradas, cúbicas, n-ésimas, potencias y notación científica"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="square-root" className="calculator-tab">Raíz Cuadrada</TabsTrigger>
                <TabsTrigger value="cube-root" className="calculator-tab">Raíz Cúbica</TabsTrigger>
                <TabsTrigger value="nth-root" className="calculator-tab">Raíz n-ésima</TabsTrigger>
                <TabsTrigger value="power" className="calculator-tab">Potencia</TabsTrigger>
                <TabsTrigger value="power-of-10" className="calculator-tab">Potencia de 10</TabsTrigger>
                <TabsTrigger value="scientific" className="calculator-tab">Notación Científica</TabsTrigger>
              </TabsList>

              <TabsContent value="square-root" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="sqrt-number" className="calculator-label">
                        Número
                      </label>
                      <Input
                        id="sqrt-number"
                        type="number"
                        step="0.001"
                        min="0"
                        placeholder="Ej: 16"
                        value={squareRootValue}
                        onChange={(e) => setSquareRootValue(e.target.value)}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcular Raíz Cuadrada
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="cube-root" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="cbrt-number" className="calculator-label">
                        Número
                      </label>
                      <Input
                        id="cbrt-number"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 27"
                        value={cubeRootValue}
                        onChange={(e) => setCubeRootValue(e.target.value)}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcular Raíz Cúbica
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="nth-root" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="nth-number" className="calculator-label">
                        Número
                      </label>
                      <Input
                        id="nth-number"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 81"
                        value={nthRootValues.number}
                        onChange={(e) => setNthRootValues({ ...nthRootValues, number: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="nth-n" className="calculator-label">
                        Índice (n)
                      </label>
                      <Input
                        id="nth-n"
                        type="number"
                        min="1"
                        placeholder="Ej: 4"
                        value={nthRootValues.n}
                        onChange={(e) => setNthRootValues({ ...nthRootValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcular Raíz n-ésima
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="power" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="power-base" className="calculator-label">
                        Base
                      </label>
                      <Input
                        id="power-base"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={powerValues.base}
                        onChange={(e) => setPowerValues({ ...powerValues, base: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="power-exponent" className="calculator-label">
                        Exponente
                      </label>
                      <Input
                        id="power-exponent"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={powerValues.exponent}
                        onChange={(e) => setPowerValues({ ...powerValues, exponent: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcular Potencia
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="power-of-10" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="power10-exponent" className="calculator-label">
                        Exponente
                      </label>
                      <Input
                        id="power10-exponent"
                        type="number"
                        placeholder="Ej: 5"
                        value={powerOf10Value}
                        onChange={(e) => setPowerOf10Value(e.target.value)}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
                    Calcular Potencia de 10
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="scientific" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="sci-number" className="calculator-label">
                        Número
                      </label>
                      <Input
                        id="sci-number"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1234"
                        value={scientificValues.number}
                        onChange={(e) => setScientificValues({ ...scientificValues, number: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sci-precision" className="calculator-label">
                        Precisión
                      </label>
                      <Input
                        id="sci-precision"
                        type="number"
                        min="0"
                        max="10"
                        placeholder="Ej: 2"
                        value={scientificValues.precision}
                        onChange={(e) => setScientificValues({ ...scientificValues, precision: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Calculator className="h-4 w-4" />
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
