"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Droplets, AlertCircle } from 'lucide-react'
import { calculateWaterIntake, WaterIntakeResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function AcquaGiornalieraClientIT() {
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [activity, setActivity] = useState('')
  const [result, setResult] = useState<WaterIntakeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    const weightNum = parseFloat(weight)
    const ageNum = parseInt(age)
    
    if (!weight || !age || !activity) {
      setError('Inserisci tutti i campi richiesti')
      return
    }
    
    if (weightNum <= 0 || ageNum <= 0) {
      setError('Peso ed età devono essere valori positivi')
      return
    }
    
    if (ageNum < 1 || ageNum > 120) {
      setError('L\'età deve essere tra 1 e 120 anni')
      return
    }
    
    if (weightNum < 5 || weightNum > 300) {
      setError('Il peso deve essere tra 5 e 300 kg')
      return
    }
    
    try {
      const waterResult = calculateWaterIntake(weightNum, ageNum, activity as 'low' | 'moderate' | 'high')
      setResult(waterResult)
    } catch {
      setError('Errore nel calcolo dell\'acqua giornaliera raccomandata')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.weight) setWeight(example.weight as string)
    if (example.age) setAge(example.age as string)
    if (example.activity) setActivity(example.activity as string)
  }

  const breadcrumbs = getBreadcrumbs('/it/salute/acqua-giornaliera')

  const examples = [
    { label: 'Uomo Attivo', values: { weight: '75', age: '30', activity: 'moderate' } },
    { label: 'Donna Sedentaria', values: { weight: '65', age: '25', activity: 'low' } },
    { label: 'Uomo Sportivo', values: { weight: '80', age: '28', activity: 'high' } },
    { label: 'Donna Anziana', values: { weight: '70', age: '60', activity: 'low' } }
  ]

  const faqItems = [
    {
      question: 'Quanta acqua dovrei bere al giorno?',
      answer: 'La quantità di acqua giornaliera dipende da peso, età, sesso, livello di attività fisica e clima. Generalmente si raccomandano 2-3 litri al giorno per un adulto.'
    },
    {
      question: 'Come viene calcolata la raccomandazione?',
      answer: 'Il calcolo considera il peso corporeo (35ml per kg), l\'età (meno acqua per gli anziani), il sesso (gli uomini hanno bisogno di più acqua), l\'attività fisica e il clima.'
    },
    {
      question: 'Cosa succede se non bevo abbastanza acqua?',
      answer: 'La disidratazione può causare stanchezza, mal di testa, difficoltà di concentrazione, pelle secca e problemi digestivi. È importante mantenere una corretta idratazione.'
    },
    {
      question: 'Posso bere altri liquidi oltre all\'acqua?',
      answer: 'Sì, tè, caffè, succhi di frutta e altri liquidi contribuiscono all\'idratazione, ma l\'acqua rimane la scelta migliore per una corretta idratazione.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice Acqua Giornaliera Raccomandata',
            description: 'Calcola la quantità di acqua giornaliera raccomandata per la tua salute',
            url: '/it/salute/acqua-giornaliera/',
            category: 'Salute'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice Acqua Giornaliera Raccomandata"
            description="Calcola la quantità di acqua giornaliera raccomandata per la tua salute"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Calcolatrice Acqua Giornaliera
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
              Peso (kg)
            </label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Es. 70"
              min="5"
              max="300"
              step="0.1"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Età (anni)
            </label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Es. 30"
              min="1"
              max="120"
            />
          </div>
          <div>
            <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-2">
              Livello di Attività
            </label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona attività" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Leggera</SelectItem>
                <SelectItem value="moderate">Moderata</SelectItem>
                <SelectItem value="high">Intensa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full bg-primary-new hover:bg-primary-new/90 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          Calcola Acqua Giornaliera
        </Button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risultato Acqua Giornaliera</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {result.dailyWater.toFixed(0)} ml
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {(result.dailyWater / 1000).toFixed(1)} litri
                </div>
                <div className="text-gray-600 mb-4">
                  Acqua giornaliera raccomandata
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Raccomandazioni:</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  {result.recommendations.map((rec: string, index: number) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Peso:</span>
                  <span className="font-medium">{weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Età:</span>
                  <span className="font-medium">{age} anni</span>
                </div>
                <div className="flex justify-between">
                  <span>Attività:</span>
                  <span className="font-medium">{activity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Acqua giornaliera:</span>
                  <span className="font-medium">{result.dailyWater.toFixed(0)} ml</span>
                </div>
                <div className="flex justify-between">
                  <span>Vasi (250ml):</span>
                  <span className="font-medium">{result.glasses}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bottiglie (500ml):</span>
                  <span className="font-medium">{result.bottles}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
              </div>
            </CardContent>
          </Card>
        </CalculatorLayout>
      </div>
    </Container>
  </>
)
}
