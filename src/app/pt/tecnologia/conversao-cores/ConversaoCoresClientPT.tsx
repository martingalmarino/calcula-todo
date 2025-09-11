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
import { Palette, Calculator } from 'lucide-react'
import { convertColor, type ColorConversionResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function ConversaoCoresClientPT() {
  const [inputValue, setInputValue] = useState('')
  const [inputFormat, setInputFormat] = useState('hex')
  const [results, setResults] = useState<ColorConversionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!inputValue.trim()) {
      setError('Por favor, digite um valor de cor')
      return
    }

    try {
      const result = convertColor(inputValue.trim(), inputFormat as 'hex' | 'rgb' | 'cmyk' | 'hsl')
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao converter a cor')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Tecnologia', href: '/pt/tecnologia/' },
    { label: 'Conversão de Cores', href: '/pt/tecnologia/conversao-cores/' }
  ]

  const examples = [
    {
      label: 'Exemplo: #FF5733 (HEX)',
      values: { inputValue: '#FF5733', inputFormat: 'hex' }
    },
    {
      label: 'Exemplo: rgb(255, 87, 51)',
      values: { inputValue: 'rgb(255, 87, 51)', inputFormat: 'rgb' }
    },
    {
      label: 'Exemplo: hsl(12, 100%, 60%)',
      values: { inputValue: 'hsl(12, 100%, 60%)', inputFormat: 'hsl' }
    }
  ]

  const faqItems = [
    {
      question: 'Quais formatos de cor são suportados?',
      answer: 'Suportamos HEX (#FF5733), RGB (255, 87, 51), HSL (12, 100%, 60%) e CMYK (0, 66, 80, 0). Cada formato tem seu uso específico.'
    },
    {
      question: 'Quando usar cada formato?',
      answer: 'HEX para web, RGB para monitores, HSL para ajustes de cor, CMYK para impressão. Cada formato tem vantagens específicas.'
    },
    {
      question: 'Como funciona a conversão entre formatos?',
      answer: 'A conversão usa fórmulas matemáticas específicas para cada formato. HEX é baseado em RGB, HSL usa matiz/saturação/luminosidade, CMYK é para impressão.'
    },
    {
      question: 'Por que as cores podem parecer diferentes?',
      answer: 'Diferentes dispositivos e perfis de cor podem exibir a mesma cor de forma ligeiramente diferente. Isso é normal e esperado.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Análise de Senhas',
      href: '/pt/tecnologia/analise-senhas/'
    },
    {
      label: 'Conversão de Armazenamento',
      href: '/pt/tecnologia/conversao-armazenamento/'
    },
    {
      label: 'Outras Calculadoras de Tecnologia',
      href: '/pt/tecnologia/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Conversor de Cores',
            description: 'Converte entre formatos HEX, RGB, CMYK e HSL',
            url: '/pt/tecnologia/conversao-cores/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Conversor de Cores"
            description="Converte entre formatos HEX, RGB, CMYK e HSL"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setInputValue(values.inputValue as string)
              setInputFormat(values.inputFormat as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="inputFormat">Formato de Entrada</Label>
                  <Select value={inputFormat} onValueChange={setInputFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hex">HEX (#FF5733)</SelectItem>
                      <SelectItem value="rgb">RGB (255, 87, 51)</SelectItem>
                      <SelectItem value="hsl">HSL (12, 100%, 60%)</SelectItem>
                      <SelectItem value="cmyk">CMYK (0, 66, 80, 0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="inputValue">Valor da Cor</Label>
                  <Input
                    id="inputValue"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={inputFormat === 'hex' ? '#FF5733' : 
                               inputFormat === 'rgb' ? 'rgb(255, 87, 51)' :
                               inputFormat === 'hsl' ? 'hsl(12, 100%, 60%)' :
                               'cmyk(0, 66, 80, 0)'}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Converter Cor
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className="mt-4 bg-pink-50 border-pink-200">
                  <CardHeader>
                    <CardTitle className="text-pink-700 flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Resultado da Conversão
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Visualização da cor */}
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                      <div 
                        className="w-16 h-16 rounded-lg border-2 border-gray-300"
                        style={{ backgroundColor: results.hex }}
                      />
                      <div>
                        <p className="font-semibold">Visualização da Cor</p>
                        <p className="text-sm text-gray-600">A cor pode variar dependendo do seu dispositivo</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Palette className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">HEX</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800 font-mono">
                          {results.hex.toUpperCase()}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Palette className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">RGB</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800 font-mono">
                          rgb({results.rgb.r}, {results.rgb.g}, {results.rgb.b})
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Palette className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">HSL</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800 font-mono">
                          hsl({results.hsl.h}, {results.hsl.s}%, {results.hsl.l}%)
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Palette className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">CMYK</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800 font-mono">
                          cmyk({results.cmyk.c}, {results.cmyk.m}, {results.cmyk.y}, {results.cmyk.k})
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Validação:</strong> {results.isValid ? '✅ Cor válida' : '❌ Cor inválida'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Entrada:</strong> {inputValue}
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
