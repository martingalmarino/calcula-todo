"use client";

import { useState } from 'react';
import { Calculator, Heart, AlertTriangle, TrendingDown } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularImpactoComidaChatarra } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function ExpectativaComidaClient() {
  const [hamburguesas, setHamburguesas] = useState<string>('');
  const [gaseosas, setGaseosas] = useState<string>('');
  const [pizzas, setPizzas] = useState<string>('');
  const [resultado, setResultado] = useState<{
    hamburguesas: number;
    gaseosas: number;
    pizzas: number;
    diasPerdidosSemana: number;
    diasPerdidosAño: number;
    diasPerdidosVida: number;
    añosPerdidos: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const hamburguesasNum = parseFloat(hamburguesas);
    const gaseosasNum = parseFloat(gaseosas);
    const pizzasNum = parseFloat(pizzas);

    if (isNaN(hamburguesasNum) || isNaN(gaseosasNum) || isNaN(pizzasNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (hamburguesasNum < 0 || gaseosasNum < 0 || pizzasNum < 0) {
      setError('Los valores no pueden ser negativos.');
      return;
    }

    if (hamburguesasNum > 14 || gaseosasNum > 21 || pizzasNum > 7) {
      setError('Los valores parecen muy altos. Verifica que sean por semana, no por día.');
      return;
    }

    try {
      const resultado = calcularImpactoComidaChatarra(hamburguesasNum, gaseosasNum, pizzasNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el impacto. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '2 hamburguesas, 3 gaseosas, 1 pizza por semana',
      values: { hamburguesas: '2', gaseosas: '3', pizzas: '1' }
    },
    {
      label: '1 hamburguesa, 5 gaseosas, 0 pizzas por semana',
      values: { hamburguesas: '1', gaseosas: '5', pizzas: '0' }
    },
    {
      label: '3 hamburguesas, 2 gaseosas, 2 pizzas por semana',
      values: { hamburguesas: '3', gaseosas: '2', pizzas: '2' }
    }
  ];

  const faqItems = [
    {
      question: '¿Estos cálculos son científicamente precisos?',
      answer: 'Estos cálculos son estimaciones educativas basadas en estudios generales sobre alimentación y salud. Son simplificaciones para fines informativos y no deben considerarse como consejo médico preciso.'
    },
    {
      question: '¿Qué factores no se consideran en este cálculo?',
      answer: 'No se consideran factores como genética, ejercicio, otros hábitos de vida, calidad del sueño, estrés, o el tipo específico de comida chatarra consumida. La salud es multifactorial.'
    },
    {
      question: '¿Puedo compensar la comida chatarra con ejercicio?',
      answer: 'El ejercicio puede ayudar, pero no compensa completamente una dieta poco saludable. Lo ideal es combinar una alimentación balanceada con actividad física regular.'
    },
    {
      question: '¿Qué se considera "comida chatarra"?',
      answer: 'Generalmente se refiere a alimentos altos en calorías, grasas saturadas, azúcares y sodio, con bajo valor nutricional. Incluye hamburguesas, pizzas, gaseosas, snacks procesados, etc.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'expectativa-comida').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setHamburguesas(values.hamburguesas as string);
    setGaseosas(values.gaseosas as string);
    setPizzas(values.pizzas as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/expectativa-comida/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Expectativa de Vida y Comida Chatarra',
            description: 'Descubre el impacto de la comida chatarra en tu expectativa de vida con estimaciones educativas',
            url: '/curiosas/expectativa-comida/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Expectativa de Vida y Comida Chatarra"
            description="Descubre el impacto estimado de la comida chatarra en tu expectativa de vida. Datos educativos para reflexionar sobre hábitos alimenticios."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Importante</AlertTitle>
                <AlertDescription>
                  Esta calculadora es solo para fines educativos y entretenimiento. No reemplaza el consejo médico profesional.
                </AlertDescription>
              </Alert>

              <div>
                <Label htmlFor="hamburguesas">Hamburguesas por Semana</Label>
                <Input
                  id="hamburguesas"
                  type="number"
                  value={hamburguesas}
                  onChange={(e) => setHamburguesas(e.target.value)}
                  placeholder="Ej: 2"
                />
              </div>
              
              <div>
                <Label htmlFor="gaseosas">Gaseosas por Semana</Label>
                <Input
                  id="gaseosas"
                  type="number"
                  value={gaseosas}
                  onChange={(e) => setGaseosas(e.target.value)}
                  placeholder="Ej: 3"
                />
              </div>
              
              <div>
                <Label htmlFor="pizzas">Pizzas por Semana</Label>
                <Input
                  id="pizzas"
                  type="number"
                  value={pizzas}
                  onChange={(e) => setPizzas(e.target.value)}
                  placeholder="Ej: 1"
                />
              </div>
              
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular Impacto
              </Button>

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
                      <Heart className="h-5 w-5" />
                      Impacto en la Expectativa de Vida
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Hamburguesas/semana</span>
                        </div>
                        <p className="text-2xl font-bold text-red-600">{resultado.hamburguesas}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Gaseosas/semana</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{resultado.gaseosas}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Pizzas/semana</span>
                        </div>
                        <p className="text-2xl font-bold text-yellow-600">{resultado.pizzas}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Días perdidos/semana</p>
                            <p className="text-3xl font-bold text-orange-600">{resultado.diasPerdidosSemana.toFixed(1)}</p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Días perdidos/año</p>
                            <p className="text-3xl font-bold text-red-600">{resultado.diasPerdidosAño.toFixed(0)}</p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-red-300">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Años perdidos (50 años)</p>
                            <p className="text-3xl font-bold text-red-600">{resultado.añosPerdidos.toFixed(1)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Interpretación de los Resultados</h4>
                      <p className="text-sm text-yellow-700">
                        Según estos cálculos estimativos, tu consumo actual de comida chatarra podría reducir tu expectativa de vida en aproximadamente <strong>{resultado.añosPerdidos.toFixed(1)} años</strong> durante un período de 50 años.
                      </p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">💡 Recomendaciones</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• <strong>Moderación:</strong> No es necesario eliminar completamente la comida chatarra, pero sí moderar su consumo</p>
                        <p>• <strong>Balance:</strong> Compensa con frutas, verduras, proteínas magras y granos integrales</p>
                        <p>• <strong>Hidratación:</strong> Reemplaza las gaseosas con agua, té o bebidas sin azúcar</p>
                        <p>• <strong>Ejercicio:</strong> Mantén una rutina de ejercicio regular para contrarrestar los efectos</p>
                        <p>• <strong>Consulta médica:</strong> Habla con un profesional de la salud sobre tu dieta</p>
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
