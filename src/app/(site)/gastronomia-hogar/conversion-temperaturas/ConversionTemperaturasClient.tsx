"use client";

import { useState } from 'react';
import { Thermometer, Info, Copy, Check } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CardCalculator as Card } from '@/components/CardCalculator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jsonLdCalculator } from '@/lib/seo';
import { getBreadcrumbs } from '@/lib/site.config';
import { convertTemperature } from '@/lib/math/gastronomy';
import { FAQ } from '@/components/FAQ';

const breadcrumbs = getBreadcrumbs('/gastronomia-hogar/conversion-temperaturas/');

const jsonLd = jsonLdCalculator({
  name: 'Conversión de Temperaturas',
  description: 'Convierte entre grados Celsius, Fahrenheit y Gas Mark para cocinar y hornear.',
  url: 'https://www.calculatodo.online/gastronomia-hogar/conversion-temperaturas/'
});

const temperatureUnits = [
  { value: 'C', label: 'Celsius (°C)' },
  { value: 'F', label: 'Fahrenheit (°F)' },
  { value: 'GM', label: 'Gas Mark' }
];

// Temperaturas comunes para hornear
const commonTemperatures = [
  { celsius: 120, fahrenheit: 248, gasMark: 0.5, description: 'Muy bajo - Secar alimentos' },
  { celsius: 140, fahrenheit: 284, gasMark: 1, description: 'Bajo - Mantener caliente' },
  { celsius: 150, fahrenheit: 302, gasMark: 2, description: 'Bajo - Secar frutas' },
  { celsius: 160, fahrenheit: 320, gasMark: 3, description: 'Bajo - Mermeladas' },
  { celsius: 170, fahrenheit: 338, gasMark: 3, description: 'Bajo - Panes lentos' },
  { celsius: 180, fahrenheit: 356, gasMark: 4, description: 'Moderado - Pasteles básicos' },
  { celsius: 190, fahrenheit: 374, gasMark: 5, description: 'Moderado - Galletas' },
  { celsius: 200, fahrenheit: 392, gasMark: 6, description: 'Moderado - Panes rápidos' },
  { celsius: 210, fahrenheit: 410, gasMark: 6, description: 'Alto - Pizza' },
  { celsius: 220, fahrenheit: 428, gasMark: 7, description: 'Alto - Panes crujientes' },
  { celsius: 230, fahrenheit: 446, gasMark: 8, description: 'Muy alto - Panes artesanales' },
  { celsius: 250, fahrenheit: 482, gasMark: 9, description: 'Muy alto - Tostar' }
];

