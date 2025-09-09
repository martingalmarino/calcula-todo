"use client";

import { useState } from 'react';
import { Calculator, Tv, Clock, Calendar } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularTiempoPeliculas } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function TiempoPeliculasClient() {
  const [horasSemanales, setHorasSemanales] = useState<string>('');
  const [edadActual, setEdadActual] = useState<string>('');
  const [expectativaVida, setExpectativaVida] = useState<string>('80');
  const [resultado, setResultado] = useState<{
    horasSemanales: number;
    edadActual: number;
    expectativaVida: number;
    horasAnuales: number;
    añosRestantes: number;
    horasTotalesVida: number;
    añosDedicados: number;
    peliculasCompletas: number;
    seriesCompletas: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const horasNum = parseFloat(horasSemanales);
    const edadNum = parseFloat(edadActual);
    const expectativaNum = parseFloat(expectativaVida);

    if (isNaN(horasNum) || isNaN(edadNum) || isNaN(expectativaNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (horasNum < 0 || horasNum > 168) {
      setError('Las horas semanales deben estar entre 0 y 168 (7 días × 24 horas).');
      return;
    }

    if (edadNum < 0 || edadNum > 120) {
      setError('La edad actual debe estar entre 0 y 120 años.');
      return;
    }

    if (expectativaNum < edadNum || expectativaNum > 120) {
      setError('La expectativa de vida debe ser mayor que la edad actual y menor a 120 años.');
      return;
    }

    try {
      const resultado = calcularTiempoPeliculas(horasNum, edadNum, expectativaNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el tiempo. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '10 horas/semana, 25 años, expectativa 80 años',
      values: { horasSemanales: '10', edadActual: '25', expectativaVida: '80' }
    },
    {
      label: '20 horas/semana, 30 años, expectativa 75 años',
      values: { horasSemanales: '20', edadActual: '30', expectativaVida: '75' }
    },
    {
      label: '5 horas/semana, 40 años, expectativa 85 años',
      values: { horasSemanales: '5', edadActual: '40', expectativaVida: '85' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cómo se calcula el tiempo dedicado a películas?',
      answer: 'Se multiplican las horas semanales por 52 semanas al año, y luego por los años restantes de vida según tu expectativa de vida. Esto te da el total de horas que dedicarás al entretenimiento.'
    },
    {
      question: '¿Qué se considera "tiempo de pantalla"?',
      answer: 'Incluye ver películas, series, documentales, videos en streaming, YouTube, y cualquier contenido audiovisual de entretenimiento. No incluye tiempo de trabajo o estudio.'
    },
    {
      question: '¿Es malo dedicar mucho tiempo a ver contenido?',
      answer: 'El entretenimiento es importante para la relajación y el bienestar mental. Sin embargo, es recomendable equilibrarlo con otras actividades como ejercicio, lectura, socialización y hobbies activos.'
    },
    {
      question: '¿Cómo puedo optimizar mi tiempo de entretenimiento?',
      answer: 'Elige contenido de calidad, establece horarios específicos, evita el "binge watching" excesivo, y considera actividades alternativas como leer, hacer ejercicio, o pasar tiempo con amigos y familia.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'tiempo-peliculas').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setHorasSemanales(values.horasSemanales as string);
    setEdadActual(values.edadActual as string);
    setExpectativaVida(values.expectativaVida as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/tiempo-peliculas/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Tiempo de Vida en Películas',
            description: 'Calcula cuántos años de vida dedicas a ver películas y series con equivalencias en contenido',
            url: '/curiosas/tiempo-peliculas/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Tiempo de Vida en Películas"
            description="Calcula cuántos años de vida dedicas a ver películas y series. Descubre cuántas películas completas equivalen a tu tiempo de entretenimiento."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="horasSemanales">Horas por Semana Viendo Contenido</Label>
                <Input
                  id="horasSemanales"
                  type="number"
                  step="0.5"
                  value={horasSemanales}
                  onChange={(e) => setHorasSemanales(e.target.value)}
                  placeholder="Ej: 10"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Incluye películas, series, YouTube, streaming, etc.
                </p>
              </div>
              
              <div>
                <Label htmlFor="edadActual">Edad Actual (años)</Label>
                <Input
                  id="edadActual"
                  type="number"
                  value={edadActual}
                  onChange={(e) => setEdadActual(e.target.value)}
                  placeholder="Ej: 25"
                />
              </div>
              
              <div>
                <Label htmlFor="expectativaVida">Expectativa de Vida (años)</Label>
                <Input
                  id="expectativaVida"
                  type="number"
                  value={expectativaVida}
                  onChange={(e) => setExpectativaVida(e.target.value)}
                  placeholder="Ej: 80"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Promedio mundial: 72 años. España: 83 años. USA: 79 años.
                </p>
              </div>
              
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular Tiempo
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center gap-2">
                      <Tv className="h-5 w-5" />
                      Resultados de Tiempo en Pantalla
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Horas/semana</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.horasSemanales}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Años restantes</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.añosRestantes}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Tv className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Horas/año</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.horasAnuales}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Horas Totales de Vida</p>
                          <p className="text-4xl font-bold text-purple-600">{resultado.horasTotalesVida.toLocaleString()}</p>
                          <p className="text-sm text-gray-500 mt-2">horas dedicadas al entretenimiento</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Años Dedicados</p>
                          <p className="text-3xl font-bold text-blue-600">{resultado.añosDedicados.toFixed(1)}</p>
                          <p className="text-sm text-gray-500">años completos</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">% de Vida Restante</p>
                          <p className="text-3xl font-bold text-green-600">{((resultado.añosDedicados / resultado.añosRestantes) * 100).toFixed(1)}%</p>
                          <p className="text-sm text-gray-500">del tiempo restante</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Películas Completas</p>
                          <p className="text-3xl font-bold text-orange-600">{resultado.peliculasCompletas.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">(2 horas cada una)</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Temporadas Completas</p>
                          <p className="text-3xl font-bold text-red-600">{resultado.seriesCompletas.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">(8 horas cada una)</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">🎬 Datos Sorprendentes</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Tiempo total:</strong> Dedicarás {resultado.añosDedicados.toFixed(1)} años completos al entretenimiento</p>
                        <p>• <strong>Equivalencia:</strong> Es como ver {resultado.peliculasCompletas.toLocaleString()} películas de 2 horas</p>
                        <p>• <strong>Series:</strong> O completar {resultado.seriesCompletas.toLocaleString()} temporadas de 8 horas</p>
                        <p>• <strong>Porcentaje:</strong> Representa el {((resultado.añosDedicados / resultado.añosRestantes) * 100).toFixed(1)}% de tu vida restante</p>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">💡 Consejos para Equilibrar</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• <strong>Calidad sobre cantidad:</strong> Elige contenido que realmente disfrutes</p>
                        <p>• <strong>Horarios fijos:</strong> Establece momentos específicos para el entretenimiento</p>
                        <p>• <strong>Actividades alternativas:</strong> Considera leer, hacer ejercicio, o hobbies activos</p>
                        <p>• <strong>Socialización:</strong> Ve contenido con amigos y familia para hacerlo más social</p>
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
