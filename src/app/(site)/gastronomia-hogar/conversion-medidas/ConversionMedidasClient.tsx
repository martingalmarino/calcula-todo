"use client";

import { useState } from 'react';
import { Calculator, Scale, Info, ArrowRight } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { convertKitchenMeasure } from '@/lib/math/gastronomy';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function ConversionMedidasClient() {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('taza');
  const [toUnit, setToUnit] = useState<string>('g');
  const [ingredient, setIngredient] = useState<string>('harina');
  const [resultado, setResultado] = useState<{
    value: number;
    fromUnit: string;
    toUnit: string;
    convertedValue: number;
    ingredient: string;
    density: number;
    equivalencies: {
      cups: number;
      tablespoons: number;
      teaspoons: number;
      milliliters: number;
      grams: number;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const valueNum = parseFloat(value);

    if (isNaN(valueNum) || valueNum < 0) {
      setError('Por favor, ingresa un valor numérico válido mayor o igual a 0.');
      return;
    }

    if (fromUnit === toUnit) {
      setError('Las unidades de origen y destino deben ser diferentes.');
      return;
    }

    try {
      const resultado = convertKitchenMeasure(valueNum, fromUnit, toUnit, ingredient);
      setResultado(resultado);
    } catch {
      setError('Error al realizar la conversión. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '1 taza de harina → gramos',
      values: { value: '1', fromUnit: 'taza', toUnit: 'g', ingredient: 'harina' }
    },
    {
      label: '250g de azúcar → tazas',
      values: { value: '250', fromUnit: 'g', toUnit: 'taza', ingredient: 'azucar' }
    },
    {
      label: '2 cucharadas de aceite → ml',
      values: { value: '2', fromUnit: 'cucharada', toUnit: 'ml', ingredient: 'aceite' }
    }
  ];

  const faqItems = [
    {
      question: '¿Por qué es importante seleccionar el ingrediente?',
      answer: 'Cada ingrediente tiene una densidad diferente. Por ejemplo, 1 taza de harina pesa menos que 1 taza de azúcar, por lo que las conversiones varían según el ingrediente.'
    },
    {
      question: '¿Qué es la densidad de un ingrediente?',
      answer: 'La densidad es la relación entre el peso y el volumen. Se expresa en g/ml y determina cuántos gramos caben en un mililitro de ese ingrediente.'
    },
    {
      question: '¿Son precisas estas conversiones?',
      answer: 'Las conversiones son aproximaciones basadas en densidades promedio. Para máxima precisión en repostería profesional, se recomienda usar siempre una balanza.'
    },
    {
      question: '¿Cómo mido correctamente con tazas?',
      answer: 'Para ingredientes secos: llenar la taza y nivelar con un cuchillo. Para líquidos: llenar hasta el borde. Para ingredientes pegajosos: usar cuchara para llenar.'
    }
  ];

  const relatedLinks = getRelatedCalculators('gastronomiaHogar', 'conversion-medidas').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setValue(values.value as string);
    setFromUnit(values.fromUnit as string);
    setToUnit(values.toUnit as string);
    setIngredient(values.ingredient as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/gastronomia-hogar/conversion-medidas/');

  const units = [
    { value: 'g', label: 'Gramos (g)' },
    { value: 'ml', label: 'Mililitros (ml)' },
    { value: 'taza', label: 'Tazas' },
    { value: 'cucharada', label: 'Cucharadas' },
    { value: 'cucharadita', label: 'Cucharaditas' }
  ];

  const ingredients = [
    { value: 'harina', label: 'Harina' },
    { value: 'azucar', label: 'Azúcar' },
    { value: 'arroz', label: 'Arroz' },
    { value: 'manteca', label: 'Manteca' },
    { value: 'aceite', label: 'Aceite' },
    { value: 'leche', label: 'Leche' },
    { value: 'huevo', label: 'Huevo' },
    { value: 'queso', label: 'Queso' },
    { value: 'tomate', label: 'Tomate' },
    { value: 'cebolla', label: 'Cebolla' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Conversión de Medidas de Cocina',
            description: 'Convierte cantidades entre gramos, mililitros, tazas, cucharadas y cucharaditas',
            url: '/gastronomia-hogar/conversion-medidas/',
            category: 'gastronomiaHogar'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Conversión de Medidas de Cocina"
            description="Convierte cantidades entre gramos, mililitros, tazas, cucharadas y cucharaditas. Incluye selector de ingrediente para conversiones precisas."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="ingredient">Ingrediente</Label>
                <Select value={ingredient} onValueChange={setIngredient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona ingrediente" />
                  </SelectTrigger>
                  <SelectContent>
                    {ingredients.map((ing) => (
                      <SelectItem key={ing.value} value={ing.value}>
                        {ing.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">Cada ingrediente tiene una densidad diferente</p>
              </div>
              
              <div>
                <Label htmlFor="value">Cantidad a Convertir</Label>
                <Input
                  id="value"
                  type="number"
                  min="0"
                  step="0.01"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Ej: 1"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromUnit">De</Label>
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="toUnit">A</Label>
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Convertir
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
                      <Scale className="h-5 w-5" />
                      Resultado de la Conversión
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-2">
                          {resultado.value} {resultado.fromUnit} de {resultado.ingredient}
                        </div>
                        <ArrowRight className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">
                          {resultado.convertedValue} {resultado.toUnit}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-800 mb-2">📊 Tabla de Equivalencias</h4>
                          <div className="text-sm text-blue-700 space-y-1">
                            <p>• <strong>Tazas:</strong> {resultado.equivalencies.cups}</p>
                            <p>• <strong>Cucharadas:</strong> {resultado.equivalencies.tablespoons}</p>
                            <p>• <strong>Cucharaditas:</strong> {resultado.equivalencies.teaspoons}</p>
                            <p>• <strong>Mililitros:</strong> {resultado.equivalencies.milliliters}</p>
                            <p>• <strong>Gramos:</strong> {resultado.equivalencies.grams}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">📏 Información Técnica</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• <strong>Ingrediente:</strong> {resultado.ingredient}</p>
                        <p>• <strong>Densidad:</strong> {resultado.density} g/ml</p>
                        <p>• <strong>Conversión:</strong> {resultado.value} {resultado.fromUnit} → {resultado.convertedValue} {resultado.toUnit}</p>
                      </div>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>💡 Consejos de Medición</AlertTitle>
                      <AlertDescription>
                        Para máxima precisión en repostería, usa siempre una balanza digital. 
                        Las conversiones por volumen pueden variar según cómo se mida (nivelado, compactado, etc.).
                      </AlertDescription>
                    </Alert>
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
