"use client"

import { useState, useEffect } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Type, Clock, FileText } from 'lucide-react'
import { countWordsAndCharacters, type WordCountResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function ContadorPalabrasClient() {
  const [text, setText] = useState('')
  const [results, setResults] = useState<WordCountResult>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  })

  useEffect(() => {
    const result = countWordsAndCharacters(text)
    setResults(result)
  }, [text])

  const breadcrumbs = getBreadcrumbs('/otras/contador-palabras')

  const examples = [
    {
      label: 'Ejemplo: Texto corto',
      values: { text: 'Este es un ejemplo de texto para contar palabras y caracteres. Tiene varias oraciones y párrafos.' }
    },
    {
      label: 'Ejemplo: Texto largo',
      values: { text: 'La inteligencia artificial está transformando la manera en que trabajamos y vivimos. Desde asistentes virtuales hasta vehículos autónomos, la IA está presente en muchos aspectos de nuestra vida diaria. Esta tecnología promete revolucionar industrias completas y crear nuevas oportunidades de empleo.' }
    }
  ]

  const faqItems = [
    {
      question: '¿Cómo se cuentan las palabras?',
      answer: 'Las palabras se cuentan separando el texto por espacios. Cada secuencia de caracteres entre espacios cuenta como una palabra.'
    },
    {
      question: '¿Qué incluye el conteo de caracteres?',
      answer: 'Incluye todos los caracteres: letras, números, símbolos, espacios y signos de puntuación.'
    },
    {
      question: '¿Cómo se calcula el tiempo de lectura?',
      answer: 'Se estima basándose en una velocidad promedio de 200 palabras por minuto, que es la velocidad típica de lectura.'
    },
    {
      question: '¿Se cuentan los párrafos vacíos?',
      answer: 'No, solo se cuentan los párrafos que contienen texto. Los párrafos vacíos se ignoran.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Contador de Palabras y Caracteres Online',
            description: 'Cuenta palabras, caracteres, oraciones, párrafos y tiempo de lectura',
            url: '/otras/contador-palabras/',
            category: 'Herramientas de Texto'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Contador de Palabras y Caracteres Online"
            description="Cuenta palabras, caracteres, oraciones, párrafos y tiempo de lectura"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setText(values.text as string)
            }}
          >
            <div className="space-y-6">
              {/* Área de texto */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Escribe tu texto aquí
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Escribe o pega tu texto aquí para contar palabras y caracteres..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                </CardContent>
              </Card>

              {/* Resultados */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Estadísticas del Texto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {results.words}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Palabras
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {results.characters}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Caracteres
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {results.charactersNoSpaces}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Sin Espacios
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {results.sentences}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Oraciones
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {results.paragraphs}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Párrafos
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600 mb-1 flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4" />
                        {results.readingTime}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Min. Lectura
                      </div>
                    </div>
                  </div>
                  
                  {results.words > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Información Adicional:</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>• Promedio de caracteres por palabra: {Math.round(results.charactersNoSpaces / results.words * 10) / 10}</p>
                        <p>• Promedio de palabras por oración: {results.sentences > 0 ? Math.round(results.words / results.sentences * 10) / 10 : 0}</p>
                        <p>• Tiempo de lectura estimado: {results.readingTime} minuto{results.readingTime !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