export default function ConversionTemperaturasClient() {
  const [inputValue, setInputValue] = useState<number>(180);
  const [fromUnit, setFromUnit] = useState<'C' | 'F' | 'GM'>('C');
  const [toUnit, setToUnit] = useState<'C' | 'F' | 'GM'>('F');
  const [result, setResult] = useState<{
    value: number;
    unit: string;
    description: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const calculate = () => {
    try {
      if (isNaN(inputValue)) {
        alert('Por favor, ingresa un valor numérico válido');
        return;
      }

      const unitMap: Record<string, 'celsius' | 'fahrenheit' | 'gasmark'> = {
        'C': 'celsius',
        'F': 'fahrenheit',
        'GM': 'gasmark'
      };
      const calculation = convertTemperature(inputValue, unitMap[fromUnit]);
      
      // Convertir el resultado al formato esperado
      let resultValue: number;
      let resultUnit: string;
      
      switch (toUnit) {
        case 'C':
          resultValue = calculation.celsius;
          resultUnit = 'C';
          break;
        case 'F':
          resultValue = calculation.fahrenheit;
          resultUnit = 'F';
          break;
        case 'GM':
          resultValue = calculation.gasMark;
          resultUnit = 'GM';
          break;
        default:
          resultValue = calculation.celsius;
          resultUnit = 'C';
      }
      
      setResult({
        value: resultValue,
        unit: resultUnit,
        description: calculation.description
      });
    } catch (error) {
      alert('Error en el cálculo: ' + (error as Error).message);
    }
  };

  const copyResult = () => {
    if (!result) return;
    
    const resultText = `${result.value}°${result.unit}`;
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommonTempClick = (temp: typeof commonTemperatures[0]) => {
    setInputValue(temp.celsius);
    setFromUnit('C');
    setToUnit('F');
    setResult(null);
  };

  const swapUnits = () => {
    const tempFrom = fromUnit;
    const tempTo = toUnit;
    setFromUnit(tempTo);
    setToUnit(tempFrom);
    setResult(null);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorLayout>
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                Conversión de Temperaturas
              </h1>
              <p className="text-lg text-gray-600">
                Convierte entre grados Celsius, Fahrenheit y Gas Mark para cocinar y hornear
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Thermometer className="text-blue-600" />
                    Conversión de Temperatura
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temperatura a Convertir
                      </label>
                      <Input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                        placeholder="180"
                        step="0.1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Desde
                        </label>
                        <Select value={fromUnit} onValueChange={(value: 'C' | 'F' | 'GM') => setFromUnit(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {temperatureUnits.map((unit) => (
                              <SelectItem key={unit.value} value={unit.value}>
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hacia
                        </label>
                        <Select value={toUnit} onValueChange={(value: 'C' | 'F' | 'GM') => setToUnit(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {temperatureUnits.map((unit) => (
                              <SelectItem key={unit.value} value={unit.value}>
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={swapUnits} variant="outline" className="w-full">
                      ↔️ Intercambiar Unidades
                    </Button>

                    <div className="mt-4">
                      <Button onClick={calculate} className="w-full">
                        <Thermometer className="w-4 h-4 mr-2" />
                        Convertir Temperatura
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-6">
                {result && (
                  <Card>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Resultado de la Conversión
                      </h3>
                      
                      <div className="bg-blue-50 p-6 rounded-lg text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {result.value}°{result.unit}
                        </div>
                        <p className="text-gray-600 mb-4">
                          {inputValue}°{fromUnit} = {result.value}°{result.unit}
                        </p>
                        
                        <Button onClick={copyResult} variant="outline" size="sm">
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              ¡Copiado!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copiar Resultado
                            </>
                          )}
                        </Button>
                      </div>

                      {result.description && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <Info className="w-5 h-5 text-blue-600 mb-2" />
                          <p className="text-sm text-gray-700">{result.description}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                )}

                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Temperaturas Comunes para Hornear
                    </h3>
                    
                    <div className="space-y-2">
                      {commonTemperatures.map((temp, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleCommonTempClick(temp)}
                          className="w-full justify-start text-left h-auto p-3"
                        >
                          <div className="flex justify-between items-center w-full">
                            <div>
                              <p className="font-medium">
                                {temp.celsius}°C / {temp.fahrenheit}°F / Gas {temp.gasMark}
                              </p>
                              <p className="text-sm text-gray-600">{temp.description}</p>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Consejos de Horneado
                    </h3>
                    
                    <div className="space-y-4 text-sm text-gray-700">
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-1">Horno con Ventilador</h4>
                        <p>Reduce la temperatura en 10-15°C (20-25°F) cuando uses convección.</p>
                      </div>
                      
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-1">Precalentamiento</h4>
                        <p>Espera 15-20 minutos para que el horno alcance la temperatura deseada.</p>
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-1">Termómetro de Horno</h4>
                        <p>Usa un termómetro independiente para verificar la temperatura real del horno.</p>
                      </div>
                      
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-1">Altura en el Horno</h4>
                        <p>La parte superior es más caliente. Ajusta la temperatura según la posición.</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <FAQ
              title="Preguntas Frecuentes sobre Conversión de Temperaturas"
              items={[
                {
                  question: "¿Qué es Gas Mark?",
                  answer: "Gas Mark es una escala de temperatura usada en hornos de gas británicos. Va del 1/4 (muy bajo) al 9 (muy alto), siendo Gas Mark 4 equivalente a 180°C o 356°F."
                },
                {
                  question: "¿Cómo afecta la convección a la temperatura?",
                  answer: "Los hornos con ventilador (convección) cocinan más rápido y uniformemente. Generalmente se reduce la temperatura en 10-15°C o se acorta el tiempo de cocción en un 10-15%."
                },
                {
                  question: "¿Por qué mi horno no alcanza la temperatura indicada?",
                  answer: "Los hornos pueden tener variaciones de ±10-15°C. Usa un termómetro independiente para verificar la temperatura real y ajusta según sea necesario."
                },
                {
                  question: "¿Cuál es la temperatura ideal para diferentes alimentos?",
                  answer: "Panes: 200-230°C, Pasteles: 170-190°C, Galletas: 180-200°C, Pizza: 220-250°C, Carne: 160-200°C según el corte y cocción deseada."
                }
              ]}
            />
          </div>
        </Container>
      </CalculatorLayout>
    </>
  );
}
