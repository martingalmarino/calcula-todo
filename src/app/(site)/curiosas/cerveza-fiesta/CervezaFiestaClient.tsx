"use client";

import { useState } from 'react';
import { Calculator, Beer, Users, Clock } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularCervezaFiesta } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function CervezaFiestaClient() {
  const [invitados, setInvitados] = useState<string>('');
  const [nivelConsumo, setNivelConsumo] = useState<string>('');
  const [duracionHoras, setDuracionHoras] = useState<string>('');
  const [precioLitro, setPrecioLitro] = useState<string>('');
  const [resultado, setResultado] = useState<{
    litrosNecesarios: number;
    costoTotal: number;
    tiempoTerminacion: number;
    mensaje: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const invitadosNum = parseFloat(invitados);
    const duracionNum = parseFloat(duracionHoras);
    const precioNum = parseFloat(precioLitro);

    if (isNaN(invitadosNum) || isNaN(duracionNum) || isNaN(precioNum)) {
      setError('Por favor, ingresa valores numéricos válidos.');
      return;
    }

    if (invitadosNum <= 0 || invitadosNum > 200) {
      setError('El número de invitados debe estar entre 1 y 200.');
      return;
    }

    if (duracionNum <= 0 || duracionNum > 24) {
      setError('La duración debe estar entre 1 y 24 horas.');
      return;
    }

    if (precioNum <= 0 || precioNum > 1000) {
      setError('El precio por litro debe estar entre $1 y $1000.');
      return;
    }

    if (!nivelConsumo) {
      setError('Por favor, selecciona el nivel de consumo.');
      return;
    }

    try {
      const resultado = calcularCervezaFiesta(invitadosNum, parseInt(nivelConsumo), duracionNum, precioNum);
      setResultado(resultado);
    } catch {
      setError('Error al calcular la cerveza necesaria. Verifica los valores ingresados.');
    }
  };

  const examples = [
    {
      label: '20 invitados, consumo moderado, 4 horas, $5/litro',
      values: { invitados: '20', nivelConsumo: '2', duracionHoras: '4', precioLitro: '5' }
    },
    {
      label: '50 invitados, consumo alto, 6 horas, $4/litro',
      values: { invitados: '50', nivelConsumo: '3', duracionHoras: '6', precioLitro: '4' }
    },
    {
      label: '10 invitados, consumo bajo, 3 horas, $6/litro',
      values: { invitados: '10', nivelConsumo: '1', duracionHoras: '3', precioLitro: '6' }
    }
  ];

  const faqItems = [
    {
      question: '¿Cómo se calcula el consumo por persona?',
      answer: 'Bajo: 300ml/hora, Moderado: 500ml/hora, Alto: 800ml/hora. Estos son promedios que pueden variar según el tipo de evento y los invitados.'
    },
    {
      question: '¿Debo comprar cerveza extra?',
      answer: 'Sí, se recomienda comprar un 20-30% extra para asegurar que no se acabe. También considera que algunos invitados pueden no beber alcohol.'
    },
    {
      question: '¿Qué tipos de cerveza debo comprar?',
      answer: 'Mezcla diferentes tipos: 60% cerveza clara, 30% cerveza oscura, 10% cerveza sin alcohol. Considera las preferencias de tus invitados.'
    },
    {
      question: '¿Cómo conservar la cerveza?',
      answer: 'Mantén la cerveza fría (2-4°C) antes y durante la fiesta. Usa hielo y neveras portátiles si es necesario.'
    }
  ];

  const relatedLinks = getRelatedCalculators('curiosas', 'cerveza-fiesta').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setInvitados(values.invitados as string);
    setNivelConsumo(values.nivelConsumo as string);
    setDuracionHoras(values.duracionHoras as string);
    setPrecioLitro(values.precioLitro as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/curiosas/cerveza-fiesta/');

  const getNivelDescripcion = (nivel: string) => {
    switch (nivel) {
      case '1': return 'Bajo (300ml/hora)';
      case '2': return 'Moderado (500ml/hora)';
      case '3': return 'Alto (800ml/hora)';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Cerveza por Fiesta',
            description: 'Calcula cuántos litros de cerveza necesitas para tu fiesta según invitados, nivel de consumo y duración',
            url: '/curiosas/cerveza-fiesta/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Cerveza por Fiesta"
            description="Calcula cuántos litros de cerveza necesitas para tu fiesta según el número de invitados, nivel de consumo, duración y precio por litro."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="invitados">Número de Invitados</Label>
                <Input
                  id="invitados"
                  type="number"
                  min="1"
                  max="200"
                  value={invitados}
                  onChange={(e) => setInvitados(e.target.value)}
                  placeholder="Ej: 20"
                />
              </div>
              
              <div>
                <Label htmlFor="nivelConsumo">Nivel de Consumo</Label>
                <Select value={nivelConsumo} onValueChange={setNivelConsumo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">🍺 Bajo (300ml/hora)</SelectItem>
                    <SelectItem value="2">🍻 Moderado (500ml/hora)</SelectItem>
                    <SelectItem value="3">🍺🍺 Alto (800ml/hora)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="duracionHoras">Duración de la Fiesta (horas)</Label>
                <Input
                  id="duracionHoras"
                  type="number"
                  min="1"
                  max="24"
                  value={duracionHoras}
                  onChange={(e) => setDuracionHoras(e.target.value)}
                  placeholder="Ej: 4"
                />
              </div>
              
              <div>
                <Label htmlFor="precioLitro">Precio por Litro ($)</Label>
                <Input
                  id="precioLitro"
                  type="number"
                  min="1"
                  max="1000"
                  step="0.1"
                  value={precioLitro}
                  onChange={(e) => setPrecioLitro(e.target.value)}
                  placeholder="Ej: 5.00"
                />
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Cerveza
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-amber-50 border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-700 flex items-center gap-2">
                      <Beer className="h-5 w-5" />
                      Resultados de la Fiesta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Invitados</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{invitados}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Duración</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{duracionHoras}h</p>
                        <p className="text-xs text-gray-500">{getNivelDescripcion(nivelConsumo)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-amber-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Litros Necesarios</p>
                          <p className="text-3xl font-bold text-amber-600">{resultado.litrosNecesarios}L</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Costo Total</p>
                          <p className="text-3xl font-bold text-green-600">${resultado.costoTotal}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">🍻 Resumen</h4>
                      <p className="text-sm text-green-700">
                        {resultado.mensaje}
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">💡 Consejos para tu Fiesta</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Compra extra:</strong> Añade un 20-30% más para asegurar que no se acabe</p>
                        <p>• <strong>Variedad:</strong> Mezcla cerveza clara (60%), oscura (30%) y sin alcohol (10%)</p>
                        <p>• <strong>Temperatura:</strong> Mantén la cerveza fría (2-4°C) antes y durante la fiesta</p>
                        <p>• <strong>Alternativas:</strong> Ten agua, refrescos y opciones sin alcohol disponibles</p>
                        <p>• <strong>Responsabilidad:</strong> Asegúrate de que todos tengan transporte seguro</p>
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
