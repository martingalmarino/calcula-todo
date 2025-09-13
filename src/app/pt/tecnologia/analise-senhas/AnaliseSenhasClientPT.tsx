"use client"

import { useState } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Shield, Calculator } from 'lucide-react'
import { analyzePasswordEntropy, type PasswordEntropyResult } from '@/lib/math/technology'
import { jsonLdCalculator } from '@/lib/seo'

export default function AnaliseSenhasClientPT() {
  const [password, setPassword] = useState('')
  const [results, setResults] = useState<PasswordEntropyResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    setError(null)
    
    if (!password) {
      setError('Por favor, digite uma senha para analisar')
      return
    }

    try {
      const result = analyzePasswordEntropy(password)
      setResults(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao analisar a senha')
    }
  }

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Tecnologia', href: '/pt/tecnologia/' },
    { label: 'Análise de Senhas', href: '/pt/tecnologia/analise-senhas/' }
  ]

  const examples = [
    {
      label: 'Exemplo: senha fraca',
      values: { password: '123456' }
    },
    {
      label: 'Exemplo: senha média',
      values: { password: 'MinhaSenh@123' }
    },
    {
      label: 'Exemplo: senha forte',
      values: { password: 'M1nh@S3nh@F0rt3!' }
    }
  ]

  const faqItems = [
    {
      question: 'Como é calculada a força da senha?',
      answer: 'A força é calculada baseada em comprimento, complexidade, uso de caracteres especiais, números, maiúsculas e minúsculas, e ausência de padrões comuns.'
    },
    {
      question: 'O que torna uma senha forte?',
      answer: 'Uma senha forte tem pelo menos 12 caracteres, inclui maiúsculas, minúsculas, números e símbolos, e não contém palavras comuns ou padrões previsíveis.'
    },
    {
      question: 'Por que não devo usar senhas comuns?',
      answer: 'Senhas como "123456" ou "password" são facilmente quebradas por ataques de força bruta. Use senhas únicas e complexas para cada conta.'
    },
    {
      question: 'Como criar senhas seguras?',
      answer: 'Use frases longas, substitua letras por números/símbolos, evite informações pessoais, e considere usar um gerenciador de senhas para gerar senhas únicas.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Conversão de Cores',
      href: '/pt/tecnologia/conversao-cores/'
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

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'muy_débil':
        return 'text-red-600'
      case 'débil':
        return 'text-orange-600'
      case 'medio':
        return 'text-yellow-600'
      case 'fuerte':
        return 'text-blue-600'
      case 'muy_fuerte':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStrengthBgColor = (strength: string) => {
    switch (strength) {
      case 'muy_débil':
        return 'bg-red-50 border-red-200'
      case 'débil':
        return 'bg-orange-50 border-orange-200'
      case 'medio':
        return 'bg-yellow-50 border-yellow-200'
      case 'fuerte':
        return 'bg-blue-50 border-blue-200'
      case 'muy_fuerte':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getStrengthLabel = (strength: string) => {
    switch (strength) {
      case 'muy_débil':
        return 'Muito Fraca'
      case 'débil':
        return 'Fraca'
      case 'medio':
        return 'Média'
      case 'fuerte':
        return 'Forte'
      case 'muy_fuerte':
        return 'Muito Forte'
      default:
        return strength
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Analisador de Senhas',
            description: 'Analisa força e segurança de senhas',
            url: '/pt/tecnologia/analise-senhas/',
            category: 'Tecnologia'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsPT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Analisador de Senhas"
            description="Analisa força e segurança de senhas"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setPassword(values.password as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="password">Senha para Analisar</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha aqui..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  ⚠️ Esta análise é feita localmente no seu navegador. Sua senha não é enviada para nenhum servidor.
                </p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Analisar Senha
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <Card className={`mt-4 ${getStrengthBgColor(results.strength)}`}>
                  <CardHeader>
                    <CardTitle className={`${getStrengthColor(results.strength)} flex items-center gap-2`}>
                      <Shield className="h-5 w-5" />
                      Resultado da Análise
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Força da Senha</span>
                        </div>
                        <p className={`text-2xl font-bold ${getStrengthColor(results.strength)}`}>
                          {getStrengthLabel(results.strength)}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Pontuação</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          {results.entropy.toFixed(1)} bits
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Tempo para Quebrar</span>
                      </div>
                        <p className="text-lg font-bold text-purple-600">
                          {results.crackTime.formatted}
                        </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Análise Detalhada:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Comprimento:</span>
                          <span className="text-sm font-medium">{results.password.length} caracteres</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Entropia:</span>
                          <span className="text-sm font-medium">{results.entropy.toFixed(1)} bits</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Hash MD5:</span>
                          <span className="text-sm font-medium font-mono">{results.hashMD5.substring(0, 8)}...</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Hash SHA256:</span>
                          <span className="text-sm font-medium font-mono">{results.hashSHA256.substring(0, 8)}...</span>
                        </div>
                      </div>
                    </div>

                    {results.suggestions.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-800">Sugestões de Melhoria:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {results.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
