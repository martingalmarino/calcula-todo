"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dumbbell, Calculator, Info, Flame } from 'lucide-react'
import { calculateExercise, type ExerciseResult } from '@/lib/math/health'

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
    const duracaoNum = parseInt(duracao)

    if (isNaN(pesoNum) || isNaN(duracaoNum)) {
      setError('Por favor, insira valores válidos para peso e duração.')
      return;
    }

    if (pesoNum <= 0 || duracaoNum <= 0) {
      setError('O peso e a duração devem ser valores positivos.')
      return;
    }

    if (pesoNum > 300) {
      setError('O peso deve ser menor que 300kg.')
      return;
    }

    if (duracaoNum > 480) {
      setError('A duração deve ser menor que 480 minutos (8 horas).')
      return;
    }

    if (!exercicio) {
      setError('Por favor, selecione o tipo de exercício.')
      return;
    }

    if (!intensidade) {
      setError('Por favor, selecione a intensidade.')
      return;
    }

    try {
      const resultado = calculateExercise(
        pesoNum, 
        duracaoNum, 
        exercicio as 'walking' | 'running' | 'cycling' | 'swimming' | 'weightlifting', 
        intensidade as 'low' | 'moderate' | 'high', 
        'pt'
      );
      setResultado(resultado);
    } catch {
      setError('Erro ao calcular as calorias queimadas. Verifique os valores inseridos.');
    }
  };

  const handleExampleClick = (values: Record<string, unknown>) => {
    setPeso(values.peso as string);
    setDuracao(values.duracao as string);
    setExercicio(values.exercicio as string);
    setIntensidade(values.intensidade as string);
    setResultado(null);
    setError(null);
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'Baixa':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Moderada':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Alta':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="calculator-card shadow-lg">
        <CardHeader className="pb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Dumbbell className="h-5 w-5 text-blue-600" />
            </div>
            Calculadora de Exercício
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Insira os dados do seu exercício para calcular as calorias queimadas
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="peso" className="text-base font-medium">
                Peso (kg)
              </Label>
              <Input
                id="peso"
                type="number"
                placeholder="Ex: 70"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="text-lg p-4"
                min="1"
                max="300"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duracao" className="text-base font-medium">
                Duração (minutos)
              </Label>
              <Input
                id="duracao"
                type="number"
                placeholder="Ex: 30"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                className="text-lg p-4"
                min="1"
                max="480"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exercicio" className="text-base font-medium">
                Tipo de Exercício
              </Label>
              <Select value={exercicio} onValueChange={setExercicio}>
                <SelectTrigger className="text-lg p-4">
                  <SelectValue placeholder="Selecione o exercício" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walking">Caminhada</SelectItem>
                  <SelectItem value="running">Corrida</SelectItem>
                  <SelectItem value="cycling">Ciclismo</SelectItem>
                  <SelectItem value="swimming">Natação</SelectItem>
                  <SelectItem value="weightlifting">Musculação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="intensidade" className="text-base font-medium">
                Intensidade
              </Label>
              <Select value={intensidade} onValueChange={setIntensidade}>
                <SelectTrigger className="text-lg p-4">
                  <SelectValue placeholder="Selecione a intensidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="moderate">Moderada</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleCalculate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={!peso || !duracao || !exercicio || !intensidade}
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calcular Calorias Queimadas
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {resultado && (
        <Card className="calculator-card shadow-lg border-2 border-blue-200">
          <CardHeader className="pb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl text-green-800">
              <div className="p-2 bg-green-100 rounded-lg">
                <Dumbbell className="h-5 w-5 text-green-600" />
              </div>
              Resultado do Exercício
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {resultado.caloriesBurned}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Calorias Queimadas
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Durante o exercício
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {resultado.duration} min
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Duração
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Tempo de exercício
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className={`text-2xl font-bold mb-2 px-4 py-2 rounded-lg border-2 ${getIntensityColor(resultado.intensity)}`}>
                  {resultado.intensity}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Intensidade
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Nível de esforço
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Recomendações</h4>
                  <ul className="space-y-1 text-green-700">
                    {resultado.recommendations.map((rec, index) => (
                      <li key={index}>• {rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Section */}
      <Card className="calculator-card shadow-lg">
        <CardHeader className="pb-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Info className="h-5 w-5 text-purple-600" />
            </div>
            Sobre o Exercício e Calorias
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 text-gray-700">
            <p>
              O <strong>exercício físico</strong> é essencial para a saúde e bem-estar. 
              Calcular as calorias queimadas ajuda a planejar sua dieta e acompanhar seu progresso.
            </p>
            <p>
              <strong>METs (Metabolic Equivalent of Task):</strong> É uma medida da intensidade do exercício. 
              1 MET equivale ao gasto energético em repouso.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Tipos de Exercício:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• <strong>Caminhada:</strong> Exercício de baixo impacto</li>
                  <li>• <strong>Corrida:</strong> Exercício cardiovascular intenso</li>
                  <li>• <strong>Ciclismo:</strong> Exercício de resistência</li>
                  <li>• <strong>Natação:</strong> Exercício de corpo inteiro</li>
                  <li>• <strong>Musculação:</strong> Exercício de força</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Benefícios do Exercício:</h4>
                <ul className="space-y-1 text-green-700">
                  <li>• Queima calorias e gordura</li>
                  <li>• Fortalece músculos e ossos</li>
                  <li>• Melhora a saúde cardiovascular</li>
                  <li>• Reduz o estresse e ansiedade</li>
                  <li>• Melhora a qualidade do sono</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
