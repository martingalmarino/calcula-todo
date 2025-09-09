"use client";

import { useState } from 'react';
import { Calculator, Turtle, Bird, Bug, Heart } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { convertirEdadAnimales } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function ExpectativaAnimalesClient() {
  const [edadHumana, setEdadHumana] = useState<string>('');
  const [animal, setAnimal] = useState<string>('');
  const [resultado, setResultado] = useState<{
    vidasAnimal: number;
    descripcion: string;
    expectativaAnimal: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const edadNum = parseFloat(edadHumana);

    if (isNaN(edadNum)) {
      setError('Por favor, ingresa una edad válida.');
      return;
    }

    if (edadNum <= 0 || edadNum > 120) {
      setError('La edad debe estar entre 1 y 120 años.');
      return;
    }

    if (!animal) {
      setError('Por favor, selecciona un animal.');
      return;
    }

    try {
      const resultado = convertirEdadAnimales(edadNum, animal as 'tortuga' | 'colibri' | 'mosca');
      setResultado(resultado);
    } catch {
      setError('Error al calcular la comparación. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '25 años humanos vs tortuga',
      values: { edadHumana: '25', animal: 'tortuga' }
    },
    {
      label: '30 años humanos vs colibrí',
      values: { edadHumana: '30', animal: 'colibri' }
    },
    {
      label: '40 años humanos vs mosca',
      values: { edadHumana: '40', animal: 'mosca' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cuál es la expectativa de vida de una tortuga?',
      answer: 'Las tortugas pueden vivir hasta 150 años, siendo uno de los animales más longevos del planeta. Algunas especies pueden vivir incluso más tiempo.'
    },
    {
      question: '¿Cuánto vive un colibrí?',
      answer: 'Los colibríes tienen una expectativa de vida de aproximadamente 5 años en la naturaleza, aunque algunos pueden vivir hasta 10 años en condiciones ideales.'
    },
    {
      question: '¿Cuánto vive una mosca?',
      answer: 'Las moscas domésticas viven aproximadamente 7 días (0.02 años), aunque su ciclo de vida completo desde huevo hasta adulto es de 10-14 días.'
    },
    {
      question: '¿Por qué hay tanta diferencia en las expectativas de vida?',
      answer: 'La expectativa de vida varía según el tamaño, metabolismo, depredadores, ambiente y estrategias de supervivencia de cada especie.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'expectativa-animales').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setEdadHumana(values.edadHumana as string);
    setAnimal(values.animal as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/expectativa-animales/');

  const getAnimalIcon = (animal: string) => {
    switch (animal) {
      case 'tortuga': return <Turtle className="h-5 w-5" />;
      case 'colibri': return <Bird className="h-5 w-5" />;
      case 'mosca': return <Bug className="h-5 w-5" />;
      default: return <Heart className="h-5 w-5" />;
    }
  };

  const getAnimalEmoji = (animal: string) => {
    switch (animal) {
      case 'tortuga': return '🐢';
      case 'colibri': return '🦜';
      case 'mosca': return '🪰';
      default: return '🐾';
    }
  };

  const getAnimalColor = (animal: string) => {
    switch (animal) {
      case 'tortuga': return 'text-green-600';
      case 'colibri': return 'text-blue-600';
      case 'mosca': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Expectativa de Vida en Animales',
            description: 'Convierte tu edad humana a vidas de tortuga, años de colibrí o días de mosca',
            url: '/curiosas/expectativa-animales/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Expectativa de Vida en Animales"
            description="Convierte tu edad humana a vidas de tortuga, años de colibrí o días de mosca. Descubre comparaciones fascinantes con el reino animal."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="edadHumana">Tu Edad en Años Humanos</Label>
                <Input
                  id="edadHumana"
                  type="number"
                  min="1"
                  max="120"
                  value={edadHumana}
                  onChange={(e) => setEdadHumana(e.target.value)}
                  placeholder="Ej: 25"
                />
              </div>
              
              <div>
                <Label htmlFor="animal">Animal para Comparar</Label>
                <Select value={animal} onValueChange={setAnimal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un animal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tortuga">🐢 Tortuga (150 años)</SelectItem>
                    <SelectItem value="colibri">🦜 Colibrí (5 años)</SelectItem>
                    <SelectItem value="mosca">🪰 Mosca (7 días)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Comparación
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center gap-2">
                      {getAnimalIcon(animal)}
                      Comparación con {animal === 'tortuga' ? 'Tortuga' : animal === 'colibri' ? 'Colibrí' : 'Mosca'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Tu Edad</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{edadHumana} años</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          {getAnimalIcon(animal)}
                          <span className="text-sm text-gray-600">Expectativa {animal === 'tortuga' ? 'Tortuga' : animal === 'colibri' ? 'Colibrí' : 'Mosca'}</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">
                          {animal === 'mosca' ? `${resultado.expectativaAnimal * 365} días` : `${resultado.expectativaAnimal} años`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Equivalencia</p>
                        <p className={`text-3xl font-bold ${getAnimalColor(animal)}`}>
                          {animal === 'tortuga' ? `${resultado.vidasAnimal} vidas` : 
                           animal === 'colibri' ? `${resultado.vidasAnimal} años` : 
                           `${resultado.vidasAnimal} días`}
                        </p>
                        <p className="text-lg text-gray-600 mt-2">
                          {getAnimalEmoji(animal)} {animal === 'tortuga' ? 'de tortuga' : animal === 'colibri' ? 'de colibrí' : 'de mosca'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">🐾 Resultado</h4>
                      <p className="text-sm text-green-700">
                        {resultado.descripcion}
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Datos Curiosos</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        {animal === 'tortuga' && (
                          <>
                            <p>• <strong>Longevidad:</strong> Las tortugas son uno de los animales más longevos del planeta</p>
                            <p>• <strong>Metabolismo lento:</strong> Su ritmo cardíaco es muy lento, lo que contribuye a su longevidad</p>
                            <p>• <strong>Resistencia:</strong> Pueden sobrevivir sin comida ni agua durante meses</p>
                          </>
                        )}
                        {animal === 'colibri' && (
                          <>
                            <p>• <strong>Metabolismo rápido:</strong> Los colibríes tienen el metabolismo más alto de todos los vertebrados</p>
                            <p>• <strong>Corazón:</strong> Su corazón late hasta 1,260 veces por minuto</p>
                            <p>• <strong>Vuelo:</strong> Son las únicas aves que pueden volar hacia atrás</p>
                          </>
                        )}
                        {animal === 'mosca' && (
                          <>
                            <p>• <strong>Ciclo corto:</strong> Las moscas tienen uno de los ciclos de vida más cortos</p>
                            <p>• <strong>Reproducción:</strong> Una hembra puede poner hasta 500 huevos en su vida</p>
                            <p>• <strong>Velocidad:</strong> Pueden volar hasta 7 km/h y cambiar dirección instantáneamente</p>
                          </>
                        )}
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
