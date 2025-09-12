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
import { Activity, Scale, User } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface NEDResult {
  ned: number
  category: string
  description: string
  color: string
  recommendations: string[]
}

export default function NecesidadesEnergeticasClient() {
  const [age, setAge] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [activityLevel, setActivityLevel] = useState<string>('')
  const [result, setResult] = useState<NEDResult | null>(null)
  const [error, setError] = useState<string>('')

  const activityLevels = [
    { value: 'sedentario', label: 'Sedentario (poco o ningún ejercicio)' },
    { value: 'ligero', label: 'Actividad ligera (ejercicio ligero 1-3 días/semana)' },
    { value: 'moderado', label: 'Actividad moderada (ejercicio moderado 3-5 días/semana)' },
    { value: 'intenso', label: 'Actividad intensa (ejercicio intenso 6-7 días/semana)' },
    { value: 'muy-intenso', label: 'Actividad muy intensa (ejercicio muy intenso, trabajo físico)' }
  ]

  const calculateNED = useCallback(() => {
    setError('')
    setResult(null)

    // Validaciones
    if (!age || !gender || !weight || !height || !activityLevel) {
      setError('Por favor, completa todos los campos')
      return
    }

    const ageNum = parseFloat(age)
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)

    if (ageNum < 1 || ageNum > 120) {
      setError('La edad debe estar entre 1 y 120 años')
      return
    }

    if (weightNum < 10 || weightNum > 300) {
      setError('El peso debe estar entre 10 y 300 kg')
      return
    }

    if (heightNum < 50 || heightNum > 250) {
      setError('La altura debe estar entre 50 y 250 cm')
      return
    }

    // Cálculo del NED usando las ecuaciones de la FAO/WHO/UNU
    let ned: number

    if (ageNum >= 18) {
      // Adultos (18+ años)
      if (gender === 'masculino') {
        // Ecuación de Mifflin-St Jeor para hombres
        const bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
        const activityMultipliers = {
          'sedentario': 1.2,
          'ligero': 1.375,
          'moderado': 1.55,
          'intenso': 1.725,
          'muy-intenso': 1.9
        }
        ned = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers]
      } else {
        // Ecuación de Mifflin-St Jeor para mujeres
        const bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
        const activityMultipliers = {
          'sedentario': 1.2,
          'ligero': 1.375,
          'moderado': 1.55,
          'intenso': 1.725,
          'muy-intenso': 1.9
        }
        ned = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers]
      }
    } else {
      // Niños y adolescentes (1-17 años)
      if (gender === 'masculino') {
        if (ageNum >= 1 && ageNum <= 3) {
          ned = 88.5 - (61.9 * ageNum) + (1.0 * weightNum) + (1.0 * heightNum)
        } else if (ageNum >= 4 && ageNum <= 10) {
          ned = 22.7 + (17.5 * weightNum) + (6.0 * heightNum)
        } else if (ageNum >= 11 && ageNum <= 17) {
          ned = 17.5 + (12.2 * weightNum) + (5.0 * heightNum)
        } else {
          ned = 0
        }
      } else {
        if (ageNum >= 1 && ageNum <= 3) {
          ned = 88.5 - (61.9 * ageNum) + (1.0 * weightNum) + (1.0 * heightNum)
        } else if (ageNum >= 4 && ageNum <= 10) {
          ned = 22.5 + (12.2 * weightNum) + (5.0 * heightNum)
        } else if (ageNum >= 11 && ageNum <= 17) {
          ned = 7.4 + (12.2 * weightNum) + (5.0 * heightNum)
        } else {
          ned = 0
        }
      }
    }

    // Clasificación del resultado
    let category: string
    let description: string
    let color: string
    let recommendations: string[]

    if (ned < 1200) {
      category = 'Muy Bajo'
      description = 'Las necesidades energéticas son muy bajas. Consulta con un profesional de la salud.'
      color = 'text-red-600'
      recommendations = [
        'Consulta con un nutricionista o médico',
        'Evalúa tu estado de salud general',
        'Considera aumentar la actividad física gradualmente'
      ]
    } else if (ned < 1500) {
      category = 'Bajo'
      description = 'Necesidades energéticas bajas, típicas de personas sedentarias o con bajo peso.'
      color = 'text-orange-600'
      recommendations = [
        'Considera aumentar la actividad física',
        'Asegúrate de consumir alimentos nutritivos',
        'Mantén un peso saludable'
      ]
    } else if (ned < 2500) {
      category = 'Normal'
      description = 'Necesidades energéticas dentro del rango normal para tu perfil.'
      color = 'text-green-600'
      recommendations = [
        'Mantén una dieta equilibrada',
        'Continúa con tu nivel de actividad actual',
        'Monitorea tu peso regularmente'
      ]
    } else if (ned < 3500) {
      category = 'Alto'
      description = 'Necesidades energéticas altas, típicas de personas muy activas o con alta masa muscular.'
      color = 'text-blue-600'
      recommendations = [
        'Asegúrate de consumir suficientes calorías',
        'Mantén una dieta rica en nutrientes',
        'Considera suplementos si es necesario'
      ]
    } else {
      category = 'Muy Alto'
      description = 'Necesidades energéticas muy altas, típicas de atletas de élite o personas con trabajo muy físico.'
      color = 'text-purple-600'
      recommendations = [
        'Consulta con un nutricionista deportivo',
        'Planifica comidas frecuentes y nutritivas',
        'Considera suplementos deportivos'
      ]
    }

    setResult({
      ned: Math.round(ned),
      category,
      description,
      color,
      recommendations
    })
  }, [age, gender, weight, height, activityLevel])

  const resetCalculator = useCallback(() => {
    setAge('')
    setGender('')
    setWeight('')
    setHeight('')
    setActivityLevel('')
    setResult(null)
    setError('')
  }, [])

  const examples = [
    {
      label: 'Ejemplo: Mujer de 30 años, 65kg, 165cm, actividad moderada',
      values: { 
        age: '30', 
        gender: 'femenino', 
        weight: '65', 
        height: '165', 
        activityLevel: 'moderada' 
      }
    },
    {
      label: 'Ejemplo: Hombre de 25 años, 80kg, 180cm, actividad alta',
      values: { 
        age: '25', 
        gender: 'masculino', 
        weight: '80', 
        height: '180', 
        activityLevel: 'alta' 
      }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué son las Necesidades Energéticas Diarias (NED)?',
      answer: 'Las NED son la cantidad de calorías que tu cuerpo necesita diariamente para mantener sus funciones básicas y tu nivel de actividad física actual.'
    },
    {
      question: '¿Cuál es la diferencia entre TMB y NED?',
      answer: 'La TMB (Tasa Metabólica Basal) son las calorías mínimas para funciones básicas. Las NED incluyen además las calorías para tu actividad física diaria.'
    },
    {
      question: '¿Qué nivel de actividad física debo seleccionar?',
      answer: 'Sedentario: trabajo de oficina, sin ejercicio. Ligera: ejercicio ligero 1-3 días/semana. Moderada: ejercicio moderado 3-5 días/semana. Alta: ejercicio intenso 6-7 días/semana. Muy alta: ejercicio muy intenso, trabajo físico.'
    },
    {
      question: '¿Son precisas estas estimaciones?',
      answer: 'Son estimaciones basadas en ecuaciones científicas estándar. Para casos específicos como embarazo, lactancia o condiciones médicas, consulta con un profesional de la salud.'
    }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setAge(String(values.age || ''))
    setGender(String(values.gender || ''))
    setWeight(String(values.weight || ''))
    setHeight(String(values.height || ''))
    setActivityLevel(String(values.activityLevel || ''))
    setError('')
    setResult(null)
  }

  const breadcrumbs = getBreadcrumbs('/salud/necesidades-energeticas')

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Necesidades Energéticas Diarias (NED)',
            description: 'Calcula tus necesidades energéticas diarias para mantener el equilibrio energético según tu edad, género, peso, altura y nivel de actividad física.',
            url: '/salud/necesidades-energeticas/',
            category: 'Salud'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Necesidades Energéticas Diarias (NED)"
            description="Calcula tus necesidades energéticas diarias para mantener el equilibrio energético según tu edad, género, peso, altura y nivel de actividad física."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            disclaimer="Las necesidades energéticas diarias son estimaciones basadas en ecuaciones estándar. Para casos específicos, embarazo, lactancia o condiciones médicas, consulta con un profesional de la salud."
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Calculadora de NED
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-1" />
              Edad (años)
            </label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Ej: 25"
              min="1"
              max="120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Género
            </label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="femenino">Femenino</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Scale className="inline w-4 h-4 mr-1" />
              Peso (kg)
            </label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ej: 70"
              min="10"
              max="300"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Altura (cm)
            </label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Ej: 175"
              min="50"
              max="250"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Activity className="inline w-4 h-4 mr-1" />
            Nivel de Actividad Física
          </label>
          <Select value={activityLevel} onValueChange={setActivityLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona nivel de actividad" />
            </SelectTrigger>
            <SelectContent>
              {activityLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={calculateNED} className="flex-1 text-white" style={{ backgroundColor: '#0284c7' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}>
            Calcular NED
          </Button>
          <Button onClick={resetCalculator} variant="outline" className="border-gray-300 hover:bg-gray-50 sm:w-auto w-full">
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
        {result && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Necesidades Energéticas Diarias
              </h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {result.ned.toLocaleString()} kcal/día
              </div>
              <div className={`text-lg font-semibold ${result.color}`}>
                {result.category}
              </div>
              <p className="text-gray-600 mt-2">
                {result.description}
              </p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Recomendaciones:</h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Información Importante:</h4>
              <p className="text-blue-800 text-sm">
                Las necesidades energéticas diarias (NED) son estimaciones basadas en ecuaciones estándar. 
                Para casos específicos, embarazo, lactancia o condiciones médicas, consulta con un profesional de la salud.
              </p>
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
