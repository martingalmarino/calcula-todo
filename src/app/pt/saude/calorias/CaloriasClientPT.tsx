"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Flame, AlertCircle } from 'lucide-react'
import { calculateCalories, type CaloriesResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function CaloriasClientPT() {
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [idade, setIdade] = useState('')
  const [sexo, setSexo] = useState('')
  const [atividade, setAtividade] = useState('')
  const [resultado, setResultado] = useState<CaloriesResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const pesoNum = parseFloat(peso)
    const alturaNum = parseFloat(altura)
    const idadeNum = parseInt(idade)

    if (isNaN(pesoNum) || isNaN(alturaNum) || isNaN(idadeNum)) {
      setError('Por favor, insira valores válidos para todos os campos.')
      return
    }

    if (pesoNum <= 0 || alturaNum <= 0 || idadeNum <= 0) {
      setError('Todos os valores devem ser positivos.')
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

    if (idadeNum < 10 || idadeNum > 120) {
      setError('A idade deve estar entre 10 e 120 anos.')
      return
    }

    if (!sexo || !atividade) {
      setError('Por favor, selecione o sexo e o nível de atividade.')
      return
    }

    try {
      // Mapear sexo para o formato esperado pela função
      const gender = sexo === 'masculino' ? 'male' : 'female'
      
      // Mapear atividade para o formato esperado pela função
      let activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' = 'moderate'
      if (atividade === 'sedentario') activityLevel = 'sedentary'
      else if (atividade === 'leve') activityLevel = 'light'
      else if (atividade === 'moderado') activityLevel = 'moderate'
      else if (atividade === 'intenso') activityLevel = 'active'
      else if (atividade === 'extremo') activityLevel = 'very_active'
      
      const resultado = calculateCalories(pesoNum, alturaNum, idadeNum, gender, activityLevel, 'pt')
      setResultado(resultado)
    } catch {
      setError('Erro ao calcular as calorias. Verifique os valores inseridos.')
    }
  }

  const breadcrumbs = getBreadcrumbs('/pt/saude/calorias')

  const examples = [
    {
      label: 'Exemplo: Homem de 30 anos, 70kg, 175cm, moderadamente ativo',
      values: { peso: '70', altura: '175', idade: '30', sexo: 'masculino', atividade: 'moderado' }
    },
    {
      label: 'Exemplo: Mulher de 25 anos, 60kg, 165cm, sedentária',
      values: { peso: '60', altura: '165', idade: '25', sexo: 'feminino', atividade: 'sedentario' }
    }
  ]

  const faqItems = [
    {
      question: 'O que é TMB?',
      answer: 'A Taxa Metabólica Basal (TMB) é a quantidade mínima de calorias que seu corpo precisa para funcionar em repouso.'
    },
    {
      question: 'Como é calculada a TMB?',
      answer: 'Utilizamos a fórmula de Mifflin-St Jeor, que considera peso, altura, idade e sexo para calcular a TMB.'
    },
    {
      question: 'O que são os níveis de atividade?',
      answer: 'Os níveis de atividade determinam quantas calorias extras você precisa além da TMB baseado em seu estilo de vida.'
    },
    {
      question: 'Posso usar essas calorias para perder peso?',
      answer: 'Para perder peso, consuma menos calorias do que o total calculado. Para ganhar peso, consuma mais calorias.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Calorias',
            description: 'Calcule suas necessidades calóricas diárias baseadas em seu estilo de vida',
            url: '/pt/saude/calorias/',
            category: 'Saúde'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Calorias"
            description="Calcule suas necessidades calóricas diárias baseadas em seu estilo de vida"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setPeso(values.peso as string)
              setAltura(values.altura as string)
              setIdade(values.idade as string)
              setSexo(values.sexo as string)
              setAtividade(values.atividade as string)
            }}
          >
            <div className="grid gap-4">
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
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
              
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
                    <SelectItem value="extremo">Extremamente ativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Flame className="h-4 w-4" />
                  Calcular Calorias
                </Button>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {resultado && (
                <Card className="mt-4 bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center gap-2">
                      <Flame className="h-5 w-5" />
                      Resultado das Calorias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-2">
                          {resultado.tmb} kcal
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          TMB (Taxa Metabólica Basal)
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600 mb-2">
                          {resultado.totalCalories} kcal
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          Calorias Totais Diárias
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Nível de atividade:</strong> {resultado.activityLevel}
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