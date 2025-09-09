"use client"

import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MousePointer, Play, Square, RotateCcw } from 'lucide-react'
import { calculateClickStats, type ClickTestResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function ContadorClicksClient() {
  const [isRunning, setIsRunning] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [results, setResults] = useState<ClickTestResult | null>(null)
  const [bestScore, setBestScore] = useState<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now()
      intervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000
        setTimeElapsed(elapsed)
      }, 10) // Actualizar cada 10ms para mayor precisión
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const handleStart = () => {
    setIsRunning(true)
    setClicks(0)
    setTimeElapsed(0)
    setResults(null)
  }

  const handleStop = () => {
    setIsRunning(false)
    if (clicks > 0 && timeElapsed > 0) {
      const result = calculateClickStats(clicks, timeElapsed)
      setResults(result)
      
      // Actualizar mejor puntuación
      if (result.cps > bestScore) {
        setBestScore(result.cps)
      }
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setClicks(0)
    setTimeElapsed(0)
    setResults(null)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleClick = () => {
    if (isRunning) {
      setClicks(prev => prev + 1)
    }
  }

  const breadcrumbs = getBreadcrumbs('/otras/contador-clicks')

  const examples = [
    {
      label: 'Comenzar test de 10 segundos',
      values: { action: 'start' }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es CPS?',
      answer: 'CPS significa "Clicks Per Second" (Clicks por Segundo). Es una medida de velocidad de clicks.'
    },
    {
      question: '¿Cómo se calcula el CPS?',
      answer: 'CPS = Número total de clicks ÷ Tiempo transcurrido en segundos.'
    },
    {
      question: '¿Cuál es un buen CPS?',
      answer: 'Un CPS de 5-7 es considerado bueno. Los jugadores profesionales pueden alcanzar 10+ CPS.'
    },
    {
      question: '¿Puedo mejorar mi CPS?',
      answer: 'Sí, practicando regularmente, usando un mouse cómodo y técnicas como jitter clicking.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Contador de Clicks - CPS Test Online',
            description: 'Mide tu velocidad de clicks por segundo',
            url: '/otras/contador-clicks/',
            category: 'Herramientas de Juegos'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Contador de Clicks - CPS Test Online"
            description="Mide tu velocidad de clicks por segundo"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={() => {
              if (!isRunning) {
                handleStart()
              }
            }}
          >
            <div className="space-y-6">
              {/* Controles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer className="h-5 w-5" />
                    CPS Test
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 justify-center">
                    {!isRunning ? (
                      <Button 
                        onClick={handleStart}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Iniciar Test
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleStop}
                        className="calculator-button"
                      >
                        <Square className="h-4 w-4 mr-2" />
                        Detener
                      </Button>
                    )}
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reiniciar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Área de clicks */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Área de Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className={`w-full h-64 rounded-lg border-2 border-dashed flex items-center justify-center text-center transition-colors ${
                      isRunning 
                        ? 'bg-gray-50 border-gray-100 hover:bg-blue-100 hover:border-blue-600 cursor-pointer' 
                        : 'bg-gray-50 border-gray-300'
                    }`}
                    onClick={handleClick}
                  >
                    <div>
                      {isRunning ? (
                        <div>
                          <div className="text-2xl font-bold text-red-600 mb-2">
                            ¡HAZ CLICK AQUÍ!
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Haz click lo más rápido que puedas
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-lg text-muted-foreground mb-2">
                            Haz click en &quot;Iniciar Test&quot; para comenzar
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Luego haz click en esta área lo más rápido posible
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Estadísticas en tiempo real */}
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {clicks}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Clicks
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {timeElapsed.toFixed(1)}s
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tiempo
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {clicks > 0 && timeElapsed > 0 ? (clicks / timeElapsed).toFixed(2) : '0.00'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        CPS Actual
                      </div>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {bestScore.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Mejor CPS
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resultados finales */}
              {results && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resultado Final</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-600 mb-2">
                        {results.cps} CPS
                      </div>
                      <div className="text-lg text-muted-foreground">
                        {results.clicks} clicks en {results.timeElapsed} segundos
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium mb-3">Estadísticas Detalladas:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Total de clicks:</span>
                            <span className="font-medium">{results.clicks}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tiempo transcurrido:</span>
                            <span className="font-medium">{results.timeElapsed}s</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>CPS promedio:</span>
                            <span className="font-medium">{results.cps}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tiempo promedio entre clicks:</span>
                            <span className="font-medium">{results.averageTime}ms</span>
                          </div>
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
