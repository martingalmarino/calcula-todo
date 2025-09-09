"use client";

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularDepreciacionVehiculo } from '@/lib/math/finance';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function DepreciacionVehiculosClient() {
  const [valorInicial, setValorInicial] = useState<string>('');
  const [valorResidual, setValorResidual] = useState<string>('');
  const [vidaUtil, setVidaUtil] = useState<string>('');
  const [resultado, setResultado] = useState<{
    valorInicial: number;
    valorResidual: number;
    vidaUtil: number;
    depreciacionAnual: number;
    depreciacionMensual: number;
    valorActual: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const valorInicialNum = parseFloat(valorInicial);
    const valorResidualNum = parseFloat(valorResidual);
    const vidaUtilNum = parseFloat(vidaUtil);

    if (isNaN(valorInicialNum) || isNaN(valorResidualNum) || isNaN(vidaUtilNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (valorInicialNum <= 0 || valorResidualNum < 0 || vidaUtilNum <= 0) {
      setError('El valor inicial y la vida útil deben ser positivos. El valor residual no puede ser negativo.');
      return;
    }

    if (valorResidualNum >= valorInicialNum) {
      setError('El valor residual debe ser menor al valor inicial.');
      return;
    }

    try {
      const resultado = calcularDepreciacionVehiculo(valorInicialNum, valorResidualNum, vidaUtilNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular la depreciación. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Auto nuevo de $25,000 con valor residual $5,000 en 5 años',
      values: { valorInicial: '25000', valorResidual: '5000', vidaUtil: '5' }
    },
    {
      label: 'Camioneta de $35,000 con valor residual $8,000 en 7 años',
      values: { valorInicial: '35000', valorResidual: '8000', vidaUtil: '7' }
    },
    {
      label: 'Moto de $8,000 con valor residual $2,000 en 3 años',
      values: { valorInicial: '8000', valorResidual: '2000', vidaUtil: '3' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es la depreciación de vehículos?',
      answer: 'La depreciación es la pérdida de valor que experimenta un vehículo a lo largo del tiempo debido al uso, desgaste y obsolescencia.'
    },
    {
      question: '¿Qué es el método lineal?',
      answer: 'El método lineal distribuye la depreciación de manera uniforme a lo largo de la vida útil del vehículo. Es el método más común y sencillo.'
    },
    {
      question: '¿Cómo se calcula la depreciación anual?',
      answer: 'Depreciación anual = (Valor inicial - Valor residual) / Vida útil en años'
    },
    {
      question: '¿Qué factores afectan la depreciación?',
      answer: 'Marca, modelo, kilometraje, estado general, demanda del mercado, y condiciones económicas son factores que influyen en la depreciación.'
    }
  ];

  const relatedLinks = getRelatedCalculators('finanzas', 'depreciacion-vehiculos').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setValorInicial(values.valorInicial as string);
    setValorResidual(values.valorResidual as string);
    setVidaUtil(values.vidaUtil as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/finanzas/depreciacion-vehiculos/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Depreciación de Vehículos',
            description: 'Calcula la depreciación anual y mensual de vehículos usando el método lineal',
            url: '/finanzas/depreciacion-vehiculos/'
          }))
        }}
      />
      
      <CalculatorLayout
        title="Calculadora de Depreciación de Vehículos"
        description="Calcula la depreciación anual y mensual de tu vehículo usando el método lineal estándar."
        examples={examples}
        faqItems={faqItems}
        onExampleClick={handleExampleClick}
        breadcrumbs={breadcrumbs}
        relatedLinks={relatedLinks}
      >
        <div className="grid gap-4">
          <div>
            <Label htmlFor="valorInicial">Valor Inicial del Vehículo ($)</Label>
            <Input
              id="valorInicial"
              type="number"
              value={valorInicial}
              onChange={(e) => setValorInicial(e.target.value)}
              placeholder="Ej: 25000"
            />
          </div>
          
          <div>
            <Label htmlFor="valorResidual">Valor Residual Estimado ($)</Label>
            <Input
              id="valorResidual"
              type="number"
              value={valorResidual}
              onChange={(e) => setValorResidual(e.target.value)}
              placeholder="Ej: 5000"
            />
          </div>
          
          <div>
            <Label htmlFor="vidaUtil">Vida Útil (Años)</Label>
            <Input
              id="vidaUtil"
              type="number"
              value={vidaUtil}
              onChange={(e) => setVidaUtil(e.target.value)}
              placeholder="Ej: 5"
            />
          </div>
          
          <Button onClick={handleCalculate} className="calculator-button">
            <Calculator className="h-4 w-4 mr-2" />
            Calcular Depreciación
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resultado && (
            <Card className="mt-4 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-700">Resultados de Depreciación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Valor Inicial</p>
                    <p className="text-lg font-semibold">${resultado.valorInicial.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valor Residual</p>
                    <p className="text-lg font-semibold">${resultado.valorResidual.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vida Útil</p>
                    <p className="text-lg font-semibold">{resultado.vidaUtil} años</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valor Actual (después de 1 año)</p>
                    <p className="text-lg font-semibold">${resultado.valorActual.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-600">Depreciación Anual</p>
                      <p className="text-2xl font-bold text-blue-600">${resultado.depreciacionAnual.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-600">Depreciación Mensual</p>
                      <p className="text-2xl font-bold text-blue-600">${resultado.depreciacionMensual.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CalculatorLayout>
    </div>
  );
}
