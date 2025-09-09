"use client";

import { useState } from 'react';
import { Calculator, Heart, Users, Sparkles } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularCompatibilidadAmor } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function CalculadoraAmorClient() {
  const [nombre1, setNombre1] = useState<string>('');
  const [nombre2, setNombre2] = useState<string>('');
  const [resultado, setResultado] = useState<{
    porcentaje: number;
    mensaje: string;
    nivel: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    if (!nombre1.trim() || !nombre2.trim()) {
      setError('Por favor, ingresa ambos nombres.');
      return;
    }

    if (nombre1.trim().length < 2 || nombre2.trim().length < 2) {
      setError('Los nombres deben tener al menos 2 caracteres.');
      return;
    }

    if (nombre1.trim().length > 50 || nombre2.trim().length > 50) {
      setError('Los nombres no pueden tener más de 50 caracteres.');
      return;
    }

    try {
      const resultado = calcularCompatibilidadAmor(nombre1.trim(), nombre2.trim());
      setResultado(resultado);
    } catch {
      setError('Error al calcular la compatibilidad. Verifica los nombres ingresados.');
    }
  };

  const examples = [
    {
      label: 'María y Juan',
      values: { nombre1: 'María', nombre2: 'Juan' }
    },
    {
      label: 'Ana y Carlos',
      values: { nombre1: 'Ana', nombre2: 'Carlos' }
    },
    {
      label: 'Sofía y Diego',
      values: { nombre1: 'Sofía', nombre2: 'Diego' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cómo funciona esta calculadora?',
      answer: 'Usa un algoritmo divertido basado en los caracteres de los nombres, sus códigos ASCII y longitudes. Es puramente entretenimiento y no tiene base científica real.'
    },
    {
      question: '¿Es real la compatibilidad calculada?',
      answer: 'No, es solo un juego divertido. La compatibilidad real entre personas depende de muchos factores como personalidad, valores, comunicación y química personal.'
    },
    {
      question: '¿Puedo usar nombres completos?',
      answer: 'Sí, puedes usar nombres completos, apellidos o cualquier combinación. El algoritmo funcionará con cualquier texto que ingreses.'
    },
    {
      question: '¿Por qué es viral esta calculadora?',
      answer: 'Es divertida, fácil de usar y genera conversaciones. Las personas disfrutan compartiendo resultados con amigos y parejas, aunque sea solo por entretenimiento.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'calculadora-amor').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setNombre1(values.nombre1 as string);
    setNombre2(values.nombre2 as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/calculadora-amor/');

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Soulmates': return 'text-pink-600';
      case 'Muy Compatibles': return 'text-red-600';
      case 'Compatibles': return 'text-orange-600';
      case 'Moderadamente Compatibles': return 'text-yellow-600';
      case 'Neutrales': return 'text-blue-600';
      case 'Poco Compatibles': return 'text-gray-600';
      case 'Incompatibles': return 'text-gray-500';
      default: return 'text-gray-600';
    }
  };

  const getNivelEmoji = (nivel: string) => {
    switch (nivel) {
      case 'Soulmates': return '💕';
      case 'Muy Compatibles': return '❤️';
      case 'Compatibles': return '💖';
      case 'Moderadamente Compatibles': return '💗';
      case 'Neutrales': return '💙';
      case 'Poco Compatibles': return '💚';
      case 'Incompatibles': return '💔';
      default: return '💝';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Amor',
            description: 'Calcula el porcentaje de compatibilidad entre dos nombres de forma divertida',
            url: '/curiosas/calculadora-amor/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Amor"
            description="Calcula el porcentaje de compatibilidad entre dos nombres de forma divertida. Una calculadora viral para descubrir la química entre nombres."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="nombre1">Primer Nombre</Label>
                <Input
                  id="nombre1"
                  type="text"
                  value={nombre1}
                  onChange={(e) => setNombre1(e.target.value)}
                  placeholder="Ej: María"
                  maxLength={50}
                />
              </div>
              
              <div>
                <Label htmlFor="nombre2">Segundo Nombre</Label>
                <Input
                  id="nombre2"
                  type="text"
                  value={nombre2}
                  onChange={(e) => setNombre2(e.target.value)}
                  placeholder="Ej: Juan"
                  maxLength={50}
                />
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Compatibilidad
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-pink-50 border-pink-200">
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Resultado de Compatibilidad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Nombres</span>
                        </div>
                        <p className="text-lg font-bold text-blue-600">{nombre1}</p>
                        <p className="text-lg font-bold text-pink-600">{nombre2}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Nivel</span>
                        </div>
                        <p className={`text-lg font-bold ${getNivelColor(resultado.nivel)}`}>
                          {getNivelEmoji(resultado.nivel)} {resultado.nivel}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border-2 border-pink-200">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Porcentaje de Compatibilidad</p>
                        <p className="text-5xl font-bold text-pink-600">{resultado.porcentaje}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                          <div 
                            className="bg-pink-500 h-4 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${resultado.porcentaje}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                      <h4 className="font-semibold text-pink-800 mb-2">💕 Resultado</h4>
                      <p className="text-sm text-pink-700">
                        {resultado.mensaje}
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Información Importante</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Entretenimiento:</strong> Esta calculadora es solo para diversión</p>
                        <p>• <strong>No científica:</strong> No tiene base en estudios reales de compatibilidad</p>
                        <p>• <strong>Algoritmo divertido:</strong> Usa códigos ASCII y longitudes de nombres</p>
                        <p>• <strong>Comparte:</strong> ¡Es perfecta para compartir en redes sociales!</p>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">🎉 Ideas para Compartir</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• <strong>Parejas:</strong> Prueba con tu pareja y comparte el resultado</p>
                        <p>• <strong>Amigos:</strong> Descubre la compatibilidad con tus mejores amigos</p>
                        <p>• <strong>Familia:</strong> Prueba con nombres de familiares</p>
                        <p>• <strong>Celebridades:</strong> Combina nombres de famosos</p>
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
