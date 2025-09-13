"use client"

import { useState } from 'react'
import { Calculator, Circle, Info } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsPT } from '@/lib/breadcrumbs-pt'
import { calculateCircle, calculateCircleFromDiameter, calculateCircleFromArea, type CircleResult } from '@/lib/math/geometry'

const breadcrumbs = getBreadcrumbsPT('/pt/geometria/circulo/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área e Perímetro do Círculo',
  description: 'Calcula a área, perímetro, diâmetro e raio de um círculo com fórmulas precisas.',
  url: 'https://www.calculatodo.online/pt/geometria/circulo/',
  category: 'geometria'
});

export default function CirculoClientPT() {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputType, setInputType] = useState<'radius' | 'diameter' | 'area'>('radius');
  const [result, setResult] = useState<CircleResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const value = parseFloat(inputValue);
      
      if (isNaN(value) || value <= 0) {
        setError('Por favor, insira um valor válido maior que 0');
        return;
      }

      let calculation: CircleResult;
      
      switch (inputType) {
        case 'radius':
          calculation = calculateCircle(value);
          break;
        case 'diameter':
          calculation = calculateCircleFromDiameter(value);
          break;
        case 'area':
          calculation = calculateCircleFromArea(value);
          break;
        default:
          throw new Error('Tipo de entrada inválido');
      }

      setResult(calculation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular');
    }
  };

  const handleCopyResult = () => {
    if (result) {
      const text = `Área: ${result.area.toFixed(2)} cm²\nPerímetro: ${result.circumference.toFixed(2)} cm\nRaio: ${result.radius.toFixed(2)} cm\nDiâmetro: ${result.diameter.toFixed(2)} cm`;
      navigator.clipboard.writeText(text);
    }
  };

  const examples = [
    {
      label: 'Exemplo: Raio de 5 cm',
      values: { inputValue: '5', inputType: 'radius' }
    },
    {
      label: 'Exemplo: Diâmetro de 10 cm',
      values: { inputValue: '10', inputType: 'diameter' }
    },
    {
      label: 'Exemplo: Área de 78.54 cm²',
      values: { inputValue: '78.54', inputType: 'area' }
    }
  ];

  const relatedLinks = [
    { href: '/pt/geometria/retangulo', label: 'Área e Perímetro do Retângulo' },
    { href: '/pt/geometria/quadrado', label: 'Área e Perímetro do Quadrado' },
    { href: '/pt/geometria/triangulo', label: 'Área do Triângulo' },
    { href: '/pt/geometria/losango', label: 'Área e Perímetro do Losango' },
    { href: '/pt/geometria/trapezio', label: 'Área do Trapézio' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Container>
        <div className="py-8">
          <BreadcrumbsPT items={breadcrumbs} />
          
          <CalculatorLayout
            title="Calculadora de Área e Perímetro do Círculo"
            description="Calcula a área, perímetro, diâmetro e raio de um círculo com fórmulas precisas"
            examples={examples}
            onExampleClick={(values) => {
              if (values.inputValue) setInputValue(values.inputValue as string);
              if (values.inputType) setInputType(values.inputType as 'radius' | 'diameter' | 'area');
            }}
            relatedLinks={relatedLinks}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inputType" className="text-base font-medium">Tipo de Entrada</Label>
                  <Select value={inputType} onValueChange={(value: 'radius' | 'diameter' | 'area') => setInputType(value)}>
                    <SelectTrigger className="min-h-[48px] text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="radius">Raio</SelectItem>
                      <SelectItem value="diameter">Diâmetro</SelectItem>
                      <SelectItem value="area">Área</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inputValue" className="text-base font-medium">
                    {inputType === 'radius' ? 'Raio (cm)' : 
                     inputType === 'diameter' ? 'Diâmetro (cm)' : 
                     'Área (cm²)'}
                  </Label>
                  <Input
                    id="inputValue"
                    type="number"
                    step="0.01"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={inputType === 'radius' ? 'Ex: 5' : 
                                 inputType === 'diameter' ? 'Ex: 10' : 
                                 'Ex: 78.54'}
                    className="min-h-[48px] text-base"
                  />
                </div>
              </div>

              <Button 
                onClick={handleCalculate}
                className="w-full min-h-[48px] text-base"
                disabled={!inputValue}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calcular
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {result && (
                <Card className="calculator-card shadow-lg">
                  <CardHeader className="pb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Circle className="h-5 w-5 text-blue-600" />
                      </div>
                      Resultados do Círculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Área:</span>
                          <span className="font-bold text-blue-600">{result.area.toFixed(2)} cm²</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Perímetro:</span>
                          <span className="font-bold text-green-600">{result.circumference.toFixed(2)} cm</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Raio:</span>
                          <span className="font-bold text-purple-600">{result.radius.toFixed(2)} cm</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Diâmetro:</span>
                          <span className="font-bold text-orange-600">{result.diameter.toFixed(2)} cm</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2">Fórmulas Utilizadas:</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• <strong>Área:</strong> A = π × r²</li>
                            <li>• <strong>Perímetro:</strong> P = 2 × π × r</li>
                            <li>• <strong>Diâmetro:</strong> d = 2 × r</li>
                            <li>• <strong>Raio:</strong> r = d ÷ 2</li>
                          </ul>
                        </div>
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
