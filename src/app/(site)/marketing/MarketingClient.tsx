"use client";

import { Calculator } from 'lucide-react';
import { Container } from '@/components/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE, getBreadcrumbs } from '@/lib/site.config';
import Link from 'next/link';
import { jsonLdCollection } from '@/lib/seo';

export function MarketingClient() {
  const marketingCluster = SITE.clusters.marketing;
  const calculators = marketingCluster.calculators;

  const breadcrumbs = getBreadcrumbs('/marketing/');

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection({
            name: 'Calculadoras de Marketing',
            description: marketingCluster.description,
            url: '/marketing/',
            calculators: calculators.map(calc => ({
              name: calc.label,
              url: calc.href,
              description: calc.description
            }))
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
              Calculadoras de Marketing
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Herramientas profesionales para optimizar tus campañas de marketing digital, 
              calcular métricas clave y maximizar el retorno de tu inversión.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-gray-600">Calculadoras Especializadas</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-600">Gratuitas</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">Disponibles</div>
              </CardContent>
            </Card>
          </div>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {calculators.map((calculator) => (
              <Card key={calculator.href} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    {calculator.label}
                  </CardTitle>
                  <CardDescription>
                    {calculator.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={calculator.href}>
                    <Button className="w-full calculator-button">
                      <Calculator className="h-4 w-4" />
                      Usar Calculadora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              ¿Necesitas una calculadora específica?
            </h2>
            <p className="text-blue-700 mb-6">
              Si no encuentras la herramienta que buscas, contáctanos y te ayudaremos a desarrollarla.
            </p>
            <Link href="/contacto/">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Contactar
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
