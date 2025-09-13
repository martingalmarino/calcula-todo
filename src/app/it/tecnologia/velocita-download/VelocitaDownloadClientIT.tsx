"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Download, AlertCircle, Clock, Zap, Info } from 'lucide-react'
import { calculateDownloadSpeed, type DownloadSpeedResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function VelocitaDownloadClientIT() {
  const [mbps, setMbps] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [result, setResult] = useState<DownloadSpeedResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (!mbps) {
      setError('Inserisci la velocità in Mbps')
      return
    }

    try {
      const mbpsNum = parseFloat(mbps)
      const fileSizeNum = fileSize ? parseFloat(fileSize) : undefined
      
      if (isNaN(mbpsNum) || mbpsNum <= 0) {
        setError('Inserisci una velocità valida e positiva')
        return
      }

      if (fileSize && (isNaN(fileSizeNum!) || fileSizeNum! <= 0)) {
        setError('Inserisci una dimensione file valida e positiva')
        return
      }

      const speedResult = calculateDownloadSpeed(mbpsNum, fileSizeNum)
      setResult(speedResult)
    } catch {
      setError('Errore nel calcolo. Verifica i valori inseriti.')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Tecnologia', href: '/it/tecnologia' },
    { label: 'Velocità di Download', href: '/it/tecnologia/velocita-download' }
  ]

  const examples = [
    {
      label: 'Velocità 100 Mbps per file 1 GB',
      values: { mbps: '100', fileSize: '1' }
    },
    {
      label: 'Velocità 50 Mbps per file 500 MB',
      values: { mbps: '50', fileSize: '0.5' }
    },
    {
      label: 'Solo velocità 25 Mbps',
      values: { mbps: '25', fileSize: '' }
    }
  ]

  const faqItems = [
    {
      question: 'Qual è la differenza tra Mbps e MB/s?',
      answer: 'Mbps (megabit per secondo) è la velocità della connessione, mentre MB/s (megabyte per secondo) è la velocità reale di download. 1 byte = 8 bit, quindi 100 Mbps = 12.5 MB/s.'
    },
    {
      question: 'Perché la velocità reale è diversa da quella pubblicizzata?',
      answer: 'La velocità pubblicizzata è la massima teorica. La velocità reale dipende da fattori come congestione di rete, distanza dal server, e overhead del protocollo.'
    },
    {
      question: 'Come posso migliorare la velocità di download?',
      answer: 'Usa una connessione cablata invece del WiFi, chiudi altre applicazioni che usano internet, e assicurati di essere vicino al router.'
    },
    {
      question: 'Cosa significa "velocità simmetrica"?',
      answer: 'Una connessione simmetrica ha la stessa velocità di upload e download. La maggior parte delle connessioni domestiche sono asimmetriche (download più veloce dell\'upload).'
    }
  ]

  const relatedLinks = [
    { label: 'Conversione di Archiviazione', href: '/it/tecnologia/conversione-archiviazione', description: 'Converte unità di archiviazione' },
    { label: 'Uptime/Downtime', href: '/it/tecnologia/uptime-downtime', description: 'Calcola uptime e downtime' },
    { label: 'Analisi della Latenza', href: '/it/tecnologia/analisi-latenza', description: 'Analizza la latenza di rete' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setMbps(values.mbps as string)
    setFileSize(values.fileSize as string)
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Velocità di Download',
            description: 'Calcola il tempo di download e converte tra Mbps e MB/s per la tua connessione internet',
            url: '/it/tecnologia/velocita-download/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Velocità di Download"
            description="Calcola il tempo di download e converte tra Mbps e MB/s per la tua connessione internet"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Calcolatrice Velocità Download
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Velocità Connessione (Mbps)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Es: 100"
                      value={mbps}
                      onChange={(e) => setMbps(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Dimensione File (GB) - Opzionale
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Es: 1.5"
                      value={fileSize}
                      onChange={(e) => setFileSize(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Calcola Velocità
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
                      <CardTitle className="text-lg">Risultati del Calcolo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {result.mbpsValue.toFixed(2)} MB/s
                        </div>
                        <div className="text-lg font-semibold text-foreground mb-2">
                          Velocità Reale di Download
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {result.mbps} Mbps = {result.mbpsValue.toFixed(2)} MB/s
                        </div>
                      </div>
                      
                      {result.fileSize && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span className="font-medium text-blue-800">Tempo Download</span>
                            </div>
                            <p className="text-2xl font-bold text-blue-900">
                              {result.downloadTime.formatted}
                            </p>
                          </div>

                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-green-800">Velocità Reale</span>
                            </div>
                            <p className="text-2xl font-bold text-green-900">
                              {result.mbpsValue.toFixed(2)} MB/s
                            </p>
                          </div>

                          <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Download className="h-4 w-4 text-purple-600" />
                              <span className="font-medium text-purple-800">Dimensione File</span>
                            </div>
                            <p className="text-2xl font-bold text-purple-900">
                              {result.fileSize} GB
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli del Calcolo:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Velocità Connessione:</span>
                            <span className="font-medium">{result.mbps} Mbps</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Velocità Reale:</span>
                            <span className="font-medium">{result.mbpsValue.toFixed(2)} MB/s</span>
                          </div>
                          {result.fileSize && (
                            <>
                              <div className="flex justify-between">
                                <span>Dimensione File:</span>
                                <span className="font-medium">{result.fileSize} GB</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tempo Download:</span>
                                <span className="font-medium">{result.downloadTime.formatted}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div className="text-sm text-yellow-800">
                            <p className="font-medium mb-1">Nota Importante:</p>
                            <p>{result.disclaimer}</p>
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
