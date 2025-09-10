"use client"

import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { calcularIPC } from '@/lib/math/finance'
import { jsonLdCalculator } from '@/lib/seo'

export default function CalcolatriceIPCClientIT() {
  const [monto, setMonto] = useState<string>('')
  const [ipcInicial, setIpcInicial] = useState<string>('')
  const [ipcFinal, setIpcFinal] = useState<string>('')
  const [resultado, setResultado] = useState<{
    monto: number;
    ipcInicial: number;
    ipcFinal: number;
    variacionIPC: number;
    poderAdquisitivo: number;
    perdidaPoderAdquisitivo: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    const montoNum = parseFloat(monto);
    const ipcInicialNum = parseFloat(ipcInicial);
    const ipcFinalNum = parseFloat(ipcFinal);

    if (isNaN(montoNum) || isNaN(ipcInicialNum) || isNaN(ipcFinalNum)) {
      setError('Inserisci valori numerici validi per tutti i campi.');
      return;
    }

    if (montoNum <= 0 || ipcInicialNum <= 0 || ipcFinalNum <= 0) {
      setError('Tutti i valori devono essere positivi.');
      return;
    }

    try {
      const resultado = calcularIPC(montoNum, ipcInicialNum, ipcFinalNum);
      setResultado(resultado);
    } catch {
      setError('Errore nel calcolo dell\'IPC. Verifica i valori inseriti.');
    }
  };

  const examples = [
    {
      label: '€10.000 con IPC 100 nel 2020 e IPC 110 nel 2023',
      values: { monto: '10000', ipcInicial: '100', ipcFinal: '110' }
    },
    {
      label: '€5.000 con IPC 95 nel 2019 e IPC 105 nel 2022',
      values: { monto: '5000', ipcInicial: '95', ipcFinal: '105' }
    },
    {
      label: '€15.000 con IPC 120 nel 2021 e IPC 130 nel 2024',
      values: { monto: '15000', ipcInicial: '120', ipcFinal: '130' }
    }
  ];

  const faqItems = [
    {
      question: 'Cos\'è l\'IPC?',
      answer: 'L\'Indice dei Prezzi al Consumo (IPC) è una misura dell\'inflazione che traccia i cambiamenti nei prezzi di un paniere di beni e servizi nel tempo.'
    },
    {
      question: 'Come si calcola la variazione dell\'IPC?',
      answer: 'La variazione dell\'IPC si calcola come: ((IPC Finale - IPC Iniziale) / IPC Iniziale) × 100'
    },
    {
      question: 'Cosa significa il potere d\'acquisto?',
      answer: 'Il potere d\'acquisto è la quantità di beni e servizi che puoi comprare con una determinata somma di denaro, considerando l\'inflazione.'
    },
    {
      question: 'Perché è importante conoscere l\'inflazione?',
      answer: 'L\'inflazione riduce il valore del denaro nel tempo. È importante per la pianificazione finanziaria e per capire il vero costo delle cose.'
    }
  ];

  const relatedLinks = [
    { label: 'Interesse Semplice', href: '/it/finanze/interesse-semplice', description: 'Calcola l\'interesse semplice' },
    { label: 'Risparmio Obiettivo', href: '/it/finanze/risparmio-obiettivo', description: 'Pianifica i tuoi risparmi' },
    { label: 'Valore Futuro e Presente', href: '/it/finanze/valore-futuro-presente', description: 'Calcola il valore degli investimenti' }
  ];

  const handleExampleClick = (values: Record<string, unknown>) => {
    setMonto(values.monto as string);
    setIpcInicial(values.ipcInicial as string);
    setIpcFinal(values.ipcFinal as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Finanze', href: '/it/finanze' },
    { label: 'Calcolatrice dell\'IPC', href: '/it/finanze/calcolatrice-ipc' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice dell\'IPC',
            description: 'Calcola il potere d\'acquisto e l\'inflazione usando l\'Indice dei Prezzi al Consumo',
            url: '/it/finanze/calcolatrice-ipc/',
            category: 'finanze'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice dell'IPC"
            description="Calcola il potere d'acquisto e l'inflazione usando l'Indice dei Prezzi al Consumo (IPC)."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
        <div className="grid gap-4">
          <div>
            <Label htmlFor="monto">Importo da Analizzare (€)</Label>
            <Input
              id="monto"
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Es: 10000"
            />
          </div>
          
          <div>
            <Label htmlFor="ipcInicial">IPC Anno Iniziale</Label>
            <Input
              id="ipcInicial"
              type="number"
              step="0.1"
              value={ipcInicial}
              onChange={(e) => setIpcInicial(e.target.value)}
              placeholder="Es: 100"
            />
          </div>
          
          <div>
            <Label htmlFor="ipcFinal">IPC Anno Finale</Label>
            <Input
              id="ipcFinal"
              type="number"
              step="0.1"
              value={ipcFinal}
              onChange={(e) => setIpcFinal(e.target.value)}
              placeholder="Es: 110"
            />
          </div>
          
          <Button onClick={handleCalculate} className="calculator-button">
            <Calculator className="h-4 w-4 mr-2" />
            Calcola IPC
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
                    <TrendingUp className="h-5 w-5" />
                    Risultati dell&apos;Analisi IPC
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Importo Originale</p>
                      <p className="text-lg font-semibold">€{resultado.monto.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Variazione IPC</p>
                      <p className="text-lg font-semibold">{resultado.variacionIPC.toFixed(2)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">IPC Iniziale</p>
                      <p className="text-lg font-semibold">{resultado.ipcInicial}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">IPC Finale</p>
                      <p className="text-lg font-semibold">{resultado.ipcFinal}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <p className="text-sm text-gray-600">Potere d&apos;Acquisto Attuale</p>
                        </div>
                        <p className="text-2xl font-bold text-green-600">€{resultado.poderAdquisitivo.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <p className="text-sm text-gray-600">Perdita di Potere d&apos;Acquisto</p>
                        </div>
                        <p className="text-2xl font-bold text-red-600">€{resultado.perdidaPoderAdquisitivo.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Interpretazione:</h4>
                    <p className="text-sm text-gray-600">
                      Con un&apos;inflazione del {resultado.variacionIPC.toFixed(2)}%, 
                      i tuoi €{resultado.monto.toLocaleString()} hanno oggi lo stesso potere d&apos;acquisto 
                      di €{resultado.poderAdquisitivo.toLocaleString()} nell&apos;anno iniziale.
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
