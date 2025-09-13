"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Hash, Calculator } from 'lucide-react'
import { arabicToRoman, romanToArabic, type RomanNumeralResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'

export default function NumerosRomanosClientPT() {
  const [input, setInput] = useState('')
  const [conversionType, setConversionType] = useState('arabic-to-roman')
  const [results, setResults] = useState<RomanNumeralResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!input.trim()) {
      setError('Por favor, digite um valor para converter')
      return
    }

    try {
      let result: RomanNumeralResult
      
      if (conversionType === 'arabic-to-roman') {
        const num = parseInt(input.trim())
        if (isNaN(num) || num < 1 || num > 3999) {
          setError('Por favor, digite um número entre 1 e 3999')
          return
        }
        result = arabicToRoman(num)
      } else {
        result = romanToArabic(input.trim().toUpperCase())
      }
      
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao converter o número')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Outras', href: '/pt/outras/' },
    { label: 'Números Romanos', href: '/pt/outras/numeros-romanos/' }
  ]

  const examples = [
    {
      label: 'Exemplo: 2024 para romano',
      values: { input: '2024', conversionType: 'arabic-to-roman' }
    },
    {
      label: 'Exemplo: MMXXIV para arábico',
      values: { input: 'MMXXIV', conversionType: 'roman-to-arabic' }
    },
    {
      label: 'Exemplo: 1999 para romano',
      values: { input: '1999', conversionType: 'arabic-to-roman' }
    }
  ]

  const faqItems = [
    {
      question: 'Como funciona a conversão de números romanos?',
      answer: 'O conversor pode converter números arábicos (1, 2, 3...) para romanos (I, II, III...) e vice-versa. Suporta números de 1 a 3999.'
    },
    {
      question: 'Quais são os símbolos romanos básicos?',
      answer: 'I (1), V (5), X (10), L (50), C (100), D (500), M (1000). Os números são formados combinando estes símbolos seguindo regras específicas.'
    },
    {
      question: 'Como são formados os números romanos?',
      answer: 'Os números são formados adicionando valores (ex: VI = 6) ou subtraindo quando um símbolo menor aparece antes de um maior (ex: IV = 4).'
    },
    {
      question: 'Existe limite para a conversão?',
      answer: 'Sim, o conversor suporta números de 1 a 3999, que é o limite prático do sistema de numeração romana tradicional.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadora de Matemática',
      href: '/pt/matematicas/'
    },
    {
      label: 'Outras Calculadoras',
      href: '/pt/outras/'
    },
    {
      label: 'Calculadoras Curiosas',
      href: '/pt/curiosas/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Conversor de Números Romanos',
            description: 'Converte números arábicos para romanos e vice-versa',
            url: '/pt/outras/numeros-romanos/',
            category: 'Matemática'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsPT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Conversor de Números Romanos"
            description="Converte números arábicos para romanos e vice-versa"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setInput(values.input as string)
              setConversionType(values.conversionType as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="conversionType">Tipo de Conversão</Label>
                <Select value={conversionType} onValueChange={setConversionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de conversão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arabic-to-roman">Arábico para Romano</SelectItem>
                    <SelectItem value="roman-to-arabic">Romano para Arábico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="input">
                  {conversionType === 'arabic-to-roman' ? 'Número Arábico (1-3999)' : 'Número Romano'}
                </Label>
                <Input
                  id="input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={conversionType === 'arabic-to-roman' ? 'Ex: 2024' : 'Ex: MMXXIV'}
                />
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Converter
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className="mt-4 bg-indigo-50 border-indigo-200">
                  <CardHeader>
                    <CardTitle className="text-indigo-700 flex items-center gap-2">
                      <Hash className="h-5 w-5" />
                      Resultado da Conversão
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Número Romano</span>
                        </div>
                        <p className="text-3xl font-bold text-indigo-600">{results.roman}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Número Arábico</span>
                        </div>
                        <p className="text-3xl font-bold text-green-600">{results.arabic}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Validação:</strong> {results.isValid ? '✅ Número válido' : '❌ Número inválido'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Entrada:</strong> {input}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
