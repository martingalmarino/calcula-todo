"use client";

import { useState } from 'react';
import { Calculator, ChefHat, Thermometer, DollarSign, Clock, Zap, Scale } from 'lucide-react';
import { Container } from '@/components/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { jsonLdCollection } from '@/lib/seo';

const iconMap = {
  'chef-hat': ChefHat,
  'thermometer': Thermometer,
  'dollar-sign': DollarSign,
  'clock': Clock,
  'zap': Zap,
  'scale': Scale
};

const calculators = [
  {
    label: 'Conversión de Medidas',
    href: '/gastronomia-hogar/conversion-medidas/',
    description: 'Convierte entre gramos, tazas, ml, cucharadas y cucharaditas',
    icon: 'scale',
    category: 'cocina',
    keywords: ['medidas', 'conversión', 'gramos', 'tazas', 'ml', 'cucharadas']
  },
  {
    label: 'Calorías por Receta',
    href: '/gastronomia-hogar/calorias-receta/',
    description: 'Calcula calorías totales y por porción de tus recetas',
    icon: 'chef-hat',
    category: 'nutricion',
    keywords: ['calorías', 'recetas', 'nutrición', 'macronutrientes', 'porciones']
  },
  {
    label: 'Conversión de Temperaturas',
    href: '/gastronomia-hogar/conversion-temperaturas/',
    description: 'Convierte entre °C, °F y Gas Mark para hornos',
    icon: 'thermometer',
    category: 'cocina',
    keywords: ['temperatura', 'celsius', 'fahrenheit', 'gas mark', 'horno']
  },
  {
    label: 'Costos de Recetas',
    href: '/gastronomia-hogar/costos-recetas/',
    description: 'Calcula el costo total y por porción de tus recetas',
    icon: 'dollar-sign',
    category: 'finanzas',
    keywords: ['costos', 'recetas', 'presupuesto', 'ahorro', 'porciones']
  },
  {
    label: 'Fermentación y Levado',
    href: '/gastronomia-hogar/fermentacion-levado/',
    description: 'Calcula tiempos de fermentación para pan y masas',
    icon: 'clock',
    category: 'panaderia',
    keywords: ['fermentación', 'levado', 'pan', 'masas', 'levadura']
  },
  {
    label: 'Consumo Eléctrico',
    href: '/gastronomia-hogar/consumo-electrico/',
    description: 'Calcula consumo y costo de electrodomésticos',
    icon: 'zap',
    category: 'hogar',
    keywords: ['consumo', 'eléctrico', 'electrodomésticos', 'kWh', 'costo']
  }
];

const categories = [
  { label: 'Todas', value: 'all' },
  { label: 'Cocina', value: 'cocina' },
  { label: 'Nutrición', value: 'nutricion' },
  { label: 'Finanzas', value: 'finanzas' },
  { label: 'Panadería', value: 'panaderia' },
  { label: 'Hogar', value: 'hogar' }
];

export function GastronomiaHogarClient() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCalculators = selectedCategory === 'all' 
    ? calculators 
    : calculators.filter(calc => calc.category === selectedCategory);

  const stats = {
    total: calculators.length,
    categories: categories.length - 1 // -1 para excluir "Todas"
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection({
            name: 'Calculadoras de Gastronomía y Hogar',
            description: 'Herramientas especializadas para cocina, nutrición y hogar',
            url: '/gastronomia-hogar/',
            calculators: calculators.map(calc => ({
              name: calc.label,
              url: calc.href,
              description: calc.description
            }))
          }))
        }}
      />
      
      <Container>
        <div className="py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
              Calculadoras de Gastronomía y Hogar
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Herramientas especializadas para cocina, nutrición y hogar.
              Convierte medidas, calcula calorías, costos y más para tus recetas y electrodomésticos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.total}</div>
                <div className="text-gray-600">Calculadoras Especializadas</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.categories}</div>
                <div className="text-gray-600">Categorías</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                <div className="text-gray-600">Gratuitas</div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Filtrar por Categoría</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className={selectedCategory === category.value ? "bg-blue-600 text-white" : ""}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calculator) => {
              const IconComponent = iconMap[calculator.icon as keyof typeof iconMap];
              return (
                <Card key={calculator.href} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      {calculator.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{calculator.description}</p>
                    <a
                      href={calculator.href}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <Calculator className="h-4 w-4" />
                      Usar Calculadora
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Necesitas una calculadora específica?</h2>
            <p className="text-gray-600 mb-6">
              Si no encuentras la calculadora de gastronomía o hogar que buscas, contáctanos y la agregaremos.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contactar
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
