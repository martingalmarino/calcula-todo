"use client";

import { useState } from 'react';
import { Calculator, Turtle, Bird, Bug } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { convertirEdadAnimales } from '@/lib/math/curiosas';
import { jsonLdCalculator } from '@/lib/seo';

export default function ExpectativaAnimaisClientPT() {
  const [idadeHumana, setIdadeHumana] = useState<string>('');
  const [animal, setAnimal] = useState<string>('');
  const [resultado, setResultado] = useState<{
    vidasAnimal: number;
    descricao: string;
    expectativaAnimal: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const idadeHumanaNum = parseFloat(idadeHumana);

    if (isNaN(idadeHumanaNum)) {
      setError('Por favor, insira um valor numérico válido para a idade.');
      return;
    }

    if (idadeHumanaNum <= 0) {
      setError('A idade deve ser maior que zero.');
      return;
    }

    if (idadeHumanaNum > 120) {
      setError('A idade deve ser menor ou igual a 120 anos.');
      return;
    }

    if (!animal) {
      setError('Por favor, selecione um animal.');
      return;
    }

    try {
      const resultado = convertirEdadAnimales(idadeHumanaNum, animal as 'tortuga' | 'colibri' | 'mosca');
      setResultado(resultado);
    } catch {
      setError('Erro ao calcular a expectativa. Verifique os valores inseridos.');
    }
  };

  const examples = [
    {
      label: '25 anos comparado com tartaruga',
      values: { idadeHumana: '25', animal: 'tortuga' }
    },
    {
      label: '30 anos comparado com colibri',
      values: { idadeHumana: '30', animal: 'colibri' }
    },
    {
      label: '40 anos comparado com mosca',
      values: { idadeHumana: '40', animal: 'mosca' }
    }
  ];

  const faqItems = [
    {
      question: 'Como funciona a comparação de expectativa de vida?',
      answer: 'A calculadora divide sua idade pela expectativa de vida média do animal selecionado para mostrar quantas "vidas" desse animal você já viveu.'
    },
    {
      question: 'Quais são as expectativas de vida dos animais?',
      answer: 'Tartaruga: 150 anos. Colibri: 5 anos. Mosca: 7 dias (0.02 anos). Estes são valores médios baseados em estudos científicos.'
    },
    {
      question: 'Por que a mosca vive tão pouco?',
      answer: 'Moscas têm metabolismos muito rápidos e ciclos de vida curtos. Vivem apenas alguns dias, mas se reproduzem rapidamente para manter a espécie.'
    },
    {
      question: 'A tartaruga realmente vive 150 anos?',
      answer: 'Sim! Algumas espécies de tartaruga podem viver mais de 150 anos. São conhecidas por sua longevidade excepcional no reino animal.'
    }
  ];

  const relatedLinks = [
    { label: 'Beijos e Calorias', href: '/pt/curiosas/beijos-calorias/', description: 'Calcule calorias queimadas' },
    { label: 'Café e Economia', href: '/pt/curiosas/cafe-economia/', description: 'Descubra economia com café' },
    { label: 'Idade do Animal', href: '/pt/curiosas/idade-animal/', description: 'Converta idade de pets' }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setIdadeHumana(values.idadeHumana as string);
    setAnimal(values.animal as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = [
    { name: 'Início', href: '/pt/' },
    { name: 'Curiosas', href: '/pt/curiosas/' },
    { name: 'Expectativa de Animais', href: '/pt/curiosas/expectativa-animais/' }
  ];

  const getAnimalIcon = (animal: string) => {
    switch (animal) {
      case 'tortuga':
        return Turtle;
      case 'colibri':
        return Bird;
      case 'mosca':
        return Bug;
      default:
        return Turtle;
    }
  };

  const getAnimalName = (animal: string) => {
    switch (animal) {
      case 'tortuga':
        return 'Tartaruga';
      case 'colibri':
        return 'Colibri';
      case 'mosca':
        return 'Mosca';
      default:
        return 'Animal';
    }
  };

  const getAnimalEmoji = (animal: string) => {
    switch (animal) {
      case 'tortuga':
        return '🐢';
      case 'colibri':
        return '🐦';
      case 'mosca':
        return '🪰';
      default:
        return '🐾';
    }
  };

  const getAnimalColor = (animal: string) => {
    switch (animal) {
      case 'tortuga':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'colibri':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'mosca':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-purple-600 bg-purple-50 border-purple-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Expectativa de Animais',
            description: 'Compare sua idade com a expectativa de vida de diferentes animais',
            url: '/pt/curiosas/expectativa-animais/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Expectativa de Animais"
            description="Compare sua idade com a expectativa de vida de diferentes animais. Descubra quantas vidas de outros animais você já viveu."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="idadeHumana">Sua Idade (anos)</Label>
                <Input
                  id="idadeHumana"
                  type="number"
                  value={idadeHumana}
                  onChange={(e) => setIdadeHumana(e.target.value)}
                  placeholder="Ex: 25"
                />
              </div>
              
              <div>
                <Label htmlFor="animal">Animal para Comparar</Label>
                <Select value={animal} onValueChange={setAnimal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um animal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tortuga">🐢 Tartaruga (150 anos)</SelectItem>
                    <SelectItem value="colibri">🐦 Colibri (5 anos)</SelectItem>
                    <SelectItem value="mosca">🪰 Mosca (7 dias)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Comparação
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
                      {getAnimalIcon(animal) && <getAnimalIcon(animal) className="h-5 w-5" />}
                      Resultado da Comparação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="bg-white p-8 rounded-lg border-2 border-green-200 mb-4">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className="text-4xl">{getAnimalEmoji(animal)}</span>
                          <span className="text-xl font-medium text-gray-700">{getAnimalName(animal)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Sua idade de {idadeHumana} anos equivale a</p>
                        <p className="text-6xl font-bold text-green-600">{resultado.vidasAnimal}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {animal === 'mosca' ? 'dias de mosca' : `vidas de ${getAnimalName(animal).toLowerCase()}`}
                        </p>
                      </div>
                      
                      <div className={`p-4 rounded-lg border-2 ${getAnimalColor(animal)}`}>
                        <p className="text-sm text-gray-600 mb-1">Expectativa de vida do {getAnimalName(animal).toLowerCase()}</p>
                        <p className="text-lg font-semibold">
                          {animal === 'mosca' ? '7 dias' : `${resultado.expectativaAnimal} anos`}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-center text-gray-700 font-medium">{resultado.descricao}</p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">🐾 Dados Curiosos</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• <strong>Diversidade da vida:</strong> Cada animal tem seu próprio ritmo de vida e desenvolvimento</p>
                        <p>• <strong>Expectativas variadas:</strong> De 7 dias (mosca) a 150 anos (tartaruga)</p>
                        <p>• <strong>Metabolismo:</strong> Animais com metabolismos mais rápidos tendem a viver menos</p>
                        <p>• <strong>Evolução:</strong> A expectativa de vida está relacionada à estratégia de sobrevivência da espécie</p>
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
