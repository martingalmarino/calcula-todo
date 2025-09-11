"use client"

import { useState } from 'react'
import { Calculator, Diamond, Info } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'
import { calculateRhombus, calculateRhombusFromSideAndDiagonal, type RhombusResult } from '@/lib/math/geometry'

const breadcrumbs = getBreadcrumbs('/pt/geometria/losango/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área e Perímetro do Losango',
  description: 'Calcula a área e perímetro de um losango conhecendo suas diagonais ou lado e diagonal.',
  url: 'https://www.calculatodo.online/pt/geometria/losango/',
  category: 'geometria'
});

export default function LosangoClientPT() {
  const [method, setMethod] = useState<'diagonals' | 'side-diagonal'>('diagonals');
  const [diagonal1, setDiagonal1] = useState<string>('');
  const [diagonal2, setDiagonal2] = useState<string>('');
  const [side, setSide] = useState<string>('');
  const [diagonal, setDiagonal] = useState<string>('');
  const [result, setResult] = useState<RhombusResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      let calculation: RhombusResult;
      
      if (method === 'diagonals') {
        const d1 = parseFloat(diagonal1);
        const d2 = parseFloat(diagonal2);
        
        if (isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) {
          setError('Por favor, insira valores válidos maiores que 0');
          return;
        }

        calculation = calculateRhombus(d1, d2);
      } else {
        const sideValue = parseFloat(side);
        const diagonalValue = parseFloat(diagonal);
        
        if (isNaN(sideValue) || isNaN(diagonalValue) || sideValue <= 0 || diagonalValue <= 0) {
          setError('Por favor, insira valores válidos maiores que 0');
          return;
        }

        calculation = calculateRhombusFromSideAndDiagonal(sideValue, diagonalValue);
      }

      setResult(calculation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular');
    }
  };

  const handleCopyResult = () => {
    if (result) {
      const text = `Área: ${result.area.toFixed(2)} cm²\nPerímetro: ${result.perimeter.toFixed(2)} cm\nLado: ${result.side.toFixed(2)} cm\nDiagonal 1: ${result.diagonal1.toFixed(2)} cm\nDiagonal 2: ${result.diagonal2.toFixed(2)} cm`;
      navigator.clipboard.writeText(text);
    }
  };

  const examples = [
    {
      label: 'Exemplo: Diagonais 8 cm e 6 cm',
      values: { method: 'diagonals', diagonal1: '8', diagonal2: '6' }
    },
    {
      label: 'Exemplo: Lado 5 cm, Diagonal 8 cm',
      values: { method: 'side-diagonal', side: '5', diagonal: '8' }
    },
    {
      label: 'Exemplo: Diagonais 10 cm e 4 cm',
      values: { method: 'diagonals', diagonal1: '10', diagonal2: '4' }
    }
  ];

  const relatedLinks = [
    { href: '/pt/geometria/circulo', label: 'Área e Perímetro do Círculo' },
    { href: '/pt/geometria/retangulo', label: 'Área e Perímetro do Retângulo' },
    { href: '/pt/geometria/quadrado', label: 'Área e Perímetro do Quadrado' },
    { href: '/pt/geometria/triangulo', label: 'Área do Triângulo' },
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
          <Breadcrumbs items={breadcrumbs} />
          
          <CalculatorLayout
            title="Calculadora de Área e Perímetro do Losango"
            description="Calcula a área e perímetro de um losango conhecendo suas diagonais ou lado e diagonal"
            examples={examples}
            onExampleClick={(values) => {
              if (values.method) setMethod(values.method as 'diagonals' | 'side-diagonal');
              if (values.diagonal1) setDiagonal1(values.diagonal1 as string);
              if (values.diagonal2) setDiagonal2(values.diagonal2 as string);
              if (values.side) setSide(values.side as string);
              if (values.diagonal) setDiagonal(values.diagonal as string);
            }}
            relatedLinks={relatedLinks}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="method" className="text-base font-medium">Método de Cálculo</Label>
                <Select value={method} onValueChange={(value: 'diagonals' | 'side-diagonal') => setMethod(value)}>
                  <SelectTrigger className="min-h-[48px] text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diagonals">Duas Diagonais</SelectItem>
                    <SelectItem value="side-diagonal">Lado e Diagonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {method === 'diagonals' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="diagonal1" className="text-base font-medium">Diagonal 1 (cm)</Label>
                    <Input
                      id="diagonal1"
                      type="number"
                      step="0.01"
                      value={diagonal1}
                      onChange={(e) => setDiagonal1(e.target.value)}
                      placeholder="Ex: 8"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diagonal2" className="text-base font-medium">Diagonal 2 (cm)</Label>
                    <Input
                      id="diagonal2"
                      type="number"
                      step="0.01"
                      value={diagonal2}
                      onChange={(e) => setDiagonal2(e.target.value)}
                      placeholder="Ex: 6"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="side" className="text-base font-medium">Lado (cm)</Label>
                    <Input
                      id="side"
                      type="number"
                      step="0.01"
                      value={side}
                      onChange={(e) => setSide(e.target.value)}
                      placeholder="Ex: 5"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diagonal" className="text-base font-medium">Diagonal (cm)</Label>
                    <Input
                      id="diagonal"
                      type="number"
                      step="0.01"
                      value={diagonal}
                      onChange={(e) => setDiagonal(e.target.value)}
                      placeholder="Ex: 8"
                      className="min-h-[48px] text-base"
                    />
                  </div>
                </div>
              )}

              <Button 
                onClick={handleCalculate}
                className="w-full min-h-[48px] text-base"
                disabled={
                  method === 'diagonals' ? (!diagonal1 || !diagonal2) : (!side || !diagonal)
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
                  <CardHeader className="pb-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-pink-100 rounded-lg">
                        <Diamond className="h-5 w-5 text-pink-600" />
                      </div>
                      Resultados do Losango
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
                          <span className="font-bold text-green-600">{result.perimeter.toFixed(2)} cm</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Lado:</span>
                          <span className="font-bold text-purple-600">{result.side.toFixed(2)} cm</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Diagonais:</span>
                          <span className="font-bold text-orange-600">
                            {result.diagonal1.toFixed(2)} cm × {result.diagonal2.toFixed(2)} cm
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-pink-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-pink-900 mb-2">Fórmulas Utilizadas:</h4>
                          <ul className="text-sm text-pink-800 space-y-1">
                            <li>• <strong>Área:</strong> A = (d1 × d2) ÷ 2</li>
                            <li>• <strong>Perímetro:</strong> P = 4 × lado</li>
                            <li>• <strong>Lado:</strong> l = √[(d1/2)² + (d2/2)²]</li>
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
