"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import { calculatePaFi, PaFiResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbsIT } from '@/lib/breadcrumbs-it'

export default function PafiClientIT() {
  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')
  const [heartRate, setHeartRate] = useState('')
  const [result, setResult] = useState<PaFiResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    const systolicNum = parseInt(systolic)
    const diastolicNum = parseInt(diastolic)
    const heartRateNum = parseInt(heartRate)
    
    if (!systolic || !diastolic || !heartRate) {
      setError('Inserisci tutti i valori richiesti')
      return
    }
    
    if (systolicNum <= 0 || diastolicNum <= 0 || heartRateNum <= 0) {
      setError('Tutti i valori devono essere positivi')
      return
    }
    
    if (systolicNum < 70 || systolicNum > 250) {
      setError('La pressione sistolica deve essere tra 70 e 250 mmHg')
      return
    }
    
    if (diastolicNum < 40 || diastolicNum > 150) {
      setError('La pressione diastolica deve essere tra 40 e 150 mmHg')
      return
    }
    
    if (heartRateNum < 40 || heartRateNum > 200) {
      setError('La frequenza cardiaca deve essere tra 40 e 200 bpm')
      return
    }
    
    if (systolicNum <= diastolicNum) {
      setError('La pressione sistolica deve essere maggiore della diastolica')
      return
    }
    
    try {
      const pafiResult = calculatePaFi(systolicNum, diastolicNum, heartRateNum)
      setResult(pafiResult)
    } catch {
      setError('Errore nel calcolo dell\'indice PaFi')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.systolic) setSystolic(example.systolic as string)
    if (example.diastolic) setDiastolic(example.diastolic as string)
    if (example.heartRate) setHeartRate(example.heartRate as string)
  }

  const breadcrumbs = getBreadcrumbsIT('/it/salute/pafi')

  const examples = [
    { label: 'Pressione Normale', values: { systolic: '120', diastolic: '80', heartRate: '70' } },
    { label: 'Ipertensione', values: { systolic: '140', diastolic: '90', heartRate: '75' } },
    { label: 'Ipotensione', values: { systolic: '100', diastolic: '60', heartRate: '65' } },
    { label: 'Tachicardia', values: { systolic: '130', diastolic: '85', heartRate: '100' } }
  ]

  const faqItems = [
    {
      question: 'Cos\'è l\'indice PaFi?',
      answer: 'L\'indice PaFi (Pressione arteriosa/Frequenza cardiaca) è un indicatore che valuta la funzione cardiovascolare combinando pressione arteriosa e frequenza cardiaca.'
    },
    {
      question: 'Come viene calcolato?',
      answer: 'L\'indice PaFi si calcola dividendo la pressione arteriosa media (PAM) per la frequenza cardiaca. La PAM si calcola come: (pressione sistolica + 2 × pressione diastolica) / 3.'
    },
    {
      question: 'Cosa indicano i valori?',
      answer: 'Valori normali dell\'indice PaFi sono generalmente tra 0.8 e 1.2. Valori più alti possono indicare ipertensione, mentre valori più bassi possono suggerire ipotensione o tachicardia.'
    },
    {
      question: 'È un indicatore diagnostico?',
      answer: 'L\'indice PaFi è un indicatore di screening, non un test diagnostico. Per una valutazione completa della salute cardiovascolare, consulta sempre un medico.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice PaFi - Indice Cardiovascolare',
            description: 'Calcola l\'indice PaFi per valutare la funzione cardiovascolare',
            url: '/it/salute/pafi/',
            category: 'Salute'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice PaFi"
            description="Calcola l'indice PaFi per valutare la funzione cardiovascolare"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Calcolatrice PaFi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="systolic" className="block text-sm font-medium text-gray-700 mb-2">
              Pressione Sistolica (mmHg)
            </label>
            <Input
              id="systolic"
              type="number"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              placeholder="Es. 120"
              min="70"
              max="250"
            />
          </div>
          <div>
            <label htmlFor="diastolic" className="block text-sm font-medium text-gray-700 mb-2">
              Pressione Diastolica (mmHg)
            </label>
            <Input
              id="diastolic"
              type="number"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              placeholder="Es. 80"
              min="40"
              max="150"
            />
          </div>
          <div>
            <label htmlFor="heartRate" className="block text-sm font-medium text-gray-700 mb-2">
              Frequenza Cardiaca (bpm)
            </label>
            <Input
              id="heartRate"
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              placeholder="Es. 70"
              min="40"
              max="200"
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full bg-sky-600 hover:bg-sky-700 text-white border border-sky-600 rounded-[10px]">
          Calcola Indice PaFi
        </Button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risultato Indice PaFi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {result.pafi.toFixed(2)}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {result.category}
                </div>
                <div className="text-gray-600 mb-4">
                  {result.description}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Informazioni:</h4>
                <p className="text-blue-800">{result.interpretation}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Pressione sistolica:</span>
                  <span className="font-medium">{systolic} mmHg</span>
                </div>
                <div className="flex justify-between">
                  <span>Pressione diastolica:</span>
                  <span className="font-medium">{diastolic} mmHg</span>
                </div>
                <div className="flex justify-between">
                  <span>Frequenza cardiaca:</span>
                  <span className="font-medium">{heartRate} bpm</span>
                </div>
                <div className="flex justify-between">
                  <span>Indice PaFi:</span>
                  <span className="font-medium">{result.pafi.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valutazione:</span>
                  <span className="font-medium">{result.category}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
              </div>
            </CardContent>
          </Card>
        </CalculatorLayout>
      </div>
    </Container>
  </>
)
}
