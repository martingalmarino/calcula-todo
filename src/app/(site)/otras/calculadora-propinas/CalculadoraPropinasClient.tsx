"use client";

import { useState } from 'react';
import { Calculator, Receipt, Users, DollarSign, Percent } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calculateTip } from '@/lib/math/others';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function CalculadoraPropinasClient() {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<string>('');
  const [peopleCount, setPeopleCount] = useState<string>('1');
  const [resultado, setResultado] = useState<{
    billAmount: number;
    tipPercentage: number;
    tipAmount: number;
    totalAmount: number;
    perPersonAmount: number;
    peopleCount: number;
    breakdown: {
      bill: number;
      tip: number;
      total: number;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const billNum = parseFloat(billAmount);
    const tipNum = parseFloat(tipPercentage);
    const peopleNum = parseFloat(peopleCount);

    if (isNaN(billNum) || isNaN(tipNum) || isNaN(peopleNum)) {
      setError('Por favor, ingresa valores numéricos válidos.');
      return;
    }

    if (billNum <= 0) {
      setError('El monto de la cuenta debe ser mayor a 0.');
      return;
    }

    if (tipNum < 0 || tipNum > 100) {
      setError('El porcentaje de propina debe estar entre 0 y 100.');
      return;
    }

    if (peopleNum <= 0 || peopleNum > 50) {
      setError('El número de personas debe estar entre 1 y 50.');
      return;
    }

    try {
      const resultado = calculateTip(billNum, tipNum, peopleNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular la propina. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: 'Cuenta de $50, 15% propina, 2 personas',
      values: { billAmount: '50', tipPercentage: '15', peopleCount: '2' }
    },
    {
      label: 'Cuenta de $120, 18% propina, 4 personas',
      values: { billAmount: '120', tipPercentage: '18', peopleCount: '4' }
    },
    {
      label: 'Cuenta de $25, 20% propina, 1 persona',
      values: { billAmount: '25', tipPercentage: '20', peopleCount: '1' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cuál es el porcentaje de propina estándar?',
      answer: 'En la mayoría de países: 15-18% para servicio estándar, 18-20% para buen servicio, 20%+ para servicio excelente. En algunos países como Estados Unidos, 15-20% es lo estándar.'
    },
    {
      question: '¿Cómo se calcula la propina?',
      answer: 'La propina se calcula multiplicando el monto de la cuenta por el porcentaje de propina y dividiendo entre 100. Luego se suma al monto original para obtener el total.'
    },
    {
      question: '¿Debo incluir impuestos en el cálculo?',
      answer: 'Generalmente se calcula la propina sobre el monto antes de impuestos, pero esto puede variar según el país y las costumbres locales.'
    },
    {
      question: '¿Qué hacer si el servicio fue malo?',
      answer: 'Si el servicio fue realmente malo, puedes dar una propina menor (5-10%) o hablar con el gerente. La propina es una recompensa por el servicio.'
    }
  ];

  const relatedLinks = getRelatedCalculators('otras', 'calculadora-propinas').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setBillAmount(values.billAmount as string);
    setTipPercentage(values.tipPercentage as string);
    setPeopleCount(values.peopleCount as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/otras/calculadora-propinas/');

  const quickTipOptions = [
    { label: '10% (Servicio básico)', value: '10' },
    { label: '15% (Servicio estándar)', value: '15' },
    { label: '18% (Buen servicio)', value: '18' },
    { label: '20% (Excelente servicio)', value: '20' },
    { label: '25% (Servicio excepcional)', value: '25' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Propinas',
            description: 'Calcula propinas fácilmente y divide la cuenta entre varias personas',
            url: '/otras/calculadora-propinas/',
            category: 'otras'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Propinas"
            description="Calcula propinas fácilmente y divide la cuenta entre varias personas. Incluye porcentajes estándar y cálculo por persona."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="billAmount">Monto de la Cuenta ($)</Label>
                <Input
                  id="billAmount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="Ej: 50.00"
                />
              </div>
              
              <div>
                <Label htmlFor="tipPercentage">Porcentaje de Propina (%)</Label>
                <Select value={tipPercentage} onValueChange={setTipPercentage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona o ingresa manualmente" />
                  </SelectTrigger>
                  <SelectContent>
                    {quickTipOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="tipPercentage"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={tipPercentage}
                  onChange={(e) => setTipPercentage(e.target.value)}
                  placeholder="Ej: 18"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="peopleCount">Número de Personas</Label>
                <Input
                  id="peopleCount"
                  type="number"
                  min="1"
                  max="50"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(e.target.value)}
                  placeholder="Ej: 2"
                />
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Propina
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
                      <Receipt className="h-5 w-5" />
                      Resultado de la Propina
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Cuenta Original</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">${resultado.billAmount}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Percent className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Propina ({resultado.tipPercentage}%)</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">${resultado.tipAmount}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Personas</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{resultado.peopleCount}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Total a Pagar</p>
                          <p className="text-3xl font-bold text-green-600">${resultado.totalAmount}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Por Persona</p>
                          <p className="text-3xl font-bold text-blue-600">${resultado.perPersonAmount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">💰 Desglose</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• <strong>Cuenta original:</strong> ${resultado.breakdown.bill}</p>
                        <p>• <strong>Propina ({resultado.tipPercentage}%):</strong> ${resultado.breakdown.tip}</p>
                        <p>• <strong>Total:</strong> ${resultado.breakdown.total}</p>
                        {resultado.peopleCount > 1 && (
                          <p>• <strong>Por persona:</strong> ${resultado.perPersonAmount}</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Consejos sobre Propinas</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Servicio básico:</strong> 10-15%</p>
                        <p>• <strong>Servicio estándar:</strong> 15-18%</p>
                        <p>• <strong>Buen servicio:</strong> 18-20%</p>
                        <p>• <strong>Excelente servicio:</strong> 20%+</p>
                        <p>• <strong>Considera:</strong> La calidad del servicio, el país donde estás, y las costumbres locales</p>
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
