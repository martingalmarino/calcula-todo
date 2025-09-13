"use client"

import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MousePointer, Timer, Zap, Target } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'

interface ClickTestResult {
  clicks: number
  timeElapsed: number
  cps: number
  averageTime: number
}

export default function ContadorCliquesClientPT() {
  const [isActive, setIsActive] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [results, setResults] = useState<ClickTestResult | null>(null)
  const [clickTimes, setClickTimes] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleStart = () => {
    setIsActive(true)
    setClicks(0)
    setStartTime(Date.now())
    setEndTime(null)
    setResults(null)
    setClickTimes([])
  }

  const handleStop = () => {
    if (isActive && startTime) {
      setIsActive(false)
      setEndTime(Date.now())
    }
  }

  const handleClick = () => {
    if (isActive) {
      const currentTime = Date.now()
      setClicks(prev => prev + 1)
      setClickTimes(prev => [...prev, currentTime])
    }
  }

  const handleReset = () => {
    setIsActive(false)
    setClicks(0)
    setStartTime(null)
    setEndTime(null)
    setResults(null)
    setClickTimes([])
  }

  useEffect(() => {
    if (isActive && startTime) {
      intervalRef.current = setInterval(() => {
        // Atualizar tempo em tempo real
      }, 100)
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
  }, [isActive, startTime])

  useEffect(() => {
    if (endTime && startTime && clicks > 0) {
      const timeElapsed = (endTime - startTime) / 1000
      const cps = clicks / timeElapsed
      
      let averageTime = 0
      if (clickTimes.length > 1) {
        const intervals = clickTimes.slice(1).map((time, index) => time - clickTimes[index])
        averageTime = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length
      }

      setResults({
        clicks,
        timeElapsed,
        cps,
        averageTime
      })
    }
  }, [endTime, startTime, clicks, clickTimes])

  const currentTime = isActive && startTime ? (Date.now() - startTime) / 1000 : 0

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Outras', href: '/pt/outras/' },
    { label: 'Contador de Cliques', href: '/pt/outras/contador-cliques/' }
  ]

  const examples = [
    {
      label: 'Teste rápido: 5 segundos',
      values: { duration: '5' }
    },
    {
      label: 'Teste médio: 10 segundos',
      values: { duration: '10' }
    },
    {
      label: 'Teste longo: 30 segundos',
      values: { duration: '30' }
    }
  ]

  const faqItems = [
    {
      question: 'O que é CPS (Clicks Per Second)?',
      answer: 'CPS é a medida de quantos cliques você consegue fazer por segundo. É uma métrica comum em jogos e testes de coordenação.'
    },
    {
      question: 'Como melhorar minha velocidade de cliques?',
      answer: 'Pratique regularmente, mantenha uma postura confortável, use um mouse adequado e tente diferentes técnicas como jitter clicking ou butterfly clicking.'
    },
    {
      question: 'Qual é uma boa pontuação CPS?',
      answer: 'Uma pontuação de 6-8 CPS é considerada boa para a maioria das pessoas. Jogadores profissionais podem atingir 10+ CPS.'
    },
    {
      question: 'O teste é preciso?',
      answer: 'O teste mede cliques reais do mouse. A precisão pode variar ligeiramente dependendo do hardware e software do seu dispositivo.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Outras Calculadoras',
      href: '/pt/outras/'
    },
    {
      label: 'Calculadoras Curiosas',
      href: '/pt/curiosas/'
    },
    {
      label: 'Calculadoras de Tecnologia',
      href: '/pt/tecnologia/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Contador de Cliques (CPS)',
            description: 'Teste sua velocidade de cliques por segundo',
            url: '/pt/outras/contador-cliques/',
            category: 'Testes'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsPT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Contador de Cliques (CPS)"
            description="Teste sua velocidade de cliques por segundo"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-blue-600">
                  {clicks}
                </div>
                <div className="text-lg text-gray-600">
                  Cliques
                </div>
                
                {isActive && (
                  <div className="text-2xl font-semibold text-green-600">
                    {currentTime.toFixed(1)}s
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                {!isActive && !results && (
                  <Button onClick={handleStart} className="calculator-button bg-green-600 hover:bg-green-700">
                    <MousePointer className="h-4 w-4" />
                    Iniciar Teste
                  </Button>
                )}
                
                {isActive && (
                  <Button onClick={handleStop} className="calculator-button bg-red-600 hover:bg-red-700">
                    <Timer className="h-4 w-4" />
                    Parar Teste
                  </Button>
                )}
                
                {results && (
                  <Button onClick={handleReset} className="calculator-button">
                    <Target className="h-4 w-4" />
                    Novo Teste
                  </Button>
                )}
              </div>

              <div 
                className={`w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center text-lg font-medium transition-colors ${
                  isActive 
                    ? 'border-green-500 bg-green-50 text-green-700 cursor-pointer hover:bg-green-100' 
                    : 'border-gray-300 bg-gray-50 text-gray-500'
                }`}
                onClick={handleClick}
              >
                {isActive ? 'Clique aqui rapidamente!' : 'Clique em "Iniciar Teste" para começar'}
              </div>

              {results && (
                <Card className="mt-4 bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Resultados do Teste
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <MousePointer className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Total de Cliques</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{results.clicks}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">CPS</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{results.cps.toFixed(2)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Timer className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Tempo</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{results.timeElapsed.toFixed(1)}s</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Tempo médio entre cliques:</strong> {results.averageTime.toFixed(0)}ms
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Performance:</strong> {
                          results.cps >= 8 ? 'Excelente!' :
                          results.cps >= 6 ? 'Muito bom!' :
                          results.cps >= 4 ? 'Bom!' :
                          results.cps >= 2 ? 'Regular' : 'Pode melhorar'
                        }
                      </p>
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
