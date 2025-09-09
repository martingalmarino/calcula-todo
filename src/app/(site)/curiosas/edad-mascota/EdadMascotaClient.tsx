"use client";

import { useState } from 'react';
import { Calculator, Dog, Cat, Heart } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { convertirEdadMascota } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function EdadMascotaClient() {
  const [añosHumanos, setAñosHumanos] = useState<string>('');
  const [tipoMascota, setTipoMascota] = useState<string>('');
  const [resultado, setResultado] = useState<{
    edadMascota: number;
    descripcion: string;
    etapa: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const añosNum = parseFloat(añosHumanos);

    if (isNaN(añosNum)) {
      setError('Por favor, ingresa una edad válida.');
      return;
    }

    if (añosNum <= 0 || añosNum > 30) {
      setError('La edad debe estar entre 1 y 30 años.');
      return;
    }

    if (!tipoMascota) {
      setError('Por favor, selecciona el tipo de mascota.');
      return;
    }

    try {
      const resultado = convertirEdadMascota(añosNum, tipoMascota as 'perro' | 'gato');
      setResultado(resultado);
    } catch {
      setError('Error al calcular la edad de la mascota. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Perro de 3 años humanos',
      values: { añosHumanos: '3', tipoMascota: 'perro' }
    },
    {
      label: 'Gato de 5 años humanos',
      values: { añosHumanos: '5', tipoMascota: 'gato' }
    },
    {
      label: 'Perro de 8 años humanos',
      values: { añosHumanos: '8', tipoMascota: 'perro' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cómo se calcula la edad de los perros?',
      answer: 'Los perros envejecen más rápido en sus primeros 2 años (10.5 años perro por año humano), luego 4 años perro por cada año humano adicional. Esta es una fórmula científica aproximada.'
    },
    {
      question: '¿Cómo se calcula la edad de los gatos?',
      answer: 'Los gatos envejecen 15 años gato en su primer año, 9 años en el segundo año, y luego 4 años gato por cada año humano adicional.'
    },
    {
      question: '¿Qué significan las etapas de vida?',
      answer: 'Cachorro/Gatito (0-15 años), Adulto Joven (15-35 años), Adulto (35-60 años), Senior (60+ años). Estas etapas ayudan a entender las necesidades de tu mascota.'
    },
    {
      question: '¿Es exacta esta conversión?',
      answer: 'Es una aproximación científica. La edad real puede variar según la raza, tamaño, salud y estilo de vida de tu mascota. Consulta siempre con tu veterinario.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'edad-mascota').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setAñosHumanos(values.añosHumanos as string);
    setTipoMascota(values.tipoMascota as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/edad-mascota/');

  const getEtapaColor = (etapa: string) => {
    switch (etapa) {
      case 'cachorro':
      case 'gatito':
        return 'text-green-600';
      case 'adulto joven':
        return 'text-blue-600';
      case 'adulto':
        return 'text-orange-600';
      case 'senior':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Edad de tu Mascota',
            description: 'Convierte años humanos a años de perro o gato usando tablas científicas aproximadas',
            url: '/curiosas/edad-mascota/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Edad de tu Mascota"
            description="Convierte años humanos a años de perro o gato usando tablas científicas aproximadas. Descubre la edad real de tu mascota y su etapa de vida."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="añosHumanos">Edad en Años Humanos</Label>
                <Input
                  id="añosHumanos"
                  type="number"
                  min="1"
                  max="30"
                  value={añosHumanos}
                  onChange={(e) => setAñosHumanos(e.target.value)}
                  placeholder="Ej: 3"
                />
              </div>
              
              <div>
                <Label htmlFor="tipoMascota">Tipo de Mascota</Label>
                <Select value={tipoMascota} onValueChange={setTipoMascota}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perro">🐶 Perro</SelectItem>
                    <SelectItem value="gato">🐱 Gato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Edad
                </Button>
              </div>

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
                      {tipoMascota === 'perro' ? <Dog className="h-5 w-5" /> : <Cat className="h-5 w-5" />}
                      Edad de tu {tipoMascota === 'perro' ? 'Perro' : 'Gato'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Edad Humana</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{añosHumanos} años</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          {tipoMascota === 'perro' ? <Dog className="h-4 w-4 text-gray-600" /> : <Cat className="h-4 w-4 text-gray-600" />}
                          <span className="text-sm text-gray-600">Edad {tipoMascota === 'perro' ? 'Perro' : 'Gato'}</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{resultado.edadMascota} años</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Etapa de Vida</p>
                        <p className={`text-3xl font-bold ${getEtapaColor(resultado.etapa)}`}>
                          {resultado.etapa.charAt(0).toUpperCase() + resultado.etapa.slice(1)}
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
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Información Útil</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Cuidados especiales:</strong> Las mascotas senior necesitan más atención veterinaria</p>
                        <p>• <strong>Alimentación:</strong> Cada etapa requiere una dieta específica</p>
                        <p>• <strong>Ejercicio:</strong> Los cachorros necesitan más actividad que los adultos</p>
                        <p>• <strong>Salud:</strong> Las visitas al veterinario deben ser más frecuentes en mascotas mayores</p>
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
