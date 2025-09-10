"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Moon, Calculator, Info, Clock } from 'lucide-react'
import { calculateSleep, type SleepResult } from '@/lib/math/health'

export default function SonoClientPT() {
  const [horarioDespertar, setHorarioDespertar] = useState('')
  const [resultado, setResultado] = useState<SleepResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResultado(null)

    if (!horarioDespertar) {
      setError('Por favor, insira o horário de despertar.')
      return;
    }

    // Validar formato de hora
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(horarioDespertar)) {
      setError('Por favor, insira um horário válido no formato HH:MM (ex: 07:00).')
      return;
    }

    try {
      const resultado = calculateSleep(horarioDespertar, 'pt');
      setResultado(resultado);
    } catch {
      setError('Erro ao calcular os ciclos de sono. Verifique o horário inserido.');
    }
  };

  const handleExampleClick = (values: Record<string, unknown>) => {
    setHorarioDespertar(values.horarioDespertar as string);
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
              <Moon className="h-5 w-5 text-blue-600" />
            </div>
            Calculadora de Sono
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Insira o horário que deseja acordar para calcular quando deve dormir
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="horarioDespertar" className="text-base font-medium">
                Horário de Despertar
              </Label>
              <Input
                id="horarioDespertar"
                type="time"
                value={horarioDespertar}
                onChange={(e) => setHorarioDespertar(e.target.value)}
                className="text-lg p-4 text-center"
              />
              <p className="text-sm text-gray-500 text-center">
                Formato: HH:MM (ex: 07:00)
              </p>
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
            disabled={!horarioDespertar}
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calcular Ciclos de Sono
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {resultado && (
        <Card className="calculator-card shadow-lg border-2 border-blue-200">
          <CardHeader className="pb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl text-green-800">
              <div className="p-2 bg-green-100 rounded-lg">
                <Moon className="h-5 w-5 text-green-600" />
              </div>
              Resultado dos Ciclos de Sono
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {resultado.sleepCycles}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Ciclos de Sono
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  (7.5 horas)
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {resultado.bedTime}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Horário para Dormir
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Para acordar às {resultado.wakeUpTime}
                </div>
              </div>
              <div className="text-center p-6 bg-white rounded-lg border-2 border-gray-100">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {resultado.wakeUpTime}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Horário de Despertar
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Horário desejado
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Informação Importante</h4>
                  <p className="text-blue-700">
                    Cada ciclo de sono dura aproximadamente 90 minutos. Acordar no final de um ciclo 
                    (como às {resultado.wakeUpTime}) proporciona um despertar mais natural e energético.
                  </p>
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
            Sobre os Ciclos de Sono
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 text-gray-700">
            <p>
              O <strong>sono</strong> é composto por ciclos que se repetem durante a noite. 
              Cada ciclo dura aproximadamente 90 minutos e inclui diferentes fases do sono.
            </p>
            <p>
              <strong>Fases do sono:</strong> Sono leve → Sono profundo → Sono REM (movimento rápido dos olhos). 
              Completar ciclos inteiros proporciona um descanso mais eficiente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Benefícios de Dormir Bem:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Melhora a memória e concentração</li>
                  <li>• Fortalece o sistema imunológico</li>
                  <li>• Regula o humor e emoções</li>
                  <li>• Promove a recuperação muscular</li>
                  <li>• Reduz o risco de doenças</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Dicas para Melhor Sono:</h4>
                <ul className="space-y-1 text-green-700">
                  <li>• Mantenha horários regulares</li>
                  <li>• Evite telas 1 hora antes de dormir</li>
                  <li>• Crie um ambiente escuro e silencioso</li>
                  <li>• Evite cafeína à tarde</li>
                  <li>• Pratique exercícios regularmente</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
