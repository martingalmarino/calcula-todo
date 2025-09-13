"use client"

import { useState } from 'react'
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { calcularValorFuturo, calcularValorPresente } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'

export default function ValoreFuturoPresenteClientIT() {
  const [valorPresente, setValorPresente] = useState<string>('')
  const [valorFuturo, setValorFuturo] = useState<string>('')
  const [tasaAnual, setTasaAnual] = useState<string>('')
  const [tiempoAnos, setTiempoAnos] = useState<string>('')
  const [tipoCalculo, setTipoCalculo] = useState<'futuro' | 'presente'>('futuro')
  const [resultado, setResultado] = useState<{
    valorInicial: number;
    tasaAnual: number;
    tiempoAnos: number;
    valorResultado: number;
    tipo: 'futuro' | 'presente';
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const tasaAnualNum = parseFloat(tasaAnual);
    const tiempoAnosNum = parseFloat(tiempoAnos);

    if (isNaN(tasaAnualNum) || isNaN(tiempoAnosNum)) {
      setError('Inserisci valori numerici validi per tasso e tempo.');
      return;
    }

    if (tasaAnualNum < 0 || tiempoAnosNum <= 0) {
      setError('Il tasso di interesse non può essere negativo e il tempo deve essere positivo.');
      return;
    }

    if (tasaAnualNum > 50) {
      setError('Il tasso di interesse sembra molto alto. Verifica il valore inserito.');
      return;
    }

    try {
      if (tipoCalculo === 'futuro') {
        const valorPresenteNum = parseFloat(valorPresente);
        if (isNaN(valorPresenteNum) || valorPresenteNum <= 0) {
          setError('Inserisci un valore presente valido e positivo.');
          return;
        }
        const valorFuturoResultado = calcularValorFuturo(valorPresenteNum, tasaAnualNum / 100, tiempoAnosNum);
        setResultado({
          valorInicial: valorPresenteNum,
          tasaAnual: tasaAnualNum,
          tiempoAnos: tiempoAnosNum,
          valorResultado: valorFuturoResultado,
          tipo: 'futuro'
        });
      } else {
        const valorFuturoNum = parseFloat(valorFuturo);
        if (isNaN(valorFuturoNum) || valorFuturoNum <= 0) {
          setError('Inserisci un valore futuro valido e positivo.');
          return;
        }
        const valorPresenteResultado = calcularValorPresente(valorFuturoNum, tasaAnualNum / 100, tiempoAnosNum);
        setResultado({
          valorInicial: valorFuturoNum,
          tasaAnual: tasaAnualNum,
          tiempoAnos: tiempoAnosNum,
          valorResultado: valorPresenteResultado,
          tipo: 'presente'
        });
      }
    } catch {
      setError('Errore nel calcolo. Verifica i valori inseriti.');
    }
  };

  const examples = [
    {
      label: 'Valore Futuro: €10.000 al 5% annuo per 10 anni',
      values: { valorPresente: '10000', tasaAnual: '5', tiempoAnos: '10' },
      tipo: 'futuro' as const
    },
    {
      label: 'Valore Presente: €20.000 tra 5 anni al 6% annuo',
      values: { valorFuturo: '20000', tasaAnual: '6', tiempoAnos: '5' },
      tipo: 'presente' as const
    },
    {
      label: 'Valore Futuro: €5.000 al 7% annuo per 15 anni',
      values: { valorPresente: '5000', tasaAnual: '7', tiempoAnos: '15' },
      tipo: 'futuro' as const
    }
  ];

  const faqItems = [
    {
      question: 'Cos\'è il valore futuro?',
      answer: 'Il valore futuro è quanto varrà un investimento o una somma di denaro in una data futura, considerando il tasso di interesse e il tempo.'
    },
    {
      question: 'Cos\'è il valore presente?',
      answer: 'Il valore presente è quanto vale oggi una somma di denaro che riceverai in futuro, considerando il tasso di sconto e il tempo.'
    },
    {
      question: 'Come si calcola il valore futuro?',
      answer: 'Valore Futuro = Valore Presente × (1 + Tasso di Interesse)^Tempo'
    },
    {
      question: 'Come si calcola il valore presente?',
      answer: 'Valore Presente = Valore Futuro / (1 + Tasso di Sconto)^Tempo'
    }
  ];

  const relatedLinks = [
    { label: 'Interesse Semplice', href: '/it/finanze/interesse-semplice', description: 'Calcola l\'interesse semplice' },
    { label: 'Risparmio Obiettivo', href: '/it/finanze/risparmio-obiettivo', description: 'Pianifica i tuoi risparmi' },
    { label: 'Calcolatrice di Mutuo', href: '/it/finanze/calcolatrice-mutuo', description: 'Calcola le rate del tuo mutuo' }
  ];

  const handleExampleClick = (values: Record<string, unknown>, tipo: 'futuro' | 'presente') => {
    setTipoCalculo(tipo);
    if (tipo === 'futuro') {
      setValorPresente(values.valorPresente as string);
      setValorFuturo('');
    } else {
      setValorFuturo(values.valorFuturo as string);
      setValorPresente('');
    }
    setTasaAnual(values.tasaAnual as string);
    setTiempoAnos(values.tiempoAnos as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Finanze', href: '/it/finanze' },
    { label: 'Valore Futuro e Presente', href: '/it/finanze/valore-futuro-presente' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice Valore Futuro e Presente',
            description: 'Calcola il valore futuro degli investimenti e il valore presente di somme future',
            url: '/it/finanze/valore-futuro-presente/',
            category: 'finanze'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice Valore Futuro e Presente"
            description="Calcola il valore futuro degli investimenti e il valore presente di somme future."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => handleExampleClick(values, values.tipo as 'futuro' | 'presente')}
            relatedLinks={relatedLinks}
          >
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button
              variant={tipoCalculo === 'futuro' ? 'default' : 'outline'}
              onClick={() => {
                setTipoCalculo('futuro');
                setValorFuturo('');
                setResultado(null);
                setError(null);
              }}
              className="w-full"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Valore Futuro
            </Button>
            <Button
              variant={tipoCalculo === 'presente' ? 'default' : 'outline'}
              onClick={() => {
                setTipoCalculo('presente');
                setValorPresente('');
                setResultado(null);
                setError(null);
              }}
              className="w-full"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Valore Presente
            </Button>
          </div>

          {tipoCalculo === 'futuro' ? (
            <div>
              <Label htmlFor="valorPresente">Valore Presente (€)</Label>
              <Input
                id="valorPresente"
                type="number"
                value={valorPresente}
                onChange={(e) => setValorPresente(e.target.value)}
                placeholder="Es: 10000"
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="valorFuturo">Valore Futuro (€)</Label>
              <Input
                id="valorFuturo"
                type="number"
                value={valorFuturo}
                onChange={(e) => setValorFuturo(e.target.value)}
                placeholder="Es: 20000"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="tasaAnual">Tasso di Interesse Annuo (%)</Label>
            <Input
              id="tasaAnual"
              type="number"
              step="0.1"
              value={tasaAnual}
              onChange={(e) => setTasaAnual(e.target.value)}
              placeholder="Es: 5"
            />
          </div>
          
          <div>
            <Label htmlFor="tiempoAnos">Tempo (Anni)</Label>
            <Input
              id="tiempoAnos"
              type="number"
              step="0.1"
              value={tiempoAnos}
              onChange={(e) => setTiempoAnos(e.target.value)}
              placeholder="Es: 10"
            />
          </div>
          
          <Button onClick={handleCalculate} className="calculator-button">
            <Calculator className="h-4 w-4 mr-2" />
            Calcola {tipoCalculo === 'futuro' ? 'Valore Futuro' : 'Valore Presente'}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Errore</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resultado && (
            <div className="space-y-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center gap-2">
                    {resultado.tipo === 'futuro' ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <TrendingDown className="h-5 w-5" />
                    )}
                    Risultato del Calcolo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        {resultado.tipo === 'futuro' ? 'Valore Presente' : 'Valore Futuro'}
                      </p>
                      <p className="text-lg font-semibold">€{resultado.valorInicial.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tasso di Interesse Annuo</p>
                      <p className="text-lg font-semibold">{resultado.tasaAnual.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tempo</p>
                      <p className="text-lg font-semibold">{resultado.tiempoAnos} anni</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {resultado.tipo === 'futuro' ? 'Valore Futuro' : 'Valore Presente'}
                      </p>
                      <p className="text-lg font-semibold">€{resultado.valorResultado.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        {resultado.tipo === 'futuro' ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-blue-600" />
                        )}
                        <p className="text-sm text-gray-600">
                          {resultado.tipo === 'futuro' ? 'Valore Futuro' : 'Valore Presente'}
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">€{resultado.valorResultado.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Interpretazione:</h4>
                    <p className="text-sm text-gray-600">
                      {resultado.tipo === 'futuro' 
                        ? `€${resultado.valorInicial.toLocaleString()} investiti oggi al ${resultado.tasaAnual.toFixed(2)}% annuo varranno €${resultado.valorResultado.toLocaleString()} tra ${resultado.tiempoAnos} anni.`
                        : `€${resultado.valorInicial.toLocaleString()} ricevuti tra ${resultado.tiempoAnos} anni hanno un valore presente di €${resultado.valorResultado.toLocaleString()} considerando un tasso di sconto del ${resultado.tasaAnual.toFixed(2)}% annuo.`
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          </div>
        </CalculatorLayout>
        </div>
      </Container>
    </div>
  );
}
