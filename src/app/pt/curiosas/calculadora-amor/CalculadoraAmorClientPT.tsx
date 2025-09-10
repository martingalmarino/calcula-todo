"use client";

import { useState } from 'react';
import { Calculator, Heart, Users } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { calcularCompatibilidadAmor } from '@/lib/math/curiosas';
import { jsonLdCalculator } from '@/lib/seo';

export default function CalculadoraAmorClientPT() {
  const [nome1, setNome1] = useState<string>('');
  const [nome2, setNome2] = useState<string>('');
  const [resultado, setResultado] = useState<{
    porcentagem: number;
    mensagem: string;
    nivel: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    if (!nome1.trim() || !nome2.trim()) {
      setError('Por favor, insira ambos os nomes.');
      return;
    }

    if (nome1.trim().length < 2 || nome2.trim().length < 2) {
      setError('Cada nome deve ter pelo menos 2 caracteres.');
      return;
    }

    try {
      const resultado = calcularCompatibilidadAmor(nome1.trim(), nome2.trim());
      setResultado(resultado);
    } catch {
      setError('Erro ao calcular a compatibilidade. Verifique os nomes inseridos.');
    }
  };

  const examples = [
    {
      label: 'Maria e João',
      values: { nome1: 'Maria', nome2: 'João' }
    },
    {
      label: 'Ana e Pedro',
      values: { nome1: 'Ana', nome2: 'Pedro' }
    },
    {
      label: 'Carlos e Sofia',
      values: { nome1: 'Carlos', nome2: 'Sofia' }
    }
  ];

  const faqItems = [
    {
      question: 'Como funciona a calculadora do amor?',
      answer: 'É um algoritmo divertido que analisa os caracteres dos nomes, suas posições e comprimentos para gerar uma porcentagem de compatibilidade. É apenas para entretenimento!'
    },
    {
      question: 'Os resultados são cientificamente precisos?',
      answer: 'Não! Esta é uma calculadora de entretenimento baseada em um algoritmo divertido. A compatibilidade real entre pessoas depende de muitos outros fatores.'
    },
    {
      question: 'Posso usar nomes com acentos?',
      answer: 'Sim, a calculadora funciona com nomes em português, incluindo acentos e caracteres especiais. O algoritmo considera todos os caracteres.'
    },
    {
      question: 'O que significam os diferentes níveis de compatibilidade?',
      answer: 'Soulmates (90%+), Muito Compatíveis (80-89%), Compatíveis (70-79%), Moderadamente Compatíveis (60-69%), Neutros (50-59%), Pouco Compatíveis (40-49%), Incompatíveis (<40%).'
    }
  ];

  const relatedLinks = [
    { label: 'Beijos e Calorias', href: '/pt/curiosas/beijos-calorias/', description: 'Calcule calorias queimadas' },
    { label: 'Café e Economia', href: '/pt/curiosas/cafe-economia/', description: 'Descubra economia com café' },
    { label: 'Cerveja e Festa', href: '/pt/curiosas/cerveja-festa/', description: 'Calcule cerveja para festa' }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setNome1(values.nome1 as string);
    setNome2(values.nome2 as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = [
    { name: 'Início', href: '/pt/' },
    { name: 'Curiosas', href: '/pt/curiosas/' },
    { name: 'Calculadora do Amor', href: '/pt/curiosas/calculadora-amor/' }
  ];

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Soulmates':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Muito Compatíveis':
        return 'text-pink-600 bg-pink-50 border-pink-200';
      case 'Compatíveis':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Moderadamente Compatíveis':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Neutros':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'Pouco Compatíveis':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-orange-600 bg-orange-50 border-orange-200';
    }
  };

  const getPorcentagemColor = (porcentagem: number) => {
    if (porcentagem >= 80) return 'text-green-600';
    if (porcentagem >= 60) return 'text-blue-600';
    if (porcentagem >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora do Amor',
            description: 'Descubra a compatibilidade entre dois nomes com nossa calculadora do amor',
            url: '/pt/curiosas/calculadora-amor/',
            category: 'curiosas'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora do Amor"
            description="Descubra a compatibilidade entre dois nomes com nossa calculadora do amor. Teste a química entre nomes de forma divertida."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="nome1">Primeiro Nome</Label>
                <Input
                  id="nome1"
                  type="text"
                  value={nome1}
                  onChange={(e) => setNome1(e.target.value)}
                  placeholder="Ex: Maria"
                />
              </div>
              
              <div>
                <Label htmlFor="nome2">Segundo Nome</Label>
                <Input
                  id="nome2"
                  type="text"
                  value={nome2}
                  onChange={(e) => setNome2(e.target.value)}
                  placeholder="Ex: João"
                />
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Calcular Compatibilidade
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
                      Resultado da Compatibilidade
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="bg-white p-8 rounded-lg border-2 border-pink-200 mb-4">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Users className="h-6 w-6 text-gray-600" />
                          <span className="text-lg font-medium text-gray-700">{nome1} & {nome2}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Compatibilidade</p>
                        <p className={`text-6xl font-bold ${getPorcentagemColor(resultado.porcentagem)}`}>
                          {resultado.porcentagem}%
                        </p>
                      </div>
                      
                      <div className={`p-4 rounded-lg border-2 ${getNivelColor(resultado.nivel)}`}>
                        <p className="text-lg font-semibold">{resultado.nivel}</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-center text-gray-700 font-medium">{resultado.mensagem}</p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">💕 Dados Curiosos</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• <strong>Algoritmo divertido:</strong> Baseado em análise de caracteres e posições dos nomes</p>
                        <p>• <strong>Para entretenimento:</strong> Os resultados são apenas para diversão, não refletem compatibilidade real</p>
                        <p>• <strong>Fatores reais:</strong> A compatibilidade verdadeira depende de personalidade, valores e conexão emocional</p>
                        <p>• <strong>Teste com amigos:</strong> Experimente com diferentes combinações de nomes para se divertir</p>
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
