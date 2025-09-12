"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Activity, AlertCircle, Info, Timer, Zap } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface Deporte {
  nombre: string
  met: number
  descripcion: string
}

interface CaloriasResult {
  caloriasQuemadas: number
  deporte: string
  met: number
  peso: number
  tiempo: number
  intensidad: string
  equivalencia: string
}

const deportes: Deporte[] = [
  { nombre: 'Correr (8 km/h)', met: 8.0, descripcion: 'Trote moderado' },
  { nombre: 'Correr (10 km/h)', met: 10.0, descripcion: 'Carrera moderada' },
  { nombre: 'Correr (12 km/h)', met: 12.0, descripcion: 'Carrera intensa' },
  { nombre: 'Nadar (estilo libre)', met: 8.3, descripcion: 'Natación moderada' },
  { nombre: 'Nadar (intenso)', met: 10.0, descripcion: 'Natación vigorosa' },
  { nombre: 'Fútbol', met: 7.0, descripcion: 'Fútbol recreativo' },
  { nombre: 'Fútbol (competitivo)', met: 10.0, descripcion: 'Fútbol competitivo' },
  { nombre: 'Ciclismo (15 km/h)', met: 6.0, descripcion: 'Ciclismo moderado' },
  { nombre: 'Ciclismo (20 km/h)', met: 8.0, descripcion: 'Ciclismo intenso' },
  { nombre: 'Ciclismo (25 km/h)', met: 10.0, descripcion: 'Ciclismo muy intenso' },
  { nombre: 'Caminar (5 km/h)', met: 3.5, descripcion: 'Caminata moderada' },
  { nombre: 'Caminar (6 km/h)', met: 4.5, descripcion: 'Caminata rápida' },
  { nombre: 'Baloncesto', met: 6.5, descripcion: 'Baloncesto recreativo' },
  { nombre: 'Tenis', met: 7.3, descripcion: 'Tenis individual' },
  { nombre: 'Voleibol', met: 3.0, descripcion: 'Voleibol recreativo' }
]

