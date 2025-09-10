"use client";

import { useState } from 'react';
import { Calculator, Beer, Users, Clock, DollarSign } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calcularCervezaFiesta } from '@/lib/math/curiosas';
import { jsonLdCalculator } from '@/lib/seo';

export default function CervejaFestaClientPT() {
  const [convidados, setConvidados] = useState<string>('');
  const [nivelConsumo, setNivelConsumo] = useState<string>('');
  const [duracaoHoras, setDuracaoHoras] = useState<string>('');
  const [precoLitro, setPrecoLitro] = useState<string>('');
  const [resultado, setResultado] = useState<{
    litrosNecessarios: number;
    custoTotal: number;
    tempoTerminacao: number;
    mensagem: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const convidadosNum = parseFloat(convidados);
    const nivelConsumoNum = parseFloat(nivelConsumo);
    const duracaoHorasNum = parseFloat(duracaoHoras);
    const precoLitroNum = parseFloat(precoLitro);

    if (isNaN(convidadosNum) || isNaN(nivelConsumoNum) || isNaN(duracaoHorasNum) || isNaN(precoLitroNum)) {
      setError('Por favor, insira valores numéricos válidos.');
      return;
    }

    if (convidadosNum <= 0) {
      setError('O número de convidados deve ser maior que zero.');
      return;
    }

    if (nivelConsumoNum < 1 || nivelConsumoNum > 3) {
      setError('O nível de consumo deve estar entre 1 e 3.');
      return;
    }

    if (duracaoHorasNum <= 0) {
      setError('A duração deve ser maior que zero.');
      return;
    }

    if (precoLitroNum < 0) {
      setError('O preço por litro deve ser maior ou igual a zero.');
      return;
    }

    try {
      const resultado = calcularCervezaFiesta(convidadosNum, nivelConsumoNum, duracaoHorasNum, precoLitroNum);
      setResultado(resultado);
    } catch {
      setError('Erro ao calcular a quantidade de cerveja. Verifique os valores inseridos.');
    }
  };

  const examples = [
    {
      label: '20 convidados, consumo moderado, 4 horas, R$ 8 por litro',
      values: { convidados: '20', nivelConsumo: '2', duracaoHoras: '4', precoLitro: '8' }
    },
    {
      label: '50 convidados, consumo alto, 6 horas, R$ 10 por litro',
      values: { convidados: '50', nivelConsumo: '3', duracaoHoras: '6', precoLitro: '10' }
    },
    {
      label: '15 convidados, consumo baixo, 3 horas, R$ 6 por litro',
      values: { convidados: '15', nivelConsumo: '1', duracaoHoras: '3', precoLitro: '6' }
    }
  ];

  const faqItems = [
    {
      question: 'Como são calculados os níveis de consumo?',
      answer: 'Baixo: 300ml por pessoa por hora. Moderado: 500ml por pessoa por hora. Alto: 800ml por pessoa por hora. Estes são valores médios baseados em estudos de consumo.'
    },
    {
      question: 'Devo considerar outros fatores?',
      answer: 'Sim! Considere a temperatura (mais quente = mais consumo), tipo de festa (casamento vs. churrasco), e se há outras bebidas disponíveis.'
    },
    {
      question: 'É melhor comprar mais ou menos cerveja?',
      answer: 'É melhor ter um pouco mais do que faltar. Considere comprar 10-20% a mais para garantir que não falte, especialmente se for uma festa importante.'
    },
    {
      question: 'Como armazenar a cerveja corretamente?',
      answer: 'Mantenha a cerveja gelada (2-4°C) e em local escuro. Se for lata, pode ser em gelo. Se for garrafa, use geladeira ou cooler com gelo.'
    }
  ];

  const relatedLinks = [
    { label: 'Beijos e Calorias', href: '/pt/curiosas/beijos-calorias/', description: 'Calcule calorias queimadas' },
    { label: 'Café e Economia', href: '/pt/curiosas/cafe-economia/', description: 'Descubra economia com café' },
    { label: 'Calculadora do Amor', href: '/pt/curiosas/calculadora-amor/', description: 'Teste a compatibilidade' }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setConvidados(values.convidados as string);
    setNivelConsumo(values.nivelConsumo as string);
    setDuracaoHoras(values.duracaoHoras as string);
    setPrecoLitro(values.precoLitro as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = [
    { name: 'Início', href: '/pt/' },
    { name: 'Curiosas', href: '/pt/curiosas/' },
    { name: 'Cerveja e Festa', href: '/pt/curiosas/cerveja-festa/' }
  ];

  const getNivelConsumoDescription = (nivel: number) => {
    const descricoes = {
      1: 'Baixo (300ml/hora)',
      2: 'Moderado (500ml/hora)',
      3: 'Alto (800ml/hora)'
    };
    return descricoes[nivel as keyof typeof descricoes] || '';
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Cerveja e Festa',
            description: 'Calcule quanta cerveja você precisa para sua festa baseado no número de convidados',
            url: '/pt/curiosas/cerveja-festa/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Cerveja e Festa"
            description="Calcule quanta cerveja você precisa para sua festa. Descubra a quantidade ideal baseada no número de convidados e duração."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="convidados">Número de Convidados</Label>
                <Input
                  id="convidados"
                  type="number"
                  value={convidados}
                  onChange={(e) => setConvidados(e.target.value)}
                  placeholder="Ex: 25"
                />
              </div>
              
              <div>
                <Label htmlFor="nivelConsumo">Nível de Consumo</Label>
                <Select value={nivelConsumo} onValueChange={setNivelConsumo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível de consumo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">🍺 Baixo (300ml/hora)</SelectItem>
                    <SelectItem value="2">🍻 Moderado (500ml/hora)</SelectItem>
                    <SelectItem value="3">🍺🍺 Alto (800ml/hora)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="duracaoHoras">Duração da Festa (horas)</Label>
                <Input
                  id="duracaoHoras"
                  type="number"
                  step="0.5"
                  value={duracaoHoras}
                  onChange={(e) => setDuracaoHoras(e.target.value)}
                  placeholder="Ex: 4"
                />
              </div>
              
              <div>
                <Label htmlFor="precoLitro">Preço por Litro (R$)</Label>
                <Input
                  id="precoLitro"
                  type="number"
                  step="0.01"
                  value={precoLitro}
                  onChange={(e) => setPrecoLitro(e.target.value)}
                  placeholder="Ex: 8.50"
                />
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Cerveja
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-amber-50 border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-700 flex items-center gap-2">
                      <Beer className="h-5 w-5" />
                      Resultados da Festa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Beer className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Litros Necessários</span>
                        </div>
                        <p className="text-2xl font-bold text-amber-600">{resultado.litrosNecessarios}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Custo Total</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">R$ {resultado.custoTotal}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Duração</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{duracaoHoras}h</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="bg-white p-6 rounded-lg border-2 border-amber-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Resumo da Festa</p>
                          <p className="text-lg font-medium text-amber-700">{resultado.mensagem}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Convidados</p>
                          <p className="text-2xl font-bold text-blue-600">{convidados}</p>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-2">Nível de Consumo</p>
                          <p className="text-lg font-bold text-purple-600">{getNivelConsumoDescription(parseInt(nivelConsumo))}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">🍺 Dicas para a Festa</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• <strong>Compre 10-20% a mais:</strong> É melhor sobrar do que faltar cerveja</p>
                        <p>• <strong>Mantenha gelada:</strong> Cerveja gelada (2-4°C) é mais apreciada</p>
                        <p>• <strong>Varie os tipos:</strong> Considere diferentes tipos de cerveja para agradar todos</p>
                        <p>• <strong>Tenha alternativas:</strong> Água, refrigerantes e bebidas não alcoólicas</p>
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
