"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { GraduationCap } from 'lucide-react'
import { convertToGradeScale, type GradeScaleResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function NotenskalaRechnerClientDE() {
  const [score, setScore] = useState<string>('')
  const [maxScore, setMaxScore] = useState<string>('100')
  const [results, setResults] = useState<GradeScaleResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResults(null)
    
    if (!score) {
      setError('Bitte geben Sie Ihre Punktzahl ein')
      return
    }

    try {
      const scoreNum = parseFloat(score)
      const maxScoreNum = parseFloat(maxScore)
      
      if (isNaN(scoreNum) || isNaN(maxScoreNum)) {
        setError('Bitte geben Sie gültige Zahlenwerte ein')
        return
      }

      if (scoreNum < 0 || maxScoreNum <= 0) {
        setError('Punktzahl und maximale Punktzahl müssen positive Werte sein')
        return
      }

      if (scoreNum > maxScoreNum) {
        setError('Die Punktzahl kann nicht höher als die maximale Punktzahl sein')
        return
      }

      const result = convertToGradeScale(scoreNum, maxScoreNum)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Konvertieren der Punktzahl')
    }
  }

  const handleExample = (values: Record<string, unknown>) => {
    setScore(values.score as string)
    setMaxScore(values.maxScore as string)
    setResults(null)
    setError(null)
  }

  const breadcrumbs = getBreadcrumbs('/de/andere/notenskala')

  const examples = [
    {
      label: 'Beispiel: 85 Punkte von 100',
      values: { score: '85', maxScore: '100' }
    },
    {
      label: 'Beispiel: 18 Punkte von 20',
      values: { score: '18', maxScore: '20' }
    },
    {
      label: 'Beispiel: 42 Punkte von 50',
      values: { score: '42', maxScore: '50' }
    }
  ]

  const faqItems = [
    {
      question: 'Wie funktioniert die Notenskala?',
      answer: 'Konvertiert numerische Bewertungen in Buchstaben: A (90-100%), B (80-89%), C (70-79%), D (60-69%), F (<60%).'
    },
    {
      question: 'Kann ich die maximale Punktzahl ändern?',
      answer: 'Ja, Sie können die maximale Punktzahl je nach Ihrem Bewertungssystem anpassen (100, 20, 10, etc.).'
    },
    {
      question: 'Was bedeutet jeder Buchstabe?',
      answer: 'A: Ausgezeichnet, B: Gut, C: Befriedigend, D: Bestanden, F: Nicht bestanden.'
    },
    {
      question: 'Ist die Skala standardisiert?',
      answer: 'Dies ist eine gängige Skala, aber einige Bildungssysteme können andere Bereiche verwenden.'
    }
  ]

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600'
      case 'B': return 'text-blue-600'
      case 'C': return 'text-yellow-600'
      case 'D': return 'text-orange-600'
      case 'F': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getGradeDescription = (grade: string) => {
    switch (grade) {
      case 'A': return 'Ausgezeichnet'
      case 'B': return 'Gut'
      case 'C': return 'Befriedigend'
      case 'D': return 'Bestanden'
      case 'F': return 'Nicht bestanden'
      default: return ''
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Notenskala-Rechner - Konvertierung A B C D F',
            description: 'Konvertieren Sie numerische Bewertungen in Buchstabenskalen (A, B, C, D, F)',
            url: '/de/andere/notenskala/',
            category: 'Bildung'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Notenskala-Rechner - Konvertierung A B C D F"
            description="Konvertieren Sie numerische Bewertungen in Buchstabenskalen (A, B, C, D, F). Perfekt für Lehrer, Schüler und Bildungseinrichtungen."
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="score">Ihre Punktzahl</Label>
                  <Input
                    id="score"
                    type="number"
                    placeholder="z.B. 85"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="maxScore">Maximale Punktzahl</Label>
                  <Input
                    id="maxScore"
                    type="number"
                    placeholder="z.B. 100"
                    value={maxScore}
                    onChange={(e) => setMaxScore(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <GraduationCap className="h-4 w-4" />
                  In Notenskala konvertieren
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className="mt-4 bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Bewertungsergebnis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className={`text-6xl font-bold mb-2 ${getGradeColor(results.grade)}`}>
                        {results.grade}
                      </div>
                      <div className="text-2xl font-semibold text-gray-800 mb-2">
                        {getGradeDescription(results.grade)}
                      </div>
                      <div className="text-lg text-gray-600">
                        {results.percentage}% der maximalen Punktzahl
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                      <h4 className="font-medium mb-3 text-center">Notenskala:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="font-medium text-green-800">A:</span>
                          <span className="text-green-700">90-100% (Ausgezeichnet)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span className="font-medium text-blue-800">B:</span>
                          <span className="text-blue-700">80-89% (Gut)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                          <span className="font-medium text-yellow-800">C:</span>
                          <span className="text-yellow-700">70-79% (Befriedigend)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                          <span className="font-medium text-orange-800">D:</span>
                          <span className="text-orange-700">60-69% (Bestanden)</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-red-50 rounded col-span-2">
                          <span className="font-medium text-red-800">F:</span>
                          <span className="text-red-700">&lt;60% (Nicht bestanden)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">📚 Bildungstipps</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p>• <strong>Kontinuierliche Bewertung:</strong> Verwenden Sie verschiedene Bewertungsmethoden</p>
                        <p>• <strong>Transparente Kriterien:</strong> Machen Sie Bewertungskriterien im Voraus bekannt</p>
                        <p>• <strong>Konstruktives Feedback:</strong> Geben Sie spezifische Verbesserungsvorschläge</p>
                        <p>• <strong>Motivation:</strong> Betonen Sie Fortschritte und Erfolge</p>
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
