"use client";

import { useState } from 'react';
import { Calculator, Coffee, DollarSign, TrendingUp, PiggyBank } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularAhorroCafe } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function CafeAhorroClient() {
  const [precioCafe, setPrecioCafe] = useState<string>('');
  const [años, setAños] = useState<string>('');
  const [tasaInteres, setTasaInteres] = useState<string>('5');
  const [resultado, setResultado] = useState<{
    precioCafe: number;
    años: number;
    tasaInteres: number;
    ahorroDiario: number;
    ahorroAnual: number;
    ahorroTotal: number;
    ahorroSinInteres: number;
    gananciaInteres: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const precioNum = parseFloat(precioCafe);
    const añosNum = parseFloat(años);
    const tasaNum = parseFloat(tasaInteres);

    if (isNaN(precioNum) || isNaN(añosNum) || isNaN(tasaNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (precioNum <= 0 || añosNum <= 0 || tasaNum < 0) {
      setError('El precio del café y los años deben ser positivos. La tasa de interés no puede ser negativa.');
      return;
    }

    if (añosNum > 100) {
      setError('Los años no pueden ser mayores a 100.');
      return;
    }

    if (tasaNum > 50) {
      setError('La tasa de interés no puede ser mayor al 50%.');
      return;
    }

    try {
      const resultado = calcularAhorroCafe(precioNum, añosNum, tasaNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el ahorro. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Café Starbucks: $5 diario, 20 años, 5% interés',
      values: { precioCafe: '5', años: '20', tasaInteres: '5' }
    },
    {
      label: 'Café local: $3 diario, 10 años, 7% interés',
      values: { precioCafe: '3', años: '10', tasaInteres: '7' }
    },
    {
      label: 'Café premium: $8 diario, 30 años, 4% interés',
      values: { precioCafe: '8', años: '30', tasaInteres: '4' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cómo funciona el interés compuesto en este cálculo?',
      answer: 'El interés compuesto significa que los intereses ganados también generan intereses. Cada mes, el dinero ahorrado se invierte y genera más dinero, creando un efecto de "bola de nieve" que multiplica significativamente el ahorro a largo plazo.'
    },
    {
      question: '¿Qué tasa de interés es realista?',
      answer: 'Una tasa del 5-7% anual es realista para inversiones conservadoras como fondos indexados o cuentas de ahorro de alto rendimiento. Las tasas pueden variar según el tipo de inversión y las condiciones del mercado.'
    },
    {
      question: '¿Realmente vale la pena dejar el café?',
      answer: 'Esta calculadora es para fines educativos. El café puede ser una pequeña alegría diaria importante. La clave es encontrar un equilibrio entre disfrutar la vida y ahorrar para el futuro.'
    },
    {
      question: '¿Qué otros gastos pequeños puedo analizar?',
      answer: 'Puedes aplicar el mismo concepto a otros gastos diarios como snacks, refrescos, cigarrillos, o cualquier compra pequeña que hagas regularmente. Cada dólar cuenta cuando se invierte a largo plazo.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'cafe-ahorro').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setPrecioCafe(values.precioCafe as string);
    setAños(values.años as string);
    setTasaInteres(values.tasaInteres as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/cafe-ahorro/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Café vs. Ahorro',
            description: 'Calcula cuánto ahorrarías si dejaras de tomar café diario durante años con interés compuesto',
            url: '/curiosas/cafe-ahorro/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Café vs. Ahorro"
            description="Descubre cuánto dinero ahorrarías si dejaras de tomar café diario durante años. El interés compuesto puede sorprenderte."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="precioCafe">Precio del Café por Día ($)</Label>
                <Input
                  id="precioCafe"
                  type="number"
                  step="0.01"
                  value={precioCafe}
                  onChange={(e) => setPrecioCafe(e.target.value)}
                  placeholder="Ej: 5.00"
                />
              </div>
              
              <div>
                <Label htmlFor="años">Número de Años</Label>
                <Input
                  id="años"
                  type="number"
                  value={años}
                  onChange={(e) => setAños(e.target.value)}
                  placeholder="Ej: 20"
                />
              </div>
              
              <div>
                <Label htmlFor="tasaInteres">Tasa de Interés Anual (%)</Label>
                <Input
                  id="tasaInteres"
                  type="number"
                  step="0.1"
                  value={tasaInteres}
                  onChange={(e) => setTasaInteres(e.target.value)}
                  placeholder="Ej: 5.0"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Recomendado: 5-7% para inversiones conservadoras
                </p>
              </div>
              
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular Ahorro
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
                      <Coffee className="h-5 w-5" />
                      Resultados del Ahorro
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Coffee className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Café Diario</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">${resultado.precioCafe.toFixed(2)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Ahorro Anual</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">${resultado.ahorroAnual.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Tasa de Interés</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.tasaInteres}%</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Ahorro Sin Interés</p>
                            <p className="text-3xl font-bold text-blue-600">${resultado.ahorroSinInteres.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Ganancia por Interés</p>
                            <p className="text-3xl font-bold text-green-600">${resultado.gananciaInteres.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border-2 border-green-300 mt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Ahorro Total con Interés Compuesto</p>
                          <p className="text-4xl font-bold text-green-600">${resultado.ahorroTotal.toLocaleString()}</p>
                          <p className="text-sm text-gray-500 mt-2">en {resultado.años} años</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Datos Sorprendentes</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Multiplicador:</strong> El interés compuesto multiplicó tu ahorro por {(resultado.ahorroTotal / resultado.ahorroSinInteres).toFixed(1)}x</p>
                        <p>• <strong>Ganancia extra:</strong> Ganaste ${resultado.gananciaInteres.toLocaleString()} solo por invertir el dinero</p>
                        <p>• <strong>Equivalencia:</strong> Con ese dinero podrías comprar {(resultado.ahorroTotal / resultado.precioCafe).toLocaleString()} cafés</p>
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
