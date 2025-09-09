"use client";

import { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Target, AlertCircle } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularPresupuestoMarketing } from '@/lib/math/marketing';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function PresupuestoClient() {
  const [ingresosTotales, setIngresosTotales] = useState<string>('');
  const [porcentajeRecomendado, setPorcentajeRecomendado] = useState<string>('7.5');
  const [resultado, setResultado] = useState<{
    ingresosTotales: number;
    porcentajeRecomendado: number;
    presupuestoRecomendado: number;
    presupuestoMinimo: number;
    presupuestoMaximo: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const ingresosNum = parseFloat(ingresosTotales);
    const porcentajeNum = parseFloat(porcentajeRecomendado);

    if (isNaN(ingresosNum) || isNaN(porcentajeNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (ingresosNum <= 0) {
      setError('Los ingresos totales deben ser un valor positivo.');
      return;
    }

    if (porcentajeNum < 1 || porcentajeNum > 20) {
      setError('El porcentaje recomendado debe estar entre 1% y 20%.');
      return;
    }

    try {
      const resultado = calcularPresupuestoMarketing(ingresosNum, porcentajeNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el presupuesto. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Startup: $100,000 ingresos, 7.5% recomendado',
      values: { ingresosTotales: '100000', porcentajeRecomendado: '7.5' }
    },
    {
      label: 'E-commerce: $500,000 ingresos, 8% recomendado',
      values: { ingresosTotales: '500000', porcentajeRecomendado: '8' }
    },
    {
      label: 'SaaS: $1,000,000 ingresos, 10% recomendado',
      values: { ingresosTotales: '1000000', porcentajeRecomendado: '10' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cuánto debería invertir en marketing?',
      answer: 'La regla general es invertir entre 5-10% de tus ingresos totales en marketing. Startups pueden necesitar hasta 20%, mientras que empresas establecidas pueden usar 5-7%.'
    },
    {
      question: '¿Qué factores influyen en el porcentaje recomendado?',
      answer: 'La etapa de tu empresa (startup vs establecida), la competencia, la estacionalidad, los objetivos de crecimiento y el tipo de industria influyen en el porcentaje ideal.'
    },
    {
      question: '¿Cómo distribuir el presupuesto de marketing?',
      answer: 'Distribuye entre canales digitales (40-60%), contenido y SEO (20-30%), eventos y networking (10-20%), y herramientas y software (5-10%).'
    },
    {
      question: '¿Cuándo aumentar el presupuesto de marketing?',
      answer: 'Aumenta cuando tengas un producto validado, procesos de venta optimizados, y cuando el ROI de marketing sea positivo y consistente.'
    }
  ];

  const relatedLinks = getRelatedCalculators('marketing', 'presupuesto').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setIngresosTotales(values.ingresosTotales as string);
    setPorcentajeRecomendado(values.porcentajeRecomendado as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/marketing/presupuesto/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Presupuesto de Marketing',
            description: 'Define cuánto invertir en marketing basado en tus ingresos totales con recomendaciones personalizadas',
            url: '/marketing/presupuesto/',
            category: 'marketing'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Presupuesto de Marketing"
            description="Define cuánto invertir en marketing basado en tus ingresos totales con recomendaciones personalizadas."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="ingresosTotales">Ingresos Totales Anuales ($)</Label>
                <Input
                  id="ingresosTotales"
                  type="number"
                  value={ingresosTotales}
                  onChange={(e) => setIngresosTotales(e.target.value)}
                  placeholder="Ej: 100000"
                />
              </div>
              
              <div>
                <Label htmlFor="porcentajeRecomendado">Porcentaje Recomendado (%)</Label>
                <Input
                  id="porcentajeRecomendado"
                  type="number"
                  step="0.1"
                  value={porcentajeRecomendado}
                  onChange={(e) => setPorcentajeRecomendado(e.target.value)}
                  placeholder="Ej: 7.5"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Recomendado: 5-10% (Startups: 10-20%, Empresas establecidas: 5-7%)
                </p>
              </div>
              
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular Presupuesto
              </Button>

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
                      <DollarSign className="h-5 w-5" />
                      Presupuesto de Marketing Recomendado
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Ingresos Totales</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">${resultado.ingresosTotales.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Porcentaje Usado</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.porcentajeRecomendado}%</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Presupuesto Recomendado</p>
                          <p className="text-4xl font-bold text-green-600">${resultado.presupuestoRecomendado.toLocaleString()}</p>
                          <p className="text-sm text-gray-500 mt-2">anual</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-yellow-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Presupuesto Mínimo (5%)</p>
                          <p className="text-2xl font-bold text-yellow-600">${resultado.presupuestoMinimo.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-red-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Presupuesto Máximo (10%)</p>
                          <p className="text-2xl font-bold text-red-600">${resultado.presupuestoMaximo.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-2">Recomendaciones</h4>
                          <div className="text-sm text-blue-700 space-y-1">
                            <p>• <strong>Distribución sugerida:</strong> 40% digital, 30% contenido, 20% eventos, 10% herramientas</p>
                            <p>• <strong>Monitorea el ROI:</strong> Asegúrate de que cada dólar invertido genere retorno</p>
                            <p>• <strong>Ajusta según resultados:</strong> Aumenta el presupuesto en canales que funcionen mejor</p>
                          </div>
                        </div>
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
