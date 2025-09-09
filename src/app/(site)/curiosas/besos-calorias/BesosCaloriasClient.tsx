"use client";

import { useState } from 'react';
import { Calculator, Heart, Zap } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularCaloriasAfectivas } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function BesosCaloriasClient() {
  const [actividad, setActividad] = useState<string>('');
  const [minutos, setMinutos] = useState<string>('');
  const [intensidad, setIntensidad] = useState<string>('');
  const [resultado, setResultado] = useState<{
    actividad: string;
    minutos: number;
    intensidad: number;
    caloriasQuemadas: number;
    equivalencias: {
      chocolate: number;
      manzana: number;
      minutosCaminando: number;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const minutosNum = parseFloat(minutos);
    const intensidadNum = parseFloat(intensidad);

    if (isNaN(minutosNum) || isNaN(intensidadNum)) {
      setError('Por favor, ingresa valores numéricos válidos para minutos e intensidad.');
      return;
    }

    if (minutosNum <= 0 || minutosNum > 1440) {
      setError('Los minutos deben estar entre 1 y 1440 (24 horas).');
      return;
    }

    if (intensidadNum < 1 || intensidadNum > 5) {
      setError('La intensidad debe estar entre 1 y 5.');
      return;
    }

    if (!actividad) {
      setError('Por favor, selecciona una actividad.');
      return;
    }

    try {
      const resultado = calcularCaloriasAfectivas(actividad, minutosNum, intensidadNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular las calorías. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '10 minutos de besos intensos (nivel 4)',
      values: { actividad: 'besos', minutos: '10', intensidad: '4' }
    },
    {
      label: '15 minutos de risas moderadas (nivel 3)',
      values: { actividad: 'risas', minutos: '15', intensidad: '3' }
    },
    {
      label: '20 minutos de abrazos suaves (nivel 2)',
      values: { actividad: 'abrazos', minutos: '20', intensidad: '2' }
    }
  ];

  const faqItems = [
    {
      question: '¿Realmente se queman calorías con besos y abrazos?',
      answer: 'Sí, aunque sea una cantidad pequeña. Los besos intensos pueden quemar 2-3 calorías por minuto, los abrazos 1-2 calorías por minuto, y las risas 1-2 calorías por minuto. Es ejercicio ligero pero real.'
    },
    {
      question: '¿Qué factores influyen en las calorías quemadas?',
      answer: 'La intensidad, duración, peso corporal, y nivel de actividad física general. Las personas con más masa muscular tienden a quemar más calorías en reposo.'
    },
    {
      question: '¿Son estas actividades un buen ejercicio?',
      answer: 'Son actividades complementarias que aportan beneficios emocionales y sociales, además de quemar algunas calorías. No reemplazan el ejercicio cardiovascular regular.'
    },
    {
      question: '¿Qué otros beneficios tienen estas actividades?',
      answer: 'Reducen el estrés, liberan endorfinas, mejoran el estado de ánimo, fortalecen las relaciones, y pueden ayudar con la presión arterial y el sistema inmunológico.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'besos-calorias').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setActividad(values.actividad as string);
    setMinutos(values.minutos as string);
    setIntensidad(values.intensidad as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/besos-calorias/');

  const getActividadDescription = (actividad: string) => {
    const descripciones = {
      'besos': 'Besos',
      'abrazos': 'Abrazos',
      'risas': 'Risas'
    };
    return descripciones[actividad as keyof typeof descripciones] || actividad;
  };

  const getIntensidadDescription = (nivel: number) => {
    const descripciones = {
      1: 'Muy suave',
      2: 'Suave',
      3: 'Moderada',
      4: 'Intensa',
      5: 'Muy intensa'
    };
    return descripciones[nivel as keyof typeof descripciones] || '';
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Besos Quemacalorías',
            description: 'Calcula las calorías quemadas por besos, abrazos y risas con equivalencias divertidas',
            url: '/curiosas/besos-calorias/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Besos Quemacalorías"
            description="Calcula las calorías quemadas por besos, abrazos y risas. Descubre equivalencias divertidas y sorpréndete con los resultados."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="actividad">Tipo de Actividad</Label>
                <Select value={actividad} onValueChange={setActividad}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una actividad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="besos">💋 Besos</SelectItem>
                    <SelectItem value="abrazos">🤗 Abrazos</SelectItem>
                    <SelectItem value="risas">😂 Risas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="minutos">Duración en Minutos</Label>
                <Input
                  id="minutos"
                  type="number"
                  value={minutos}
                  onChange={(e) => setMinutos(e.target.value)}
                  placeholder="Ej: 10"
                />
              </div>
              
              <div>
                <Label htmlFor="intensidad">Intensidad (1-5)</Label>
                <Input
                  id="intensidad"
                  type="number"
                  min="1"
                  max="5"
                  value={intensidad}
                  onChange={(e) => setIntensidad(e.target.value)}
                  placeholder="Ej: 3"
                />
                <p className="text-sm text-gray-500 mt-1">
                  1=Muy suave, 2=Suave, 3=Moderada, 4=Intensa, 5=Muy intensa
                </p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Calorías
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
                      Resultados de Calorías Quemadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Actividad</span>
                        </div>
                        <p className="text-2xl font-bold text-pink-600">{getActividadDescription(resultado.actividad)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Duración</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.minutos} min</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Intensidad</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.intensidad}</p>
                        <p className="text-xs text-gray-500">{getIntensidadDescription(resultado.intensidad)}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="bg-white p-6 rounded-lg border-2 border-pink-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Calorías Quemadas</p>
                          <p className="text-4xl font-bold text-pink-600">{resultado.caloriasQuemadas.toFixed(1)}</p>
                          <p className="text-sm text-gray-500 mt-2">calorías</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Equivale a</p>
                          <p className="text-2xl font-bold text-yellow-600">{resultado.equivalencias.chocolate}</p>
                          <p className="text-sm text-gray-500">chocolate{resultado.equivalencias.chocolate !== 1 ? 's' : ''} pequeño{resultado.equivalencias.chocolate !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">O a</p>
                          <p className="text-2xl font-bold text-green-600">{resultado.equivalencias.manzana}</p>
                          <p className="text-sm text-gray-500">manzana{resultado.equivalencias.manzana !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">O a</p>
                          <p className="text-2xl font-bold text-blue-600">{resultado.equivalencias.minutosCaminando}</p>
                          <p className="text-sm text-gray-500">min caminando</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">💕 Datos Curiosos</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• <strong>Beneficios extra:</strong> Además de quemar calorías, estas actividades liberan endorfinas y reducen el estrés</p>
                        <p>• <strong>Ejercicio emocional:</strong> Los besos intensos pueden aumentar el ritmo cardíaco como un ejercicio ligero</p>
                        <p>• <strong>Risas saludables:</strong> 10 minutos de risa pueden quemar hasta 20 calorías y mejorar el sistema inmunológico</p>
                        <p>• <strong>Abrazos terapéuticos:</strong> Los abrazos liberan oxitocina, la &quot;hormona del amor&quot;</p>
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
