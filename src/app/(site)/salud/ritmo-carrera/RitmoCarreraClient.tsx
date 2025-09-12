"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Timer, AlertCircle, Info, Clock, Zap } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface RitmoResult {
  ritmoPorKm: string
  velocidadMedia: number
  distancia: number
  tiempo: number
  tiempoEnMinutos: number
  categoria: string
  nivel: string
  estimaciones: {
    '5K': string
    '10K': string
    '21K': string
    '42K': string
  }
}

export default function RitmoCarreraClient() {
  const [distancia, setDistancia] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [results, setResults] = useState<RitmoResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const breadcrumbs = getBreadcrumbs('/salud/ritmo-carrera/')

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

      // Calcular ritmo por kilómetro
      const ritmoPorKmMinutos = tiempoEnMinutos / distanciaNum
      const minutosEnteros = Math.floor(ritmoPorKmMinutos)
      const segundosRestantes = Math.round((ritmoPorKmMinutos - minutosEnteros) * 60)
      const ritmoPorKm = `${minutosEnteros}:${segundosRestantes.toString().padStart(2, '0')}`

      // Calcular velocidad media (km/h)
      const velocidadMedia = (distanciaNum * 60) / tiempoEnMinutos

      // Determinar categoría y nivel
      let categoria = ''
      let nivel = ''
      
      if (velocidadMedia >= 15) {
        categoria = 'Élite'
        nivel = 'Nivel profesional'
      } else if (velocidadMedia >= 12) {
        categoria = 'Avanzado'
        nivel = 'Muy buen nivel'
      } else if (velocidadMedia >= 9) {
        categoria = 'Intermedio'
        nivel = 'Nivel intermedio'
      } else if (velocidadMedia >= 6) {
        categoria = 'Principiante'
        nivel = 'Nivel principiante'
      } else {
        categoria = 'Caminata'
        nivel = 'Ritmo de caminata'
      }

      // Calcular estimaciones para otras distancias
      const estimaciones = {
        '5K': formatTime(ritmoPorKmMinutos * 5),
        '10K': formatTime(ritmoPorKmMinutos * 10),
        '21K': formatTime(ritmoPorKmMinutos * 21.0975),
        '42K': formatTime(ritmoPorKmMinutos * 42.195)
      }

      setResults({
        ritmoPorKm,
        velocidadMedia: Math.round(velocidadMedia * 10) / 10,
        distancia: distanciaNum,
        tiempo: tiempoEnMinutos,
        tiempoEnMinutos,
        categoria,
        nivel,
        estimaciones
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
      label: '5K en 25 minutos',
      title: '5K en 25 minutos',
      description: 'Carrera de 5 kilómetros en 25 minutos',
      values: {
        distancia: '5',
        tiempo: '25:00'
      }
    },
    {
      label: '10K en 45 minutos',
      title: '10K en 45 minutos',
      description: 'Carrera de 10 kilómetros en 45 minutos',
      values: {
        distancia: '10',
        tiempo: '45:00'
      }
    },
    {
      label: 'Media maratón en 1:45',
      title: 'Media maratón en 1:45',
      description: 'Media maratón (21K) en 1 hora y 45 minutos',
      values: {
        distancia: '21.0975',
        tiempo: '1:45:00'
      }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es el ritmo de carrera?',
      answer: 'El ritmo de carrera es el tiempo promedio que tardas en completar un kilómetro. Se expresa en minutos:segundos por kilómetro (min/km).'
    },
    {
      question: '¿Cómo se calcula el ritmo?',
      answer: 'Se divide el tiempo total entre la distancia recorrida. Por ejemplo, si corres 5K en 25 minutos, tu ritmo es 5:00 min/km.'
    },
    {
      question: '¿Qué es una buena velocidad media?',
      answer: 'Depende del nivel y distancia. Para principiantes: 6-9 km/h, intermedios: 9-12 km/h, avanzados: 12-15 km/h, élite: 15+ km/h.'
    },
    {
      question: '¿Cómo puedo mejorar mi ritmo?',
      answer: 'Incluye entrenamientos de velocidad, intervalos, carreras largas y trabajo de fuerza. La consistencia y progresión gradual son clave.'
    },
    {
      question: '¿Son precisas las estimaciones para otras distancias?',
      answer: 'Son estimaciones basadas en mantener el mismo ritmo. En distancias más largas, el ritmo suele ser más lento debido a la fatiga.'
    }
  ]

  return (
    <div>
      <Container>
      <Breadcrumbs items={breadcrumbs} />
      
      <CalculatorLayout
        title="Calculadora de Ritmo de Carrera"
        description="Calcula tu ritmo por kilómetro y velocidad media en carreras y maratones"
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
              <Timer className="w-5 h-5 text-blue-600" />
              Ritmo de Carrera
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
                placeholder="Ej: 5, 10, 21.0975"
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
                placeholder="Ej: 25:00 o 1:45:00"
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
              Calcular Ritmo
            </Button>

            {results && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {results.ritmoPorKm} min/km
                  </div>
                  <div className="text-sm text-gray-600">
                    Velocidad media: {results.velocidadMedia} km/h
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
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Estimaciones para otras distancias</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                    <div>5K: {results.estimaciones['5K']}</div>
                    <div>10K: {results.estimaciones['10K']}</div>
                    <div>21K: {results.estimaciones['21K']}</div>
                    <div>42K: {results.estimaciones['42K']}</div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-900">Consejos de entrenamiento</span>
                  </div>
                  <div className="text-sm text-green-800">
                    {results.categoria === 'Élite' && '¡Excelente nivel! Mantén la consistencia y trabaja en la resistencia.'}
                    {results.categoria === 'Avanzado' && 'Muy buen nivel. Incluye entrenamientos de velocidad para mejorar.'}
                    {results.categoria === 'Intermedio' && 'Buen nivel. Aumenta gradualmente la distancia y velocidad.'}
                    {results.categoria === 'Principiante' && 'Buen comienzo. Enfócate en la consistencia y aumenta gradualmente.'}
                    {results.categoria === 'Caminata' && 'Perfecto para empezar. Considera alternar caminata y trote suave.'}
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
            name: 'Calculadora de Ritmo de Carrera',
            description: 'Calcula tu ritmo por kilómetro y velocidad media en carreras',
            url: 'https://calculatodo.online/salud/ritmo-carrera/',
            category: 'Salud'
          })
        }}
      />
    </Container>
    </div>
  )
}
