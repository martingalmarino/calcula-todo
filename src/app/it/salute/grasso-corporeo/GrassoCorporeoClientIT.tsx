"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Percent, AlertCircle } from 'lucide-react'
import { calculateBodyFat, BodyFatResult } from '@/lib/math/health'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

export default function GrassoCorporeoClientIT() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [waist, setWaist] = useState('')
  const [result, setResult] = useState<BodyFatResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)
    const ageNum = parseInt(age)
    const waistNum = parseFloat(waist)
    
    if (!weight || !height || !age || !gender || !waist) {
      setError('Inserisci tutti i campi richiesti')
      return
    }
    
    if (weightNum <= 0 || heightNum <= 0 || ageNum <= 0 || waistNum <= 0) {
      setError('Tutti i valori devono essere positivi')
      return
    }
    
    if (ageNum < 10 || ageNum > 120) {
      setError('L\'età deve essere tra 10 e 120 anni')
      return
    }
    
    if (heightNum < 100 || heightNum > 250) {
      setError('L\'altezza deve essere tra 100 e 250 cm')
      return
    }
    
    if (weightNum < 20 || weightNum > 300) {
      setError('Il peso deve essere tra 20 e 300 kg')
      return
    }
    
    if (waistNum < 50 || waistNum > 200) {
      setError('La circonferenza vita deve essere tra 50 e 200 cm')
      return
    }
    
    try {
      const bodyFatResult = calculateBodyFat(weightNum, heightNum, ageNum, gender as 'male' | 'female')
      setResult(bodyFatResult)
    } catch {
      setError('Errore nel calcolo della percentuale di grasso corporeo')
    }
  }

  const handleExample = (example: Record<string, unknown>) => {
    if (example.weight) setWeight(example.weight as string)
    if (example.height) setHeight(example.height as string)
    if (example.age) setAge(example.age as string)
    if (example.gender) setGender(example.gender as string)
    if (example.waist) setWaist(example.waist as string)
  }

  const breadcrumbs = getBreadcrumbs('/it/salute/grasso-corporeo')

  const examples = [
    { label: 'Uomo Adulto', values: { weight: '75', height: '180', age: '30', gender: 'male', waist: '85' } },
    { label: 'Donna Adulta', values: { weight: '65', height: '165', age: '25', gender: 'female', waist: '75' } },
    { label: 'Uomo Atleta', values: { weight: '80', height: '185', age: '28', gender: 'male', waist: '80' } },
    { label: 'Donna Atleta', values: { weight: '60', height: '170', age: '26', gender: 'female', waist: '70' } }
  ]

  const faqItems = [
    {
      question: 'Cos\'è la percentuale di grasso corporeo?',
      answer: 'La percentuale di grasso corporeo è la quantità di grasso presente nel corpo rispetto al peso totale. È un indicatore importante della composizione corporea e della salute generale.'
    },
    {
      question: 'Come viene calcolata?',
      answer: 'Utilizziamo l\'equazione di Deurenberg che considera peso, altezza, età, sesso e circonferenza vita per stimare la percentuale di grasso corporeo.'
    },
    {
      question: 'Quali sono i valori normali?',
      answer: 'Per gli uomini: 6-24% (normale), per le donne: 16-30% (normale). Gli atleti possono avere percentuali più basse, mentre valori troppo alti o troppo bassi possono indicare problemi di salute.'
    },
    {
      question: 'È più accurato dell\'IMC?',
      answer: 'Sì, la percentuale di grasso corporeo fornisce informazioni più dettagliate sulla composizione corporea rispetto all\'IMC, che non distingue tra massa grassa e massa magra.'
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calcolatrice Percentuale di Grasso Corporeo',
            description: 'Stima la percentuale di grasso corporeo per monitorare la composizione corporea',
            url: '/it/salute/grasso-corporeo/',
            category: 'Salute'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calcolatrice Percentuale di Grasso Corporeo"
            description="Stima la percentuale di grasso corporeo per monitorare la composizione corporea"
            examples={examples}
            onExampleClick={handleExample}
            faqItems={faqItems}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  Calcolatrice Grasso Corporeo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              min="20"
              max="300"
              step="0.1"
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
              Altezza (cm)
            </label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Es. 175"
              min="100"
              max="250"
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
              min="10"
              max="120"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
              Sesso
            </label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona sesso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Maschio</SelectItem>
                <SelectItem value="female">Femmina</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="waist" className="block text-sm font-medium text-gray-700 mb-2">
              Circonferenza Vita (cm)
            </label>
            <Input
              id="waist"
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder="Es. 80"
              min="50"
              max="200"
              step="0.1"
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
          Calcola Percentuale Grasso
        </Button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risultato Percentuale Grasso Corporeo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {result.bodyFat.toFixed(1)}%
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  {result.category}
                </div>
                <div className="text-gray-600 mb-4">
                  {result.description}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Informazioni:</h4>
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
                  <span>Altezza:</span>
                  <span className="font-medium">{height} cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Età:</span>
                  <span className="font-medium">{age} anni</span>
                </div>
                <div className="flex justify-between">
                  <span>Sesso:</span>
                  <span className="font-medium">{gender === 'male' ? 'Maschio' : 'Femmina'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Circonferenza vita:</span>
                  <span className="font-medium">{waist} cm</span>
                </div>
                <div className="flex justify-between">
                  <span>Percentuale grasso:</span>
                  <span className="font-medium">{result.bodyFat.toFixed(1)}%</span>
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
