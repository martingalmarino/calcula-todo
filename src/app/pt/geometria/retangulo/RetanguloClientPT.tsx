"use client"

import { useState } from 'react'
import { Calculator, RectangleHorizontal, Info } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsPT } from '@/lib/breadcrumbs-pt'
import { calculateRectangle, type RectangleResult } from '@/lib/math/geometry'

const breadcrumbs = getBreadcrumbsPT('/pt/geometria/retangulo/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área e Perímetro do Retângulo',
  description: 'Calcula a área e perímetro de um retângulo conhecendo suas dimensões.',
  url: 'https://www.calculatodo.online/pt/geometria/retangulo/',
  category: 'geometria'
});

export default function RetanguloClientPT() {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [result, setResult] = useState<RectangleResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const lengthValue = parseFloat(length);
      const widthValue = parseFloat(width);
      
      if (isNaN(lengthValue) || isNaN(widthValue) || lengthValue <= 0 || widthValue <= 0) {
        setError('Por favor, insira valores válidos maiores que 0');
        return;
      }

      const calculation = calculateRectangle(lengthValue, widthValue);
      setResult(calculation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular');
    }
  };

  const handleCopyResult = () => {
    if (result) {
      const text = `Área: ${result.area.toFixed(2)} cm²\nPerímetro: ${result.perimeter.toFixed(2)} cm\nComprimento: ${result.length.toFixed(2)} cm\nLargura: ${result.width.toFixed(2)} cm`;
      navigator.clipboard.writeText(text);
    }
  };

  const examples = [
    {
      label: 'Exemplo: 10 cm × 5 cm',
      values: { length: '10', width: '5' }
    },
    {
      label: 'Exemplo: 15 cm × 8 cm',
      values: { length: '15', width: '8' }
    },
    {
      label: 'Exemplo: 20 cm × 12 cm',
      values: { length: '20', width: '12' }
    }
  ];

  const relatedLinks = [
    { href: '/pt/geometria/circulo', label: 'Área e Perímetro do Círculo' },
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
            title="Calculadora de Área e Perímetro do Retângulo"
            description="Calcula a área e perímetro de um retângulo conhecendo suas dimensões"
            examples={examples}
            onExampleClick={(values) => {
              if (values.length) setLength(values.length as string);
              if (values.width) setWidth(values.width as string);
            }}
            relatedLinks={relatedLinks}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length" className="text-base font-medium">Comprimento (cm)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.01"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Ex: 10"
                    className="min-h-[48px] text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width" className="text-base font-medium">Largura (cm)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.01"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Ex: 5"
                    className="min-h-[48px] text-base"
                  />
                </div>
              </div>

              <Button 
                onClick={handleCalculate}
                className="w-full min-h-[48px] text-base"
                disabled={!length || !width}
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
                  <CardHeader className="pb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <RectangleHorizontal className="h-5 w-5 text-green-600" />
                      </div>
                      Resultados do Retângulo
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
                          <span className="font-medium">Comprimento:</span>
                          <span className="font-bold text-purple-600">{result.length.toFixed(2)} cm</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Largura:</span>
                          <span className="font-bold text-orange-600">{result.width.toFixed(2)} cm</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-900 mb-2">Fórmulas Utilizadas:</h4>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• <strong>Área:</strong> A = comprimento × largura</li>
                            <li>• <strong>Perímetro:</strong> P = 2 × (comprimento + largura)</li>
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
