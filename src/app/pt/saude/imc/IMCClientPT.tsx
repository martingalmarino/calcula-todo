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
import { Activity, Calculator } from 'lucide-react'
import { calculateIMC, type IMCResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'

export default function IMCClientPT() {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [resultado, setResultado] = useState<IMCResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const pesoNum = parseFloat(peso)
    const alturaNum = parseFloat(altura)

    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      setError('Por favor, insira valores válidos para peso e altura.')
      return
    }

    if (pesoNum <= 0 || alturaNum <= 0) {
      setError('O peso e a altura devem ser valores positivos.')
      return
    }

    if (pesoNum > 300) {
      setError('O peso deve ser menor que 300kg.')
      return
    }

    if (alturaNum < 100 || alturaNum > 250) {
      setError('A altura deve estar entre 100cm e 250cm.')
      return
    }

    try {
      const resultado = calculateIMC(pesoNum, alturaNum, 'pt')
      setResultado(resultado)
    } catch {
      setError('Erro ao calcular o IMC. Verifique os valores inseridos.')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Saúde', href: '/pt/saude/' },
    { label: 'IMC', href: '/pt/saude/imc/' }
  ]

  const examples = [
    {
      label: 'Exemplo: Pessoa de 70kg e 175cm',
      values: { peso: '70', altura: '175' }
    },
    {
      label: 'Exemplo: Pessoa de 60kg e 165cm',
      values: { peso: '60', altura: '165' }
    }
  ]

  const faqItems = [
    {
      question: 'O que é o IMC?',
      answer: 'O Índice de Massa Corporal (IMC) é uma medida que relaciona peso e altura para avaliar se uma pessoa está com peso adequado.'
    },
    {
      question: 'Como calcular o IMC?',
      answer: 'O IMC é calculado dividindo o peso (em kg) pela altura ao quadrado (em metros): IMC = peso / (altura)²'
    },
    {
      question: 'Quais são as categorias de IMC?',
      answer: 'Abaixo do peso (&lt; 18.5), Peso normal (18.5-24.9), Sobrepeso (25-29.9) e Obesidade (&gt;= 30).'
    },
    {
      question: 'O IMC é preciso para todos?',
      answer: 'O IMC é uma ferramenta útil mas não considera a composição corporal. Atletas com muita massa muscular podem ter IMC elevado sem serem obesos.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de IMC - Índice de Massa Corporal',
            description: 'Calcule seu Índice de Massa Corporal e descubra sua categoria de peso ideal',
            url: '/pt/saude/imc/',
            category: 'Saúde'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de IMC - Índice de Massa Corporal"
            description="Calcule seu Índice de Massa Corporal e descubra sua categoria de peso ideal"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setPeso(values.peso as string)
              setAltura(values.altura as string)
            }}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input
                  id="peso"
                  type="number"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  placeholder="Ex: 70"
                />
              </div>
              
              <div>
                <Label htmlFor="altura">Altura (cm)</Label>
                <Input
                  id="altura"
                  type="number"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  placeholder="Ex: 175"
                />
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular IMC
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Resultado do IMC
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">IMC</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.imc}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Categoria</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.category}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {resultado.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {resultado.recommendation}
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