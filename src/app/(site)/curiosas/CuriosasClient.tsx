"use client";

import { Calculator, Coffee, Pizza, Heart, Tv, Thermometer } from 'lucide-react';
import { Container } from '@/components/Container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SITE, getBreadcrumbs } from '@/lib/site.config';
import Link from 'next/link';
import { jsonLdCollection } from '@/lib/seo';

export function CuriosasClient() {
  const curiosasCluster = SITE.clusters.curiosas;
  const calculators = curiosasCluster.calculators;

  const breadcrumbs = getBreadcrumbs('/curiosas/');

  const iconMap = {
    'coffee': Coffee,
    'pizza': Pizza,
    'heart': Heart,
    'tv': Tv,
    'thermometer': Thermometer
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection({
            name: 'Calculadoras Curiosas',
            description: curiosasCluster.description,
            url: '/curiosas/',
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
              🎉 Calculadoras Curiosas
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Descubre datos sorprendentes y divertidos con nuestras calculadoras curiosas. 
              Desde cuánto ahorrarías dejando el café hasta en qué ciudades estarías cómodo.
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
                <div className="text-gray-600">Calculadoras Divertidas</div>
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
                <div className="text-3xl font-bold text-orange-600 mb-2">🎯</div>
                <div className="text-gray-600">Datos Sorprendentes</div>
              </CardContent>
            </Card>
          </div>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {calculators.map((calculator) => {
              const IconComponent = iconMap[calculator.icon as keyof typeof iconMap] || Calculator;
              return (
                <Card key={calculator.href} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5 text-purple-600" />
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
                        Descubrir
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Fun Facts Section */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
              🎭 Datos Curiosos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-purple-800 mb-2">☕ Café y Dinero</h3>
                <p className="text-sm text-gray-700">
                  Si dejas de tomar un café de $5 diario durante 20 años, podrías ahorrar más de $50,000 con interés compuesto.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-purple-800 mb-2">🍕 Pizza Perfecta</h3>
                <p className="text-sm text-gray-700">
                  Una pizza grande puede alimentar a 4 personas con hambre moderada, pero necesitarías 2 pizzas para 8 personas muy hambrientas.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-purple-800 mb-2">💕 Besos Quemacalorías</h3>
                <p className="text-sm text-gray-700">
                  10 minutos de besos intensos pueden quemar hasta 20 calorías, ¡equivalente a un chocolate pequeño!
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-purple-800 mb-2">🎬 Tiempo en Pantalla</h3>
                <p className="text-sm text-gray-700">
                  Si ves 10 horas de series por semana, en 50 años habrás dedicado más de 2 años completos al entretenimiento.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-purple-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              ¿Tienes una idea curiosa?
            </h2>
            <p className="text-purple-700 mb-6">
              Si tienes una idea para una calculadora curiosa, contáctanos y la desarrollaremos.
            </p>
            <Link href="/contacto/">
              <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                Proponer Idea
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
