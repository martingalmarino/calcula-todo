"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Hash } from 'lucide-react'
import { arabicToRoman, romanToArabic, type RomanNumeralResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function RoemischeZahlenClientDE() {
  const [inputValue, setInputValue] = useState<string>('')
  const [conversionType, setConversionType] = useState<string>('arabic-to-roman')
  const [result, setResult] = useState<RomanNumeralResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (!inputValue.trim()) {
      setError('Bitte geben Sie einen Wert ein')
      return
    }

    try {
      if (conversionType === 'arabic-to-roman') {
        const num = parseInt(inputValue)
        if (isNaN(num)) {
          setError('Bitte geben Sie eine gültige arabische Zahl ein')
          return
        }
        if (num <= 0 || num > 3999) {
          setError('Arabische Zahlen müssen zwischen 1 und 3999 liegen')
          return
        }
        const result = arabicToRoman(num)
        setResult(result)
      } else {
        const result = romanToArabic(inputValue)
        if (!result.isValid) {
          setError('Bitte geben Sie eine gültige römische Zahl ein')
          return
        }
        setResult(result)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler bei der Konvertierung')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setInputValue(values.inputValue as string)
    setConversionType(values.conversionType as string)
    setResult(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbs('/de/andere/roemische-zahlen')

  const examples = [
    {
      label: 'Beispiel: 2024 zu römisch',
      values: { inputValue: '2024', conversionType: 'arabic-to-roman' }
    },
    {
      label: 'Beispiel: MMXXIV zu arabisch',
      values: { inputValue: 'MMXXIV', conversionType: 'roman-to-arabic' }
    },
    {
      label: 'Beispiel: 1999 zu römisch',
      values: { inputValue: '1999', conversionType: 'arabic-to-roman' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie funktionieren römische Zahlen?',
      answer: 'Römische Zahlen verwenden Buchstaben: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Kleinere Zahlen vor größeren werden subtrahiert (z.B. IV=4, IX=9).'
    },
    {
      question: 'Welcher Bereich wird unterstützt?',
      answer: 'Arabische Zahlen von 1 bis 3999 können in römische Zahlen konvertiert werden. Größere Zahlen werden nicht unterstützt.'
    },
    {
      question: 'Wie werden römische Zahlen gelesen?',
      answer: 'Von links nach rechts. Wenn eine kleinere Zahl vor einer größeren steht, wird sie subtrahiert. Sonst wird addiert.'
    },
    {
      question: 'Wo werden römische Zahlen heute verwendet?',
      answer: 'In Uhren, Büchern (Kapitel), Filmen (Jahreszahlen), Monumenten und in der Mathematik für bestimmte Notationen.'
    }
  ]

  const romanSymbols = [
    { symbol: 'I', value: 1 },
    { symbol: 'V', value: 5 },
    { symbol: 'X', value: 10 },
    { symbol: 'L', value: 50 },
    { symbol: 'C', value: 100 },
    { symbol: 'D', value: 500 },
    { symbol: 'M', value: 1000 }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Römische Zahlen - Konvertierung Online',
            description: 'Konvertieren Sie zwischen arabischen und römischen Zahlen',
            url: '/de/andere/roemische-zahlen/',
            category: 'Mathematik'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Römische Zahlen - Konvertierung Online"
            description="Konvertieren Sie zwischen arabischen und römischen Zahlen. Von 1 bis 3999 - perfekt für Geschichte, Mathematik und Bildung."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="conversionType">Konvertierungstyp</Label>
                <Select value={conversionType} onValueChange={setConversionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wählen Sie den Konvertierungstyp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arabic-to-roman">Arabisch → Römisch</SelectItem>
                    <SelectItem value="roman-to-arabic">Römisch → Arabisch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="inputValue">
                  {conversionType === 'arabic-to-roman' ? 'Arabische Zahl' : 'Römische Zahl'}
                </Label>
                <Input
                  id="inputValue"
                  type={conversionType === 'arabic-to-roman' ? 'number' : 'text'}
                  placeholder={conversionType === 'arabic-to-roman' ? 'z.B. 2024' : 'z.B. MMXXIV'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                {conversionType === 'arabic-to-roman' && (
                  <p className="text-sm text-gray-500 mt-1">
                    Geben Sie eine Zahl zwischen 1 und 3999 ein
                  </p>
                )}
                {conversionType === 'roman-to-arabic' && (
                  <p className="text-sm text-gray-500 mt-1">
                    Verwenden Sie die Buchstaben: I, V, X, L, C, D, M
                  </p>
                )}
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Hash className="h-4 w-4" />
                  Konvertieren
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {result && result.isValid && (
                <Card className="mt-4 bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center gap-2">
                      <Hash className="h-5 w-5" />
                      Konvertierungsergebnis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-purple-600 mb-2">
                        {conversionType === 'arabic-to-roman' ? result.roman : result.arabic}
                      </div>
                      <div className="text-lg text-gray-600">
                        {conversionType === 'arabic-to-roman' 
                          ? `Römische Zahl für ${result.arabic}`
                          : `Arabische Zahl für ${result.roman}`
                        }
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
                      <h4 className="font-medium mb-3 text-center">Römische Zahlensymbole:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        {romanSymbols.map((symbol) => (
                          <div key={symbol.symbol} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="font-medium text-purple-800">{symbol.symbol}:</span>
                            <span className="text-gray-700">{symbol.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">📚 Wissenswertes über römische Zahlen</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <p>• <strong>Subtraktionsregel:</strong> IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900</p>
                        <p>• <strong>Additionsregel:</strong> VI = 6, XI = 11, LX = 60, CX = 110, DC = 600, MC = 1100</p>
                        <p>• <strong>Geschichte:</strong> Entstanden im antiken Rom, verwendet bis ins Mittelalter</p>
                        <p>• <strong>Heutige Verwendung:</strong> Uhren, Bücher, Filme, Monumente</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
