"use client"

import { useState } from 'react'
import { Calculator, Square, Info } from 'lucide-react'
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
import { calculateSquare, calculateSquareFromArea, calculateSquareFromPerimeter, type SquareResult } from '@/lib/math/geometry'

const breadcrumbs = getBreadcrumbs('/geometria/cuadrado/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área y Perímetro del Cuadrado',
  description: 'Calcula el área y perímetro de un cuadrado conociendo su lado o viceversa.',
  url: 'https://www.calculatodo.online/geometria/cuadrado/',
  category: 'Geometría'
});

export default function CuadradoClient() {
  const [inputType, setInputType] = useState<'side' | 'area' | 'perimeter'>('side');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<SquareResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const value = parseFloat(inputValue);
      
      if (isNaN(value) || value <= 0) {
        setError('Por favor, ingresa un valor válido mayor a 0');
        return;
      }

      let calculation: SquareResult;
      
      switch (inputType) {
        case 'side':
          calculation = calculateSquare(value);
          break;
        case 'area':
          calculation = calculateSquareFromArea(value);
          break;
        case 'perimeter':
          calculation = calculateSquareFromPerimeter(value);
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
      label: 'Cuadrado de lado 5 cm',
      values: {
        inputType: 'side' as const,
        inputValue: '5'
      }
    },
    {
      label: 'Cuadrado con área 25 cm²',
      values: {
        inputType: 'area' as const,
        inputValue: '25'
      }
    },
    {
      label: 'Cuadrado con perímetro 20 cm',
      values: {
        inputType: 'perimeter' as const,
        inputValue: '20'
      }
    }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setInputType(values.inputType as 'side' | 'area' | 'perimeter');
    setInputValue(values.inputValue as string);
    setResult(null);
    setError(null);
  };

  const faqItems = [
    {
      question: "¿Qué es un cuadrado?",
      answer: "Un cuadrado es un rectángulo que tiene sus cuatro lados iguales y sus cuatro ángulos rectos. Es un caso especial de rectángulo y rombo."
    },
    {
      question: "¿Cómo se calcula el área de un cuadrado?",
      answer: "El área se calcula elevando al cuadrado la longitud del lado: Área = lado². Por ejemplo, un cuadrado de 4cm de lado tiene un área de 16 cm²."
    },
    {
      question: "¿Cuál es la diferencia entre cuadrado y rectángulo?",
      answer: "Un cuadrado es un rectángulo especial donde todos los lados son iguales. Un rectángulo puede tener lados de diferentes longitudes."
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
            title="Calculadora de Área y Perímetro del Cuadrado"
            description="Calcula el área y perímetro de un cuadrado conociendo su lado o viceversa."
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
                      <Square className="text-blue-600" />
                      Datos del Cuadrado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inputType">Tipo de entrada</Label>
                      <Select value={inputType} onValueChange={(value: 'side' | 'area' | 'perimeter') => setInputType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="side">Lado</SelectItem>
                          <SelectItem value="area">Área</SelectItem>
                          <SelectItem value="perimeter">Perímetro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="inputValue">
                        {inputType === 'side' ? 'Lado' : inputType === 'area' ? 'Área' : 'Perímetro'} (cm{inputType === 'area' ? '²' : ''})
                      </Label>
                      <Input
                        id="inputValue"
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`Ingresa el ${inputType === 'side' ? 'lado' : inputType === 'area' ? 'área' : 'perímetro'}`}
                        step="0.01"
                        min="0"
                      />
                    </div>

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
                          <div className="text-sm text-blue-600 font-medium">Lado</div>
                          <div className="text-2xl font-bold text-blue-900">{result.side} cm</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Área</div>
                          <div className="text-2xl font-bold text-green-900">{result.area} cm²</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg col-span-2">
                          <div className="text-sm text-green-600 font-medium">Perímetro</div>
                          <div className="text-2xl font-bold text-green-900">{result.perimeter} cm</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Fórmulas utilizadas:</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Área = lado² = {result.side}² = {result.area} cm²</div>
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
                    <CardTitle>Información sobre el Cuadrado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Un cuadrado es un rectángulo que tiene sus cuatro lados iguales y sus cuatro ángulos rectos.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Propiedades del cuadrado:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Cuatro lados iguales</li>
                            <li>Cuatro ángulos rectos (90°)</li>
                            <li>Diagonales iguales y perpendiculares</li>
                            <li>Área = lado²</li>
                            <li>Perímetro = 4 × lado</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Aplicaciones:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Diseño de mosaicos y baldosas</li>
                            <li>Arquitectura y construcción</li>
                            <li>Diseño gráfico y web</li>
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
