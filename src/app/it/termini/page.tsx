import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Termini di Utilizzo - Calcolatrici Online',
  description: 'Termini di utilizzo di Calcolatrici Online. Condizioni per l\'utilizzo delle nostre calcolatrici gratuite.',
  noIndex: true
})

export default function TerminiPage() {
  return (
    <Container>
      <div className="py-8">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Termini di Utilizzo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>Accettazione dei Termini</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Accedendo e utilizzando Calcolatrici Online, accetti di essere soggetto a questi 
                termini di utilizzo. Se non sei d&apos;accordo con uno qualsiasi di questi termini, 
                non devi utilizzare i nostri servizi.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Utilizzo delle Calcolatrici</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Le nostre calcolatrici sono disponibili per uso educativo e personale. Puoi:</p>
              <ul>
                <li>Utilizzare le calcolatrici per risolvere problemi matematici</li>
                <li>Condividere i risultati per scopi educativi</li>
                <li>Utilizzare le spiegazioni passo dopo passo per imparare</li>
              </ul>
              <p>Non puoi:</p>
              <ul>
                <li>Utilizzare le calcolatrici per attività commerciali senza autorizzazione</li>
                <li>Tentare di accedere a sistemi o dati non autorizzati</li>
                <li>Utilizzare le calcolatrici in modo che possa danneggiare il servizio</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Precisione dei Risultati</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Anche se ci sforziamo di fornire risultati precisi, non possiamo 
                garantire l&apos;esattezza assoluta di tutti i calcoli. Ti raccomandiamo 
                di verificare i risultati per calcoli critici.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Proprietà Intellettuale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Tutto il contenuto di Calcolatrici Online, incluse algoritmi, 
                interfaccia utente e documentazione, è protetto da copyright 
                e altre leggi sulla proprietà intellettuale.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitazione di Responsabilità</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>
                  Calcolatrici Online viene fornito &quot;così com&apos;è&quot; senza garanzie 
                  di alcun tipo. Non saremo responsabili per danni diretti, 
                  indiretti, incidentali o consequenziali che possano derivare 
                  dall&apos;utilizzo dei nostri servizi.
                </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modifiche</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Ci riserviamo il diritto di modificare questi termini in qualsiasi 
                momento. Le modifiche entreranno in vigore immediatamente dopo 
                la loro pubblicazione sul sito web.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contatto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Se hai domande su questi termini di utilizzo, puoi 
                contattarci all&apos;indirizzo: contatto@calcolatrici-online.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
