"use client"

import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MousePointer, Play, Square, RotateCcw, Clock, Target } from 'lucide-react'
import { calculateClickStats, type ClickTestResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'

export default function ContatoreClickCPSClientIT() {
  const [isRunning, setIsRunning] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [results, setResults] = useState<ClickTestResult | null>(null)
  const [testDuration] = useState(10) // 10 secondi di test
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now()
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = (Date.now() - startTimeRef.current) / 1000
          setTimeElapsed(elapsed)
          
          if (elapsed >= testDuration) {
            setIsRunning(false)
            if (clicks > 0 && elapsed > 0) {
              const stats = calculateClickStats(clicks, elapsed)
              setResults(stats)
            }
          }
        }
      }, 10) // Aggiorna ogni 10ms per precisione
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, testDuration, clicks])

  const startTest = () => {
    setIsRunning(true)
    setClicks(0)
    setTimeElapsed(0)
    setResults(null)
  }

  const stopTest = () => {
    setIsRunning(false)
    if (clicks > 0 && timeElapsed > 0) {
      const stats = calculateClickStats(clicks, timeElapsed)
      setResults(stats)
    }
  }

  const resetTest = () => {
    setIsRunning(false)
    setClicks(0)
    setTimeElapsed(0)
    setResults(null)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleClick = () => {
    if (isRunning) {
      setClicks(prev => prev + 1)
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Altre Calcolatrici', href: '/it/altre' },
    { label: 'Contatore di Click (CPS Test)', href: '/it/altre/contatore-click-cps' }
  ]

  const examples = [
    {
      label: 'Test di 10 secondi - Clicca il più velocemente possibile',
      values: { duration: '10' }
    }
  ]

  const faqItems = [
    {
      question: 'Cos\'è il CPS (Clicks Per Second)?',
      answer: 'Il CPS è una misura della velocità di click, calcolata come numero di click diviso per il tempo in secondi. È utile per giochi che richiedono click rapidi.'
    },
    {
      question: 'Come posso migliorare la mia velocità di click?',
      answer: 'Pratica regolarmente, usa un mouse di qualità, mantieni una postura comoda e rilassata, e concentrati sulla precisione oltre che sulla velocità.'
    },
    {
      question: 'Qual è un buon punteggio CPS?',
      answer: 'Un CPS di 6-8 è considerato buono per la maggior parte delle persone. I giocatori esperti possono raggiungere 10+ CPS.'
    },
    {
      question: 'Il test è accurato?',
      answer: 'Il test misura la velocità di click in tempo reale. La precisione dipende dalla tua connessione e dalle prestazioni del dispositivo.'
    }
  ]

  const relatedLinks = [
    { label: 'Scala di Voti', href: '/it/altre/scala-di-voti', description: 'Converte punteggi in lettere' },
    { label: 'Contatore di Parole', href: '/it/altre/contatore-parole-caratteri', description: 'Conta parole e caratteri' },
    { label: 'Calcolatrice di Mance', href: '/it/altre/calcolatrice-mance', description: 'Calcola le mance' }
  ]

  const getCPSLevel = (cps: number) => {
    if (cps >= 10) return { level: 'Eccellente', color: 'text-green-600' }
    if (cps >= 8) return { level: 'Molto Buono', color: 'text-blue-600' }
    if (cps >= 6) return { level: 'Buono', color: 'text-yellow-600' }
    if (cps >= 4) return { level: 'Medio', color: 'text-orange-600' }
    return { level: 'Da Migliorare', color: 'text-red-600' }
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Contatore di Click (CPS Test)',
            description: 'Testa la tua velocità di click per secondo',
            url: '/it/altre/contatore-click-cps/',
            category: 'Test'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Contatore di Click (CPS Test)"
            description="Testa la tua velocità di click per secondo"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={() => {}}
          >
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer className="h-5 w-5" />
                    Test di Velocità Click
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-blue-600 mb-2">
                      {clicks}
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-4">
                      Click Totali
                    </div>
                    
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {timeElapsed.toFixed(1)}s
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-6">
                      Tempo Trascorso
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 mb-6">
                    {!isRunning ? (
                      <Button 
                        onClick={startTest}
                        className="calculator-button bg-green-600 hover:bg-green-700"
                        size="lg"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Inizia Test
                      </Button>
                    ) : (
                      <Button 
                        onClick={stopTest}
                        className="calculator-button bg-red-600 hover:bg-red-700"
                        size="lg"
                      >
                        <Square className="h-4 w-4 mr-2" />
                        Ferma Test
                      </Button>
                    )}
                    
                    <Button 
                      onClick={resetTest}
                      variant="outline"
                      size="lg"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>

                  <div 
                    className={`w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      isRunning 
                        ? 'border-blue-500 bg-blue-50 hover:bg-blue-100' 
                        : 'border-gray-300 bg-gray-50'
                    }`}
                    onClick={handleClick}
                  >
                    <div className="text-center">
                      <MousePointer className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm text-gray-600">
                        {isRunning ? 'Clicca qui il più velocemente possibile!' : 'Inizia il test per iniziare a cliccare'}
                      </p>
                    </div>
                  </div>

                  {isRunning && (
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">
                        Tempo rimanente: {(testDuration - timeElapsed).toFixed(1)}s
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                          style={{ width: `${Math.min((timeElapsed / testDuration) * 100, 100)}%` } as React.CSSProperties}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Risultati del Test</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {results.cps} CPS
                      </div>
                      <div className={`text-lg font-semibold mb-2 ${getCPSLevel(results.cps).color}`}>
                        {getCPSLevel(results.cps).level}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-800">Click Totali</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-900">
                          {results.clicks}
                        </p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-800">Tempo</span>
                        </div>
                        <p className="text-2xl font-bold text-green-900">
                          {results.timeElapsed}s
                        </p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <MousePointer className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-purple-800">Tempo Medio</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-900">
                          {results.averageTime}ms
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Dettagli del Test:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Click per Secondo:</span>
                          <span className="font-medium">{results.cps} CPS</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tempo tra Click:</span>
                          <span className="font-medium">{results.averageTime}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Click Totali:</span>
                          <span className="font-medium">{results.clicks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Durata Test:</span>
                          <span className="font-medium">{results.timeElapsed}s</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
