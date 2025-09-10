"use client"

import { useState, useEffect } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Type, FileText, Clock, Hash, AlignLeft } from 'lucide-react'
import { countWordsAndCharacters, type WordCountResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'

export default function ContatoreParoleCaratteriClientIT() {
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

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Altre Calcolatrici', href: '/it/altre' },
    { label: 'Contatore di Parole e Caratteri', href: '/it/altre/contatore-parole-caratteri' }
  ]

  const examples = [
    {
      label: 'Testo di esempio per il conteggio',
      values: { text: 'Questo è un testo di esempio per dimostrare come funziona il contatore di parole e caratteri. Conta automaticamente tutti gli elementi del testo mentre scrivi.' }
    },
    {
      label: 'Testo più lungo con paragrafi',
      values: { text: 'Primo paragrafo.\n\nSecondo paragrafo con più frasi. Questa è la seconda frase. E questa è la terza.\n\nTerzo paragrafo finale.' }
    }
  ]

  const faqItems = [
    {
      question: 'Come vengono contate le parole?',
      answer: 'Le parole vengono contate separando il testo per spazi. Ogni sequenza di caratteri tra spazi viene considerata una parola.'
    },
    {
      question: 'Come viene calcolato il tempo di lettura?',
      answer: 'Il tempo di lettura è calcolato assumendo una velocità di lettura di 200 parole al minuto, che è la velocità media di lettura.'
    },
    {
      question: 'Cosa include il conteggio dei caratteri?',
      answer: 'Il conteggio include tutti i caratteri: lettere, numeri, simboli, spazi e punteggiatura. Il conteggio senza spazi esclude solo gli spazi.'
    },
    {
      question: 'Come vengono identificati i paragrafi?',
      answer: 'I paragrafi vengono identificati da doppie interruzioni di riga (due o più caratteri di nuova riga consecutivi).'
    }
  ]

  const relatedLinks = [
    { label: 'Scala di Voti', href: '/it/altre/scala-di-voti', description: 'Converte punteggi in lettere' },
    { label: 'Spesa Benzina per Viaggi', href: '/it/altre/spesa-benzina-viaggi', description: 'Calcola il costo del carburante' },
    { label: 'Calcolatrice di Mance', href: '/it/altre/calcolatrice-mance', description: 'Calcola le mance' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Contatore di Parole e Caratteri',
            description: 'Conta parole, caratteri, frasi e paragrafi nel tuo testo',
            url: '/it/altre/contatore-parole-caratteri/',
            category: 'Testo'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Contatore di Parole e Caratteri"
            description="Conta parole, caratteri, frasi e paragrafi nel tuo testo"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={(values) => {
              setText(values.text as string)
            }}
          >
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Analisi del Testo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Inserisci il tuo testo
                    </label>
                    <Textarea
                      placeholder="Scrivi o incolla il tuo testo qui per vedere l'analisi in tempo reale..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[200px] w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Caratteri</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">
                      {results.characters.toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Inclusi spazi
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">Caratteri</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">
                      {results.charactersNoSpaces.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      Senza spazi
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-800">Parole</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">
                      {results.words.toLocaleString()}
                    </p>
                    <p className="text-xs text-purple-700 mt-1">
                      Totale parole
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlignLeft className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-orange-800">Frasi</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-900">
                      {results.sentences.toLocaleString()}
                    </p>
                    <p className="text-xs text-orange-700 mt-1">
                      Frasi complete
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-red-800">Paragrafi</span>
                    </div>
                    <p className="text-2xl font-bold text-red-900">
                      {results.paragraphs.toLocaleString()}
                    </p>
                    <p className="text-xs text-red-700 mt-1">
                      Paragrafi separati
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-indigo-50 border-indigo-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-indigo-600" />
                      <span className="font-medium text-indigo-800">Tempo Lettura</span>
                    </div>
                    <p className="text-2xl font-bold text-indigo-900">
                      {results.readingTime}
                    </p>
                    <p className="text-xs text-indigo-700 mt-1">
                      Minuti (200 parole/min)
                    </p>
                  </CardContent>
                </Card>
              </div>

              {text && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Riepilogo dell&apos;Analisi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span>Caratteri totali:</span>
                          <span className="font-medium">{results.characters.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Caratteri senza spazi:</span>
                          <span className="font-medium">{results.charactersNoSpaces.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Parole:</span>
                          <span className="font-medium">{results.words.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Frasi:</span>
                          <span className="font-medium">{results.sentences.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Paragrafi:</span>
                          <span className="font-medium">{results.paragraphs.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tempo di lettura:</span>
                          <span className="font-medium">{results.readingTime} minuti</span>
                        </div>
                      </div>
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
