"use client"

import { useState } from 'react'
import { Calculator, RectangleHorizontal, Info } from 'lucide-react'
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
import { calculateRectangle, calculateRectangleFromArea, calculateRectangleFromPerimeter, type RectangleResult } from '@/lib/math/geometry'

const breadcrumbs = getBreadcrumbs('/geometria/rectangulo/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área y Perímetro del Rectángulo',
  description: 'Calcula el área y perímetro de un rectángulo conociendo sus dimensiones o viceversa.',
  url: 'https://www.calculatodo.online/geometria/rectangulo/',
  category: 'Geometría'
});

export default function RectanguloClient() {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [inputType, setInputType] = useState<'dimensions' | 'area' | 'perimeter'>('dimensions');
  const [knownValue, setKnownValue] = useState<string>('');
  const [result, setResult] = useState<RectangleResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      let calculation: RectangleResult;
      
      switch (inputType) {
        case 'dimensions':
          const len = parseFloat(length);
          const wid = parseFloat(width);
          
          if (isNaN(len) || isNaN(wid) || len <= 0 || wid <= 0) {
            setError('Por favor, ingresa valores válidos mayores a 0');
            return;
          }
          
          calculation = calculateRectangle(len, wid);
          break;
          
        case 'area':
          const area = parseFloat(knownValue);
          const lenFromArea = parseFloat(length);
          
          if (isNaN(area) || isNaN(lenFromArea) || area <= 0 || lenFromArea <= 0) {
            setError('Por favor, ingresa valores válidos mayores a 0');
            return;
          }
          
          calculation = calculateRectangleFromArea(area, lenFromArea);
          break;
          
        case 'perimeter':
          const perimeter = parseFloat(knownValue);
          const lenFromPerimeter = parseFloat(length);
          
          if (isNaN(perimeter) || isNaN(lenFromPerimeter) || perimeter <= 0 || lenFromPerimeter <= 0) {
            setError('Por favor, ingresa valores válidos mayores a 0');
            return;
          }
          
          calculation = calculateRectangleFromPerimeter(perimeter, lenFromPerimeter);
          break;
          
        default:
          setError('Tipo de entrada no válido');
          return;
      }
      
      setResult(calculation);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error en el cálculo');
    }
  };

  const examples = [
    {
      label: 'Rectángulo 8cm × 6cm',
      values: {
        inputType: 'dimensions' as const,
        length: '8',
        width: '6'
      }
    },
    {
      label: 'Rectángulo con área 48 cm² y largo 8 cm',
      values: {
        inputType: 'area' as const,
        length: '8',
        knownValue: '48'
      }
    },
    {
      label: 'Rectángulo con perímetro 28 cm y largo 8 cm',
      values: {
        inputType: 'perimeter' as const,
        length: '8',
        knownValue: '28'
      }
    }
  ];

  const handleExampleClick = (example: typeof examples[0]) => {
    setInputType(example.values.inputType);
    setLength(example.values.length);
    setWidth(example.values.width || '');
    setKnownValue(example.values.knownValue || '');
    setResult(null);
    setError(null);
  };

  const faqItems = [
    {
      question: "¿Cuál es la diferencia entre área y perímetro?",
      answer: "El área es la superficie que ocupa la figura (se mide en unidades cuadradas como cm²). El perímetro es la suma de todos los lados de la figura (se mide en unidades lineales como cm)."
    },
    {
      question: "¿Cómo se calcula el área de un rectángulo?",
      answer: "El área se calcula multiplicando la longitud por el ancho: Área = largo × ancho. Por ejemplo, un rectángulo de 5cm × 3cm tiene un área de 15 cm²."
    },
    {
      question: "¿Qué es un rectángulo?",
      answer: "Un rectángulo es un paralelogramo que tiene sus cuatro ángulos rectos (90°) y sus lados opuestos iguales y paralelos. Es una de las figuras geométricas más comunes."
    }
  ];

  const relatedLinks = [
    {
      label: "Calculadora de Círculo",
      href: "/geometria/circulo/"
    },
    {
      label: "Calculadora de Triángulo",
      href: "/geometria/triangulo/"
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
            title="Calculadora de Área y Perímetro del Rectángulo"
            description="Calcula el área y perímetro de un rectángulo conociendo sus dimensiones o viceversa."
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
                      <RectangleHorizontal className="text-blue-600" />
                      Datos del Rectángulo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inputType">Tipo de cálculo</Label>
                      <Select value={inputType} onValueChange={(value: 'dimensions' | 'area' | 'perimeter') => setInputType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dimensions">Conoces largo y ancho</SelectItem>
                          <SelectItem value="area">Conoces área y largo</SelectItem>
                          <SelectItem value="perimeter">Conoces perímetro y largo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="length">Largo (cm)</Label>
                      <Input
                        id="length"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="Ingresa el largo"
                        step="0.01"
                        min="0"
                      />
                    </div>

                    {inputType === 'dimensions' && (
                      <div>
                        <Label htmlFor="width">Ancho (cm)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          placeholder="Ingresa el ancho"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    )}

                    {inputType === 'area' && (
                      <div>
                        <Label htmlFor="knownValue">Área (cm²)</Label>
                        <Input
                          id="knownValue"
                          type="number"
                          value={knownValue}
                          onChange={(e) => setKnownValue(e.target.value)}
                          placeholder="Ingresa el área"
                          step="0.01"
                          min="0"
                        />
                      </div>
                    )}

                    {inputType === 'perimeter' && (
                      <div>
                        <Label htmlFor="knownValue">Perímetro (cm)</Label>
                        <Input
                          id="knownValue"
                          type="number"
                          value={knownValue}
                          onChange={(e) => setKnownValue(e.target.value)}
                          placeholder="Ingresa el perímetro"
                          step="0.01"
                          min="0"
                        />
                      </div>
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
                          <div className="text-sm text-blue-600 font-medium">Largo</div>
                          <div className="text-2xl font-bold text-blue-900">{result.length} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Ancho</div>
                          <div className="text-2xl font-bold text-blue-900">{result.width} cm</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Área</div>
                          <div className="text-2xl font-bold text-green-900">{result.area} cm²</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Perímetro</div>
                          <div className="text-2xl font-bold text-green-900">{result.perimeter} cm</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Fórmulas utilizadas:</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Área = largo × ancho = {result.length} × {result.width} = {result.area} cm²</div>
                          <div>• Perímetro = 2 × (largo + ancho) = 2 × ({result.length} + {result.width}) = {result.perimeter} cm</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Información sobre el Rectángulo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Un rectángulo es un paralelogramo que tiene sus cuatro ángulos rectos y sus lados opuestos iguales y paralelos.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Propiedades del rectángulo:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Cuatro ángulos rectos (90°)</li>
                            <li>Lados opuestos iguales y paralelos</li>
                            <li>Diagonales iguales que se bisecan</li>
                            <li>Área = largo × ancho</li>
                            <li>Perímetro = 2 × (largo + ancho)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Aplicaciones:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Construcción y arquitectura</li>
                            <li>Diseño de muebles</li>
                            <li>Cálculo de superficies</li>
                            <li>Planificación de espacios</li>
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
