"use client";

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularValorFuturo, calcularValorPresente } from '@/lib/math/finance';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function ValorFuturoPresenteClient() {
  const [valorPresente, setValorPresente] = useState<string>('');
  const [valorFuturo, setValorFuturo] = useState<string>('');
  const [tasaAnual, setTasaAnual] = useState<string>('');
  const [tiempoAnos, setTiempoAnos] = useState<string>('');
  const [resultadoFV, setResultadoFV] = useState<number | null>(null);
  const [resultadoPV, setResultadoPV] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculateFV = () => {
    setError(null);
    setResultadoFV(null);

    const valorPresenteNum = parseFloat(valorPresente);
    const tasaAnualNum = parseFloat(tasaAnual);
    const tiempoAnosNum = parseFloat(tiempoAnos);

    if (isNaN(valorPresenteNum) || isNaN(tasaAnualNum) || isNaN(tiempoAnosNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (valorPresenteNum <= 0 || tasaAnualNum < 0 || tiempoAnosNum <= 0) {
      setError('El valor presente y el tiempo deben ser positivos. La tasa no puede ser negativa.');
      return;
    }

    if (tasaAnualNum > 50) {
      setError('La tasa de interés parece muy alta. Verifica el valor ingresado.');
      return;
    }

    try {
      const resultado = calcularValorFuturo(valorPresenteNum, tasaAnualNum / 100, tiempoAnosNum);
      setResultadoFV(resultado);
    } catch {
      setError('Error al calcular el valor futuro. Verifica los valores ingresados.');
    }
  };

  const handleCalculatePV = () => {
    setError(null);
    setResultadoPV(null);

    const valorFuturoNum = parseFloat(valorFuturo);
    const tasaAnualNum = parseFloat(tasaAnual);
    const tiempoAnosNum = parseFloat(tiempoAnos);

    if (isNaN(valorFuturoNum) || isNaN(tasaAnualNum) || isNaN(tiempoAnosNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (valorFuturoNum <= 0 || tasaAnualNum < 0 || tiempoAnosNum <= 0) {
      setError('El valor futuro y el tiempo deben ser positivos. La tasa no puede ser negativa.');
      return;
    }

    if (tasaAnualNum > 50) {
      setError('La tasa de interés parece muy alta. Verifica el valor ingresado.');
      return;
    }

    try {
      const resultado = calcularValorPresente(valorFuturoNum, tasaAnualNum / 100, tiempoAnosNum);
      setResultadoPV(resultado);
    } catch {
      setError('Error al calcular el valor presente. Verifica los valores ingresados.');
    }
  };

  const examplesFV = [
    {
      label: 'Inversión de $10,000 al 8% anual por 5 años',
      values: { valorPresente: '10000', tasaAnual: '8', tiempoAnos: '5' }
    },
    {
      label: 'Ahorro de $5,000 al 6% anual por 10 años',
      values: { valorPresente: '5000', tasaAnual: '6', tiempoAnos: '10' }
    }
  ];

  const examplesPV = [
    {
      label: 'Meta de $20,000 al 7% anual en 3 años',
      values: { valorFuturo: '20000', tasaAnual: '7', tiempoAnos: '3' }
    },
    {
      label: 'Objetivo de $50,000 al 5% anual en 8 años',
      values: { valorFuturo: '50000', tasaAnual: '5', tiempoAnos: '8' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es el valor futuro (FV)?',
      answer: 'El valor futuro es el valor que tendrá una inversión en el futuro, considerando el interés compuesto y el tiempo transcurrido.'
    },
    {
      question: '¿Qué es el valor presente (PV)?',
      answer: 'El valor presente es el valor actual de una cantidad de dinero que se recibirá en el futuro, descontando el interés y el tiempo.'
    },
    {
      question: '¿Por qué es importante el valor temporal del dinero?',
      answer: 'El dinero tiene valor temporal porque puede generar intereses. Un peso hoy vale más que un peso en el futuro.'
    },
    {
      question: '¿Cómo se usa en la toma de decisiones financieras?',
      answer: 'Permite comparar inversiones, evaluar proyectos y tomar decisiones informadas sobre el uso del dinero a lo largo del tiempo.'
    }
  ];

  const relatedLinks = getRelatedCalculators('finanzas', 'valor-futuro-presente').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClickFV = (values: Record<string, unknown>) => {
    setValorPresente(values.valorPresente as string);
    setTasaAnual(values.tasaAnual as string);
    setTiempoAnos(values.tiempoAnos as string);
    setResultadoFV(null);
    setError(null);
  };

  const handleExampleClickPV = (values: Record<string, unknown>) => {
    setValorFuturo(values.valorFuturo as string);
    setTasaAnual(values.tasaAnual as string);
    setTiempoAnos(values.tiempoAnos as string);
    setResultadoPV(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/finanzas/valor-futuro-presente/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Valor Futuro y Presente',
            description: 'Calcula FV y PV para comparar inversiones y evaluar el valor temporal del dinero',
            url: '/finanzas/valor-futuro-presente/'
          }))
        }}
      />
      
      <CalculatorLayout
        title="Calculadora de Valor Futuro y Presente"
        description="Calcula el valor futuro (FV) y valor presente (PV) para comparar inversiones y evaluar el valor temporal del dinero."
        examples={[]}
        faqItems={faqItems}
        onExampleClick={() => {}}
        breadcrumbs={breadcrumbs}
        relatedLinks={relatedLinks}
      >
        <Tabs defaultValue="valor-futuro" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="valor-futuro">Valor Futuro (FV)</TabsTrigger>
            <TabsTrigger value="valor-presente">Valor Presente (PV)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="valor-futuro" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Calcular Valor Futuro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="valorPresente">Valor Presente ($)</Label>
                  <Input
                    id="valorPresente"
                    type="number"
                    value={valorPresente}
                    onChange={(e) => setValorPresente(e.target.value)}
                    placeholder="Ej: 10000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tasaAnualFV">Tasa de Interés Anual (%)</Label>
                  <Input
                    id="tasaAnualFV"
                    type="number"
                    step="0.1"
                    value={tasaAnual}
                    onChange={(e) => setTasaAnual(e.target.value)}
                    placeholder="Ej: 8"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tiempoAnosFV">Tiempo (Años)</Label>
                  <Input
                    id="tiempoAnosFV"
                    type="number"
                    value={tiempoAnos}
                    onChange={(e) => setTiempoAnos(e.target.value)}
                    placeholder="Ej: 5"
                  />
                </div>
                
                <Button onClick={handleCalculateFV} className="calculator-button">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Valor Futuro
                </Button>

                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {resultadoFV && (
                  <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle className="text-green-700">Valor Futuro</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-green-600">${resultadoFV.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Tu inversión de ${parseFloat(valorPresente).toLocaleString()} crecerá a ${resultadoFV.toLocaleString()} 
                        en {tiempoAnos} años con una tasa del {tasaAnual}% anual.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="valor-presente" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Calcular Valor Presente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="valorFuturo">Valor Futuro ($)</Label>
                  <Input
                    id="valorFuturo"
                    type="number"
                    value={valorFuturo}
                    onChange={(e) => setValorFuturo(e.target.value)}
                    placeholder="Ej: 20000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tasaAnualPV">Tasa de Descuento Anual (%)</Label>
                  <Input
                    id="tasaAnualPV"
                    type="number"
                    step="0.1"
                    value={tasaAnual}
                    onChange={(e) => setTasaAnual(e.target.value)}
                    placeholder="Ej: 7"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tiempoAnosPV">Tiempo (Años)</Label>
                  <Input
                    id="tiempoAnosPV"
                    type="number"
                    value={tiempoAnos}
                    onChange={(e) => setTiempoAnos(e.target.value)}
                    placeholder="Ej: 3"
                  />
                </div>
                
                <Button onClick={handleCalculatePV} className="calculator-button">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Valor Presente
                </Button>

                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {resultadoPV && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-700">Valor Presente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-blue-600">${resultadoPV.toLocaleString()}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Para tener ${parseFloat(valorFuturo).toLocaleString()} en {tiempoAnos} años, 
                        necesitas invertir ${resultadoPV.toLocaleString()} hoy con una tasa del {tasaAnual}% anual.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CalculatorLayout>
    </div>
  );
}
