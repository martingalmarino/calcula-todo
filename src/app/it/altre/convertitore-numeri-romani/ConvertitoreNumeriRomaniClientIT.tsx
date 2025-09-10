"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Hash, AlertCircle, ArrowRightLeft } from 'lucide-react'
import { arabicToRoman, romanToArabic, type RomanNumeralResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'

export default function ConvertitoreNumeriRomaniClientIT() {
  const [arabicInput, setArabicInput] = useState('')
  const [romanInput, setRomanInput] = useState('')
  const [conversionType, setConversionType] = useState<'arabic-to-roman' | 'roman-to-arabic'>('arabic-to-roman')
  const [result, setResult] = useState<RomanNumeralResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleArabicToRoman = () => {
    setError(null)
    setResult(null)
    
    if (!arabicInput) {
      setError('Inserisci un numero arabo')
      return
    }

    try {
      const num = parseInt(arabicInput)
      if (isNaN(num)) {
        setError('Inserisci un numero valido')
        return
      }

      const conversionResult = arabicToRoman(num)
      setResult(conversionResult)
      
      if (!conversionResult.isValid) {
        setError('Il numero deve essere compreso tra 1 e 3999')
      }
    } catch {
      setError('Errore nella conversione')
    }
  }

  const handleRomanToArabic = () => {
    setError(null)
    setResult(null)
    
    if (!romanInput) {
      setError('Inserisci un numero romano')
      return
    }

    try {
      const conversionResult = romanToArabic(romanInput)
      setResult(conversionResult)
      
      if (!conversionResult.isValid) {
        setError('Numero romano non valido. Usa solo I, V, X, L, C, D, M')
      }
    } catch {
      setError('Errore nella conversione')
    }
  }

  const handleConvert = () => {
    if (conversionType === 'arabic-to-roman') {
      handleArabicToRoman()
    } else {
      handleRomanToArabic()
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Altre Calcolatrici', href: '/it/altre' },
    { label: 'Convertitore di Numeri Romani', href: '/it/altre/convertitore-numeri-romani' }
  ]

  const examples = [
    {
      label: 'Converti 2024 in romano',
      values: { arabicInput: '2024', conversionType: 'arabic-to-roman' },
      type: 'arabic-to-roman' as const
    },
    {
      label: 'Converti MMXXIV in arabo',
      values: { romanInput: 'MMXXIV', conversionType: 'roman-to-arabic' },
      type: 'roman-to-arabic' as const
    },
    {
      label: 'Converti 3999 in romano',
      values: { arabicInput: '3999', conversionType: 'arabic-to-roman' },
      type: 'arabic-to-roman' as const
    }
  ]

  const faqItems = [
    {
      question: 'Quali numeri posso convertire?',
      answer: 'Puoi convertire numeri arabi da 1 a 3999 in numeri romani e viceversa. I numeri romani usano le lettere I, V, X, L, C, D, M.'
    },
    {
      question: 'Come funzionano i numeri romani?',
      answer: 'I numeri romani usano un sistema additivo e sottrattivo. I simboli si sommano, ma se un simbolo più piccolo precede uno più grande, viene sottratto.'
    },
    {
      question: 'Quali sono i simboli romani?',
      answer: 'I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000. I numeri 4, 9, 40, 90, 400, 900 usano la notazione sottrattiva.'
    },
    {
      question: 'Perché il limite è 3999?',
      answer: 'Il sistema romano tradizionale non ha simboli per numeri superiori a 3999. Per numeri più grandi si usano convenzioni moderne come M̄ per 1000.'
    }
  ]

  const relatedLinks = [
    { label: 'Scala di Voti', href: '/it/altre/scala-di-voti', description: 'Converte punteggi in lettere' },
    { label: 'Contatore di Parole', href: '/it/altre/contatore-parole-caratteri', description: 'Conta parole e caratteri' },
    { label: 'Calcolatrice di Mance', href: '/it/altre/calcolatrice-mance', description: 'Calcola le mance' }
  ]

  const handleExampleClick = (values: Record<string, unknown>, type: 'arabic-to-roman' | 'roman-to-arabic') => {
    setConversionType(type)
    if (type === 'arabic-to-roman') {
      setArabicInput(values.arabicInput as string)
      setRomanInput('')
    } else {
      setRomanInput(values.romanInput as string)
      setArabicInput('')
    }
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Convertitore di Numeri Romani',
            description: 'Converte numeri arabi in romani e viceversa',
            url: '/it/altre/convertitore-numeri-romani/',
            category: 'Conversione'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Convertitore di Numeri Romani"
            description="Converte numeri arabi in romani e viceversa"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={(values) => handleExampleClick(values, values.type as 'arabic-to-roman' | 'roman-to-arabic')}
          >
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Convertitore di Numeri Romani
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Button
                      variant={conversionType === 'arabic-to-roman' ? 'default' : 'outline'}
                      onClick={() => {
                        setConversionType('arabic-to-roman')
                        setRomanInput('')
                        setResult(null)
                        setError(null)
                      }}
                      className="w-full"
                    >
                      <ArrowRightLeft className="h-4 w-4 mr-2" />
                      Arabo → Romano
                    </Button>
                    <Button
                      variant={conversionType === 'roman-to-arabic' ? 'default' : 'outline'}
                      onClick={() => {
                        setConversionType('roman-to-arabic')
                        setArabicInput('')
                        setResult(null)
                        setError(null)
                      }}
                      className="w-full"
                    >
                      <ArrowRightLeft className="h-4 w-4 mr-2" />
                      Romano → Arabo
                    </Button>
                  </div>

                  {conversionType === 'arabic-to-roman' ? (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Numero Arabo (1-3999)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="3999"
                        placeholder="Es: 2024"
                        value={arabicInput}
                        onChange={(e) => setArabicInput(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Numero Romano
                      </label>
                      <Input
                        type="text"
                        placeholder="Es: MMXXIV"
                        value={romanInput}
                        onChange={(e) => setRomanInput(e.target.value.toUpperCase())}
                        className="w-full"
                      />
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleConvert} 
                    className="w-full calculator-button"
                  >
                    <Hash className="h-4 w-4 mr-2" />
                    Converti
                  </Button>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  {result && result.isValid && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle className="text-lg">Risultato della Conversione</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-blue-600 mb-2">
                            {conversionType === 'arabic-to-roman' ? result.roman : result.arabic}
                          </div>
                          <div className="text-lg font-semibold text-foreground mb-2">
                            {conversionType === 'arabic-to-roman' ? 'Numero Romano' : 'Numero Arabo'}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium mb-2">Dettagli della Conversione:</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex justify-between">
                              <span>Numero Arabo:</span>
                              <span className="font-medium">{result.arabic}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Numero Romano:</span>
                              <span className="font-medium">{result.roman}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Simboli Romani</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">I</div>
                      <div className="text-blue-800">1</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">V</div>
                      <div className="text-green-800">5</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">X</div>
                      <div className="text-purple-800">10</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">L</div>
                      <div className="text-orange-800">50</div>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">C</div>
                      <div className="text-red-800">100</div>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">D</div>
                      <div className="text-indigo-800">500</div>
                    </div>
                    <div className="text-center p-3 bg-pink-50 rounded-lg">
                      <div className="text-2xl font-bold text-pink-600">M</div>
                      <div className="text-pink-800">1000</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-600">IV</div>
                      <div className="text-gray-800">4</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
