"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GraduationCap, AlertCircle } from 'lucide-react'
import { convertToGradeScale, type GradeScaleResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'

export default function ScalaDiVotiClientIT() {
  const [score, setScore] = useState('')
  const [maxScore, setMaxScore] = useState('100')
  const [results, setResults] = useState<GradeScaleResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!score) {
      setError('Inserisci il tuo punteggio')
      return
    }

    try {
      const scoreNum = parseFloat(score)
      const maxScoreNum = parseFloat(maxScore)
      
      if (isNaN(scoreNum) || isNaN(maxScoreNum)) {
        setError('Inserisci valori numerici validi')
        return
      }

      const result = convertToGradeScale(scoreNum, maxScoreNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nella conversione del punteggio')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Altre Calcolatrici', href: '/it/altre' },
    { label: 'Scala di Voti', href: '/it/altre/scala-di-voti' }
  ]

  const examples = [
    {
      label: 'Esempio: 85 punti su 100',
      values: { score: '85', maxScore: '100' }
    },
    {
      label: 'Esempio: 18 punti su 20',
      values: { score: '18', maxScore: '20' }
    }
  ]

  const faqItems = [
    {
      question: 'Come funziona la scala di voti?',
      answer: 'Converte punteggi numerici in lettere: A (90-100%), B (80-89%), C (70-79%), D (60-69%), F (<60%).'
    },
    {
      question: 'Posso cambiare il punteggio massimo?',
      answer: 'Sì, puoi regolare il punteggio massimo secondo il tuo sistema di valutazione (100, 20, 10, ecc.).'
    },
    {
      question: 'Cosa significa ogni lettera?',
      answer: 'A: Eccellente, B: Buono, C: Soddisfacente, D: Sufficiente, F: Insufficiente.'
    },
    {
      question: 'È la scala standard?',
      answer: 'Questa è una scala comune, ma alcuni sistemi educativi possono usare range diversi.'
    }
  ]

  const relatedLinks = [
    { label: 'Spesa Benzina per Viaggi', href: '/it/altre/spesa-benzina-viaggi', description: 'Calcola il costo del carburante' },
    { label: 'Contatore di Parole', href: '/it/altre/contatore-parole-caratteri', description: 'Conta parole e caratteri' },
    { label: 'Calcolatrice di Mance', href: '/it/altre/calcolatrice-mance', description: 'Calcola le mance' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Scala di Voti - Conversione A B C D F',
            description: 'Converte punteggi numerici in scala di lettere A, B, C, D, F',
            url: '/it/altre/scala-di-voti/',
            category: 'Educazione'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Scala di Voti - Conversione A B C D F"
            description="Converte punteggi numerici in scala di lettere A, B, C, D, F"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={(values) => {
              setScore(values.score as string)
              setMaxScore(values.maxScore as string)
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Scala di Voti
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Il Tuo Punteggio
                    </label>
                    <Input
                      type="number"
                      placeholder="Es: 85"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Punteggio Massimo
                    </label>
                    <Input
                      type="number"
                      placeholder="Es: 100"
                      value={maxScore}
                      onChange={(e) => setMaxScore(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Converti in Scala
                </Button>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {results && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Risultato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">
                          {results.grade}
                        </div>
                        <div className="text-lg font-semibold text-foreground mb-2">
                          {results.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {results.percentage}% del punteggio massimo
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Scala di Valutazioni:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">A:</span>
                            <span>90-100% (Eccellente)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">B:</span>
                            <span>80-89% (Buono)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">C:</span>
                            <span>70-79% (Soddisfacente)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">D:</span>
                            <span>60-69% (Sufficiente)</span>
                          </div>
                          <div className="flex justify-between col-span-2">
                            <span className="font-medium">F:</span>
                            <span>&lt;60% (Insufficiente)</span>
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
