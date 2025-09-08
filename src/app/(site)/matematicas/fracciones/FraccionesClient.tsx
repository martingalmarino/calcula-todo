"use client"

import { useState } from 'react'
import { Calculator, Plus, Minus, X, Divide } from 'lucide-react'
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
  simplifyFraction,
  addFractions,
  subtractFractions,
  multiplyFractions,
  divideFractions,
  fractionToDecimal,
  decimalToFraction,
  type FractionResult
} from '@/lib/math/fractions'

export default function FraccionesClient() {
  const [activeTab, setActiveTab] = useState('simplify')
  const [results, setResults] = useState<FractionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [simplifyValues, setSimplifyValues] = useState({ numerator: '', denominator: '' })
  const [operationValues, setOperationValues] = useState({ 
    num1: '', den1: '', 
    num2: '', den2: '' 
  })
  const [decimalValue, setDecimalValue] = useState('')

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'simplify':
          if (!simplifyValues.numerator || !simplifyValues.denominator) {
            setError('Por favor, completa ambos campos')
            return
          }
          const num = parseInt(simplifyValues.numerator)
          const den = parseInt(simplifyValues.denominator)
          if (den === 0) {
            setError('El denominador no puede ser 0')
            return
          }
          result = simplifyFraction(num, den)
          break
        case 'add':
          if (!operationValues.num1 || !operationValues.den1 || !operationValues.num2 || !operationValues.den2) {
            setError('Por favor, completa todos los campos')
            return
          }
          const num1 = parseInt(operationValues.num1)
          const den1 = parseInt(operationValues.den1)
          const num2 = parseInt(operationValues.num2)
          const den2 = parseInt(operationValues.den2)
          if (den1 === 0 || den2 === 0) {
            setError('Los denominadores no pueden ser 0')
            return
          }
          result = addFractions(num1, den1, num2, den2)
          break
        case 'subtract':
          if (!operationValues.num1 || !operationValues.den1 || !operationValues.num2 || !operationValues.den2) {
            setError('Por favor, completa todos los campos')
            return
          }
          const num1Sub = parseInt(operationValues.num1)
          const den1Sub = parseInt(operationValues.den1)
          const num2Sub = parseInt(operationValues.num2)
          const den2Sub = parseInt(operationValues.den2)
          if (den1Sub === 0 || den2Sub === 0) {
            setError('Los denominadores no pueden ser 0')
            return
          }
          result = subtractFractions(num1Sub, den1Sub, num2Sub, den2Sub)
          break
        case 'multiply':
          if (!operationValues.num1 || !operationValues.den1 || !operationValues.num2 || !operationValues.den2) {
            setError('Por favor, completa todos los campos')
            return
          }
          const num1Mult = parseInt(operationValues.num1)
          const den1Mult = parseInt(operationValues.den1)
          const num2Mult = parseInt(operationValues.num2)
          const den2Mult = parseInt(operationValues.den2)
          if (den1Mult === 0 || den2Mult === 0) {
            setError('Los denominadores no pueden ser 0')
            return
          }
          result = multiplyFractions(num1Mult, den1Mult, num2Mult, den2Mult)
          break
        case 'divide':
          if (!operationValues.num1 || !operationValues.den1 || !operationValues.num2 || !operationValues.den2) {
            setError('Por favor, completa todos los campos')
            return
          }
          const num1Div = parseInt(operationValues.num1)
          const den1Div = parseInt(operationValues.den1)
          const num2Div = parseInt(operationValues.num2)
          const den2Div = parseInt(operationValues.den2)
          if (den1Div === 0 || den2Div === 0) {
            setError('Los denominadores no pueden ser 0')
            return
          }
          if (num2Div === 0) {
            setError('No se puede dividir por 0')
            return
          }
          result = divideFractions(num1Div, den1Div, num2Div, den2Div)
          break
        case 'to-decimal':
          if (!simplifyValues.numerator || !simplifyValues.denominator) {
            setError('Por favor, completa ambos campos')
            return
          }
          const numDec = parseInt(simplifyValues.numerator)
          const denDec = parseInt(simplifyValues.denominator)
          if (denDec === 0) {
            setError('El denominador no puede ser 0')
            return
          }
          result = fractionToDecimal(numDec, denDec)
          break
        case 'from-decimal':
          if (!decimalValue) {
            setError('Por favor, ingresa un número decimal')
            return
          }
          result = decimalToFraction(parseFloat(decimalValue))
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
      case 'simplify':
      case 'to-decimal':
        setSimplifyValues({ 
          numerator: (values.numerator as number).toString(), 
          denominator: (values.denominator as number).toString() 
        })
        break
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        setOperationValues({ 
          num1: (values.num1 as number).toString(), 
          den1: (values.den1 as number).toString(),
          num2: (values.num2 as number).toString(), 
          den2: (values.den2 as number).toString()
        })
        break
      case 'from-decimal':
        setDecimalValue((values.decimal as number).toString())
        break
    }
  }

  const examples = [
    { label: 'Simplificar 8/12', values: { numerator: 8, denominator: 12 } },
    { label: 'Sumar 1/2 + 1/3', values: { num1: 1, den1: 2, num2: 1, den2: 3 } },
    { label: 'Multiplicar 2/3 × 3/4', values: { num1: 2, den1: 3, num2: 3, den2: 4 } },
    { label: '3/4 a decimal', values: { numerator: 3, denominator: 4 } },
    { label: '0.75 a fracción', values: { decimal: 0.75 } }
  ]

  const faqItems = [
    {
      question: "¿Cómo se simplifica una fracción?",
      answer: "Para simplificar una fracción, se divide tanto el numerador como el denominador por su máximo común divisor (MCD). Por ejemplo: 8/12 = 2/3."
    },
    {
      question: "¿Cómo se suman fracciones?",
      answer: "Para sumar fracciones con denominadores diferentes, primero se encuentra el mínimo común múltiplo (MCM) de los denominadores, se convierten a fracciones equivalentes y luego se suman los numeradores."
    },
    {
      question: "¿Cómo se multiplican fracciones?",
      answer: "Para multiplicar fracciones, se multiplican los numeradores entre sí y los denominadores entre sí. El resultado se simplifica si es posible."
    },
    {
      question: "¿Cómo se dividen fracciones?",
      answer: "Para dividir fracciones, se multiplica la primera fracción por el recíproco de la segunda. Es decir, a/b ÷ c/d = a/b × d/c."
    },
    {
      question: "¿Cómo convertir una fracción a decimal?",
      answer: "Para convertir una fracción a decimal, se divide el numerador entre el denominador. Por ejemplo: 3/4 = 0.75."
    }
  ]

  const relatedLinks = getRelatedCalculators('matematicas', 'fracciones').map(calc => ({
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
            name: 'Calculadora de Fracciones',
            description: 'Simplifica fracciones, realiza operaciones básicas y convierte entre fracciones y decimales',
            url: '/matematicas/fracciones/',
            category: 'Matemáticas'
          })),
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={getBreadcrumbs('/matematicas/fracciones/')} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Fracciones"
            description="Simplifica fracciones, realiza operaciones básicas y convierte entre fracciones y decimales"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="simplify" className="calculator-tab">Simplificar</TabsTrigger>
                <TabsTrigger value="add" className="calculator-tab">Sumar</TabsTrigger>
                <TabsTrigger value="subtract" className="calculator-tab">Restar</TabsTrigger>
                <TabsTrigger value="multiply" className="calculator-tab">Multiplicar</TabsTrigger>
                <TabsTrigger value="divide" className="calculator-tab">Dividir</TabsTrigger>
                <TabsTrigger value="to-decimal" className="calculator-tab">A Decimal</TabsTrigger>
                <TabsTrigger value="from-decimal" className="calculator-tab">De Decimal</TabsTrigger>
              </TabsList>

              <TabsContent value="simplify" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="simplify-num" className="calculator-label">
                        Numerador
                      </label>
                      <Input
                        id="simplify-num"
                        type="number"
                        placeholder="Ej: 8"
                        value={simplifyValues.numerator}
                        onChange={(e) => setSimplifyValues({ ...simplifyValues, numerator: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="simplify-den" className="calculator-label">
                        Denominador
                      </label>
                      <Input
                        id="simplify-den"
                        type="number"
                        placeholder="Ej: 12"
                        value={simplifyValues.denominator}
                        onChange={(e) => setSimplifyValues({ ...simplifyValues, denominator: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Simplificar Fracción
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="add" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-4">
                    <div>
                      <label htmlFor="add-num1" className="calculator-label">
                        Numerador 1
                      </label>
                      <Input
                        id="add-num1"
                        type="number"
                        placeholder="Ej: 1"
                        value={operationValues.num1}
                        onChange={(e) => setOperationValues({ ...operationValues, num1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="add-den1" className="calculator-label">
                        Denominador 1
                      </label>
                      <Input
                        id="add-den1"
                        type="number"
                        placeholder="Ej: 2"
                        value={operationValues.den1}
                        onChange={(e) => setOperationValues({ ...operationValues, den1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="add-num2" className="calculator-label">
                        Numerador 2
                      </label>
                      <Input
                        id="add-num2"
                        type="number"
                        placeholder="Ej: 1"
                        value={operationValues.num2}
                        onChange={(e) => setOperationValues({ ...operationValues, num2: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="add-den2" className="calculator-label">
                        Denominador 2
                      </label>
                      <Input
                        id="add-den2"
                        type="number"
                        placeholder="Ej: 3"
                        value={operationValues.den2}
                        onChange={(e) => setOperationValues({ ...operationValues, den2: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Sumar Fracciones
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="subtract" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-4">
                    <div>
                      <label htmlFor="sub-num1" className="calculator-label">
                        Numerador 1
                      </label>
                      <Input
                        id="sub-num1"
                        type="number"
                        placeholder="Ej: 3"
                        value={operationValues.num1}
                        onChange={(e) => setOperationValues({ ...operationValues, num1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sub-den1" className="calculator-label">
                        Denominador 1
                      </label>
                      <Input
                        id="sub-den1"
                        type="number"
                        placeholder="Ej: 4"
                        value={operationValues.den1}
                        onChange={(e) => setOperationValues({ ...operationValues, den1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sub-num2" className="calculator-label">
                        Numerador 2
                      </label>
                      <Input
                        id="sub-num2"
                        type="number"
                        placeholder="Ej: 1"
                        value={operationValues.num2}
                        onChange={(e) => setOperationValues({ ...operationValues, num2: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="sub-den2" className="calculator-label">
                        Denominador 2
                      </label>
                      <Input
                        id="sub-den2"
                        type="number"
                        placeholder="Ej: 2"
                        value={operationValues.den2}
                        onChange={(e) => setOperationValues({ ...operationValues, den2: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Minus className="h-4 w-4 mr-2" />
                    Restar Fracciones
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="multiply" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-4">
                    <div>
                      <label htmlFor="mult-num1" className="calculator-label">
                        Numerador 1
                      </label>
                      <Input
                        id="mult-num1"
                        type="number"
                        placeholder="Ej: 2"
                        value={operationValues.num1}
                        onChange={(e) => setOperationValues({ ...operationValues, num1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="mult-den1" className="calculator-label">
                        Denominador 1
                      </label>
                      <Input
                        id="mult-den1"
                        type="number"
                        placeholder="Ej: 3"
                        value={operationValues.den1}
                        onChange={(e) => setOperationValues({ ...operationValues, den1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="mult-num2" className="calculator-label">
                        Numerador 2
                      </label>
                      <Input
                        id="mult-num2"
                        type="number"
                        placeholder="Ej: 3"
                        value={operationValues.num2}
                        onChange={(e) => setOperationValues({ ...operationValues, num2: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="mult-den2" className="calculator-label">
                        Denominador 2
                      </label>
                      <Input
                        id="mult-den2"
                        type="number"
                        placeholder="Ej: 4"
                        value={operationValues.den2}
                        onChange={(e) => setOperationValues({ ...operationValues, den2: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <X className="h-4 w-4 mr-2" />
                    Multiplicar Fracciones
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="divide" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-4">
                    <div>
                      <label htmlFor="div-num1" className="calculator-label">
                        Numerador 1
                      </label>
                      <Input
                        id="div-num1"
                        type="number"
                        placeholder="Ej: 1"
                        value={operationValues.num1}
                        onChange={(e) => setOperationValues({ ...operationValues, num1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="div-den1" className="calculator-label">
                        Denominador 1
                      </label>
                      <Input
                        id="div-den1"
                        type="number"
                        placeholder="Ej: 2"
                        value={operationValues.den1}
                        onChange={(e) => setOperationValues({ ...operationValues, den1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="div-num2" className="calculator-label">
                        Numerador 2
                      </label>
                      <Input
                        id="div-num2"
                        type="number"
                        placeholder="Ej: 1"
                        value={operationValues.num2}
                        onChange={(e) => setOperationValues({ ...operationValues, num2: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="div-den2" className="calculator-label">
                        Denominador 2
                      </label>
                      <Input
                        id="div-den2"
                        type="number"
                        placeholder="Ej: 3"
                        value={operationValues.den2}
                        onChange={(e) => setOperationValues({ ...operationValues, den2: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Divide className="h-4 w-4 mr-2" />
                    Dividir Fracciones
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="to-decimal" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="dec-num" className="calculator-label">
                        Numerador
                      </label>
                      <Input
                        id="dec-num"
                        type="number"
                        placeholder="Ej: 3"
                        value={simplifyValues.numerator}
                        onChange={(e) => setSimplifyValues({ ...simplifyValues, numerator: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="dec-den" className="calculator-label">
                        Denominador
                      </label>
                      <Input
                        id="dec-den"
                        type="number"
                        placeholder="Ej: 4"
                        value={simplifyValues.denominator}
                        onChange={(e) => setSimplifyValues({ ...simplifyValues, denominator: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Convertir a Decimal
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="from-decimal" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="decimal-value" className="calculator-label">
                        Número Decimal
                      </label>
                      <Input
                        id="decimal-value"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 0.75"
                        value={decimalValue}
                        onChange={(e) => setDecimalValue(e.target.value)}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Convertir a Fracción
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
