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

const breadcrumbs = getBreadcrumbs('/geometria/rombo/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área y Perímetro del Rombo',
  description: 'Calcula el área y perímetro de un rombo conociendo sus diagonales o lado y diagonal.',
  url: 'https://www.calculatodo.online/geometria/rombo/',
  category: 'Geometría'
});

export default function RomboClient() {
  const [inputType, setInputType] = useState<'diagonals' | 'side-diagonal'>('diagonals');
  const [diagonal1, setDiagonal1] = useState<string>('');
  const [diagonal2, setDiagonal2] = useState<string>('');
  const [side, setSide] = useState<string>('');
  const [result, setResult] = useState<RhombusResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      let calculation: RhombusResult;
      
      if (inputType === 'diagonals') {
        const d1 = parseFloat(diagonal1);
        const d2 = parseFloat(diagonal2);
        
        if (isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) {
          setError('Por favor, ingresa valores válidos mayores a 0');
          return;
        }
        
        calculation = calculateRhombus(d1, d2);
      } else {
        const s = parseFloat(side);
        const d1 = parseFloat(diagonal1);
        
        if (isNaN(s) || isNaN(d1) || s <= 0 || d1 <= 0) {
          setError('Por favor, ingresa valores válidos mayores a 0');
          return;
        }
        
        calculation = calculateRhombusFromSideAndDiagonal(s, d1);
      }
      
      setResult(calculation);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error en el cálculo');
    }
  };

  const examples = [
    {
      label: 'Rombo con diagonales 8cm y 6cm',
      values: {
        inputType: 'diagonals' as const,
        diagonal1: '8',
        diagonal2: '6'
      }
    },
    {
      label: 'Rombo lado 5cm, diagonal 8cm',
      values: {
        inputType: 'side-diagonal' as const,
        side: '5',
        diagonal1: '8'
      }
    }
  ];

  const handleExampleClick = (example: typeof examples[0]) => {
    setInputType(example.values.inputType);
    setDiagonal1(example.values.diagonal1);
    setDiagonal2(example.values.diagonal2 || '');
    setSide(example.values.side || '');
    setResult(null);
    setError(null);
  };

  const faqItems = [
    {
      question: "¿Qué es un rombo?",
      answer: "Un rombo es un paralelogramo que tiene sus cuatro lados iguales, pero sus ángulos no son rectos. Es como un cuadrado inclinado."
    },
    {
      question: "¿Cómo se calcula el área de un rombo?",
      answer: "El área se calcula multiplicando las diagonales y dividiendo entre 2: Área = (diagonal1 × diagonal2) / 2."
    },
    {
      question: "¿Cuál es la diferencia entre rombo y cuadrado?",
      answer: "Un cuadrado es un rombo especial donde todos los ángulos son rectos. Un rombo puede tener ángulos que no sean de 90°."
    }
  ];

  const relatedLinks = [
    {
      label: "Calculadora de Círculo",
      href: "/geometria/circulo/"
    },
    {
      label: "Calculadora de Rectángulo",
      href: "/geometria/rectangulo/"
    },
    {
      label: "Calculadora de Cuadrado",
      href: "/geometria/cuadrado/"
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={breadcrumbs} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Área y Perímetro del Rombo"
            description="Calcula el área y perímetro de un rombo conociendo sus diagonales o lado y diagonal."
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Diamond className="text-blue-600" />
                      Datos del Rombo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inputType">Método de cálculo</Label>
                      <Select value={inputType} onValueChange={(value: 'diagonals' | 'side-diagonal') => setInputType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diagonals">Conoces las dos diagonales</SelectItem>
                          <SelectItem value="side-diagonal">Conoces lado y una diagonal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {inputType === 'diagonals' ? (
                      <>
                        <div>
                          <Label htmlFor="diagonal1">Diagonal 1 (cm)</Label>
                          <Input
                            id="diagonal1"
                            type="number"
                            value={diagonal1}
                            onChange={(e) => setDiagonal1(e.target.value)}
                            placeholder="Ingresa la primera diagonal"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="diagonal2">Diagonal 2 (cm)</Label>
                          <Input
                            id="diagonal2"
                            type="number"
                            value={diagonal2}
                            onChange={(e) => setDiagonal2(e.target.value)}
                            placeholder="Ingresa la segunda diagonal"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="side">Lado (cm)</Label>
                          <Input
                            id="side"
                            type="number"
                            value={side}
                            onChange={(e) => setSide(e.target.value)}
                            placeholder="Ingresa el lado"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="diagonal1">Diagonal (cm)</Label>
                          <Input
                            id="diagonal1"
                            type="number"
                            value={diagonal1}
                            onChange={(e) => setDiagonal1(e.target.value)}
                            placeholder="Ingresa la diagonal"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </>
                    )}

                    <Button onClick={handleCalculate} className="w-full">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calcular
                    </Button>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {result && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="text-green-600" />
                        Resultados
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Lado</div>
                          <div className="text-2xl font-bold text-blue-900">{result.side} cm</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Área</div>
                          <div className="text-2xl font-bold text-green-900">{result.area} cm²</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Diagonal 1</div>
                          <div className="text-xl font-bold text-blue-900">{result.diagonal1} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Diagonal 2</div>
                          <div className="text-xl font-bold text-blue-900">{result.diagonal2} cm</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg col-span-2">
                          <div className="text-sm text-green-600 font-medium">Perímetro</div>
                          <div className="text-2xl font-bold text-green-900">{result.perimeter} cm</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Fórmulas utilizadas:</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Área = (diagonal1 × diagonal2) / 2 = ({result.diagonal1} × {result.diagonal2}) / 2 = {result.area} cm²</div>
                          <div>• Perímetro = 4 × lado = 4 × {result.side} = {result.perimeter} cm</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Información sobre el Rombo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Un rombo es un paralelogramo que tiene sus cuatro lados iguales, pero sus ángulos no son rectos.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Propiedades del rombo:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Cuatro lados iguales</li>
                            <li>Lados opuestos paralelos</li>
                            <li>Diagonales perpendiculares</li>
                            <li>Diagonales se bisecan</li>
                            <li>Área = (d1 × d2) / 2</li>
                            <li>Perímetro = 4 × lado</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Aplicaciones:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Diseño de joyería</li>
                            <li>Arquitectura decorativa</li>
                            <li>Diseño de mosaicos</li>
                            <li>Matemáticas y geometría</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  );
}
