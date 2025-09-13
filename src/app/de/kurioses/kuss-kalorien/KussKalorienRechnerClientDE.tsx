"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Calculator, Heart, Zap } from 'lucide-react'
import { calcularCaloriasAfectivas } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function KussKalorienRechnerClientDE() {
  const [actividad, setActividad] = useState<string>('')
  const [minutos, setMinutos] = useState<string>('')
  const [intensidad, setIntensidad] = useState<string>('')
  const [resultado, setResultado] = useState<{
    actividad: string
    minutos: number
    intensidad: number
    caloriasQuemadas: number
    equivalencias: {
      chocolate: number
      manzana: number
      minutosCaminando: number
    }
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const minutosNum = parseFloat(minutos)
    const intensidadNum = parseFloat(intensidad)

    if (isNaN(minutosNum) || isNaN(intensidadNum)) {
      setError('Bitte geben Sie gültige Zahlenwerte für Minuten und Intensität ein.')
      return
    }

    if (minutosNum <= 0 || minutosNum > 1440) {
      setError('Die Minuten müssen zwischen 1 und 1440 (24 Stunden) liegen.')
      return
    }

    if (intensidadNum < 1 || intensidadNum > 5) {
      setError('Die Intensität muss zwischen 1 und 5 liegen.')
      return
    }

    if (!actividad) {
      setError('Bitte wählen Sie eine Aktivität aus.')
      return
    }

    try {
      const resultado = calcularCaloriasAfectivas(actividad, minutosNum, intensidadNum)
      setResultado(resultado)
    } catch {
      setError('Fehler beim Berechnen der Kalorien. Überprüfen Sie die eingegebenen Werte.')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setActividad(values.actividad as string)
    setMinutos(values.minutos as string)
    setIntensidad(values.intensidad as string)
    setResultado(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/kurioses/kuss-kalorien')

  const examples = [
    {
      label: '10 Minuten intensive Küsse (Stufe 4)',
      values: { actividad: 'besos', minutos: '10', intensidad: '4' }
    },
    {
      label: '15 Minuten mäßiges Lachen (Stufe 3)',
      values: { actividad: 'risas', minutos: '15', intensidad: '3' }
    },
    {
      label: '20 Minuten sanfte Umarmungen (Stufe 2)',
      values: { actividad: 'abrazos', minutos: '20', intensidad: '2' }
    }
  ]

  const faqItems = [
    {
      question: 'Verbrennt man wirklich Kalorien durch Küsse und Umarmungen?',
      answer: 'Ja, wenn auch nur eine kleine Menge. Intensive Küsse können 2-3 Kalorien pro Minute verbrennen, Umarmungen 1-2 Kalorien pro Minute und Lachen 1-2 Kalorien pro Minute. Es ist leichte Bewegung, aber real.'
    },
    {
      question: 'Welche Faktoren beeinflussen die verbrannten Kalorien?',
      answer: 'Intensität, Dauer, Körpergewicht und allgemeines Aktivitätsniveau. Menschen mit mehr Muskelmasse neigen dazu, mehr Kalorien im Ruhezustand zu verbrennen.'
    },
    {
      question: 'Sind diese Aktivitäten gutes Training?',
      answer: 'Sie sind ergänzende Aktivitäten, die emotionale und soziale Vorteile bieten, zusätzlich zum Verbrennen einiger Kalorien. Sie ersetzen nicht regelmäßiges Herz-Kreislauf-Training.'
    },
    {
      question: 'Welche anderen Vorteile haben diese Aktivitäten?',
      answer: 'Sie reduzieren Stress, setzen Endorphine frei, verbessern die Stimmung, stärken Beziehungen und können bei Blutdruck und Immunsystem helfen.'
    }
  ]

  const getActividadDescription = (actividad: string) => {
    const descripciones = {
      'besos': 'Küsse',
      'abrazos': 'Umarmungen',
      'risas': 'Lachen'
    }
    return descripciones[actividad as keyof typeof descripciones] || actividad
  }

  const getIntensidadDescription = (nivel: number) => {
    const descripciones = {
      1: 'Sehr sanft',
      2: 'Sanft',
      3: 'Mäßig',
      4: 'Intensiv',
      5: 'Sehr intensiv'
    }
    return descripciones[nivel as keyof typeof descripciones] || ''
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Kuss-Kalorien-Rechner',
            description: 'Berechnen Sie Kalorien, die durch Küsse, Umarmungen und Lachen verbrannt werden',
            url: '/de/kurioses/kuss-kalorien/',
            category: 'Kurioses'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Kuss-Kalorien-Rechner"
            description="Berechnen Sie Kalorien, die durch Küsse, Umarmungen und Lachen verbrannt werden. Entdecken Sie lustige Äquivalenzen und lassen Sie sich von den Ergebnissen überraschen."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="actividad">Art der Aktivität</Label>
                <Select value={actividad} onValueChange={setActividad}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie eine Aktivität" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="besos">💋 Küsse</SelectItem>
                    <SelectItem value="abrazos">🤗 Umarmungen</SelectItem>
                    <SelectItem value="risas">😂 Lachen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="minutos">Dauer in Minuten</Label>
                <Input
                  id="minutos"
                  type="number"
                  value={minutos}
                  onChange={(e) => setMinutos(e.target.value)}
                  placeholder="z.B. 10"
                />
              </div>
              
              <div>
                <Label htmlFor="intensidad">Intensität (1-5)</Label>
                <Input
                  id="intensidad"
                  type="number"
                  min="1"
                  max="5"
                  value={intensidad}
                  onChange={(e) => setIntensidad(e.target.value)}
                  placeholder="z.B. 3"
                />
                <p className="text-sm text-gray-500 mt-1">
                  1=Sehr sanft, 2=Sanft, 3=Mäßig, 4=Intensiv, 5=Sehr intensiv
                </p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Kalorien berechnen
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-pink-50 border-pink-200">
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Ergebnisse der verbrannten Kalorien
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Aktivität</span>
                        </div>
                        <p className="text-2xl font-bold text-pink-600">{getActividadDescription(resultado.actividad)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Dauer</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.minutos} min</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Intensität</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.intensidad}</p>
                        <p className="text-xs text-gray-500">{getIntensidadDescription(resultado.intensidad)}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="bg-white p-6 rounded-lg border-2 border-pink-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Verbrannte Kalorien</p>
                          <p className="text-4xl font-bold text-pink-600">{resultado.caloriasQuemadas.toFixed(1)}</p>
                          <p className="text-sm text-gray-500 mt-2">Kalorien</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Entspricht</p>
                          <p className="text-2xl font-bold text-yellow-600">{resultado.equivalencias.chocolate}</p>
                          <p className="text-sm text-gray-500">kleine{resultado.equivalencias.chocolate !== 1 ? 'n' : ''} Schokolade{resultado.equivalencias.chocolate !== 1 ? 'n' : ''}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Oder</p>
                          <p className="text-2xl font-bold text-green-600">{resultado.equivalencias.manzana}</p>
                          <p className="text-sm text-gray-500">Apfel{resultado.equivalencias.manzana !== 1 ? '' : ''}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Oder</p>
                          <p className="text-2xl font-bold text-blue-600">{resultado.equivalencias.minutosCaminando}</p>
                          <p className="text-sm text-gray-500">min Gehen</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">💕 Interessante Fakten</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• <strong>Zusätzliche Vorteile:</strong> Neben dem Verbrennen von Kalorien setzen diese Aktivitäten Endorphine frei und reduzieren Stress</p>
                        <p>• <strong>Emotionales Training:</strong> Intensive Küsse können die Herzfrequenz wie leichtes Training erhöhen</p>
                        <p>• <strong>Gesundes Lachen:</strong> 10 Minuten Lachen können bis zu 20 Kalorien verbrennen und das Immunsystem stärken</p>
                        <p>• <strong>Therapeutische Umarmungen:</strong> Umarmungen setzen Oxytocin frei, das &quot;Liebeshormon&quot;</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
