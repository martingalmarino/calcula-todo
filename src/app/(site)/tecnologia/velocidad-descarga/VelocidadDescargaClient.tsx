"use client";

import { useState } from 'react';
import { Calculator, Download, Clock, Wifi, AlertTriangle } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calculateDownloadSpeed } from '@/lib/math/technology';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function VelocidadDescargaClient() {
  const [mbps, setMbps] = useState<string>('');
  const [fileSizeGB, setFileSizeGB] = useState<string>('');
  const [resultado, setResultado] = useState<{
    mbps: number;
    mbpsValue: number;
    downloadTime: {
      seconds: number;
      minutes: number;
      hours: number;
      formatted: string;
    };
    fileSize?: number;
    disclaimer: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const mbpsNum = parseFloat(mbps);
    const fileSizeNum = fileSizeGB ? parseFloat(fileSizeGB) : undefined;

    if (isNaN(mbpsNum) || mbpsNum <= 0) {
      setError('La velocidad debe ser un valor numérico mayor a 0.');
      return;
    }

    if (fileSizeGB && (isNaN(fileSizeNum!) || fileSizeNum! <= 0)) {
      setError('El tamaño del archivo debe ser un valor numérico mayor a 0.');
      return;
    }

    try {
      const resultado = calculateDownloadSpeed(mbpsNum, fileSizeNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular la velocidad de descarga. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '100 Mbps, película 2 GB',
      values: { mbps: '100', fileSizeGB: '2' }
    },
    {
      label: '50 Mbps, juego 15 GB',
      values: { mbps: '50', fileSizeGB: '15' }
    },
    {
      label: '25 Mbps, archivo 500 MB',
      values: { mbps: '25', fileSizeGB: '0.5' }
    }
  ];

  const faqItems = [
    {
      question: '¿Por qué mi velocidad real es menor que la contratada?',
      answer: 'La velocidad contratada es teórica. Factores como latencia, pérdidas de paquetes, limitaciones del servidor y tráfico de red afectan la velocidad real.'
    },
    {
      question: '¿Cómo se convierte Mbps a MB/s?',
      answer: 'Para convertir Mbps a MB/s, divide por 8. Por ejemplo: 100 Mbps ÷ 8 = 12.5 MB/s. Esto se debe a que 1 byte = 8 bits.'
    },
    {
      question: '¿Qué factores afectan la velocidad de descarga?',
      answer: 'Latencia, pérdidas de paquetes, limitaciones del servidor, tráfico de red, distancia al servidor, y la calidad de tu conexión.'
    },
    {
      question: '¿Son precisos estos cálculos?',
      answer: 'Son aproximaciones teóricas. La velocidad real puede variar significativamente debido a factores técnicos y de red.'
    }
  ];

  const relatedLinks = getRelatedCalculators('tecnologia', 'velocidad-descarga').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setMbps(values.mbps as string);
    setFileSizeGB(values.fileSizeGB as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/tecnologia/velocidad-descarga/');

  const getSpeedCategory = (mbps: number) => {
    if (mbps >= 100) return { label: 'Muy Rápida', color: 'text-green-600', bg: 'bg-green-50' };
    if (mbps >= 50) return { label: 'Rápida', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (mbps >= 25) return { label: 'Moderada', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { label: 'Lenta', color: 'text-red-600', bg: 'bg-red-50' };
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Velocidad de Descarga',
            description: 'Convierte velocidad de internet de Mbps a MB/s y calcula tiempo de descarga',
            url: '/tecnologia/velocidad-descarga/',
            category: 'tecnologia'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Velocidad de Descarga"
            description="Convierte la velocidad de internet de Mbps a MB/s y calcula el tiempo estimado de descarga para archivos. Incluye ejemplos prácticos."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="mbps">Velocidad de Internet (Mbps)</Label>
                <Input
                  id="mbps"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={mbps}
                  onChange={(e) => setMbps(e.target.value)}
                  placeholder="Ej: 100"
                />
                <p className="text-sm text-gray-500 mt-1">Velocidad contratada con tu proveedor de internet</p>
              </div>
              
              <div>
                <Label htmlFor="fileSizeGB">Tamaño del Archivo (GB) - Opcional</Label>
                <Input
                  id="fileSizeGB"
                  type="number"
                  min="0.001"
                  step="0.001"
                  value={fileSizeGB}
                  onChange={(e) => setFileSizeGB(e.target.value)}
                  placeholder="Ej: 2.5"
                />
                <p className="text-sm text-gray-500 mt-1">Deja vacío para solo convertir velocidad</p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Velocidad
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
                      <Download className="h-5 w-5" />
                      Resultado de Velocidad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Wifi className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Velocidad Contratada</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.mbps} Mbps</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Download className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Velocidad Real</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.mbpsValue} MB/s</p>
                      </div>
                    </div>

                    {resultado.fileSize && (
                      <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <span className="text-sm text-gray-600">Tiempo Estimado de Descarga</span>
                          </div>
                          <p className="text-3xl font-bold text-blue-600">{resultado.downloadTime.formatted}</p>
                          <p className="text-sm text-gray-500 mt-1">Para un archivo de {resultado.fileSize} GB</p>
                        </div>
                      </div>
                    )}

                    <div className={`p-4 rounded-lg border ${getSpeedCategory(resultado.mbps).bg}`}>
                      <h4 className={`font-semibold ${getSpeedCategory(resultado.mbps).color} mb-2`}>
                        📊 Categoría de Velocidad
                      </h4>
                      <p className={`text-sm ${getSpeedCategory(resultado.mbps).color}`}>
                        <strong>{getSpeedCategory(resultado.mbps).label}</strong> - 
                        {resultado.mbps >= 100 && ' Ideal para streaming 4K, gaming online y descargas grandes'}
                        {resultado.mbps >= 50 && resultado.mbps < 100 && ' Buena para streaming HD, gaming casual y trabajo remoto'}
                        {resultado.mbps >= 25 && resultado.mbps < 50 && ' Adecuada para streaming, navegación y trabajo básico'}
                        {resultado.mbps < 25 && ' Mínima para navegación básica y streaming de baja calidad'}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">💡 Conversión Técnica</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• <strong>Fórmula:</strong> MB/s = Mbps ÷ 8</p>
                        <p>• <strong>Razón:</strong> 1 byte = 8 bits</p>
                        <p>• <strong>Velocidad real:</strong> {resultado.mbpsValue} MB/s</p>
                        {resultado.fileSize && (
                          <p>• <strong>Tiempo estimado:</strong> {resultado.downloadTime.formatted}</p>
                        )}
                      </div>
                    </div>

                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>⚠️ Resultados Aproximados</AlertTitle>
                      <AlertDescription>
                        {resultado.disclaimer}
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
