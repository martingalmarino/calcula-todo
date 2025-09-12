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
import { Lightbulb, Battery, Clock } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface PotenciaResult {
  potencia: number
  unidad: string
  formula: string
  calculo: string
  equivalencias: {
    watts: number
    hp: number
    kw: number
  }
}

export function PotenciaClient() {
  const [trabajo, setTrabajo] = useState('')
  const [unidadTrabajo, setUnidadTrabajo] = useState('J')
  const [tiempo, setTiempo] = useState('')
  const [unidadTiempo, setUnidadTiempo] = useState('s')
  const [resultado, setResultado] = useState<PotenciaResult | null>(null)
  const [error, setError] = useState('')

  const calcularPotencia = useCallback(() => {
    setError('')
    setResultado(null)

    if (!trabajo || !tiempo) {
      setError('Por favor, ingresa tanto el trabajo como el tiempo.')
      return
    }

    const w = parseFloat(trabajo)
    const t = parseFloat(tiempo)

    if (isNaN(w) || isNaN(t) || w <= 0 || t <= 0) {
      setError('El trabajo y el tiempo deben ser números positivos.')
      return
    }

    // Convertir a unidades base (Joules y segundos)
    let trabajoEnJoules = w
    let tiempoEnSegundos = t

    // Conversión de trabajo
    switch (unidadTrabajo) {
      case 'kJ':
        trabajoEnJoules = w * 1000
        break
      case 'kcal':
        trabajoEnJoules = w * 4184
        break
      case 'Wh':
        trabajoEnJoules = w * 3600
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

    // Calcular potencia en Watts
    const potenciaWatts = trabajoEnJoules / tiempoEnSegundos

    // Conversiones a otras unidades
    const potenciaHp = potenciaWatts / 745.7
    const potenciaKw = potenciaWatts / 1000

    const resultado: PotenciaResult = {
      potencia: potenciaWatts,
      unidad: 'W',
      formula: 'P = W/t',
      calculo: `${trabajoEnJoules.toFixed(2)} J ÷ ${tiempoEnSegundos.toFixed(2)} s = ${potenciaWatts.toFixed(2)} W`,
      equivalencias: {
        watts: potenciaWatts,
        hp: potenciaHp,
        kw: potenciaKw
      }
    }

    setResultado(resultado)
  }, [trabajo, unidadTrabajo, tiempo, unidadTiempo])

  const resetCalculator = useCallback(() => {
    setTrabajo('')
    setUnidadTrabajo('J')
    setTiempo('')
    setUnidadTiempo('s')
    setResultado(null)
    setError('')
  }, [])

  const handleExampleClick = useCallback((values: { trabajo?: string; unidadTrabajo?: string; tiempo?: string; unidadTiempo?: string }) => {
    setTrabajo(String(values.trabajo || ''))
    setUnidadTrabajo(values.unidadTrabajo || 'J')
    setTiempo(String(values.tiempo || ''))
    setUnidadTiempo(values.unidadTiempo || 's')
    setError('')
    setResultado(null)
  }, [])

  const examples = [
    {
      label: 'Motor eléctrico - Un motor realiza 1000 J de trabajo en 5 segundos',
      values: {
        trabajo: '1000',
        unidadTrabajo: 'J',
        tiempo: '5',
        unidadTiempo: 's'
      }
    },
    {
      label: 'Bombilla LED - Una bombilla consume 3600 J en 1 hora',
      values: {
        trabajo: '3600',
        unidadTrabajo: 'J',
        tiempo: '1',
        unidadTiempo: 'h'
      }
    }
  ]

  const faqItems = [
    {
      question: "¿Qué es la potencia?",
      answer: "La potencia es la rapidez con que se realiza trabajo o se transfiere energía. Se calcula dividiendo el trabajo realizado entre el tiempo empleado: P = W/t."
    },
    {
      question: "¿Cuáles son las unidades de potencia?",
      answer: "La unidad fundamental de potencia en el SI es el Watt (W). También se usan caballos de fuerza (hp) y kilovatios (kW) para diferentes aplicaciones."
    },
    {
      question: "¿Cómo se relaciona la potencia con la energía?",
      answer: "La potencia es la tasa de transferencia de energía. Si conoces la potencia y el tiempo, puedes calcular la energía: E = P × t."
    },
    {
      question: "¿Qué significa una potencia alta?",
      answer: "Una potencia alta significa que se realiza trabajo o se transfiere energía muy rápidamente. Por ejemplo, un motor potente puede acelerar un vehículo más rápido."
    }
  ]

  const breadcrumbs = getBreadcrumbs('/fisica/potencia')

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Potencia',
            description: 'Calcula potencia dividiendo trabajo entre tiempo. Ingresa trabajo y tiempo para obtener potencia en Watts.',
            url: '/fisica/potencia/',
            category: 'Física'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Potencia - P = W/t"
            description="Calcula potencia dividiendo trabajo entre tiempo. Ingresa trabajo y tiempo para obtener potencia en Watts con conversiones automáticas."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            disclaimer="Esta calculadora asume potencia constante. Para potencia variable se necesitarían métodos de cálculo integral."
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Calculadora de Potencia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Battery className="inline w-4 h-4 mr-1" />
                      Trabajo
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={trabajo}
                        onChange={(e) => setTrabajo(e.target.value)}
                        placeholder="ej: 1000"
                        className="flex-1"
                      />
                      <Select value={unidadTrabajo} onValueChange={setUnidadTrabajo}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="J">J</SelectItem>
                          <SelectItem value="kJ">kJ</SelectItem>
                          <SelectItem value="kcal">kcal</SelectItem>
                          <SelectItem value="Wh">Wh</SelectItem>
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
                        placeholder="ej: 5"
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
                    onClick={calcularPotencia} 
                    className="flex-1 text-white" 
                    style={{ backgroundColor: '#0284c7' }} 
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'} 
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Calcular Potencia
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
                        {resultado.potencia.toFixed(2)} {resultado.unidad}
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
                          <span className="text-green-700">Watts (W):</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.watts.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">HP:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.hp.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">kW:</span>
                          <span className="font-mono font-semibold">{resultado.equivalencias.kw.toFixed(4)}</span>
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
