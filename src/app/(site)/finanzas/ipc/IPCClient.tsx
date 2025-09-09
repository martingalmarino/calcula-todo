"use client";

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularIPC } from '@/lib/math/finance';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function IPCClient() {
  const [monto, setMonto] = useState<string>('');
  const [ipcInicial, setIpcInicial] = useState<string>('');
  const [ipcFinal, setIpcFinal] = useState<string>('');
  const [resultado, setResultado] = useState<{
    monto: number;
    ipcInicial: number;
    ipcFinal: number;
    variacionIPC: number;
    poderAdquisitivo: number;
    perdidaPoderAdquisitivo: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const montoNum = parseFloat(monto);
    const ipcInicialNum = parseFloat(ipcInicial);
    const ipcFinalNum = parseFloat(ipcFinal);

    if (isNaN(montoNum) || isNaN(ipcInicialNum) || isNaN(ipcFinalNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (montoNum <= 0 || ipcInicialNum <= 0 || ipcFinalNum <= 0) {
      setError('Todos los valores deben ser positivos.');
      return;
    }

    try {
      const resultado = calcularIPC(montoNum, ipcInicialNum, ipcFinalNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el IPC. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Salario de $1,000 con IPC 100 a 120',
      values: { monto: '1000', ipcInicial: '100', ipcFinal: '120' }
    },
    {
      label: 'Pensión de $500 con IPC 150 a 180',
      values: { monto: '500', ipcInicial: '150', ipcFinal: '180' }
    },
    {
      label: 'Ahorro de $10,000 con IPC 200 a 250',
      values: { monto: '10000', ipcInicial: '200', ipcFinal: '250' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es el IPC?',
      answer: 'El Índice de Precios al Consumidor (IPC) mide la variación de los precios de una canasta de bienes y servicios representativa del consumo de los hogares.'
    },
    {
      question: '¿Qué es el poder adquisitivo?',
      answer: 'El poder adquisitivo es la cantidad de bienes y servicios que se pueden comprar con una cantidad determinada de dinero en un momento específico.'
    },
    {
      question: '¿Cómo afecta la inflación al poder adquisitivo?',
      answer: 'Cuando los precios suben (inflación), el mismo dinero puede comprar menos bienes y servicios, reduciendo el poder adquisitivo.'
    },
    {
      question: '¿Por qué es importante calcular el poder adquisitivo?',
      answer: 'Ayuda a entender el impacto real de la inflación en los ingresos y ahorros, permitiendo tomar decisiones financieras más informadas.'
    }
  ];

  const relatedLinks = getRelatedCalculators('finanzas', 'ipc').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setMonto(values.monto as string);
    setIpcInicial(values.ipcInicial as string);
    setIpcFinal(values.ipcFinal as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/finanzas/ipc/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora del IPC',
            description: 'Calcula el poder adquisitivo, variación del IPC y pérdida de valor por inflación',
            url: '/finanzas/ipc/'
          }))
        }}
      />
      
      <CalculatorLayout
        title="Calculadora del IPC"
        description="Calcula el poder adquisitivo, variación del IPC y pérdida de valor por inflación."
        examples={examples}
        faqItems={faqItems}
        onExampleClick={handleExampleClick}
        breadcrumbs={breadcrumbs}
        relatedLinks={relatedLinks}
      >
        <div className="grid gap-4">
          <div>
            <Label htmlFor="monto">Monto a Analizar ($)</Label>
            <Input
              id="monto"
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Ej: 1000"
            />
          </div>
          
          <div>
            <Label htmlFor="ipcInicial">IPC Año Inicial</Label>
            <Input
              id="ipcInicial"
              type="number"
              value={ipcInicial}
              onChange={(e) => setIpcInicial(e.target.value)}
              placeholder="Ej: 100"
            />
          </div>
          
          <div>
            <Label htmlFor="ipcFinal">IPC Año Final</Label>
            <Input
              id="ipcFinal"
              type="number"
              value={ipcFinal}
              onChange={(e) => setIpcFinal(e.target.value)}
              placeholder="Ej: 120"
            />
          </div>
          
          <Button onClick={handleCalculate} className="calculator-button">
            <Calculator className="h-4 w-4 mr-2" />
            Calcular Poder Adquisitivo
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
                <CardTitle className="text-blue-700">Análisis del Poder Adquisitivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Monto Original</p>
                    <p className="text-lg font-semibold">${resultado.monto.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Variación del IPC</p>
                    <p className="text-lg font-semibold">{resultado.variacionIPC.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">IPC Inicial</p>
                    <p className="text-lg font-semibold">{resultado.ipcInicial}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">IPC Final</p>
                    <p className="text-lg font-semibold">{resultado.ipcFinal}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-600">Poder Adquisitivo Actual</p>
                      <p className="text-2xl font-bold text-green-600">${resultado.poderAdquisitivo.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">Equivalente en el año inicial</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-600">Pérdida de Poder Adquisitivo</p>
                      <p className="text-2xl font-bold text-red-600">${resultado.perdidaPoderAdquisitivo.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">Diferencia por inflación</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Interpretación</h4>
                  <p className="text-sm text-yellow-700">
                    {resultado.variacionIPC > 0 
                      ? `Con una inflación del ${resultado.variacionIPC.toFixed(2)}%, tu dinero perdió poder adquisitivo. Los $${resultado.monto.toLocaleString()} de hoy equivalen a $${resultado.poderAdquisitivo.toLocaleString()} en términos del año inicial.`
                      : `Con una deflación del ${Math.abs(resultado.variacionIPC).toFixed(2)}%, tu dinero ganó poder adquisitivo. Los $${resultado.monto.toLocaleString()} de hoy equivalen a $${resultado.poderAdquisitivo.toLocaleString()} en términos del año inicial.`
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CalculatorLayout>
    </div>
  );
}
