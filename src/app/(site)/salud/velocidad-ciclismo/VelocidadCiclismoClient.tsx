"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Bike, AlertCircle, Info, Clock, Zap, MapPin } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface VelocidadResult {
  velocidadMedia: number
  distancia: number
  tiempo: number
  tiempoEnMinutos: number
  categoria: string
  nivel: string
  estimaciones: {
    '10K': string
    '25K': string
    '50K': string
    '100K': string
  }
  consejos: string[]
}

export default function VelocidadCiclismoClient() {
  const [distancia, setDistancia] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [results, setResults] = useState<VelocidadResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const breadcrumbs = getBreadcrumbs('/salud/velocidad-ciclismo/')

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      const distanciaNum = parseFloat(distancia)
      const tiempoStr = tiempo.trim()

      if (!distanciaNum || distanciaNum <= 0) {
        setError('Por favor ingresa una distancia válida')
        return
      }

      if (!tiempoStr) {
        setError('Por favor ingresa un tiempo válido')
        return
      }

      // Parsear tiempo en formato HH:MM:SS o MM:SS
      let tiempoEnMinutos = 0
      const tiempoParts = tiempoStr.split(':')
      
      if (tiempoParts.length === 2) {
        // Formato MM:SS
        const minutos = parseInt(tiempoParts[0])
        const segundos = parseInt(tiempoParts[1])
        tiempoEnMinutos = minutos + (segundos / 60)
      } else if (tiempoParts.length === 3) {
        // Formato HH:MM:SS
        const horas = parseInt(tiempoParts[0])
        const minutos = parseInt(tiempoParts[1])
        const segundos = parseInt(tiempoParts[2])
        tiempoEnMinutos = (horas * 60) + minutos + (segundos / 60)
      } else {
        setError('Formato de tiempo inválido. Usa MM:SS o HH:MM:SS')
        return
      }

      if (tiempoEnMinutos <= 0) {
        setError('El tiempo debe ser mayor a 0')
        return
      }

      // Calcular velocidad media (km/h)
      const velocidadMedia = (distanciaNum * 60) / tiempoEnMinutos

      // Determinar categoría y nivel
      let categoria = ''
      let nivel = ''
      let consejos: string[] = []
      
      if (velocidadMedia >= 35) {
        categoria = 'Élite'
        nivel = 'Nivel profesional'
        consejos = [
          'Mantén la consistencia en el entrenamiento',
          'Trabaja en la resistencia aeróbica',
          'Incluye entrenamientos de alta intensidad'
        ]
      } else if (velocidadMedia >= 28) {
        categoria = 'Avanzado'
        nivel = 'Muy buen nivel'
        consejos = [
          'Incluye entrenamientos de intervalos',
          'Trabaja en la técnica de pedaleo',
          'Mejora la posición aerodinámica'
        ]
      } else if (velocidadMedia >= 22) {
        categoria = 'Intermedio'
        nivel = 'Nivel intermedio'
        consejos = [
          'Aumenta gradualmente la distancia',
          'Incluye entrenamientos de fuerza',
          'Mejora la cadencia de pedaleo'
        ]
      } else if (velocidadMedia >= 15) {
        categoria = 'Principiante'
        nivel = 'Nivel principiante'
        consejos = [
          'Enfócate en la consistencia',
          'Aumenta gradualmente la intensidad',
          'Trabaja en la resistencia básica'
        ]
      } else {
        categoria = 'Recreativo'
        nivel = 'Nivel recreativo'
        consejos = [
          'Disfruta del paseo',
          'Aumenta gradualmente la distancia',
          'Mantén un ritmo cómodo'
        ]
      }

      // Calcular estimaciones para otras distancias
      const estimaciones = {
        '10K': formatTime((10 * 60) / velocidadMedia),
        '25K': formatTime((25 * 60) / velocidadMedia),
        '50K': formatTime((50 * 60) / velocidadMedia),
        '100K': formatTime((100 * 60) / velocidadMedia)
      }

      setResults({
        velocidadMedia: Math.round(velocidadMedia * 10) / 10,
        distancia: distanciaNum,
        tiempo: tiempoEnMinutos,
        tiempoEnMinutos,
        categoria,
        nivel,
        estimaciones,
        consejos
      })
    } catch (err) {
      setError('Error en el cálculo. Verifica los datos ingresados.')
    }
  }

  const formatTime = (minutes: number): string => {
    const horas = Math.floor(minutes / 60)
    const minutos = Math.floor(minutes % 60)
    const segundos = Math.round((minutes % 1) * 60)
    
    if (horas > 0) {
      return `${horas}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
    } else {
      return `${minutos}:${segundos.toString().padStart(2, '0')}`
    }
  }

  const examples = [
    {
      label: '20K en 45 minutos',
      title: '20K en 45 minutos',
      description: 'Recorrido de 20 kilómetros en 45 minutos',
      values: {
        distancia: '20',
        tiempo: '45:00'
      }
    },
    {
      label: '50K en 2 horas',
      title: '50K en 2 horas',
      description: 'Recorrido de 50 kilómetros en 2 horas',
      values: {
        distancia: '50',
        tiempo: '2:00:00'
      }
    },
    {
      label: '100K en 4:30',
      title: '100K en 4:30',
      description: 'Recorrido de 100 kilómetros en 4 horas y 30 minutos',
      values: {
        distancia: '100',
        tiempo: '4:30:00'
      }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la velocidad media en ciclismo?',
      answer: 'La velocidad media es la distancia total recorrida dividida entre el tiempo total empleado, expresada en kilómetros por hora (km/h).'
    },
    {
      question: '¿Cómo se calcula la velocidad media?',
      answer: 'Se usa la fórmula: Velocidad = Distancia ÷ Tiempo. Por ejemplo, si recorres 30 km en 1 hora, tu velocidad media es 30 km/h.'
    },
    {
      question: '¿Qué factores afectan la velocidad en ciclismo?',
      answer: 'El terreno, el viento, la condición física, el tipo de bicicleta, la posición aerodinámica y la experiencia del ciclista influyen en la velocidad.'
    },
    {
      question: '¿Cuál es una buena velocidad media para principiantes?',
      answer: 'Para principiantes, una velocidad media de 15-20 km/h es buena. Los ciclistas intermedios suelen mantener 20-25 km/h, y los avanzados 25-30+ km/h.'
    },
    {
      question: '¿Cómo puedo mejorar mi velocidad en bicicleta?',
      answer: 'Incluye entrenamientos de intervalos, mejora tu técnica de pedaleo, trabaja en la fuerza, optimiza tu posición aerodinámica y mantén la consistencia.'
    }
  ]

  return (
    <Container>
      <Breadcrumbs items={breadcrumbs} />
      
      <CalculatorLayout
        title="Calculadora de Velocidad Media en Ciclismo"
        description="Calcula la velocidad media en bicicleta y estima tiempos en distintas distancias"
        examples={examples}
        faqItems={faqItems}
        onExampleClick={(values: Record<string, unknown>) => {
          setDistancia((values.distancia as string) || '')
          setTiempo((values.tiempo as string) || '')
          setResults(null)
          setError(null)
        }}
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bike className="w-5 h-5 text-blue-600" />
              Velocidad en Ciclismo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distancia (km)
              </label>
              <Input
                type="number"
                step="0.1"
                value={distancia}
                onChange={(e) => setDistancia(e.target.value)}
                placeholder="Ej: 20, 50, 100"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiempo (MM:SS o HH:MM:SS)
              </label>
              <Input
                type="text"
                value={tiempo}
                onChange={(e) => setTiempo(e.target.value)}
                placeholder="Ej: 45:00 o 2:30:00"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Usa formato MM:SS para menos de 1 hora, HH:MM:SS para más de 1 hora
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
              <Zap className="h-4 w-4 mr-2" />
              Calcular Velocidad
            </Button>

            {results && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {results.velocidadMedia} km/h
                  </div>
                  <div className="text-sm text-gray-600">
                    Velocidad media promedio
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">Distancia</div>
                    <div className="text-gray-600">{results.distancia} km</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">Tiempo Total</div>
                    <div className="text-gray-600">{formatTime(results.tiempoEnMinutos)}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">Categoría</div>
                    <div className="text-gray-600">{results.categoria}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">Nivel</div>
                    <div className="text-gray-600">{results.nivel}</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Estimaciones para otras distancias</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                    <div>10K: {results.estimaciones['10K']}</div>
                    <div>25K: {results.estimaciones['25K']}</div>
                    <div>50K: {results.estimaciones['50K']}</div>
                    <div>100K: {results.estimaciones['100K']}</div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-900">Consejos de mejora</span>
                  </div>
                  <div className="text-sm text-green-800">
                    <ul className="list-disc list-inside space-y-1">
                      {results.consejos.map((consejo, index) => (
                        <li key={index}>{consejo}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-900">Información adicional</span>
                  </div>
                  <div className="text-sm text-yellow-800">
                    • Tiempo por kilómetro: {Math.round((results.tiempoEnMinutos / results.distancia) * 60)} segundos/km<br/>
                    • Distancia por hora: {Math.round(results.velocidadMedia)} km/h
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </CalculatorLayout>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdCalculator({
            name: 'Calculadora de Velocidad Media en Ciclismo',
            description: 'Calcula la velocidad media en bicicleta y estima tiempos en distintas distancias',
            url: 'https://calculatodo.online/salud/velocidad-ciclismo/',
            category: 'Salud'
          })
        }}
      />
    </Container>
  )
}
