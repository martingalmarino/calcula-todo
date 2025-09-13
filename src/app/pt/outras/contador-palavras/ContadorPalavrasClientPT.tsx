"use client"

import { useState, useEffect } from 'react'
import { Container } from '@/components/Container'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { BreadcrumbsPT } from '@/components/BreadcrumbsPT'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Type, Clock, FileText, Hash } from 'lucide-react'
import { countWordsAndCharacters, type WordCountResult } from '@/lib/math/others'
import { jsonLdCalculator } from '@/lib/seo'

export default function ContadorPalavrasClientPT() {
  const [text, setText] = useState('')
  const [results, setResults] = useState<WordCountResult | null>(null)

  useEffect(() => {
    if (text.trim()) {
      const result = countWordsAndCharacters(text)
      setResults(result)
    } else {
      setResults(null)
    }
  }, [text])

  const breadcrumbs = [
    { label: 'Início', href: '/pt/' },
    { label: 'Outras', href: '/pt/outras/' },
    { label: 'Contador de Palavras', href: '/pt/outras/contador-palavras/' }
  ]

  const examples = [
    {
      label: 'Exemplo: Texto curto',
      values: { text: 'Olá mundo! Este é um exemplo de texto para contar palavras e caracteres.' }
    },
    {
      label: 'Exemplo: Texto médio',
      values: { text: 'A tecnologia está transformando rapidamente o mundo ao nosso redor. Desde smartphones até inteligência artificial, estamos vendo mudanças incríveis todos os dias. É importante acompanhar essas evoluções para não ficarmos para trás.' }
    },
    {
      label: 'Exemplo: Texto longo',
      values: { text: 'A educação é um dos pilares fundamentais da sociedade moderna. Através do conhecimento, as pessoas podem desenvolver suas habilidades, expandir seus horizontes e contribuir para o progresso da humanidade. A tecnologia tem revolucionado a forma como aprendemos, tornando a educação mais acessível e interativa. Plataformas online, aplicativos educativos e recursos digitais estão transformando o processo de ensino e aprendizagem, permitindo que estudantes de todas as idades tenham acesso a informações de qualidade em qualquer lugar do mundo.' }
    }
  ]

  const faqItems = [
    {
      question: 'Como funciona o contador de palavras?',
      answer: 'O contador analisa o texto em tempo real e conta automaticamente palavras, caracteres (com e sem espaços), frases e parágrafos conforme você digita.'
    },
    {
      question: 'O que conta como uma palavra?',
      answer: 'Uma palavra é qualquer sequência de caracteres separada por espaços. Números e símbolos também são contados como palavras.'
    },
    {
      question: 'Como é calculado o tempo de leitura?',
      answer: 'O tempo de leitura é estimado baseado na velocidade média de leitura de 200 palavras por minuto para adultos.'
    },
    {
      question: 'O contador funciona com textos em outros idiomas?',
      answer: 'Sim, o contador funciona com textos em qualquer idioma, incluindo português, inglês, espanhol, francês e outros.'
    }
  ]

  const relatedLinks = [
    {
      label: 'Calculadora de Porcentagens',
      href: '/pt/matematicas/porcentajes/'
    },
    {
      label: 'Outras Calculadoras',
      href: '/pt/outras/'
    },
    {
      label: 'Calculadoras Curiosas',
      href: '/pt/curiosas/'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Contador de Palavras e Caracteres',
            description: 'Conta palavras, caracteres, frases e parágrafos em tempo real',
            url: '/pt/outras/contador-palavras/',
            category: 'Ferramentas'
          }))
        }}
      />
      
      <Container>
        <BreadcrumbsPT items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Contador de Palavras e Caracteres"
            description="Conta palavras, caracteres, frases e parágrafos em tempo real"
            examples={examples}
            faqItems={faqItems}
            onExampleClick={(values) => {
              setText(values.text as string)
            }}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="text">Digite ou cole seu texto aqui</Label>
                <Textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Digite ou cole seu texto aqui para contar palavras e caracteres automaticamente..."
                  className="min-h-[200px] resize-y"
                />
              </div>

              {results && (
                <Card className="mt-4 bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-purple-700 flex items-center gap-2">
                      <Type className="h-5 w-5" />
                      Estatísticas do Texto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Type className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Palavras</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{results.words}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Caracteres</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{results.characters}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Sem Espaços</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{results.charactersNoSpaces}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Tempo Leitura</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-600">{results.readingTime} min</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Frases</span>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">{results.sentences}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Parágrafos</span>
                        </div>
                        <p className="text-2xl font-bold text-pink-600">{results.paragraphs}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {!text.trim() && (
                <Card className="mt-4 bg-gray-50 border-gray-200">
                  <CardContent className="pt-6">
                    <div className="text-center text-gray-500">
                      <Type className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium">Digite algum texto para ver as estatísticas</p>
                      <p className="text-sm">O contador atualiza automaticamente conforme você digita</p>
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
