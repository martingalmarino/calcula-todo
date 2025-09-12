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
import { Calendar, Clock, Baby } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface ConceptionResult {
  conceptionDate: Date
  dueDate: Date
  weeksPregnant: number
  daysPregnant: number
  trimester: number
  method: string
}

export default function FechaConcepcionClient() {
  const [method, setMethod] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [lastPeriod, setLastPeriod] = useState<string>('')
  const [result, setResult] = useState<ConceptionResult | null>(null)
  const [error, setError] = useState<string>('')

  const calculateConception = useCallback(() => {
    setError('')
    setResult(null)

    if (!method) {
      setError('Por favor, selecciona un método de cálculo')
      return
    }

    try {
      let conceptionDate: Date
      let calculatedDueDate: Date
      let methodDescription: string

      if (method === 'due-date') {
        if (!dueDate) {
          setError('Por favor, ingresa la fecha probable de parto')
          return
        }

        const due = new Date(dueDate)
        if (isNaN(due.getTime())) {
          setError('Por favor, ingresa una fecha válida')
          return
        }

        // La concepción ocurre aproximadamente 266 días (38 semanas) antes del parto
        conceptionDate = new Date(due)
        conceptionDate.setDate(conceptionDate.getDate() - 266)
        calculatedDueDate = due
        methodDescription = 'Basado en fecha probable de parto'
      } else {
        if (!lastPeriod) {
          setError('Por favor, ingresa la fecha de tu última menstruación')
          return
        }

        const period = new Date(lastPeriod)
        if (isNaN(period.getTime())) {
          setError('Por favor, ingresa una fecha válida')
          return
        }

        // La concepción ocurre aproximadamente 14 días después del primer día de la última menstruación
        conceptionDate = new Date(period)
        conceptionDate.setDate(conceptionDate.getDate() + 14)
        
        // La fecha probable de parto es 280 días (40 semanas) después del primer día de la última menstruación
        calculatedDueDate = new Date(period)
        calculatedDueDate.setDate(calculatedDueDate.getDate() + 280)
        methodDescription = 'Basado en fecha de última menstruación'
      }

      // Calcular semanas y días de embarazo
      const today = new Date()
      const daysDiff = Math.floor((today.getTime() - conceptionDate.getTime()) / (1000 * 60 * 60 * 24))
      const weeksPregnant = Math.floor(daysDiff / 7)
      const daysPregnant = daysDiff % 7

      // Determinar trimestre
      let trimester: number
      if (weeksPregnant < 13) {
        trimester = 1
      } else if (weeksPregnant < 27) {
        trimester = 2
      } else {
        trimester = 3
      }

      setResult({
        conceptionDate,
        dueDate: calculatedDueDate,
        weeksPregnant,
        daysPregnant,
        trimester,
        method: methodDescription
      })
    } catch {
      setError('Error al calcular la fecha de concepción')
    }
  }, [method, dueDate, lastPeriod])

  const resetCalculator = useCallback(() => {
    setMethod('')
    setDueDate('')
    setLastPeriod('')
    setResult(null)
    setError('')
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTrimesterInfo = (trimester: number) => {
    switch (trimester) {
      case 1:
        return {
          name: 'Primer Trimestre',
          description: 'Desarrollo de órganos principales',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        }
      case 2:
        return {
          name: 'Segundo Trimestre',
          description: 'Crecimiento y desarrollo fetal',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        }
      case 3:
        return {
          name: 'Tercer Trimestre',
          description: 'Preparación para el nacimiento',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        }
      default:
        return {
          name: 'Embarazo',
          description: 'Período de gestación',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        }
    }
  }

  const examples = [
    {
      label: 'Ejemplo: Última menstruación el 1 de enero de 2024',
      values: { 
        method: 'last-period', 
        lastPeriodDate: '2024-01-01' 
      }
    },
    {
      label: 'Ejemplo: Fecha probable de parto el 15 de octubre de 2024',
      values: { 
        method: 'due-date', 
        dueDate: '2024-10-15' 
      }
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo se calcula la fecha de concepción?',
      answer: 'La concepción generalmente ocurre entre 11-21 días después del primer día de tu último período menstrual, siendo el día 14 el más común en ciclos de 28 días.'
    },
    {
      question: '¿Qué método es más preciso?',
      answer: 'El método basado en la última menstruación es más común, pero si conoces tu fecha probable de parto (por ecografía), ese método puede ser más preciso.'
    },
    {
      question: '¿Por qué hay un rango de fechas de concepción?',
      answer: 'La concepción puede ocurrir en diferentes momentos del ciclo menstrual, por eso se muestra un rango de fechas más probable.'
    },
    {
      question: '¿Qué es la edad gestacional?',
      answer: 'Es el tiempo transcurrido desde el primer día de tu último período menstrual hasta la fecha actual, expresado en semanas y días.'
    }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setMethod(String(values.method || ''))
    if (values.method === 'last-period') {
      setLastPeriod(String(values.lastPeriodDate || ''))
    } else if (values.method === 'due-date') {
      setDueDate(String(values.dueDate || ''))
    }
    setError('')
    setResult(null)
  }

  const breadcrumbs = getBreadcrumbs('/salud/fecha-concepcion')

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Fecha de Concepción de Embarazo',
            description: 'Calcula la fecha probable de concepción basándose en la fecha de parto o en la fecha de tu última menstruación.',
            url: '/salud/fecha-concepcion/',
            category: 'Salud'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Fecha de Concepción de Embarazo"
            description="Calcula la fecha probable de concepción basándose en la fecha de parto o en la fecha de tu última menstruación."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            disclaimer="Esta calculadora proporciona estimaciones basadas en promedios. La fecha exacta de concepción puede variar. Consulta con tu médico para información más precisa sobre tu embarazo."
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Baby className="h-5 w-5" />
                  Calculadora de Concepción
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
        {/* Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Método de Cálculo
          </label>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un método" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="due-date">Basado en fecha probable de parto</SelectItem>
              <SelectItem value="last-period">Basado en fecha de última menstruación</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Conditional Inputs */}
        {method === 'due-date' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Fecha Probable de Parto
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              La fecha que te proporcionó tu médico o ecografía
            </p>
          </div>
        )}

        {method === 'last-period' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Fecha de Última Menstruación
            </label>
            <Input
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              El primer día de tu último período menstrual
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <Button onClick={calculateConception} className="flex-1 text-white" style={{ backgroundColor: '#0284c7' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369a1'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284c7'}>
            Calcular Fecha de Concepción
          </Button>
          <Button onClick={resetCalculator} variant="outline" className="border-gray-300 hover:bg-gray-50">
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
          <div className="space-y-4">
            {/* Main Result */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Fecha de Concepción
                </h3>
                <div className="text-3xl font-bold text-pink-600 mb-2">
                  {formatDate(result.conceptionDate)}
                </div>
                <p className="text-gray-600">
                  {result.method}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Baby className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-900">Fecha Probable de Parto</h4>
                  </div>
                  <p className="text-blue-800 font-medium">
                    {formatDate(result.dueDate)}
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-900">Semanas de Embarazo</h4>
                  </div>
                  <p className="text-green-800 font-medium">
                    {result.weeksPregnant} semanas y {result.daysPregnant} días
                  </p>
                </div>
              </div>
            </div>

            {/* Trimester Info */}
            <div className={`${getTrimesterInfo(result.trimester).bgColor} border ${getTrimesterInfo(result.trimester).borderColor} rounded-lg p-4`}>
              <h4 className={`font-semibold ${getTrimesterInfo(result.trimester).color} mb-2`}>
                {getTrimesterInfo(result.trimester).name}
              </h4>
              <p className={`${getTrimesterInfo(result.trimester).color.replace('text-', 'text-').replace('-600', '-700')}`}>
                {getTrimesterInfo(result.trimester).description}
              </p>
            </div>

            {/* Important Information */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Información Importante:</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Las fechas son estimaciones basadas en cálculos estándar</li>
                <li>• La concepción real puede variar ±2 días</li>
                <li>• Consulta siempre con tu médico para confirmar fechas</li>
                <li>• Las ecografías son más precisas para determinar la edad gestacional</li>
              </ul>
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
