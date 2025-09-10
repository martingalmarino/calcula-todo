import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, Users, Target, Heart } from 'lucide-react'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Chi Siamo - Calcolatrici Online',
  description: 'Scopri la nostra missione di rendere la matematica più accessibile con calcolatrici online gratuite ed educative.',
  keywords: ['chi siamo', 'missione', 'matematica accessibile', 'educazione gratuita']
})

export default function ChiSiamoPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Chi Siamo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Rendere la matematica più accessibile a tutti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Calcolatrici Gratuite</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Strumenti matematici completamente gratuiti e senza limiti di utilizzo
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Per Tutti</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Studenti, insegnanti, professionisti e chiunque abbia bisogno di risolvere problemi matematici
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Precisione Garantita</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Algoritmi matematici precisi e testati per risultati affidabili
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Educazione</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Spiegazioni passo dopo passo per imparare mentre risolvi i problemi
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>La Nostra Missione</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                In Calcolatrici Online, crediamo che la matematica non dovrebbe essere una barriera per l&apos;apprendimento. 
                La nostra missione è fornire strumenti matematici gratuiti, precisi ed educativi che aiutino 
                studenti, insegnanti e professionisti a risolvere problemi matematici in modo efficiente.
              </p>
              <p>
                Ogni calcolatrice include spiegazioni passo dopo passo, esempi pratici e risultati precisi. 
                Non vogliamo solo che tu ottenga la risposta corretta, ma che capisca come si arriva a quella risposta.
              </p>
              <p>
                Il nostro team di matematici e sviluppatori lavora costantemente per migliorare la precisione 
                dei calcoli, aggiungere nuove funzionalità e rendere la matematica più accessibile a tutti.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
