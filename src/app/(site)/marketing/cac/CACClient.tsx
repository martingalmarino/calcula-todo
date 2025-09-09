"use client";

import { useState } from 'react';
import { Calculator, TrendingUp, Users, DollarSign } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularCAC } from '@/lib/math/marketing';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function CACClient() {
  const [inversionTotal, setInversionTotal] = useState<string>('');
  const [nuevosClientes, setNuevosClientes] = useState<string>('');
  const [resultado, setResultado] = useState<{
    inversionTotal: number;
    nuevosClientes: number;
    cac: number;
    inversionPorCliente: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const inversionNum = parseFloat(inversionTotal);
    const clientesNum = parseFloat(nuevosClientes);

    if (isNaN(inversionNum) || isNaN(clientesNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (inversionNum <= 0 || clientesNum <= 0) {
      setError('La inversión y el número de clientes deben ser valores positivos.');
      return;
    }

    if (clientesNum < 1) {
      setError('El número de clientes debe ser al menos 1.');
      return;
    }

    try {
      const resultado = calcularCAC(inversionNum, clientesNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el CAC. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Startup: $10,000 invertidos, 50 clientes nuevos',
      values: { inversionTotal: '10000', nuevosClientes: '50' }
    },
    {
      label: 'E-commerce: $25,000 invertidos, 200 clientes nuevos',
      values: { inversionTotal: '25000', nuevosClientes: '200' }
    },
    {
      label: 'Agencia: $5,000 invertidos, 15 clientes nuevos',
      values: { inversionTotal: '5000', nuevosClientes: '15' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es el CAC (Costo de Adquisición de Cliente)?',
      answer: 'El CAC es el costo promedio que una empresa paga para adquirir un nuevo cliente. Se calcula dividiendo la inversión total en marketing y ventas entre el número de nuevos clientes adquiridos.'
    },
    {
      question: '¿Por qué es importante conocer el CAC?',
      answer: 'El CAC te ayuda a evaluar la eficiencia de tus campañas de marketing, optimizar el presupuesto y asegurar que el costo de adquirir clientes sea menor que el valor que generan (LTV).'
    },
    {
      question: '¿Qué incluye la inversión total?',
      answer: 'Incluye todos los costos relacionados con marketing y ventas: publicidad, salarios del equipo de marketing/ventas, herramientas, eventos, contenido, etc.'
    },
    {
      question: '¿Cuál es un CAC saludable?',
      answer: 'Un CAC saludable depende de tu industria y modelo de negocio. Generalmente, el CAC debe ser menor que el LTV (Lifetime Value) del cliente, idealmente con una relación LTV:CAC de 3:1 o superior.'
    }
  ];

  const relatedLinks = getRelatedCalculators('marketing', 'cac').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setInversionTotal(values.inversionTotal as string);
    setNuevosClientes(values.nuevosClientes as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/marketing/cac/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de CAC (Costo de Adquisición de Cliente)',
            description: 'Calcula el costo de adquisición de cliente dividiendo la inversión total en marketing y ventas entre los nuevos clientes adquiridos',
            url: '/marketing/cac/',
            category: 'marketing'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de CAC (Costo de Adquisición de Cliente)"
            description="Calcula el costo promedio de adquirir un nuevo cliente dividiendo la inversión total en marketing y ventas entre el número de clientes nuevos."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="inversionTotal">Inversión Total en Marketing y Ventas ($)</Label>
                <Input
                  id="inversionTotal"
                  type="number"
                  value={inversionTotal}
                  onChange={(e) => setInversionTotal(e.target.value)}
                  placeholder="Ej: 10000"
                />
              </div>
              
              <div>
                <Label htmlFor="nuevosClientes">Número de Clientes Nuevos</Label>
                <Input
                  id="nuevosClientes"
                  type="number"
                  value={nuevosClientes}
                  onChange={(e) => setNuevosClientes(e.target.value)}
                  placeholder="Ej: 50"
                />
              </div>
              
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular CAC
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
                    <CardTitle className="text-blue-700 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Resultados del CAC
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Inversión Total</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">${resultado.inversionTotal.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Clientes Nuevos</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.nuevosClientes.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Costo de Adquisición de Cliente (CAC)</p>
                          <p className="text-4xl font-bold text-blue-600">${resultado.cac.toLocaleString()}</p>
                          <p className="text-sm text-gray-500 mt-2">por cliente</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Interpretación del Resultado</h4>
                      <p className="text-sm text-green-700">
                        Cada nuevo cliente te cuesta ${resultado.cac.toLocaleString()}. 
                        Para que sea rentable, el valor de vida del cliente (LTV) debe ser mayor que este costo.
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
