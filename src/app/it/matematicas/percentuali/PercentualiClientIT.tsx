"use client"

import { useState } from 'react'
import { Calculator, Percent, TrendingUp, TrendingDown } from 'lucide-react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { jsonLdCalculator } from '@/lib/seo'
import { 
  percentageOfNumber,
  percentageOf,
  variationPercent,
  originalValueAfterIncrease,
  type PercentageResult
} from '@/lib/math/percentage'

export default function PercentualiClientIT() {
  const [activeTab, setActiveTab] = useState('basic')
  const [results, setResults] = useState<PercentageResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Stati per ogni tipo di calcolo
  const [basicInputs, setBasicInputs] = useState({ value: '', percentage: '' })
  const [ofInputs, setOfInputs] = useState({ part: '', total: '' })
  const [changeInputs, setChangeInputs] = useState({ original: '', final: '' })
  const [originalInputs, setOriginalInputs] = useState({ final: '', percentage: '' })

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Matematica', href: '/it/matematicas' },
    { label: 'Percentuali', href: '/it/matematicas/percentuali' }
  ]

  const examples = [
    {
      label: 'Esempio: 25% di 200',
      values: { value: '200', percentage: '25' }
    },
    {
      label: 'Esempio: 50 è il 20% di quanto?',
      values: { final: '50', percentage: '20' }
    }
  ]

  const faqItems = [
    {
      question: 'Come si calcola una percentuale?',
      answer: 'Per calcolare una percentuale, moltiplica il valore per la percentuale e dividi per 100. Formula: (valore × percentuale) ÷ 100'
    },
    {
      question: 'Come si calcola la percentuale di un numero?',
      answer: 'Per calcolare la percentuale di un numero, dividi la parte per il totale e moltiplica per 100. Formula: (parte ÷ totale) × 100'
    },
    {
      question: 'Come si calcola la variazione percentuale?',
      answer: 'Per calcolare la variazione percentuale, sottrai il valore originale dal valore finale, dividi per il valore originale e moltiplica per 100.'
    }
  ]

  const handleBasicCalculation = () => {
    setError(null)
    try {
      const value = parseFloat(basicInputs.value)
      const percentage = parseFloat(basicInputs.percentage)
      
      if (isNaN(value) || isNaN(percentage)) {
        setError('Inserisci valori numerici validi')
        return
      }

      const result = percentageOfNumber(percentage, value)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo')
    }
  }

  const handleOfCalculation = () => {
    setError(null)
    try {
      const part = parseFloat(ofInputs.part)
      const total = parseFloat(ofInputs.total)
      
      if (isNaN(part) || isNaN(total) || total === 0) {
        setError('Inserisci valori numerici validi')
        return
      }

      const result = percentageOf(part, total)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo')
    }
  }

  const handleChangeCalculation = () => {
    setError(null)
    try {
      const original = parseFloat(changeInputs.original)
      const final = parseFloat(changeInputs.final)
      
      if (isNaN(original) || isNaN(final) || original === 0) {
        setError('Inserisci valori numerici validi')
        return
      }

      const result = variationPercent(original, final)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo')
    }
  }

  const handleOriginalCalculation = () => {
    setError(null)
    try {
      const final = parseFloat(originalInputs.final)
      const percentage = parseFloat(originalInputs.percentage)
      
      if (isNaN(final) || isNaN(percentage)) {
        setError('Inserisci valori numerici validi')
        return
      }

      const result = originalValueAfterIncrease(final, percentage)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel calcolo')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice di Percentuali - Calcoli Percentuali Online',
            description: 'Calcola percentuali, sconti, aumenti e variazioni percentuali online. Risultati precisi e spiegazioni dettagliate.',
            url: '/it/matematicas/percentuali/',
            category: 'Matematica'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice di Percentuali - Calcoli Percentuali Online"
            description="Calcola percentuali, sconti, aumenti e variazioni percentuali online. Risultati precisi e spiegazioni dettagliate."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              if (values.value && values.percentage) {
                setBasicInputs({ value: values.value as string, percentage: values.percentage as string })
                setActiveTab('basic')
              } else if (values.final && values.percentage) {
                setOriginalInputs({ final: values.final as string, percentage: values.percentage as string })
                setActiveTab('original')
              }
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  Calcolatrice di Percentuali
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">Percentuale di</TabsTrigger>
                    <TabsTrigger value="of">X è % di Y</TabsTrigger>
                    <TabsTrigger value="change">Variazione %</TabsTrigger>
                    <TabsTrigger value="original">Valore Originale</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Valore</label>
                        <Input
                          type="number"
                          placeholder="Es: 200"
                          value={basicInputs.value}
                          onChange={(e) => setBasicInputs(prev => ({ ...prev, value: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Percentuale (%)</label>
                        <Input
                          type="number"
                          placeholder="Es: 25"
                          value={basicInputs.percentage}
                          onChange={(e) => setBasicInputs(prev => ({ ...prev, percentage: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button onClick={handleBasicCalculation} className="w-full calculator-button">
                      <Calculator className="h-4 w-4 mr-2" />
                      Calcolare
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="of" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Parte</label>
                        <Input
                          type="number"
                          placeholder="Es: 50"
                          value={ofInputs.part}
                          onChange={(e) => setOfInputs(prev => ({ ...prev, part: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Totale</label>
                        <Input
                          type="number"
                          placeholder="Es: 200"
                          value={ofInputs.total}
                          onChange={(e) => setOfInputs(prev => ({ ...prev, total: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button onClick={handleOfCalculation} className="w-full calculator-button">
                      <Percent className="h-4 w-4 mr-2" />
                      Calcolare
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="change" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Valore Originale</label>
                        <Input
                          type="number"
                          placeholder="Es: 100"
                          value={changeInputs.original}
                          onChange={(e) => setChangeInputs(prev => ({ ...prev, original: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Valore Finale</label>
                        <Input
                          type="number"
                          placeholder="Es: 120"
                          value={changeInputs.final}
                          onChange={(e) => setChangeInputs(prev => ({ ...prev, final: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button onClick={handleChangeCalculation} className="w-full calculator-button">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Calcolare
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="original" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Valore Finale</label>
                        <Input
                          type="number"
                          placeholder="Es: 50"
                          value={originalInputs.final}
                          onChange={(e) => setOriginalInputs(prev => ({ ...prev, final: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Percentuale (%)</label>
                        <Input
                          type="number"
                          placeholder="Es: 20"
                          value={originalInputs.percentage}
                          onChange={(e) => setOriginalInputs(prev => ({ ...prev, percentage: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button onClick={handleOriginalCalculation} className="w-full calculator-button">
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Calcolare
                    </Button>
                  </TabsContent>
                </Tabs>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}

                {results && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Risultato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {results.result.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          Formula: {results.formula}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {results.steps.join(' → ')}
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
