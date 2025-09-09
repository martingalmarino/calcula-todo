"use client"

import { useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { calculateBodyFat } from '@/lib/math/health'

export default function GrassoCorporeoClientIT() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [waist, setWaist] = useState('')
  const [result, setResult] = useState<any>(null)
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
      const bodyFatResult = calculateBodyFat(weightNum, heightNum, ageNum, gender as 'male' | 'female', waistNum, 'it')
      setResult(bodyFatResult)
    } catch (err) {
      setError('Errore nel calcolo della percentuale di grasso corporeo')
    }
  }

  const handleExample = (example: string) => {
    const examples: { [key: string]: { weight: string; height: string; age: string; gender: string; waist: string } } = {
      'uomo': { weight: '75', height: '180', age: '30', gender: 'male', waist: '85' },
      'donna': { weight: '65', height: '165', age: '25', gender: 'female', waist: '75' },
      'uomo_atleta': { weight: '80', height: '185', age: '28', gender: 'male', waist: '80' },
      'donna_atleta': { weight: '60', height: '170', age: '26', gender: 'female', waist: '70' }
    }
    
    const exampleData = examples[example]
    if (exampleData) {
      setWeight(exampleData.weight)
      setHeight(exampleData.height)
      setAge(exampleData.age)
      setGender(exampleData.gender)
      setWaist(exampleData.waist)
    }
  }

  const examples = [
    { label: 'Uomo Adulto', value: 'uomo', description: '75 kg, 180 cm, 30 anni, vita 85 cm' },
    { label: 'Donna Adulta', value: 'donna', description: '65 kg, 165 cm, 25 anni, vita 75 cm' },
    { label: 'Uomo Atleta', value: 'uomo_atleta', description: '80 kg, 185 cm, 28 anni, vita 80 cm' },
    { label: 'Donna Atleta', value: 'donna_atleta', description: '60 kg, 170 cm, 26 anni, vita 70 cm' }
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
    <CalculatorLayout
      title="Calcolatrice Percentuale di Grasso Corporeo"
      description="Stima la percentuale di grasso corporeo per monitorare la composizione corporea"
      examples={examples}
      onExampleClick={handleExample}
      faqItems={faqItems}
    >
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

        <Button onClick={handleCalculate} className="w-full">
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
                  {result.bodyFatPercentage.toFixed(1)}%
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
                <p className="text-blue-800">{result.recommendation}</p>
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
                  <span className="font-medium">{result.bodyFatPercentage.toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  )
}
