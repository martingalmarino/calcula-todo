"use client"

import { useState } from 'react'
import { Calculator, Target, DollarSign, TrendingUp, PiggyBank } from 'lucide-react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { calcularAhorroObjetivo } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'

export default function RisparmioObiettivoClientIT() {
  const [objetivo, setObjetivo] = useState<string>('')
  const [tasaAnual, setTasaAnual] = useState<string>('')
  const [plazoAnos, setPlazoAnos] = useState<string>('')
  const [resultado, setResultado] = useState<{
    objetivo: number;
    tasaAnual: number;
    plazoAnos: number;
    ahorroMensual: number;
    totalAhorrado: number;
    interesesGanados: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const objetivoNum = parseFloat(objetivo);
    const tasaAnualNum = parseFloat(tasaAnual);
    const plazoAnosNum = parseFloat(plazoAnos);

    if (isNaN(objetivoNum) || isNaN(tasaAnualNum) || isNaN(plazoAnosNum)) {
      setError('Inserisci valori numerici validi per tutti i campi.');
      return;
    }

    if (objetivoNum <= 0 || tasaAnualNum < 0 || plazoAnosNum <= 0) {
      setError('L\'obiettivo e la durata devono essere positivi. Il tasso di interesse non può essere negativo.');
      return;
    }

    if (tasaAnualNum > 50) {
      setError('Il tasso di interesse sembra molto alto. Verifica il valore inserito.');
      return;
    }

    try {
      const resultado = calcularAhorroObjetivo(objetivoNum, tasaAnualNum / 100, plazoAnosNum);
      setResultado(resultado);
    } catch {
      setError('Errore nel calcolo del risparmio. Verifica i valori inseriti.');
    }
  };

  const examples = [
    {
      label: 'Obiettivo €50.000 al 5% annuo per 10 anni',
      values: { objetivo: '50000', tasaAnual: '5', plazoAnos: '10' }
    },
    {
      label: 'Obiettivo €25.000 al 3% annuo per 5 anni',
      values: { objetivo: '25000', tasaAnual: '3', plazoAnos: '5' }
    },
    {
      label: 'Obiettivo €100.000 al 7% annuo per 15 anni',
      values: { objetivo: '100000', tasaAnual: '7', plazoAnos: '15' }
    }
  ];

  const faqItems = [
    {
      question: 'Come funziona la calcolatrice di risparmio obiettivo?',
      answer: 'La calcolatrice determina quanto devi risparmiare mensilmente per raggiungere un obiettivo finanziario specifico, considerando il tasso di interesse e il tempo disponibile.'
    },
    {
      question: 'Cosa considera il calcolo?',
      answer: 'Il calcolo considera l\'obiettivo finale, il tasso di interesse annuo, la durata del risparmio e calcola l\'importo mensile necessario usando la formula delle rendite.'
    },
    {
      question: 'Come si calcola il risparmio mensile?',
      answer: 'Si usa la formula delle rendite: Risparmio Mensile = Obiettivo × Tasso Mensile / ((1 + Tasso Mensile)^Numero Pagamenti - 1)'
    },
    {
      question: 'Cosa sono gli interessi guadagnati?',
      answer: 'Gli interessi guadagnati sono la differenza tra l\'obiettivo finale e il totale dei tuoi depositi. Rappresentano il guadagno dal tasso di interesse.'
    }
  ];

  const relatedLinks = [
    { label: 'Interesse Semplice', href: '/it/finanze/interesse-semplice', description: 'Calcola l\'interesse semplice' },
    { label: 'Valore Futuro e Presente', href: '/it/finanze/valore-futuro-presente', description: 'Calcola il valore degli investimenti' },
    { label: 'Calcolatrice di Mutuo', href: '/it/finanze/calcolatrice-mutuo', description: 'Calcola le rate del tuo mutuo' }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setObjetivo(values.objetivo as string);
    setTasaAnual(values.tasaAnual as string);
    setPlazoAnos(values.plazoAnos as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Finanze', href: '/it/finanze' },
    { label: 'Risparmio Obiettivo', href: '/it/finanze/risparmio-obiettivo' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice Risparmio Obiettivo',
            description: 'Calcola quanto devi risparmiare mensilmente per raggiungere i tuoi obiettivi finanziari',
            url: '/it/finanze/risparmio-obiettivo/',
            category: 'finanze'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice Risparmio Obiettivo"
            description="Calcola quanto devi risparmiare mensilmente per raggiungere i tuoi obiettivi finanziari."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
        <div className="grid gap-4">
          <div>
            <Label htmlFor="objetivo">Obiettivo di Risparmio (€)</Label>
            <Input
              id="objetivo"
              type="number"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              placeholder="Es: 50000"
            />
          </div>
          
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
            <Label htmlFor="plazoAnos">Durata (Anni)</Label>
            <Input
              id="plazoAnos"
              type="number"
              value={plazoAnos}
              onChange={(e) => setPlazoAnos(e.target.value)}
              placeholder="Es: 10"
            />
          </div>
          
          <Button onClick={handleCalculate} className="calculator-button">
            <Calculator className="h-4 w-4 mr-2" />
            Calcola Risparmio
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
                    <Target className="h-5 w-5" />
                    Piano di Risparmio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Obiettivo di Risparmio</p>
                      <p className="text-lg font-semibold">€{resultado.objetivo.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Tasso di Interesse Annuo</p>
                      <p className="text-lg font-semibold">{resultado.tasaAnual.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Durata</p>
                      <p className="text-lg font-semibold">{resultado.plazoAnos} anni</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Totale Risparmiato</p>
                      <p className="text-lg font-semibold">€{resultado.totalAhorrado.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <PiggyBank className="h-4 w-4 text-blue-600" />
                          <p className="text-sm text-gray-600">Risparmio Mensile Necessario</p>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">€{resultado.ahorroMensual.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          <p className="text-sm text-gray-600">Interessi Guadagnati</p>
                        </div>
                        <p className="text-2xl font-bold text-green-600">€{resultado.interesesGanados.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Riepilogo:</h4>
                    <p className="text-sm text-gray-600">
                      Risparmiando €{resultado.ahorroMensual.toLocaleString()} al mese per {resultado.plazoAnos} anni 
                      con un tasso del {resultado.tasaAnual.toFixed(2)}%, raggiungerai il tuo obiettivo di €{resultado.objetivo.toLocaleString()}.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      I tuoi depositi totali saranno €{resultado.totalAhorrado.toLocaleString()} e guadagnerai €{resultado.interesesGanados.toLocaleString()} in interessi.
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
