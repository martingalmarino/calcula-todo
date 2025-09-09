import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, MessageSquare, Bug, Lightbulb } from 'lucide-react'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Contacto - Calculadoras Online',
  description: 'Contáctanos para sugerencias, reportar errores o solicitar nuevas calculadoras.',
  keywords: ['contacto', 'sugerencias', 'reportar errores', 'nuevas calculadoras']
})

export default function ContactoPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Contacto
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ¿Tienes sugerencias, reportas un error o necesitas una nueva calculadora? ¡Contáctanos!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Email</h4>
                <p className="text-muted-foreground">contacto@calculadoras-online.com</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tiempo de Respuesta</h4>
                <p className="text-muted-foreground">Generalmente respondemos en 24-48 horas</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>¿Cómo podemos ayudarte?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Sugerencias</h4>
                  <p className="text-sm text-muted-foreground">¿Tienes ideas para nuevas calculadoras o mejoras?</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bug className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Reportar Errores</h4>
                  <p className="text-sm text-muted-foreground">¿Encontraste un error en alguna calculadora?</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Preguntas Generales</h4>
                  <p className="text-sm text-muted-foreground">¿Tienes dudas sobre cómo usar nuestras calculadoras?</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Formulario de Contacto</CardTitle>
            <CardDescription>
              Envíanos un mensaje y te responderemos lo antes posible
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre
                </label>
                <Input id="name" placeholder="Tu nombre" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Asunto
              </label>
              <Input id="subject" placeholder="¿En qué podemos ayudarte?" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                className="w-full min-h-[120px] px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Describe tu consulta, sugerencia o problema..."
              />
            </div>
            <Button className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Enviar Mensaje
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
