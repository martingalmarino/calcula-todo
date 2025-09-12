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
import { Globe, Scale, MapPin } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface GravedadResult {
  fuerza: number
  unidad: string
  formula: string
  calculo: string
  constanteG: number
  equivalencias: {
    newton: number
    kgf: number
    lbf: number
  }
}

export function GravedadClient() {
  const [masa1, setMasa1] = useState('')
  const [unidadMasa1, setUnidadMasa1] = useState('kg')
  const [masa2, setMasa2] = useState('')
  const [unidadMasa2, setUnidadMasa2] = useState('kg')
  const [distancia, setDistancia] = useState('')
  const [unidadDistancia, setUnidadDistancia] = useState('m')
  const [resultado, setResultado] = useState<GravedadResult | null>(null)
  const [error, setError] = useState('')

  const calcularGravedad = useCallback(() => {
    setError('')
    setResultado(null)

    if (!masa1 || !masa2 || !distancia) {
      setError('Por favor, ingresa ambas masas y la distancia.')
      return
    }

    const m1 = parseFloat(masa1)
    const m2 = parseFloat(masa2)
    const r = parseFloat(distancia)

    if (isNaN(m1) || isNaN(m2) || isNaN(r) || m1 <= 0 || m2 <= 0 || r <= 0) {
      setError('Las masas y la distancia deben ser números positivos.')
      return
    }

    // Convertir a unidades base (kg y metros)
    let masa1EnKg = m1
    let masa2EnKg = m2
    let distanciaEnMetros = r

    // Conversión de masa 1
    switch (unidadMasa1) {
      case 'g':
        masa1EnKg = m1 / 1000
        break
      case 'lb':
        masa1EnKg = m1 * 0.453592
        break
    }

    // Conversión de masa 2
    switch (unidadMasa2) {
      case 'g':
        masa2EnKg = m2 / 1000
        break
      case 'lb':
        masa2EnKg = m2 * 0.453592
        break
    }

    // Conversión de distancia
    switch (unidadDistancia) {
      case 'cm':
        distanciaEnMetros = r / 100
        break
      case 'km':
        distanciaEnMetros = r * 1000
        break
      case 'ft':
        distanciaEnMetros = r * 0.3048
        break
    }

    // Constante gravitacional universal
    const G = 6.67430e-11 // m³/(kg·s²)

    // Calcular fuerza gravitatoria en Newtons
    const fuerzaNewton = (G * masa1EnKg * masa2EnKg) / Math.pow(distanciaEnMetros, 2)

    // Conversiones a otras unidades
    const fuerzaKgf = fuerzaNewton / 9.80665
    const fuerzaLbf = fuerzaNewton * 0.224809

    const resultado: GravedadResult = {
      fuerza: fuerzaNewton,
      unidad: 'N',
      formula: 'F = G·m₁·m₂ / r²',
      calculo: `(6.67430×10⁻¹¹ × ${masa1EnKg.toFixed(2)} × ${masa2EnKg.toFixed(2)}) / (${distanciaEnMetros.toFixed(2)})² = ${fuerzaNewton.toExponential(3)} N`,
      constanteG: G,
      equivalencias: {
        newton: fuerzaNewton,
        kgf: fuerzaKgf,
        lbf: fuerzaLbf
      }
    }

    setResultado(resultado)
  }, [masa1, unidadMasa1, masa2, unidadMasa2, distancia, unidadDistancia])

  const resetCalculator = useCallback(() => {
    setMasa1('')
    setUnidadMasa1('kg')
    setMasa2('')
    setUnidadMasa2('kg')
    setDistancia('')
    setUnidadDistancia('m')
    setResultado(null)
    setError('')
  }, [])

  const handleExampleClick = useCallback((values: { masa1?: string; unidadMasa1?: string; masa2?: string; unidadMasa2?: string; distancia?: string; unidadDistancia?: string }) => {
    setMasa1(String(values.masa1 || ''))
    setUnidadMasa1(values.unidadMasa1 || 'kg')
    setMasa2(String(values.masa2 || ''))
    setUnidadMasa2(values.unidadMasa2 || 'kg')
    setDistancia(String(values.distancia || ''))
    setUnidadDistancia(values.unidadDistancia || 'm')
    setError('')
    setResultado(null)
  }, [])

  const examples = [
    {
      title: 'Tierra y Luna',
      description: 'Fuerza gravitatoria entre la Tierra (5.97×10²⁴ kg) y la Luna (7.34×10²² kg) a 384,400 km',
      values: {
        masa1: '5.97e24',
        unidadMasa1: 'kg',
        masa2: '7.34e22',
        unidadMasa2: 'kg',
        distancia: '384400',
        unidadDistancia: 'km'
      }
    },
    {
      title: 'Dos personas',
      description: 'Fuerza gravitatoria entre dos personas de 70 kg a 1 metro de distancia',
      values: {
        masa1: '70',
        unidadMasa1: 'kg',
        masa2: '70',
        unidadMasa2: 'kg',
        distancia: '1',
        unidadDistancia: 'm'
      }
    }
  ]

  const faqItems = [
    {
      question: "¿Qué es la ley de gravitación universal?",
      answer: "La ley de gravitación universal establece que dos cuerpos se atraen con una fuerza proporcional al producto de sus masas e inversamente proporcional al cuadrado de la distancia entre ellos: F = G·m₁·m₂ / r²."
    },
    {
      question: "¿Cuál es el valor de la constante gravitacional?",
      answer: "La constante gravitacional universal (G) es 6.67430 × 10⁻¹¹ m³/(kg·s²). Es una de las constantes fundamentales de la física."
    },
    {
      question: "¿Por qué la fuerza gravitatoria es tan débil?",
      answer: "La fuerza gravitatoria es muy débil debido al pequeño valor de la constante G. Solo se nota con masas muy grandes como planetas y estrellas."
    },
    {
      question: "¿La fuerza gravitatoria puede ser negativa?",
      answer: "No, la fuerza gravitatoria siempre es positiva (atractiva). El signo negativo en algunas formulaciones indica solo la dirección hacia el centro de masa."
    }
  ]

  const breadcrumbs = getBreadcrumbs('/fisica/gravedad')

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Gravedad',
            description: 'Calcula fuerza gravitatoria entre dos masas usando la ley de gravitación universal. Ingresa masas y distancia para obtener fuerza en Newtons.',
            url: '/fisica/gravedad/',
            category: 'Física'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Gravedad - F = G·m₁·m₂ / r²"
            description="Calcula fuerza gravitatoria entre dos masas usando la ley de gravitación universal. Ingresa masas y distancia para obtener fuerza en Newtons."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            disclaimer="Esta calculadora asume masas puntuales y no considera efectos relativistas. Para objetos muy masivos o velocidades cercanas a la luz se necesitarían correcciones."
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Calculadora de Gravedad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Scale className="inline w-4 h-4 mr-1" />
                      Masa 1
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={masa1}
                        onChange={(e) => setMasa1(e.target.value)}
                        placeholder="ej: 5.97e24"
                        className="flex-1"
                      />
                      <Select value={unidadMasa1} onValueChange={setUnidadMasa1}>
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
                      <Scale className="inline w-4 h-4 mr-1" />
                      Masa 2
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={masa2}
                        onChange={(e) => setMasa2(e.target.value)}
                        placeholder="ej: 7.34e22"
                        className="flex-1"
                      />
                      <Select value={unidadMasa2} onValueChange={setUnidadMasa2}>
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
                      <MapPin className="inline w-4 h-4 mr-1" />
                      Distancia
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={distancia}
                        onChange={(e) => setDistancia(e.target.value)}
                        placeholder="ej: 384400"
                        className="flex-1"
                      />
                      <Select value={unidadDistancia} onValueChange={setUnidadDistancia}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="m">m</SelectItem>
                          <SelectItem value="km">km</SelectItem>
                          <SelectItem value="ft">ft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={calcularGravedad} 
                    className="flex-1 text-white" 
                    style={{ backgroundColor: '#0284c7' }} 
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'} 
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Calcular Fuerza Gravitatoria
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
                        {resultado.fuerza.toExponential(3)} {resultado.unidad}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Fórmula aplicada:</h4>
                      <p className="text-lg font-mono text-gray-700 mb-2">{resultado.formula}</p>
                      <p className="text-sm text-gray-600">{resultado.calculo}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        G = {resultado.constanteG.toExponential(3)} m³/(kg·s²)
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-2">Conversiones:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-green-700">Newton (N):</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.newton.toExponential(3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">kgf:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.kgf.toExponential(3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">lbf:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.lbf.toExponential(3)}</span>
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
