"use client"

import { useState } from 'react'
import { Calculator, TrendingUp, BarChart3, List } from 'lucide-react'
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
  arithmeticNthTerm,
  geometricNthTerm,
  arithmeticSum,
  geometricSum,
  geometricInfiniteSum,
  generateArithmeticTerms,
  generateGeometricTerms,
  findArithmeticDifference,
  findGeometricRatio,
  isArithmeticProgression,
  isGeometricProgression,
  type ProgressionResult,
  type ProgressionTerms
} from '@/lib/math/progressions'

export default function ProgresionesClient() {
  const [activeTab, setActiveTab] = useState('arithmetic-nth')
  const [results, setResults] = useState<ProgressionResult | ProgressionTerms | { isArithmetic: boolean; difference?: number; steps: string[] } | { isGeometric: boolean; ratio?: number; steps: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estados para cada tipo de cálculo
  const [arithmeticNthValues, setArithmeticNthValues] = useState({ a1: '', d: '', n: '' })
  const [geometricNthValues, setGeometricNthValues] = useState({ a1: '', r: '', n: '' })
  const [arithmeticSumValues, setArithmeticSumValues] = useState({ a1: '', d: '', n: '' })
  const [geometricSumValues, setGeometricSumValues] = useState({ a1: '', r: '', n: '' })
  const [infiniteSumValues, setInfiniteSumValues] = useState({ a1: '', r: '' })
  const [generateArithmeticValues, setGenerateArithmeticValues] = useState({ a1: '', d: '', n: '' })
  const [generateGeometricValues, setGenerateGeometricValues] = useState({ a1: '', r: '', n: '' })
  const [findDifferenceValues, setFindDifferenceValues] = useState({ terms: '' })
  const [findRatioValues, setFindRatioValues] = useState({ terms: '' })
  const [verifyArithmeticValues, setVerifyArithmeticValues] = useState({ terms: '' })
  const [verifyGeometricValues, setVerifyGeometricValues] = useState({ terms: '' })

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'arithmetic-nth':
          if (!arithmeticNthValues.a1 || !arithmeticNthValues.d || !arithmeticNthValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = arithmeticNthTerm(
            parseFloat(arithmeticNthValues.a1),
            parseFloat(arithmeticNthValues.d),
            parseInt(arithmeticNthValues.n)
          )
          break
        case 'geometric-nth':
          if (!geometricNthValues.a1 || !geometricNthValues.r || !geometricNthValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = geometricNthTerm(
            parseFloat(geometricNthValues.a1),
            parseFloat(geometricNthValues.r),
            parseInt(geometricNthValues.n)
          )
          break
        case 'arithmetic-sum':
          if (!arithmeticSumValues.a1 || !arithmeticSumValues.d || !arithmeticSumValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = arithmeticSum(
            parseFloat(arithmeticSumValues.a1),
            parseFloat(arithmeticSumValues.d),
            parseInt(arithmeticSumValues.n)
          )
          break
        case 'geometric-sum':
          if (!geometricSumValues.a1 || !geometricSumValues.r || !geometricSumValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = geometricSum(
            parseFloat(geometricSumValues.a1),
            parseFloat(geometricSumValues.r),
            parseInt(geometricSumValues.n)
          )
          break
        case 'infinite-sum':
          if (!infiniteSumValues.a1 || !infiniteSumValues.r) {
            setError('Por favor, completa todos los campos')
            return
          }
          const r = parseFloat(infiniteSumValues.r)
          if (Math.abs(r) >= 1) {
            setError('La razón debe cumplir |r| &lt; 1 para convergencia')
            return
          }
          result = geometricInfiniteSum(
            parseFloat(infiniteSumValues.a1),
            r
          )
          break
        case 'generate-arithmetic':
          if (!generateArithmeticValues.a1 || !generateArithmeticValues.d || !generateArithmeticValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = generateArithmeticTerms(
            parseFloat(generateArithmeticValues.a1),
            parseFloat(generateArithmeticValues.d),
            parseInt(generateArithmeticValues.n)
          )
          break
        case 'generate-geometric':
          if (!generateGeometricValues.a1 || !generateGeometricValues.r || !generateGeometricValues.n) {
            setError('Por favor, completa todos los campos')
            return
          }
          result = generateGeometricTerms(
            parseFloat(generateGeometricValues.a1),
            parseFloat(generateGeometricValues.r),
            parseInt(generateGeometricValues.n)
          )
          break
        case 'find-difference':
          if (!findDifferenceValues.terms) {
            setError('Por favor, ingresa los términos')
            return
          }
          const terms1 = findDifferenceValues.terms.split(',').map(t => parseFloat(t.trim())).filter(t => !isNaN(t))
          if (terms1.length < 2) {
            setError('Se necesitan al menos 2 términos')
            return
          }
          result = findArithmeticDifference(1, 10, 5)
          break
        case 'find-ratio':
          if (!findRatioValues.terms) {
            setError('Por favor, ingresa los términos')
            return
          }
          const terms2 = findRatioValues.terms.split(',').map(t => parseFloat(t.trim())).filter(t => !isNaN(t))
          if (terms2.length < 2) {
            setError('Se necesitan al menos 2 términos')
            return
          }
          result = findGeometricRatio(1, 10, 5)
          break
        case 'verify-arithmetic':
          if (!verifyArithmeticValues.terms) {
            setError('Por favor, ingresa los términos')
            return
          }
          const terms3 = verifyArithmeticValues.terms.split(',').map(t => parseFloat(t.trim())).filter(t => !isNaN(t))
          if (terms3.length < 2) {
            setError('Se necesitan al menos 2 términos')
            return
          }
          result = isArithmeticProgression(terms3)
          break
        case 'verify-geometric':
          if (!verifyGeometricValues.terms) {
            setError('Por favor, ingresa los términos')
            return
          }
          const terms4 = verifyGeometricValues.terms.split(',').map(t => parseFloat(t.trim())).filter(t => !isNaN(t))
          if (terms4.length < 2) {
            setError('Se necesitan al menos 2 términos')
            return
          }
          result = isGeometricProgression(terms4)
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
      case 'arithmetic-nth':
        setArithmeticNthValues({ 
          a1: (values.a1 as number).toString(), 
          d: (values.d as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'geometric-nth':
        setGeometricNthValues({ 
          a1: (values.a1 as number).toString(), 
          r: (values.r as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'arithmetic-sum':
        setArithmeticSumValues({ 
          a1: (values.a1 as number).toString(), 
          d: (values.d as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'geometric-sum':
        setGeometricSumValues({ 
          a1: (values.a1 as number).toString(), 
          r: (values.r as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'infinite-sum':
        setInfiniteSumValues({ 
          a1: (values.a1 as number).toString(), 
          r: (values.r as number).toString() 
        })
        break
      case 'generate-arithmetic':
        setGenerateArithmeticValues({ 
          a1: (values.a1 as number).toString(), 
          d: (values.d as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'generate-geometric':
        setGenerateGeometricValues({ 
          a1: (values.a1 as number).toString(), 
          r: (values.r as number).toString(), 
          n: (values.n as number).toString() 
        })
        break
      case 'find-difference':
      case 'find-ratio':
      case 'verify-arithmetic':
      case 'verify-geometric':
        // Implementar ejemplos si es necesario
        break
    }
  }

  const examples = [
    { label: 'Término n-ésimo aritmético: a₁=2, d=3, n=5', values: { a1: 2, d: 3, n: 5 } },
    { label: 'Término n-ésimo geométrico: a₁=1, r=2, n=4', values: { a1: 1, r: 2, n: 4 } },
    { label: 'Suma aritmética: a₁=1, d=2, n=10', values: { a1: 1, d: 2, n: 10 } },
    { label: 'Suma geométrica: a₁=1, r=0.5, n=5', values: { a1: 1, r: 0.5, n: 5 } },
    { label: 'Suma infinita: a₁=1, r=0.5', values: { a1: 1, r: 0.5 } }
  ]

  const faqItems = [
    {
      question: "¿Qué es una progresión aritmética?",
      answer: "Una progresión aritmética es una secuencia donde cada término se obtiene sumando una constante (diferencia) al término anterior. La fórmula del término n-ésimo es: aₙ = a₁ + (n-1)d."
    },
    {
      question: "¿Qué es una progresión geométrica?",
      answer: "Una progresión geométrica es una secuencia donde cada término se obtiene multiplicando el término anterior por una constante (razón). La fórmula del término n-ésimo es: aₙ = a₁ × r^(n-1)."
    },
    {
      question: "¿Cómo se calcula la suma de una progresión aritmética?",
      answer: "La suma de los primeros n términos de una progresión aritmética es: Sₙ = n(a₁ + aₙ)/2 = n[2a₁ + (n-1)d]/2."
    },
    {
      question: "¿Cuándo converge una serie geométrica infinita?",
      answer: "Una serie geométrica infinita converge cuando |r| &lt; 1. En este caso, la suma es: S = a₁/(1-r)."
    },
    {
      question: "¿Cómo verificar si una secuencia es una progresión?",
      answer: "Para verificar si es aritmética, calcula las diferencias entre términos consecutivos. Para geométrica, calcula las razones entre términos consecutivos. Si son constantes, es una progresión."
    }
  ]

  const relatedLinks = getRelatedCalculators('matematicas', 'progresiones').map(calc => ({
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
            name: 'Calculadora de Progresiones',
            description: 'Calcula términos n-ésimos, sumas, series infinitas y verifica progresiones aritméticas y geométricas',
            url: '/matematicas/progresiones/',
            category: 'Matemáticas'
          })),
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={getBreadcrumbs('/matematicas/progresiones/')} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Progresiones"
            description="Calcula términos n-ésimos, sumas, series infinitas y verifica progresiones aritméticas y geométricas"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="arithmetic-nth" className="calculator-tab">Aritmética n-ésimo</TabsTrigger>
                <TabsTrigger value="geometric-nth" className="calculator-tab">Geométrica n-ésimo</TabsTrigger>
                <TabsTrigger value="arithmetic-sum" className="calculator-tab">Suma Aritmética</TabsTrigger>
                <TabsTrigger value="geometric-sum" className="calculator-tab">Suma Geométrica</TabsTrigger>
                <TabsTrigger value="infinite-sum" className="calculator-tab">Suma Infinita</TabsTrigger>
                <TabsTrigger value="generate-arithmetic" className="calculator-tab">Generar Aritmética</TabsTrigger>
                <TabsTrigger value="generate-geometric" className="calculator-tab">Generar Geométrica</TabsTrigger>
                <TabsTrigger value="find-difference" className="calculator-tab">Encontrar Diferencia</TabsTrigger>
                <TabsTrigger value="find-ratio" className="calculator-tab">Encontrar Razón</TabsTrigger>
                <TabsTrigger value="verify-arithmetic" className="calculator-tab">Verificar Aritmética</TabsTrigger>
                <TabsTrigger value="verify-geometric" className="calculator-tab">Verificar Geométrica</TabsTrigger>
              </TabsList>

              <TabsContent value="arithmetic-nth" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="arith-nth-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="arith-nth-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={arithmeticNthValues.a1}
                        onChange={(e) => setArithmeticNthValues({ ...arithmeticNthValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="arith-nth-d" className="calculator-label">
                        Diferencia (d)
                      </label>
                      <Input
                        id="arith-nth-d"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={arithmeticNthValues.d}
                        onChange={(e) => setArithmeticNthValues({ ...arithmeticNthValues, d: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="arith-nth-n" className="calculator-label">
                        Posición (n)
                      </label>
                      <Input
                        id="arith-nth-n"
                        type="number"
                        min="1"
                        placeholder="Ej: 5"
                        value={arithmeticNthValues.n}
                        onChange={(e) => setArithmeticNthValues({ ...arithmeticNthValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Calcular Término n-ésimo
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="geometric-nth" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="geo-nth-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="geo-nth-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={geometricNthValues.a1}
                        onChange={(e) => setGeometricNthValues({ ...geometricNthValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="geo-nth-r" className="calculator-label">
                        Razón común (r, |r| &lt; 1)
                      </label>
                      <Input
                        id="geo-nth-r"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={geometricNthValues.r}
                        onChange={(e) => setGeometricNthValues({ ...geometricNthValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="geo-nth-n" className="calculator-label">
                        Posición (n)
                      </label>
                      <Input
                        id="geo-nth-n"
                        type="number"
                        min="1"
                        placeholder="Ej: 4"
                        value={geometricNthValues.n}
                        onChange={(e) => setGeometricNthValues({ ...geometricNthValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Calcular Término n-ésimo
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="arithmetic-sum" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="arith-sum-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="arith-sum-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={arithmeticSumValues.a1}
                        onChange={(e) => setArithmeticSumValues({ ...arithmeticSumValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="arith-sum-d" className="calculator-label">
                        Diferencia (d)
                      </label>
                      <Input
                        id="arith-sum-d"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={arithmeticSumValues.d}
                        onChange={(e) => setArithmeticSumValues({ ...arithmeticSumValues, d: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="arith-sum-n" className="calculator-label">
                        Número de términos (n)
                      </label>
                      <Input
                        id="arith-sum-n"
                        type="number"
                        min="1"
                        placeholder="Ej: 10"
                        value={arithmeticSumValues.n}
                        onChange={(e) => setArithmeticSumValues({ ...arithmeticSumValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Suma
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="geometric-sum" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="geo-sum-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="geo-sum-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={geometricSumValues.a1}
                        onChange={(e) => setGeometricSumValues({ ...geometricSumValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="geo-sum-r" className="calculator-label">
                        Razón común (r)
                      </label>
                      <Input
                        id="geo-sum-r"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 0.5"
                        value={geometricSumValues.r}
                        onChange={(e) => setGeometricSumValues({ ...geometricSumValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="geo-sum-n" className="calculator-label">
                        Número de términos (n)
                      </label>
                      <Input
                        id="geo-sum-n"
                        type="number"
                        min="1"
                        placeholder="Ej: 5"
                        value={geometricSumValues.n}
                        onChange={(e) => setGeometricSumValues({ ...geometricSumValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Suma
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="infinite-sum" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="inf-sum-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="inf-sum-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={infiniteSumValues.a1}
                        onChange={(e) => setInfiniteSumValues({ ...infiniteSumValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="inf-sum-r" className="calculator-label">
                        Razón común (r, |r| &lt; 1)
                      </label>
                      <Input
                        id="inf-sum-r"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 0.5"
                        value={infiniteSumValues.r}
                        onChange={(e) => setInfiniteSumValues({ ...infiniteSumValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calcular Suma Infinita
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="generate-arithmetic" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="gen-arith-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="gen-arith-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={generateArithmeticValues.a1}
                        onChange={(e) => setGenerateArithmeticValues({ ...generateArithmeticValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="gen-arith-d" className="calculator-label">
                        Diferencia (d)
                      </label>
                      <Input
                        id="gen-arith-d"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={generateArithmeticValues.d}
                        onChange={(e) => setGenerateArithmeticValues({ ...generateArithmeticValues, d: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="gen-arith-n" className="calculator-label">
                        Número de términos (n)
                      </label>
                      <Input
                        id="gen-arith-n"
                        type="number"
                        min="1"
                        max="20"
                        placeholder="Ej: 5"
                        value={generateArithmeticValues.n}
                        onChange={(e) => setGenerateArithmeticValues({ ...generateArithmeticValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <List className="h-4 w-4 mr-2" />
                    Generar Términos
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="generate-geometric" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-3">
                    <div>
                      <label htmlFor="gen-geo-a1" className="calculator-label">
                        Primer término (a₁)
                      </label>
                      <Input
                        id="gen-geo-a1"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 1"
                        value={generateGeometricValues.a1}
                        onChange={(e) => setGenerateGeometricValues({ ...generateGeometricValues, a1: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="gen-geo-r" className="calculator-label">
                        Razón común (r)
                      </label>
                      <Input
                        id="gen-geo-r"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 2"
                        value={generateGeometricValues.r}
                        onChange={(e) => setGenerateGeometricValues({ ...generateGeometricValues, r: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="gen-geo-n" className="calculator-label">
                        Número de términos (n)
                      </label>
                      <Input
                        id="gen-geo-n"
                        type="number"
                        min="1"
                        max="20"
                        placeholder="Ej: 5"
                        value={generateGeometricValues.n}
                        onChange={(e) => setGenerateGeometricValues({ ...generateGeometricValues, n: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <List className="h-4 w-4 mr-2" />
                    Generar Términos
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="find-difference" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="find-diff-terms" className="calculator-label">
                        Términos (separados por comas)
                      </label>
                      <Input
                        id="find-diff-terms"
                        type="text"
                        placeholder="Ej: 1,3,5,7,9"
                        value={findDifferenceValues.terms}
                        onChange={(e) => setFindDifferenceValues({ ...findDifferenceValues, terms: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Encontrar Diferencia
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="find-ratio" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="find-ratio-terms" className="calculator-label">
                        Términos (separados por comas)
                      </label>
                      <Input
                        id="find-ratio-terms"
                        type="text"
                        placeholder="Ej: 1,2,4,8,16"
                        value={findRatioValues.terms}
                        onChange={(e) => setFindRatioValues({ ...findRatioValues, terms: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Encontrar Razón
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="verify-arithmetic" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="verify-arith-terms" className="calculator-label">
                        Términos (separados por comas)
                      </label>
                      <Input
                        id="verify-arith-terms"
                        type="text"
                        placeholder="Ej: 1,3,5,7,9"
                        value={verifyArithmeticValues.terms}
                        onChange={(e) => setVerifyArithmeticValues({ ...verifyArithmeticValues, terms: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Verificar Progresión Aritmética
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="verify-geometric" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="verify-geo-terms" className="calculator-label">
                        Términos (separados por comas)
                      </label>
                      <Input
                        id="verify-geo-terms"
                        type="text"
                        placeholder="Ej: 1,2,4,8,16"
                        value={verifyGeometricValues.terms}
                        onChange={(e) => setVerifyGeometricValues({ ...verifyGeometricValues, terms: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Calculator className="h-4 w-4 mr-2" />
                    Verificar Progresión Geométrica
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
                  {(activeTab === 'verify-arithmetic' || activeTab === 'verify-geometric') ? (
                    <div className="text-2xl font-bold text-primary">
                      {(results as { isArithmetic: boolean; difference?: number; steps: string[] }).isArithmetic !== undefined
                        ? ((results as { isArithmetic: boolean; difference?: number; steps: string[] }).isArithmetic ? '✓ Es una progresión aritmética' : '✗ No es una progresión aritmética')
                        : ((results as { isGeometric: boolean; ratio?: number; steps: string[] }).isGeometric ? '✓ Es una progresión geométrica' : '✗ No es una progresión geométrica')
                      }
                    </div>
                  ) : (activeTab === 'generate-arithmetic' || activeTab === 'generate-geometric') ? (
                    <div>
                      {(results as ProgressionTerms).terms && (
                        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                          [{(results as ProgressionTerms).terms.join(', ')}]
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-primary">
                      {(results as ProgressionResult).result.toFixed(6)}
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Pasos:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      {(results as ProgressionResult).steps.map((step: string, index: number) => (
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
