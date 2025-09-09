"use client";

import { useState } from 'react';
import { Calculator, Thermometer, MapPin, Globe, Sun } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { encontrarCiudadesIdeal } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function NivelFriolentoClient() {
  const [temperaturaIdeal, setTemperaturaIdeal] = useState<string>('');
  const [tolerancia, setTolerancia] = useState<string>('3');
  const [resultado, setResultado] = useState<{
    temperaturaIdeal: number;
    tolerancia: number;
    ciudadesIdeal: Array<{ nombre: string; temperatura: number; pais: string }>;
    ciudadesCercanas: Array<{ nombre: string; temperatura: number; pais: string }>;
    totalCiudadesIdeal: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const tempNum = parseFloat(temperaturaIdeal);
    const toleranciaNum = parseFloat(tolerancia);

    if (isNaN(tempNum) || isNaN(toleranciaNum)) {
      setError('Por favor, ingresa valores numéricos válidos para temperatura y tolerancia.');
      return;
    }

    if (tempNum < -20 || tempNum > 40) {
      setError('La temperatura ideal debe estar entre -20°C y 40°C.');
      return;
    }

    if (toleranciaNum < 1 || toleranciaNum > 10) {
      setError('La tolerancia debe estar entre 1°C y 10°C.');
      return;
    }

    try {
      const resultado = encontrarCiudadesIdeal(tempNum, toleranciaNum);
      setResultado(resultado);
    } catch {
      setError('Error al buscar ciudades. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Temperatura ideal: 18°C, tolerancia: 3°C',
      values: { temperaturaIdeal: '18', tolerancia: '3' }
    },
    {
      label: 'Temperatura ideal: 22°C, tolerancia: 2°C',
      values: { temperaturaIdeal: '22', tolerancia: '2' }
    },
    {
      label: 'Temperatura ideal: 15°C, tolerancia: 4°C',
      values: { temperaturaIdeal: '15', tolerancia: '4' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cómo se determina la temperatura ideal?',
      answer: 'La temperatura ideal es aquella en la que te sientes más cómodo durante la mayor parte del año. Puede variar según tu lugar de origen, preferencias personales, y adaptación al clima.'
    },
    {
      question: '¿Qué significa la tolerancia de temperatura?',
      answer: 'La tolerancia es cuántos grados por encima o por debajo de tu temperatura ideal puedes aceptar y seguir sintiéndote cómodo. Una tolerancia mayor te dará más opciones de ciudades.'
    },
    {
      question: '¿Son precisas estas temperaturas promedio?',
      answer: 'Estas son temperaturas promedio anuales de ciudades populares. Las temperaturas reales pueden variar según la estación, ubicación específica en la ciudad, y condiciones climáticas locales.'
    },
    {
      question: '¿Qué otros factores debo considerar al elegir una ciudad?',
      answer: 'Además del clima, considera la humedad, precipitaciones, viento, calidad del aire, costo de vida, cultura, idioma, oportunidades laborales, y servicios de salud.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'nivel-friolento').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setTemperaturaIdeal(values.temperaturaIdeal as string);
    setTolerancia(values.tolerancia as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/nivel-friolento/');

  const getTemperaturaColor = (temp: number, ideal: number, tolerancia: number) => {
    const diferencia = Math.abs(temp - ideal);
    if (diferencia <= tolerancia) return 'text-green-600';
    if (diferencia <= tolerancia + 2) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Nivel de Friolento',
            description: 'Descubre en qué ciudades del mundo estarías siempre cómodo según tu temperatura ideal',
            url: '/curiosas/nivel-friolento/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Nivel de Friolento"
            description="Descubre en qué ciudades del mundo estarías siempre cómodo según tu temperatura ideal. Encuentra tu destino perfecto basado en el clima."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="temperaturaIdeal">Temperatura Ideal (°C)</Label>
                <Input
                  id="temperaturaIdeal"
                  type="number"
                  step="0.5"
                  value={temperaturaIdeal}
                  onChange={(e) => setTemperaturaIdeal(e.target.value)}
                  placeholder="Ej: 18"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Temperatura en la que te sientes más cómodo
                </p>
              </div>
              
              <div>
                <Label htmlFor="tolerancia">Tolerancia de Temperatura (°C)</Label>
                <Input
                  id="tolerancia"
                  type="number"
                  step="0.5"
                  value={tolerancia}
                  onChange={(e) => setTolerancia(e.target.value)}
                  placeholder="Ej: 3"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Cuántos grados por encima/abajo puedes aceptar
                </p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Buscar Ciudades
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center gap-2">
                      <Thermometer className="h-5 w-5" />
                      Ciudades Ideales para Ti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Thermometer className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Temperatura Ideal</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.temperaturaIdeal}°C</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Sun className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Tolerancia</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">±{resultado.tolerancia}°C</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Ciudades Perfectas Encontradas</p>
                          <p className="text-3xl font-bold text-green-600">{resultado.totalCiudadesIdeal}</p>
                        </div>
                      </div>
                    </div>

                    {resultado.ciudadesIdeal.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Ciudades Perfectas ({resultado.ciudadesIdeal.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {resultado.ciudadesIdeal.map((ciudad, index) => (
                            <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold text-green-800">{ciudad.nombre}</p>
                                  <p className="text-sm text-green-600">{ciudad.pais}</p>
                                </div>
                                <div className="text-right">
                                  <p className={`text-lg font-bold ${getTemperaturaColor(ciudad.temperatura, resultado.temperaturaIdeal, resultado.tolerancia)}`}>
                                    {ciudad.temperatura}°C
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {resultado.ciudadesCercanas.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-700 mb-3 flex items-center gap-2">
                          <Globe className="h-5 w-5" />
                          Ciudades Cercanas ({resultado.ciudadesCercanas.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {resultado.ciudadesCercanas.map((ciudad, index) => (
                            <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold text-yellow-800">{ciudad.nombre}</p>
                                  <p className="text-sm text-yellow-600">{ciudad.pais}</p>
                                </div>
                                <div className="text-right">
                                  <p className={`text-lg font-bold ${getTemperaturaColor(ciudad.temperatura, resultado.temperaturaIdeal, resultado.tolerancia)}`}>
                                    {ciudad.temperatura}°C
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">🌍 Información Adicional</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Rango ideal:</strong> {resultado.temperaturaIdeal - resultado.tolerancia}°C a {resultado.temperaturaIdeal + resultado.tolerancia}°C</p>
                        <p>• <strong>Ciudades perfectas:</strong> Temperatura dentro de tu rango ideal</p>
                        <p>• <strong>Ciudades cercanas:</strong> Temperatura ligeramente fuera de tu rango ideal</p>
                        <p>• <strong>Nota:</strong> Estas son temperaturas promedio anuales. Considera también las estaciones del año</p>
                      </div>
                    </div>

                    {resultado.totalCiudadesIdeal === 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">💡 Sugerencias</h4>
                        <div className="text-sm text-yellow-700 space-y-1">
                          <p>• <strong>Aumenta la tolerancia:</strong> Prueba con una tolerancia mayor para encontrar más ciudades</p>
                          <p>• <strong>Considera otras regiones:</strong> Explora ciudades en diferentes continentes</p>
                          <p>• <strong>Adaptación:</strong> Recuerda que puedes adaptarte gradualmente a diferentes climas</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  );
}
