"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsIT } from '@/components/BreadcrumbsIT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Clock, AlertCircle, TrendingUp, TrendingDown, Info } from 'lucide-react'
import { calculateUptime, type UptimeResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function UptimeDowntimeClientIT() {
  const [uptimePercentage, setUptimePercentage] = useState('')
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('month')
  const [result, setResult] = useState<UptimeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    setResult(null)
    
    if (!uptimePercentage) {
      setError('Inserisci la percentuale di uptime')
      return
    }

    try {
      const percentage = parseFloat(uptimePercentage)
      
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        setError('Inserisci una percentuale valida tra 0 e 100')
        return
      }

      const uptimeResult = calculateUptime(percentage, period)
      setResult(uptimeResult)
    } catch {
      setError('Errore nel calcolo. Verifica i valori inseriti.')
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/it' },
    { label: 'Tecnologia', href: '/it/tecnologia' },
    { label: 'Uptime/Downtime', href: '/it/tecnologia/uptime-downtime' }
  ]

  const examples = [
    {
      label: '99.9% uptime mensile',
      values: { uptimePercentage: '99.9', period: 'month' }
    },
    {
      label: '99.5% uptime giornaliero',
      values: { uptimePercentage: '99.5', period: 'day' }
    },
    {
      label: '99.99% uptime annuale',
      values: { uptimePercentage: '99.99', period: 'year' }
    }
  ]

  const faqItems = [
    {
      question: 'Cos\'è l\'uptime?',
      answer: 'L\'uptime è la percentuale di tempo in cui un servizio, server o applicazione è funzionante e accessibile agli utenti. È un indicatore chiave della disponibilità del servizio.'
    },
    {
      question: 'Qual è un buon livello di uptime?',
      answer: '99.9% (8.77 ore di downtime al mese) è considerato buono per la maggior parte dei servizi. 99.99% (52.6 minuti al mese) è eccellente per servizi critici.'
    },
    {
      question: 'Come si calcola l\'uptime?',
      answer: 'Uptime = (Tempo di funzionamento / Tempo totale) × 100. Il downtime è il tempo rimanente in cui il servizio non è disponibile.'
    },
    {
      question: 'Quali fattori influenzano l\'uptime?',
      answer: 'Manutenzione programmata, errori hardware, problemi di rete, attacchi DDoS, errori software e problemi di alimentazione possono tutti influenzare l\'uptime.'
    }
  ]

  const relatedLinks = [
    { label: 'Conversione di Archiviazione', href: '/it/tecnologia/conversione-archiviazione', description: 'Converte unità di archiviazione' },
    { label: 'Velocità di Download', href: '/it/tecnologia/velocita-download', description: 'Calcola il tempo di download' },
    { label: 'Analisi della Latenza', href: '/it/tecnologia/analisi-latenza', description: 'Analizza la latenza di rete' }
  ]

  const handleExampleClick = (values: Record<string, unknown>) => {
    setUptimePercentage(values.uptimePercentage as string)
    setPeriod(values.period as 'day' | 'month' | 'year')
    setResult(null)
    setError(null)
  }

  const getUptimeLevel = (percentage: number) => {
    if (percentage >= 99.99) return { level: 'Eccellente', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' }
    if (percentage >= 99.9) return { level: 'Molto Buono', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' }
    if (percentage >= 99.5) return { level: 'Buono', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' }
    if (percentage >= 99.0) return { level: 'Accettabile', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' }
    return { level: 'Da Migliorare', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' }
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Uptime/Downtime',
            description: 'Calcola uptime e downtime di servizi web, server e applicazioni',
            url: '/it/tecnologia/uptime-downtime/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsIT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Uptime/Downtime"
            description="Calcola uptime e downtime di servizi web, server e applicazioni"
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Calcolatrice Uptime/Downtime
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Percentuale Uptime (%)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      placeholder="Es: 99.9"
                      value={uptimePercentage}
                      onChange={(e) => setUptimePercentage(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Periodo di Riferimento
                    </label>
                    <Select value={period} onValueChange={(value) => setPeriod(value as 'day' | 'month' | 'year')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Giorno</SelectItem>
                        <SelectItem value="month">Mese</SelectItem>
                        <SelectItem value="year">Anno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCalculate} 
                  className="w-full calculator-button"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Calcola Uptime
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
                      <CardTitle className="text-lg">Risultati del Calcolo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {result.uptimePercentage}%
                        </div>
                        <div className={`text-lg font-semibold mb-2 ${getUptimeLevel(result.uptimePercentage).color}`}>
                          {getUptimeLevel(result.uptimePercentage).level}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Uptime {result.period === 'day' ? 'Giornaliero' : result.period === 'month' ? 'Mensile' : 'Annuale'}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">Tempo di Attività</span>
                          </div>
                          <p className="text-2xl font-bold text-green-900">
                            {result.uptimePercentage}%
                          </p>
                          <p className="text-sm text-green-700">
                            {result.totalPeriod.days > 0 && `${result.totalPeriod.days} giorni `}
                            {result.totalPeriod.hours > 0 && `${result.totalPeriod.hours} ore `}
                            {result.totalPeriod.minutes > 0 && `${result.totalPeriod.minutes} minuti`}
                          </p>
                        </div>

                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="h-4 w-4 text-red-600" />
                            <span className="font-medium text-red-800">Tempo di Inattività</span>
                          </div>
                          <p className="text-2xl font-bold text-red-900">
                            {result.downtime.formatted}
                          </p>
                          <p className="text-sm text-red-700">
                            {result.downtime.days > 0 && `${result.downtime.days} giorni `}
                            {result.downtime.hours > 0 && `${result.downtime.hours} ore `}
                            {result.downtime.minutes > 0 && `${result.downtime.minutes} minuti`}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">Dettagli del Calcolo:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span>Uptime:</span>
                            <span className="font-medium">{result.uptimePercentage}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Downtime:</span>
                            <span className="font-medium">{result.downtime.formatted}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Periodo:</span>
                            <span className="font-medium">{result.period === 'day' ? 'Giorno' : result.period === 'month' ? 'Mese' : 'Anno'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tempo Totale:</span>
                            <span className="font-medium">
                              {result.totalPeriod.days > 0 && `${result.totalPeriod.days}d `}
                              {result.totalPeriod.hours > 0 && `${result.totalPeriod.hours}h `}
                              {result.totalPeriod.minutes > 0 && `${result.totalPeriod.minutes}m`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Standard di Uptime:</p>
                            <ul className="list-disc list-inside space-y-1">
                              <li><strong>99.9%</strong> - Buono (8.77 ore downtime/mese)</li>
                              <li><strong>99.95%</strong> - Molto Buono (4.38 ore downtime/mese)</li>
                              <li><strong>99.99%</strong> - Eccellente (52.6 minuti downtime/mese)</li>
                              <li><strong>99.999%</strong> - Critico (5.26 minuti downtime/mese)</li>
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
