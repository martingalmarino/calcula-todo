"use client"

import { useState } from 'react'
import { Calculator, Triangle, Info } from 'lucide-react'
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
import { calculateTriangle, calculateTriangleFromSides, type TriangleResult } from '@/lib/math/geometry'

const breadcrumbs = getBreadcrumbsPT('/pt/geometria/triangulo/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área do Triângulo',
  description: 'Calcula a área de um triângulo com base e altura ou usando a fórmula de Herón.',
  url: 'https://www.calculatodo.online/pt/geometria/triangulo/',
  category: 'geometria'
});

export default function TrianguloClientPT() {
  const [method, setMethod] = useState<'base-height' | 'heron'>('base-height');
  const [base, setBase] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [side1, setSide1] = useState<string>('');
  const [side2, setSide2] = useState<string>('');
  const [side3, setSide3] = useState<string>('');
  const [result, setResult] = useState<TriangleResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      let calculation: TriangleResult;
      
      if (method === 'base-height') {
        const baseValue = parseFloat(base);
        const heightValue = parseFloat(height);
        
        if (isNaN(baseValue) || isNaN(heightValue) || baseValue <= 0 || heightValue <= 0) {
          setError('Por favor, insira valores válidos maiores que 0');
          return;
        }

        calculation = calculateTriangle(baseValue, heightValue);
      } else {
        const side1Value = parseFloat(side1);
        const side2Value = parseFloat(side2);
        const side3Value = parseFloat(side3);
        
        if (isNaN(side1Value) || isNaN(side2Value) || isNaN(side3Value) || 
            side1Value <= 0 || side2Value <= 0 || side3Value <= 0) {
          setError('Por favor, insira valores válidos maiores que 0');
          return;
        }

        // Verificar se é um triângulo válido
        if (side1Value + side2Value <= side3Value || 
            side1Value + side3Value <= side2Value || 
            side2Value + side3Value <= side1Value) {
          setError('Os lados não formam um triângulo válido');
          return;
        }

        calculation = calculateTriangleFromSides(side1Value, side2Value, side3Value);
      }

      setResult(calculation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular');
    }
  };

  const handleCopyResult = () => {
    if (result) {
      const text = `Área: ${result.area.toFixed(2)} cm²\nBase: ${result.base.toFixed(2)} cm\nAltura: ${result.height.toFixed(2)} cm`;
      navigator.clipboard.writeText(text);
    }
  };

  const examples = [
    {
      label: 'Exemplo: Base 10 cm, Altura 6 cm',
      values: { method: 'base-height', base: '10', height: '6' }
    },
    {
      label: 'Exemplo: Lados 5, 6, 7 cm',
      values: { method: 'heron', side1: '5', side2: '6', side3: '7' }
    },
    {
      label: 'Exemplo: Base 12 cm, Altura 8 cm',
      values: { method: 'base-height', base: '12', height: '8' }
    }
  ];

  const relatedLinks = [
    { href: '/pt/geometria/circulo', label: 'Área e Perímetro do Círculo' },
    { href: '/pt/geometria/retangulo', label: 'Área e Perímetro do Retângulo' },
    { href: '/pt/geometria/quadrado', label: 'Área e Perímetro do Quadrado' },
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
            title="Calculadora de Área do Triângulo"
            description="Calcula a área de um triângulo com base e altura ou usando a fórmula de Herón"
            examples={examples}
            onExampleClick={(values) => {
              if (values.method) setMethod(values.method as 'base-height' | 'heron');
              if (values.base) setBase(values.base as string);
              if (values.height) setHeight(values.height as string);
              if (values.side1) setSide1(values.side1 as string);
              if (values.side2) setSide2(values.side2 as string);
              if (values.side3) setSide3(values.side3 as string);
            }}
            relatedLinks={relatedLinks}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="method" className="text-base font-medium">Método de Cálculo</Label>
                <Select value={method} onValueChange={(value: 'base-height' | 'heron') => setMethod(value)}>
                  <SelectTrigger className="min-h-[48px] text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base-height">Base e Altura</SelectItem>
                    <SelectItem value="heron">Fórmula de Herón (3 lados)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {method === 'base-height' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="base" className="text-base font-medium">Base (cm)</Label>
                    <Input
                      id="base"
                      type="number"
                      step="0.01"
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                      placeholder="Ex: 10"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-base font-medium">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.01"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Ex: 6"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="side1" className="text-base font-medium">Lado 1 (cm)</Label>
                    <Input
                      id="side1"
                      type="number"
                      step="0.01"
                      value={side1}
                      onChange={(e) => setSide1(e.target.value)}
                      placeholder="Ex: 5"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="side2" className="text-base font-medium">Lado 2 (cm)</Label>
                    <Input
                      id="side2"
                      type="number"
                      step="0.01"
                      value={side2}
                      onChange={(e) => setSide2(e.target.value)}
                      placeholder="Ex: 6"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="side3" className="text-base font-medium">Lado 3 (cm)</Label>
                    <Input
                      id="side3"
                      type="number"
                      step="0.01"
                      value={side3}
                      onChange={(e) => setSide3(e.target.value)}
                      placeholder="Ex: 7"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                </div>
              )}

              <Button 
                onClick={handleCalculate}
                className="w-full min-h-[48px] text-base"
                disabled={
                  method === 'base-height' ? (!base || !height) : (!side1 || !side2 || !side3)
                }
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
                  <CardHeader className="pb-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Triangle className="h-5 w-5 text-purple-600" />
                      </div>
                      Resultados do Triângulo
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
                          <span className="font-medium">Base:</span>
                          <span className="font-bold text-green-600">{result.base.toFixed(2)} cm</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Altura:</span>
                          <span className="font-bold text-purple-600">{result.height.toFixed(2)} cm</span>
                        </div>
                        {result.side1 && result.side2 && result.side3 && (
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">Lados:</span>
                            <span className="font-bold text-orange-600">
                              {result.side1.toFixed(2)}, {result.side2.toFixed(2)}, {result.side3.toFixed(2)} cm
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-purple-900 mb-2">Fórmulas Utilizadas:</h4>
                          <ul className="text-sm text-purple-800 space-y-1">
                            {method === 'base-height' ? (
                              <li>• <strong>Área:</strong> A = ½ × base × altura</li>
                            ) : (
                              <>
                                <li>• <strong>Fórmula de Herón:</strong> A = √[s(s-a)(s-b)(s-c)]</li>
                                <li>• <strong>Semiperímetro:</strong> s = (a + b + c) ÷ 2</li>
                              </>
                            )}
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
