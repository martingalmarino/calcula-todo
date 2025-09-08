"use client"

import { useState } from 'react'
import { Calculator, Plus, Minus, X, Divide } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { jsonLdCalculator } from '@/lib/seo'
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config'
import { 
  simplify, 
  toDecimal, 
  fromDecimal,
  add,
  subtract,
  multiply,
  divide,
  fromMixedNumber
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
  const [fromDecimalValues, setFromDecimalValues] = useState({ decimal: '' })
  const [operationValues, setOperationValues] = useState({ 
    operation: 'add',
    numerator1: '', 
    denominator1: '', 
    numerator2: '', 
    denominator2: '' 
  })
  const [mixedNumberValues, setMixedNumberValues] = useState({ 
    whole: '', 
    numerator: '', 
    denominator: '' 
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
        case 'from-decimal':
          if (!fromDecimalValues.decimal) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = fromDecimal(Number(fromDecimalValues.decimal))
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
        case 'mixed-number':
          if (!mixedNumberValues.whole || !mixedNumberValues.numerator || !mixedNumberValues.denominator) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = fromMixedNumber(
            Number(mixedNumberValues.whole), 
            Number(mixedNumberValues.numerator), 
            Number(mixedNumberValues.denominator)
          )
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
      case 'from-decimal':
        setFromDecimalValues({ decimal: (values.decimal as number).toString() })
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
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
                <TabsTrigger value="simplify">Simplificar</TabsTrigger>
                <TabsTrigger value="to-decimal">A Decimal</TabsTrigger>
                <TabsTrigger value="from-decimal">De Decimal</TabsTrigger>
                <TabsTrigger value="operations">Operaciones</TabsTrigger>
                <TabsTrigger value="mixed-number">Mixto</TabsTrigger>
              </TabsList>

              <TabsContent value="simplify" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Simplificar Fracción</CardTitle>
                    <CardDescription>
                      Simplifica una fracción a su forma irreducible
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="numerator" className="block text-sm font-medium mb-2">
                          Numerador
                        </label>
                        <Input
                          id="numerator"
                          type="number"
                          placeholder="Ej: 12"
                          value={simplifyValues.numerator}
                          onChange={(e) => setSimplifyValues({ ...simplifyValues, numerator: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="denominator" className="block text-sm font-medium mb-2">
                          Denominador
                        </label>
                        <Input
                          id="denominator"
                          type="number"
                          placeholder="Ej: 18"
                          value={simplifyValues.denominator}
                          onChange={(e) => setSimplifyValues({ ...simplifyValues, denominator: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button onClick={handleCalculate} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Simplificar
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="to-decimal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Convertir Fracción a Decimal</CardTitle>
                    <CardDescription>
                      Convierte una fracción a su equivalente decimal
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="numerator-decimal" className="block text-sm font-medium mb-2">
                          Numerador
                        </label>
                        <Input
                          id="numerator-decimal"
                          type="number"
                          placeholder="Ej: 3"
                          value={toDecimalValues.numerator}
                          onChange={(e) => setToDecimalValues({ ...toDecimalValues, numerator: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="denominator-decimal" className="block text-sm font-medium mb-2">
                          Denominador
                        </label>
                        <Input
                          id="denominator-decimal"
                          type="number"
                          placeholder="Ej: 4"
                          value={toDecimalValues.denominator}
                          onChange={(e) => setToDecimalValues({ ...toDecimalValues, denominator: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button onClick={handleCalculate} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Convertir a Decimal
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="from-decimal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Convertir Decimal a Fracción</CardTitle>
                    <CardDescription>
                      Convierte un decimal a su equivalente fraccionario
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label htmlFor="decimal" className="block text-sm font-medium mb-2">
                        Decimal
                      </label>
                      <Input
                        id="decimal"
                        type="number"
                        step="0.01"
                        placeholder="Ej: 0.75"
                        value={fromDecimalValues.decimal}
                        onChange={(e) => setFromDecimalValues({ ...fromDecimalValues, decimal: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleCalculate} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Convertir a Fracción
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="operations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Operaciones con Fracciones</CardTitle>
                    <CardDescription>
                      Realiza operaciones aritméticas con dos fracciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label htmlFor="operation" className="block text-sm font-medium mb-2">
                        Operación
                      </label>
                      <Select value={operationValues.operation} onValueChange={(value) => setOperationValues({ ...operationValues, operation: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una operación" />
                        </SelectTrigger>
                        <SelectContent>
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
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Primera fracción</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="number"
                            placeholder="Num"
                            value={operationValues.numerator1}
                            onChange={(e) => setOperationValues({ ...operationValues, numerator1: e.target.value })}
                          />
                          <Input
                            type="number"
                            placeholder="Den"
                            value={operationValues.denominator1}
                            onChange={(e) => setOperationValues({ ...operationValues, denominator1: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Segunda fracción</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            type="number"
                            placeholder="Num"
                            value={operationValues.numerator2}
                            onChange={(e) => setOperationValues({ ...operationValues, numerator2: e.target.value })}
                          />
                          <Input
                            type="number"
                            placeholder="Den"
                            value={operationValues.denominator2}
                            onChange={(e) => setOperationValues({ ...operationValues, denominator2: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={handleCalculate} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calcular
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mixed-number" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Convertir Número Mixto a Fracción</CardTitle>
                    <CardDescription>
                      Convierte un número mixto a fracción impropia
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="whole" className="block text-sm font-medium mb-2">
                          Parte entera
                        </label>
                        <Input
                          id="whole"
                          type="number"
                          placeholder="Ej: 2"
                          value={mixedNumberValues.whole}
                          onChange={(e) => setMixedNumberValues({ ...mixedNumberValues, whole: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="numerator-mixed" className="block text-sm font-medium mb-2">
                          Numerador
                        </label>
                        <Input
                          id="numerator-mixed"
                          type="number"
                          placeholder="Ej: 1"
                          value={mixedNumberValues.numerator}
                          onChange={(e) => setMixedNumberValues({ ...mixedNumberValues, numerator: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="denominator-mixed" className="block text-sm font-medium mb-2">
                          Denominador
                        </label>
                        <Input
                          id="denominator-mixed"
                          type="number"
                          placeholder="Ej: 3"
                          value={mixedNumberValues.denominator}
                          onChange={(e) => setMixedNumberValues({ ...mixedNumberValues, denominator: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button onClick={handleCalculate} className="w-full">
                      <Calculator className="h-4 w-4 mr-2" />
                      Convertir
                    </Button>
                  </CardContent>
                </Card>
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
