"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dumbbell, AlertCircle } from 'lucide-react'
import { calculateExercise, type ExerciseResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function ExercicioClientPT() {
  const [peso, setPeso] = useState('')
  const [duracao, setDuracao] = useState('')
  const [exercicio, setExercicio] = useState('')
  const [intensidade, setIntensidade] = useState('')
  const [resultado, setResultado] = useState<ExerciseResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const pesoNum = parseFloat(peso)
    const duracaoNum = parseFloat(duracao)

    if (isNaN(pesoNum) || isNaN(duracaoNum)) {
      setError('Por favor, insira valores válidos para peso e duração.')
      return
    }

    if (pesoNum <= 0 || duracaoNum <= 0) {
      setError('O peso e a duração devem ser valores positivos.')
      return
    }

    if (pesoNum > 300) {
      setError('O peso deve ser menor que 300kg.')
      return
    }

    if (duracaoNum > 480) {
      setError('A duração deve ser menor que 480 minutos (8 horas).')
      return
    }

    if (!exercicio || !intensidade) {
      setError('Por favor, selecione o exercício e a intensidade.')
      return
    }

    try {
      const resultado = calculateExercise(pesoNum, duracaoNum, exercicio, intensidade, 'pt')
      setResultado(resultado)
    } catch {
      setError('Erro ao calcular as calorias queimadas. Verifique os valores inseridos.')
    }
  }

  const breadcrumbs = getBreadcrumbs('/pt/saude/exercicio')

  const examples = [
    {
      label: 'Exemplo: 70kg, 30 min, corrida, intensidade moderada',
      values: { peso: '70', duracao: '30', exercicio: 'corrida', intensidade: 'moderada' }
    },
    {
      label: 'Exemplo: 60kg, 45 min, caminhada, intensidade leve',
      values: { peso: '60', duracao: '45', exercicio: 'caminhada', intensidade: 'leve' }
    }
  ]

  const faqItems = [
    {
      question: 'Como são calculadas as calorias queimadas?',
      answer: 'Utilizamos valores MET (Metabolic Equivalent of Task) baseados em estudos científicos para diferentes tipos de exercícios.'
    },
    {
      question: 'O que são valores MET?',
      answer: 'MET é uma medida que indica quantas vezes mais energia você gasta durante uma atividade comparado ao repouso.'
    },
    {
      question: 'A intensidade afeta muito o resultado?',
      answer: 'Sim, a intensidade do exercício tem grande impacto nas calorias queimadas. Exercícios mais intensos queimam mais calorias.'
    },
    {
      question: 'Posso confiar nesses cálculos?',
      answer: 'Os cálculos são baseados em médias científicas, mas podem variar conforme condicionamento físico, técnica e outros fatores individuais.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Exercício',
            description: 'Calcule calorias queimadas e intensidade de exercícios',
            url: '/pt/saude/exercicio/',
            category: 'Saúde'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Exercício"
            description="Calcule calorias queimadas e intensidade de exercícios"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setPeso(values.peso as string)
              setDuracao(values.duracao as string)
              setExercicio(values.exercicio as string)
              setIntensidade(values.intensidade as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5" />
                  Calculadora de Exercício
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
                      Duração (minutos)
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex: 30"
                      value={duracao}
                      onChange={(e) => setDuracao(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tipo de Exercício
                    </label>
                    <Select value={exercicio} onValueChange={setExercicio}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o exercício" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="caminhada">Caminhada</SelectItem>
                        <SelectItem value="corrida">Corrida</SelectItem>
                        <SelectItem value="ciclismo">Ciclismo</SelectItem>
                        <SelectItem value="natacao">Natação</SelectItem>
                        <SelectItem value="musculacao">Musculação</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="danca">Dança</SelectItem>
                        <SelectItem value="futebol">Futebol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Intensidade
                    </label>
                    <Select value={intensidade} onValueChange={setIntensidade}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a intensidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leve">Leve</SelectItem>
                        <SelectItem value="moderada">Moderada</SelectItem>
                        <SelectItem value="intensa">Intensa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Calcular Calorias Queimadas
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
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                          {resultado.caloriasQueimadas} kcal
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          Calorias Queimadas
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          <strong>Exercício:</strong> {resultado.exercicio}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Intensidade:</strong> {resultado.intensidade}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Duração:</strong> {resultado.duracao} minutos
                        </p>
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