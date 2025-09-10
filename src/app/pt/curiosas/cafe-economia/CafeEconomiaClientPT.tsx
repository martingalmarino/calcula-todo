"use client";

import { useState } from 'react';
import { Calculator, Coffee, DollarSign, TrendingUp } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularAhorroCafe } from '@/lib/math/curiosas';
import { jsonLdCalculator } from '@/lib/seo';

export default function CafeEconomiaClientPT() {
  const [precoCafe, setPrecoCafe] = useState<string>('');
  const [anos, setAnos] = useState<string>('');
  const [taxaJuros, setTaxaJuros] = useState<string>('5');
  const [resultado, setResultado] = useState<{
    precoCafe: number;
    anos: number;
    taxaJuros: number;
    ahorroDiario: number;
    ahorroAnual: number;
    ahorroTotal: number;
    ahorroSinInteres: number;
    gananciaInteres: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const precoCafeNum = parseFloat(precoCafe);
    const anosNum = parseFloat(anos);
    const taxaJurosNum = parseFloat(taxaJuros);

    if (isNaN(precoCafeNum) || isNaN(anosNum) || isNaN(taxaJurosNum)) {
      setError('Por favor, insira valores numéricos válidos.');
      return;
    }

    if (precoCafeNum <= 0) {
      setError('O preço do café deve ser maior que zero.');
      return;
    }

    if (anosNum <= 0 || anosNum > 100) {
      setError('Os anos devem estar entre 1 e 100.');
      return;
    }

    if (taxaJurosNum < 0 || taxaJurosNum > 50) {
      setError('A taxa de juros deve estar entre 0 e 50%.');
      return;
    }

    try {
      const resultado = calcularAhorroCafe(precoCafeNum, anosNum, taxaJurosNum);
      setResultado({
        precoCafe: resultado.precioCafe,
        anos: resultado.años,
        taxaJuros: resultado.tasaInteres,
        ahorroDiario: resultado.ahorroDiario,
        ahorroAnual: resultado.ahorroAnual,
        ahorroTotal: resultado.ahorroTotal,
        ahorroSinInteres: resultado.ahorroSinInteres,
        gananciaInteres: resultado.gananciaInteres
      });
    } catch {
      setError('Erro ao calcular a economia. Verifique os valores inseridos.');
    }
  };

  const examples = [
    {
      label: 'Café de R$ 8 por dia por 10 anos com 5% de juros',
      values: { precoCafe: '8', anos: '10', taxaJuros: '5' }
    },
    {
      label: 'Café de R$ 12 por dia por 5 anos com 3% de juros',
      values: { precoCafe: '12', anos: '5', taxaJuros: '3' }
    },
    {
      label: 'Café de R$ 6 por dia por 20 anos com 7% de juros',
      values: { precoCafe: '6', anos: '20', taxaJuros: '7' }
    }
  ];

  const faqItems = [
    {
      question: 'Como funciona o cálculo de juros compostos?',
      answer: 'Os juros compostos fazem com que o dinheiro economizado gere mais dinheiro ao longo do tempo. É como uma bola de neve financeira que cresce exponencialmente.'
    },
    {
      question: 'Qual é uma taxa de juros realista?',
      answer: 'Para poupança conservadora, 3-5% ao ano é realista. Para investimentos mais arriscados, pode ser 7-10% ao ano, mas com mais volatilidade.'
    },
    {
      question: 'Vale a pena parar de tomar café para economizar?',
      answer: 'Depende dos seus objetivos financeiros e do prazer que o café te dá. Esta calculadora mostra o potencial de economia, mas a decisão é pessoal.'
    },
    {
      question: 'Posso aplicar este conceito a outros gastos?',
      answer: 'Sim! Qualquer gasto diário pode ser calculado desta forma: lanches, cigarros, transporte, etc. O princípio dos juros compostos se aplica a qualquer economia.'
    }
  ];

  const relatedLinks = [
    { label: 'Beijos e Calorias', href: '/pt/curiosas/beijos-calorias/', description: 'Calcule calorias queimadas' },
    { label: 'Calculadora do Amor', href: '/pt/curiosas/calculadora-amor/', description: 'Teste a compatibilidade' },
    { label: 'Cerveja e Festa', href: '/pt/curiosas/cerveja-festa/', description: 'Calcule cerveja para festa' }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setPrecoCafe(values.precoCafe as string);
    setAnos(values.anos as string);
    setTaxaJuros(values.taxaJuros as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = [
    { name: 'Início', href: '/pt/' },
    { name: 'Curiosas', href: '/pt/curiosas/' },
    { name: 'Café e Economia', href: '/pt/curiosas/cafe-economia/' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Café e Economia',
            description: 'Descubra quanto você pode economizar se parar de tomar café diário com juros compostos',
            url: '/pt/curiosas/cafe-economia/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Café e Economia"
            description="Descubra quanto você pode economizar se parar de tomar café diário. Calcule o ahorro a longo prazo com juros compostos."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="precoCafe">Preço do Café por Dia (R$)</Label>
                <Input
                  id="precoCafe"
                  type="number"
                  step="0.01"
                  value={precoCafe}
                  onChange={(e) => setPrecoCafe(e.target.value)}
                  placeholder="Ex: 8.50"
                />
              </div>
              
              <div>
                <Label htmlFor="anos">Anos de Economia</Label>
                <Input
                  id="anos"
                  type="number"
                  value={anos}
                  onChange={(e) => setAnos(e.target.value)}
                  placeholder="Ex: 10"
                />
              </div>
              
              <div>
                <Label htmlFor="taxaJuros">Taxa de Juros Anual (%)</Label>
                <Input
                  id="taxaJuros"
                  type="number"
                  step="0.1"
                  value={taxaJuros}
                  onChange={(e) => setTaxaJuros(e.target.value)}
                  placeholder="Ex: 5"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Taxa de juros anual para investimento da economia
                </p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Economia
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center gap-2">
                      <Coffee className="h-5 w-5" />
                      Resultados da Economia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Coffee className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Economia Diária</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">R$ {resultado.ahorroDiario.toFixed(2)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Economia Anual</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">R$ {resultado.ahorroAnual.toFixed(2)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Taxa de Juros</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.taxaJuros}%</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Economia Total com Juros</p>
                          <p className="text-4xl font-bold text-green-600">R$ {resultado.ahorroTotal.toFixed(2)}</p>
                          <p className="text-sm text-gray-500 mt-2">em {resultado.anos} anos</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Economia sem Juros</p>
                          <p className="text-2xl font-bold text-blue-600">R$ {resultado.ahorroSinInteres.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Ganho com Juros</p>
                          <p className="text-2xl font-bold text-yellow-600">R$ {resultado.gananciaInteres.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">☕ Dados Curiosos</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• <strong>Poder dos juros compostos:</strong> O dinheiro economizado gera mais dinheiro ao longo do tempo</p>
                        <p>• <strong>Economia anual:</strong> R$ {resultado.ahorroAnual.toFixed(2)} por ano sem tomar café</p>
                        <p>• <strong>Ganho extra:</strong> R$ {resultado.gananciaInteres.toFixed(2)} a mais graças aos juros compostos</p>
                        <p>• <strong>Investimento inteligente:</strong> Esta economia pode ser investida em fundos, ações ou outros ativos</p>
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
