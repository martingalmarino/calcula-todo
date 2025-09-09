"use client"

import { useState } from 'react'
import { Calculator, Triangle, Info } from 'lucide-react'
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
import { calculateTriangle, calculateTriangleFromSides, type TriangleResult } from '@/lib/math/geometry'

const breadcrumbs = getBreadcrumbs('/geometria/triangulo/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área del Triángulo',
  description: 'Calcula el área de un triángulo conociendo base y altura o los tres lados.',
  url: 'https://www.calculatodo.online/geometria/triangulo/',
  category: 'Geometría'
});

export default function TrianguloClient() {
  const [inputType, setInputType] = useState<'base-height' | 'three-sides'>('base-height');
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
      
      if (inputType === 'base-height') {
        const b = parseFloat(base);
        const h = parseFloat(height);
        
        if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
          setError('Por favor, ingresa valores válidos mayores a 0');
          return;
        }
        
        calculation = calculateTriangle(b, h);
      } else {
        const s1 = parseFloat(side1);
        const s2 = parseFloat(side2);
        const s3 = parseFloat(side3);
        
        if (isNaN(s1) || isNaN(s2) || isNaN(s3) || s1 <= 0 || s2 <= 0 || s3 <= 0) {
          setError('Por favor, ingresa valores válidos mayores a 0');
          return;
        }
        
        calculation = calculateTriangleFromSides(s1, s2, s3);
      }
      
      setResult(calculation);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error en el cálculo');
    }
  };

  const examples = [
    {
      label: 'Triángulo base 10cm, altura 6cm',
      values: {
        inputType: 'base-height',
        base: '10',
        height: '6'
      }
    },
    {
      label: 'Triángulo lados 3cm, 4cm, 5cm',
      values: {
        inputType: 'three-sides',
        side1: '3',
        side2: '4',
        side3: '5'
      }
    }
  ];

  const handleExampleClick = (example: typeof examples[0]) => {
    setInputType(example.values.inputType);
    setBase(example.values.base || '');
    setHeight(example.values.height || '');
    setSide1(example.values.side1 || '');
    setSide2(example.values.side2 || '');
    setSide3(example.values.side3 || '');
    setResult(null);
    setError(null);
  };

  const faqItems = [
    {
      question: "¿Cómo se calcula el área de un triángulo?",
      answer: "El área se calcula con la fórmula: Área = (base × altura) / 2. También se puede calcular con la fórmula de Herón si conoces los tres lados."
    },
    {
      question: "¿Qué es la fórmula de Herón?",
      answer: "La fórmula de Herón permite calcular el área de un triángulo conociendo solo las longitudes de sus tres lados. Es útil cuando no conoces la altura."
    },
    {
      question: "¿Qué es la desigualdad triangular?",
      answer: "Es una condición que deben cumplir tres números para formar un triángulo: la suma de dos lados debe ser mayor que el tercer lado."
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
            title="Calculadora de Área del Triángulo"
            description="Calcula el área de un triángulo conociendo base y altura o los tres lados."
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
                      <Triangle className="text-blue-600" />
                      Datos del Triángulo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inputType">Método de cálculo</Label>
                      <Select value={inputType} onValueChange={(value: 'base-height' | 'three-sides') => setInputType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="base-height">Base y altura</SelectItem>
                          <SelectItem value="three-sides">Tres lados (Fórmula de Herón)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {inputType === 'base-height' ? (
                      <>
                        <div>
                          <Label htmlFor="base">Base (cm)</Label>
                          <Input
                            id="base"
                            type="number"
                            value={base}
                            onChange={(e) => setBase(e.target.value)}
                            placeholder="Ingresa la base"
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
                          <Label htmlFor="side1">Lado 1 (cm)</Label>
                          <Input
                            id="side1"
                            type="number"
                            value={side1}
                            onChange={(e) => setSide1(e.target.value)}
                            placeholder="Ingresa el primer lado"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="side2">Lado 2 (cm)</Label>
                          <Input
                            id="side2"
                            type="number"
                            value={side2}
                            onChange={(e) => setSide2(e.target.value)}
                            placeholder="Ingresa el segundo lado"
                            step="0.01"
                            min="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="side3">Lado 3 (cm)</Label>
                          <Input
                            id="side3"
                            type="number"
                            value={side3}
                            onChange={(e) => setSide3(e.target.value)}
                            placeholder="Ingresa el tercer lado"
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
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-green-600 font-medium">Área</div>
                        <div className="text-2xl font-bold text-green-900">{result.area} cm²</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Base</div>
                          <div className="text-xl font-bold text-blue-900">{result.base} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Altura</div>
                          <div className="text-xl font-bold text-blue-900">{result.height} cm</div>
                        </div>
                      </div>

                      {result.side1 && result.side2 && result.side3 && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-2">Lados del triángulo:</h4>
                          <div className="text-sm text-gray-600">
                            Lado 1: {result.side1} cm, Lado 2: {result.side2} cm, Lado 3: {result.side3} cm
                          </div>
                        </div>
                      )}

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Fórmula utilizada:</h4>
                        <div className="text-sm text-gray-600">
                          {inputType === 'base-height' 
                            ? `Área = (base × altura) / 2 = (${result.base} × ${result.height}) / 2 = ${result.area} cm²`
                            : `Fórmula de Herón: Área = √[s(s-a)(s-b)(s-c)] donde s = (a+b+c)/2 = ${result.area} cm²`
                          }
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Información sobre el Triángulo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Un triángulo es una figura geométrica formada por tres lados que se unen en tres vértices.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Tipos de triángulos:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Equilátero: tres lados iguales</li>
                            <li>Isósceles: dos lados iguales</li>
                            <li>Escaleno: tres lados diferentes</li>
                            <li>Rectángulo: un ángulo de 90°</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Aplicaciones:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Construcción y arquitectura</li>
                            <li>Diseño gráfico</li>
                            <li>Ingeniería estructural</li>
                            <li>Navegación y topografía</li>
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
