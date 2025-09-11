"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Calculator, Dog, Cat, Heart } from 'lucide-react'
import { convertirEdadMascota } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function AlterTiereRechnerClientDE() {
  const [añosHumanos, setAñosHumanos] = useState<string>('')
  const [tipoMascota, setTipoMascota] = useState<'perro' | 'gato'>('perro')
  const [resultado, setResultado] = useState<{
    edadMascota: number
    descripcion: string
    etapa: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const añosNum = parseFloat(añosHumanos)

    if (isNaN(añosNum)) {
      setError('Bitte geben Sie ein gültiges Alter ein.')
      return
    }

    if (añosNum <= 0) {
      setError('Das Alter muss positiv sein.')
      return
    }

    if (añosNum > 30) {
      setError('Das Alter kann nicht größer als 30 Jahre sein.')
      return
    }

    try {
      const resultado = convertirEdadMascota(añosNum, tipoMascota)
      setResultado(resultado)
    } catch {
      setError('Fehler beim Berechnen des Tieralters. Überprüfen Sie die eingegebenen Werte.')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setAñosHumanos(values.añosHumanos as string)
    setTipoMascota(values.tipoMascota as 'perro' | 'gato')
    setResultado(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbs('/de/kurioses/alter-tiere')

  const examples = [
    {
      label: '3 Jahre alter Hund',
      values: { añosHumanos: '3', tipoMascota: 'perro' }
    },
    {
      label: '5 Jahre alte Katze',
      values: { añosHumanos: '5', tipoMascota: 'gato' }
    },
    {
      label: '1 Jahr alter Welpe',
      values: { añosHumanos: '1', tipoMascota: 'perro' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie funktioniert die Umrechnung von Tieralter in Menschenjahre?',
      answer: 'Die Umrechnung basiert auf wissenschaftlichen Formeln, die die unterschiedlichen Entwicklungsraten von Hunden und Katzen berücksichtigen. Hunde altern in den ersten 2 Jahren schneller, dann verlangsamt sich der Prozess.'
    },
    {
      question: 'Warum altern Hunde und Katzen unterschiedlich?',
      answer: 'Hunde und Katzen haben unterschiedliche Lebenserwartungen und Entwicklungsraten. Katzen leben im Allgemeinen länger als Hunde und haben eine andere Altersentwicklung.'
    },
    {
      question: 'Was bedeuten die verschiedenen Lebensphasen?',
      answer: 'Welpe/Kätzchen: 0-15 Jahre, Erwachsener jung: 15-35 Jahre, Erwachsener: 35-60 Jahre, Senior: 60+ Jahre. Diese Phasen helfen bei der Pflege und Ernährung.'
    },
    {
      question: 'Ist diese Berechnung für alle Rassen genau?',
      answer: 'Die Berechnung ist eine allgemeine Schätzung. Große Hunderassen altern oft schneller als kleine Rassen. Für spezifische Rassen können die Werte variieren.'
    }
  ]

  const getEtapaDescription = (etapa: string) => {
    const descripciones = {
      'cachorro': 'Welpe',
      'gatito': 'Kätzchen',
      'adulto joven': 'Erwachsener jung',
      'adulto': 'Erwachsener',
      'senior': 'Senior'
    }
    return descripciones[etapa as keyof typeof descripciones] || etapa
  }

  const getEtapaColor = (etapa: string) => {
    if (etapa === 'cachorro' || etapa === 'gatito') return 'text-blue-600'
    if (etapa === 'adulto joven') return 'text-green-600'
    if (etapa === 'adulto') return 'text-yellow-600'
    return 'text-red-600'
  }

  const getEtapaBgColor = (etapa: string) => {
    if (etapa === 'cachorro' || etapa === 'gatito') return 'bg-blue-50 border-blue-200'
    if (etapa === 'adulto joven') return 'bg-green-50 border-green-200'
    if (etapa === 'adulto') return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Alter-Tiere-Rechner',
            description: 'Konvertieren Sie das Alter Ihrer Haustiere in Menschenjahre',
            url: '/de/kurioses/alter-tiere/',
            category: 'Kurioses'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Alter-Tiere-Rechner"
            description="Konvertieren Sie das Alter Ihrer Haustiere in Menschenjahre. Verstehen Sie das Alter Ihrer Hunde und Katzen besser."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="añosHumanos">Alter in Menschenjahren</Label>
                <Input
                  id="añosHumanos"
                  type="number"
                  value={añosHumanos}
                  onChange={(e) => setAñosHumanos(e.target.value)}
                  placeholder="z.B. 3"
                />
              </div>
              
              <div>
                <Label htmlFor="tipoMascota">Art des Haustiers</Label>
                <Select value={tipoMascota} onValueChange={(value: 'perro' | 'gato') => setTipoMascota(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perro">🐕 Hund</SelectItem>
                    <SelectItem value="gato">🐱 Katze</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Alter berechnen
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className={`mt-4 ${getEtapaBgColor(resultado.etapa)}`}>
                  <CardHeader>
                    <CardTitle className={`${getEtapaColor(resultado.etapa)} flex items-center gap-2`}>
                      {tipoMascota === 'perro' ? <Dog className="h-5 w-5" /> : <Cat className="h-5 w-5" />}
                      Tieralter-Berechnung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className={`text-6xl font-bold ${getEtapaColor(resultado.etapa)} mb-2`}>
                        {resultado.edadMascota}
                      </div>
                      <div className="text-2xl font-semibold text-gray-800 mb-4">
                        {tipoMascota === 'perro' ? 'Hunde' : 'Katzen'}jahre
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                      <div className="text-center">
                        <p className="text-lg text-gray-700 mb-4">{resultado.descripcion}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Heart className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">Menschenalter</span>
                            </div>
                            <p className="text-xl font-bold text-gray-800">{añosHumanos} Jahre</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              {tipoMascota === 'perro' ? <Dog className="h-4 w-4 text-gray-600" /> : <Cat className="h-4 w-4 text-gray-600" />}
                              <span className="text-sm text-gray-600">Lebensphase</span>
                            </div>
                            <p className="text-xl font-bold text-gray-800">{getEtapaDescription(resultado.etapa)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">🐾 Pflegetipps</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        {resultado.etapa === 'cachorro' || resultado.etapa === 'gatito' ? (
                          <>
                            <p>• <strong>Frühe Entwicklung:</strong> Viel Spielzeit und Sozialisation sind wichtig</p>
                            <p>• <strong>Ernährung:</strong> Spezielle Welpen-/Kätzchennahrung für optimales Wachstum</p>
                            <p>• <strong>Training:</strong> Grundlegende Befehle und Stubenreinheit lernen</p>
                          </>
                        ) : resultado.etapa === 'adulto joven' ? (
                          <>
                            <p>• <strong>Energie:</strong> Viel Bewegung und geistige Stimulation</p>
                            <p>• <strong>Gesundheit:</strong> Regelmäßige Tierarztbesuche und Impfungen</p>
                            <p>• <strong>Ernährung:</strong> Ausgewogene Erwachsenennahrung</p>
                          </>
                        ) : resultado.etapa === 'adulto' ? (
                          <>
                            <p>• <strong>Wartung:</strong> Regelmäßige Gesundheitschecks</p>
                            <p>• <strong>Ernährung:</strong> Qualitätsfutter für Erwachsene</p>
                            <p>• <strong>Bewegung:</strong> Moderate, regelmäßige Aktivität</p>
                          </>
                        ) : (
                          <>
                            <p>• <strong>Senior-Pflege:</strong> Spezielle Aufmerksamkeit für Gelenke und Gesundheit</p>
                            <p>• <strong>Ernährung:</strong> Senior-Futter mit leichterer Verdauung</p>
                            <p>• <strong>Komfort:</strong> Weiche Liegeplätze und einfacher Zugang</p>
                          </>
                        )}
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
