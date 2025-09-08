"use client"

import { useState } from 'react'
import { Triangle, RotateCcw } from 'lucide-react'
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
  sin, cos, tan,
  asin, acos, atan,
  hypotenuse, cathetus,
  type TrigResult
} from '@/lib/math/trig'

export default function TrigonometriaClient() {
  const [activeTab, setActiveTab] = useState('basic')
  const [results, setResults] = useState<TrigResult | { angle: number; unit: string; sin: TrigResult; cos: TrigResult; tan: TrigResult; steps: string[] } | { value: number; unit: string; asin: TrigResult; acos: TrigResult; atan: TrigResult; steps: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [angleUnit, setAngleUnit] = useState<'degrees' | 'radians'>('degrees')

  // Estados para cada tipo de cálculo
  const [basicValues, setBasicValues] = useState({ angle: '' })
  const [inverseValues, setInverseValues] = useState({ value: '' })
  const [pythagorasValues, setPythagorasValues] = useState({ a: '', b: '' })

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'basic':
          if (!basicValues.angle) {
            setError('Por favor, ingresa un ángulo')
            return
          }
          const angle = Number(basicValues.angle)
          const sinResult = sin(angle, angleUnit)
          const cosResult = cos(angle, angleUnit)
          const tanResult = tan(angle, angleUnit)
          
          result = {
            angle,
            unit: angleUnit,
            sin: sinResult,
            cos: cosResult,
            tan: tanResult,
            steps: [
              `Ángulo: ${angle}${angleUnit === 'degrees' ? '°' : ' rad'}`,
              `sin(${angle}${angleUnit === 'degrees' ? '°' : ' rad'}) = ${sinResult.result.toFixed(6)}`,
              `cos(${angle}${angleUnit === 'degrees' ? '°' : ' rad'}) = ${cosResult.result.toFixed(6)}`,
              `tan(${angle}${angleUnit === 'degrees' ? '°' : ' rad'}) = ${tanResult.result.toFixed(6)}`
            ]
          }
          break
        case 'inverse':
          if (!inverseValues.value) {
            setError('Por favor, ingresa un valor')
            return
          }
          const value = Number(inverseValues.value)
          if (value < -1 || value > 1) {
            setError('El valor debe estar entre -1 y 1 para las funciones trigonométricas inversas')
            return
          }
          const asinResult = asin(value, angleUnit)
          const acosResult = acos(value, angleUnit)
          const atanResult = atan(value, angleUnit)
          
          result = {
            value,
            unit: angleUnit,
            asin: asinResult,
            acos: acosResult,
            atan: atanResult,
            steps: [
              `Valor: ${value}`,
              `arcsin(${value}) = ${asinResult.result.toFixed(6)}${angleUnit === 'degrees' ? '°' : ' rad'}`,
              `arccos(${value}) = ${acosResult.result.toFixed(6)}${angleUnit === 'degrees' ? '°' : ' rad'}`,
              `arctan(${value}) = ${atanResult.result.toFixed(6)}${angleUnit === 'degrees' ? '°' : ' rad'}`
            ]
          }
          break
        case 'pythagoras':
          if (!pythagorasValues.a || !pythagorasValues.b) {
            setError('Por favor, ingresa ambos catetos')
            return
          }
          const a = Number(pythagorasValues.a)
          const b = Number(pythagorasValues.b)
          if (a <= 0 || b <= 0) {
            setError('Los catetos deben ser números positivos')
            return
          }
          result = hypotenuse(a, b)
          break
        case 'cathetus':
          if (!pythagorasValues.a || !pythagorasValues.b) {
            setError('Por favor, ingresa la hipotenusa y un cateto')
            return
          }
          const hyp = Number(pythagorasValues.a)
          const cat = Number(pythagorasValues.b)
          if (hyp <= 0 || cat <= 0) {
            setError('Los valores deben ser números positivos')
            return
          }
          if (cat >= hyp) {
            setError('El cateto debe ser menor que la hipotenusa')
            return
          }
          result = cathetus(hyp, cat)
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
      case 'basic':
        setBasicValues({ angle: (values.angle as number).toString() })
        break
      case 'inverse':
        setInverseValues({ value: (values.value as number).toString() })
        break
      case 'pythagoras':
      case 'cathetus':
        setPythagorasValues({ a: (values.a as number).toString(), b: (values.b as number).toString() })
        break
    }
  }

  const examples = [
    { label: 'sin(30°)', values: { angle: 30 } },
    { label: 'cos(45°)', values: { angle: 45 } },
    { label: 'tan(60°)', values: { angle: 60 } },
    { label: 'arcsin(0.5)', values: { value: 0.5 } },
    { label: 'Teorema de Pitágoras: a=3, b=4', values: { a: 3, b: 4 } }
  ]

  const faqItems = [
    {
      question: "¿Qué es la trigonometría?",
      answer: "La trigonometría es una rama de las matemáticas que estudia las relaciones entre los ángulos y los lados de los triángulos, especialmente los triángulos rectángulos."
    },
    {
      question: "¿Cuáles son las funciones trigonométricas básicas?",
      answer: "Las funciones trigonométricas básicas son seno (sin), coseno (cos) y tangente (tan). Estas funciones relacionan los ángulos con las razones de los lados de un triángulo rectángulo."
    },
    {
      question: "¿Qué es el teorema de Pitágoras?",
      answer: "El teorema de Pitágoras establece que en un triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos: a² + b² = c²."
    },
    {
      question: "¿Cuál es la diferencia entre grados y radianes?",
      answer: "Los grados y radianes son dos unidades para medir ángulos. Un círculo completo tiene 360° o 2π radianes. Los radianes son la unidad estándar en matemáticas avanzadas."
    },
    {
      question: "¿Qué son las funciones trigonométricas inversas?",
      answer: "Las funciones trigonométricas inversas (arcsin, arccos, arctan) permiten encontrar el ángulo cuando se conoce el valor de la función trigonométrica."
    }
  ]

  const relatedLinks = getRelatedCalculators('matematicas', 'trigonometria').map(calc => ({
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
            name: 'Calculadora de Trigonometría',
            description: 'Calcula funciones trigonométricas, funciones inversas y aplica el teorema de Pitágoras',
            url: '/matematicas/trigonometria/',
            category: 'Matemáticas'
          })),
        }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={getBreadcrumbs('/matematicas/trigonometria/')} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Trigonometría"
            description="Calcula funciones trigonométricas, funciones inversas y aplica el teorema de Pitágoras"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="basic" className="calculator-tab">Básicas</TabsTrigger>
                <TabsTrigger value="inverse" className="calculator-tab">Inversas</TabsTrigger>
                <TabsTrigger value="pythagoras" className="calculator-tab">Hipotenusa</TabsTrigger>
                <TabsTrigger value="cathetus" className="calculator-tab">Cateto</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="calculator-label">Unidad de ángulo:</label>
                    <Select value={angleUnit} onValueChange={(value: 'degrees' | 'radians') => setAngleUnit(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="degrees">Grados</SelectItem>
                        <SelectItem value="radians">Radianes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="basic-angle" className="calculator-label">
                        Ángulo
                      </label>
                      <Input
                        id="basic-angle"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 30"
                        value={basicValues.angle}
                        onChange={(e) => setBasicValues({ ...basicValues, angle: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Triangle className="h-4 w-4 mr-2" />
                    Calcular Funciones Trigonométricas
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="inverse" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="calculator-label">Unidad de resultado:</label>
                    <Select value={angleUnit} onValueChange={(value: 'degrees' | 'radians') => setAngleUnit(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="degrees">Grados</SelectItem>
                        <SelectItem value="radians">Radianes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="inverse-value" className="calculator-label">
                        Valor (-1 a 1)
                      </label>
                      <Input
                        id="inverse-value"
                        type="number"
                        step="0.001"
                        min="-1"
                        max="1"
                        placeholder="Ej: 0.5"
                        value={inverseValues.value}
                        onChange={(e) => setInverseValues({ ...inverseValues, value: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Calcular Funciones Inversas
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="pythagoras" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="pyth-a" className="calculator-label">
                        Cateto a
                      </label>
                      <Input
                        id="pyth-a"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={pythagorasValues.a}
                        onChange={(e) => setPythagorasValues({ ...pythagorasValues, a: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="pyth-b" className="calculator-label">
                        Cateto b
                      </label>
                      <Input
                        id="pyth-b"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 4"
                        value={pythagorasValues.b}
                        onChange={(e) => setPythagorasValues({ ...pythagorasValues, b: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Triangle className="h-4 w-4 mr-2" />
                    Calcular Hipotenusa
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="cathetus" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="cat-hyp" className="calculator-label">
                        Hipotenusa
                      </label>
                      <Input
                        id="cat-hyp"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 5"
                        value={pythagorasValues.a}
                        onChange={(e) => setPythagorasValues({ ...pythagorasValues, a: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="cat-cat" className="calculator-label">
                        Cateto conocido
                      </label>
                      <Input
                        id="cat-cat"
                        type="number"
                        step="0.001"
                        placeholder="Ej: 3"
                        value={pythagorasValues.b}
                        onChange={(e) => setPythagorasValues({ ...pythagorasValues, b: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button bg-red-600 hover:bg-red-700 text-white">
                    <Triangle className="h-4 w-4 mr-2" />
                    Calcular Cateto
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
                  {activeTab === 'basic' && (
                    <div className="space-y-2">
                      <div className="text-lg font-semibold">
                        Ángulo: {(results as { angle: number; unit: string; sin: TrigResult; cos: TrigResult; tan: TrigResult; steps: string[] }).angle}{(results as { angle: number; unit: string; sin: TrigResult; cos: TrigResult; tan: TrigResult; steps: string[] }).unit === 'degrees' ? '°' : ' rad'}
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        sin = {(results as { angle: number; unit: string; sin: TrigResult; cos: TrigResult; tan: TrigResult; steps: string[] }).sin.result.toFixed(6)}
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        cos = {(results as { angle: number; unit: string; sin: TrigResult; cos: TrigResult; tan: TrigResult; steps: string[] }).cos.result.toFixed(6)}
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        tan = {(results as { angle: number; unit: string; sin: TrigResult; cos: TrigResult; tan: TrigResult; steps: string[] }).tan.result.toFixed(6)}
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'inverse' && (
                    <div className="space-y-2">
                      <div className="text-lg font-semibold">
                        Valor: {(results as { value: number; unit: string; asin: TrigResult; acos: TrigResult; atan: TrigResult; steps: string[] }).value}
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        arcsin = {(results as { value: number; unit: string; asin: TrigResult; acos: TrigResult; atan: TrigResult; steps: string[] }).asin.result.toFixed(6)}{(results as { value: number; unit: string; asin: TrigResult; acos: TrigResult; atan: TrigResult; steps: string[] }).unit === 'degrees' ? '°' : ' rad'}
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        arccos = {(results as { value: number; unit: string; asin: TrigResult; acos: TrigResult; atan: TrigResult; steps: string[] }).acos.result.toFixed(6)}{(results as { value: number; unit: string; asin: TrigResult; acos: TrigResult; atan: TrigResult; steps: string[] }).unit === 'degrees' ? '°' : ' rad'}
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        arctan = {(results as { value: number; unit: string; asin: TrigResult; acos: TrigResult; atan: TrigResult; steps: string[] }).atan.result.toFixed(6)}{(results as { value: number; unit: string; asin: TrigResult; acos: TrigResult; atan: TrigResult; steps: string[] }).unit === 'degrees' ? '°' : ' rad'}
                      </div>
                    </div>
                  )}
                  
                  {(activeTab === 'pythagoras' || activeTab === 'cathetus') && (
                    <div className="text-2xl font-bold text-primary">
                      {activeTab === 'pythagoras' ? 'Hipotenusa' : 'Cateto'} = {(results as TrigResult).result.toFixed(6)}
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Pasos:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      {(results as { angle: number; unit: string; sin: TrigResult; cos: TrigResult; tan: TrigResult; steps: string[] }).steps.map((step: string, index: number) => (
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
