"use client";

import { useState } from 'react';
import { Calculator, Bus, Clock, Calendar, TrendingUp } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularTiempoTransporte } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function TiempoTransporteClient() {
  const [minutosDiarios, setMinutosDiarios] = useState<string>('');
  const [diasLaborales, setDiasLaborales] = useState<string>('250');
  const [añosTrabajo, setAñosTrabajo] = useState<string>('40');
  const [resultado, setResultado] = useState<{
    minutosTotales: number;
    horasTotales: number;
    diasTotales: number;
    añosTotales: number;
    porcentajeVida: number;
    mensaje: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const minutosNum = parseFloat(minutosDiarios);
    const diasNum = parseFloat(diasLaborales);
    const añosNum = parseFloat(añosTrabajo);

    if (isNaN(minutosNum) || isNaN(diasNum) || isNaN(añosNum)) {
      setError('Por favor, ingresa valores numéricos válidos.');
      return;
    }

    if (minutosNum <= 0 || minutosNum > 480) {
      setError('Los minutos diarios deben estar entre 1 y 480 (8 horas).');
      return;
    }

    if (diasNum <= 0 || diasNum > 365) {
      setError('Los días laborales deben estar entre 1 y 365.');
      return;
    }

    if (añosNum <= 0 || añosNum > 60) {
      setError('Los años de trabajo deben estar entre 1 y 60.');
      return;
    }

    try {
      const resultado = calcularTiempoTransporte(minutosNum, diasNum, añosNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el tiempo de transporte. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '60 minutos diarios, 250 días/año, 40 años',
      values: { minutosDiarios: '60', diasLaborales: '250', añosTrabajo: '40' }
    },
    {
      label: '90 minutos diarios, 220 días/año, 35 años',
      values: { minutosDiarios: '90', diasLaborales: '220', añosTrabajo: '35' }
    },
    {
      label: '30 minutos diarios, 260 días/año, 45 años',
      values: { minutosDiarios: '30', diasLaborales: '260', añosTrabajo: '45' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué incluye el tiempo de transporte?',
      answer: 'Incluye el tiempo total de ida y vuelta al trabajo en transporte público: autobús, metro, tren, etc. No incluye transporte privado.'
    },
    {
      question: '¿Por qué 250 días laborales por defecto?',
      answer: 'Es un promedio que considera vacaciones, días festivos y fines de semana. Puedes ajustarlo según tu situación específica.'
    },
    {
      question: '¿Cómo puedo optimizar mi tiempo de transporte?',
      answer: 'Considera teletrabajo, mudarte más cerca del trabajo, usar el tiempo para leer/estudiar, o cambiar a horarios con menos tráfico.'
    },
    {
      question: '¿Es normal gastar tanto tiempo en transporte?',
      answer: 'Depende de la ciudad y el trabajo. En grandes ciudades es común gastar 1-2 horas diarias. Considera si vale la pena el costo-beneficio.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'tiempo-transporte').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setMinutosDiarios(values.minutosDiarios as string);
    setDiasLaborales(values.diasLaborales as string);
    setAñosTrabajo(values.añosTrabajo as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/tiempo-transporte/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Tiempo en Transporte Público',
            description: 'Calcula cuántos días y años de vida gastas en transporte público durante tu vida laboral',
            url: '/curiosas/tiempo-transporte/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Tiempo en Transporte Público"
            description="Calcula cuántos días y años de vida gastas en transporte público durante tu vida laboral. Descubre el tiempo total que dedicas a viajar."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="minutosDiarios">Minutos Diarios en Transporte</Label>
                <Input
                  id="minutosDiarios"
                  type="number"
                  min="1"
                  max="480"
                  value={minutosDiarios}
                  onChange={(e) => setMinutosDiarios(e.target.value)}
                  placeholder="Ej: 60 (ida y vuelta)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Incluye el tiempo total de ida y vuelta al trabajo
                </p>
              </div>
              
              <div>
                <Label htmlFor="diasLaborales">Días Laborales por Año</Label>
                <Input
                  id="diasLaborales"
                  type="number"
                  min="1"
                  max="365"
                  value={diasLaborales}
                  onChange={(e) => setDiasLaborales(e.target.value)}
                  placeholder="Ej: 250"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Considera vacaciones, días festivos y fines de semana
                </p>
              </div>
              
              <div>
                <Label htmlFor="añosTrabajo">Años Trabajando</Label>
                <Input
                  id="añosTrabajo"
                  type="number"
                  min="1"
                  max="60"
                  value={añosTrabajo}
                  onChange={(e) => setAñosTrabajo(e.target.value)}
                  placeholder="Ej: 40"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Duración total de tu vida laboral
                </p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Tiempo
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
                      <Bus className="h-5 w-5" />
                      Tiempo Total en Transporte
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Minutos Diarios</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{minutosDiarios} min</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Días Laborales/Año</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{diasLaborales}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Horas Totales</p>
                          <p className="text-3xl font-bold text-orange-600">{resultado.horasTotales}h</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Días Totales</p>
                          <p className="text-3xl font-bold text-red-600">{resultado.diasTotales}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Años Totales</p>
                          <p className="text-3xl font-bold text-purple-600">{resultado.añosTotales}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">⏰ Impacto en tu Vida</h4>
                      <p className="text-sm text-red-700">
                        {resultado.mensaje}
                      </p>
                      <p className="text-sm text-red-700 mt-2">
                        Esto representa el <strong>{resultado.porcentajeVida}%</strong> de tu vida laboral.
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Alternativas para Optimizar tu Tiempo</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Teletrabajo:</strong> Trabajar desde casa 2-3 días por semana</p>
                        <p>• <strong>Lectura:</strong> Usar el tiempo para leer libros o artículos</p>
                        <p>• <strong>Podcasts:</strong> Escuchar contenido educativo durante el viaje</p>
                        <p>• <strong>Mudanza:</strong> Vivir más cerca del trabajo</p>
                        <p>• <strong>Horarios flexibles:</strong> Evitar las horas pico</p>
                        <p>• <strong>Transporte activo:</strong> Caminar o usar bicicleta cuando sea posible</p>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">📊 Comparación con Actividades</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• Con {resultado.horasTotales} horas podrías haber visto <strong>{Math.round(resultado.horasTotales / 2)} películas</strong></p>
                        <p>• O leído <strong>{Math.round(resultado.horasTotales / 3)} libros</strong></p>
                        <p>• O aprendido <strong>{Math.round(resultado.horasTotales / 40)} idiomas</strong></p>
                        <p>• O hecho ejercicio durante <strong>{Math.round(resultado.horasTotales / 1.5)} horas</strong></p>
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
