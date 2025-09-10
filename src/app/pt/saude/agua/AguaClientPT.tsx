"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Droplets, Calculator, Copy, Share } from 'lucide-react'
import { calculateWaterIntake, type WaterIntakeResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'

export default function AguaClientPT() {
  const [peso, setPeso] = useState('')
  const [idade, setIdade] = useState('')
  const [atividade, setAtividade] = useState('')
  const [clima, setClima] = useState('')
  const [resultado, setResultado] = useState<WaterIntakeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const pesoNum = parseFloat(peso)
    const idadeNum = parseInt(idade)

    if (isNaN(pesoNum) || isNaN(idadeNum)) {
      setError('Por favor, insira valores válidos para peso e idade.')
      return
    }

    if (pesoNum <= 0 || idadeNum <= 0) {
      setError('O peso e a idade devem ser valores positivos.')
      return
    }

    if (pesoNum > 300) {
      setError('O peso deve ser menor que 300kg.')
      return
    }

    if (idadeNum < 1 || idadeNum > 120) {
      setError('A idade deve estar entre 1 e 120 anos.')
      return
    }

    if (!atividade || !clima) {
      setError('Por favor, selecione o nível de atividade e o clima.')
      return
    }

    try {
      // Mapear atividade para o formato esperado pela função
      let activityLevel: 'low' | 'moderate' | 'high' = 'moderate'
      if (atividade === 'sedentario') activityLevel = 'low'
      else if (atividade === 'leve') activityLevel = 'low'
      else if (atividade === 'moderado') activityLevel = 'moderate'
      else if (atividade === 'intenso') activityLevel = 'high'
      
      const resultado = calculateWaterIntake(pesoNum, idadeNum, activityLevel)
      setResultado(resultado)
    } catch {
      setError('Erro ao calcular a ingestão de água. Verifique os valores inseridos.')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Saúde', href: '/pt/saude/' },
    { label: 'Água', href: '/pt/saude/agua/' }
  ]

  const examples = [
    {
      label: 'Exemplo: Pessoa de 70kg, 30 anos, moderadamente ativa, clima normal',
      values: { peso: '70', idade: '30', atividade: 'moderado', clima: 'normal' }
    },
    {
      label: 'Exemplo: Pessoa de 60kg, 25 anos, sedentária, clima quente',
      values: { peso: '60', idade: '25', atividade: 'sedentario', clima: 'quente' }
    }
  ]

  const faqItems = [
    {
      question: 'Quanta água devo beber por dia?',
      answer: 'A recomendação geral é de 35ml por kg de peso corporal, mas pode variar conforme atividade física, clima e idade.'
    },
    {
      question: 'Como o clima afeta a necessidade de água?',
      answer: 'Em climas quentes ou úmidos, você precisa de mais água devido à maior perda através da transpiração.'
    },
    {
      question: 'A atividade física influencia na hidratação?',
      answer: 'Sim, pessoas mais ativas precisam de mais água para repor os líquidos perdidos durante o exercício.'
    },
    {
      question: 'Posso beber outros líquidos além de água?',
      answer: 'Sim, mas a água pura é a melhor opção. Evite bebidas com muito açúcar ou cafeína em excesso.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Água',
            description: 'Descubra quanta água você deve beber por dia para manter-se hidratado',
            url: '/pt/saude/agua/',
            category: 'Saúde'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Água"
            description="Descubra quanta água você deve beber por dia para manter-se hidratado"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setPeso(values.peso as string)
              setIdade(values.idade as string)
              setAtividade(values.atividade as string)
              setClima(values.clima as string)
            }}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="idade">Idade (anos)</Label>
                  <Input
                    id="idade"
                    type="number"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    placeholder="Ex: 30"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="atividade">Nível de Atividade</Label>
                  <Select value={atividade} onValueChange={setAtividade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível de atividade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentario">Sedentário</SelectItem>
                      <SelectItem value="leve">Levemente ativo</SelectItem>
                      <SelectItem value="moderado">Moderadamente ativo</SelectItem>
                      <SelectItem value="intenso">Muito ativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="clima">Clima</Label>
                  <Select value={clima} onValueChange={setClima}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o clima" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frio">Frio</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="quente">Quente</SelectItem>
                      <SelectItem value="muito_quente">Muito quente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Ingestão de Água
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
                      <Droplets className="h-5 w-5" />
                      Resultado da Ingestão de Água
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Água por dia</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.dailyWater} ml</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Copos (250ml)</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.glasses} copos</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Garrafas (500ml)</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.bottles} garrafas</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Categoria:</strong> {resultado.category}
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