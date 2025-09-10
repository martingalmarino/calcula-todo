import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Politica di Privacy - Calcolatrici Online',
  description: 'Politica di privacy di Calcolatrici Online. Informazioni su come raccogliamo e utilizziamo i tuoi dati.',
  noIndex: true
})

export default function PrivacyPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Politica di Privacy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni che Raccogliamo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Calcolatrici Online è impegnata nella protezione della tua privacy. 
                Raccogliamo le informazioni minime necessarie per fornire i nostri servizi.
              </p>
              <h3>Informazioni di Utilizzo</h3>
              <p>
                Raccogliamo informazioni su come utilizzi le nostre calcolatrici, incluse:
              </p>
              <ul>
                <li>Pagine visitate e tempo di permanenza</li>
                <li>Tipo di calcolatrici utilizzate</li>
                <li>Informazioni tecniche del browser e del dispositivo</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Come Utilizziamo le Tue Informazioni</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Utilizziamo le informazioni raccolte per:</p>
              <ul>
                <li>Migliorare le nostre calcolatrici e servizi</li>
                <li>Analizzare l&apos;utilizzo del sito web</li>
                <li>Fornire supporto tecnico</li>
                <li>Sviluppare nuove funzionalità</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookie e Tecnologie Simili</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Utilizziamo cookie e tecnologie simili per migliorare la tua esperienza 
                e analizzare l&apos;utilizzo del sito web. Puoi controllare l&apos;utilizzo dei cookie 
                attraverso le impostazioni del tuo browser.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Condivisione delle Informazioni</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Non vendiamo, affittiamo né condividiamo le tue informazioni personali con 
                terze parti, eccetto quando necessario per fornire i nostri servizi o quando 
                la legge lo richieda.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sicurezza</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Implementiamo misure di sicurezza appropriate per proteggere le tue 
                informazioni da accessi non autorizzati, alterazioni, divulgazioni 
                o distruzioni.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contatto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Se hai domande su questa politica di privacy, puoi 
                contattarci all&apos;indirizzo: contatto@calcolatrici-online.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
