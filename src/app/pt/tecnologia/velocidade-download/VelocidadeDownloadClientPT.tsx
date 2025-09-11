"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Download, Calculator } from 'lucide-react'
import { calculateDownloadSpeed, type DownloadSpeedResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function VelocidadeDownloadClientPT() {
  const [mbps, setMbps] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [results, setResults] = useState<DownloadSpeedResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!mbps) {
      setError('Por favor, digite a velocidade em Mbps')
      return
    }

    try {
      const mbpsNum = parseFloat(mbps)
      const fileSizeNum = fileSize ? parseFloat(fileSize) : undefined
      
      if (isNaN(mbpsNum) || mbpsNum <= 0) {
        setError('Por favor, digite uma velocidade válida maior que zero')
        return
      }

      if (fileSize && (isNaN(fileSizeNum!) || fileSizeNum! <= 0)) {
        setError('Por favor, digite um tamanho de arquivo válido maior que zero')
        return
      }

      const result = calculateDownloadSpeed(mbpsNum, fileSizeNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular a velocidade')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Tecnologia', href: '/pt/tecnologia/' },
    { label: 'Velocidade de Download', href: '/pt/tecnologia/velocidade-download/' }
  ]

  const examples = [
    {
      label: 'Exemplo: 100 Mbps',
      values: { mbps: '100', fileSize: '' }
    },
    {
      label: 'Exemplo: 50 Mbps, arquivo 1 GB',
      values: { mbps: '50', fileSize: '1' }
    },
    {
      label: 'Exemplo: 25 Mbps, arquivo 500 MB',
      values: { mbps: '25', fileSize: '0.5' }
    }
  ]

  const faqItems = [
    {
      question: 'Qual é a diferença entre Mbps e MB/s?',
      answer: 'Mbps (megabits por segundo) é a velocidade da sua conexão, enquanto MB/s (megabytes por segundo) é a velocidade real de download. 1 byte = 8 bits, então 100 Mbps = 12.5 MB/s.'
    },
    {
      question: 'Por que minha velocidade real é menor que a contratada?',
      answer: 'A velocidade contratada é a máxima teórica. Fatores como distância do servidor, congestionamento da rede e qualidade do equipamento podem reduzir a velocidade real.'
    },
    {
      question: 'Como testar minha velocidade real?',
      answer: 'Use sites como Speedtest.net ou Fast.com para medir sua velocidade real. Execute o teste várias vezes em horários diferentes para ter uma média mais precisa.'
    },
    {
      question: 'O que afeta a velocidade de download?',
      answer: 'Distância do servidor, tipo de conexão (fibra, cabo, ADSL), número de dispositivos conectados, qualidade do roteador e congestionamento da rede.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Conversão de Armazenamento',
      href: '/pt/tecnologia/conversao-armazenamento/'
    },
    {
      label: 'Análise de Latência',
      href: '/pt/tecnologia/analise-latencia/'
    },
    {
      label: 'Outras Calculadoras de Tecnologia',
      href: '/pt/tecnologia/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Velocidade de Download',
            description: 'Converte Mbps para MB/s e calcula tempo de download de arquivos',
            url: '/pt/tecnologia/velocidade-download/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Velocidade de Download"
            description="Converte Mbps para MB/s e calcula tempo de download de arquivos"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setMbps(values.mbps as string)
              setFileSize(values.fileSize as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mbps">Velocidade da Conexão (Mbps)</Label>
                  <Input
                    id="mbps"
                    type="number"
                    value={mbps}
                    onChange={(e) => setMbps(e.target.value)}
                    placeholder="Ex: 100"
                  />
                </div>
                <div>
                  <Label htmlFor="fileSize">Tamanho do Arquivo (GB) - Opcional</Label>
                  <Input
                    id="fileSize"
                    type="number"
                    step="0.1"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    placeholder="Ex: 1.5"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Velocidade
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className="mt-4 bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Resultado do Cálculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Download className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Velocidade Real</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {results.mbpsValue.toFixed(2)} MB/s
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Download className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Velocidade Contratada</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          {results.mbps} Mbps
                        </p>
                      </div>
                    </div>
                    
                    {results.fileSize && (
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Download className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Tempo de Download</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">
                          {results.downloadTime.formatted}
                        </p>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Conversão:</strong> 1 Mbps = 0.125 MB/s (1 byte = 8 bits)
                      </p>
                      {results.fileSize && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Tamanho do arquivo:</strong> {results.fileSize} GB
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        <strong>Observação:</strong> {results.disclaimer}
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
