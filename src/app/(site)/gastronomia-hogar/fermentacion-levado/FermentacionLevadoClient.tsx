"use client";

import { useState } from 'react';
import { Clock, Thermometer, Timer } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card } from '@/components/Card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jsonLdCalculator } from '@/lib/seo';
import { getBreadcrumbs } from '@/lib/site.config';
import { calculateFermentation } from '@/lib/math/gastronomy';
import { FAQ } from '@/components/FAQ';

const breadcrumbs = getBreadcrumbs('/gastronomia-hogar/fermentacion-levado/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Fermentación y Tiempos de Levado',
  description: 'Calcula los tiempos de fermentación y levado para panes y masas según temperatura y tipo de levadura.',
  url: 'https://www.calculatodo.online/gastronomia-hogar/fermentacion-levado/',
  category: 'Gastronomía y Hogar'
});

const yeastTypes = [
  { value: 'dry', label: 'Levadura Seca (Instantánea)' },
  { value: 'fresh', label: 'Levadura Fresca' },
  { value: 'sourdough', label: 'Masa Madre (Sourdough)' }
];

const breadTypes = [
  { name: 'Pan Blanco Básico', temp: 25, yeast: 'dry', time: 60 },
  { name: 'Pan Integral', temp: 24, yeast: 'dry', time: 75 },
  { name: 'Brioche', temp: 26, yeast: 'fresh', time: 90 },
  { name: 'Sourdough', temp: 22, yeast: 'sourdough', time: 240 },
  { name: 'Pizza', temp: 25, yeast: 'dry', time: 45 },
  { name: 'Croissants', temp: 20, yeast: 'fresh', time: 120 }
];

