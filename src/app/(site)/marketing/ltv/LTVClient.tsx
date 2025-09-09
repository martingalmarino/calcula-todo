"use client";

import { useState } from 'react';
import { Calculator, TrendingUp, ShoppingCart, Calendar, DollarSign } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularLTV } from '@/lib/math/marketing';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function LTVClient() {
  const [ticketPromedio, setTicketPromedio] = useState<string>('');
  const [frecuenciaCompra, setFrecuenciaCompra] = useState<string>('');
  const [duracionRelacion, setDuracionRelacion] = useState<string>('');
  const [resultado, setResultado] = useState<{
    ticketPromedio: number;
    frecuenciaCompra: number;
    duracionRelacion: number;
    ltv: number;
    valorAnual: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const ticketNum = parseFloat(ticketPromedio);
    const frecuenciaNum = parseFloat(frecuenciaCompra);
    const duracionNum = parseFloat(duracionRelacion);

    if (isNaN(ticketNum) || isNaN(frecuenciaNum) || isNaN(duracionNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (ticketNum <= 0 || frecuenciaNum <= 0 || duracionNum <= 0) {
      setError('Todos los valores deben ser positivos.');
      return;
    }

    if (frecuenciaNum > 365) {
      setError('La frecuencia de compra no puede ser mayor a 365 veces por año.');
      return;
    }

    try {
      const resultado = calcularLTV(ticketNum, frecuenciaNum, duracionNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el LTV. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'E-commerce: $50 ticket, 12 compras/año, 3 años',
      values: { ticketPromedio: '50', frecuenciaCompra: '12', duracionRelacion: '3' }
    },
    {
      label: 'SaaS: $100 ticket, 1 compra/año, 5 años',
      values: { ticketPromedio: '100', frecuenciaCompra: '1', duracionRelacion: '5' }
    },
    {
      label: 'Restaurante: $25 ticket, 24 compras/año, 2 años',
      values: { ticketPromedio: '25', frecuenciaCompra: '24', duracionRelacion: '2' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es el LTV (Lifetime Value)?',
      answer: 'El LTV es el valor total que un cliente aporta a tu negocio durante toda su relación contigo. Se calcula multiplicando el ticket promedio por la frecuencia de compra y la duración de la relación.'
    },
    {
      question: '¿Cómo se calcula el LTV?',
      answer: 'LTV = Ticket Promedio × Frecuencia de Compra × Duración de la Relación. Por ejemplo: $50 × 12 compras/año × 3 años = $1,800 LTV.'
    },
    {
      question: '¿Por qué es importante conocer el LTV?',
      answer: 'El LTV te ayuda a determinar cuánto puedes invertir en adquirir clientes (CAC), optimizar estrategias de retención y tomar decisiones de negocio más informadas.'
    },
    {
      question: '¿Cuál es una buena relación LTV:CAC?',
      answer: 'Una relación saludable es de 3:1 o superior. Esto significa que el valor de vida del cliente debe ser al menos 3 veces mayor que el costo de adquirirlo.'
    }
  ];

  const relatedLinks = getRelatedCalculators('marketing', 'ltv').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setTicketPromedio(values.ticketPromedio as string);
    setFrecuenciaCompra(values.frecuenciaCompra as string);
    setDuracionRelacion(values.duracionRelacion as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/marketing/ltv/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de LTV (Lifetime Value)',
            description: 'Estima el valor total de un cliente en el tiempo basado en ticket promedio, frecuencia de compra y duración de la relación',
            url: '/marketing/ltv/',
            category: 'marketing'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de LTV (Lifetime Value)"
            description="Estima el valor total que un cliente aporta a tu negocio durante toda su relación contigo."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="ticketPromedio">Ticket Promedio por Compra ($)</Label>
                <Input
                  id="ticketPromedio"
                  type="number"
                  value={ticketPromedio}
                  onChange={(e) => setTicketPromedio(e.target.value)}
                  placeholder="Ej: 50"
                />
              </div>
              
              <div>
                <Label htmlFor="frecuenciaCompra">Frecuencia de Compra (veces por año)</Label>
                <Input
                  id="frecuenciaCompra"
                  type="number"
                  value={frecuenciaCompra}
                  onChange={(e) => setFrecuenciaCompra(e.target.value)}
                  placeholder="Ej: 12"
                />
              </div>
              
              <div>
                <Label htmlFor="duracionRelacion">Duración de la Relación (años)</Label>
                <Input
                  id="duracionRelacion"
                  type="number"
                  value={duracionRelacion}
                  onChange={(e) => setDuracionRelacion(e.target.value)}
                  placeholder="Ej: 3"
                />
              </div>
              
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular LTV
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
                      Resultados del LTV
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Ticket Promedio</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">${resultado.ticketPromedio.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <ShoppingCart className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Frecuencia/Año</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.frecuenciaCompra}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Duración</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.duracionRelacion} años</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Valor Anual del Cliente</p>
                          <p className="text-3xl font-bold text-green-600">${resultado.valorAnual.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border-2 border-green-300 mt-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Lifetime Value (LTV)</p>
                          <p className="text-4xl font-bold text-green-600">${resultado.ltv.toLocaleString()}</p>
                          <p className="text-sm text-gray-500 mt-2">valor total del cliente</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Interpretación del Resultado</h4>
                      <p className="text-sm text-blue-700">
                        Cada cliente aporta ${resultado.ltv.toLocaleString()} durante toda su relación contigo. 
                        Puedes invertir hasta ${(resultado.ltv / 3).toLocaleString()} en adquirir cada cliente para mantener una relación LTV:CAC saludable de 3:1.
                      </p>
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
