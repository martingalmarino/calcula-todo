"use client";

import { useState } from 'react';
import { Calculator, Dog, Cat } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { convertirEdadMascota } from '@/lib/math/curiosas';
import { jsonLdCalculator } from '@/lib/seo';

export default function IdadeAnimalClientPT() {
  const [anosHumanos, setAnosHumanos] = useState<string>('');
  const [tipoAnimal, setTipoAnimal] = useState<string>('');
  const [resultado, setResultado] = useState<{
    idadeAnimal: number;
    descricao: string;
    etapa: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const anosHumanosNum = parseFloat(anosHumanos);

    if (isNaN(anosHumanosNum)) {
      setError('Por favor, insira um valor numérico válido para a idade.');
      return;
    }

    if (anosHumanosNum <= 0) {
      setError('A idade deve ser maior que zero.');
      return;
    }

    if (anosHumanosNum > 30) {
      setError('A idade deve ser menor ou igual a 30 anos para este cálculo.');
      return;
    }

    if (!tipoAnimal) {
      setError('Por favor, selecione o tipo de animal.');
      return;
    }

    try {
      const resultado = convertirEdadMascota(anosHumanosNum, tipoAnimal as 'perro' | 'gato');
      setResultado({
        idadeAnimal: resultado.edadMascota,
        descricao: resultado.descripcion,
        etapa: resultado.etapa
      });
    } catch {
      setError('Erro ao calcular a idade do animal. Verifique os valores inseridos.');
    }
  };

  const examples = [
    {
      label: 'Cachorro de 3 anos',
      values: { anosHumanos: '3', tipoAnimal: 'perro' }
    },
    {
      label: 'Gato de 5 anos',
      values: { anosHumanos: '5', tipoAnimal: 'gato' }
    },
    {
      label: 'Cachorro de 7 anos',
      values: { anosHumanos: '7', tipoAnimal: 'perro' }
    }
  ];

  const faqItems = [
    {
      question: 'Como funciona a conversão de idade?',
      answer: 'A conversão é baseada em fórmulas científicas que consideram o desenvolvimento e envelhecimento dos animais. Cachorros e gatos envelhecem mais rapidamente nos primeiros anos.'
    },
    {
      question: 'Por que cachorros e gatos envelhecem mais rápido?',
      answer: 'Animais de estimação têm metabolismos mais rápidos e ciclos de vida mais curtos. Os primeiros anos são equivalentes a muitos anos humanos, mas depois a diferença diminui.'
    },
    {
      question: 'A conversão é precisa para todos os animais?',
      answer: 'Esta calculadora usa fórmulas gerais. Raças grandes de cachorros podem envelhecer mais rápido que raças pequenas. Consulte um veterinário para informações específicas.'
    },
    {
      question: 'O que significam as etapas (cachorro, adulto, senior)?',
      answer: 'Cachorro/Gatito: até 15 anos de animal. Adulto jovem: 15-35 anos. Adulto: 35-60 anos. Senior: mais de 60 anos. Cada etapa tem necessidades diferentes de cuidado.'
    }
  ];

  const relatedLinks = [
    { label: 'Beijos e Calorias', href: '/pt/curiosas/beijos-calorias/', description: 'Calcule calorias queimadas' },
    { label: 'Café e Economia', href: '/pt/curiosas/cafe-economia/', description: 'Descubra economia com café' },
    { label: 'Expectativa de Animais', href: '/pt/curiosas/expectativa-animais/', description: 'Compare com outros animais' }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setAnosHumanos(values.anosHumanos as string);
    setTipoAnimal(values.tipoAnimal as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = [
    { name: 'Início', href: '/pt/' },
    { name: 'Curiosas', href: '/pt/curiosas/' },
    { name: 'Idade do Animal', href: '/pt/curiosas/idade-animal/' }
  ];

  const getEtapaColor = (etapa: string) => {
    switch (etapa) {
      case 'cachorro':
      case 'gatito':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'adulto joven':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'adulto':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'senior':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };


  const getAnimalName = (tipo: string) => {
    return tipo === 'perro' ? 'Cachorro' : 'Gato';
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Idade do Animal',
            description: 'Converta a idade humana para idade de animais de estimação',
            url: '/pt/curiosas/idade-animal/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Idade do Animal"
            description="Converta a idade humana para idade de animais de estimação. Descubra quantos anos seu pet tem em anos humanos."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="anosHumanos">Idade do Animal (anos)</Label>
                <Input
                  id="anosHumanos"
                  type="number"
                  value={anosHumanos}
                  onChange={(e) => setAnosHumanos(e.target.value)}
                  placeholder="Ex: 3"
                />
              </div>
              
              <div>
                <Label htmlFor="tipoAnimal">Tipo de Animal</Label>
                <Select value={tipoAnimal} onValueChange={setTipoAnimal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de animal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perro">🐕 Cachorro</SelectItem>
                    <SelectItem value="gato">🐱 Gato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Idade
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center gap-2">
                      {tipoAnimal === 'perro' ? <Dog className="h-5 w-5" /> : <Cat className="h-5 w-5" />}
                      Resultado da Idade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="bg-white p-8 rounded-lg border-2 border-blue-200 mb-4">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          {tipoAnimal === 'perro' ? <Dog className="h-8 w-8 text-blue-600" /> : <Cat className="h-8 w-8 text-blue-600" />}
                          <span className="text-xl font-medium text-gray-700">{getAnimalName(tipoAnimal)} de {anosHumanos} anos</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Idade em anos humanos</p>
                        <p className="text-6xl font-bold text-blue-600">{resultado.idadeAnimal}</p>
                        <p className="text-sm text-gray-500 mt-2">anos</p>
                      </div>
                      
                      <div className={`p-4 rounded-lg border-2 ${getEtapaColor(resultado.etapa)}`}>
                        <p className="text-lg font-semibold">Etapa: {resultado.etapa}</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-center text-gray-700 font-medium">{resultado.descricao}</p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">🐾 Dados Curiosos</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• <strong>Desenvolvimento rápido:</strong> Os primeiros anos de um animal equivalem a muitos anos humanos</p>
                        <p>• <strong>Fórmula científica:</strong> Baseada em estudos de desenvolvimento e envelhecimento animal</p>
                        <p>• <strong>Cuidados por etapa:</strong> Cada fase da vida requer cuidados específicos</p>
                        <p>• <strong>Raças diferentes:</strong> Raças grandes podem envelhecer mais rápido que raças pequenas</p>
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
