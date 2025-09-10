import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, MessageSquare, Bug, Lightbulb } from 'lucide-react'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Contatto - Calcolatrici Online',
  description: 'Contattaci per suggerimenti, segnalare errori o richiedere nuove calcolatrici.',
  keywords: ['contatto', 'suggerimenti', 'segnalare errori', 'nuove calcolatrici']
})

export default function ContattoPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Contatto
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hai suggerimenti, vuoi segnalare un errore o hai bisogno di una nuova calcolatrice? Contattaci!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Informazioni di Contatto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Email</h4>
                <p className="text-muted-foreground">contatto@calcolatrici-online.com</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Tempo di Risposta</h4>
                <p className="text-muted-foreground">Generalmente rispondiamo entro 24-48 ore</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Come possiamo aiutarti?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Suggerimenti</h4>
                  <p className="text-sm text-muted-foreground">Hai idee per nuove calcolatrici o miglioramenti?</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bug className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Segnalare Errori</h4>
                  <p className="text-sm text-muted-foreground">Hai trovato un errore in qualche calcolatrice?</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Domande Generali</h4>
                  <p className="text-sm text-muted-foreground">Hai dubbi su come usare le nostre calcolatrici?</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Modulo di Contatto</CardTitle>
            <CardDescription>
              Inviaci un messaggio e ti risponderemo il prima possibile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <Input id="name" placeholder="Il tuo nome" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="tua@email.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Oggetto
              </label>
              <Input id="subject" placeholder="Come possiamo aiutarti?" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Messaggio
              </label>
              <textarea
                id="message"
                className="w-full min-h-[120px] px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Descrivi la tua richiesta, suggerimento o problema..."
              />
            </div>
            <Button className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Invia Messaggio
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
