"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Activity, Calculator, Info } from 'lucide-react'
import { calculateIMC, type IMCResult } from '@/lib/math/health'

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
      return;
    }

    if (pesoNum <= 0 || alturaNum <= 0) {
      setError('O peso e a altura devem ser valores positivos.')
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

    try {
      const resultado = calculateIMC(pesoNum, alturaNum, 'pt');
      setResultado(resultado);
    } catch {
      setError('Erro ao calcular o IMC. Verifique os valores inseridos.');
    }
  };

  const handleExampleClick = (values: Record<string, unknown>) => {
    setPeso(values.peso as string);
    setAltura(values.altura as string);
    setResultado(null);
    setError(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Abaixo do peso':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Peso normal':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Sobrepeso':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Obesidade':
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
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            Calculadora de IMC
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Insira seu peso e altura para calcular seu Índice de Massa Corporal
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
            disabled={!peso || !altura}
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calcular IMC
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {resultado && (
        <Card className="calculator-card shadow-lg border-2 border-blue-200">
          <CardHeader className="pb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl text-green-800">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              Resultado do IMC
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {resultado.imc}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  IMC
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className={`text-2xl font-bold mb-2 px-4 py-2 rounded-lg border-2 ${getCategoryColor(resultado.category)}`}>
                  {resultado.category}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Categoria
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Descrição</h4>
                    <p className="text-blue-700">{resultado.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Recomendação</h4>
                    <p className="text-green-700">{resultado.recommendation}</p>
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
            Sobre o IMC
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 text-gray-700">
            <p>
              O <strong>Índice de Massa Corporal (IMC)</strong> é uma medida que relaciona peso e altura 
              para avaliar se uma pessoa está com peso adequado para sua altura.
            </p>
            <p>
              <strong>Fórmula:</strong> IMC = peso (kg) ÷ altura (m)²
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Categorias de IMC:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• <strong>Abaixo do peso:</strong> IMC < 18.5</li>
                  <li>• <strong>Peso normal:</strong> IMC 18.5 - 24.9</li>
                  <li>• <strong>Sobrepeso:</strong> IMC 25 - 29.9</li>
                  <li>• <strong>Obesidade:</strong> IMC ≥ 30</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Importante:</h4>
                <ul className="space-y-1 text-green-700">
                  <li>• O IMC é uma ferramenta de triagem</li>
                  <li>• Não considera massa muscular</li>
                  <li>• Consulte um médico para avaliação completa</li>
                  <li>• Varia com idade e sexo</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
