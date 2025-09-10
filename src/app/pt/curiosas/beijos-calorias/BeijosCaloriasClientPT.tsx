"use client";

import { useState } from 'react';
import { Calculator, Heart, Zap } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularCaloriasAfectivas } from '@/lib/math/curiosas';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function BeijosCaloriasClientPT() {
  const [actividade, setActividade] = useState<string>('');
  const [minutos, setMinutos] = useState<string>('');
  const [intensidade, setIntensidade] = useState<string>('');
  const [resultado, setResultado] = useState<{
    atividade: string;
    minutos: number;
    intensidade: number;
    caloriasQuemadas: number;
    equivalencias: {
      chocolate: number;
      manzana: number;
      minutosCaminando: number;
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const minutosNum = parseFloat(minutos);
    const intensidadeNum = parseFloat(intensidade);

    if (isNaN(minutosNum) || isNaN(intensidadeNum)) {
      setError('Por favor, insira valores numéricos válidos para minutos e intensidade.');
      return;
    }

    if (minutosNum <= 0 || minutosNum > 1440) {
      setError('Os minutos devem estar entre 1 e 1440 (24 horas).');
      return;
    }

    if (intensidadeNum < 1 || intensidadeNum > 5) {
      setError('A intensidade deve estar entre 1 e 5.');
      return;
    }

    if (!actividade) {
      setError('Por favor, selecione uma atividade.');
      return;
    }

    try {
      const resultado = calcularCaloriasAfectivas(actividade, minutosNum, intensidadeNum);
      setResultado(resultado);
    } catch {
      setError('Erro ao calcular as calorias. Verifique os valores inseridos.');
    }
  };

  const examples = [
    {
      label: '10 minutos de beijos intensos (nível 4)',
      values: { atividade: 'besos', minutos: '10', intensidade: '4' }
    },
    {
      label: '15 minutos de risadas moderadas (nível 3)',
      values: { atividade: 'risas', minutos: '15', intensidade: '3' }
    },
    {
      label: '20 minutos de abraços suaves (nível 2)',
      values: { atividade: 'abrazos', minutos: '20', intensidade: '2' }
    }
  ];

  const faqItems = [
    {
      question: 'Realmente se queimam calorias com beijos e abraços?',
      answer: 'Sim, embora seja uma quantidade pequena. Beijos intensos podem queimar 2-3 calorias por minuto, abraços 1-2 calorias por minuto, e risadas 1-2 calorias por minuto. É exercício leve mas real.'
    },
    {
      question: 'Que fatores influenciam as calorias queimadas?',
      answer: 'A intensidade, duração, peso corporal, e nível de atividade física geral. Pessoas com mais massa muscular tendem a queimar mais calorias em repouso.'
    },
    {
      question: 'Essas atividades são um bom exercício?',
      answer: 'São atividades complementares que trazem benefícios emocionais e sociais, além de queimar algumas calorias. Não substituem o exercício cardiovascular regular.'
    },
    {
      question: 'Que outros benefícios têm essas atividades?',
      answer: 'Reduzem o estresse, liberam endorfinas, melhoram o humor, fortalecem as relações, e podem ajudar com a pressão arterial e o sistema imunológico.'
    }
  ];

  const relatedLinks = [
    { label: 'Café e Economia', href: '/pt/curiosas/cafe-economia/', description: 'Descubra quanto você pode economizar' },
    { label: 'Calculadora do Amor', href: '/pt/curiosas/calculadora-amor/', description: 'Teste a compatibilidade entre nomes' },
    { label: 'Cerveja e Festa', href: '/pt/curiosas/cerveja-festa/', description: 'Calcule cerveja para sua festa' }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setActividade(values.atividade as string);
    setMinutos(values.minutos as string);
    setIntensidade(values.intensidade as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = [
    { name: 'Início', href: '/pt/' },
    { name: 'Curiosas', href: '/pt/curiosas/' },
    { name: 'Beijos e Calorias', href: '/pt/curiosas/beijos-calorias/' }
  ];

  const getActividadeDescription = (atividade: string) => {
    const descricoes = {
      'besos': 'Beijos',
      'abrazos': 'Abraços',
      'risas': 'Risadas'
    };
    return descricoes[atividade as keyof typeof descricoes] || atividade;
  };

  const getIntensidadeDescription = (nivel: number) => {
    const descricoes = {
      1: 'Muito suave',
      2: 'Suave',
      3: 'Moderada',
      4: 'Intensa',
      5: 'Muito intensa'
    };
    return descricoes[nivel as keyof typeof descricoes] || '';
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Beijos e Calorias',
            description: 'Calcule as calorias queimadas por beijos, abraços e risadas com equivalências divertidas',
            url: '/pt/curiosas/beijos-calorias/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Beijos e Calorias"
            description="Calcule as calorias queimadas por beijos, abraços e risadas. Descubra equivalências divertidas e surpreenda-se com os resultados."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="atividade">Tipo de Atividade</Label>
                <Select value={actividade} onValueChange={setActividade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma atividade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="besos">💋 Beijos</SelectItem>
                    <SelectItem value="abrazos">🤗 Abraços</SelectItem>
                    <SelectItem value="risas">😂 Risadas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="minutos">Duração em Minutos</Label>
                <Input
                  id="minutos"
                  type="number"
                  value={minutos}
                  onChange={(e) => setMinutos(e.target.value)}
                  placeholder="Ex: 10"
                />
              </div>
              
              <div>
                <Label htmlFor="intensidade">Intensidade (1-5)</Label>
                <Input
                  id="intensidade"
                  type="number"
                  min="1"
                  max="5"
                  value={intensidade}
                  onChange={(e) => setIntensidade(e.target.value)}
                  placeholder="Ex: 3"
                />
                <p className="text-sm text-gray-500 mt-1">
                  1=Muito suave, 2=Suave, 3=Moderada, 4=Intensa, 5=Muito intensa
                </p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Calorias
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-pink-50 border-pink-200">
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Resultados de Calorias Queimadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Atividade</span>
                        </div>
                        <p className="text-2xl font-bold text-pink-600">{getActividadeDescription(resultado.atividade)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Duração</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.minutos} min</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Intensidade</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{resultado.intensidade}</p>
                        <p className="text-xs text-gray-500">{getIntensidadeDescription(resultado.intensidade)}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="bg-white p-6 rounded-lg border-2 border-pink-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Calorias Queimadas</p>
                          <p className="text-4xl font-bold text-pink-600">{resultado.caloriasQuemadas.toFixed(1)}</p>
                          <p className="text-sm text-gray-500 mt-2">calorias</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Equivale a</p>
                          <p className="text-2xl font-bold text-yellow-600">{resultado.equivalencias.chocolate}</p>
                          <p className="text-sm text-gray-500">chocolate{resultado.equivalencias.chocolate !== 1 ? 's' : ''} pequeno{resultado.equivalencias.chocolate !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Ou a</p>
                          <p className="text-2xl font-bold text-green-600">{resultado.equivalencias.manzana}</p>
                          <p className="text-sm text-gray-500">maçã{resultado.equivalencias.manzana !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Ou a</p>
                          <p className="text-2xl font-bold text-blue-600">{resultado.equivalencias.minutosCaminando}</p>
                          <p className="text-sm text-gray-500">min caminhando</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">💕 Dados Curiosos</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• <strong>Benefícios extras:</strong> Além de queimar calorias, essas atividades liberam endorfinas e reduzem o estresse</p>
                        <p>• <strong>Exercício emocional:</strong> Beijos intensos podem aumentar a frequência cardíaca como um exercício leve</p>
                        <p>• <strong>Risadas saudáveis:</strong> 10 minutos de risada podem queimar até 20 calorias e melhorar o sistema imunológico</p>
                        <p>• <strong>Abraços terapêuticos:</strong> Os abraços liberam oxitocina, o "hormônio do amor"</p>
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
