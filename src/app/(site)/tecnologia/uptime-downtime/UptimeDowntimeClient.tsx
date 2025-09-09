"use client";

import { useState } from 'react';
import { Calculator, Clock, TrendingUp, AlertCircle, Server } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calculateUptime } from '@/lib/math/technology';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function UptimeDowntimeClient() {
  const [uptimePercentage, setUptimePercentage] = useState<string>('');
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('month');
  const [resultado, setResultado] = useState<{
    uptimePercentage: number;
    period: 'day' | 'month' | 'year';
    downtime: {
      minutes: number;
      hours: number;
      days: number;
      formatted: string;
    };
    totalPeriod: {
      minutes: number;
      hours: number;
      days: number;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const uptimeNum = parseFloat(uptimePercentage);

    if (isNaN(uptimeNum) || uptimeNum < 0 || uptimeNum > 100) {
      setError('El porcentaje de uptime debe estar entre 0 y 100.');
      return;
    }

    try {
      const resultado = calculateUptime(uptimeNum, period);
      setResultado(resultado);
    } catch {
      setError('Error al calcular el uptime/downtime. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '99.9% uptime mensual',
      values: { uptimePercentage: '99.9', period: 'month' }
    },
    {
      label: '99.5% uptime anual',
      values: { uptimePercentage: '99.5', period: 'year' }
    },
    {
      label: '95% uptime diario',
      values: { uptimePercentage: '95', period: 'day' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es el uptime?',
      answer: 'El uptime es el porcentaje de tiempo que un servicio está disponible y funcionando correctamente. Se expresa como un porcentaje del tiempo total.'
    },
    {
      question: '¿Cuál es un buen nivel de uptime?',
      answer: '99.9% (8.77 horas de caída al año) es considerado excelente. 99.5% (43.8 horas al año) es bueno. 99% (87.6 horas al año) es aceptable para servicios básicos.'
    },
    {
      question: '¿Cómo se calcula el downtime?',
      answer: 'Downtime = (100% - Uptime%) × Tiempo total del período. Por ejemplo: 99.9% uptime = 0.1% downtime = 43.8 minutos al mes.'
    },
    {
      question: '¿Qué factores afectan el uptime?',
      answer: 'Mantenimiento programado, fallos de hardware, problemas de red, ataques DDoS, errores de software, y problemas de proveedores externos.'
    }
  ];

  const relatedLinks = getRelatedCalculators('tecnologia', 'uptime-downtime').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setUptimePercentage(values.uptimePercentage as string);
    setPeriod(values.period as 'day' | 'month' | 'year');
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/tecnologia/uptime-downtime/');

  const getUptimeCategory = (uptime: number) => {
    if (uptime >= 99.9) return { label: 'Excelente', color: 'text-green-600', bg: 'bg-green-50', description: 'Nivel empresarial' };
    if (uptime >= 99.5) return { label: 'Muy Bueno', color: 'text-blue-600', bg: 'bg-blue-50', description: 'Nivel profesional' };
    if (uptime >= 99) return { label: 'Bueno', color: 'text-yellow-600', bg: 'bg-yellow-50', description: 'Nivel comercial' };
    if (uptime >= 95) return { label: 'Aceptable', color: 'text-orange-600', bg: 'bg-orange-50', description: 'Nivel básico' };
    return { label: 'Pobre', color: 'text-red-600', bg: 'bg-red-50', description: 'Necesita mejora' };
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'day': return 'día';
      case 'month': return 'mes';
      case 'year': return 'año';
      default: return 'período';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Uptime/Downtime',
            description: 'Calcula porcentaje de disponibilidad y tiempo de caída para servicios',
            url: '/tecnologia/uptime-downtime/',
            category: 'tecnologia'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Uptime/Downtime"
            description="Calcula el porcentaje de disponibilidad (uptime) y el tiempo de caída (downtime) para servicios, hosting y aplicaciones. Ideal para admins de sistemas."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="uptimePercentage">Porcentaje de Uptime (%)</Label>
                <Input
                  id="uptimePercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={uptimePercentage}
                  onChange={(e) => setUptimePercentage(e.target.value)}
                  placeholder="Ej: 99.9"
                />
                <p className="text-sm text-gray-500 mt-1">Porcentaje de tiempo que el servicio está disponible</p>
              </div>
              
              <div>
                <Label htmlFor="period">Período de Tiempo</Label>
                <Select value={period} onValueChange={(value: 'day' | 'month' | 'year') => setPeriod(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Día (24 horas)</SelectItem>
                    <SelectItem value="month">Mes (30 días)</SelectItem>
                    <SelectItem value="year">Año (365 días)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Uptime
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
                      <Server className="h-5 w-5" />
                      Resultado de Disponibilidad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Uptime</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.uptimePercentage}%</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Downtime</span>
                        </div>
                        <p className="text-2xl font-bold text-red-600">{resultado.downtime.formatted}</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <span className="text-sm text-gray-600">Tiempo de Caída por {getPeriodLabel(resultado.period)}</span>
                        </div>
                        <p className="text-3xl font-bold text-blue-600">{resultado.downtime.formatted}</p>
                        <p className="text-sm text-gray-500 mt-1">de {resultado.totalPeriod.days} días totales</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${getUptimeCategory(resultado.uptimePercentage).bg}`}>
                      <h4 className={`font-semibold ${getUptimeCategory(resultado.uptimePercentage).color} mb-2`}>
                        📊 Nivel de Disponibilidad
                      </h4>
                      <p className={`text-sm ${getUptimeCategory(resultado.uptimePercentage).color}`}>
                        <strong>{getUptimeCategory(resultado.uptimePercentage).label}</strong> - 
                        {getUptimeCategory(resultado.uptimePercentage).description}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">📈 Desglose Detallado</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• <strong>Período:</strong> {getPeriodLabel(resultado.period)} ({resultado.totalPeriod.days} días)</p>
                        <p>• <strong>Uptime:</strong> {resultado.uptimePercentage}%</p>
                        <p>• <strong>Downtime:</strong> {resultado.downtime.formatted}</p>
                        <p>• <strong>Downtime en minutos:</strong> {resultado.downtime.minutes} minutos</p>
                        <p>• <strong>Downtime en horas:</strong> {resultado.downtime.hours} horas</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Estándares de la Industria</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>99.9% (3 nueves):</strong> 8.77 horas/año - Excelente</p>
                        <p>• <strong>99.5%:</strong> 43.8 horas/año - Muy bueno</p>
                        <p>• <strong>99% (2 nueves):</strong> 87.6 horas/año - Bueno</p>
                        <p>• <strong>95%:</strong> 438 horas/año - Aceptable</p>
                        <p>• <strong>90%:</strong> 876 horas/año - Pobre</p>
                      </div>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>⚠️ Consideraciones Importantes</AlertTitle>
                      <AlertDescription>
                        El uptime real puede verse afectado por mantenimiento programado, fallos de hardware, 
                        problemas de red, ataques DDoS y dependencias de terceros. Estos cálculos son teóricos.
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
