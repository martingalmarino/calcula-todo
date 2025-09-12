"use client"

import { useState, useCallback } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Calculator, Hash, TrendingUp } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface BinomialResult {
  coefficient: number
  formula: string
  calculation: string
  applications: string[]
}

export default function CoeficienteBinomialClient() {
  const [n, setN] = useState<string>('')
  const [k, setK] = useState<string>('')
  const [result, setResult] = useState<BinomialResult | null>(null)
  const [error, setError] = useState<string>('')

  // Función para calcular factorial
  const factorial = (num: number): number => {
    if (num < 0) return 0
    if (num === 0 || num === 1) return 1
    let result = 1
    for (let i = 2; i <= num; i++) {
      result *= i
    }
    return result
  }

  // Función para calcular el coeficiente binomial
  const binomialCoefficient = (n: number, k: number): number => {
    if (k > n || k < 0) return 0
    if (k === 0 || k === n) return 1
    
    // Usar la propiedad de simetría para optimizar
    if (k > n - k) k = n - k
    
    let result = 1
    for (let i = 0; i < k; i++) {
      result = result * (n - i) / (i + 1)
    }
    
    return Math.round(result)
  }

  const calculateBinomial = useCallback(() => {
    setError('')
    setResult(null)

    // Validaciones
    if (!n || !k) {
      setError('Por favor, ingresa valores para n y k')
      return
    }

    const nNum = parseInt(n)
    const kNum = parseInt(k)

    if (isNaN(nNum) || isNaN(kNum)) {
      setError('Por favor, ingresa números válidos')
      return
    }

    if (nNum < 0 || kNum < 0) {
      setError('Los valores deben ser números enteros no negativos')
      return
    }

    if (kNum > nNum) {
      setError('k no puede ser mayor que n')
      return
    }

    if (nNum > 100) {
      setError('Para valores de n mayores a 100, los resultados pueden ser muy grandes')
      return
    }

    try {
      const coefficient = binomialCoefficient(nNum, kNum)
      
      // Generar la fórmula
      const formula = `C(${nNum}, ${kNum}) = ${nNum}! / (${kNum}! × (${nNum} - ${kNum})!)`
      
      // Generar el cálculo paso a paso
      const nFactorial = factorial(nNum)
      const kFactorial = factorial(kNum)
      const nMinusKFactorial = factorial(nNum - kNum)
      
      const calculation = `${nFactorial} / (${kFactorial} × ${nMinusKFactorial}) = ${coefficient.toLocaleString()}`

      // Aplicaciones del coeficiente binomial
      const applications = []
      
      if (kNum === 0 || kNum === nNum) {
        applications.push('Caso especial: C(n,0) = C(n,n) = 1')
      }
      
      if (kNum === 1) {
        applications.push('Número de formas de elegir 1 elemento de n: C(n,1) = n')
      }
      
      if (kNum === 2) {
        applications.push('Número de combinaciones de 2 elementos: C(n,2) = n(n-1)/2')
      }
      
      applications.push('Combinaciones: Número de formas de elegir k elementos de n sin importar el orden')
      applications.push('Probabilidad: Usado en distribuciones binomiales')
      applications.push('Teorema del binomio: Coeficientes en (a + b)ⁿ')
      
      if (nNum <= 20) {
        applications.push('Triángulo de Pascal: Elemento en la fila n, posición k')
      }

      setResult({
        coefficient,
        formula,
        calculation,
        applications
      })
    } catch {
      setError('Error al calcular el coeficiente binomial')
    }
  }, [n, k])

  const resetCalculator = useCallback(() => {
    setN('')
    setK('')
    setResult(null)
    setError('')
  }, [])

  const loadExample = useCallback((exampleN: number, exampleK: number) => {
    setN(exampleN.toString())
    setK(exampleK.toString())
    setResult(null)
    setError('')
  }, [])

  const examples = [
    {
      label: 'Ejemplo: C(5,2) - Combinaciones de 5 elementos tomados de 2 en 2',
      values: { n: '5', k: '2' }
    },
    {
      label: 'Ejemplo: C(10,3) - Combinaciones de 10 elementos tomados de 3 en 3',
      values: { n: '10', k: '3' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es el coeficiente binomial C(n,k)?',
      answer: 'El coeficiente binomial C(n,k) representa el número de formas de elegir k elementos de un conjunto de n elementos, sin importar el orden. También se conoce como "n sobre k".'
    },
    {
      question: '¿Cuál es la fórmula del coeficiente binomial?',
      answer: 'C(n,k) = n! / (k! × (n-k)!) donde n! es el factorial de n.'
    },
    {
      question: '¿Para qué se usa el coeficiente binomial?',
      answer: 'Se usa en combinatoria, probabilidad, expansión binomial, estadística y muchas áreas de las matemáticas discretas.'
    },
    {
      question: '¿Qué restricciones tienen n y k?',
      answer: 'n debe ser mayor o igual a 0, k debe estar entre 0 y n (inclusive). Si k > n, el resultado es 0.'
    }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setN(String(values.n || ''))
    setK(String(values.k || ''))
    setError('')
    setResult(null)
  }

  const breadcrumbs = getBreadcrumbs('/matematicas/coeficiente-binomial')

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora del Coeficiente Binomial',
            description: 'Calcula el coeficiente binomial C(n,k) para combinaciones y probabilidades. Útil para matemáticas discretas, estadística y probabilidad.',
            url: '/matematicas/coeficiente-binomial/',
            category: 'Matemáticas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora del Coeficiente Binomial"
            description="Calcula el coeficiente binomial C(n,k) para combinaciones y probabilidades. Útil para matemáticas discretas, estadística y probabilidad."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            disclaimer="Esta calculadora maneja números enteros no negativos. Para valores muy grandes, los resultados pueden ser aproximados debido a limitaciones de precisión numérica."
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calculadora de Coeficiente Binomial
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Hash className="inline w-4 h-4 mr-1" />
              n (total de elementos)
            </label>
            <Input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              placeholder="Ej: 10"
              min="0"
              max="100"
            />
            <p className="text-sm text-gray-500 mt-1">
              Número total de elementos
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TrendingUp className="inline w-4 h-4 mr-1" />
              k (elementos a elegir)
            </label>
            <Input
              type="number"
              value={k}
              onChange={(e) => setK(e.target.value)}
              placeholder="Ej: 3"
              min="0"
            />
            <p className="text-sm text-gray-500 mt-1">
              Número de elementos a elegir
            </p>
          </div>
        </div>

        {/* Example Buttons */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Ejemplos:
          </label>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => loadExample(5, 2)}
              variant="outline"
              size="sm"
              className="border-gray-300 hover:bg-gray-50"
            >
              C(5,2) = 10
            </Button>
            <Button
              onClick={() => loadExample(10, 3)}
              variant="outline"
              size="sm"
              className="border-gray-300 hover:bg-gray-50"
            >
              C(10,3) = 120
            </Button>
            <Button
              onClick={() => loadExample(6, 0)}
              variant="outline"
              size="sm"
              className="border-gray-300 hover:bg-gray-50"
            >
              C(6,0) = 1
            </Button>
            <Button
              onClick={() => loadExample(8, 8)}
              variant="outline"
              size="sm"
              className="border-gray-300 hover:bg-gray-50"
            >
              C(8,8) = 1
            </Button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button onClick={calculateBinomial} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
            <Calculator className="w-4 h-4 mr-2" />
            Calcular C(n,k)
          </Button>
          <Button onClick={resetCalculator} variant="outline" className="border-gray-300 hover:bg-gray-50">
            Limpiar
          </Button>
        </div>

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            {error}
          </Alert>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4">
            {/* Main Result */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Coeficiente Binomial
                </h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  C({n}, {k}) = {result.coefficient.toLocaleString()}
                </div>
                <p className="text-gray-600">
                  Número de combinaciones de {k} elementos tomados de {n}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Fórmula:</h4>
                  <p className="text-blue-800 font-mono text-sm">
                    {result.formula}
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Cálculo:</h4>
                  <p className="text-green-800 font-mono text-sm">
                    {result.calculation}
                  </p>
                </div>
              </div>
            </div>

            {/* Applications */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-3">Aplicaciones:</h4>
              <ul className="space-y-2">
                {result.applications.map((app, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span className="text-purple-800">{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Información Adicional:</h4>
              <div className="text-gray-700 text-sm space-y-2">
                <p>
                  <strong>Propiedad de simetría:</strong> C(n,k) = C(n,n-k)
                </p>
                <p>
                  <strong>Suma de fila:</strong> C(n,0) + C(n,1) + ... + C(n,n) = 2ⁿ
                </p>
                <p>
                  <strong>Relación de recurrencia:</strong> C(n,k) = C(n-1,k-1) + C(n-1,k)
                </p>
                <p>
                  <strong>Uso en probabilidad:</strong> Para calcular probabilidades en experimentos binomiales
                </p>
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