export default function CaloriasDeporteClient() {
  const [peso, setPeso] = useState('')
  const [tiempo, setTiempo] = useState('')
  const [deporteSeleccionado, setDeporteSeleccionado] = useState('')
  const [results, setResults] = useState<CaloriasResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const breadcrumbs = getBreadcrumbs('/salud/calorias-deporte/')

  const handleCalculate = () => {
    setError(null)
    setResults(null)

    try {
      const pesoNum = parseFloat(peso)
      const tiempoNum = parseFloat(tiempo)

      if (!pesoNum || pesoNum <= 0) {
        setError('Por favor ingresa un peso válido')
        return
      }

      if (!tiempoNum || tiempoNum <= 0) {
        setError('Por favor ingresa un tiempo válido')
        return
      }

      if (!deporteSeleccionado) {
        setError('Por favor selecciona un deporte')
        return
      }

      const deporte = deportes.find(d => d.nombre === deporteSeleccionado)
      if (!deporte) {
        setError('Deporte no encontrado')
        return
      }

      // Fórmula: Calorías = MET × Peso(kg) × Tiempo(horas)
      const caloriasQuemadas = deporte.met * pesoNum * (tiempoNum / 60)

      // Determinar intensidad
      let intensidad = ''
      if (deporte.met < 4) intensidad = 'Baja'
      else if (deporte.met < 7) intensidad = 'Moderada'
      else if (deporte.met < 10) intensidad = 'Alta'
      else intensidad = 'Muy Alta'

      // Equivalencia en alimentos
      let equivalencia = ''
      if (caloriasQuemadas < 100) equivalencia = '1 manzana pequeña'
      else if (caloriasQuemadas < 200) equivalencia = '1 plátano mediano'
      else if (caloriasQuemadas < 300) equivalencia = '1 rebanada de pizza'
      else if (caloriasQuemadas < 400) equivalencia = '1 hamburguesa pequeña'
      else equivalencia = '1 porción de pasta'

      setResults({
        caloriasQuemadas: Math.round(caloriasQuemadas),
        deporte: deporte.nombre,
        met: deporte.met,
        peso: pesoNum,
        tiempo: tiempoNum,
        intensidad,
        equivalencia
      })
    } catch (err) {
      setError('Error en el cálculo. Verifica los datos ingresados.')
    }
  }

  const examples = [
    {
      label: 'Corredor de 70kg - 30 minutos',
      title: 'Corredor de 70kg - 30 minutos',
      description: 'Corriendo a 10 km/h durante 30 minutos',
      values: {
        peso: '70',
        tiempo: '30',
        deporteSeleccionado: 'Correr (10 km/h)'
      }
    },
    {
      label: 'Nadador de 65kg - 45 minutos',
      title: 'Nadador de 65kg - 45 minutos',
      description: 'Nadando estilo libre durante 45 minutos',
      values: {
        peso: '65',
        tiempo: '45',
        deporteSeleccionado: 'Nadar (estilo libre)'
      }
    },
    {
      label: 'Ciclista de 80kg - 60 minutos',
      title: 'Ciclista de 80kg - 60 minutos',
      description: 'Ciclismo a 20 km/h durante 1 hora',
      values: {
        peso: '80',
        tiempo: '60',
        deporteSeleccionado: 'Ciclismo (20 km/h)'
      }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es el valor MET?',
      answer: 'MET (Metabolic Equivalent of Task) es una unidad que expresa el costo energético de una actividad física. 1 MET equivale al consumo de oxígeno en reposo (3.5 ml/kg/min).'
    },
    {
      question: '¿Cómo se calculan las calorías quemadas?',
      answer: 'Se usa la fórmula: Calorías = MET × Peso(kg) × Tiempo(horas). Los valores MET varían según la intensidad del ejercicio.'
    },
    {
      question: '¿Son precisos estos cálculos?',
      answer: 'Son estimaciones basadas en valores promedio. La quema real de calorías puede variar según edad, sexo, condición física y otros factores individuales.'
    },
    {
      question: '¿Qué factores afectan la quema de calorías?',
      answer: 'El peso corporal, la intensidad del ejercicio, la duración, la edad, el sexo, la condición física y la temperatura ambiente influyen en la quema de calorías.'
    },
    {
      question: '¿Cómo puedo aumentar la quema de calorías?',
      answer: 'Aumenta la intensidad del ejercicio, prolonga la duración, combina diferentes actividades y mantén un peso corporal saludable.'
    }
  ]

  return (
    <Container>
      <Breadcrumbs items={breadcrumbs} />
      
      <CalculatorLayout
        title="Calculadora de Calorías Quemadas en el Deporte"
        description="Calcula las calorías quemadas en diferentes deportes usando valores MET según tu peso y tiempo de actividad"
        examples={examples}
        faqItems={faqItems}
        onExampleClick={(values: Record<string, unknown>) => {
          setPeso((values.peso as string) || '')
          setTiempo((values.tiempo as string) || '')
          setDeporteSeleccionado((values.deporteSeleccionado as string) || '')
          setResults(null)
          setError(null)
        }}
      >
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Calorías Quemadas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso corporal (kg)
              </label>
              <Input
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Ej: 70"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiempo de actividad (minutos)
              </label>
              <Input
                type="number"
                value={tiempo}
                onChange={(e) => setTiempo(e.target.value)}
                placeholder="Ej: 30"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deporte/Actividad
              </label>
              <select
                value={deporteSeleccionado}
                onChange={(e) => setDeporteSeleccionado(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                aria-label="Seleccionar deporte"
              >
                <option value="">Selecciona un deporte</option>
                {deportes.map((deporte) => (
                  <option key={deporte.nombre} value={deporte.nombre}>
                    {deporte.nombre} (MET: {deporte.met})
                  </option>
                ))}
              </select>
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
              Calcular Calorías
            </Button>

            {results && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {results.caloriasQuemadas} calorías
                  </div>
                  <div className="text-sm text-gray-600">
                    quemadas en {results.tiempo} minutos
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">Deporte</div>
                    <div className="text-gray-600">{results.deporte}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">Valor MET</div>
                    <div className="text-gray-600">{results.met}</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">Peso</div>
                    <div className="text-gray-600">{results.peso} kg</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="font-medium text-gray-900">Intensidad</div>
                    <div className="text-gray-600">{results.intensidad}</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Equivalencia</span>
                  </div>
                  <div className="text-sm text-blue-800">
                    Equivale aproximadamente a: <strong>{results.equivalencia}</strong>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Timer className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-900">Información adicional</span>
                  </div>
                  <div className="text-sm text-green-800">
                    • Calorías por minuto: {Math.round(results.caloriasQuemadas / results.tiempo)} cal/min<br/>
                    • Calorías por hora: {Math.round(results.caloriasQuemadas * (60 / results.tiempo))} cal/h
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
            name: 'Calculadora de Calorías Quemadas en el Deporte',
            description: 'Calcula las calorías quemadas en diferentes deportes usando valores MET',
            url: 'https://calculatodo.online/salud/calorias-deporte/',
            category: 'Salud'
          })
        }}
      />
    </Container>
  )
}
