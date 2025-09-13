"use client"

import { useState } from 'react'
import { Calculator, Square, Info } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsPT } from '@/lib/breadcrumbs-pt'
import { calculateSquare, type SquareResult } from '@/lib/math/geometry'

const breadcrumbs = getBreadcrumbsPT('/pt/geometria/quadrado/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área e Perímetro do Quadrado',
  description: 'Calcula a área e perímetro de um quadrado conhecendo seu lado.',
  url: 'https://www.calculatodo.online/pt/geometria/quadrado/',
  category: 'geometria'
});

export default function QuadradoClientPT() {
  const [side, setSide] = useState<string>('');
  const [result, setResult] = useState<SquareResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const sideValue = parseFloat(side);
      
      if (isNaN(sideValue) || sideValue <= 0) {
        setError('Por favor, insira um valor válido maior que 0');
        return;
      }

      const calculation = calculateSquare(sideValue);
      setResult(calculation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular');
    }
  };

  const handleCopyResult = () => {
    if (result) {
      const text = `Área: ${result.area.toFixed(2)} cm²\nPerímetro: ${result.perimeter.toFixed(2)} cm\nLado: ${result.side.toFixed(2)} cm`;
      navigator.clipboard.writeText(text);
    }
  };

  const examples = [
    {
      label: 'Exemplo: Lado de 5 cm',
      values: { side: '5' }
    },
    {
      label: 'Exemplo: Lado de 8 cm',
      values: { side: '8' }
    },
    {
      label: 'Exemplo: Lado de 12 cm',
      values: { side: '12' }
    }
  ];

  const relatedLinks = [
    { href: '/pt/geometria/circulo', label: 'Área e Perímetro do Círculo' },
    { href: '/pt/geometria/retangulo', label: 'Área e Perímetro do Retângulo' },
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
            title="Calculadora de Área e Perímetro do Quadrado"
            description="Calcula a área e perímetro de um quadrado conhecendo seu lado"
            examples={examples}
            onExampleClick={(values) => {
              if (values.side) setSide(values.side as string);
            }}
            relatedLinks={relatedLinks}
          >
            <div className="space-y-6">
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

              <Button 
                onClick={handleCalculate}
                className="w-full min-h-[48px] text-base"
                disabled={!side}
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
                  <CardHeader className="pb-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Square className="h-5 w-5 text-orange-600" />
                      </div>
                      Resultados do Quadrado
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
                          <span className="font-medium">Diagonal:</span>
                          <span className="font-bold text-orange-600">{(result.side * Math.sqrt(2)).toFixed(2)} cm</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-orange-900 mb-2">Fórmulas Utilizadas:</h4>
                          <ul className="text-sm text-orange-800 space-y-1">
                            <li>• <strong>Área:</strong> A = lado²</li>
                            <li>• <strong>Perímetro:</strong> P = 4 × lado</li>
                            <li>• <strong>Diagonal:</strong> d = lado × √2</li>
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
