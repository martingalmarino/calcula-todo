"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, AlertCircle } from 'lucide-react'
// Función simple para conversión de fechas
interface DateFormatResult {
  originalDate: string;
  originalFormat: string;
  convertedDate: string;
  convertedFormat: string;
}

function convertDateFormat(dateStr: string, format: 'european' | 'american' | 'iso'): DateFormatResult {
  const date = new Date(dateStr);
  
  if (isNaN(date.getTime())) {
    throw new Error('Data non valida');
  }
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  let convertedDate: string;
  let convertedFormat: string;
  
  switch (format) {
    case 'european':
      convertedDate = `${day}/${month}/${year}`;
      convertedFormat = 'DD/MM/YYYY';
      break;
    case 'american':
      convertedDate = `${month}/${day}/${year}`;
      convertedFormat = 'MM/DD/YYYY';
      break;
    case 'iso':
      convertedDate = `${year}-${month}-${day}`;
      convertedFormat = 'YYYY-MM-DD';
      break;
    default:
      throw new Error('Formato non supportato');
  }
  
  return {
    originalDate: dateStr,
    originalFormat: 'YYYY-MM-DD',
    convertedDate,
    convertedFormat
  };
}
import { jsonLdCalculator } from '@/lib/seo'

export default function ConvertitoreDateClientIT() {
  const [inputDate, setInputDate] = useState('')
  const [result, setResult] = useState<DateFormatResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleConvert = (format: 'european' | 'american' | 'iso') => {
    setError(null)
    
    if (!inputDate) {
      setError('Per favore, inserisci una data')
      return
    }

    try {
      const result = convertDateFormat(inputDate, format)
      setResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nella conversione della data')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Calendario', href: '/it/calendario' },
    { label: 'Convertitore di Date', href: '/it/calendario/convertitore-date' }
  ]

  const examples = [
    {
      label: 'Esempio: 15 marzo 2024',
      values: { inputDate: '2024-03-15' }
    },
    {
      label: 'Esempio: 1 gennaio 2025',
      values: { inputDate: '2025-01-01' }
    }
  ]

  const faqItems = [
    {
      question: 'Che formati di data sono supportati?',
      answer: 'Supportiamo il formato ISO (YYYY-MM-DD), europeo (DD/MM/YYYY) e americano (MM/DD/YYYY).'
    },
    {
      question: 'Come funziona la conversione?',
      answer: 'La calcolatrice converte la data inserita nel formato selezionato, mantenendo la stessa data ma cambiando la rappresentazione.'
    },
    {
      question: 'Posso convertire date future?',
      answer: 'Sì, puoi convertire qualsiasi data valida, incluse le date future.'
    },
    {
      question: 'Che formato devo usare per l\'input?',
      answer: 'Usa il formato YYYY-MM-DD (anno-mese-giorno) per l\'input, che è lo standard internazionale.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Convertitore di Date - Conversione Formati Data',
            description: 'Converte date tra diversi formati e calendari per uso internazionale',
            url: '/it/calendario/convertitore-date/',
            category: 'Calendario'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Convertitore di Date - Conversione Formati Data"
            description="Converte date tra diversi formati e calendari per uso internazionale"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setInputDate(values.inputDate as string)
            }}
          >
            <Tabs defaultValue="european" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="european" className="calculator-tab">
                  <Calendar className="h-4 w-4 mr-2" />
                  Europeo
                </TabsTrigger>
                <TabsTrigger value="american" className="calculator-tab">
                  <Calendar className="h-4 w-4 mr-2" />
                  Americano
                </TabsTrigger>
                <TabsTrigger value="iso" className="calculator-tab">
                  <Calendar className="h-4 w-4 mr-2" />
                  ISO
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="european">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Formato Europeo (DD/MM/YYYY)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Data da Convertire (YYYY-MM-DD)
                      </label>
                      <Input
                        type="date"
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      onClick={() => handleConvert('european')} 
                      className="w-full calculator-button"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Converti in Formato Europeo
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="american">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Formato Americano (MM/DD/YYYY)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Data da Convertire (YYYY-MM-DD)
                      </label>
                      <Input
                        type="date"
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      onClick={() => handleConvert('american')} 
                      className="w-full calculator-button"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Converti in Formato Americano
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="iso">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Formato ISO (YYYY-MM-DD)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Data da Convertire (YYYY-MM-DD)
                      </label>
                      <Input
                        type="date"
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      onClick={() => handleConvert('iso')} 
                      className="w-full calculator-button"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Converti in Formato ISO
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 mt-4">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {result && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Risultato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {result.convertedDate}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Data convertita
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Dettagli della Conversione:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Data originale:</span>
                        <span className="font-medium">{result.originalDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Formato originale:</span>
                        <span className="font-medium">{result.originalFormat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data convertita:</span>
                        <span className="font-medium">{result.convertedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Formato convertito:</span>
                        <span className="font-medium">{result.convertedFormat}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
