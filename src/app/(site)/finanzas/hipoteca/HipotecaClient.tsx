"use client";

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularHipoteca } from '@/lib/math/finance';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function HipotecaClient() {
  const [monto, setMonto] = useState<string>('');
  const [tasaAnual, setTasaAnual] = useState<string>('');
  const [plazoAnos, setPlazoAnos] = useState<string>('');
  const [resultado, setResultado] = useState<{
    monto: number;
    tasaAnual: number;
    plazoAnos: number;
    cuotaMensual: number;
    totalPagos: number;
    totalIntereses: number;
    cronograma: Array<{
      mes: number;
      cuota: number;
      capital: number;
      interes: number;
      saldo: number;
    }>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const montoNum = parseFloat(monto);
    const tasaAnualNum = parseFloat(tasaAnual);
    const plazoAnosNum = parseFloat(plazoAnos);

    if (isNaN(montoNum) || isNaN(tasaAnualNum) || isNaN(plazoAnosNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (montoNum <= 0 || tasaAnualNum <= 0 || plazoAnosNum <= 0) {
      setError('Todos los valores deben ser positivos.');
      return;
    }

    if (tasaAnualNum > 50) {
      setError('La tasa de interés parece muy alta. Verifica el valor ingresado.');
      return;
    }

    try {
      const resultado = calcularHipoteca(montoNum, tasaAnualNum / 100, plazoAnosNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular la hipoteca. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Casa de $200,000 al 6% anual por 30 años',
      values: { monto: '200000', tasaAnual: '6', plazoAnos: '30' }
    },
    {
      label: 'Apartamento de $150,000 al 5.5% anual por 20 años',
      values: { monto: '150000', tasaAnual: '5.5', plazoAnos: '20' }
    },
    {
      label: 'Casa de $300,000 al 7% anual por 15 años',
      values: { monto: '300000', tasaAnual: '7', plazoAnos: '15' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es una hipoteca?',
      answer: 'Una hipoteca es un préstamo a largo plazo que se utiliza para comprar una propiedad, donde la propiedad sirve como garantía del préstamo.'
    },
    {
      question: '¿Cómo se calcula la cuota mensual?',
      answer: 'Se usa la fórmula de cuota fija que considera el monto del préstamo, la tasa de interés mensual y el número total de pagos.'
    },
    {
      question: '¿Qué incluye la cuota mensual?',
      answer: 'La cuota incluye el pago del capital (amortización) y los intereses. Al inicio, la mayor parte es interés, y con el tiempo se paga más capital.'
    },
    {
      question: '¿Puedo pagar más de la cuota mensual?',
      answer: 'Sí, los pagos adicionales reducen el capital pendiente y pueden ahorrar intereses significativos a largo plazo.'
    }
  ];

  const relatedLinks = getRelatedCalculators('finanzas', 'hipoteca').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setMonto(values.monto as string);
    setTasaAnual(values.tasaAnual as string);
    setPlazoAnos(values.plazoAnos as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/finanzas/hipoteca/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Hipoteca',
            description: 'Calcula cuotas mensuales, intereses totales y cronograma de pagos para préstamos hipotecarios',
            url: '/finanzas/hipoteca/'
          }))
        }}
      />
      
      <CalculatorLayout
        title="Calculadora de Hipoteca"
        description="Calcula cuotas mensuales, intereses totales y cronograma de pagos para tu préstamo hipotecario."
        examples={examples}
        faqItems={faqItems}
        onExampleClick={handleExampleClick}
        breadcrumbs={breadcrumbs}
        relatedLinks={relatedLinks}
      >
        <div className="grid gap-4">
          <div>
            <Label htmlFor="monto">Monto del Préstamo ($)</Label>
            <Input
              id="monto"
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Ej: 200000"
            />
          </div>
          
          <div>
            <Label htmlFor="tasaAnual">Tasa de Interés Anual (%)</Label>
            <Input
              id="tasaAnual"
              type="number"
              step="0.1"
              value={tasaAnual}
              onChange={(e) => setTasaAnual(e.target.value)}
              placeholder="Ej: 6"
            />
          </div>
          
          <div>
            <Label htmlFor="plazoAnos">Plazo (Años)</Label>
            <Input
              id="plazoAnos"
              type="number"
              value={plazoAnos}
              onChange={(e) => setPlazoAnos(e.target.value)}
              placeholder="Ej: 30"
            />
          </div>
          
          <Button onClick={handleCalculate} className="calculator-button">
            <Calculator className="h-4 w-4 mr-2" />
            Calcular Hipoteca
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resultado && (
            <div className="space-y-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700">Resumen de la Hipoteca</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Monto del Préstamo</p>
                      <p className="text-lg font-semibold">${resultado.monto.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tasa de Interés Anual</p>
                      <p className="text-lg font-semibold">{resultado.tasaAnual.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Plazo</p>
                      <p className="text-lg font-semibold">{resultado.plazoAnos} años</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total de Pagos</p>
                      <p className="text-lg font-semibold">${resultado.totalPagos.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <p className="text-sm text-gray-600">Cuota Mensual</p>
                        <p className="text-2xl font-bold text-blue-600">${resultado.cuotaMensual.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <p className="text-sm text-gray-600">Total de Intereses</p>
                        <p className="text-2xl font-bold text-red-600">${resultado.totalIntereses.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cronograma de Pagos (Primeros 12 Meses)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Mes</th>
                          <th className="text-right p-2">Cuota</th>
                          <th className="text-right p-2">Capital</th>
                          <th className="text-right p-2">Interés</th>
                          <th className="text-right p-2">Saldo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultado.cronograma.map((pago) => (
                          <tr key={pago.mes} className="border-b">
                            <td className="p-2">{pago.mes}</td>
                            <td className="text-right p-2">${pago.cuota.toLocaleString()}</td>
                            <td className="text-right p-2">${pago.capital.toLocaleString()}</td>
                            <td className="text-right p-2">${pago.interes.toLocaleString()}</td>
                            <td className="text-right p-2">${pago.saldo.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CalculatorLayout>
    </div>
  );
}
