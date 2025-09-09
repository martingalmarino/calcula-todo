"use client";

import { useState } from 'react';
import { Calculator, Tv, Clock, Calendar, Book, Dumbbell } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularTiempoNetflix } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function TiempoNetflixClient() {
  const [horasSemanales, setHorasSemanales] = useState<string>('');
  const [añosViendo, setAñosViendo] = useState<string>('');
  const [resultado, setResultado] = useState<{
    horasTotales: number;
    diasTotales: number;
    temporadasVistas: number;
    seriesCompletas: number;
    actividadesAlternativas: string[];
    mensaje: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const horasNum = parseFloat(horasSemanales);
    const añosNum = parseFloat(añosViendo);

    if (isNaN(horasNum) || isNaN(añosNum)) {
      setError('Por favor, ingresa valores numéricos válidos.');
      return;
    }

    if (horasNum <= 0 || horasNum > 168) {
      setError('Las horas semanales deben estar entre 1 y 168 (24x7).');
      return;
    }

    if (añosNum <= 0 || añosNum > 50) {
      setError('Los años viendo Netflix deben estar entre 1 y 50.');
      return;
    }

    try {
      const resultado = calcularTiempoNetflix(horasNum, añosNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el tiempo en Netflix. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '10 horas/semana durante 5 años',
      values: { horasSemanales: '10', añosViendo: '5' }
    },
    {
      label: '20 horas/semana durante 3 años',
      values: { horasSemanales: '20', añosViendo: '3' }
    },
    {
      label: '5 horas/semana durante 8 años',
      values: { horasSemanales: '5', añosViendo: '8' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cómo se calculan las temporadas vistas?',
      answer: 'Se asume que cada temporada tiene aproximadamente 8 horas de duración. Esto puede variar según el tipo de serie.'
    },
    {
      question: '¿Cómo se calculan las series completas?',
      answer: 'Se asume que cada serie tiene en promedio 3 temporadas. Esto es una estimación general que puede variar mucho.'
    },
    {
      question: '¿Son realistas las actividades alternativas?',
      answer: 'Son estimaciones aproximadas basadas en tiempos promedio. Por ejemplo, leer un libro puede tomar 2 horas, aprender un idioma básico unas 40 horas.'
    },
    {
      question: '¿Debería sentirme mal por ver Netflix?',
      answer: '¡Para nada! El entretenimiento es importante para la salud mental. Solo es interesante ver qué más podrías hacer con ese tiempo si quisieras.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'tiempo-netflix').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setHorasSemanales(values.horasSemanales as string);
    setAñosViendo(values.añosViendo as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/tiempo-netflix/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Tiempo en Netflix',
            description: 'Calcula cuántas temporadas has visto en Netflix, años de vida dedicados y actividades alternativas',
            url: '/curiosas/tiempo-netflix/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Tiempo en Netflix"
            description="Calcula cuántas temporadas has visto en Netflix, años de vida dedicados y qué actividades alternativas podrías haber realizado con ese tiempo."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="horasSemanales">Horas Semanales en Netflix</Label>
                <Input
                  id="horasSemanales"
                  type="number"
                  min="1"
                  max="168"
                  value={horasSemanales}
                  onChange={(e) => setHorasSemanales(e.target.value)}
                  placeholder="Ej: 10"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Incluye series, películas y cualquier contenido de Netflix
                </p>
              </div>
              
              <div>
                <Label htmlFor="añosViendo">Años Viendo Netflix</Label>
                <Input
                  id="añosViendo"
                  type="number"
                  min="1"
                  max="50"
                  value={añosViendo}
                  onChange={(e) => setAñosViendo(e.target.value)}
                  placeholder="Ej: 5"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Desde que empezaste a usar Netflix regularmente
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
                <Card className="mt-4 bg-red-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700 flex items-center gap-2">
                      <Tv className="h-5 w-5" />
                      Estadísticas de Netflix
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Horas/Semana</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{horasSemanales}h</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Años Viendo</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{añosViendo}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Horas Totales</p>
                          <p className="text-3xl font-bold text-red-600">{resultado.horasTotales}h</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Días Totales</p>
                          <p className="text-3xl font-bold text-orange-600">{resultado.diasTotales}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Temporadas Vistas</p>
                          <p className="text-3xl font-bold text-purple-600">{resultado.temporadasVistas}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Series Completas</p>
                          <p className="text-3xl font-bold text-blue-600">{resultado.seriesCompletas}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">🍿 Resumen</h4>
                      <p className="text-sm text-red-700">
                        {resultado.mensaje}
                      </p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">💡 Actividades Alternativas</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        {resultado.actividadesAlternativas.map((actividad, index) => (
                          <p key={index}>• {actividad}</p>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">🎯 Consejos para Equilibrar</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Establece límites:</strong> Define horarios específicos para ver series</p>
                        <p>• <strong>Actividades mixtas:</strong> Haz ejercicio mientras ves Netflix</p>
                        <p>• <strong>Contenido educativo:</strong> Elige documentales y series educativas</p>
                        <p>• <strong>Socializa:</strong> Ve series con amigos y familia</p>
                        <p>• <strong>Reflexiona:</strong> ¿Qué series realmente disfrutas vs. consumo pasivo?</p>
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
