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

export default function WortZeichenzaehlerClientDE() {
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

  const handleExample = (values: Record<string, unknown>) => {
    setText(values.text as string)
  }

  const breadcrumbs = getBreadcrumbs('/de/andere/wort-zeichenzaehler')

  const examples = [
    {
      label: 'Beispiel: Kurzer Text',
      values: { text: 'Dies ist ein Beispieltext zum Zählen von Wörtern und Zeichen. Er hat mehrere Sätze und Absätze.' }
    },
    {
      label: 'Beispiel: Längerer Text',
      values: { text: 'Künstliche Intelligenz verändert die Art, wie wir arbeiten und leben. Von virtuellen Assistenten bis hin zu autonomen Fahrzeugen ist KI in vielen Aspekten unseres täglichen Lebens präsent. Diese Technologie verspricht, ganze Branchen zu revolutionieren und neue Beschäftigungsmöglichkeiten zu schaffen.' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie werden Wörter gezählt?',
      answer: 'Wörter werden durch Trennung des Textes an Leerzeichen gezählt. Jede Zeichenfolge zwischen Leerzeichen zählt als ein Wort.'
    },
    {
      question: 'Was umfasst die Zeichenzählung?',
      answer: 'Alle Zeichen werden gezählt: Buchstaben, Zahlen, Symbole, Leerzeichen und Satzzeichen.'
    },
    {
      question: 'Wie wird die Lesezeit berechnet?',
      answer: 'Sie wird basierend auf einer durchschnittlichen Lesegeschwindigkeit von 200 Wörtern pro Minute geschätzt, was der typischen Lesegeschwindigkeit entspricht.'
    },
    {
      question: 'Werden leere Absätze gezählt?',
      answer: 'Nein, nur Absätze mit Text werden gezählt. Leere Absätze werden ignoriert.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Wort- und Zeichenzähler Online',
            description: 'Zählen Sie Wörter, Zeichen, Sätze, Absätze und Lesezeit',
            url: '/de/andere/wort-zeichenzaehler/',
            category: 'Text-Tools'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Wort- und Zeichenzähler Online"
            description="Zählen Sie Wörter, Zeichen, Sätze, Absätze und Lesezeit in Ihrem Text. Perfekt für Autoren, Studenten und Redakteure."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="space-y-6">
              {/* Textbereich */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Schreiben Sie Ihren Text hier
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Schreiben oder fügen Sie Ihren Text hier ein, um Wörter und Zeichen zu zählen..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                </CardContent>
              </Card>

              {/* Ergebnisse */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Textstatistiken
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {results.words}
                      </div>
                      <div className="text-sm text-gray-600">
                        Wörter
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {results.characters}
                      </div>
                      <div className="text-sm text-gray-600">
                        Zeichen
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {results.charactersNoSpaces}
                      </div>
                      <div className="text-sm text-gray-600">
                        Ohne Leerzeichen
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {results.sentences}
                      </div>
                      <div className="text-sm text-gray-600">
                        Sätze
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {results.paragraphs}
                      </div>
                      <div className="text-sm text-gray-600">
                        Absätze
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600 mb-1 flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4" />
                        {results.readingTime}
                      </div>
                      <div className="text-sm text-gray-600">
                        Min. Lesezeit
                      </div>
                    </div>
                  </div>
                  
                  {results.words > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Zusätzliche Informationen:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>• Durchschnittliche Zeichen pro Wort: {Math.round(results.charactersNoSpaces / results.words * 10) / 10}</p>
                        <p>• Durchschnittliche Wörter pro Satz: {results.sentences > 0 ? Math.round(results.words / results.sentences * 10) / 10 : 0}</p>
                        <p>• Geschätzte Lesezeit: {results.readingTime} Minute{results.readingTime !== 1 ? 'n' : ''}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">📝 Schreibtipps</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>• <strong>Klare Struktur:</strong> Verwenden Sie Absätze, um Ihre Gedanken zu organisieren</p>
                  <p>• <strong>Abwechslungsreiche Sätze:</strong> Variieren Sie die Satzlänge für bessere Lesbarkeit</p>
                  <p>• <strong>Zielgruppe beachten:</strong> Passen Sie Ihren Schreibstil an Ihre Zielgruppe an</p>
                  <p>• <strong>Korrekturlesen:</strong> Überprüfen Sie Ihren Text auf Rechtschreibung und Grammatik</p>
                </div>
              </div>
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  )
}
