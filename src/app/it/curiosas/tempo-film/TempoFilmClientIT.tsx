"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Film, AlertCircle } from 'lucide-react'
import { calcularTiempoPeliculas } from '@/lib/math/curiosas'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function TempoFilmClientIT() {
  const [edad, setEdad] = useState('')
  const [horasPorSemana, setHorasPorSemana] = useState('')
  const [resultado, setResultado] = useState<{
    horasSemanales: number
    edadActual: number
    expectativaVida: number
    horasAnuales: number
    añosRestantes: number
    horasTotalesVida: number
    añosDedicados: number
    peliculasCompletas: number
    seriesCompletas: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const age = parseInt(edad)
    const horas = parseFloat(horasPorSemana)

    if (!edad || !horasPorSemana) {
      setError('Inserisci tutti i valori richiesti')
      return
    }

    if (isNaN(age) || isNaN(horas)) {
      setError('Inserisci valori numerici validi')
      return
    }

    if (age < 0 || age > 120 || horas < 0 || horas > 168) {
      setError('L\'età deve essere tra 0 e 120 anni e le ore per settimana tra 0 e 168')
      return
    }

    try {
      const result = calcularTiempoPeliculas(horas, age)
      setResultado(result)
    } catch {
      setError('Errore nel calcolo del tempo nei film')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.edad) setEdad(example.edad as string)
    if (example.horasPorSemana) setHorasPorSemana(example.horasPorSemana as string)
  }

  const breadcrumbs = getBreadcrumbs('/it/curiosas/tempo-film')

  const examples = [
    { label: 'Cinefilo Moderato', values: { edad: '30', horasPorSemana: '5' } },
    { label: 'Appassionato di Serie', values: { edad: '25', horasPorSemana: '10' } },
    { label: 'Binge Watcher', values: { edad: '35', horasPorSemana: '20' } },
    { label: 'Spettatore Occasionale', values: { edad: '40', horasPorSemana: '2' } }
  ]

  const faqItems = [
    {
      question: 'Come viene calcolato il tempo nei film?',
      answer: 'Il calcolo moltiplica le ore settimanali per 52 settimane all\'anno e per gli anni di vita, considerando anche il tempo che potresti dedicare in futuro.'
    },
    {
      question: 'Il calcolo include solo film o anche serie TV?',
      answer: 'Il calcolo include tutto il tempo dedicato all\'intrattenimento video: film, serie TV, documentari, video online, ecc.'
    },
    {
      question: 'Quanto tempo è normale dedicare ai film?',
      answer: 'La media mondiale è di circa 3-5 ore settimanali. Più di 10 ore settimanali potrebbe essere considerato eccessivo.'
    },
    {
      question: 'Posso ridurre il tempo dedicato ai film?',
      answer: 'Sì! Considera di limitare il tempo davanti agli schermi e bilanciare con altre attività come lettura, esercizio fisico o hobby creativi.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Tempo nei Film',
            description: 'Scopri quanto tempo della tua vita hai passato guardando film',
            url: '/it/curiosas/tempo-film/',
            category: 'Curiose'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Tempo nei Film"
            description="Scopri quanto tempo della tua vita hai passato guardando film. Calcola le ore dedicate al cinema e alle serie TV"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  Calcolatrice Tempo nei Film
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Età Attuale
                      </label>
                      <Input
                        type="number"
                        placeholder="Es: 30"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Ore per Settimana
                      </label>
                      <Input
                        type="number"
                        step="0.5"
                        placeholder="Es: 5"
                        value={horasPorSemana}
                        onChange={(e) => setHorasPorSemana(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
                    Calcola Tempo nei Film
                  </Button>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  {resultado && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Risultato Tempo nei Film</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {resultado.añosDedicados.toFixed(1)} anni
                          </div>
                          <div className="text-lg font-semibold text-gray-800 mb-2">
                            Anni Dedicati ai Film
                          </div>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-2">Dettagli del Calcolo:</h4>
                          <p className="text-blue-800 text-sm">
                            {resultado.horasSemanales} ore/settimana × 52 settimane = {resultado.horasAnuales.toFixed(0)} ore/anno
                          </p>
                          <p className="text-blue-800 text-sm">
                            {resultado.horasAnuales.toFixed(0)} ore/anno × {resultado.añosRestantes} anni = {resultado.horasTotalesVida.toFixed(0)} ore totali
                          </p>
                          <p className="text-blue-800 text-sm">
                            {resultado.horasTotalesVida.toFixed(0)} ore = {resultado.añosDedicados.toFixed(1)} anni di vita
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span>Età Attuale:</span>
                            <span className="font-medium">{resultado.edadActual} anni</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ore per Settimana:</span>
                            <span className="font-medium">{resultado.horasSemanales}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ore per Anno:</span>
                            <span className="font-medium">{resultado.horasAnuales.toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Anni Restanti:</span>
                            <span className="font-medium">{resultado.añosRestantes}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ore Totali:</span>
                            <span className="font-medium">{resultado.horasTotalesVida.toFixed(0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Anni Dedicati:</span>
                            <span className="font-medium">{resultado.añosDedicados.toFixed(1)}</span>
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-900 mb-2">Equivalenze:</h4>
                          <ul className="text-green-800 text-sm space-y-1">
                            <li>• {resultado.peliculasCompletas} film completi (2 ore ciascuno)</li>
                            <li>• {resultado.seriesCompletas} stagioni di serie (8 ore ciascuna)</li>
                            <li>• {Math.round(resultado.horasTotalesVida / 24)} giorni consecutivi</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
