"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Droplets, Calculator, Info } from 'lucide-react'
import { calculateWaterIntake, type WaterIntakeResult } from '@/lib/math/health'

export default function AguaClientPT() {
  const [peso, setPeso] = useState('')
  const [idade, setIdade] = useState('')
  const [atividade, setAtividade] = useState('')
  const [resultado, setResultado] = useState<WaterIntakeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    const pesoNum = parseFloat(peso)
    const idadeNum = parseInt(idade)

    if (isNaN(pesoNum) || isNaN(idadeNum)) {
      setError('Por favor, insira valores válidos para peso e idade.')
      return;
    }

    if (pesoNum <= 0 || idadeNum <= 0) {
      setError('O peso e a idade devem ser valores positivos.')
      return;
    }

    if (pesoNum > 300) {
      setError('O peso deve ser menor que 300kg.')
      return;
    }

    if (idadeNum < 1 || idadeNum > 120) {
      setError('A idade deve estar entre 1 e 120 anos.')
      return;
    }

    if (!atividade) {
      setError('Por favor, selecione o nível de atividade.')
      return;
    }

    try {
      const resultado = calculateWaterIntake(pesoNum, idadeNum, atividade as 'low' | 'moderate' | 'high');
      setResultado(resultado);
    } catch {
      setError('Erro ao calcular a ingestão de água. Verifique os valores inseridos.');
    }
  };

  const handleExampleClick = (values: Record<string, unknown>) => {
    setPeso(values.peso as string);
    setIdade(values.idade as string);
    setAtividade(values.atividade as string);
    setResultado(null);
    setError(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Baixa':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Moderada':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Alta':
        return 'text-orange-600 bg-orange-50 border-orange-200';
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
              <Droplets className="h-5 w-5 text-blue-600" />
            </div>
            Calculadora de Água
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Insira seus dados para calcular sua ingestão diária recomendada de água
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                min="1"
                max="120"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="atividade" className="text-base font-medium">
                Nível de Atividade
              </Label>
              <Select value={atividade} onValueChange={setAtividade}>
                <SelectTrigger className="text-lg p-4">
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixo (sedentário)</SelectItem>
                  <SelectItem value="moderate">Moderado (atividade regular)</SelectItem>
                  <SelectItem value="high">Alto (atividade intensa)</SelectItem>
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
            disabled={!peso || !idade || !atividade}
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calcular Ingestão de Água
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {resultado && (
        <Card className="calculator-card shadow-lg border-2 border-blue-200">
          <CardHeader className="pb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl text-green-800">
              <div className="p-2 bg-green-100 rounded-lg">
                <Droplets className="h-5 w-5 text-green-600" />
              </div>
              Resultado da Ingestão de Água
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {resultado.dailyWater} ml
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Água por Dia
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {resultado.glasses}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Copos (250ml)
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {resultado.bottles}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Garrafas (500ml)
                </div>
              </div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className={`text-xl font-bold px-4 py-2 rounded-lg border-2 inline-block ${getCategoryColor(resultado.category)}`}>
                Ingestão {resultado.category}
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
            Sobre a Hidratação
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 text-gray-700">
            <p>
              A <strong>hidratação</strong> é fundamental para o funcionamento adequado do corpo. 
              A água representa cerca de 60% do peso corporal em adultos.
            </p>
            <p>
              <strong>Fórmula utilizada:</strong> 35ml de água por kg de peso corporal, 
              com ajustes para idade e nível de atividade física.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Benefícios da Hidratação:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Regula a temperatura corporal</li>
                  <li>• Transporta nutrientes</li>
                  <li>• Elimina toxinas</li>
                  <li>• Lubrifica articulações</li>
                  <li>• Melhora a função cerebral</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Sinais de Desidratação:</h4>
                <ul className="space-y-1 text-green-700">
                  <li>• Sede excessiva</li>
                  <li>• Urina escura</li>
                  <li>• Fadiga</li>
                  <li>• Tontura</li>
                  <li>• Pele seca</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
