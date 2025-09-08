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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { jsonLdCalculator } from '@/lib/seo'
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config'
import { 
  simplify, 
  toDecimal, 
  add,
  subtract,
  multiply,
  divide
} from '@/lib/math/fractions'


export default function FraccionesPage() {
  const [activeTab, setActiveTab] = useState('simplify')
  const [results, setResults] = useState<{
    result: { numerator: number; denominator: number } | number;
    decimal?: number;
    steps: string[];
  } | { numerator: number; denominator: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [simplifyValues, setSimplifyValues] = useState({ numerator: '', denominator: '' })
  const [toDecimalValues, setToDecimalValues] = useState({ numerator: '', denominator: '' })
  const [operationValues, setOperationValues] = useState({ 
    operation: 'add',
    numerator1: '', 
    denominator1: '', 
    numerator2: '', 
    denominator2: '' 
  })

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'simplify':
          if (!simplifyValues.numerator || !simplifyValues.denominator) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = simplify(Number(simplifyValues.numerator), Number(simplifyValues.denominator))
          break
        case 'to-decimal':
          if (!toDecimalValues.numerator || !toDecimalValues.denominator) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = {
            result: toDecimal(Number(toDecimalValues.numerator), Number(toDecimalValues.denominator)),
            steps: [`${toDecimalValues.numerator}/${toDecimalValues.denominator} = ${toDecimal(Number(toDecimalValues.numerator), Number(toDecimalValues.denominator))}`]
          }
          break
        case 'operations':
          if (!operationValues.numerator1 || !operationValues.denominator1 || 
              !operationValues.numerator2 || !operationValues.denominator2) {
            setError('Por favor, completa todos los campos')
            return
          }
          const fraction1 = { numerator: Number(operationValues.numerator1), denominator: Number(operationValues.denominator1) }
          const fraction2 = { numerator: Number(operationValues.numerator2), denominator: Number(operationValues.denominator2) }
          
          switch (operationValues.operation) {
            case 'add':
              result = add(fraction1, fraction2)
              break
            case 'subtract':
              result = subtract(fraction1, fraction2)
              break
            case 'multiply':
              result = multiply(fraction1, fraction2)
              break
            case 'divide':
              result = divide(fraction1, fraction2)
              break
          }
          break
        default:
          setError('Tipo de cálculo no válido')
          return
      }
      if (result) {
        setResults(result)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el cálculo')
    }
  }

  const handleExampleClick = (values: Record<string, unknown>) => {
    switch (activeTab) {
      case 'simplify':
        setSimplifyValues({ 
          numerator: (values.numerator as number).toString(), 
          denominator: (values.denominator as number).toString() 
        })
        break
      case 'to-decimal':
        setToDecimalValues({ 
          numerator: (values.numerator as number).toString(), 
          denominator: (values.denominator as number).toString() 
        })
        break
      case 'operations':
        setOperationValues({
          operation: (values.operation as string) || 'add',
          numerator1: (values.numerator1 as number).toString(),
          denominator1: (values.denominator1 as number).toString(),
          numerator2: (values.numerator2 as number).toString(),
          denominator2: (values.denominator2 as number).toString()
        })
        break
    }
  }

  const examples = [
    { label: 'Simplificar 12/18', values: { numerator: 12, denominator: 18 } },
    { label: 'Sumar 1/4 + 1/3', values: { operation: 'add', numerator1: 1, denominator1: 4, numerator2: 1, denominator2: 3 } },
    { label: 'Convertir 0.75 a fracción', values: { decimal: 0.75 } },
    { label: 'Multiplicar 2/3 × 3/4', values: { operation: 'multiply', numerator1: 2, denominator1: 3, numerator2: 3, denominator2: 4 } }
  ]

  const faqItems = [
    {
      question: "¿Cómo se simplifica una fracción?",
      answer: "Para simplificar una fracción, divide tanto el numerador como el denominador por su máximo común divisor (MCD). Por ejemplo, 12/18 se simplifica a 2/3."
    },
    {
      question: "¿Cómo se suman fracciones?",
      answer: "Para sumar fracciones con el mismo denominador, suma los numeradores. Si tienen denominadores diferentes, primero encuentra un denominador común (mínimo común múltiplo)."
    },
    {
      question: "¿Cómo se multiplican fracciones?",
      answer: "Para multiplicar fracciones, multiplica los numeradores entre sí y los denominadores entre sí. Luego simplifica el resultado si es posible."
    },
    {
      question: "¿Cómo se dividen fracciones?",
      answer: "Para dividir fracciones, multiplica la primera fracción por el recíproco (inverso) de la segunda fracción. Es decir, a/b ÷ c/d = a/b × d/c."
    },
    {
      question: "¿Qué es un número mixto?",
      answer: "Un número mixto es la suma de un número entero y una fracción propia. Por ejemplo, 2 1/3 representa 2 + 1/3 = 7/3."
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
            description: 'Simplifica, convierte, suma, resta, multiplica y divide fracciones con explicaciones paso a paso',
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
            description="Simplifica, convierte, suma, resta, multiplica y divide fracciones con explicaciones paso a paso"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="simplify" className="calculator-tab">Simplificar</TabsTrigger>
                <TabsTrigger value="operations" className="calculator-tab">Operaciones</TabsTrigger>
                <TabsTrigger value="to-decimal" className="calculator-tab">A Decimal</TabsTrigger>
              </TabsList>

              <TabsContent value="simplify" className="space-y-4">
                <div className="calculator-grid calculator-grid-2">
                  <div>
                    <label htmlFor="numerator" className="calculator-label">
                      Numerador
                    </label>
                    <Input
                      id="numerator"
                      type="number"
                      placeholder="Ej: 12"
                      value={simplifyValues.numerator}
                      onChange={(e) => setSimplifyValues({ ...simplifyValues, numerator: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="denominator" className="calculator-label">
                      Denominador
                    </label>
                    <Input
                      id="denominator"
                      type="number"
                      placeholder="Ej: 18"
                      value={simplifyValues.denominator}
                      onChange={(e) => setSimplifyValues({ ...simplifyValues, denominator: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                </div>
                <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                  <Calculator className="h-4 w-4 mr-2" />
                  Simplificar
                </Button>
              </TabsContent>

              <TabsContent value="to-decimal" className="space-y-4">
                <div className="calculator-grid calculator-grid-2">
                  <div>
                    <label htmlFor="numerator-decimal" className="calculator-label">
                      Numerador
                    </label>
                    <Input
                      id="numerator-decimal"
                      type="number"
                      placeholder="Ej: 3"
                      value={toDecimalValues.numerator}
                      onChange={(e) => setToDecimalValues({ ...toDecimalValues, numerator: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="denominator-decimal" className="calculator-label">
                      Denominador
                    </label>
                    <Input
                      id="denominator-decimal"
                      type="number"
                      placeholder="Ej: 4"
                      value={toDecimalValues.denominator}
                      onChange={(e) => setToDecimalValues({ ...toDecimalValues, denominator: e.target.value })}
                      className="calculator-input"
                    />
                  </div>
                </div>
                <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                  <Calculator className="h-4 w-4 mr-2" />
                  Convertir a Decimal
                </Button>
              </TabsContent>


              <TabsContent value="operations" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="operation" className="calculator-label">
                      Operación
                    </label>
                    <Select value={operationValues.operation} onValueChange={(value) => setOperationValues({ ...operationValues, operation: value })}>
                      <SelectTrigger className="calculator-input">
                        <SelectValue placeholder="Selecciona una operación" />
                      </SelectTrigger>
                      <SelectContent className="calculator-select-content">
                        <SelectItem value="add">
                          <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Sumar
                          </div>
                        </SelectItem>
                        <SelectItem value="subtract">
                          <div className="flex items-center gap-2">
                            <Minus className="h-4 w-4" />
                            Restar
                          </div>
                        </SelectItem>
                        <SelectItem value="multiply">
                          <div className="flex items-center gap-2">
                            <X className="h-4 w-4" />
                            Multiplicar
                          </div>
                        </SelectItem>
                        <SelectItem value="divide">
                          <div className="flex items-center gap-2">
                            <Divide className="h-4 w-4" />
                            Dividir
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="calculator-grid calculator-grid-2">
                    <div className="space-y-2">
                      <label className="calculator-label">Primera fracción</label>
                      <div className="calculator-grid calculator-grid-2">
                        <Input
                          type="number"
                          placeholder="Num"
                          value={operationValues.numerator1}
                          onChange={(e) => setOperationValues({ ...operationValues, numerator1: e.target.value })}
                          className="calculator-input"
                        />
                        <Input
                          type="number"
                          placeholder="Den"
                          value={operationValues.denominator1}
                          onChange={(e) => setOperationValues({ ...operationValues, denominator1: e.target.value })}
                          className="calculator-input"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="calculator-label">Segunda fracción</label>
                      <div className="calculator-grid calculator-grid-2">
                        <Input
                          type="number"
                          placeholder="Num"
                          value={operationValues.numerator2}
                          onChange={(e) => setOperationValues({ ...operationValues, numerator2: e.target.value })}
                          className="calculator-input"
                        />
                        <Input
                          type="number"
                          placeholder="Den"
                          value={operationValues.denominator2}
                          onChange={(e) => setOperationValues({ ...operationValues, denominator2: e.target.value })}
                          className="calculator-input"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular
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
                  {results && 'result' in results && results.result && typeof results.result === 'object' ? (
                    <div className="text-2xl font-bold text-primary">
                      {results.result.numerator}/{results.result.denominator}
                      {'decimal' in results && results.decimal && (
                        <span className="text-lg text-muted-foreground ml-2">
                          = {results.decimal.toFixed(6)}
                        </span>
                      )}
                    </div>
                  ) : results && 'result' in results ? (
                    <div className="text-2xl font-bold text-primary">
                      {typeof results.result === 'number' ? results.result : `${results.result.numerator}/${results.result.denominator}`}
                    </div>
                  ) : results && 'numerator' in results ? (
                    <div className="text-2xl font-bold text-primary">
                      {results.numerator}/{results.denominator}
                    </div>
                  ) : null}
                  
                  {results && 'steps' in results && results.steps && (
                    <div>
                      <h4 className="font-medium mb-2">Pasos:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        {results.steps.map((step: string, index: number) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
