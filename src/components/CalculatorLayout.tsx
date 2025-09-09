"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Copy, Share2, Lightbulb, HelpCircle, Calculator } from "lucide-react"

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
    <div className="space-y-6">
      {/* Header - Mobile First */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calculator className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">{title}</h1>
        </div>
        <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
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

        <TabsContent value="calculator" className="space-y-4 mt-6">
          <Card className="calculator-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5 text-blue-500" />
                Calculadora
              </CardTitle>
              <CardDescription className="text-sm">
                Ingresa los valores y obtén el resultado con explicación paso a paso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {children}
              
              {/* Action Buttons - Mobile First */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button onClick={handleCopyResult} className="calculator-action-button">
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar resultado
                </Button>
                <Button onClick={handleShare} className="calculator-action-button">
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

        <TabsContent value="examples" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Ejemplos Rápidos</CardTitle>
              <CardDescription className="text-sm">
                Haz clic en un ejemplo para autocompletar la calculadora
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    className="calculator-example-button"
                    onClick={() => onExampleClick?.(example.values)}
                  >
                    <div className="font-medium text-sm">{example.label}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-4 mt-6">
          {/* FAQ */}
          {faqItems.length > 0 && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Preguntas Frecuentes</CardTitle>
                <CardDescription className="text-sm">
                  Respuestas a las dudas más comunes sobre esta calculadora
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-sm">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm">
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
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Calculadoras Relacionadas</CardTitle>
                <CardDescription className="text-sm">
                  Otras calculadoras que podrían interesarte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {relatedLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="calculator-help-button"
                    >
                      <span className="text-sm">{link.label}</span>
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
