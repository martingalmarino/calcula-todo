"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Hash, AlertCircle } from 'lucide-react'
import { arabicToRoman, romanToArabic, type RomanNumeralResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function NumerosRomanosClient() {
  const [arabicNumber, setArabicNumber] = useState('')
  const [romanNumber, setRomanNumber] = useState('')
  const [arabicResult, setArabicResult] = useState<RomanNumeralResult | null>(null)
  const [romanResult, setRomanResult] = useState<RomanNumeralResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleArabicToRoman = () => {
    setError(null)
    
    if (!arabicNumber) {
      setError('Por favor, ingresa un número arábigo')
      return
    }

    try {
      const num = parseInt(arabicNumber)
      if (isNaN(num)) {
        setError('Por favor, ingresa un número válido')
        return
      }

      const result = arabicToRoman(num)
      setArabicResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al convertir el número')
    }
  }

  const handleRomanToArabic = () => {
    setError(null)
    
    if (!romanNumber) {
      setError('Por favor, ingresa un número romano')
      return
    }

    try {
      const result = romanToArabic(romanNumber)
      setRomanResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al convertir el número romano')
    }
  }

  const breadcrumbs = getBreadcrumbs('/otras/numeros-romanos')

  const examples = [
    {
      label: 'Ejemplo: 2024 → MMXXIV',
      values: { arabicNumber: '2024' }
    },
    {
      label: 'Ejemplo: MMXXIV → 2024',
      values: { romanNumber: 'MMXXIV' }
    }
  ]

  const faqItems = [
    {
      question: '¿Cuáles son los símbolos romanos?',
      answer: 'I (1), V (5), X (10), L (50), C (100), D (500), M (1000).'
    },
    {
      question: '¿Cómo funcionan los números romanos?',
      answer: 'Se suman los valores de izquierda a derecha, excepto cuando un símbolo menor precede a uno mayor (se resta).'
    },
    {
      question: '¿Cuál es el rango válido?',
      answer: 'Los números romanos van del 1 al 3999. Números mayores no tienen representación estándar.'
    },
    {
      question: '¿Qué pasa con números inválidos?',
      answer: 'Si ingresas un número romano inválido, la herramienta te indicará que no es válido.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Conversor de Números Romanos - Romano a Arábigo',
            description: 'Convierte entre números arábigos y romanos',
            url: '/otras/numeros-romanos/',
            category: 'Herramientas de Conversión'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Conversor de Números Romanos - Romano a Arábigo"
            description="Convierte entre números arábigos y romanos"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              if (values.arabicNumber) {
                setArabicNumber(values.arabicNumber as string)
              }
              if (values.romanNumber) {
                setRomanNumber(values.romanNumber as string)
              }
            }}
          >
            <Tabs defaultValue="arabic-to-roman" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="arabic-to-roman">Arábigo → Romano</TabsTrigger>
                <TabsTrigger value="roman-to-arabic">Romano → Arábigo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="arabic-to-roman">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="h-5 w-5" />
                      Convertir Arábigo a Romano
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Número Arábigo (1-3999)
                      </label>
                      <Input
                        type="number"
                        placeholder="Ej: 2024"
                        value={arabicNumber}
                        onChange={(e) => setArabicNumber(e.target.value)}
                        className="w-full"
                        min="1"
                        max="3999"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleArabicToRoman} 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Hash className="h-4 w-4 mr-2" />
                      Convertir a Romano
                    </Button>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    {arabicResult && (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle className="text-lg">Resultado</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {arabicResult.isValid ? (
                            <div className="text-center">
                              <div className="text-3xl font-bold text-red-600 mb-2">
                                {arabicResult.roman}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {arabicResult.arabic} en números romanos
                              </div>
                            </div>
                          ) : (
                            <div className="text-center text-red-600">
                              <p>Número fuera del rango válido (1-3999)</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="roman-to-arabic">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="h-5 w-5" />
                      Convertir Romano a Arábigo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Número Romano
                      </label>
                      <Input
                        type="text"
                        placeholder="Ej: MMXXIV"
                        value={romanNumber}
                        onChange={(e) => setRomanNumber(e.target.value.toUpperCase())}
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleRomanToArabic} 
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Hash className="h-4 w-4 mr-2" />
                      Convertir a Arábigo
                    </Button>

                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}

                    {romanResult && (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle className="text-lg">Resultado</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {romanResult.isValid ? (
                            <div className="text-center">
                              <div className="text-3xl font-bold text-red-600 mb-2">
                                {romanResult.arabic}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {romanResult.roman} en números arábigos
                              </div>
                            </div>
                          ) : (
                            <div className="text-center text-red-600">
                              <p>Número romano inválido</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Tabla de referencia */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Tabla de Referencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="font-medium">Básicos:</div>
                    <div>I = 1</div>
                    <div>V = 5</div>
                    <div>X = 10</div>
                    <div>L = 50</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Centenas:</div>
                    <div>C = 100</div>
                    <div>D = 500</div>
                    <div>M = 1000</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Ejemplos:</div>
                    <div>IV = 4</div>
                    <div>IX = 9</div>
                    <div>XL = 40</div>
                    <div>XC = 90</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Más ejemplos:</div>
                    <div>CD = 400</div>
                    <div>CM = 900</div>
                    <div>MM = 2000</div>
                    <div>MMXXIV = 2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
