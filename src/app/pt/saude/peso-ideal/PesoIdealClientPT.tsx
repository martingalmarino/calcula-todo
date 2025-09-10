"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Target, AlertCircle } from 'lucide-react'
import { calculateIdealWeight, type IdealWeightResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function PesoIdealClientPT() {
  const [altura, setAltura] = useState('')
  const [sexo, setSexo] = useState('')
  const [resultado, setResultado] = useState<IdealWeightResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const alturaNum = parseFloat(altura)

    if (isNaN(alturaNum)) {
      setError('Por favor, insira uma altura válida.')
      return
    }

    if (alturaNum <= 0) {
      setError('A altura deve ser um valor positivo.')
      return
    }

    if (alturaNum < 100 || alturaNum > 250) {
      setError('A altura deve estar entre 100cm e 250cm.')
      return
    }

    if (!sexo) {
      setError('Por favor, selecione o sexo.')
      return
    }

    try {
      // Mapear sexo para o formato esperado pela função
      const gender = sexo === 'masculino' ? 'male' : 'female'
      
      const resultado = calculateIdealWeight(alturaNum, gender, 'pt')
      setResultado(resultado)
    } catch {
      setError('Erro ao calcular o peso ideal. Verifique os valores inseridos.')
    }
  }

  const breadcrumbs = getBreadcrumbs('/pt/saude/peso-ideal')

  const examples = [
    {
      label: 'Exemplo: Homem de 175cm',
      values: { altura: '175', sexo: 'masculino' }
    },
    {
      label: 'Exemplo: Mulher de 165cm',
      values: { altura: '165', sexo: 'feminino' }
    }
  ]

  const faqItems = [
    {
      question: 'O que é o peso ideal?',
      answer: 'O peso ideal é uma faixa de peso considerada saudável para uma determinada altura e sexo, baseada em fórmulas médicas reconhecidas.'
    },
    {
      question: 'Como é calculado o peso ideal?',
      answer: 'Utilizamos a fórmula de Devine, que considera altura e sexo para determinar a faixa de peso ideal.'
    },
    {
      question: 'O peso ideal é o mesmo para todos?',
      answer: 'Não, o peso ideal varia conforme altura, sexo, idade e composição corporal. É apenas uma referência geral.'
    },
    {
      question: 'Devo me preocupar se estou fora do peso ideal?',
      answer: 'O peso ideal é uma referência. Consulte um profissional de saúde para uma avaliação completa e personalizada.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Peso Ideal',
            description: 'Descubra qual é o peso ideal para sua altura e tipo corporal',
            url: '/pt/saude/peso-ideal/',
            category: 'Saúde'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Peso Ideal"
            description="Descubra qual é o peso ideal para sua altura e tipo corporal"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setAltura(values.altura as string)
              setSexo(values.sexo as string)
            }}
          >
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Altura (cm)
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 175"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Sexo
                </label>
                <Select value={sexo} onValueChange={setSexo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Target className="h-4 w-4" />
                  Calcular Peso Ideal
                </Button>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {resultado && (
                <Card className="mt-4 bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Resultado do Peso Ideal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {resultado.range.min} - {resultado.range.max} kg
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        Peso Ideal
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Peso ideal: {resultado.idealWeight} kg
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Método:</strong> {resultado.method}
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
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}