"use client";

import { useState } from 'react';
import { Calculator, Zap, Clock, Wifi, MapPin, Gamepad2, Globe } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { analyzeLatency } from '@/lib/math/technology';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function AnalisisLatenciaClient() {
  const [pingMs, setPingMs] = useState<string>('');
  const [distanceKm, setDistanceKm] = useState<string>('');
  const [resultado, setResultado] = useState<{
    pingMs: number;
    responseTime: {
      seconds: number;
      formatted: string;
    };
    category: 'excelente' | 'bueno' | 'aceptable' | 'lento';
    description: string;
    useCases: string[];
    theoreticalDistance?: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const pingNum = parseFloat(pingMs);
    const distanceNum = distanceKm ? parseFloat(distanceKm) : undefined;

    if (isNaN(pingNum) || pingNum < 0) {
      setError('El ping debe ser un valor numérico mayor o igual a 0.');
      return;
    }

    if (distanceKm && (isNaN(distanceNum!) || distanceNum! <= 0)) {
      setError('La distancia debe ser un valor numérico mayor a 0.');
      return;
    }

    try {
      const resultado = analyzeLatency(pingNum, distanceNum);
      setResultado(resultado);
    } catch {
      setError('Error al analizar la latencia. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '50ms ping',
      values: { pingMs: '50', distanceKm: '' }
    },
    {
      label: '20ms ping, 100km distancia',
      values: { pingMs: '20', distanceKm: '100' }
    },
    {
      label: '150ms ping',
      values: { pingMs: '150', distanceKm: '' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es la latencia?',
      answer: 'La latencia es el tiempo que tarda un paquete de datos en viajar desde tu dispositivo hasta el servidor y regresar. Se mide en milisegundos (ms).'
    },
    {
      question: '¿Qué ping es bueno para gaming?',
      answer: 'Para gaming competitivo: menos de 20ms es excelente, 20-50ms es bueno, 50-100ms es aceptable, más de 100ms puede afectar la experiencia.'
    },
    {
      question: '¿Qué factores afectan la latencia?',
      answer: 'Distancia física, tipo de conexión (fibra vs cable), congestión de red, calidad del proveedor de internet, y la infraestructura del servidor.'
    },
    {
      question: '¿Cómo se calcula la distancia teórica?',
      answer: 'Se usa la velocidad de la luz en fibra óptica (≈200,000 km/s) dividida por 2 (ida y vuelta). Es una aproximación teórica del tiempo mínimo posible.'
    }
  ];

  const relatedLinks = getRelatedCalculators('tecnologia', 'analisis-latencia').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setPingMs(values.pingMs as string);
    setDistanceKm(values.distanceKm as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/tecnologia/analisis-latencia/');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'excelente': return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      case 'bueno': return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      case 'aceptable': return { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
      case 'lento': return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
      default: return { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'excelente': return 'Excelente';
      case 'bueno': return 'Bueno';
      case 'aceptable': return 'Aceptable';
      case 'lento': return 'Lento';
      default: return 'Desconocido';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'excelente': return <Zap className="h-5 w-5" />;
      case 'bueno': return <Wifi className="h-5 w-5" />;
      case 'aceptable': return <Globe className="h-5 w-5" />;
      case 'lento': return <Clock className="h-5 w-5" />;
      default: return <Zap className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Analizador de Latencia',
            description: 'Analiza latencia y tiempo de respuesta para gaming y aplicaciones',
            url: '/tecnologia/analisis-latencia/',
            category: 'tecnologia'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Análisis de Latencia"
            description="Analiza latencia y tiempo de respuesta para gaming, videollamadas y aplicaciones. Convierte ping en tiempo real y evalúa calidad de conexión."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="pingMs">Ping (ms)</Label>
                <Input
                  id="pingMs"
                  type="number"
                  min="0"
                  step="0.1"
                  value={pingMs}
                  onChange={(e) => setPingMs(e.target.value)}
                  placeholder="Ej: 50"
                />
                <p className="text-sm text-gray-500 mt-1">Tiempo de respuesta en milisegundos</p>
              </div>
              
              <div>
                <Label htmlFor="distanceKm">Distancia (km) - Opcional</Label>
                <Input
                  id="distanceKm"
                  type="number"
                  min="0"
                  step="0.1"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(e.target.value)}
                  placeholder="Ej: 100"
                />
                <p className="text-sm text-gray-500 mt-1">Distancia física al servidor para cálculo teórico</p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Analizar Latencia
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Análisis de Latencia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Ping</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.pingMs} ms</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Tiempo de Respuesta</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.responseTime.formatted}</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${getCategoryColor(resultado.category).bg} ${getCategoryColor(resultado.category).border}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(resultado.category)}
                        <h4 className={`font-semibold ${getCategoryColor(resultado.category).color}`}>
                          📊 Categoría de Latencia: {getCategoryLabel(resultado.category)}
                        </h4>
                      </div>
                      <p className={`text-sm ${getCategoryColor(resultado.category).color}`}>
                        {resultado.description}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Gamepad2 className="h-5 w-5 text-blue-600" />
                          <span className="text-sm text-gray-600">Casos de Uso Recomendados</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                          {resultado.useCases.map((useCase, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {useCase}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {resultado.theoreticalDistance && (
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Distancia Teórica Mínima</span>
                        </div>
                        <p className="text-lg font-bold text-purple-600">
                          {Math.round(resultado.theoreticalDistance)} km
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Basado en velocidad de la luz en fibra óptica (200,000 km/s)
                        </p>
                      </div>
                    )}

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">📊 Detalles Técnicos</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• <strong>Ping:</strong> {resultado.pingMs} ms</p>
                        <p>• <strong>Tiempo de respuesta:</strong> {resultado.responseTime.formatted}</p>
                        <p>• <strong>Categoría:</strong> {getCategoryLabel(resultado.category)}</p>
                        {resultado.theoreticalDistance && (
                          <p>• <strong>Distancia teórica:</strong> {Math.round(resultado.theoreticalDistance)} km</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">🎮 Guía de Latencia para Gaming</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>&lt; 20ms:</strong> Excelente para gaming competitivo</p>
                        <p>• <strong>20-50ms:</strong> Bueno para gaming casual y videollamadas</p>
                        <p>• <strong>50-100ms:</strong> Aceptable para navegación y streaming</p>
                        <p>• <strong>&gt; 100ms:</strong> Retraso notable, evita gaming competitivo</p>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">💡 Consejos para Mejorar Latencia</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• Usa conexión por cable en lugar de WiFi</p>
                        <p>• Elige servidores más cercanos geográficamente</p>
                        <p>• Cierra aplicaciones que consuman ancho de banda</p>
                        <p>• Considera actualizar tu plan de internet</p>
                        <p>• Usa DNS más rápidos (Google DNS, Cloudflare)</p>
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
  );
}
