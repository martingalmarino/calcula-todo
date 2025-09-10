import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, MessageSquare, Bug, Lightbulb } from 'lucide-react'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Contato - Calculadoras Online',
  description: 'Entre em contato conosco para sugestões, reportar erros ou solicitar novas calculadoras.',
  keywords: ['contato', 'sugestões', 'reportar erros', 'novas calculadoras']
})

export default function ContatoPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Contato
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tem sugestões, encontrou um erro ou precisa de uma nova calculadora? Entre em contato conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Informações de Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Email</h4>
                <p className="text-muted-foreground">contato@calculatodo.online</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tempo de Resposta</h4>
                <p className="text-muted-foreground">Geralmente respondemos em 24-48 horas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Como podemos ajudá-lo?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Sugestões</h4>
                  <p className="text-sm text-muted-foreground">Tem ideias para novas calculadoras ou melhorias?</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bug className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Reportar Erros</h4>
                  <p className="text-sm text-muted-foreground">Encontrou um erro em alguma calculadora?</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Perguntas Gerais</h4>
                  <p className="text-sm text-muted-foreground">Tem dúvidas sobre como usar nossas calculadoras?</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulário de Contato</CardTitle>
            <CardDescription>
              Envie-nos uma mensagem e responderemos o mais rápido possível
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <Input id="name" placeholder="Seu nome" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Assunto
              </label>
              <Input id="subject" placeholder="Em que podemos ajudá-lo?" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                className="w-full min-h-[120px] px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Descreva sua consulta, sugestão ou problema..."
              />
            </div>
            <Button className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Enviar Mensagem
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
