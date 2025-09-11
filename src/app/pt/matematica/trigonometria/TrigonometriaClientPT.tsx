"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Triangle, Calculator } from 'lucide-react'
import { sin, cos, tan, asin, acos, atan, toRadians, toDegrees } from '@/lib/math/trig'
import { jsonLdCalculator } from '@/lib/seo'

export default function TrigonometriaClientPT() {
  const [activeTab, setActiveTab] = useState('sin')
  const [angle, setAngle] = useState('')
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState('degrees')
  const [results, setResults] = useState<{
    result: number;
    formula: string;
    steps: string[];
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    try {
      let result
      
      switch (activeTab) {
        case 'sin':
        case 'cos':
        case 'tan':
          if (!angle) {
            setError('Por favor, preencha o ângulo')
            return
          }
          const angleNum = parseFloat(angle)
          if (activeTab === 'sin') {
            result = sin(angleNum, unit as 'degrees' | 'radians')
          } else if (activeTab === 'cos') {
            result = cos(angleNum, unit as 'degrees' | 'radians')
          } else {
            result = tan(angleNum, unit as 'degrees' | 'radians')
          }
          break
          
        case 'asin':
        case 'acos':
        case 'atan':
          if (!value) {
            setError('Por favor, preencha o valor')
            return
          }
          const valueNum = parseFloat(value)
          if (valueNum < -1 || valueNum > 1) {
            setError('O valor deve estar entre -1 e 1 para funções trigonométricas inversas')
            return
          }
          if (activeTab === 'asin') {
            result = asin(valueNum, unit as 'degrees' | 'radians')
          } else if (activeTab === 'acos') {
            result = acos(valueNum, unit as 'degrees' | 'radians')
          } else {
            result = atan(valueNum, unit as 'degrees' | 'radians')
          }
          break
          
        case 'convert':
          if (!angle) {
            setError('Por favor, preencha o ângulo')
            return
          }
          const convertAngle = parseFloat(angle)
          if (unit === 'degrees') {
            result = {
              result: toRadians(convertAngle),
              formula: `${convertAngle}° × π/180`,
              steps: [
                `Converter ${convertAngle}° para radianos`,
                `${convertAngle}° × π/180 = ${toRadians(convertAngle).toFixed(6)} rad`
              ]
            }
          } else {
            result = {
              result: toDegrees(convertAngle),
              formula: `${convertAngle} × 180/π`,
              steps: [
                `Converter ${convertAngle} rad para graus`,
                `${convertAngle} × 180/π = ${toDegrees(convertAngle).toFixed(2)}°`
              ]
            }
          }
          break
          
        default:
          setError('Operação não reconhecida')
          return
      }
      
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Matemática', href: '/pt/matematica/' },
    { label: 'Calculadora de Trigonometria', href: '/pt/matematica/trigonometria/' }
  ]

  const examples = [
    {
      label: 'Exemplo: sin(30°)',
      values: { angle: '30' }
    },
    {
      label: 'Exemplo: cos(π/4)',
      values: { angle: '0.785', unit: 'radians' }
    },
    {
      label: 'Exemplo: asin(0.5)',
      values: { value: '0.5' }
    }
  ]

  const faqItems = [
    {
      question: 'Como calcular funções trigonométricas?',
      answer: 'Use as funções sin, cos, tan com o ângulo em graus ou radianos. As funções inversas (asin, acos, atan) retornam o ângulo para um valor dado.'
    },
    {
      question: 'Qual a diferença entre graus e radianos?',
      answer: 'Graus: círculo completo = 360°. Radianos: círculo completo = 2π rad. Para converter: graus × π/180 = radianos, radianos × 180/π = graus.'
    },
    {
      question: 'O que são funções trigonométricas inversas?',
      answer: 'São as funções que retornam o ângulo para um valor dado: asin (arco seno), acos (arco cosseno), atan (arco tangente).'
    },
    {
      question: 'Quais são os valores importantes?',
      answer: 'sin(30°) = 0.5, cos(60°) = 0.5, tan(45°) = 1, sin(90°) = 1, cos(0°) = 1, tan(0°) = 0.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadora de Álgebra',
      href: '/pt/matematica/algebra/'
    },
    {
      label: 'Calculadora de Derivadas',
      href: '/pt/matematica/derivadas/'
    },
    {
      label: 'Outras Calculadoras de Matemática',
      href: '/pt/matematica/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Trigonometria',
            description: 'Calcular seno, cosseno, tangente e funções trigonométricas inversas',
            url: '/pt/matematica/trigonometria/',
            category: 'Matemática'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Trigonometria"
            description="Calcular seno, cosseno, tangente e funções trigonométricas inversas"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              if (values.angle) setAngle(values.angle as string)
              if (values.value) setValue(values.value as string)
              if (values.unit) setUnit(values.unit as string)
            }}
            relatedLinks={relatedLinks}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
                <TabsTrigger value="sin">sin</TabsTrigger>
                <TabsTrigger value="cos">cos</TabsTrigger>
                <TabsTrigger value="tan">tan</TabsTrigger>
                <TabsTrigger value="asin">asin</TabsTrigger>
                <TabsTrigger value="acos">acos</TabsTrigger>
                <TabsTrigger value="atan">atan</TabsTrigger>
                <TabsTrigger value="convert">Converter</TabsTrigger>
              </TabsList>

              <TabsContent value="sin" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="angle">Ângulo</Label>
                    <Input
                      id="angle"
                      type="number"
                      step="0.01"
                      value={angle}
                      onChange={(e) => setAngle(e.target.value)}
                      placeholder="Ex: 30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unidade</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="degrees">Graus (°)</SelectItem>
                        <SelectItem value="radians">Radianos (rad)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: sin(ângulo)
                </p>
              </TabsContent>

              <TabsContent value="cos" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="angle">Ângulo</Label>
                    <Input
                      id="angle"
                      type="number"
                      step="0.01"
                      value={angle}
                      onChange={(e) => setAngle(e.target.value)}
                      placeholder="Ex: 60"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unidade</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="degrees">Graus (°)</SelectItem>
                        <SelectItem value="radians">Radianos (rad)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: cos(ângulo)
                </p>
              </TabsContent>

              <TabsContent value="tan" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="angle">Ângulo</Label>
                    <Input
                      id="angle"
                      type="number"
                      step="0.01"
                      value={angle}
                      onChange={(e) => setAngle(e.target.value)}
                      placeholder="Ex: 45"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unidade</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="degrees">Graus (°)</SelectItem>
                        <SelectItem value="radians">Radianos (rad)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: tan(ângulo)
                </p>
              </TabsContent>

              <TabsContent value="asin" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="value">Valor (-1 a 1)</Label>
                    <Input
                      id="value"
                      type="number"
                      step="0.01"
                      min="-1"
                      max="1"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Ex: 0.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unidade de saída</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="degrees">Graus (°)</SelectItem>
                        <SelectItem value="radians">Radianos (rad)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: asin(valor)
                </p>
              </TabsContent>

              <TabsContent value="acos" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="value">Valor (-1 a 1)</Label>
                    <Input
                      id="value"
                      type="number"
                      step="0.01"
                      min="-1"
                      max="1"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Ex: 0.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unidade de saída</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="degrees">Graus (°)</SelectItem>
                        <SelectItem value="radians">Radianos (rad)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: acos(valor)
                </p>
              </TabsContent>

              <TabsContent value="atan" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="value">Valor</Label>
                    <Input
                      id="value"
                      type="number"
                      step="0.01"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Ex: 1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unidade de saída</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="degrees">Graus (°)</SelectItem>
                        <SelectItem value="radians">Radianos (rad)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calcula: atan(valor)
                </p>
              </TabsContent>

              <TabsContent value="convert" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="angle">Ângulo</Label>
                    <Input
                      id="angle"
                      type="number"
                      step="0.01"
                      value={angle}
                      onChange={(e) => setAngle(e.target.value)}
                      placeholder="Ex: 180"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Converter de</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="degrees">Graus para Radianos</SelectItem>
                        <SelectItem value="radians">Radianos para Graus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Converte entre graus e radianos
                </p>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4">
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {results && (
              <Card className="mt-4 bg-indigo-50 border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-700 flex items-center gap-2">
                    <Triangle className="h-5 w-5" />
                    Resultado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-indigo-600">
                        {results.result.toFixed(6)}
                        {activeTab === 'convert' && (unit === 'degrees' ? ' rad' : '°')}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Fórmula: {results.formula}
                      </p>
                    </div>
                  </div>
                  
                  {results.steps && results.steps.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Passos da resolução:</h4>
                      <div className="space-y-1">
                        {results.steps.map((step: string, index: number) => (
                          <p key={index} className="text-sm text-muted-foreground">
                            {index + 1}. {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
