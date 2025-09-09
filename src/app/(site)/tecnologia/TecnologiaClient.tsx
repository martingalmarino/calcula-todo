"use client";

import { useState } from 'react';
import { Calculator, HardDrive, Download, Clock, Palette, Shield, Zap } from 'lucide-react';
import { Container } from '@/components/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { jsonLdCollection } from '@/lib/seo';

const iconMap = {
  'hard-drive': HardDrive,
  'download': Download,
  'clock': Clock,
  'palette': Palette,
  'shield': Shield,
  'zap': Zap
};

const calculators = [
  {
    label: 'Conversión de Almacenamiento',
    href: '/tecnologia/conversion-almacenamiento/',
    description: 'Convierte entre KB, MB, GB, TB con base decimal y binaria',
    icon: 'hard-drive',
    category: 'conversion',
    keywords: ['almacenamiento', 'conversión', 'KB', 'MB', 'GB', 'TB', 'bytes']
  },
  {
    label: 'Velocidad de Descarga',
    href: '/tecnologia/velocidad-descarga/',
    description: 'Convierte Mbps a MB/s y calcula tiempo de descarga',
    icon: 'download',
    category: 'internet',
    keywords: ['velocidad', 'descarga', 'Mbps', 'MB/s', 'internet', 'banda ancha']
  },
  {
    label: 'Uptime/Downtime',
    href: '/tecnologia/uptime-downtime/',
    description: 'Calcula porcentaje de disponibilidad y tiempo de caída',
    icon: 'clock',
    category: 'servicios',
    keywords: ['uptime', 'downtime', 'disponibilidad', 'servicios', 'hosting']
  },
  {
    label: 'Conversión de Colores',
    href: '/tecnologia/conversion-colores/',
    description: 'Convierte entre HEX, RGB, CMYK y HSL con vista previa',
    icon: 'palette',
    category: 'diseño',
    keywords: ['colores', 'HEX', 'RGB', 'CMYK', 'HSL', 'diseño', 'desarrollo']
  },
  {
    label: 'Análisis de Contraseñas',
    href: '/tecnologia/analisis-contraseñas/',
    description: 'Analiza fortaleza y entropía de contraseñas',
    icon: 'shield',
    category: 'seguridad',
    keywords: ['contraseñas', 'seguridad', 'entropía', 'hash', 'crackeo']
  },
  {
    label: 'Análisis de Latencia',
    href: '/tecnologia/analisis-latencia/',
    description: 'Analiza ping y tiempo de respuesta para gaming y apps',
    icon: 'zap',
    category: 'redes',
    keywords: ['latencia', 'ping', 'tiempo respuesta', 'gaming', 'redes']
  }
];

const categories = [
  { label: 'Todas', value: 'all' },
  { label: 'Conversión', value: 'conversion' },
  { label: 'Internet', value: 'internet' },
  { label: 'Servicios', value: 'servicios' },
  { label: 'Diseño', value: 'diseño' },
  { label: 'Seguridad', value: 'seguridad' },
  { label: 'Redes', value: 'redes' }
];

export function TecnologiaClient() {
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
            name: 'Calculadoras de Tecnología',
            description: 'Herramientas especializadas en tecnología para desarrolladores, diseñadores y técnicos',
            url: '/tecnologia/',
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
              Calculadoras de Tecnología
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Herramientas especializadas para desarrolladores, diseñadores y técnicos.
              Convierte unidades, analiza rendimiento, maneja colores y más.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.total}</div>
                <div className="text-gray-600">Calculadoras Técnicas</div>
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
              Si no encuentras la calculadora tecnológica que buscas, contáctanos y la agregaremos.
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
