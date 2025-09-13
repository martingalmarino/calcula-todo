"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { HardDrive, AlertCircle, Info } from 'lucide-react'
import { convertStorage, type StorageConversionResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function ConversioneArchiviazioneClientIT() {
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('GB')
  const [toUnit, setToUnit] = useState('MB')
  const [base, setBase] = useState<'decimal' | 'binary'>('decimal')
  const [result, setResult] = useState<StorageConversionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const storageUnits = [
    { value: 'B', label: 'Byte (B)' },
    { value: 'KB', label: 'Kilobyte (KB)' },
    { value: 'MB', label: 'Megabyte (MB)' },
    { value: 'GB', label: 'Gigabyte (GB)' },
    { value: 'TB', label: 'Terabyte (TB)' },
    { value: 'PB', label: 'Petabyte (PB)' }
  ]

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (!value) {
      setError('Inserisci un valore da convertire')
      return
    }

    try {
      const valueNum = parseFloat(value)
      if (isNaN(valueNum) || valueNum < 0) {
        setError('Inserisci un valore numerico valido e positivo')
        return
      }

      const conversionResult = convertStorage(valueNum, fromUnit, toUnit, base)
      setResult(conversionResult)
    } catch {
      setError('Errore nella conversione. Verifica i valori inseriti.')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Tecnologia', href: '/it/tecnologia' },
    { label: 'Conversione di Archiviazione', href: '/it/tecnologia/conversione-archiviazione' }
  ]

  const examples = [
    {
      label: 'Converti 1 GB in MB (sistema decimale)',
      values: { value: '1', fromUnit: 'GB', toUnit: 'MB', base: 'decimal' }
    },
    {
      label: 'Converti 1024 MB in GB (sistema binario)',
      values: { value: '1024', fromUnit: 'MB', toUnit: 'GB', base: 'binary' }
    },
    {
      label: 'Converti 500 GB in TB',
      values: { value: '500', fromUnit: 'GB', toUnit: 'TB', base: 'decimal' }
    }
  ]

  const faqItems = [
    {
      question: 'Qual è la differenza tra sistema decimale e binario?',
      answer: 'Il sistema decimale usa 1000 come base (1 GB = 1000 MB), mentre il sistema binario usa 1024 (1 GB = 1024 MB). I produttori di hard disk usano il decimale, mentre i sistemi operativi usano il binario.'
    },
    {
      question: 'Quale sistema dovrei usare?',
      answer: 'Usa il sistema decimale per calcoli di marketing e specifiche dei produttori. Usa il sistema binario per calcoli di sistema operativo e programmazione.'
    },
    {
      question: 'Perché c\'è confusione tra GB e GiB?',
      answer: 'GB (Gigabyte) usa il sistema decimale, mentre GiB (Gibibyte) usa il sistema binario. Questa distinzione aiuta a chiarire quale standard viene utilizzato.'
    },
    {
      question: 'Come converto file di grandi dimensioni?',
      answer: 'Per file molto grandi, usa unità più grandi come TB o PB. La calcolatrice supporta conversioni fino a Petabyte per gestire anche i dataset più grandi.'
    }
  ]

  const relatedLinks = [
    { label: 'Velocità di Download', href: '/it/tecnologia/velocita-download', description: 'Calcola il tempo di download' },
    { label: 'Uptime/Downtime', href: '/it/tecnologia/uptime-downtime', description: 'Calcola uptime e downtime' },
    { label: 'Analisi della Latenza', href: '/it/tecnologia/analisi-latenza', description: 'Analizza la latenza di rete' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setValue(values.value as string)
    setFromUnit(values.fromUnit as string)
    setToUnit(values.toUnit as string)
    setBase(values.base as 'decimal' | 'binary')
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Conversione di Archiviazione',
            description: 'Converte tra diverse unità di archiviazione (KB, MB, GB, TB) usando sistemi decimali e binari',
            url: '/it/tecnologia/conversione-archiviazione/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Conversione di Archiviazione"
            description="Converte tra diverse unità di archiviazione (KB, MB, GB, TB) usando sistemi decimali e binari"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  Conversione di Archiviazione
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Valore da Convertire
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Es: 1"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Sistema di Conversione
                    </label>
                    <Select value={base} onValueChange={(value) => setBase(value as 'decimal' | 'binary')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="decimal">Decimale (1000)</SelectItem>
                        <SelectItem value="binary">Binario (1024)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Da Unità
                    </label>
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {storageUnits.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      A Unità
                    </label>
                    <Select value={toUnit} onValueChange={setToUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {storageUnits.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <HardDrive className="h-4 w-4 mr-2" />
                  Converti
                </Button>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {result && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Risultato della Conversione</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {result.convertedValue.toLocaleString()} {result.toUnit}
                        </div>
                        <div className="text-lg font-semibold text-foreground mb-2">
                          {result.value} {result.fromUnit} = {result.convertedValue.toLocaleString()} {result.toUnit}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Sistema {result.base === 'decimal' ? 'Decimale (1000)' : 'Binario (1024)'}
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli della Conversione:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Valore Originale:</span>
                            <span className="font-medium">{result.value} {result.fromUnit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Valore Convertito:</span>
                            <span className="font-medium">{result.convertedValue.toLocaleString()} {result.toUnit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sistema:</span>
                            <span className="font-medium">{result.base === 'decimal' ? 'Decimale' : 'Binario'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Base:</span>
                            <span className="font-medium">{result.base === 'decimal' ? '1000' : '1024'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Informazione:</p>
                            <p>{result.comparison}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
