"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Flame, Calculator, Info } from 'lucide-react'
import { calculateCalories, type CaloriesResult } from '@/lib/math/health'

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
      return;
    }

    if (pesoNum <= 0 || alturaNum <= 0 || idadeNum <= 0) {
      setError('Todos os valores devem ser positivos.')
      return;
    }

    if (pesoNum > 300) {
      setError('O peso deve ser menor que 300kg.')
      return;
    }

    if (alturaNum < 100 || alturaNum > 250) {
      setError('A altura deve estar entre 100cm e 250cm.')
      return;
    }

    if (idadeNum < 10 || idadeNum > 120) {
      setError('A idade deve estar entre 10 e 120 anos.')
      return;
    }

    if (!sexo) {
      setError('Por favor, selecione o sexo.')
      return;
    }

    if (!atividade) {
      setError('Por favor, selecione o nível de atividade.')
      return;
    }

    try {
      const resultado = calculateCalories(
        pesoNum, 
        alturaNum, 
        idadeNum, 
        sexo as 'male' | 'female', 
        atividade as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active', 
        'pt'
      );
      setResultado(resultado);
    } catch {
      setError('Erro ao calcular as calorias. Verifique os valores inseridos.');
    }
  };

  const handleExampleClick = (values: Record<string, unknown>) => {
    setPeso(values.peso as string);
    setAltura(values.altura as string);
    setIdade(values.idade as string);
    setSexo(values.sexo as string);
    setAtividade(values.atividade as string);
    setResultado(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="calculator-card shadow-lg">
        <CardHeader className="pb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Flame className="h-5 w-5 text-blue-600" />
            </div>
            Calculadora de Calorias
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Insira seus dados para calcular suas necessidades calóricas diárias
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
              <Label htmlFor="altura" className="text-base font-medium">
                Altura (cm)
              </Label>
              <Input
                id="altura"
                type="number"
                placeholder="Ex: 175"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                className="text-lg p-4"
                min="100"
                max="250"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idade" className="text-base font-medium">
                Idade (anos)
              </Label>
              <Input
                id="idade"
                type="number"
                placeholder="Ex: 30"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className="text-lg p-4"
                min="10"
                max="120"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sexo" className="text-base font-medium">
                Sexo
              </Label>
              <Select value={sexo} onValueChange={setSexo}>
                <SelectTrigger className="text-lg p-4">
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="atividade" className="text-base font-medium">
                Nível de Atividade
              </Label>
              <Select value={atividade} onValueChange={setAtividade}>
                <SelectTrigger className="text-lg p-4">
                  <SelectValue placeholder="Selecione seu nível de atividade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentário (pouco ou nenhum exercício)</SelectItem>
                  <SelectItem value="light">Leve (exercício leve 1-3 dias/semana)</SelectItem>
                  <SelectItem value="moderate">Moderado (exercício moderado 3-5 dias/semana)</SelectItem>
                  <SelectItem value="active">Ativo (exercício intenso 6-7 dias/semana)</SelectItem>
                  <SelectItem value="very_active">Muito ativo (exercício muito intenso, trabalho físico)</SelectItem>
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
            disabled={!peso || !altura || !idade || !sexo || !atividade}
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calcular Calorias
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {resultado && (
        <Card className="calculator-card shadow-lg border-2 border-blue-200">
          <CardHeader className="pb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl text-green-800">
              <div className="p-2 bg-green-100 rounded-lg">
                <Flame className="h-5 w-5 text-green-600" />
              </div>
              Resultado das Calorias
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {resultado.tmb}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  TMB (calorias/dia)
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Taxa Metabólica Basal
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {resultado.totalCalories}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Calorias Totais (calorias/dia)
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Incluindo atividade física
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Nível de Atividade</h4>
                  <p className="text-blue-700">{resultado.activityLevel}</p>
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
            Sobre as Calorias
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 text-gray-700">
            <p>
              As <strong>calorias</strong> são uma medida de energia. Seu corpo precisa de calorias 
              para manter funções básicas e realizar atividades físicas.
            </p>
            <p>
              <strong>TMB (Taxa Metabólica Basal):</strong> É a quantidade de calorias que seu corpo 
              queima em repouso para manter funções vitais como respiração, circulação e digestão.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Níveis de Atividade:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• <strong>Sedentário:</strong> Pouco ou nenhum exercício</li>
                  <li>• <strong>Leve:</strong> Exercício leve 1-3 dias/semana</li>
                  <li>• <strong>Moderado:</strong> Exercício moderado 3-5 dias/semana</li>
                  <li>• <strong>Ativo:</strong> Exercício intenso 6-7 dias/semana</li>
                  <li>• <strong>Muito ativo:</strong> Exercício muito intenso</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Dicas Importantes:</h4>
                <ul className="space-y-1 text-green-700">
                  <li>• Para perder peso: consuma menos calorias</li>
                  <li>• Para ganhar peso: consuma mais calorias</li>
                  <li>• Mantenha uma dieta equilibrada</li>
                  <li>• Consulte um nutricionista</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
