"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Palette, AlertCircle, Info } from 'lucide-react'
import { convertColor, type ColorConversionResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function ConversioneColoriClientIT() {
  const [hexInput, setHexInput] = useState('')
  const [result, setResult] = useState<ColorConversionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (!hexInput) {
      setError('Inserisci un codice colore HEX')
      return
    }

    try {
      const colorResult = convertColor(hexInput)
      setResult(colorResult)
      
      if (!colorResult.isValid) {
        setError('Codice colore HEX non valido. Usa il formato #RRGGBB o #RGB')
      }
    } catch {
      setError('Errore nella conversione del colore. Verifica il formato HEX.')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Tecnologia', href: '/it/tecnologia' },
    { label: 'Conversione di Colori', href: '/it/tecnologia/conversione-colori' }
  ]

  const examples = [
    {
      label: 'Colore blu: #0066CC',
      values: { hexInput: '#0066CC' }
    },
    {
      label: 'Colore rosso: #FF0000',
      values: { hexInput: '#FF0000' }
    },
    {
      label: 'Colore verde: #00FF00',
      values: { hexInput: '#00FF00' }
    },
    {
      label: 'Colore grigio: #808080',
      values: { hexInput: '#808080' }
    }
  ]

  const faqItems = [
    {
      question: 'Cos\'è il formato HEX?',
      answer: 'HEX è un formato di colore esadecimale usato nel web design. Consiste di 6 caratteri che rappresentano i valori di rosso, verde e blu (es. #FF0000 per rosso).'
    },
    {
      question: 'Qual è la differenza tra RGB e CMYK?',
      answer: 'RGB (Red, Green, Blue) è usato per schermi digitali, mentre CMYK (Cyan, Magenta, Yellow, Black) è usato per la stampa. RGB è additivo, CMYK è sottrattivo.'
    },
    {
      question: 'Come funziona HSL?',
      answer: 'HSL (Hue, Saturation, Lightness) rappresenta i colori in base alla tonalità (0-360°), saturazione (0-100%) e luminosità (0-100%). È più intuitivo per gli umani.'
    },
    {
      question: 'Perché i colori appaiono diversi su schermo e stampa?',
      answer: 'I monitor usano RGB (colori additivi), mentre la stampa usa CMYK (colori sottrattivi). Inoltre, i profili colore e la calibrazione influenzano l\'aspetto finale.'
    }
  ]

  const relatedLinks = [
    { label: 'Conversione di Archiviazione', href: '/it/tecnologia/conversione-archiviazione', description: 'Converte unità di archiviazione' },
    { label: 'Velocità di Download', href: '/it/tecnologia/velocita-download', description: 'Calcola il tempo di download' },
    { label: 'Analisi delle Password', href: '/it/tecnologia/analisi-password', description: 'Analizza la sicurezza delle password' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setHexInput(values.hexInput as string)
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Conversione di Colori',
            description: 'Converte tra formati di colore HEX, RGB, CMYK e HSL per design e stampa',
            url: '/it/tecnologia/conversione-colori/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Conversione di Colori"
            description="Converte tra formati di colore HEX, RGB, CMYK e HSL per design e stampa"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Conversione di Colori
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Codice Colore HEX
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Es: #0066CC o #06C"
                      value={hexInput}
                      onChange={(e) => setHexInput(e.target.value.toUpperCase())}
                      className="flex-1"
                    />
                    {result && result.isValid && (
                      <div 
                        className="w-12 h-10 border border-gray-300 rounded"
                        style={{ backgroundColor: result.hex } as React.CSSProperties}
                      />
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Converti Colore
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
                      <CardTitle className="text-lg">Risultati della Conversione</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div 
                          className="w-24 h-24 mx-auto border border-gray-300 rounded-lg mb-4"
                          style={{ backgroundColor: result.hex } as React.CSSProperties}
                        />
                        <div className="text-2xl font-bold text-gray-800 mb-2">
                          {result.hex}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg">
                          <h4 className="font-medium text-red-800 mb-2">RGB</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Red:</span>
                              <span className="font-medium">{result.rgb.r}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Green:</span>
                              <span className="font-medium">{result.rgb.g}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Blue:</span>
                              <span className="font-medium">{result.rgb.b}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-cyan-50 p-4 rounded-lg">
                          <h4 className="font-medium text-cyan-800 mb-2">CMYK</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Cyan:</span>
                              <span className="font-medium">{result.cmyk.c.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Magenta:</span>
                              <span className="font-medium">{result.cmyk.m.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Yellow:</span>
                              <span className="font-medium">{result.cmyk.y.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Black:</span>
                              <span className="font-medium">{result.cmyk.k.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg md:col-span-2">
                          <h4 className="font-medium text-blue-800 mb-2">HSL</h4>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex justify-between">
                              <span>Hue:</span>
                              <span className="font-medium">{result.hsl.h.toFixed(0)}°</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Saturation:</span>
                              <span className="font-medium">{result.hsl.s.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Lightness:</span>
                              <span className="font-medium">{result.hsl.l.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Codici per Sviluppatori:</h4>
                        <div className="space-y-2 text-sm font-mono">
                          <div className="flex justify-between">
                            <span>HEX:</span>
                            <span className="font-medium">{result.hex}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>RGB:</span>
                            <span className="font-medium">rgb({result.rgb.r}, {result.rgb.g}, {result.rgb.b})</span>
                          </div>
                          <div className="flex justify-between">
                            <span>HSL:</span>
                            <span className="font-medium">hsl({result.hsl.h.toFixed(0)}, {result.hsl.s.toFixed(1)}%, {result.hsl.l.toFixed(1)}%)</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Informazioni sui Formati:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li><strong>HEX:</strong> Usato nel web design e CSS</li>
                              <li><strong>RGB:</strong> Per schermi digitali e monitor</li>
                              <li><strong>CMYK:</strong> Per stampa professionale</li>
                              <li><strong>HSL:</strong> Più intuitivo per la selezione colori</li>
                            </ul>
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
