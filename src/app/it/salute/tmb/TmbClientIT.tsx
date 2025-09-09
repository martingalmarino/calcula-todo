"use client"

import { useState } from 'react'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { calculateTMB } from '@/lib/math/health'

export default function TmbClientIT() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)
    const ageNum = parseInt(age)
    
    if (!weight || !height || !age || !gender) {
      setError('Inserisci tutti i campi richiesti')
      return
    }
    
    if (weightNum <= 0 || heightNum <= 0 || ageNum <= 0) {
      setError('Peso, altezza ed età devono essere valori positivi')
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
    
    try {
      const tmbResult = calculateTMB(weightNum, heightNum, ageNum, gender as 'male' | 'female')
      setResult(tmbResult)
    } catch (err) {
      setError('Errore nel calcolo del TMB')
    }
  }

  const handleExample = (example: string) => {
    const examples: { [key: string]: { weight: string; height: string; age: string; gender: string } } = {
      'uomo': { weight: '75', height: '180', age: '30', gender: 'male' },
      'donna': { weight: '65', height: '165', age: '25', gender: 'female' },
      'uomo_anziano': { weight: '80', height: '175', age: '60', gender: 'male' },
      'donna_anziana': { weight: '70', height: '160', age: '55', gender: 'female' }
    }
    
    const exampleData = examples[example]
    if (exampleData) {
      setWeight(exampleData.weight)
      setHeight(exampleData.height)
      setAge(exampleData.age)
      setGender(exampleData.gender)
    }
  }

  const examples = [
    { label: 'Uomo Adulto', value: 'uomo', description: '75 kg, 180 cm, 30 anni' },
    { label: 'Donna Adulta', value: 'donna', description: '65 kg, 165 cm, 25 anni' },
    { label: 'Uomo Anziano', value: 'uomo_anziano', description: '80 kg, 175 cm, 60 anni' },
    { label: 'Donna Anziana', value: 'donna_anziana', description: '70 kg, 160 cm, 55 anni' }
  ]

  const faqItems = [
    {
      question: 'Cos\'è il TMB?',
      answer: 'Il Tasso Metabolico Basale (TMB) è la quantità di calorie che il tuo corpo brucia a riposo per mantenere le funzioni vitali come respirazione, circolazione e digestione.'
    },
    {
      question: 'Come viene calcolato il TMB?',
      answer: 'Il TMB viene calcolato usando l\'equazione di Harris-Benedict, che considera peso, altezza, età e sesso. Questa formula fornisce una stima delle calorie necessarie per il metabolismo basale.'
    },
    {
      question: 'Perché è importante conoscere il TMB?',
      answer: 'Conoscere il TMB ti aiuta a pianificare la tua dieta e capire quante calorie assumere per mantenere, perdere o aumentare di peso in modo sano.'
    },
    {
      question: 'Il TMB cambia nel tempo?',
      answer: 'Sì, il TMB diminuisce con l\'età e può variare in base a fattori come massa muscolare, ormoni, stress e condizioni di salute. È importante ricalcolarlo periodicamente.'
    }
  ]

  return (
    <CalculatorLayout
      title="Calcolatrice Tasso Metabolico Basale (TMB)"
      description="Calcola il tuo tasso metabolico basale per scoprire quante calorie bruci a riposo"
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
        </div>

        <Button onClick={handleCalculate} className="w-full">
          Calcola TMB
        </Button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risultato TMB</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {result.tmb.toFixed(0)} kcal/giorno
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  Tasso Metabolico Basale
                </div>
                <div className="text-gray-600 mb-4">
                  Tasso metabolico basale calcolato
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
                  <span>TMB:</span>
                  <span className="font-medium">{result.tmb.toFixed(0)} kcal/giorno</span>
                </div>
                <div className="flex justify-between">
                  <span>Formula:</span>
                  <span className="font-medium">{result.method}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  )
}
