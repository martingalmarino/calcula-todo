"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Zap, AlertCircle, Info, Plus, Minus } from 'lucide-react'
import { jsonLdCalculator } from '@/lib/seo'
import { getBreadcrumbs } from '@/lib/site.config'

interface BondData {
  bond: string
  energy: number
  count: number
  totalEnergy: number
}

interface EnergiaEnlaceResult {
  deltaH: number
  bondsBroken: BondData[]
  bondsFormed: BondData[]
  totalBroken: number
  totalFormed: number
  reactionType: 'exotérmica' | 'endotérmica'
  description: string
  color: string
}

// Energías de enlace comunes (kJ/mol)
const BOND_ENERGIES: Record<string, number> = {
  'H-H': 436,
  'H-C': 413,
  'H-N': 391,
  'H-O': 463,
  'H-F': 567,
  'H-Cl': 431,
  'H-Br': 366,
  'H-I': 299,
  'C-C': 348,
  'C=C': 614,
  'C≡C': 839,
  'C-N': 293,
  'C=N': 615,
  'C≡N': 891,
  'C-O': 358,
  'C=O': 745,
  'C≡O': 1072,
  'C-F': 485,
  'C-Cl': 328,
  'C-Br': 276,
  'C-I': 240,
  'N-N': 163,
  'N=N': 418,
  'N≡N': 941,
  'N-O': 201,
  'N=O': 607,
  'O-O': 146,
  'O=O': 495,
  'F-F': 155,
  'Cl-Cl': 242,
  'Br-Br': 193,
  'I-I': 151
}

