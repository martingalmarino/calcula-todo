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
import { Zap, Clock, MapPin } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface VelocidadResult {
  velocidad: number
  unidad: string
  formula: string
  calculo: string
  equivalencias: {
    ms: number
    kmh: number
    mph: number
  }
}

export function VelocidadClient() {
  const [distancia, setDistancia] = useState('')
  const [unidadDistancia, setUnidadDistancia] = useState('m')
  const [tiempo, setTiempo] = useState('')
  const [unidadTiempo, setUnidadTiempo] = useState('s')
  const [resultado, setResultado] = useState<VelocidadResult | null>(null)
  const [error, setError] = useState('')

  const calcularVelocidad = useCallback(() => {
    setError('')
    setResultado(null)

    if (!distancia || !tiempo) {
      setError('Por favor, ingresa tanto la distancia como el tiempo.')
      return
    }

    const dist = parseFloat(distancia)
    const t = parseFloat(tiempo)

    if (isNaN(dist) || isNaN(t) || dist <= 0 || t <= 0) {
      setError('La distancia y el tiempo deben ser números positivos.')
      return
    }

    // Convertir a unidades base (metros y segundos)
    let distanciaEnMetros = dist
    let tiempoEnSegundos = t

    // Conversión de distancia
    switch (unidadDistancia) {
      case 'km':
        distanciaEnMetros = dist * 1000
        break
      case 'cm':
        distanciaEnMetros = dist / 100
        break
      case 'mm':
        distanciaEnMetros = dist / 1000
        break
    }

    // Conversión de tiempo
    switch (unidadTiempo) {
      case 'min':
        tiempoEnSegundos = t * 60
        break
      case 'h':
        tiempoEnSegundos = t * 3600
        break
      case 'ms':
        tiempoEnSegundos = t / 1000
        break
    }

    // Calcular velocidad en m/s
    const velocidadMs = distanciaEnMetros / tiempoEnSegundos

    // Conversiones a otras unidades
    const velocidadKmh = velocidadMs * 3.6
    const velocidadMph = velocidadMs * 2.237

    const resultado: VelocidadResult = {
      velocidad: velocidadMs,
      unidad: 'm/s',
      formula: 'v = d/t',
      calculo: `${distanciaEnMetros.toFixed(2)} m ÷ ${tiempoEnSegundos.toFixed(2)} s = ${velocidadMs.toFixed(2)} m/s`,
      equivalencias: {
        ms: velocidadMs,
        kmh: velocidadKmh,
        mph: velocidadMph
      }
    }

    setResultado(resultado)
  }, [distancia, unidadDistancia, tiempo, unidadTiempo])

  const resetCalculator = useCallback(() => {
    setDistancia('')
    setUnidadDistancia('m')
    setTiempo('')
    setUnidadTiempo('s')
    setResultado(null)
    setError('')
  }, [])

  const handleExampleClick = useCallback((values: { distancia?: string; unidadDistancia?: string; tiempo?: string; unidadTiempo?: string }) => {
    setDistancia(String(values.distancia || ''))
    setUnidadDistancia(values.unidadDistancia || 'm')
    setTiempo(String(values.tiempo || ''))
    setUnidadTiempo(values.unidadTiempo || 's')
    setError('')
    setResultado(null)
  }, [])

  const examples = [
    {
      title: 'Corredor de 100m',
      description: 'Un atleta corre 100 metros en 10 segundos',
      values: {
        distancia: '100',
        unidadDistancia: 'm',
        tiempo: '10',
        unidadTiempo: 's'
      }
    },
    {
      title: 'Viaje en auto',
      description: 'Un auto recorre 50 km en 30 minutos',
      values: {
        distancia: '50',
        unidadDistancia: 'km',
        tiempo: '30',
        unidadTiempo: 'min'
      }
    }
  ]

  const faqItems = [
    {
      question: "¿Qué es la velocidad promedio?",
      answer: "La velocidad promedio es la distancia total recorrida dividida entre el tiempo total empleado. Se calcula con la fórmula v = d/t."
    },
    {
      question: "¿Cuáles son las unidades de velocidad más comunes?",
      answer: "Las unidades más comunes son: m/s (metros por segundo), km/h (kilómetros por hora) y mph (millas por hora)."
    },
    {
      question: "¿Cómo convierto entre diferentes unidades de velocidad?",
      answer: "Para convertir de m/s a km/h multiplica por 3.6. Para convertir de km/h a m/s divide entre 3.6. Para mph, multiplica m/s por 2.237."
    },
    {
      question: "¿La calculadora considera la dirección del movimiento?",
      answer: "Esta calculadora calcula la velocidad escalar (magnitud). Para velocidad vectorial se necesitaría información sobre la dirección."
    }
  ]

  const breadcrumbs = getBreadcrumbs('/fisica/velocidad')

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Velocidad',
            description: 'Calcula velocidad promedio con distancia y tiempo. Soporta unidades m/s, km/h, m/min. Fórmula v = d/t explicada paso a paso.',
            url: '/fisica/velocidad/',
            category: 'Física'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Velocidad - v = d/t"
            description="Calcula velocidad promedio con distancia y tiempo. Soporta diferentes unidades de medida y muestra conversiones automáticas."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            disclaimer="Esta calculadora calcula velocidad promedio (escalar). Para movimiento con aceleración variable, se necesitarían métodos más avanzados."
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Calculadora de Velocidad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        placeholder="ej: 100"
                        className="flex-1"
                      />
                      <Select value={unidadDistancia} onValueChange={setUnidadDistancia}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm">mm</SelectItem>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="m">m</SelectItem>
                          <SelectItem value="km">km</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline w-4 h-4 mr-1" />
                      Tiempo
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={tiempo}
                        onChange={(e) => setTiempo(e.target.value)}
                        placeholder="ej: 10"
                        className="flex-1"
                      />
                      <Select value={unidadTiempo} onValueChange={setUnidadTiempo}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ms">ms</SelectItem>
                          <SelectItem value="s">s</SelectItem>
                          <SelectItem value="min">min</SelectItem>
                          <SelectItem value="h">h</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={calcularVelocidad} 
                    className="flex-1 text-white" 
                    style={{ backgroundColor: '#0284c7' }} 
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'} 
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Calcular Velocidad
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
                        {resultado.velocidad.toFixed(2)} {resultado.unidad}
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
                          <span className="text-green-700">m/s:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.ms.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">km/h:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.kmh.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">mph:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.mph.toFixed(2)}</span>
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
