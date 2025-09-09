"use client";

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularAhorroObjetivo } from '@/lib/math/finance';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function AhorroObjetivoClient() {
  const [objetivo, setObjetivo] = useState<string>('');
  const [tasaAnual, setTasaAnual] = useState<string>('');
  const [plazoAnos, setPlazoAnos] = useState<string>('');
  const [resultado, setResultado] = useState<{
    objetivo: number;
    tasaAnual: number;
    plazoAnos: number;
    ahorroMensual: number;
    totalAhorrado: number;
    interesesGanados: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const objetivoNum = parseFloat(objetivo);
    const tasaAnualNum = parseFloat(tasaAnual);
    const plazoAnosNum = parseFloat(plazoAnos);

    if (isNaN(objetivoNum) || isNaN(tasaAnualNum) || isNaN(plazoAnosNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (objetivoNum <= 0 || tasaAnualNum < 0 || plazoAnosNum <= 0) {
      setError('El objetivo y el plazo deben ser positivos. La tasa no puede ser negativa.');
      return;
    }

    if (tasaAnualNum > 50) {
      setError('La tasa de interés parece muy alta. Verifica el valor ingresado.');
      return;
    }

    try {
      const resultado = calcularAhorroObjetivo(objetivoNum, tasaAnualNum / 100, plazoAnosNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el ahorro objetivo. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Meta de $50,000 al 5% anual en 5 años',
      values: { objetivo: '50000', tasaAnual: '5', plazoAnos: '5' }
    },
    {
      label: 'Casa de $200,000 al 6% anual en 10 años',
      values: { objetivo: '200000', tasaAnual: '6', plazoAnos: '10' }
    },
    {
      label: 'Vacaciones de $10,000 al 3% anual en 2 años',
      values: { objetivo: '10000', tasaAnual: '3', plazoAnos: '2' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es el ahorro objetivo?',
      answer: 'Es una estrategia de ahorro que te permite calcular cuánto necesitas ahorrar mensualmente para alcanzar una meta financiera específica en un tiempo determinado.'
    },
    {
      question: '¿Cómo funcionan los intereses en el ahorro?',
      answer: 'Los intereses se capitalizan mensualmente, lo que significa que cada mes ganas intereses sobre el dinero ahorrado más los intereses acumulados anteriormente.'
    },
    {
      question: '¿Qué factores afectan el ahorro mensual necesario?',
      answer: 'La tasa de interés, el tiempo disponible y el monto objetivo. A mayor tasa o tiempo, menor es el ahorro mensual necesario.'
    },
    {
      question: '¿Es mejor ahorrar con o sin intereses?',
      answer: 'Definitivamente con intereses. Los intereses te ayudan a alcanzar tu objetivo más rápido y con menos dinero de tu bolsillo.'
    }
  ];

  const relatedLinks = getRelatedCalculators('finanzas', 'ahorro-objetivo').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setObjetivo(values.objetivo as string);
    setTasaAnual(values.tasaAnual as string);
    setPlazoAnos(values.plazoAnos as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/finanzas/ahorro-objetivo/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Ahorro Objetivo',
            description: 'Calcula cuánto ahorrar mensualmente para alcanzar tu meta financiera con intereses',
            url: '/finanzas/ahorro-objetivo/',
            category: 'finanzas'
          }))
        }}
      />
      
      <CalculatorLayout
        title="Calculadora de Ahorro Objetivo"
        description="Calcula cuánto necesitas ahorrar mensualmente para alcanzar tu meta financiera con intereses."
        examples={examples}
        faqItems={faqItems}
        onExampleClick={handleExampleClick}
        breadcrumbs={breadcrumbs}
        relatedLinks={relatedLinks}
      >
        <div className="grid gap-4">
          <div>
            <Label htmlFor="objetivo">Meta de Ahorro ($)</Label>
            <Input
              id="objetivo"
              type="number"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              placeholder="Ej: 50000"
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
              placeholder="Ej: 5"
            />
          </div>
          
          <div>
            <Label htmlFor="plazoAnos">Plazo (Años)</Label>
            <Input
              id="plazoAnos"
              type="number"
              value={plazoAnos}
              onChange={(e) => setPlazoAnos(e.target.value)}
              placeholder="Ej: 5"
            />
          </div>
          
          <Button onClick={handleCalculate} className="calculator-button">
            <Calculator className="h-4 w-4 mr-2" />
            Calcular Ahorro Mensual
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
                <CardTitle className="text-blue-700">Plan de Ahorro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Meta de Ahorro</p>
                    <p className="text-lg font-semibold">${resultado.objetivo.toLocaleString()}</p>
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
                    <p className="text-sm text-gray-600">Total Ahorrado</p>
                    <p className="text-lg font-semibold">${resultado.totalAhorrado.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-600">Ahorro Mensual Necesario</p>
                      <p className="text-2xl font-bold text-blue-600">${resultado.ahorroMensual.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-600">Intereses Ganados</p>
                      <p className="text-2xl font-bold text-green-600">${resultado.interesesGanados.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Beneficio de los Intereses</h4>
                  <p className="text-sm text-green-700">
                    Los intereses te ahorran ${resultado.interesesGanados.toLocaleString()}. 
                    Sin intereses, necesitarías ahorrar ${(resultado.objetivo / (resultado.plazoAnos * 12)).toLocaleString()} mensualmente.
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
