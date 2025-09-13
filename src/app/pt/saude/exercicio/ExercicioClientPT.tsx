"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Dumbbell, Calculator } from 'lucide-react'
import { calculateExercise, type ExerciseResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'

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
      // Mapear tipo de exercício para o formato esperado pela função
      let exerciseType: 'walking' | 'running' | 'cycling' | 'swimming' | 'weightlifting' = 'walking'
      if (exercicio === 'caminhada') exerciseType = 'walking'
      else if (exercicio === 'corrida') exerciseType = 'running'
      else if (exercicio === 'ciclismo') exerciseType = 'cycling'
      else if (exercicio === 'natacao') exerciseType = 'swimming'
      else if (exercicio === 'musculacao') exerciseType = 'weightlifting'
      
      // Mapear intensidade para o formato esperado pela função
      let intensity: 'low' | 'moderate' | 'high' = 'moderate'
      if (intensidade === 'leve') intensity = 'low'
      else if (intensidade === 'moderada') intensity = 'moderate'
      else if (intensidade === 'intensa') intensity = 'high'
      
      const resultado = calculateExercise(pesoNum, duracaoNum, exerciseType, intensity, 'pt')
      setResultado(resultado)
    } catch {
      setError('Erro ao calcular as calorias queimadas. Verifique os valores inseridos.')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Saúde', href: '/pt/saude/' },
    { label: 'Exercício', href: '/pt/saude/exercicio/' }
  ]

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
        <BreadcrumbsPT items={breadcrumbs} />
        
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
                  <Label htmlFor="duracao">Duração (minutos)</Label>
                  <Input
                    id="duracao"
                    type="number"
                    value={duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                    placeholder="Ex: 30"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exercicio">Tipo de Exercício</Label>
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
                  <Label htmlFor="intensidade">Intensidade</Label>
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
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Calorias Queimadas
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center gap-2">
                      <Dumbbell className="h-5 w-5" />
                      Resultado do Exercício
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Dumbbell className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Calorias Queimadas</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{resultado.caloriesBurned} kcal</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Dumbbell className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Duração</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{resultado.duration} min</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Intensidade:</strong> {resultado.intensity}
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