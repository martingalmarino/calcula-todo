"use client"

import { useState } from 'react'
import { Calculator, Home, DollarSign, TrendingUp } from 'lucide-react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { calcularHipoteca } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'

export default function CalcolatriceMutuoClientIT() {
  const [monto, setMonto] = useState<string>('')
  const [tasaAnual, setTasaAnual] = useState<string>('')
  const [plazoAnos, setPlazoAnos] = useState<string>('')
  const [resultado, setResultado] = useState<{
    monto: number;
    tasaAnual: number;
    plazoAnos: number;
    cuotaMensual: number;
    totalPagos: number;
    totalIntereses: number;
    cronograma: Array<{
      mes: number;
      cuota: number;
      capital: number;
      interes: number;
      saldo: number;
    }>;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const montoNum = parseFloat(monto);
    const tasaAnualNum = parseFloat(tasaAnual);
    const plazoAnosNum = parseFloat(plazoAnos);

    if (isNaN(montoNum) || isNaN(tasaAnualNum) || isNaN(plazoAnosNum)) {
      setError('Inserisci valori numerici validi per tutti i campi.');
      return;
    }

    if (montoNum <= 0 || tasaAnualNum <= 0 || plazoAnosNum <= 0) {
      setError('Tutti i valori devono essere positivi.');
      return;
    }

    if (tasaAnualNum > 50) {
      setError('Il tasso di interesse sembra molto alto. Verifica il valore inserito.');
      return;
    }

    try {
      const resultado = calcularHipoteca(montoNum, tasaAnualNum / 100, plazoAnosNum);
      setResultado(resultado);
    } catch {
      setError('Errore nel calcolo del mutuo. Verifica i valori inseriti.');
    }
  };

  const examples = [
    {
      label: 'Casa di €200.000 al 6% annuo per 30 anni',
      values: { monto: '200000', tasaAnual: '6', plazoAnos: '30' }
    },
    {
      label: 'Appartamento di €150.000 al 5.5% annuo per 20 anni',
      values: { monto: '150000', tasaAnual: '5.5', plazoAnos: '20' }
    },
    {
      label: 'Casa di €300.000 al 7% annuo per 15 anni',
      values: { monto: '300000', tasaAnual: '7', plazoAnos: '15' }
    }
  ];

  const faqItems = [
    {
      question: 'Cos\'è un mutuo?',
      answer: 'Un mutuo è un prestito a lungo termine utilizzato per acquistare una proprietà, dove la proprietà serve come garanzia del prestito.'
    },
    {
      question: 'Come si calcola la rata mensile?',
      answer: 'Si usa la formula della rata fissa che considera l\'importo del prestito, il tasso di interesse mensile e il numero totale di pagamenti.'
    },
    {
      question: 'Cosa include la rata mensile?',
      answer: 'La rata include il pagamento del capitale (ammortamento) e gli interessi. All\'inizio, la maggior parte è interesse, e con il tempo si paga più capitale.'
    },
    {
      question: 'Posso pagare più della rata mensile?',
      answer: 'Sì, i pagamenti aggiuntivi riducono il capitale pendente e possono risparmiare interessi significativi a lungo termine.'
    }
  ];

  const relatedLinks = [
    { label: 'Interesse Semplice', href: '/it/finanze/interesse-semplice', description: 'Calcola l\'interesse semplice' },
    { label: 'Risparmio Obiettivo', href: '/it/finanze/risparmio-obiettivo', description: 'Pianifica i tuoi risparmi' },
    { label: 'Valore Futuro e Presente', href: '/it/finanze/valore-futuro-presente', description: 'Calcola il valore degli investimenti' }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setMonto(values.monto as string);
    setTasaAnual(values.tasaAnual as string);
    setPlazoAnos(values.plazoAnos as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Finanze', href: '/it/finanze' },
    { label: 'Calcolatrice di Mutuo', href: '/it/finanze/calcolatrice-mutuo' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice di Mutuo',
            description: 'Calcola le rate mensili, interessi totali e cronogramma di pagamenti per prestiti ipotecari',
            url: '/it/finanze/calcolatrice-mutuo/',
            category: 'finanze'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice di Mutuo"
            description="Calcola le rate mensili, interessi totali e cronogramma di pagamenti per il tuo prestito ipotecario."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
        <div className="grid gap-4">
          <div>
            <Label htmlFor="monto">Importo del Prestito (€)</Label>
            <Input
              id="monto"
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Es: 200000"
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
              placeholder="Es: 6"
            />
          </div>
          
          <div>
            <Label htmlFor="plazoAnos">Durata (Anni)</Label>
            <Input
              id="plazoAnos"
              type="number"
              value={plazoAnos}
              onChange={(e) => setPlazoAnos(e.target.value)}
              placeholder="Es: 30"
            />
          </div>
          
          <Button onClick={handleCalculate} className="calculator-button">
            <Calculator className="h-4 w-4 mr-2" />
            Calcola Mutuo
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
                    <Home className="h-5 w-5" />
                    Riepilogo del Mutuo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Importo del Prestito</p>
                      <p className="text-lg font-semibold">€{resultado.monto.toLocaleString()}</p>
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
                      <p className="text-sm text-gray-600">Totale dei Pagamenti</p>
                      <p className="text-lg font-semibold">€{resultado.totalPagos.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-blue-600" />
                          <p className="text-sm text-gray-600">Rata Mensile</p>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">€{resultado.cuotaMensual.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-red-600" />
                          <p className="text-sm text-gray-600">Totale degli Interessi</p>
                        </div>
                        <p className="text-2xl font-bold text-red-600">€{resultado.totalIntereses.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cronogramma dei Pagamenti (Primi 12 Mesi)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Mese</th>
                          <th className="text-right p-2">Rata</th>
                          <th className="text-right p-2">Capitale</th>
                          <th className="text-right p-2">Interesse</th>
                          <th className="text-right p-2">Saldo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultado.cronograma.map((pago) => (
                          <tr key={pago.mes} className="border-b">
                            <td className="p-2">{pago.mes}</td>
                            <td className="text-right p-2">€{pago.cuota.toLocaleString()}</td>
                            <td className="text-right p-2">€{pago.capital.toLocaleString()}</td>
                            <td className="text-right p-2">€{pago.interes.toLocaleString()}</td>
                            <td className="text-right p-2">€{pago.saldo.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
