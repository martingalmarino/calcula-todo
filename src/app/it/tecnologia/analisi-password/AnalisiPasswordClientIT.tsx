"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Shield, AlertCircle, Info, Eye, EyeOff } from 'lucide-react'
import { analyzePasswordEntropy, type PasswordEntropyResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function AnalisiPasswordClientIT() {
  const [password, setPassword] = useState('')
  const [result, setResult] = useState<PasswordEntropyResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleAnalyze = () => {
    setError(null)
    setResult(null)
    
    if (!password) {
      setError('Inserisci una password da analizzare')
      return
    }

    try {
      const analysisResult = analyzePasswordEntropy(password)
      setResult(analysisResult)
    } catch {
      setError('Errore nell\'analisi della password.')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Tecnologia', href: '/it/tecnologia' },
    { label: 'Analisi delle Password', href: '/it/tecnologia/analisi-password' }
  ]

  const examples = [
    {
      label: 'Password forte: MyP@ssw0rd2024!',
      values: { password: 'MyP@ssw0rd2024!' }
    },
    {
      label: 'Password media: Password123',
      values: { password: 'Password123' }
    },
    {
      label: 'Password debole: 123456',
      values: { password: '123456' }
    }
  ]

  const faqItems = [
    {
      question: 'Come viene valutata la forza di una password?',
      answer: 'La forza viene valutata considerando lunghezza, complessità, uso di caratteri speciali, numeri, maiuscole e minuscole, e pattern comuni.'
    },
    {
      question: 'Quali sono i criteri per una password sicura?',
      answer: 'Una password sicura dovrebbe avere almeno 12 caratteri, includere maiuscole, minuscole, numeri e simboli speciali, ed evitare pattern comuni.'
    },
    {
      question: 'Perché le password lunghe sono più sicure?',
      answer: 'Le password lunghe aumentano esponenzialmente il numero di combinazioni possibili, rendendo gli attacchi brute force molto più difficili e lunghi.'
    },
    {
      question: 'Cosa sono gli attacchi dizionario?',
      answer: 'Gli attacchi dizionario provano password comuni e parole del dizionario. Evita password che contengono parole comuni o pattern prevedibili.'
    }
  ]

  const relatedLinks = [
    { label: 'Conversione di Colori', href: '/it/tecnologia/conversione-colori', description: 'Converte formati di colore' },
    { label: 'Analisi della Latenza', href: '/it/tecnologia/analisi-latenza', description: 'Analizza la latenza di rete' },
    { label: 'Uptime/Downtime', href: '/it/tecnologia/uptime-downtime', description: 'Calcola uptime e downtime' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setPassword(values.password as string)
    setResult(null)
    setError(null)
  }

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'muy_débil': return 'text-red-600'
      case 'débil': return 'text-orange-600'
      case 'medio': return 'text-yellow-600'
      case 'fuerte': return 'text-blue-600'
      case 'muy_fuerte': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const getStrengthLabel = (strength: string) => {
    switch (strength) {
      case 'muy_débil': return 'Molto Debole'
      case 'débil': return 'Debole'
      case 'medio': return 'Medio'
      case 'fuerte': return 'Forte'
      case 'muy_fuerte': return 'Molto Forte'
      default: return 'Sconosciuto'
    }
  }


  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Analisi delle Password',
            description: 'Analizza la sicurezza e la forza delle tue password',
            url: '/it/tecnologia/analisi-password/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Analisi delle Password"
            description="Analizza la sicurezza e la forza delle tue password"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Analisi delle Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password da Analizzare
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Inserisci la tua password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  onClick={handleAnalyze} 
                  className="w-full calculator-button"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Analizza Password
                </Button>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                {result && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Risultati dell&apos;Analisi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className={`text-3xl font-bold mb-2 ${getStrengthColor(result.strength)}`}>
                          {getStrengthLabel(result.strength)}
                        </div>
                        <div className="text-lg font-semibold text-foreground mb-2">
                          Entropia: {result.entropy.toFixed(1)} bit
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(result.strength).replace('text-', 'bg-')}`}
                            style={{ width: `${Math.min((result.entropy / 80) * 100, 100)}%` } as React.CSSProperties}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">Statistiche</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Lunghezza:</span>
                              <span className="font-medium">{result.password.length} caratteri</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Entropia:</span>
                              <span className="font-medium">{result.entropy.toFixed(1)} bit</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tempo di Cracking:</span>
                              <span className="font-medium">{result.crackTime.formatted}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">Hash</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>MD5:</span>
                              <span className="font-medium font-mono text-xs">{result.hashMD5.substring(0, 8)}...</span>
                            </div>
                            <div className="flex justify-between">
                              <span>SHA256:</span>
                              <span className="font-medium font-mono text-xs">{result.hashSHA256.substring(0, 8)}...</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Suggerimenti:</h4>
                        <div className="space-y-2">
                          {result.suggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span className="text-blue-700">
                                {suggestion}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Consigli per Password Sicure:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Usa almeno 12 caratteri</li>
                              <li>Includi maiuscole, minuscole, numeri e simboli</li>
                              <li>Evita informazioni personali</li>
                              <li>Non riutilizzare password tra account</li>
                              <li>Considera l&apos;uso di un gestore di password</li>
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
