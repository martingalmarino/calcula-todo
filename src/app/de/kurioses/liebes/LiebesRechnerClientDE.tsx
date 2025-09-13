"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsDE } from '@/components/BreadcrumbsDE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Calculator, Heart, Users } from 'lucide-react'
import { calcularCompatibilidadAmor } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function LiebesRechnerClientDE() {
  const [nombre1, setNombre1] = useState<string>('')
  const [nombre2, setNombre2] = useState<string>('')
  const [resultado, setResultado] = useState<{
    porcentaje: number
    mensaje: string
    nivel: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    if (!nombre1.trim() || !nombre2.trim()) {
      setError('Bitte geben Sie beide Namen ein.')
      return
    }

    if (nombre1.trim().length < 2 || nombre2.trim().length < 2) {
      setError('Jeder Name muss mindestens 2 Zeichen lang sein.')
      return
    }

    try {
      const resultado = calcularCompatibilidadAmor(nombre1.trim(), nombre2.trim())
      setResultado(resultado)
    } catch {
      setError('Fehler beim Berechnen der Kompatibilität. Überprüfen Sie die eingegebenen Namen.')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setNombre1(values.nombre1 as string)
    setNombre2(values.nombre2 as string)
    setResultado(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/kurioses/liebes')

  const examples = [
    {
      label: 'Anna und Max',
      values: { nombre1: 'Anna', nombre2: 'Max' }
    },
    {
      label: 'Maria und Peter',
      values: { nombre1: 'Maria', nombre2: 'Peter' }
    },
    {
      label: 'Lisa und Tom',
      values: { nombre1: 'Lisa', nombre2: 'Tom' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie funktioniert der Liebeskompatibilitäts-Algorithmus?',
      answer: 'Der Algorithmus basiert auf einem "wissenschaftlichen" Ansatz, der die ASCII-Codes der Buchstaben, die Länge der Namen und mathematische Berechnungen verwendet, um einen Kompatibilitätsprozentsatz zu generieren.'
    },
    {
      question: 'Ist diese Berechnung wissenschaftlich fundiert?',
      answer: 'Nein, dies ist ein unterhaltsamer Algorithmus für Spaß und Unterhaltung. Echte Beziehungskompatibilität hängt von vielen komplexen Faktoren ab, die nicht durch Namen berechnet werden können.'
    },
    {
      question: 'Was bedeuten die verschiedenen Kompatibilitätsstufen?',
      answer: 'Soulmates (90%+), Sehr Kompatibel (80-89%), Kompatibel (70-79%), Mäßig Kompatibel (60-69%), Neutral (50-59%), Wenig Kompatibel (40-49%), Inkompatibel (<40%).'
    },
    {
      question: 'Kann ich diesen Rechner für ernsthafte Beziehungsentscheidungen verwenden?',
      answer: 'Nein, dieser Rechner ist nur für Unterhaltung gedacht. Echte Beziehungen basieren auf Kommunikation, gegenseitigem Respekt, gemeinsamen Werten und emotionaler Verbindung, nicht auf Namen.'
    }
  ]

  const getCompatibilityColor = (porcentaje: number) => {
    if (porcentaje >= 90) return 'text-red-600'
    if (porcentaje >= 80) return 'text-pink-600'
    if (porcentaje >= 70) return 'text-purple-600'
    if (porcentaje >= 60) return 'text-blue-600'
    if (porcentaje >= 50) return 'text-green-600'
    if (porcentaje >= 40) return 'text-yellow-600'
    return 'text-gray-600'
  }

  const getCompatibilityBgColor = (porcentaje: number) => {
    if (porcentaje >= 90) return 'bg-red-50 border-red-200'
    if (porcentaje >= 80) return 'bg-pink-50 border-pink-200'
    if (porcentaje >= 70) return 'bg-purple-50 border-purple-200'
    if (porcentaje >= 60) return 'bg-blue-50 border-blue-200'
    if (porcentaje >= 50) return 'bg-green-50 border-green-200'
    if (porcentaje >= 40) return 'bg-yellow-50 border-yellow-200'
    return 'bg-gray-50 border-gray-200'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Liebes-Rechner',
            description: 'Berechnen Sie die Liebeskompatibilität zwischen zwei Namen',
            url: '/de/kurioses/liebes/',
            category: 'Kurioses'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Liebes-Rechner"
            description="Berechnen Sie die Liebeskompatibilität zwischen zwei Namen. Entdecken Sie Ihr Liebespotenzial mit diesem unterhaltsamen Algorithmus."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="nombre1">Erster Name</Label>
                <Input
                  id="nombre1"
                  type="text"
                  value={nombre1}
                  onChange={(e) => setNombre1(e.target.value)}
                  placeholder="z.B. Anna"
                />
              </div>
              
              <div>
                <Label htmlFor="nombre2">Zweiter Name</Label>
                <Input
                  id="nombre2"
                  type="text"
                  value={nombre2}
                  onChange={(e) => setNombre2(e.target.value)}
                  placeholder="z.B. Max"
                />
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Kompatibilität berechnen
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className={`mt-4 ${getCompatibilityBgColor(resultado.porcentaje)}`}>
                  <CardHeader>
                    <CardTitle className={`${getCompatibilityColor(resultado.porcentaje)} flex items-center gap-2`}>
                      <Heart className="h-5 w-5" />
                      Liebeskompatibilität
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getCompatibilityColor(resultado.porcentaje)} mb-2`}>
                        {resultado.porcentaje}%
                      </div>
                      <div className="text-2xl font-semibold text-gray-800 mb-4">
                        {resultado.nivel}
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                      <div className="text-center">
                        <p className="text-lg text-gray-700 mb-4">{resultado.mensaje}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">Name 1</span>
                            </div>
                            <p className="text-xl font-bold text-gray-800">{nombre1}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">Name 2</span>
                            </div>
                            <p className="text-xl font-bold text-gray-800">{nombre2}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                      <h4 className="font-semibold text-pink-800 mb-2">💕 Liebes-Tipps</h4>
                      <div className="text-sm text-pink-700 space-y-1">
                        <p>• <strong>Kommunikation:</strong> Echte Kompatibilität entsteht durch offene und ehrliche Kommunikation</p>
                        <p>• <strong>Gemeinsame Werte:</strong> Geteilte Werte und Ziele sind wichtiger als Namen</p>
                        <p>• <strong>Gegenseitiger Respekt:</strong> Respekt und Verständnis sind die Grundlage jeder guten Beziehung</p>
                        <p>• <strong>Zeit investieren:</strong> Beziehungen erfordern Zeit, Geduld und Engagement von beiden Seiten</p>
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
