"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Droplets, AlertCircle } from 'lucide-react'
import { calculateWaterIntake } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function AguaClientPT() {
  const [peso, setPeso] = useState('')
  const [idade, setIdade] = useState('')
  const [atividade, setAtividade] = useState('')
  const [clima, setClima] = useState('')
  const [resultado, setResultado] = useState<{ agua: number; copos: number; description: string; recommendation: string } | null>(null)
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
      const resultado = calculateWaterIntake(pesoNum, idadeNum, atividade, clima)
      setResultado(resultado)
    } catch {
      setError('Erro ao calcular a ingestão de água. Verifique os valores inseridos.')
    }
  }

  const breadcrumbs = getBreadcrumbs('/pt/saude/agua')

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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Calculadora de Água
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Peso (kg)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex: 70"
                      value={peso}
                      onChange={(e) => setPeso(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Idade (anos)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex: 30"
                      value={idade}
                      onChange={(e) => setIdade(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nível de Atividade
                    </label>
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
                    <label className="block text-sm font-medium mb-2">
                      Clima
                    </label>
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
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Droplets className="h-4 w-4 mr-2" />
                  Calcular Ingestão de Água
                </Button>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {resultado && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Resultado</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-2">
                            {resultado.agua} ml
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            Água por dia
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-2">
                            {resultado.copos} copos
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            Copos de 250ml
                          </div>
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
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}