"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Target, Calculator, Info } from 'lucide-react'
import { calculateIdealWeight, type IdealWeightResult } from '@/lib/math/health'

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
      return;
    }

    if (alturaNum <= 0) {
      setError('A altura deve ser um valor positivo.')
      return;
    }

    if (alturaNum < 100 || alturaNum > 250) {
      setError('A altura deve estar entre 100cm e 250cm.')
      return;
    }

    if (!sexo) {
      setError('Por favor, selecione o sexo.')
      return;
    }

    try {
      const resultado = calculateIdealWeight(alturaNum, sexo as 'male' | 'female', 'pt');
      setResultado(resultado);
    } catch {
      setError('Erro ao calcular o peso ideal. Verifique os valores inseridos.');
    }
  };

  const handleExampleClick = (values: Record<string, unknown>) => {
    setAltura(values.altura as string);
    setSexo(values.sexo as string);
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
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            Calculadora de Peso Ideal
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Insira sua altura e sexo para calcular seu peso ideal
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            disabled={!altura || !sexo}
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calcular Peso Ideal
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {resultado && (
        <Card className="calculator-card shadow-lg border-2 border-blue-200">
          <CardHeader className="pb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl text-green-800">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              Resultado do Peso Ideal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {resultado.idealWeight} kg
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Peso Ideal
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {resultado.range.min} kg
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Mínimo
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {resultado.range.max} kg
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Máximo
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Método Utilizado</h4>
                    <p className="text-blue-700">{resultado.method}</p>
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
            Sobre o Peso Ideal
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 text-gray-700">
            <p>
              O <strong>peso ideal</strong> é uma estimativa do peso corporal considerado saudável 
              para uma determinada altura e sexo, baseado em fórmulas matemáticas.
            </p>
            <p>
              <strong>Fórmula de Devine:</strong> Esta calculadora usa a fórmula de Devine, 
              que é amplamente utilizada na prática médica.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Fatores Considerados:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Altura em centímetros</li>
                  <li>• Sexo (masculino/feminino)</li>
                  <li>• Fórmula de Devine</li>
                  <li>• Faixa de peso saudável</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Importante:</h4>
                <ul className="space-y-1 text-green-700">
                  <li>• É apenas uma estimativa</li>
                  <li>• Não considera massa muscular</li>
                  <li>• Varia com idade e atividade</li>
                  <li>• Consulte um profissional</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
