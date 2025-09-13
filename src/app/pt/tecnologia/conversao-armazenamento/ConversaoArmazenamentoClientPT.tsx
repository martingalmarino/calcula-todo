"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { HardDrive, Calculator } from 'lucide-react'
import { convertStorage, type StorageConversionResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function ConversaoArmazenamentoClientPT() {
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('GB')
  const [toUnit, setToUnit] = useState('MB')
  const [base, setBase] = useState<'decimal' | 'binary'>('decimal')
  const [results, setResults] = useState<StorageConversionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!value) {
      setError('Por favor, digite um valor para converter')
      return
    }

    try {
      const valueNum = parseFloat(value)
      
      if (isNaN(valueNum) || valueNum < 0) {
        setError('Por favor, digite um valor numérico válido maior ou igual a zero')
        return
      }

      const result = convertStorage(valueNum, fromUnit, toUnit, base)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao converter o valor')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Tecnologia', href: '/pt/tecnologia/' },
    { label: 'Conversão de Armazenamento', href: '/pt/tecnologia/conversao-armazenamento/' }
  ]

  const examples = [
    {
      label: 'Exemplo: 1 GB para MB (decimal)',
      values: { value: '1', fromUnit: 'GB', toUnit: 'MB', base: 'decimal' }
    },
    {
      label: 'Exemplo: 500 MB para GB (binário)',
      values: { value: '500', fromUnit: 'MB', toUnit: 'GB', base: 'binary' }
    },
    {
      label: 'Exemplo: 2 TB para KB (decimal)',
      values: { value: '2', fromUnit: 'TB', toUnit: 'KB', base: 'decimal' }
    }
  ]

  const faqItems = [
    {
      question: 'Qual é a diferença entre base decimal e binária?',
      answer: 'Base decimal usa 1000 (1 KB = 1000 bytes), enquanto base binária usa 1024 (1 KB = 1024 bytes). A base binária é mais precisa para sistemas de computação.'
    },
    {
      question: 'Quando usar base decimal vs binária?',
      answer: 'Use base decimal para marketing de produtos (HDs, SSDs) e base binária para sistemas operacionais e programação, onde a precisão é crucial.'
    },
    {
      question: 'Por que há diferença entre o que compro e o que vejo?',
      answer: 'Fabricantes usam base decimal (1000) para marketing, mas sistemas operacionais usam base binária (1024), causando a diferença que você observa.'
    },
    {
      question: 'Quais unidades são suportadas?',
      answer: 'Suportamos conversão entre bytes, KB, MB, GB, TB, PB e EB, tanto em base decimal quanto binária.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Velocidade de Download',
      href: '/pt/tecnologia/velocidade-download/'
    },
    {
      label: 'Análise de Latência',
      href: '/pt/tecnologia/analise-latencia/'
    },
    {
      label: 'Outras Calculadoras de Tecnologia',
      href: '/pt/tecnologia/'
    }
  ]

  const units = [
    { value: 'B', label: 'Bytes (B)' },
    { value: 'KB', label: 'Kilobytes (KB)' },
    { value: 'MB', label: 'Megabytes (MB)' },
    { value: 'GB', label: 'Gigabytes (GB)' },
    { value: 'TB', label: 'Terabytes (TB)' },
    { value: 'PB', label: 'Petabytes (PB)' },
    { value: 'EB', label: 'Exabytes (EB)' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Conversor de Armazenamento',
            description: 'Converte entre diferentes unidades de armazenamento usando base decimal e binária',
            url: '/pt/tecnologia/conversao-armazenamento/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsPT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Conversor de Armazenamento"
            description="Converte entre diferentes unidades de armazenamento usando base decimal e binária"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setValue(values.value as string)
              setFromUnit(values.fromUnit as string)
              setToUnit(values.toUnit as string)
              setBase(values.base as 'decimal' | 'binary')
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="value">Valor</Label>
                  <Input
                    id="value"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Ex: 1"
                  />
                </div>
                <div>
                  <Label htmlFor="base">Base de Conversão</Label>
                  <Select value={base} onValueChange={(value: 'decimal' | 'binary') => setBase(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decimal">Decimal (1000)</SelectItem>
                      <SelectItem value="binary">Binária (1024)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromUnit">De</Label>
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="toUnit">Para</Label>
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Converter
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className="mt-4 bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center gap-2">
                      <HardDrive className="h-5 w-5" />
                      Resultado da Conversão
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <HardDrive className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Valor Original</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          {results.value} {results.fromUnit}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <HardDrive className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Valor Convertido</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {results.convertedValue.toFixed(6)} {results.toUnit}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Base utilizada:</strong> {results.base === 'decimal' ? 'Decimal (1000)' : 'Binária (1024)'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Comparação:</strong> {results.comparison}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
