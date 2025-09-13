"use client"

import { useState } from 'react'
import { Triangle, RotateCcw } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { jsonLdCalculator } from '@/lib/seo'
import { 
  sin, cos, tan,
  asin, acos, atan,
  hypotenuse, cathetus,
  type TrigResult
} from '@/lib/math/trig'

export default function TrigonometriaClientIT() {
  const [activeTab, setActiveTab] = useState('basic')
  const [results, setResults] = useState<TrigResult | { angle: number; unit: string; sin: TrigResult; cos: TrigResult; tan: TrigResult; steps: string[] } | { value: number; unit: string; asin: TrigResult; acos: TrigResult; atan: TrigResult; steps: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [angleUnit, setAngleUnit] = useState<'degrees' | 'radians'>('degrees')

  // Stati per ogni tipo di calcolo
  const [basicValues, setBasicValues] = useState({ angle: '' })
  const [inverseValues, setInverseValues] = useState({ value: '' })
  const [pythagorasValues, setPythagorasValues] = useState({ a: '', b: '' })

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Matematica', href: '/it/matematicas' },
    { label: 'Trigonometria', href: '/it/matematicas/trigonometria' }
  ]

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      let result
      switch (activeTab) {
        case 'basic':
          if (!basicValues.angle) {
            setError('Per favore, inserisci un angolo')
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
              `Angolo: ${angle}${angleUnit === 'degrees' ? '°' : ' rad'}`,
              `sin(${angle}${angleUnit === 'degrees' ? '°' : ' rad'}) = ${sinResult.result.toFixed(6)}`,
              `cos(${angle}${angleUnit === 'degrees' ? '°' : ' rad'}) = ${cosResult.result.toFixed(6)}`,
              `tan(${angle}${angleUnit === 'degrees' ? '°' : ' rad'}) = ${tanResult.result.toFixed(6)}`
            ]
          }
          break
        case 'inverse':
          if (!inverseValues.value) {
            setError('Per favore, inserisci un valore')
            return
          }
          const value = Number(inverseValues.value)
          if (value < -1 || value > 1) {
            setError('Il valore deve essere tra -1 e 1 per le funzioni trigonometriche inverse')
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
              `Valore: ${value}`,
              `arcsin(${value}) = ${asinResult.result.toFixed(6)}${angleUnit === 'degrees' ? '°' : ' rad'}`,
              `arccos(${value}) = ${acosResult.result.toFixed(6)}${angleUnit === 'degrees' ? '°' : ' rad'}`,
              `arctan(${value}) = ${atanResult.result.toFixed(6)}${angleUnit === 'degrees' ? '°' : ' rad'}`
            ]
          }
          break
        case 'pythagoras':
          if (!pythagorasValues.a || !pythagorasValues.b) {
            setError('Per favore, inserisci entrambi i cateti')
            return
          }
          const a = Number(pythagorasValues.a)
          const b = Number(pythagorasValues.b)
          if (a <= 0 || b <= 0) {
            setError('I cateti devono essere numeri positivi')
            return
          }
          result = hypotenuse(a, b)
          break
        case 'cathetus':
          if (!pythagorasValues.a || !pythagorasValues.b) {
            setError('Per favore, inserisci l\'ipotenusa e un cateto')
            return
          }
          const hyp = Number(pythagorasValues.a)
          const cat = Number(pythagorasValues.b)
          if (hyp <= 0 || cat <= 0) {
            setError('I valori devono essere numeri positivi')
            return
          }
          if (cat >= hyp) {
            setError('Il cateto deve essere minore dell\'ipotenusa')
            return
          }
          result = cathetus(hyp, cat)
          break
        default:
          setError('Tipo di calcolo non valido')
          return
      }
      setResults(result)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Errore nel calcolo')
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
    { label: 'Teorema di Pitagora: a=3, b=4', values: { a: 3, b: 4 } }
  ]

  const faqItems = [
    {
      question: "Cos'è la trigonometria?",
      answer: "La trigonometria è una branca della matematica che studia le relazioni tra gli angoli e i lati dei triangoli, specialmente i triangoli rettangoli."
    },
    {
      question: "Quali sono le funzioni trigonometriche di base?",
      answer: "Le funzioni trigonometriche di base sono seno (sin), coseno (cos) e tangente (tan). Queste funzioni mettono in relazione gli angoli con i rapporti dei lati di un triangolo rettangolo."
    },
    {
      question: "Cos'è il teorema di Pitagora?",
      answer: "Il teorema di Pitagora stabilisce che in un triangolo rettangolo, il quadrato dell'ipotenusa è uguale alla somma dei quadrati dei cateti: a² + b² = c²."
    },
    {
      question: "Qual è la differenza tra gradi e radianti?",
      answer: "I gradi e i radianti sono due unità per misurare gli angoli. Un cerchio completo ha 360° o 2π radianti. I radianti sono l'unità standard in matematica avanzata."
    },
    {
      question: "Cosa sono le funzioni trigonometriche inverse?",
      answer: "Le funzioni trigonometriche inverse (arcsin, arccos, arctan) permettono di trovare l'angolo quando si conosce il valore della funzione trigonometrica."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice di Trigonometria - Funzioni Trigonometriche',
            description: 'Calcola funzioni trigonometriche, funzioni inverse e applica il teorema di Pitagora online',
            url: '/it/matematicas/trigonometria/',
            category: 'Matematica'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice di Trigonometria"
            description="Calcola funzioni trigonometriche, funzioni inverse e applica il teorema di Pitagora"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="calculator-tabs">
                <TabsTrigger value="basic" className="calculator-tab">Basi</TabsTrigger>
                <TabsTrigger value="inverse" className="calculator-tab">Inverse</TabsTrigger>
                <TabsTrigger value="pythagoras" className="calculator-tab">Ipotenusa</TabsTrigger>
                <TabsTrigger value="cathetus" className="calculator-tab">Cateto</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="calculator-label">Unità di angolo:</label>
                    <Select value={angleUnit} onValueChange={(value: 'degrees' | 'radians') => setAngleUnit(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="degrees">Gradi</SelectItem>
                        <SelectItem value="radians">Radianti</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="basic-angle" className="calculator-label">
                        Angolo
                      </label>
                      <Input
                        id="basic-angle"
                        type="number"
                        step="0.001"
                        placeholder="Es: 30"
                        value={basicValues.angle}
                        onChange={(e) => setBasicValues({ ...basicValues, angle: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Triangle className="h-4 w-4 mr-2" />
                    Calcolare Funzioni Trigonometriche
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="inverse" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="calculator-label">Unità di risultato:</label>
                    <Select value={angleUnit} onValueChange={(value: 'degrees' | 'radians') => setAngleUnit(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="degrees">Gradi</SelectItem>
                        <SelectItem value="radians">Radianti</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="calculator-grid calculator-grid-1">
                    <div>
                      <label htmlFor="inverse-value" className="calculator-label">
                        Valore (-1 a 1)
                      </label>
                      <Input
                        id="inverse-value"
                        type="number"
                        step="0.001"
                        min="-1"
                        max="1"
                        placeholder="Es: 0.5"
                        value={inverseValues.value}
                        onChange={(e) => setInverseValues({ ...inverseValues, value: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Calcolare Funzioni Inverse
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
                        placeholder="Es: 3"
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
                        placeholder="Es: 4"
                        value={pythagorasValues.b}
                        onChange={(e) => setPythagorasValues({ ...pythagorasValues, b: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Triangle className="h-4 w-4 mr-2" />
                    Calcolare Ipotenusa
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="cathetus" className="space-y-4">
                <div className="space-y-4">
                  <div className="calculator-grid calculator-grid-2">
                    <div>
                      <label htmlFor="cat-hyp" className="calculator-label">
                        Ipotenusa
                      </label>
                      <Input
                        id="cat-hyp"
                        type="number"
                        step="0.001"
                        placeholder="Es: 5"
                        value={pythagorasValues.a}
                        onChange={(e) => setPythagorasValues({ ...pythagorasValues, a: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="cat-cat" className="calculator-label">
                        Cateto noto
                      </label>
                      <Input
                        id="cat-cat"
                        type="number"
                        step="0.001"
                        placeholder="Es: 3"
                        value={pythagorasValues.b}
                        onChange={(e) => setPythagorasValues({ ...pythagorasValues, b: e.target.value })}
                        className="calculator-input"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCalculate} className="calculator-button">
                    <Triangle className="h-4 w-4 mr-2" />
                    Calcolare Cateto
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Risultati */}
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
                  <CardTitle>Risultato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeTab === 'basic' && (
                    <div className="space-y-2">
                      <div className="text-lg font-semibold">
                        Angolo: {(results as { angle: number; unit: string; sin: TrigResult; cos: TrigResult; tan: TrigResult; steps: string[] }).angle}{(results as { angle: number; unit: string; sin: TrigResult; cos: TrigResult; tan: TrigResult; steps: string[] }).unit === 'degrees' ? '°' : ' rad'}
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
                        Valore: {(results as { value: number; unit: string; asin: TrigResult; acos: TrigResult; atan: TrigResult; steps: string[] }).value}
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
                      {activeTab === 'pythagoras' ? 'Ipotenusa' : 'Cateto'} = {(results as TrigResult).result.toFixed(6)}
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Passi:</h4>
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
    </div>
  )
}
