"use client";

import { useState } from 'react';
import { Calculator, Palette, Copy, Check } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { convertColor } from '@/lib/math/technology';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function ConversionColoresClient() {
  const [input, setInput] = useState<string>('');
  const [fromFormat, setFromFormat] = useState<'hex' | 'rgb' | 'cmyk' | 'hsl'>('hex');
  const [resultado, setResultado] = useState<{
    hex: string;
    rgb: { r: number; g: number; b: number };
    cmyk: { c: number; m: number; y: number; k: number };
    hsl: { h: number; s: number; l: number };
    isValid: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    if (!input.trim()) {
      setError('Por favor, ingresa un valor de color.');
      return;
    }

    try {
      const resultado = convertColor(input.trim(), fromFormat);
      if (!resultado.isValid) {
        setError('Formato de color inválido. Verifica el formato y los valores.');
        return;
      }
      setResultado(resultado);
    } catch {
      setError('Error al convertir el color. Verifica el formato y los valores.');
    }
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const examples = [
    {
      label: '#FF5733 (HEX)',
      values: { input: '#FF5733', fromFormat: 'hex' }
    },
    {
      label: 'rgb(255, 87, 51)',
      values: { input: 'rgb(255, 87, 51)', fromFormat: 'rgb' }
    },
    {
      label: 'cmyk(0, 66, 80, 0)',
      values: { input: 'cmyk(0, 66, 80, 0)', fromFormat: 'cmyk' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es HEX?',
      answer: 'HEX es un formato de color que usa valores hexadecimales (0-9, A-F) para representar los componentes rojo, verde y azul. Ejemplo: #FF0000 para rojo puro.'
    },
    {
      question: '¿Qué es RGB?',
      answer: 'RGB representa colores usando valores de 0-255 para rojo, verde y azul. Es el formato estándar para pantallas y monitores.'
    },
    {
      question: '¿Qué es CMYK?',
      answer: 'CMYK se usa para impresión y representa cian, magenta, amarillo y negro. Los valores van de 0-100% y se usa en diseño gráfico para impresión.'
    },
    {
      question: '¿Qué es HSL?',
      answer: 'HSL representa colores por matiz (0-360°), saturación (0-100%) y luminosidad (0-100%). Es más intuitivo para ajustar colores.'
    }
  ];

  const relatedLinks = getRelatedCalculators('tecnologia', 'conversion-colores').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setInput(values.input as string);
    setFromFormat(values.fromFormat as 'hex' | 'rgb' | 'cmyk' | 'hsl');
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/tecnologia/conversion-colores/');

  const getInputPlaceholder = () => {
    switch (fromFormat) {
      case 'hex': return '#FF5733';
      case 'rgb': return 'rgb(255, 87, 51)';
      case 'cmyk': return 'cmyk(0, 66, 80, 0)';
      case 'hsl': return 'hsl(12, 100, 60)';
      default: return '';
    }
  };

  const getInputLabel = () => {
    switch (fromFormat) {
      case 'hex': return 'Color HEX';
      case 'rgb': return 'Color RGB';
      case 'cmyk': return 'Color CMYK';
      case 'hsl': return 'Color HSL';
      default: return 'Color';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Conversión de Colores',
            description: 'Convierte colores entre formatos HEX, RGB, CMYK y HSL con vista previa',
            url: '/tecnologia/conversion-colores/',
            category: 'tecnologia'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Conversión de Colores"
            description="Convierte colores entre formatos HEX, RGB, CMYK y HSL con vista previa en tiempo real. Herramienta para diseñadores y desarrolladores."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="fromFormat">Formato de Entrada</Label>
                <Select value={fromFormat} onValueChange={(value: 'hex' | 'rgb' | 'cmyk' | 'hsl') => setFromFormat(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hex">HEX (#FF5733)</SelectItem>
                    <SelectItem value="rgb">RGB (255, 87, 51)</SelectItem>
                    <SelectItem value="cmyk">CMYK (0, 66, 80, 0)</SelectItem>
                    <SelectItem value="hsl">HSL (12, 100, 60)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="input">{getInputLabel()}</Label>
                <Input
                  id="input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={getInputPlaceholder()}
                />
                <p className="text-sm text-gray-500 mt-1">Ingresa el color en el formato seleccionado</p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Convertir Color
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
                      <Palette className="h-5 w-5" />
                      Resultado de Conversión
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Vista previa del color */}
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="text-center">
                        <div 
                          className="w-24 h-24 mx-auto rounded-lg border-2 border-gray-300 mb-3"
                          style={{ backgroundColor: resultado.hex }}
                        ></div>
                        <p className="text-sm text-gray-600">Vista previa del color</p>
                      </div>
                    </div>

                    {/* Formatos de color */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">HEX</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopy(resultado.hex, 'hex')}
                          >
                            {copied === 'hex' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                        <p className="text-lg font-mono font-bold text-gray-800">{resultado.hex}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">RGB</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopy(`rgb(${resultado.rgb.r}, ${resultado.rgb.g}, ${resultado.rgb.b})`, 'rgb')}
                          >
                            {copied === 'rgb' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                        <p className="text-lg font-mono font-bold text-gray-800">
                          rgb({resultado.rgb.r}, {resultado.rgb.g}, {resultado.rgb.b})
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">CMYK</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopy(`cmyk(${resultado.cmyk.c}, ${resultado.cmyk.m}, ${resultado.cmyk.y}, ${resultado.cmyk.k})`, 'cmyk')}
                          >
                            {copied === 'cmyk' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                        <p className="text-lg font-mono font-bold text-gray-800">
                          cmyk({resultado.cmyk.c}, {resultado.cmyk.m}, {resultado.cmyk.y}, {resultado.cmyk.k})
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">HSL</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopy(`hsl(${resultado.hsl.h}, ${resultado.hsl.s}%, ${resultado.hsl.l}%)`, 'hsl')}
                          >
                            {copied === 'hsl' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                        <p className="text-lg font-mono font-bold text-gray-800">
                          hsl({resultado.hsl.h}, {resultado.hsl.s}%, {resultado.hsl.l}%)
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">📊 Valores Detallados</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• <strong>HEX:</strong> {resultado.hex}</p>
                        <p>• <strong>RGB:</strong> R={resultado.rgb.r}, G={resultado.rgb.g}, B={resultado.rgb.b}</p>
                        <p>• <strong>CMYK:</strong> C={resultado.cmyk.c}%, M={resultado.cmyk.m}%, Y={resultado.cmyk.y}%, K={resultado.cmyk.k}%</p>
                        <p>• <strong>HSL:</strong> H={resultado.hsl.h}°, S={resultado.hsl.s}%, L={resultado.hsl.l}%</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Información sobre Formatos</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>HEX:</strong> Usado en desarrollo web y CSS</p>
                        <p>• <strong>RGB:</strong> Estándar para pantallas y monitores</p>
                        <p>• <strong>CMYK:</strong> Usado en impresión y diseño gráfico</p>
                        <p>• <strong>HSL:</strong> Más intuitivo para ajustar matiz y saturación</p>
                      </div>
                    </div>

                    {copied && (
                      <Alert>
                        <Check className="h-4 w-4" />
                        <AlertTitle>¡Copiado!</AlertTitle>
                        <AlertDescription>
                          El valor {copied.toUpperCase()} ha sido copiado al portapapeles.
                        </AlertDescription>
                      </Alert>
                    )}
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
