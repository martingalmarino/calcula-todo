"use client";

import { useState } from 'react';
import { Calculator, MousePointer, Eye, TrendingUp, DollarSign } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularCPCCPM } from '@/lib/math/marketing';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function CPCCPMClient() {
  const [inversionTotal, setInversionTotal] = useState<string>('');
  const [clicks, setClicks] = useState<string>('');
  const [impresiones, setImpresiones] = useState<string>('');
  const [resultado, setResultado] = useState<{
    inversionTotal: number;
    clicks: number;
    impresiones: number;
    cpc: number;
    cpm: number;
    ctr: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const inversionNum = parseFloat(inversionTotal);
    const clicksNum = parseFloat(clicks);
    const impresionesNum = parseFloat(impresiones);

    if (isNaN(inversionNum) || isNaN(clicksNum) || isNaN(impresionesNum)) {
      setError('Por favor, ingresa valores numéricos válidos para todos los campos.');
      return;
    }

    if (inversionNum <= 0 || clicksNum <= 0 || impresionesNum <= 0) {
      setError('Todos los valores deben ser positivos.');
      return;
    }

    if (clicksNum > impresionesNum) {
      setError('El número de clicks no puede ser mayor que el número de impresiones.');
      return;
    }

    try {
      const resultado = calcularCPCCPM(inversionNum, clicksNum, impresionesNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular CPC y CPM. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Google Ads: $1,000 invertidos, 500 clicks, 25,000 impresiones',
      values: { inversionTotal: '1000', clicks: '500', impresiones: '25000' }
    },
    {
      label: 'Meta Ads: $2,500 invertidos, 800 clicks, 50,000 impresiones',
      values: { inversionTotal: '2500', clicks: '800', impresiones: '50000' }
    },
    {
      label: 'LinkedIn Ads: $500 invertidos, 100 clicks, 10,000 impresiones',
      values: { inversionTotal: '500', clicks: '100', impresiones: '10000' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es CPC (Costo Por Clic)?',
      answer: 'El CPC es el costo promedio que pagas cada vez que alguien hace clic en tu anuncio. Se calcula dividiendo la inversión total entre el número de clicks recibidos.'
    },
    {
      question: '¿Qué es CPM (Costo Por Mil Impresiones)?',
      answer: 'El CPM es el costo de mostrar tu anuncio 1,000 veces. Se calcula dividiendo la inversión total entre las impresiones y multiplicando por 1,000.'
    },
    {
      question: '¿Qué es CTR (Click Through Rate)?',
      answer: 'El CTR es el porcentaje de personas que hicieron clic en tu anuncio después de verlo. Se calcula dividiendo clicks entre impresiones y multiplicando por 100.'
    },
    {
      question: '¿Cuáles son los CPC y CPM típicos?',
      answer: 'Los valores varían por industria y plataforma. Google Ads: CPC $1-3, CPM $5-15. Meta Ads: CPC $0.50-2, CPM $3-10. LinkedIn: CPC $2-8, CPM $10-30.'
    }
  ];

  const relatedLinks = getRelatedCalculators('marketing', 'cpc-cpm').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setInversionTotal(values.inversionTotal as string);
    setClicks(values.clicks as string);
    setImpresiones(values.impresiones as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/marketing/cpc-cpm/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de CPC/CPM',
            description: 'Calcula el costo por clic (CPC) y costo por mil impresiones (CPM) para campañas publicitarias',
            url: '/marketing/cpc-cpm/',
            category: 'marketing'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de CPC/CPM"
            description="Calcula el costo por clic (CPC) y costo por mil impresiones (CPM) para optimizar tus campañas publicitarias."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="inversionTotal">Inversión Total en la Campaña ($)</Label>
                <Input
                  id="inversionTotal"
                  type="number"
                  value={inversionTotal}
                  onChange={(e) => setInversionTotal(e.target.value)}
                  placeholder="Ej: 1000"
                />
              </div>
              
              <div>
                <Label htmlFor="clicks">Número de Clicks Recibidos</Label>
                <Input
                  id="clicks"
                  type="number"
                  value={clicks}
                  onChange={(e) => setClicks(e.target.value)}
                  placeholder="Ej: 500"
                />
              </div>
              
              <div>
                <Label htmlFor="impresiones">Número de Impresiones</Label>
                <Input
                  id="impresiones"
                  type="number"
                  value={impresiones}
                  onChange={(e) => setImpresiones(e.target.value)}
                  placeholder="Ej: 25000"
                />
              </div>
              
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular CPC/CPM
              </Button>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center gap-2">
                      <MousePointer className="h-5 w-5" />
                      Resultados de CPC/CPM
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Inversión Total</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">${resultado.inversionTotal.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <MousePointer className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Clicks</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.clicks.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Impresiones</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.impresiones.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">CPC (Costo Por Clic)</p>
                            <p className="text-3xl font-bold text-blue-600">${resultado.cpc.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">CPM (Costo Por Mil)</p>
                            <p className="text-3xl font-bold text-green-600">${resultado.cpm.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">CTR (Click Through Rate)</p>
                            <p className="text-3xl font-bold text-purple-600">{resultado.ctr.toFixed(2)}%</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Interpretación de los Resultados</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>CPC:</strong> Pagas ${resultado.cpc.toFixed(2)} por cada click en tu anuncio</p>
                        <p>• <strong>CPM:</strong> Pagas ${resultado.cpm.toFixed(2)} por cada 1,000 impresiones</p>
                        <p>• <strong>CTR:</strong> {resultado.ctr.toFixed(2)}% de las personas que ven tu anuncio hacen clic</p>
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
