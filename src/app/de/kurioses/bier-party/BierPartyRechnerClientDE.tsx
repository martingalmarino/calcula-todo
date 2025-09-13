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
import { Calculator, Beer, Users, Clock, DollarSign } from 'lucide-react'
import { calcularCervezaFiesta } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsDE } from '@/lib/breadcrumbs-de'

export default function BierPartyRechnerClientDE() {
  const [invitados, setInvitados] = useState<string>('')
  const [nivelConsumo, setNivelConsumo] = useState<string>('')
  const [duracionHoras, setDuracionHoras] = useState<string>('')
  const [precioLitro, setPrecioLitro] = useState<string>('')
  const [resultado, setResultado] = useState<{
    litrosNecesarios: number
    costoTotal: number
    tiempoTerminacion: number
    mensaje: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const invitadosNum = parseFloat(invitados)
    const nivelConsumoNum = parseFloat(nivelConsumo)
    const duracionHorasNum = parseFloat(duracionHoras)
    const precioLitroNum = parseFloat(precioLitro)

    if (isNaN(invitadosNum) || isNaN(nivelConsumoNum) || isNaN(duracionHorasNum) || isNaN(precioLitroNum)) {
      setError('Bitte geben Sie gültige Zahlenwerte für alle Felder ein.')
      return
    }

    if (invitadosNum <= 0 || duracionHorasNum <= 0 || precioLitroNum <= 0) {
      setError('Anzahl der Gäste, Dauer und Preis müssen positiv sein.')
      return
    }

    if (nivelConsumoNum < 1 || nivelConsumoNum > 3) {
      setError('Das Konsumniveau muss zwischen 1 und 3 liegen.')
      return
    }

    if (invitadosNum > 1000) {
      setError('Die Anzahl der Gäste kann nicht größer als 1000 sein.')
      return
    }

    if (duracionHorasNum > 24) {
      setError('Die Dauer kann nicht länger als 24 Stunden sein.')
      return
    }

    try {
      const resultado = calcularCervezaFiesta(invitadosNum, nivelConsumoNum, duracionHorasNum, precioLitroNum)
      setResultado(resultado)
    } catch {
      setError('Fehler beim Berechnen des Bierbedarfs. Überprüfen Sie die eingegebenen Werte.')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setInvitados(values.invitados as string)
    setNivelConsumo(values.nivelConsumo as string)
    setDuracionHoras(values.duracionHoras as string)
    setPrecioLitro(values.precioLitro as string)
    setResultado(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbsDE('/de/kurioses/bier-party')

  const examples = [
    {
      label: '20 Gäste, mäßiger Konsum, 4 Stunden, 2€/Liter',
      values: { invitados: '20', nivelConsumo: '2', duracionHoras: '4', precioLitro: '2' }
    },
    {
      label: '50 Gäste, hoher Konsum, 6 Stunden, 1.5€/Liter',
      values: { invitados: '50', nivelConsumo: '3', duracionHoras: '6', precioLitro: '1.5' }
    },
    {
      label: '10 Gäste, niedriger Konsum, 3 Stunden, 2.5€/Liter',
      values: { invitados: '10', nivelConsumo: '1', duracionHoras: '3', precioLitro: '2.5' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie werden die Konsumniveaus definiert?',
      answer: 'Niedrig (1): 300ml pro Person pro Stunde, Mäßig (2): 500ml pro Person pro Stunde, Hoch (3): 800ml pro Person pro Stunde. Diese Werte basieren auf durchschnittlichen Party-Erfahrungen.'
    },
    {
      question: 'Sollte ich mehr Bier kaufen als berechnet?',
      answer: 'Ja, es ist ratsam, 10-20% mehr zu kaufen als berechnet, um sicherzustellen, dass Sie genug haben. Es ist besser, etwas übrig zu haben als nicht genug.'
    },
    {
      question: 'Was ist, wenn nicht alle Gäste Bier trinken?',
      answer: 'Berücksichtigen Sie, dass etwa 70-80% der Gäste Bier trinken könnten. Passen Sie die Anzahl der Gäste entsprechend an oder reduzieren Sie das Konsumniveau.'
    },
    {
      question: 'Welche anderen Getränke sollte ich berücksichtigen?',
      answer: 'Vergessen Sie nicht Wasser, Softdrinks, Wein und alkoholfreie Alternativen. Eine gute Party hat eine Vielzahl von Getränkeoptionen für alle Gäste.'
    }
  ]

  const getConsumoDescription = (nivel: number) => {
    const descripciones = {
      1: 'Niedrig (300ml/Stunde)',
      2: 'Mäßig (500ml/Stunde)',
      3: 'Hoch (800ml/Stunde)'
    }
    return descripciones[nivel as keyof typeof descripciones] || ''
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Bier-Party-Rechner',
            description: 'Berechnen Sie, wie viel Bier Sie für Ihre Party benötigen',
            url: '/de/kurioses/bier-party/',
            category: 'Kurioses'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsDE items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Bier-Party-Rechner"
            description="Berechnen Sie, wie viel Bier Sie für Ihre Party benötigen. Perfekte Planung für Ihre nächste Feier."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="invitados">Anzahl der Gäste</Label>
                <Input
                  id="invitados"
                  type="number"
                  value={invitados}
                  onChange={(e) => setInvitados(e.target.value)}
                  placeholder="z.B. 20"
                />
              </div>
              
              <div>
                <Label htmlFor="nivelConsumo">Konsumniveau (1-3)</Label>
                <Input
                  id="nivelConsumo"
                  type="number"
                  min="1"
                  max="3"
                  value={nivelConsumo}
                  onChange={(e) => setNivelConsumo(e.target.value)}
                  placeholder="z.B. 2"
                />
                <p className="text-sm text-gray-500 mt-1">
                  1=Niedrig, 2=Mäßig, 3=Hoch
                </p>
              </div>
              
              <div>
                <Label htmlFor="duracionHoras">Dauer der Party (Stunden)</Label>
                <Input
                  id="duracionHoras"
                  type="number"
                  value={duracionHoras}
                  onChange={(e) => setDuracionHoras(e.target.value)}
                  placeholder="z.B. 4"
                />
              </div>
              
              <div>
                <Label htmlFor="precioLitro">Preis pro Liter Bier (€)</Label>
                <Input
                  id="precioLitro"
                  type="number"
                  step="0.01"
                  value={precioLitro}
                  onChange={(e) => setPrecioLitro(e.target.value)}
                  placeholder="z.B. 2.00"
                />
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Bierbedarf berechnen
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-amber-50 border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-700 flex items-center gap-2">
                      <Beer className="h-5 w-5" />
                      Party-Bier-Berechnung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Beer className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Benötigte Liter</span>
                        </div>
                        <p className="text-3xl font-bold text-amber-600">{resultado.litrosNecesarios}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Gesamtkosten</span>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{resultado.costoTotal}€</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border-2 border-amber-200">
                      <div className="text-center">
                        <p className="text-lg text-gray-700 mb-4">{resultado.mensaje}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">Gäste</span>
                            </div>
                            <p className="text-xl font-bold text-gray-800">{invitados}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">Dauer</span>
                            </div>
                            <p className="text-xl font-bold text-gray-800">{duracionHoras}h</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Beer className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">Konsumniveau</span>
                            </div>
                            <p className="text-xl font-bold text-gray-800">{getConsumoDescription(parseFloat(nivelConsumo))}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">🍺 Party-Tipps</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Puffer hinzufügen:</strong> Kaufen Sie 10-20% mehr als berechnet, um sicherzugehen</p>
                        <p>• <strong>Vielseitigkeit:</strong> Bieten Sie verschiedene Biersorten und alkoholfreie Alternativen an</p>
                        <p>• <strong>Kühlung:</strong> Stellen Sie sicher, dass Sie genug Kühlraum für das Bier haben</p>
                        <p>• <strong>Verantwortungsvoller Konsum:</strong> Ermutigen Sie Ihre Gäste, verantwortungsvoll zu trinken</p>
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
