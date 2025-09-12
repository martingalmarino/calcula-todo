"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Atom, AlertCircle, Info } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface ElementData {
  symbol: string
  count: number
  atomicMass: number
  totalMass: number
}

interface MasaMolarResult {
  totalMolarMass: number
  elements: ElementData[]
  formula: string
}

// Masas atómicas de elementos comunes (g/mol)
const ATOMIC_MASSES: Record<string, number> = {
  'H': 1.008,
  'He': 4.003,
  'Li': 6.941,
  'Be': 9.012,
  'B': 10.811,
  'C': 12.011,
  'N': 14.007,
  'O': 15.999,
  'F': 18.998,
  'Ne': 20.180,
  'Na': 22.990,
  'Mg': 24.305,
  'Al': 26.982,
  'Si': 28.085,
  'P': 30.974,
  'S': 32.065,
  'Cl': 35.453,
  'Ar': 39.948,
  'K': 39.098,
  'Ca': 40.078,
  'Fe': 55.845,
  'Cu': 63.546,
  'Zn': 65.38,
  'Br': 79.904,
  'Ag': 107.868,
  'I': 126.904,
  'Ba': 137.327,
  'Au': 196.967,
  'Hg': 200.59,
  'Pb': 207.2
}

export default function MasaMolarClient() {
  const [formula, setFormula] = useState('')
  const [results, setResults] = useState<MasaMolarResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const parseFormula = (formulaStr: string): ElementData[] => {
    const elements: ElementData[] = []
    const regex = /([A-Z][a-z]?)(\d*)/g
    let match

    while ((match = regex.exec(formulaStr)) !== null) {
      const symbol = match[1]
      const count = match[2] ? parseInt(match[2]) : 1
      
      if (!ATOMIC_MASSES[symbol]) {
        throw new Error(`Elemento desconocido: ${symbol}`)
      }

      const atomicMass = ATOMIC_MASSES[symbol]
      const totalMass = atomicMass * count

      elements.push({
        symbol,
        count,
        atomicMass,
        totalMass
      })
    }

    return elements
  }

  const calculateMolarMass = (formulaStr: string): MasaMolarResult => {
    const elements = parseFormula(formulaStr)
    const totalMolarMass = elements.reduce((sum, element) => sum + element.totalMass, 0)

    return {
      totalMolarMass: Math.round(totalMolarMass * 1000) / 1000,
      elements,
      formula: formulaStr
    }
  }

  const handleCalculate = () => {
    setError(null)
    
    if (!formula.trim()) {
      setError('Por favor, ingresa una fórmula química')
      return
    }

    try {
      const result = calculateMolarMass(formula.trim())
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular la masa molar')
    }
  }

  const breadcrumbs = getBreadcrumbs('/quimica/masa-molar')

  const examples = [
    {
      label: 'Ejemplo: H2O',
      values: { formula: 'H2O' }
    },
    {
      label: 'Ejemplo: CO2',
      values: { formula: 'CO2' }
    },
    {
      label: 'Ejemplo: CaCO3',
      values: { formula: 'CaCO3' }
    },
    {
      label: 'Ejemplo: C6H12O6',
      values: { formula: 'C6H12O6' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la masa molar?',
      answer: 'La masa molar es la masa de un mol de una sustancia, expresada en gramos por mol (g/mol). Se calcula sumando las masas atómicas de todos los elementos en la fórmula.'
    },
    {
      question: '¿Cómo se calcula la masa molar?',
      answer: 'Se multiplica la masa atómica de cada elemento por su subíndice en la fórmula y se suman todos los resultados.'
    },
    {
      question: '¿Qué elementos están disponibles?',
      answer: 'La calculadora incluye los elementos más comunes de la tabla periódica. Si necesitas un elemento específico, puedes consultar una tabla periódica completa.'
    },
    {
      question: '¿Cómo escribo la fórmula correctamente?',
      answer: 'Usa mayúsculas para el primer símbolo del elemento y minúsculas para el segundo (si aplica). Los subíndices van después del símbolo sin espacios.'
    },
    {
      question: '¿Qué pasa si no hay subíndice?',
      answer: 'Si no hay subíndice visible, significa que hay 1 átomo de ese elemento en la fórmula.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Masa Molar',
            description: 'Calcula la masa molar total de una fórmula química sumando los elementos',
            url: '/quimica/masa-molar/',
            category: 'Química'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Masa Molar"
            description="Calcula la masa molar total de una fórmula química sumando los elementos"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values: Record<string, unknown>) => {
              setFormula((values.formula as string) || '')
              setResults(null)
              setError(null)
            }}
          >
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Atom className="w-5 h-5 text-emerald-600" />
                  Calculadora de Masa Molar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="formula" className="text-sm font-medium">
                    Fórmula química
                  </label>
                  <Input
                    id="formula"
                    type="text"
                    placeholder="Ej: H2O, CO2, CaCO3"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">
                    Usa mayúsculas para elementos (H, C, O, Ca, etc.)
                  </p>
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
                  <Atom className="h-4 w-4 mr-2" />
                  Calcular Masa Molar
                </Button>

                {results && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {results.totalMolarMass} g/mol
                      </div>
                      <div className="text-lg text-gray-600">
                        {results.formula}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Desglose por elemento:</h4>
                      <div className="space-y-1">
                        {results.elements.map((element, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">
                              {element.symbol}{element.count > 1 ? element.count : ''}
                            </span>
                            <span className="text-gray-900">
                              {element.atomicMass} × {element.count} = {element.totalMass.toFixed(3)} g/mol
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          <strong>Total:</strong> {results.elements.map(e => `${e.totalMass.toFixed(3)}`).join(' + ')} = {results.totalMolarMass} g/mol
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
