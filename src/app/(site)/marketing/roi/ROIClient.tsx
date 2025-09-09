"use client";

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Target, AlertCircle } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularROIMarketing } from '@/lib/math/marketing';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function ROIClient() {
  const [ingresos, setIngresos] = useState<string>('');
  const [inversion, setInversion] = useState<string>('');
  const [resultado, setResultado] = useState<{
    ingresos: number;
    inversion: number;
    gananciaNeta: number;
    roi: number;
    ratioROI: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const ingresosNum = parseFloat(ingresos);
    const inversionNum = parseFloat(inversion);

    if (isNaN(ingresosNum) || isNaN(inversionNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (inversionNum <= 0) {
      setError('La inversión debe ser un valor positivo.');
      return;
    }

    if (ingresosNum < 0) {
      setError('Los ingresos no pueden ser negativos.');
      return;
    }

    try {
      const resultado = calcularROIMarketing(ingresosNum, inversionNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el ROI. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Campaña exitosa: $15,000 ingresos, $5,000 inversión',
      values: { ingresos: '15000', inversion: '5000' }
    },
    {
      label: 'Campaña moderada: $8,000 ingresos, $3,000 inversión',
      values: { ingresos: '8000', inversion: '3000' }
    },
    {
      label: 'Campaña con pérdidas: $2,000 ingresos, $5,000 inversión',
      values: { ingresos: '2000', inversion: '5000' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es el ROI en marketing?',
      answer: 'El ROI (Retorno de Inversión) mide la rentabilidad de una campaña de marketing. Se calcula como: (Ingresos - Inversión) / Inversión × 100. Un ROI positivo indica ganancia, negativo indica pérdida.'
    },
    {
      question: '¿Cuál es un buen ROI en marketing?',
      answer: 'Un ROI del 200-300% (o 2:1 a 3:1) se considera bueno. Un ROI del 500% o más es excelente. Lo importante es que sea positivo y superior a otras inversiones alternativas.'
    },
    {
      question: '¿Cómo mejorar el ROI de marketing?',
      answer: 'Optimiza tus campañas, mejora el targeting, reduce costos de adquisición, aumenta el valor de los clientes, automatiza procesos y mide constantemente los resultados.'
    },
    {
      question: '¿Qué incluir en los ingresos?',
      answer: 'Incluye todos los ingresos directamente atribuibles a la campaña: ventas, suscripciones, leads convertidos, etc. Excluye ingresos que habrías tenido sin la campaña.'
    }
  ];

  const relatedLinks = getRelatedCalculators('marketing', 'roi').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setIngresos(values.ingresos as string);
    setInversion(values.inversion as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/marketing/roi/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de ROI en Marketing',
            description: 'Mide el retorno de inversión de campañas de marketing y publicidad usando la fórmula estándar',
            url: '/marketing/roi/',
            category: 'marketing'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de ROI en Marketing"
            description="Mide el retorno de inversión de tus campañas de marketing y publicidad para evaluar su rentabilidad."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="ingresos">Ingresos Generados por la Campaña ($)</Label>
                <Input
                  id="ingresos"
                  type="number"
                  value={ingresos}
                  onChange={(e) => setIngresos(e.target.value)}
                  placeholder="Ej: 15000"
                />
              </div>
              
              <div>
                <Label htmlFor="inversion">Inversión en la Campaña ($)</Label>
                <Input
                  id="inversion"
                  type="number"
                  value={inversion}
                  onChange={(e) => setInversion(e.target.value)}
                  placeholder="Ej: 5000"
                />
              </div>
              
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular ROI
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
                      <TrendingUp className="h-5 w-5" />
                      Resultados del ROI
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Ingresos Generados</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">${resultado.ingresos.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Inversión Realizada</span>
                        </div>
                        <p className="text-2xl font-bold text-red-600">${resultado.inversion.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Ganancia Neta</p>
                            <p className={`text-3xl font-bold ${resultado.gananciaNeta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ${resultado.gananciaNeta.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Ratio ROI</p>
                            <p className="text-3xl font-bold text-blue-600">{resultado.ratioROI.toFixed(2)}:1</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border-2 border-green-300 mt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">ROI (Retorno de Inversión)</p>
                          <p className={`text-4xl font-bold ${resultado.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {resultado.roi.toFixed(1)}%
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            {resultado.roi >= 0 ? 'Campaña rentable' : 'Campaña con pérdidas'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`border rounded-lg p-4 ${resultado.roi >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <div className="flex items-start gap-2">
                        <AlertCircle className={`h-5 w-5 mt-0.5 ${resultado.roi >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                        <div>
                          <h4 className={`font-semibold mb-2 ${resultado.roi >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                            Interpretación del Resultado
                          </h4>
                          <div className={`text-sm space-y-1 ${resultado.roi >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {resultado.roi >= 0 ? (
                              <>
                                <p>• <strong>ROI Positivo:</strong> Tu campaña generó un retorno del {resultado.roi.toFixed(1)}%</p>
                                <p>• <strong>Ganancia:</strong> Obtuviste ${resultado.gananciaNeta.toLocaleString()} más de lo que invertiste</p>
                                <p>• <strong>Eficiencia:</strong> Por cada $1 invertido, obtuviste ${resultado.ratioROI.toFixed(2)} en ingresos</p>
                              </>
                            ) : (
                              <>
                                <p>• <strong>ROI Negativo:</strong> Tu campaña tuvo una pérdida del {Math.abs(resultado.roi).toFixed(1)}%</p>
                                <p>• <strong>Pérdida:</strong> Perdiste ${Math.abs(resultado.gananciaNeta).toLocaleString()} en esta campaña</p>
                                <p>• <strong>Recomendación:</strong> Revisa y optimiza tu estrategia antes de continuar</p>
                              </>
                            )}
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