export default function EnergiaEnlaceClient() {
  const [bondsBroken, setBondsBroken] = useState<BondData[]>([])
  const [bondsFormed, setBondsFormed] = useState<BondData[]>([])
  const [newBond, setNewBond] = useState('')
  const [newCount, setNewCount] = useState('1')
  const [newEnergy, setNewEnergy] = useState('')
  const [bondType, setBondType] = useState<'broken' | 'formed'>('broken')
  const [results, setResults] = useState<EnergiaEnlaceResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const addBond = () => {
    if (!newBond.trim()) {
      setError('Por favor, ingresa un enlace')
      return
    }

    const count = parseInt(newCount) || 1
    let energy: number

    if (newEnergy) {
      energy = parseFloat(newEnergy)
      if (isNaN(energy)) {
        setError('La energía debe ser un número válido')
        return
      }
    } else {
      energy = BOND_ENERGIES[newBond.trim()]
      if (!energy) {
        setError(`Energía de enlace no encontrada para ${newBond}. Ingresa la energía manualmente.`)
        return
      }
    }

    const bondData: BondData = {
      bond: newBond.trim(),
      energy,
      count,
      totalEnergy: energy * count
    }

    if (bondType === 'broken') {
      setBondsBroken([...bondsBroken, bondData])
    } else {
      setBondsFormed([...bondsFormed, bondData])
    }

    setNewBond('')
    setNewCount('1')
    setNewEnergy('')
    setError(null)
  }

  const removeBond = (index: number, type: 'broken' | 'formed') => {
    if (type === 'broken') {
      setBondsBroken(bondsBroken.filter((_, i) => i !== index))
    } else {
      setBondsFormed(bondsFormed.filter((_, i) => i !== index))
    }
  }

  const calculateDeltaH = (): EnergiaEnlaceResult => {
    const totalBroken = bondsBroken.reduce((sum, bond) => sum + bond.totalEnergy, 0)
    const totalFormed = bondsFormed.reduce((sum, bond) => sum + bond.totalEnergy, 0)
    
    // ΔH = Σ(Enlaces rotos) - Σ(Enlaces formados)
    const deltaH = totalBroken - totalFormed

    let reactionType: 'exotérmica' | 'endotérmica'
    let description: string
    let color: string

    if (deltaH < 0) {
      reactionType = 'exotérmica'
      description = 'La reacción libera energía'
      color = 'text-red-600'
    } else if (deltaH > 0) {
      reactionType = 'endotérmica'
      description = 'La reacción absorbe energía'
      color = 'text-blue-600'
    } else {
      reactionType = 'exotérmica' // Neutral
      description = 'La reacción no tiene cambio neto de energía'
      color = 'text-gray-600'
    }

    return {
      deltaH: Math.round(deltaH * 100) / 100,
      bondsBroken,
      bondsFormed,
      totalBroken,
      totalFormed,
      reactionType,
      description,
      color
    }
  }

  const handleCalculate = () => {
    setError(null)
    
    if (bondsBroken.length === 0 && bondsFormed.length === 0) {
      setError('Por favor, agrega al menos un enlace roto o formado')
      return
    }

    try {
      const result = calculateDeltaH()
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al calcular la energía de enlace')
    }
  }

  const breadcrumbs = getBreadcrumbs('/quimica/energia-enlace')

  const examples = [
    {
      label: 'Ejemplo: Combustión de metano',
      values: {
        bondsBroken: [
          { bond: 'C-H', energy: 413, count: 4, totalEnergy: 1652 },
          { bond: 'O=O', energy: 495, count: 2, totalEnergy: 990 }
        ],
        bondsFormed: [
          { bond: 'C=O', energy: 745, count: 2, totalEnergy: 1490 },
          { bond: 'H-O', energy: 463, count: 4, totalEnergy: 1852 }
        ]
      }
    }
  ]

  const faqItems = [
    {
      question: '¿Qué es la energía de enlace?',
      answer: 'La energía de enlace es la energía necesaria para romper un enlace químico o la energía liberada cuando se forma un enlace.'
    },
    {
      question: '¿Cómo se calcula ΔH usando energías de enlace?',
      answer: 'ΔH = Σ(Enlaces rotos) - Σ(Enlaces formados). Si ΔH < 0, la reacción es exotérmica. Si ΔH > 0, es endotérmica.'
    },
    {
      question: '¿Qué significa una reacción exotérmica?',
      answer: 'Una reacción exotérmica libera energía al entorno. Los productos tienen menos energía que los reactivos.'
    },
    {
      question: '¿Qué significa una reacción endotérmica?',
      answer: 'Una reacción endotérmica absorbe energía del entorno. Los productos tienen más energía que los reactivos.'
    },
    {
      question: '¿Son precisos estos cálculos?',
      answer: 'Estos cálculos son aproximaciones. Las energías de enlace pueden variar según el entorno molecular y otros factores.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Calculadora de Energía de Enlace',
            description: 'Calcula la variación de energía (ΔH) en reacciones químicas usando enlaces rotos y formados',
            url: '/quimica/energia-enlace/',
            category: 'Química'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Energía de Enlace"
            description="Calcula la variación de energía (ΔH) en reacciones químicas usando enlaces rotos y formados"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values: Record<string, unknown>) => {
              setBondsBroken((values.bondsBroken as BondData[]) || [])
              setBondsFormed((values.bondsFormed as BondData[]) || [])
              setResults(null)
              setError(null)
            }}
          >
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  Calculadora de Energía de Enlace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Agregar enlaces */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900">Agregar Enlaces</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tipo de enlace</label>
                      <select
                        value={bondType}
                        onChange={(e) => setBondType(e.target.value as 'broken' | 'formed')}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        aria-label="Tipo de enlace"
                      >
                        <option value="broken">Enlaces Rotos</option>
                        <option value="formed">Enlaces Formados</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Enlace (ej: C-H, O=O)</label>
                      <Input
                        type="text"
                        placeholder="Ej: C-H"
                        value={newBond}
                        onChange={(e) => setNewBond(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cantidad</label>
                      <Input
                        type="number"
                        min="1"
                        value={newCount}
                        onChange={(e) => setNewCount(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Energía (kJ/mol) - Opcional</label>
                      <Input
                        type="number"
                        step="any"
                        placeholder="Se detecta automáticamente"
                        value={newEnergy}
                        onChange={(e) => setNewEnergy(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={addBond} className="w-full calculator-button">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Enlace
                  </Button>
                </div>

                {/* Enlaces rotos */}
                {bondsBroken.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Minus className="w-4 h-4 text-red-600" />
                      Enlaces Rotos
                    </h3>
                    <div className="space-y-2">
                      {bondsBroken.map((bond, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-red-50 border border-red-200 rounded">
                          <span className="text-sm">
                            {bond.bond} × {bond.count} = {bond.totalEnergy} kJ/mol
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeBond(index, 'broken')}
                            className="text-red-600 border-red-300 hover:bg-red-100"
                          >
                            Eliminar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enlaces formados */}
                {bondsFormed.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-green-600" />
                      Enlaces Formados
                    </h3>
                    <div className="space-y-2">
                      {bondsFormed.map((bond, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                          <span className="text-sm">
                            {bond.bond} × {bond.count} = {bond.totalEnergy} kJ/mol
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeBond(index, 'formed')}
                            className="text-green-600 border-green-300 hover:bg-green-100"
                          >
                            Eliminar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600">{error}</span>
                  </div>
                )}

                <Button 
                  onClick={handleCalculate}
                  className="w-full calculator-button"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Calcular ΔH
                </Button>

                {results && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        ΔH = {results.deltaH} kJ/mol
                      </div>
                      <div className={`text-lg font-semibold ${results.color}`}>
                        Reacción {results.reactionType}
                      </div>
                      <div className="text-sm text-gray-600">
                        {results.description}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-2 bg-red-50 rounded">
                        <div className="font-semibold text-red-600">Enlaces Rotos</div>
                        <div className="text-lg font-bold">{results.totalBroken} kJ/mol</div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-semibold text-green-600">Enlaces Formados</div>
                        <div className="text-lg font-bold">{results.totalFormed} kJ/mol</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          <strong>Fórmula:</strong> ΔH = Σ(Enlaces rotos) - Σ(Enlaces formados)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          <strong>Cálculo:</strong> {results.totalBroken} - {results.totalFormed} = {results.deltaH} kJ/mol
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
