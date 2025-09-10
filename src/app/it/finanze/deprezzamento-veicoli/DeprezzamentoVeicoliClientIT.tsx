"use client"

import { useState } from 'react'
import { Calculator, Car, TrendingDown, DollarSign } from 'lucide-react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { calcularDepreciacionVehiculo } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'

export default function DeprezzamentoVeicoliClientIT() {
  const [valorInicial, setValorInicial] = useState<string>('')
  const [valorResidual, setValorResidual] = useState<string>('')
  const [vidaUtil, setVidaUtil] = useState<string>('')
  const [resultado, setResultado] = useState<{
    valorInicial: number;
    valorResidual: number;
    vidaUtil: number;
    depreciacionAnual: number;
    depreciacionMensual: number;
    valorActual: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const valorInicialNum = parseFloat(valorInicial);
    const valorResidualNum = parseFloat(valorResidual);
    const vidaUtilNum = parseFloat(vidaUtil);

    if (isNaN(valorInicialNum) || isNaN(valorResidualNum) || isNaN(vidaUtilNum)) {
      setError('Inserisci valori numerici validi per tutti i campi.');
      return;
    }

    if (valorInicialNum <= 0 || valorResidualNum < 0 || vidaUtilNum <= 0) {
      setError('Il valore iniziale e la vita utile devono essere positivi. Il valore residuo non può essere negativo.');
      return;
    }

    if (valorResidualNum >= valorInicialNum) {
      setError('Il valore residuo deve essere minore del valore iniziale.');
      return;
    }

    try {
      const resultado = calcularDepreciacionVehiculo(valorInicialNum, valorResidualNum, vidaUtilNum);
      setResultado(resultado);
    } catch {
      setError('Errore nel calcolo del deprezzamento. Verifica i valori inseriti.');
    }
  };

  const examples = [
    {
      label: 'Auto nuova di €25.000 con valore residuo €5.000 in 5 anni',
      values: { valorInicial: '25000', valorResidual: '5000', vidaUtil: '5' }
    },
    {
      label: 'Camion di €35.000 con valore residuo €8.000 in 7 anni',
      values: { valorInicial: '35000', valorResidual: '8000', vidaUtil: '7' }
    },
    {
      label: 'Moto di €8.000 con valore residuo €2.000 in 3 anni',
      values: { valorInicial: '8000', valorResidual: '2000', vidaUtil: '3' }
    }
  ];

  const faqItems = [
    {
      question: 'Cos\'è il deprezzamento dei veicoli?',
      answer: 'Il deprezzamento è la perdita di valore che subisce un veicolo nel tempo a causa dell\'uso, dell\'usura e dell\'obsolescenza.'
    },
    {
      question: 'Cos\'è il metodo lineare?',
      answer: 'Il metodo lineare distribuisce il deprezzamento in modo uniforme lungo la vita utile del veicolo. È il metodo più comune e semplice.'
    },
    {
      question: 'Come si calcola il deprezzamento annuale?',
      answer: 'Deprezzamento annuale = (Valore iniziale - Valore residuo) / Vita utile in anni'
    },
    {
      question: 'Quali fattori influenzano il deprezzamento?',
      answer: 'Marca, modello, chilometraggio, stato generale, domanda del mercato e condizioni economiche sono fattori che influenzano il deprezzamento.'
    }
  ];

  const relatedLinks = [
    { label: 'Interesse Semplice', href: '/it/finanze/interesse-semplice', description: 'Calcola l\'interesse semplice' },
    { label: 'Calcolatrice di Mutuo', href: '/it/finanze/calcolatrice-mutuo', description: 'Calcola le rate del tuo mutuo' },
    { label: 'Risparmio Obiettivo', href: '/it/finanze/risparmio-obiettivo', description: 'Pianifica i tuoi risparmi' }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setValorInicial(values.valorInicial as string);
    setValorResidual(values.valorResidual as string);
    setVidaUtil(values.vidaUtil as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Finanze', href: '/it/finanze' },
    { label: 'Deprezzamento Veicoli', href: '/it/finanze/deprezzamento-veicoli' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice Deprezzamento Veicoli',
            description: 'Calcola il deprezzamento annuale e mensile dei veicoli usando il metodo lineare',
            url: '/it/finanze/deprezzamento-veicoli/',
            category: 'finanze'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice Deprezzamento Veicoli"
            description="Calcola il deprezzamento annuale e mensile del tuo veicolo usando il metodo lineare standard."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
        <div className="grid gap-4">
          <div>
            <Label htmlFor="valorInicial">Valore Iniziale del Veicolo (€)</Label>
            <Input
              id="valorInicial"
              type="number"
              value={valorInicial}
              onChange={(e) => setValorInicial(e.target.value)}
              placeholder="Es: 25000"
            />
          </div>
          
          <div>
            <Label htmlFor="valorResidual">Valore Residuo Stimato (€)</Label>
            <Input
              id="valorResidual"
              type="number"
              value={valorResidual}
              onChange={(e) => setValorResidual(e.target.value)}
              placeholder="Es: 5000"
            />
          </div>
          
          <div>
            <Label htmlFor="vidaUtil">Vita Utile (Anni)</Label>
            <Input
              id="vidaUtil"
              type="number"
              value={vidaUtil}
              onChange={(e) => setVidaUtil(e.target.value)}
              placeholder="Es: 5"
            />
          </div>
          
          <Button onClick={handleCalculate} className="calculator-button">
            <Calculator className="h-4 w-4 mr-2" />
            Calcola Deprezzamento
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Errore</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resultado && (
            <Card className="mt-4 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-700 flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Risultati del Deprezzamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Valore Iniziale</p>
                    <p className="text-lg font-semibold">€{resultado.valorInicial.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valore Residuo</p>
                    <p className="text-lg font-semibold">€{resultado.valorResidual.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vita Utile</p>
                    <p className="text-lg font-semibold">{resultado.vidaUtil} anni</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Valore Attuale (dopo 1 anno)</p>
                    <p className="text-lg font-semibold">€{resultado.valorActual.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="h-4 w-4 text-blue-600" />
                        <p className="text-sm text-gray-600">Deprezzamento Annuale</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">€{resultado.depreciacionAnual.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <p className="text-sm text-gray-600">Deprezzamento Mensile</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">€{resultado.depreciacionMensual.toLocaleString()}</p>
                    </div>
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