export default function FermentacionLevadoClient() {
  const [temperature, setTemperature] = useState<number>(25);
  const [yeastType, setYeastType] = useState<'dry' | 'fresh' | 'sourdough'>('dry');
  const [result, setResult] = useState<{
    estimatedTime: number;
    minTime: number;
    maxTime: number;
    yeastType: string;
    tips: string[];
  } | null>(null);

  const calculate = () => {
    try {
      if (isNaN(temperature) || temperature < 0 || temperature > 50) {
        alert('Por favor, ingresa una temperatura válida entre 0°C y 50°C');
        return;
      }

      const calculation = calculateFermentation(temperature, yeastType);
      
      // Convertir el resultado al formato esperado
      setResult({
        estimatedTime: calculation.fermentationTime * 60, // convertir horas a minutos
        minTime: (calculation.fermentationTime * 0.8) * 60, // 80% del tiempo
        maxTime: (calculation.fermentationTime * 1.2) * 60, // 120% del tiempo
        yeastType: calculation.yeastType,
        tips: calculation.tips
      });
    } catch (error) {
      alert('Error en el cálculo: ' + (error as Error).message);
    }
  };

  const handleBreadTypeClick = (bread: typeof breadTypes[0]) => {
    setTemperature(bread.temp);
    setYeastType(bread.yeast as 'dry' | 'fresh' | 'sourdough');
    setResult(null);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 20) return 'text-blue-600';
    if (temp < 25) return 'text-green-600';
    if (temp < 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTemperatureDescription = (temp: number) => {
    if (temp < 18) return 'Muy frío - Fermentación muy lenta';
    if (temp < 22) return 'Frío - Fermentación lenta';
    if (temp < 26) return 'Ideal - Fermentación óptima';
    if (temp < 30) return 'Cálido - Fermentación rápida';
    return 'Muy cálido - Riesgo de sobrefermentación';
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorLayout
        title="Calculadora de Fermentación y Tiempos de Levado"
        description="Calcula los tiempos de fermentación y levado para panes y masas según temperatura y tipo de levadura."
      >
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                Calculadora de Fermentación y Tiempos de Levado
              </h1>
              <p className="text-lg text-gray-600">
                Calcula los tiempos de fermentación y levado para panes y masas según temperatura y tipo de levadura
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Thermometer className="text-blue-600" />
                    Parámetros de Fermentación
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temperatura Ambiente (°C)
                      </label>
                      <Input
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value) || 0)}
                        placeholder="25"
                        min="0"
                        max="50"
                        step="0.1"
                      />
                      <p className={`text-sm mt-1 ${getTemperatureColor(temperature)}`}>
                        {getTemperatureDescription(temperature)}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Levadura
                      </label>
                      <Select value={yeastType} onValueChange={(value: 'dry' | 'fresh' | 'sourdough') => setYeastType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {yeastTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mt-4">
                      <Button onClick={calculate} className="w-full">
                        <Clock className="w-4 h-4 mr-2" />
                        Calcular Tiempo de Fermentación
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
                        Tiempos de Fermentación
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                            <Timer className="w-5 h-5" />
                            Tiempo Estimado
                          </h4>
                          <p className="text-2xl font-bold text-blue-600">
                            {formatTime(result.estimatedTime)}
                          </p>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Rango Recomendado</h4>
                          <p className="text-lg text-green-600">
                            {formatTime(result.minTime)} - {formatTime(result.maxTime)}
                          </p>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-2">Tipo de Levadura</h4>
                          <p className="text-lg text-purple-600 capitalize">
                            {result.yeastType === 'dry' ? 'Levadura Seca' : 
                             result.yeastType === 'fresh' ? 'Levadura Fresca' : 'Masa Madre'}
                          </p>
                        </div>
                        
                        {result.tips && (
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-yellow-800 mb-2">Consejos</h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                              {result.tips.map((tip: string, index: number) => (
                                <li key={index}>• {tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                )}

                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Recetas Comunes
                    </h3>
                    
                    <div className="space-y-2">
                      {breadTypes.map((bread, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleBreadTypeClick(bread)}
                          className="w-full justify-start text-left h-auto p-3"
                        >
                          <div className="flex justify-between items-center w-full">
                            <div>
                              <p className="font-medium">{bread.name}</p>
                              <p className="text-sm text-gray-600">
                                {bread.temp}°C • {bread.yeast === 'dry' ? 'Seca' : bread.yeast === 'fresh' ? 'Fresca' : 'Sourdough'} • {formatTime(bread.time)}
                              </p>
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
                      Guía de Temperaturas
                    </h3>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-blue-800 font-medium">15-18°C</span>
                        <span className="text-blue-600">Fermentación lenta (8-12h)</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-green-800 font-medium">20-24°C</span>
                        <span className="text-green-600">Fermentación normal (1-2h)</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-yellow-800 font-medium">25-28°C</span>
                        <span className="text-yellow-600">Fermentación rápida (45-90min)</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <span className="text-red-800 font-medium">30°C+</span>
                        <span className="text-red-600">Riesgo de sobrefermentación</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Consejos para Panaderos
                    </h3>
                    
                    <div className="space-y-4 text-sm text-gray-700">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-1">Prueba del Dedo</h4>
                        <p>Presiona suavemente la masa. Si se recupera lentamente, está lista para el siguiente paso.</p>
                      </div>
                      
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-1">Control de Humedad</h4>
                        <p>Mantén la masa cubierta con un paño húmedo para evitar que se seque durante la fermentación.</p>
                      </div>
                      
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-1">Fermentación en Frío</h4>
                        <p>Para sabores más complejos, fermenta en el refrigerador durante 12-24 horas.</p>
                      </div>
                      
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-1">Observación Visual</h4>
                        <p>La masa debe duplicar su tamaño. Los tiempos son orientativos, observa el desarrollo real.</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <FAQ
              title="Preguntas Frecuentes sobre Fermentación"
              items={[
                {
                  question: "¿Por qué es importante la temperatura en la fermentación?",
                  answer: "La temperatura afecta directamente la velocidad de fermentación. Temperaturas más altas aceleran el proceso pero pueden producir sabores menos desarrollados. Temperaturas más bajas producen fermentación más lenta pero con mejor sabor."
                },
                {
                  question: "¿Cuál es la diferencia entre levadura seca y fresca?",
                  answer: "La levadura fresca es más activa y produce mejor sabor, pero tiene menor vida útil. La levadura seca es más conveniente y duradera. Generalmente se usa 1/3 menos de levadura seca que fresca."
                },
                {
                  question: "¿Cómo sé si la masa está sobrefermentada?",
                  answer: "Signos de sobrefermentación: masa muy pegajosa, olor a alcohol, colapso al tocar, sabor ácido excesivo. La masa debe duplicar su tamaño pero mantener estructura."
                },
                {
                  question: "¿Puedo acelerar la fermentación?",
                  answer: "Sí, aumentando la temperatura o la cantidad de levadura, pero esto puede afectar el sabor. Es mejor planificar con tiempo y usar fermentación lenta para mejores resultados."
                }
              ]}
            />
          </div>
        </Container>
      </CalculatorLayout>
    </>
  );
}
