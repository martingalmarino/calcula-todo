"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Copy, Share2, Lightbulb, HelpCircle, Calculator } from "lucide-react"
import { usePathname } from 'next/navigation'

interface Example {
  label: string
  values: Record<string, unknown>
}

interface FAQItem {
  question: string
  answer: string
}

interface RelatedLink {
  label: string
  href: string
}

interface CalculatorLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  examples?: Example[]
  faqItems?: FAQItem[]
  relatedLinks?: RelatedLink[]
  disclaimer?: string
  onExampleClick?: (values: Record<string, unknown>) => void
}

export function CalculatorLayout({
  title,
  description,
  children,
  examples = [],
  faqItems = [],
  relatedLinks = [],
  disclaimer,
  onExampleClick
}: CalculatorLayoutProps) {
  const [activeTab, setActiveTab] = useState("calculator")
  const pathname = usePathname()
  const isItalian = pathname.startsWith('/it')

  const handleCopyResult = () => {
    // Implementar lógica de copiado
    console.log("Copiar resultado")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header - Mobile First con mejor branding */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600">{title}</h1>
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* Main Content - Mobile First */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="calculator-tabs">
          <TabsTrigger value="calculator" className="calculator-tab">Calculadora</TabsTrigger>
          <TabsTrigger value="examples" className="calculator-tab">Ejemplos</TabsTrigger>
          <TabsTrigger value="help" className="calculator-tab">Ayuda</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6 mt-8">
          <Card className="calculator-card shadow-lg">
            <CardHeader className="pb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-blue-600" />
                </div>
                Calculadora
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Ingresa los valores y obtén el resultado con explicación paso a paso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {children}
              
              {/* Action Buttons - Mobile First con mejor diseño */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
                <Button onClick={handleCopyResult} className="calculator-action-button flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar resultado
                </Button>
                <Button onClick={handleShare} className="calculator-action-button flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          {disclaimer && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <strong>Nota:</strong> {disclaimer}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="examples" className="space-y-6 mt-8">
          <Card className="calculator-card shadow-lg">
            <CardHeader className="pb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                </div>
                Ejemplos Rápidos
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                Haz clic en un ejemplo para autocompletar la calculadora
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    className="calculator-example-button group"
                    onClick={() => onExampleClick?.(example.values)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm group-hover:bg-blue-200 transition-colors">
                        {index + 1}
                      </div>
                      <div className="font-medium text-base text-left">{example.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-6 mt-8">
          {/* FAQ */}
          {faqItems.length > 0 && (
            <Card className="calculator-card shadow-lg">
              <CardHeader className="pb-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <HelpCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  {isItalian ? 'Domande Frequenti' : 'Preguntas Frecuentes'}
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  {isItalian ? 'Risposte alle domande più comuni su questa calcolatrice' : 'Respuestas a las dudas más comunes sobre esta calculadora'}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg">
                      <AccordionTrigger className="text-left text-base px-4 py-3 hover:bg-gray-50 rounded-lg">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 text-base px-4 pb-3">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}

          {/* Related Links */}
          {relatedLinks.length > 0 && (
            <Card className="calculator-card shadow-lg">
              <CardHeader className="pb-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calculator className="h-5 w-5 text-orange-600" />
                  </div>
                  Calculadoras Relacionadas
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Otras calculadoras que podrían interesarte
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-3">
                  {relatedLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="calculator-help-button group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-medium text-sm group-hover:bg-orange-200 transition-colors">
                          {index + 1}
                        </div>
                        <span className="text-base font-medium">{link.label}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
