"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Zap, AlertCircle, Clock, Globe, Activity, Info } from 'lucide-react'
import { analyzeLatency, type LatencyResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function AnalisiLatenzaClientIT() {
  const [ping, setPing] = useState('')
  const [distance, setDistance] = useState('')
  const [result, setResult] = useState<LatencyResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (!ping) {
      setError('Inserisci il valore di ping')
      return
    }

    try {
      const pingNum = parseFloat(ping)
      const distanceNum = distance ? parseFloat(distance) : undefined
      
      if (isNaN(pingNum) || pingNum < 0) {
        setError('Inserisci un valore di ping valido e positivo')
        return
      }

      if (distance && (isNaN(distanceNum!) || distanceNum! <= 0)) {
        setError('Inserisci una distanza valida e positiva')
        return
      }

      const latencyResult = analyzeLatency(pingNum, distanceNum)
      setResult(latencyResult)
    } catch {
      setError('Errore nel calcolo della latenza. Verifica i valori inseriti.')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Tecnologia', href: '/it/tecnologia' },
    { label: 'Analisi della Latenza', href: '/it/tecnologia/analisi-latenza' }
  ]

  const examples = [
    {
      label: 'Ping 20ms per distanza 1000km',
      values: { ping: '20', distance: '1000' }
    },
    {
      label: 'Ping 50ms per distanza 5000km',
      values: { ping: '50', distance: '5000' }
    },
    {
      label: 'Solo ping 15ms',
      values: { ping: '15', distance: '' }
    }
  ]

  const faqItems = [
    {
      question: 'Cos\'è la latenza di rete?',
      answer: 'La latenza è il tempo che impiega un pacchetto di dati per viaggiare dalla sorgente alla destinazione e ritorno. È misurata in millisecondi (ms).'
    },
    {
      question: 'Qual è un buon valore di ping?',
      answer: 'Un ping sotto 20ms è eccellente, 20-50ms è buono, 50-100ms è accettabile, mentre sopra 100ms può causare problemi in applicazioni real-time.'
    },
    {
      question: 'Come posso ridurre la latenza?',
      answer: 'Usa una connessione cablata invece del WiFi, scegli server più vicini, chiudi applicazioni che usano banda, e considera l\'uso di CDN.'
    },
    {
      question: 'Perché la distanza influisce sulla latenza?',
      answer: 'I segnali elettromagnetici viaggiano alla velocità della luce, ma la distanza fisica e il numero di hop di rete aumentano il tempo di propagazione.'
    }
  ]

  const relatedLinks = [
    { label: 'Velocità di Download', href: '/it/tecnologia/velocita-download', description: 'Calcola il tempo di download' },
    { label: 'Uptime/Downtime', href: '/it/tecnologia/uptime-downtime', description: 'Calcola uptime e downtime' },
    { label: 'Conversione di Archiviazione', href: '/it/tecnologia/conversione-archiviazione', description: 'Converte unità di archiviazione' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setPing(values.ping as string)
    setDistance(values.distance as string)
    setResult(null)
    setError(null)
  }

  const getLatencyLevel = (category: string) => {
    switch (category) {
      case 'excelente': return { level: 'Eccellente', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' }
      case 'bueno': return { level: 'Buono', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' }
      case 'aceptable': return { level: 'Accettabile', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' }
      case 'lento': return { level: 'Lento', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
      default: return { level: 'Sconosciuto', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Analisi della Latenza',
            description: 'Calcola e analizza la latenza di rete per ottimizzare le prestazioni',
            url: '/it/tecnologia/analisi-latenza/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Analisi della Latenza"
            description="Calcola e analizza la latenza di rete per ottimizzare le prestazioni"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Analisi della Latenza
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ping (ms)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Es: 25"
                      value={ping}
                      onChange={(e) => setPing(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Distanza (km) - Opzionale
                    </label>
                    <Input
                      type="number"
                      step="1"
                      placeholder="Es: 1000"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Analizza Latenza
                </Button>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {result && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Risultati dell&apos;Analisi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {result.pingMs}ms
                        </div>
                        <div className={`text-lg font-semibold mb-2 ${getLatencyLevel(result.category).color}`}>
                          {getLatencyLevel(result.category).level}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Latenza di Rete
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">Tempo di Risposta</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-900">
                            {result.pingMs}ms
                          </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">Categoria</span>
                          </div>
                          <p className="text-2xl font-bold text-green-900">
                            {getLatencyLevel(result.category).level}
                          </p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Activity className="h-4 w-4 text-purple-600" />
                            <span className="font-medium text-purple-800">Tempo in Secondi</span>
                          </div>
                          <p className="text-2xl font-bold text-purple-900">
                            {result.responseTime.seconds.toFixed(3)}s
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Descrizione:</h4>
                        <p className="text-sm text-gray-700 mb-3">{result.description}</p>
                        
                        <h4 className="font-medium mb-2">Casi d&apos;Uso Ideali:</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.useCases.map((useCase, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli dell&apos;Analisi:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Ping:</span>
                            <span className="font-medium">{result.pingMs}ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tempo di Risposta:</span>
                            <span className="font-medium">{result.responseTime.formatted}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Categoria:</span>
                            <span className="font-medium">{getLatencyLevel(result.category).level}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Secondi:</span>
                            <span className="font-medium">{result.responseTime.seconds.toFixed(3)}s</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Standard di Latenza:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li><strong>&lt; 20ms:</strong> Eccellente per gaming e video</li>
                              <li><strong>20-50ms:</strong> Buono per la maggior parte delle applicazioni</li>
                              <li><strong>50-100ms:</strong> Accettabile per browsing e email</li>
                              <li><strong>100-200ms:</strong> Lento, può causare problemi</li>
                              <li><strong>&gt; 200ms:</strong> Molto lento, sconsigliato</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
