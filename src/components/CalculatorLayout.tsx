"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Copy, Share2, Lightbulb, HelpCircle } from "lucide-react"

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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="examples">Ejemplos</TabsTrigger>
          <TabsTrigger value="help">Ayuda</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Calculadora
              </CardTitle>
              <CardDescription>
                Ingresa los valores y obtén el resultado con explicación paso a paso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {children}
              
              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCopyResult} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar resultado
                </Button>
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          {disclaimer && (
            <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Nota:</strong> {disclaimer}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ejemplos Rápidos</CardTitle>
              <CardDescription>
                Haz clic en un ejemplo para autocompletar la calculadora
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {examples.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => onExampleClick?.(example.values)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{example.label}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-6">
          {/* FAQ */}
          {faqItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Preguntas Frecuentes</CardTitle>
                <CardDescription>
                  Respuestas a las dudas más comunes sobre esta calculadora
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
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
              <CardHeader>
                <CardTitle>Calculadoras Relacionadas</CardTitle>
                <CardDescription>
                  Otras calculadoras que podrían interesarte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {relatedLinks.map((link, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-start h-auto p-3"
                      asChild
                    >
                      <a href={link.href}>
                        {link.label}
                      </a>
                    </Button>
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
