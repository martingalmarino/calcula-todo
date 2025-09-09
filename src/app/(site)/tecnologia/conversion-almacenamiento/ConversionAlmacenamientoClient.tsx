"use client";

import { useState } from 'react';
import { Calculator, HardDrive, Info, ArrowRight } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { convertStorage } from '@/lib/math/technology';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function ConversionAlmacenamientoClient() {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('MB');
  const [toUnit, setToUnit] = useState<string>('GB');
  const [base, setBase] = useState<'decimal' | 'binary'>('binary');
  const [resultado, setResultado] = useState<{
    value: number;
    fromUnit: string;
    toUnit: string;
    convertedValue: number;
    base: 'decimal' | 'binary';
    comparison: string;
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
      const resultado = convertStorage(valueNum, fromUnit, toUnit, base);
      setResultado(resultado);
    } catch {
      setError('Error al realizar la conversión. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '1024 MB → GB (binario)',
      values: { value: '1024', fromUnit: 'MB', toUnit: 'GB', base: 'binary' }
    },
    {
      label: '1000 MB → GB (decimal)',
      values: { value: '1000', fromUnit: 'MB', toUnit: 'GB', base: 'decimal' }
    },
    {
      label: '2.5 TB → GB',
      values: { value: '2.5', fromUnit: 'TB', toUnit: 'GB', base: 'binary' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cuál es la diferencia entre base decimal y binaria?',
      answer: 'Base decimal (1000): Usada por fabricantes de discos duros y sistemas operativos modernos. Base binaria (1024): Usada tradicionalmente en informática y sistemas antiguos.'
    },
    {
      question: '¿Por qué mi disco duro muestra menos espacio del anunciado?',
      answer: 'Los fabricantes usan base decimal (1000) pero los sistemas operativos usan base binaria (1024). Un disco de 1TB (decimal) = 931GB (binario).'
    },
    {
      question: '¿Qué base debo usar?',
      answer: 'Usa base binaria (1024) para cálculos técnicos y programación. Usa base decimal (1000) para comparar con especificaciones de fabricantes.'
    },
    {
      question: '¿Cómo se relacionan las unidades?',
      answer: '1 KB = 1024 bytes (binario) o 1000 bytes (decimal). 1 MB = 1024 KB (binario) o 1000 KB (decimal). Y así sucesivamente.'
    }
  ];

  const relatedLinks = getRelatedCalculators('tecnologia', 'conversion-almacenamiento').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setValue(values.value as string);
    setFromUnit(values.fromUnit as string);
    setToUnit(values.toUnit as string);
    setBase(values.base as 'decimal' | 'binary');
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/tecnologia/conversion-almacenamiento/');

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Conversión de Almacenamiento',
            description: 'Convierte entre unidades de almacenamiento digital con base decimal y binaria',
            url: '/tecnologia/conversion-almacenamiento/',
            category: 'tecnologia'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Conversión de Almacenamiento"
            description="Convierte entre unidades de almacenamiento digital (KB, MB, GB, TB) con base decimal (1000) y binaria (1024). Incluye comparaciones divertidas."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="value">Valor a Convertir</Label>
                <Input
                  id="value"
                  type="number"
                  min="0"
                  step="0.01"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Ej: 1024"
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
                        <SelectItem key={unit} value={unit}>
                          {unit}
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
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="base">Base de Conversión</Label>
                <Select value={base} onValueChange={(value: 'decimal' | 'binary') => setBase(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona base" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="binary">Binaria (1024) - Informática tradicional</SelectItem>
                    <SelectItem value="decimal">Decimal (1000) - Fabricantes de discos</SelectItem>
                  </SelectContent>
                </Select>
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
                      <HardDrive className="h-5 w-5" />
                      Resultado de la Conversión
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-2">
                          {resultado.value} {resultado.fromUnit}
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
                          <h4 className="font-semibold text-blue-800 mb-2">💡 Comparación Divertida</h4>
                          <p className="text-sm text-blue-700">{resultado.comparison}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">📊 Detalles Técnicos</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• <strong>Base utilizada:</strong> {resultado.base === 'binary' ? '1024 (binaria)' : '1000 (decimal)'}</p>
                        <p>• <strong>Factor de conversión:</strong> {resultado.base === 'binary' ? '1024' : '1000'}</p>
                        <p>• <strong>Resultado exacto:</strong> {resultado.convertedValue} {resultado.toUnit}</p>
                      </div>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>💾 Información sobre Almacenamiento</AlertTitle>
                      <AlertDescription>
                        {resultado.base === 'binary' 
                          ? 'Base binaria (1024) es la tradicional en informática. Usada por sistemas operativos y programadores.'
                          : 'Base decimal (1000) es usada por fabricantes de discos duros y sistemas modernos.'
                        }
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
