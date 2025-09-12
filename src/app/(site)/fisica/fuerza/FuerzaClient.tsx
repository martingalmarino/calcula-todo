"use client"

import { useState, useCallback } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Activity, Scale, Zap } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface FuerzaResult {
  fuerza: number
  unidad: string
  formula: string
  calculo: string
  equivalencias: {
    newton: number
    kgf: number
    lbf: number
  }
}

export function FuerzaClient() {
  const [masa, setMasa] = useState('')
  const [unidadMasa, setUnidadMasa] = useState('kg')
  const [aceleracion, setAceleracion] = useState('')
  const [unidadAceleracion, setUnidadAceleracion] = useState('m/s²')
  const [resultado, setResultado] = useState<FuerzaResult | null>(null)
  const [error, setError] = useState('')

  const calcularFuerza = useCallback(() => {
    setError('')
    setResultado(null)

    if (!masa || !aceleracion) {
      setError('Por favor, ingresa tanto la masa como la aceleración.')
      return
    }

    const m = parseFloat(masa)
    const a = parseFloat(aceleracion)

    if (isNaN(m) || isNaN(a) || m <= 0 || a <= 0) {
      setError('La masa y la aceleración deben ser números positivos.')
      return
    }

    // Convertir a unidades base (kg y m/s²)
    let masaEnKg = m
    let aceleracionEnMs2 = a

    // Conversión de masa
    switch (unidadMasa) {
      case 'g':
        masaEnKg = m / 1000
        break
      case 'lb':
        masaEnKg = m * 0.453592
        break
    }

    // Conversión de aceleración
    switch (unidadAceleracion) {
      case 'cm/s²':
        aceleracionEnMs2 = a / 100
        break
      case 'ft/s²':
        aceleracionEnMs2 = a * 0.3048
        break
    }

    // Calcular fuerza en Newtons
    const fuerzaNewton = masaEnKg * aceleracionEnMs2

    // Conversiones a otras unidades
    const fuerzaKgf = fuerzaNewton / 9.80665
    const fuerzaLbf = fuerzaNewton * 0.224809

    const resultado: FuerzaResult = {
      fuerza: fuerzaNewton,
      unidad: 'N',
      formula: 'F = m·a',
      calculo: `${masaEnKg.toFixed(2)} kg × ${aceleracionEnMs2.toFixed(2)} m/s² = ${fuerzaNewton.toFixed(2)} N`,
      equivalencias: {
        newton: fuerzaNewton,
        kgf: fuerzaKgf,
        lbf: fuerzaLbf
      }
    }

    setResultado(resultado)
  }, [masa, unidadMasa, aceleracion, unidadAceleracion])

  const resetCalculator = useCallback(() => {
    setMasa('')
    setUnidadMasa('kg')
    setAceleracion('')
    setUnidadAceleracion('m/s²')
    setResultado(null)
    setError('')
  }, [])

  const handleExampleClick = useCallback((values: { masa?: string; unidadMasa?: string; aceleracion?: string; unidadAceleracion?: string }) => {
    setMasa(String(values.masa || ''))
    setUnidadMasa(values.unidadMasa || 'kg')
    setAceleracion(String(values.aceleracion || ''))
    setUnidadAceleracion(values.unidadAceleracion || 'm/s²')
    setError('')
    setResultado(null)
  }, [])

  const examples = [
    {
      label: 'Coche acelerando - Un coche de 1200 kg acelera a 2 m/s²',
      values: {
        masa: '1200',
        unidadMasa: 'kg',
        aceleracion: '2',
        unidadAceleracion: 'm/s²'
      }
    },
    {
      label: 'Objeto en caída libre - Un objeto de 5 kg en caída libre (g = 9.8 m/s²)',
      values: {
        masa: '5',
        unidadMasa: 'kg',
        aceleracion: '9.8',
        unidadAceleracion: 'm/s²'
      }
    }
  ]

  const faqItems = [
    {
      question: "¿Qué es la segunda ley de Newton?",
      answer: "La segunda ley de Newton establece que la fuerza neta aplicada sobre un objeto es igual al producto de su masa por su aceleración: F = m·a."
    },
    {
      question: "¿Cuáles son las unidades de fuerza?",
      answer: "La unidad fundamental de fuerza en el SI es el Newton (N). También se usan kilogramo-fuerza (kgf) y libra-fuerza (lbf)."
    },
    {
      question: "¿Cómo se relaciona la fuerza con la masa y aceleración?",
      answer: "La fuerza es directamente proporcional a la masa y a la aceleración. Si duplicas la masa o la aceleración, la fuerza se duplica."
    },
    {
      question: "¿Qué significa una fuerza negativa?",
      answer: "Una fuerza negativa indica que la fuerza actúa en dirección opuesta al sistema de coordenadas elegido. En la práctica, solo consideramos magnitudes positivas."
    }
  ]

  const breadcrumbs = getBreadcrumbs('/fisica/fuerza')

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Fuerza',
            description: 'Calcula fuerza aplicando la segunda ley de Newton. Ingresa masa y aceleración para obtener fuerza en Newtons.',
            url: '/fisica/fuerza/',
            category: 'Física'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Fuerza - F = m·a"
            description="Calcula fuerza aplicando la segunda ley de Newton. Ingresa masa y aceleración para obtener fuerza en Newtons con conversiones automáticas."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            disclaimer="Esta calculadora aplica la segunda ley de Newton para fuerzas constantes. Para fuerzas variables se necesitarían métodos de cálculo diferencial."
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Calculadora de Fuerza
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Scale className="inline w-4 h-4 mr-1" />
                      Masa
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={masa}
                        onChange={(e) => setMasa(e.target.value)}
                        placeholder="ej: 5"
                        className="flex-1"
                      />
                      <Select value={unidadMasa} onValueChange={setUnidadMasa}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="g">g</SelectItem>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="lb">lb</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Zap className="inline w-4 h-4 mr-1" />
                      Aceleración
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={aceleracion}
                        onChange={(e) => setAceleracion(e.target.value)}
                        placeholder="ej: 9.8"
                        className="flex-1"
                      />
                      <Select value={unidadAceleracion} onValueChange={setUnidadAceleracion}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cm/s²">cm/s²</SelectItem>
                          <SelectItem value="m/s²">m/s²</SelectItem>
                          <SelectItem value="ft/s²">ft/s²</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={calcularFuerza} 
                    className="flex-1 text-white" 
                    style={{ backgroundColor: '#0284c7' }} 
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'} 
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Calcular Fuerza
                  </Button>
                  <Button 
                    onClick={resetCalculator} 
                    variant="outline" 
                    className="border-gray-300 hover:bg-gray-50 sm:w-auto w-full"
                  >
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
                {resultado && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Resultado</h3>
                      <div className="text-2xl font-bold text-blue-600">
                        {resultado.fuerza.toFixed(2)} {resultado.unidad}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Fórmula aplicada:</h4>
                      <p className="text-lg font-mono text-gray-700 mb-2">{resultado.formula}</p>
                      <p className="text-sm text-gray-600">{resultado.calculo}</p>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Conversiones:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-700">Newton (N):</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.newton.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">kgf:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.kgf.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">lbf:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.lbf.toFixed(2)}</span>
                        </div>
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
