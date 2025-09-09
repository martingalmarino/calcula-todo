"use client"

import { useState } from 'react'
import { Calculator, Hexagon, Info } from 'lucide-react'
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
import { calculateTrapezoid, calculateTrapezoidFromArea, type TrapezoidResult } from '@/lib/math/geometry'

const breadcrumbs = getBreadcrumbs('/geometria/trapecio/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área del Trapecio',
  description: 'Calcula el área de un trapecio conociendo sus bases y altura o viceversa.',
  url: 'https://www.calculatodo.online/geometria/trapecio/',
  category: 'Geometría'
});

export default function TrapecioClient() {
  const [inputType, setInputType] = useState<'bases-height' | 'area'>('bases-height');
  const [base1, setBase1] = useState<string>('');
  const [base2, setBase2] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<TrapezoidResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      let calculation: TrapezoidResult;
      
      if (inputType === 'bases-height') {
        const b1 = parseFloat(base1);
        const b2 = parseFloat(base2);
        const h = parseFloat(height);
        
        if (isNaN(b1) || isNaN(b2) || isNaN(h) || b1 <= 0 || b2 <= 0 || h <= 0) {
          setError('Por favor, ingresa valores válidos mayores a 0');
          return;
        }
        
        calculation = calculateTrapezoid(b1, b2, h);
      } else {
        const area = parseFloat(base1); // Reutilizando base1 para el área
        const b1 = parseFloat(base2); // Reutilizando base2 para base1
        const b2 = parseFloat(height); // Reutilizando height para base2
        
        if (isNaN(area) || isNaN(b1) || isNaN(b2) || area <= 0 || b1 <= 0 || b2 <= 0) {
          setError('Por favor, ingresa valores válidos mayores a 0');
          return;
        }
        
        calculation = calculateTrapezoidFromArea(area, b1, b2);
      }
      
      setResult(calculation);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error en el cálculo');
    }
  };

  const examples = [
    {
      label: 'Trapecio bases 8cm y 6cm, altura 4cm',
      values: {
        inputType: 'bases-height' as const,
        base1: '8',
        base2: '6',
        height: '4'
      }
    },
    {
      label: 'Trapecio área 28cm², bases 8cm y 6cm',
      values: {
        inputType: 'area' as const,
        base1: '28',
        base2: '8',
        height: '6'
      }
    }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setInputType(values.inputType as 'bases-height' | 'area');
    setBase1(values.base1 as string);
    setBase2(values.base2 as string);
    setHeight(values.height as string);
    setResult(null);
    setError(null);
  };

  const faqItems = [
    {
      question: "¿Qué es un trapecio?",
      answer: "Un trapecio es un cuadrilátero que tiene al menos un par de lados paralelos llamados bases. Los otros dos lados se llaman lados no paralelos."
    },
    {
      question: "¿Cómo se calcula el área de un trapecio?",
      answer: "El área se calcula con la fórmula: Área = ((base1 + base2) × altura) / 2. Es como el promedio de las bases multiplicado por la altura."
    },
    {
      question: "¿Cuáles son los tipos de trapecio?",
      answer: "Trapecio rectángulo (tiene un ángulo recto), trapecio isósceles (lados no paralelos iguales), y trapecio escaleno (lados no paralelos diferentes)."
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
      label: "Calculadora de Triángulo",
      href: "/geometria/triangulo/"
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
            title="Calculadora de Área del Trapecio"
            description="Calcula el área de un trapecio conociendo sus bases y altura o viceversa."
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
                      <Hexagon className="text-blue-600" />
                      Datos del Trapecio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inputType">Método de cálculo</Label>
                      <Select value={inputType} onValueChange={(value: 'bases-height' | 'area') => setInputType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bases-height">Conoces las bases y altura</SelectItem>
                          <SelectItem value="area">Conoces el área y las bases</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {inputType === 'bases-height' ? (
                      <>
                        <div>
                          <Label htmlFor="base1">Base mayor (cm)</Label>
                          <Input
                            id="base1"
                            type="number"
                            value={base1}
                            onChange={(e) => setBase1(e.target.value)}
                            placeholder="Ingresa la base mayor"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="base2">Base menor (cm)</Label>
                          <Input
                            id="base2"
                            type="number"
                            value={base2}
                            onChange={(e) => setBase2(e.target.value)}
                            placeholder="Ingresa la base menor"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="height">Altura (cm)</Label>
                          <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Ingresa la altura"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="base1">Área (cm²)</Label>
                          <Input
                            id="base1"
                            type="number"
                            value={base1}
                            onChange={(e) => setBase1(e.target.value)}
                            placeholder="Ingresa el área"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="base2">Base mayor (cm)</Label>
                          <Input
                            id="base2"
                            type="number"
                            value={base2}
                            onChange={(e) => setBase2(e.target.value)}
                            placeholder="Ingresa la base mayor"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="height">Base menor (cm)</Label>
                          <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Ingresa la base menor"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </>
                    )}

                    <Button onClick={handleCalculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200">
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
                          <div className="text-sm text-blue-600 font-medium">Base mayor</div>
                          <div className="text-2xl font-bold text-blue-900">{result.base1} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Base menor</div>
                          <div className="text-2xl font-bold text-blue-900">{result.base2} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Altura</div>
                          <div className="text-2xl font-bold text-blue-900">{result.height} cm</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Área</div>
                          <div className="text-2xl font-bold text-green-900">{result.area} cm²</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Fórmula utilizada:</h4>
                        <div className="text-sm text-gray-600">
                          Área = ((base1 + base2) × altura) / 2 = (({result.base1} + {result.base2}) × {result.height}) / 2 = {result.area} cm²
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Información sobre el Trapecio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Un trapecio es un cuadrilátero que tiene al menos un par de lados paralelos llamados bases.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Tipos de trapecio:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Trapecio rectángulo: tiene un ángulo recto</li>
                            <li>Trapecio isósceles: lados no paralelos iguales</li>
                            <li>Trapecio escaleno: lados no paralelos diferentes</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Aplicaciones:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Construcción y arquitectura</li>
                            <li>Diseño de techos</li>
                            <li>Ingeniería civil</li>
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
