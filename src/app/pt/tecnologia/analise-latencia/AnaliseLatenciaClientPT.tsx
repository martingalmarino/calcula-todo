"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Zap, Calculator } from 'lucide-react'
import { analyzeLatency, type LatencyResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function AnaliseLatenciaClientPT() {
  const [latency, setLatency] = useState('')
  const [distance, setDistance] = useState('')
  const [application, setApplication] = useState('web')
  const [results, setResults] = useState<LatencyResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!latency) {
      setError('Por favor, digite a latência em ms')
      return
    }

    try {
      const latencyNum = parseFloat(latency)
      const distanceNum = distance ? parseFloat(distance) : undefined
      
      if (isNaN(latencyNum) || latencyNum < 0) {
        setError('Por favor, digite uma latência válida maior ou igual a zero')
        return
      }

      if (distance && (isNaN(distanceNum!) || distanceNum! <= 0)) {
        setError('Por favor, digite uma distância válida maior que zero')
        return
      }

      const result = analyzeLatency(latencyNum, distanceNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular a latência')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Tecnologia', href: '/pt/tecnologia/' },
    { label: 'Análise de Latência', href: '/pt/tecnologia/analise-latencia/' }
  ]

  const examples = [
    {
      label: 'Exemplo: 50ms para web',
      values: { latency: '50', distance: '', application: 'web' }
    },
    {
      label: 'Exemplo: 20ms, 1000km',
      values: { latency: '20', distance: '1000', application: 'gaming' }
    },
    {
      label: 'Exemplo: 100ms para streaming',
      values: { latency: '100', distance: '', application: 'streaming' }
    }
  ]

  const faqItems = [
    {
      question: 'O que é latência?',
      answer: 'Latência é o tempo que leva para um pacote de dados viajar de um ponto a outro na rede. É medido em milissegundos (ms) e afeta a responsividade das aplicações.'
    },
    {
      question: 'Qual é uma boa latência?',
      answer: 'Para web: <50ms é excelente, <100ms é boa. Para jogos: <20ms é ideal, <50ms é aceitável. Para streaming: <100ms é boa, <200ms é aceitável.'
    },
    {
      question: 'O que afeta a latência?',
      answer: 'Distância física, número de saltos de rede, congestionamento, tipo de conexão (fibra vs cabo), qualidade do roteador e servidor de destino.'
    },
    {
      question: 'Como reduzir a latência?',
      answer: 'Use conexões de fibra óptica, escolha servidores mais próximos, otimize sua rede local, use CDNs e considere conexões dedicadas para aplicações críticas.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Velocidade de Download',
      href: '/pt/tecnologia/velocidade-download/'
    },
    {
      label: 'Uptime/Downtime',
      href: '/pt/tecnologia/uptime-downtime/'
    },
    {
      label: 'Outras Calculadoras de Tecnologia',
      href: '/pt/tecnologia/'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'excelente':
        return 'text-green-600'
      case 'bueno':
        return 'text-blue-600'
      case 'aceptable':
        return 'text-yellow-600'
      case 'lento':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'excelente':
        return 'Excelente'
      case 'bueno':
        return 'Bom'
      case 'aceptable':
        return 'Aceitável'
      case 'lento':
        return 'Lento'
      default:
        return category
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Analisador de Latência',
            description: 'Calcula latência e tempo de resposta de rede',
            url: '/pt/tecnologia/analise-latencia/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsPT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Analisador de Latência"
            description="Calcula latência e tempo de resposta de rede"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setLatency(values.latency as string)
              setDistance(values.distance as string)
              setApplication(values.application as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="latency">Latência (ms)</Label>
                  <Input
                    id="latency"
                    type="number"
                    value={latency}
                    onChange={(e) => setLatency(e.target.value)}
                    placeholder="Ex: 50"
                  />
                </div>
                <div>
                  <Label htmlFor="distance">Distância (km) - Opcional</Label>
                  <Input
                    id="distance"
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="Ex: 1000"
                  />
                </div>
                <div>
                  <Label htmlFor="application">Tipo de Aplicação</Label>
                  <Select value={application} onValueChange={setApplication}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Navegação Web</SelectItem>
                      <SelectItem value="gaming">Jogos Online</SelectItem>
                      <SelectItem value="streaming">Streaming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Analisar Latência
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className="mt-4 bg-indigo-50 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Resultado da Análise
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Latência</span>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">
                          {results.pingMs} ms
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Qualidade</span>
                        </div>
                        <p className={`text-2xl font-bold ${getCategoryColor(results.category)}`}>
                          {getCategoryLabel(results.category)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Tempo de Resposta</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">
                        {results.responseTime.formatted}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Tipo de aplicação:</strong> {
                          application === 'web' ? 'Navegação Web' :
                          application === 'gaming' ? 'Jogos Online' :
                          'Streaming'
                        }
                      </p>
                      {results.theoreticalDistance && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Distância teórica:</strong> {results.theoreticalDistance} km
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Descrição:</h4>
                      <p className="text-sm text-gray-600">
                        {results.description}
                      </p>
                    </div>

                    {results.useCases.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800">Casos de Uso:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {results.useCases.map((useCase, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
