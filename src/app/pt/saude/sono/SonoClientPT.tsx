"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Moon, Calculator, Copy, Share } from 'lucide-react'
import { calculateSleep, type SleepResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'

export default function SonoClientPT() {
  const [horaDormir, setHoraDormir] = useState('')
  const [resultado, setResultado] = useState<SleepResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    if (!horaDormir) {
      setError('Por favor, insira a hora que deseja dormir.')
      return
    }

    try {
      const resultado = calculateSleep(horaDormir, 'pt')
      setResultado(resultado)
    } catch {
      setError('Erro ao calcular os ciclos de sono. Verifique a hora inserida.')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Saúde', href: '/pt/saude/' },
    { label: 'Sono', href: '/pt/saude/sono/' }
  ]

  const examples = [
    {
      label: 'Exemplo: Dormir às 22:00',
      values: { horaDormir: '22:00' }
    },
    {
      label: 'Exemplo: Dormir às 23:30',
      values: { horaDormir: '23:30' }
    }
  ]

  const faqItems = [
    {
      question: 'O que são ciclos de sono?',
      answer: 'Os ciclos de sono são períodos de aproximadamente 90 minutos que incluem diferentes fases do sono (leve, profundo e REM).'
    },
    {
      question: 'Quantos ciclos de sono preciso?',
      answer: 'A maioria das pessoas precisa de 5-6 ciclos completos por noite, o que equivale a 7.5-9 horas de sono.'
    },
    {
      question: 'Por que é importante acordar no final de um ciclo?',
      answer: 'Acordar no final de um ciclo de sono (fase leve) faz com que você se sinta mais descansado e alerta.'
    },
    {
      question: 'Posso usar essa calculadora todos os dias?',
      answer: 'Sim, mas lembre-se de que a qualidade do sono também depende de outros fatores como ambiente, alimentação e rotina.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Sono',
            description: 'Calcule seus ciclos de sono e descubra os melhores horários para dormir',
            url: '/pt/saude/sono/',
            category: 'Saúde'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Sono"
            description="Calcule seus ciclos de sono e descubra os melhores horários para dormir"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setHoraDormir(values.horaDormir as string)
            }}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="horaDormir">Hora que deseja dormir</Label>
                <Input
                  id="horaDormir"
                  type="time"
                  value={horaDormir}
                  onChange={(e) => setHoraDormir(e.target.value)}
                />
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Ciclos de Sono
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center gap-2">
                      <Moon className="h-5 w-5" />
                      Horários Ideais para Acordar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Moon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Hora de Acordar</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.wakeUpTime}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Moon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Ciclos de Sono</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.sleepCycles} ciclos</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Hora de dormir:</strong> {resultado.bedTime}
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">Recomendações:</p>
                        {resultado.recommendations.map((rec, index) => (
                          <p key={index} className="text-sm text-muted-foreground">• {rec}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {resultado && (
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar resultado
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}