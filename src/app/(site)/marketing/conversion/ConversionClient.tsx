"use client";

import { useState } from 'react';
import { Calculator, Target, Users, ShoppingCart, TrendingUp } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularConversion } from '@/lib/math/marketing';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function ConversionClient() {
  const [visitantes, setVisitantes] = useState<string>('');
  const [leads, setLeads] = useState<string>('');
  const [ventas, setVentas] = useState<string>('');
  const [resultado, setResultado] = useState<{
    visitantes: number;
    leads: number;
    ventas: number;
    tasaVisitasALeads: number;
    tasaLeadsAVentas: number;
    tasaVisitasAVentas: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const visitantesNum = parseFloat(visitantes);
    const leadsNum = parseFloat(leads);
    const ventasNum = parseFloat(ventas);

    if (isNaN(visitantesNum) || isNaN(leadsNum) || isNaN(ventasNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (visitantesNum <= 0 || leadsNum < 0 || ventasNum < 0) {
      setError('Los visitantes deben ser positivos y los leads/ventas no pueden ser negativos.');
      return;
    }

    if (leadsNum > visitantesNum) {
      setError('El número de leads no puede ser mayor que el número de visitantes.');
      return;
    }

    if (ventasNum > leadsNum) {
      setError('El número de ventas no puede ser mayor que el número de leads.');
      return;
    }

    try {
      const resultado = calcularConversion(visitantesNum, leadsNum, ventasNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular las tasas de conversión. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'E-commerce: 10,000 visitantes, 500 leads, 50 ventas',
      values: { visitantes: '10000', leads: '500', ventas: '50' }
    },
    {
      label: 'SaaS: 5,000 visitantes, 200 leads, 20 ventas',
      values: { visitantes: '5000', leads: '200', ventas: '20' }
    },
    {
      label: 'Agencia: 2,000 visitantes, 100 leads, 10 ventas',
      values: { visitantes: '2000', leads: '100', ventas: '10' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué son las tasas de conversión?',
      answer: 'Las tasas de conversión miden qué porcentaje de personas en una etapa del embudo pasan a la siguiente. Te ayudan a identificar cuellos de botella y oportunidades de mejora.'
    },
    {
      question: '¿Cuáles son las tasas de conversión típicas?',
      answer: 'Las tasas varían por industria: Visitas→Leads (1-5%), Leads→Ventas (5-20%), Visitas→Ventas (0.1-2%). Lo importante es mejorar tus propias tasas con el tiempo.'
    },
    {
      question: '¿Cómo mejorar las tasas de conversión?',
      answer: 'Optimiza tu sitio web, mejora la experiencia del usuario, personaliza el contenido, simplifica los formularios y utiliza pruebas A/B para encontrar lo que funciona mejor.'
    },
    {
      question: '¿Qué es el embudo de conversión?',
      answer: 'Es el proceso que siguen los usuarios desde que visitan tu sitio hasta que se convierten en clientes. Cada etapa tiene su propia tasa de conversión que puedes optimizar.'
    }
  ];

  const relatedLinks = getRelatedCalculators('marketing', 'conversion').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setVisitantes(values.visitantes as string);
    setLeads(values.leads as string);
    setVentas(values.ventas as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/marketing/conversion/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Conversión',
            description: 'Calcula las tasas de conversión entre visitantes, leads y ventas en cada etapa del embudo de marketing',
            url: '/marketing/conversion/',
            category: 'marketing'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Conversión"
            description="Analiza las tasas de conversión en cada etapa de tu embudo de marketing para identificar oportunidades de mejora."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="visitantes">Número de Visitantes</Label>
                <Input
                  id="visitantes"
                  type="number"
                  value={visitantes}
                  onChange={(e) => setVisitantes(e.target.value)}
                  placeholder="Ej: 10000"
                />
              </div>
              
              <div>
                <Label htmlFor="leads">Número de Leads Generados</Label>
                <Input
                  id="leads"
                  type="number"
                  value={leads}
                  onChange={(e) => setLeads(e.target.value)}
                  placeholder="Ej: 500"
                />
              </div>
              
              <div>
                <Label htmlFor="ventas">Número de Ventas Realizadas</Label>
                <Input
                  id="ventas"
                  type="number"
                  value={ventas}
                  onChange={(e) => setVentas(e.target.value)}
                  placeholder="Ej: 50"
                />
              </div>
              
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular Conversiones
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Resultados de Conversión
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Visitantes</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.visitantes.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Leads</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.leads.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <ShoppingCart className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Ventas</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.ventas.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Visitas → Leads</p>
                            <p className="text-3xl font-bold text-blue-600">{resultado.tasaVisitasALeads.toFixed(2)}%</p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Leads → Ventas</p>
                            <p className="text-3xl font-bold text-green-600">{resultado.tasaLeadsAVentas.toFixed(2)}%</p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Visitas → Ventas</p>
                            <p className="text-3xl font-bold text-purple-600">{resultado.tasaVisitasAVentas.toFixed(2)}%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Interpretación de los Resultados</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Visitas → Leads:</strong> {resultado.tasaVisitasALeads.toFixed(2)}% de tus visitantes se convierten en leads</p>
                        <p>• <strong>Leads → Ventas:</strong> {resultado.tasaLeadsAVentas.toFixed(2)}% de tus leads se convierten en ventas</p>
                        <p>• <strong>Visitas → Ventas:</strong> {resultado.tasaVisitasAVentas.toFixed(2)}% de tus visitantes se convierten en ventas</p>
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
