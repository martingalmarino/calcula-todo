"use client"

import { useState } from 'react'
import { Calculator, Hexagon, Info } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsPT } from '@/lib/breadcrumbs-pt'
import { calculateTrapezoid, type TrapezoidResult } from '@/lib/math/geometry'

const breadcrumbs = getBreadcrumbsPT('/pt/geometria/trapezio/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área do Trapézio',
  description: 'Calcula a área de um trapézio conhecendo suas bases e altura.',
  url: 'https://www.calculatodo.online/pt/geometria/trapezio/',
  category: 'geometria'
});

export default function TrapezioClientPT() {
  const [base1, setBase1] = useState<string>('');
  const [base2, setBase2] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<TrapezoidResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const base1Value = parseFloat(base1);
      const base2Value = parseFloat(base2);
      const heightValue = parseFloat(height);
      
      if (isNaN(base1Value) || isNaN(base2Value) || isNaN(heightValue) || 
          base1Value <= 0 || base2Value <= 0 || heightValue <= 0) {
        setError('Por favor, insira valores válidos maiores que 0');
        return;
      }

      const calculation = calculateTrapezoid(base1Value, base2Value, heightValue);
      setResult(calculation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao calcular');
    }
  };

  const handleCopyResult = () => {
    if (result) {
      const text = `Área: ${result.area.toFixed(2)} cm²\nBase Maior: ${result.base1.toFixed(2)} cm\nBase Menor: ${result.base2.toFixed(2)} cm\nAltura: ${result.height.toFixed(2)} cm`;
      navigator.clipboard.writeText(text);
    }
  };

  const examples = [
    {
      label: 'Exemplo: Bases 10 cm e 6 cm, Altura 4 cm',
      values: { base1: '10', base2: '6', height: '4' }
    },
    {
      label: 'Exemplo: Bases 12 cm e 8 cm, Altura 5 cm',
      values: { base1: '12', base2: '8', height: '5' }
    },
    {
      label: 'Exemplo: Bases 15 cm e 9 cm, Altura 6 cm',
      values: { base1: '15', base2: '9', height: '6' }
    }
  ];

  const relatedLinks = [
    { href: '/pt/geometria/circulo', label: 'Área e Perímetro do Círculo' },
    { href: '/pt/geometria/retangulo', label: 'Área e Perímetro do Retângulo' },
    { href: '/pt/geometria/quadrado', label: 'Área e Perímetro do Quadrado' },
    { href: '/pt/geometria/triangulo', label: 'Área do Triângulo' },
    { href: '/pt/geometria/losango', label: 'Área e Perímetro do Losango' }
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
            title="Calculadora de Área do Trapézio"
            description="Calcula a área de um trapézio conhecendo suas bases e altura"
            examples={examples}
            onExampleClick={(values) => {
              if (values.base1) setBase1(values.base1 as string);
              if (values.base2) setBase2(values.base2 as string);
              if (values.height) setHeight(values.height as string);
            }}
            relatedLinks={relatedLinks}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base1" className="text-base font-medium">Base Maior (cm)</Label>
                  <Input
                    id="base1"
                    type="number"
                    step="0.01"
                    value={base1}
                    onChange={(e) => setBase1(e.target.value)}
                    placeholder="Ex: 10"
                    className="min-h-[48px] text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="base2" className="text-base font-medium">Base Menor (cm)</Label>
                  <Input
                    id="base2"
                    type="number"
                    step="0.01"
                    value={base2}
                    onChange={(e) => setBase2(e.target.value)}
                    placeholder="Ex: 6"
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
                    placeholder="Ex: 4"
                    className="min-h-[48px] text-base"
                  />
                </div>
              </div>

              <Button 
                onClick={handleCalculate}
                className="w-full min-h-[48px] text-base"
                disabled={!base1 || !base2 || !height}
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
                  <CardHeader className="pb-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <Hexagon className="h-5 w-5 text-teal-600" />
                      </div>
                      Resultados do Trapézio
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
                          <span className="font-medium">Base Maior:</span>
                          <span className="font-bold text-green-600">{result.base1.toFixed(2)} cm</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Base Menor:</span>
                          <span className="font-bold text-purple-600">{result.base2.toFixed(2)} cm</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Altura:</span>
                          <span className="font-bold text-orange-600">{result.height.toFixed(2)} cm</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-teal-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-teal-900 mb-2">Fórmula Utilizada:</h4>
                          <ul className="text-sm text-teal-800 space-y-1">
                            <li>• <strong>Área:</strong> A = [(base maior + base menor) × altura] ÷ 2</li>
                            <li>• <strong>Base Média:</strong> Bm = (base maior + base menor) ÷ 2</li>
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
