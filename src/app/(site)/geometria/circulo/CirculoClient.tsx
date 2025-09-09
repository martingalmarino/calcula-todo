"use client"

import { useState } from 'react'
import { Calculator, Circle, Info } from 'lucide-react'
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
import { calculateCircle, calculateCircleFromDiameter, calculateCircleFromArea, type CircleResult } from '@/lib/math/geometry'

const breadcrumbs = getBreadcrumbs('/geometria/circulo/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Área y Perímetro del Círculo',
  description: 'Calcula el área, perímetro, diámetro y radio de un círculo con fórmulas precisas.',
  url: 'https://www.calculatodo.online/geometria/circulo/',
  category: 'Geometría'
});

export default function CirculoClient() {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputType, setInputType] = useState<'radius' | 'diameter' | 'area'>('radius');
  const [result, setResult] = useState<CircleResult | null>(null);
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

      let calculation: CircleResult;
      
      switch (inputType) {
        case 'radius':
          calculation = calculateCircle(value);
          break;
        case 'diameter':
          calculation = calculateCircleFromDiameter(value);
          break;
        case 'area':
          calculation = calculateCircleFromArea(value);
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
      label: 'Círculo con radio 5 cm',
      values: {
        inputValue: '5',
        inputType: 'radius' as const
      }
    },
    {
      label: 'Círculo con diámetro 10 cm',
      values: {
        inputValue: '10',
        inputType: 'diameter' as const
      }
    },
    {
      label: 'Círculo con área 78.54 cm²',
      values: {
        inputValue: '78.54',
        inputType: 'area' as const
      }
    }
  ];

  const handleExampleClick = (example: typeof examples[0]) => {
    setInputValue(example.values.inputValue);
    setInputType(example.values.inputType);
    setResult(null);
    setError(null);
  };

  const faqItems = [
    {
      question: "¿Cuál es la diferencia entre radio y diámetro?",
      answer: "El radio es la distancia desde el centro del círculo hasta cualquier punto de su borde. El diámetro es el doble del radio, es decir, la distancia que cruza el círculo pasando por su centro."
    },
    {
      question: "¿Cómo se calcula el área de un círculo?",
      answer: "El área se calcula con la fórmula A = π × r², donde π (pi) es aproximadamente 3.14159 y r es el radio del círculo."
    },
    {
      question: "¿Qué es π (pi) y por qué se usa?",
      answer: "π (pi) es una constante matemática que representa la relación entre la circunferencia de un círculo y su diámetro. Su valor aproximado es 3.14159 y es fundamental en cálculos geométricos circulares."
    }
  ];

  const relatedLinks = [
    {
      label: "Calculadora de Rectángulo",
      href: "/geometria/rectangulo/"
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
            title="Calculadora de Área y Perímetro del Círculo"
            description="Calcula el área, perímetro, diámetro y radio de un círculo con fórmulas precisas."
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
                      <Circle className="text-blue-600" />
                      Datos del Círculo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="inputType">Tipo de entrada</Label>
                      <Select value={inputType} onValueChange={(value: 'radius' | 'diameter' | 'area') => setInputType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="radius">Radio</SelectItem>
                          <SelectItem value="diameter">Diámetro</SelectItem>
                          <SelectItem value="area">Área</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="inputValue">
                        {inputType === 'radius' ? 'Radio' : inputType === 'diameter' ? 'Diámetro' : 'Área'} (cm)
                      </Label>
                      <Input
                        id="inputValue"
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`Ingresa el ${inputType === 'radius' ? 'radio' : inputType === 'diameter' ? 'diámetro' : 'área'}`}
                        step="0.01"
                        min="0"
                      />
                    </div>

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
                          <div className="text-sm text-blue-600 font-medium">Radio</div>
                          <div className="text-2xl font-bold text-blue-900">{result.radius} cm</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-blue-600 font-medium">Diámetro</div>
                          <div className="text-2xl font-bold text-blue-900">{result.diameter} cm</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Área</div>
                          <div className="text-2xl font-bold text-green-900">{result.area} cm²</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-green-600 font-medium">Perímetro</div>
                          <div className="text-2xl font-bold text-green-900">{result.circumference} cm</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Fórmulas utilizadas:</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>• Área = π × r² = π × {result.radius}² = {result.area} cm²</div>
                          <div>• Perímetro = 2 × π × r = 2 × π × {result.radius} = {result.circumference} cm</div>
                          <div>• Diámetro = 2 × r = 2 × {result.radius} = {result.diameter} cm</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Información sobre el Círculo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-gray-700">
                      <p className="mb-4">
                        Un círculo es una figura geométrica plana formada por todos los puntos que están a la misma distancia de un punto central llamado centro.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Propiedades del círculo:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Radio (r): distancia del centro al borde</li>
                            <li>Diámetro (d): 2 veces el radio</li>
                            <li>Área: π × r²</li>
                            <li>Perímetro: 2 × π × r</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Aplicaciones:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Cálculo de áreas circulares</li>
                            <li>Diseño de ruedas y engranajes</li>
                            <li>Arquitectura y construcción</li>
                            <li>Física y ingeniería</li>
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
