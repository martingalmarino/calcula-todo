"use client";

import { useState } from 'react';
import { Calculator, Pizza, Users, Utensils } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularPizzasNecesarias } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function PizzaPersonaClient() {
  const [personas, setPersonas] = useState<string>('');
  const [nivelHambre, setNivelHambre] = useState<string>('');
  const [tamañoPizza, setTamañoPizza] = useState<string>('');
  const [resultado, setResultado] = useState<{
    personas: number;
    nivelHambre: number;
    tamañoPizza: string;
    porcionesNecesarias: number;
    pizzasNecesarias: number;
    porcionesPorPizza: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const personasNum = parseFloat(personas);
    const hambreNum = parseFloat(nivelHambre);

    if (isNaN(personasNum) || isNaN(hambreNum)) {
      setError('Por favor, ingresa valores numéricos válidos para personas y nivel de hambre.');
      return;
    }

    if (personasNum <= 0 || personasNum > 100) {
      setError('El número de personas debe estar entre 1 y 100.');
      return;
    }

    if (hambreNum < 1 || hambreNum > 5) {
      setError('El nivel de hambre debe estar entre 1 y 5.');
      return;
    }

    if (!tamañoPizza) {
      setError('Por favor, selecciona un tamaño de pizza.');
      return;
    }

    try {
      const resultado = calcularPizzasNecesarias(personasNum, hambreNum, tamañoPizza);
      setResultado(resultado);
    } catch {
      setError('Error al calcular las pizzas necesarias. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '8 personas, hambre moderada (3), pizza grande',
      values: { personas: '8', nivelHambre: '3', tamañoPizza: 'grande' }
    },
    {
      label: '4 personas, poca hambre (1), pizza mediana',
      values: { personas: '4', nivelHambre: '1', tamañoPizza: 'mediana' }
    },
    {
      label: '12 personas, muy hambrientas (5), pizza grande',
      values: { personas: '12', nivelHambre: '5', tamañoPizza: 'grande' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cómo se calcula el nivel de hambre?',
      answer: 'El nivel de hambre va del 1 al 5: 1=Poco hambre (1 porción), 2=Hambre normal (1.5 porciones), 3=Hambre moderada (2 porciones), 4=Mucha hambre (2.5 porciones), 5=Muy hambriento (3 porciones).'
    },
    {
      question: '¿Cuántas porciones tiene cada tamaño de pizza?',
      answer: 'Pizza pequeña: 4 porciones, Pizza mediana: 6 porciones, Pizza grande: 8 porciones. Estas son estimaciones estándar que pueden variar según la pizzería.'
    },
    {
      question: '¿Debo pedir una pizza extra por si acaso?',
      answer: 'Es recomendable pedir una pizza extra si tienes invitados que comen mucho o si quieres asegurar que sobre comida. También considera si habrá otros alimentos en la reunión.'
    },
    {
      question: '¿Qué otros factores debo considerar?',
      answer: 'Considera la edad de los invitados (los niños comen menos), si habrá otros alimentos, la duración del evento, y si algunos invitados tienen restricciones dietéticas.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'pizza-persona').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setPersonas(values.personas as string);
    setNivelHambre(values.nivelHambre as string);
    setTamañoPizza(values.tamañoPizza as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/pizza-persona/');

  const getHambreDescription = (nivel: number) => {
    const descripciones = {
      1: 'Poco hambre (1 porción)',
      2: 'Hambre normal (1.5 porciones)',
      3: 'Hambre moderada (2 porciones)',
      4: 'Mucha hambre (2.5 porciones)',
      5: 'Muy hambriento (3 porciones)'
    };
    return descripciones[nivel as keyof typeof descripciones] || '';
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Pizza por Persona',
            description: 'Calcula cuántas pizzas necesitas según el número de personas, nivel de hambre y tamaño de pizza',
            url: '/curiosas/pizza-persona/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Pizza por Persona"
            description="Calcula cuántas pizzas necesitas para tu fiesta o reunión según el número de personas, nivel de hambre y tamaño de pizza."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="personas">Número de Personas</Label>
                <Input
                  id="personas"
                  type="number"
                  value={personas}
                  onChange={(e) => setPersonas(e.target.value)}
                  placeholder="Ej: 8"
                />
              </div>
              
              <div>
                <Label htmlFor="nivelHambre">Nivel de Hambre (1-5)</Label>
                <Input
                  id="nivelHambre"
                  type="number"
                  min="1"
                  max="5"
                  value={nivelHambre}
                  onChange={(e) => setNivelHambre(e.target.value)}
                  placeholder="Ej: 3"
                />
                <p className="text-sm text-gray-500 mt-1">
                  1=Poco hambre, 2=Normal, 3=Moderada, 4=Mucha, 5=Muy hambriento
                </p>
              </div>
              
              <div>
                <Label htmlFor="tamañoPizza">Tamaño de Pizza</Label>
                <Select value={tamañoPizza} onValueChange={setTamañoPizza}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pequeña">Pequeña (4 porciones)</SelectItem>
                    <SelectItem value="mediana">Mediana (6 porciones)</SelectItem>
                    <SelectItem value="grande">Grande (8 porciones)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleCalculate} className="calculator-button">
                <Calculator className="h-4 w-4" />
                Calcular Pizzas
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
                      <Pizza className="h-5 w-5" />
                      Resultados de Pizza
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Personas</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.personas}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Utensils className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Nivel Hambre</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{resultado.nivelHambre}</p>
                        <p className="text-xs text-gray-500">{getHambreDescription(resultado.nivelHambre)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Pizza className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Tamaño</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600 capitalize">{resultado.tamañoPizza}</p>
                        <p className="text-xs text-gray-500">{resultado.porcionesPorPizza} porciones</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Porciones Necesarias</p>
                            <p className="text-3xl font-bold text-blue-600">{resultado.porcionesNecesarias}</p>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">Pizzas Necesarias</p>
                            <p className="text-3xl font-bold text-orange-600">{resultado.pizzasNecesarias}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">🍕 Recomendación</h4>
                      <p className="text-sm text-green-700">
                        Para {resultado.personas} personas con {getHambreDescription(resultado.nivelHambre).toLowerCase()}, 
                        necesitas <strong>{resultado.pizzasNecesarias} pizza{resultado.pizzasNecesarias > 1 ? 's' : ''} {resultado.tamañoPizza}{resultado.pizzasNecesarias > 1 ? 's' : ''}</strong>.
                        {resultado.pizzasNecesarias > 1 && ' Considera pedir una pizza extra por si acaso.'}
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Consejos Adicionales</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Variedad:</strong> Considera pedir diferentes sabores para satisfacer todos los gustos</p>
                        <p>• <strong>Extras:</strong> Si hay niños, considera pedir una pizza más pequeña o con ingredientes más simples</p>
                        <p>• <strong>Bebidas:</strong> No olvides calcular también las bebidas necesarias</p>
                        <p>• <strong>Postre:</strong> Considera si quieres agregar postres o si la pizza será suficiente</p>
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
