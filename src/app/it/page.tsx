import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Chip, ChipsContainer } from '@/components/Chip'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calcolatrici Online Gratuite',
  description: 'Facilitiamo i tuoi calcoli in finanza, salute, matematica, calendario, geometria e molto altro. Calcolatrici online gratuite, veloci e user-friendly.',
  keywords: [
    'calcolatrici online',
    'matematica',
    'finanza',
    'salute',
    'calendario',
    'geometria',
    'gratis',
    'educazione'
  ]
})

export default function ItalianHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'CalculaTutto.online',
            description: 'Calcolatrici online gratuite per matematica, finanza, salute e molto altro. Risultati rapidi e spiegati passo dopo passo.',
            url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/it',
            inLanguage: 'it-IT',
            author: {
              '@type': 'Organization',
              name: 'CalculaTutto.online',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CalculaTutto.online',
            },
          }),
        }}
      />
      
      <div className="min-h-screen bg-white">
        <Container>
          <div className="py-8">

            {/* Main Title */}
            <div className="text-center mb-16">
              <h1 className="text-blue-600 text-4xl md:text-5xl font-bold mb-6">
                Calcolatrici Online Gratuite
              </h1>
              <p className="text-gray-700 text-lg md:text-xl font-semibold max-w-3xl mx-auto">
                Facilitiamo i tuoi calcoli in finanza, salute, matematica, calendario, geometria e molto altro. 
                Calcolatrici online gratuite, veloci e user-friendly.
              </p>
            </div>

            {/* Categories Section */}
            <div className="mt-20 bg-gray-50 py-16 -mx-4 px-4">
              <div className="max-w-7xl mx-auto">
              
              {/* Categories Grid - Responsive */}
              <div className="space-y-12">
                
                {/* Sezione Matematica */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🧮</span>
                    <h3 className="text-blue-900 text-xl font-bold">Matematica</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/it/matematicas/frazioni/" icon="divide" ariaLabel="Calcolatrice di Frazioni">
                      Calcolatrice di Frazioni
                    </Chip>
                    <Chip href="/it/matematicas/percentuali/" icon="percent" ariaLabel="Calcolatrice di Percentuali">
                      Calcolatrice di Percentuali
                    </Chip>
                    <Chip href="/it/matematicas/potenze-e-radici/" icon="zap" ariaLabel="Calcolatrice di Potenze e Radici">
                      Calcolatrice di Potenze e Radici
                    </Chip>
                    <Chip href="/it/matematicas/algebra/" icon="x" ariaLabel="Calcolatrice di Algebra">
                      Calcolatrice di Algebra
                    </Chip>
                    <Chip href="/it/matematicas/trigonometria/" icon="triangle" ariaLabel="Calcolatrice di Trigonometria">
                      Calcolatrice di Trigonometria
                    </Chip>
                    <Chip href="/it/matematicas/derivate/" icon="trending-up" ariaLabel="Calcolatrice di Derivate">
                      Calcolatrice di Derivate
                    </Chip>
                  </ChipsContainer>
                </div>
                
                {/* Calendario Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📅</span>
                    <h3 className="text-blue-900 text-xl font-bold">Calendario</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/it/calendario/contatore-giorni-date/" icon="calendar" ariaLabel="Contatore di Giorni tra Date">
                      Contatore di Giorni tra Date
                    </Chip>
                    <Chip href="/it/calendario/calcolatrice-eta/" icon="user-round" ariaLabel="Calcolatrice dell&apos;Età">
                      Calcolatrice dell&apos;Età
                    </Chip>
                    <Chip href="/it/calendario/aggiungi-sottrai-giorni/" icon="plus-minus" ariaLabel="Aggiungi/Sottrai Giorni a una Data">
                      Aggiungi/Sottrai Giorni a una Data
                    </Chip>
                    <Chip href="/it/calendario/ore-minuti/" icon="clock-8" ariaLabel="Calcolatrice di Ore e Minuti">
                      Calcolatrice di Ore e Minuti
                    </Chip>
                    <Chip href="/it/calendario/giorni-vacanza/" icon="calendar-days" ariaLabel="Giorni di Vacanza">
                      Giorni di Vacanza
                    </Chip>
                    <Chip href="/it/calendario/convertitore-date/" icon="calendar-range" ariaLabel="Convertitore di Date">
                      Convertitore di Date
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Salute Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🏥</span>
                    <h3 className="text-blue-900 text-xl font-bold">Salute</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/it/salute/imc/" icon="heart-pulse" ariaLabel="Indice di Massa Corporea (IMC)">
                      Indice di Massa Corporea (IMC)
                    </Chip>
                    <Chip href="/it/salute/tmb/" icon="flame" ariaLabel="Tasso Metabolico Basale (TMB)">
                      Tasso Metabolico Basale (TMB)
                    </Chip>
                    <Chip href="/it/salute/grasso-corporeo/" icon="percent" ariaLabel="Percentuale di Grasso Corporeo">
                      Percentuale di Grasso Corporeo
                    </Chip>
                    <Chip href="/it/salute/pafi/" icon="users-round" ariaLabel="Calcolatrice PaFi">
                      Calcolatrice PaFi
                    </Chip>
                    <Chip href="/it/salute/acqua-giornaliera/" icon="droplets" ariaLabel="Acqua Giornaliera Raccomandata">
                      Acqua Giornaliera Raccomandata
                    </Chip>
                    <Chip href="/it/salute/ovulazione/" icon="calendar-heart" ariaLabel="Calcolatrice di Ovulazione">
                      Calcolatrice di Ovulazione
                    </Chip>
                  </ChipsContainer>
                </div>


                {/* Curiosas Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🎉</span>
                    <h3 className="text-blue-900 text-xl font-bold">Curiose</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/it/curiosas/caffe-risparmio/" icon="coffee" ariaLabel="Caffè vs. Risparmio">
                      Caffè vs. Risparmio
                    </Chip>
                    <Chip href="/it/curiosas/pizza-persona/" icon="pizza" ariaLabel="Pizza per Persona">
                      Pizza per Persona
                    </Chip>
                    <Chip href="/it/curiosas/aspettativa-vita-cibo/" icon="heart" ariaLabel="Aspettativa di Vita e Cibo">
                      Aspettativa di Vita e Cibo
                    </Chip>
                    <Chip href="/it/curiosas/baci-brucia-calorie/" icon="target" ariaLabel="Baci Brucia Calorie">
                      Baci Brucia Calorie
                    </Chip>
                    <Chip href="/it/curiosas/tempo-film/" icon="film" ariaLabel="Tempo nei Film">
                      Tempo nei Film
                    </Chip>
                    <Chip href="/it/curiosas/livello-freddoloso/" icon="thermometer" ariaLabel="Livello di Freddoloso">
                      Livello di Freddoloso
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Finanze Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">💰</span>
                    <h3 className="text-blue-900 text-xl font-bold">Finanze</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/it/finanze/interesse-semplice/" icon="trending-up" ariaLabel="Interesse Semplice">
                      Interesse Semplice
                    </Chip>
                    <Chip href="/it/finanze/deprezzamento-veicoli/" icon="car" ariaLabel="Deprezzamento Veicoli">
                      Deprezzamento Veicoli
                    </Chip>
                    <Chip href="/it/finanze/calcolatrice-mutuo/" icon="home" ariaLabel="Calcolatrice di Mutuo">
                      Calcolatrice di Mutuo
                    </Chip>
                    <Chip href="/it/finanze/calcolatrice-ipc/" icon="bar-chart-3" ariaLabel="Calcolatrice dell&apos;IPC">
                      Calcolatrice dell&apos;IPC
                    </Chip>
                    <Chip href="/it/finanze/risparmio-obiettivo/" icon="piggy-bank" ariaLabel="Risparmio Obiettivo">
                      Risparmio Obiettivo
                    </Chip>
                    <Chip href="/it/finanze/valore-futuro-presente/" icon="calculator" ariaLabel="Valore Futuro e Presente">
                      Valore Futuro e Presente
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Sezione Geometria */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📐</span>
                    <h3 className="text-blue-900 text-xl font-bold">Geometria</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/it/geometria/circulo/" icon="circle" ariaLabel="Area e Perimetro del Cerchio">
                      Area e Perimetro del Cerchio
                    </Chip>
                    <Chip href="/it/geometria/rectangulo/" icon="rectangle-horizontal" ariaLabel="Area e Perimetro del Rettangolo">
                      Area e Perimetro del Rettangolo
                    </Chip>
                    <Chip href="/it/geometria/triangulo/" icon="triangle" ariaLabel="Area del Triangolo">
                      Area del Triangolo
                    </Chip>
                    <Chip href="/it/geometria/cuadrado/" icon="square" ariaLabel="Area e Perimetro del Quadrato">
                      Area e Perimetro del Quadrato
                    </Chip>
                    <Chip href="/it/geometria/rombo/" icon="diamond" ariaLabel="Area e Perimetro del Rombo">
                      Area e Perimetro del Rombo
                    </Chip>
                    <Chip href="/it/geometria/trapecio/" icon="hexagon" ariaLabel="Area del Trapezio">
                      Area del Trapezio
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Sezione Tecnologia */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">💻</span>
                    <h3 className="text-blue-900 text-xl font-bold">Tecnologia</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/it/tecnologia/conversion-almacenamiento/" icon="hard-drive" ariaLabel="Conversione di Archiviazione">
                      Conversione di Archiviazione
                    </Chip>
                    <Chip href="/it/tecnologia/velocidad-descarga/" icon="download" ariaLabel="Velocità di Download">
                      Velocità di Download
                    </Chip>
                    <Chip href="/it/tecnologia/uptime-downtime/" icon="clock" ariaLabel="Uptime/Downtime">
                      Uptime/Downtime
                    </Chip>
                    <Chip href="/it/tecnologia/conversion-colores/" icon="palette" ariaLabel="Conversione di Colori">
                      Conversione di Colori
                    </Chip>
                    <Chip href="/it/tecnologia/analisis-contraseñas/" icon="shield" ariaLabel="Analisi delle Password">
                      Analisi delle Password
                    </Chip>
                    <Chip href="/it/tecnologia/analisis-latencia/" icon="zap" ariaLabel="Analisi della Latenza">
                      Analisi della Latenza
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Sezione Marketing */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📈</span>
                    <h3 className="text-blue-900 text-xl font-bold">Marketing</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/it/marketing/cac/" icon="target" ariaLabel="CAC - Costo di Acquisizione">
                      CAC - Costo di Acquisizione
                    </Chip>
                    <Chip href="/it/marketing/ltv/" icon="trending-up" ariaLabel="LTV - Lifetime Value">
                      LTV - Lifetime Value
                    </Chip>
                    <Chip href="/it/marketing/conversione/" icon="bar-chart-3" ariaLabel="Conversione">
                      Conversione
                    </Chip>
                    <Chip href="/it/marketing/budget/" icon="dollar-sign" ariaLabel="Budget di Marketing">
                      Budget di Marketing
                    </Chip>
                    <Chip href="/it/marketing/cpc-cpm/" icon="calculator" ariaLabel="CPC / CPM">
                      CPC / CPM
                    </Chip>
                    <Chip href="/it/marketing/roi/" icon="users" ariaLabel="ROI in Marketing">
                      ROI in Marketing
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Altre Calcolatrici Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🔧</span>
                    <h3 className="text-blue-900 text-xl font-bold">Altre Calcolatrici</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/it/altre/scala-di-voti/" icon="graduation-cap" ariaLabel="Scala di Voti">
                      Scala di Voti
                    </Chip>
                    <Chip href="/it/altre/spesa-benzina-viaggi/" icon="fuel" ariaLabel="Spesa Benzina per Viaggi">
                      Spesa Benzina per Viaggi
                    </Chip>
                    <Chip href="/it/altre/contatore-parole-caratteri/" icon="type" ariaLabel="Contatore di Parole e Caratteri">
                      Contatore di Parole e Caratteri
                    </Chip>
                    <Chip href="/it/altre/convertitore-numeri-romani/" icon="hash" ariaLabel="Convertitore di Numeri Romani">
                      Convertitore di Numeri Romani
                    </Chip>
                    <Chip href="/it/altre/contatore-click-cps/" icon="mouse-pointer" ariaLabel="Contatore di Click (CPS Test)">
                      Contatore di Click (CPS Test)
                    </Chip>
                    <Chip href="/it/altre/calcolatrice-mance/" icon="receipt" ariaLabel="Calcolatrice di Mance">
                      Calcolatrice di Mance
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Tecnologia Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">💻</span>
                    <h3 className="text-blue-900 text-xl font-bold">Tecnologia</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/it/tecnologia/conversione-archiviazione/" icon="hard-drive" ariaLabel="Conversione di Archiviazione">
                      Conversione di Archiviazione
                    </Chip>
                    <Chip href="/it/tecnologia/velocita-download/" icon="download" ariaLabel="Velocità di Download">
                      Velocità di Download
                    </Chip>
                    <Chip href="/it/tecnologia/uptime-downtime/" icon="clock" ariaLabel="Uptime/Downtime">
                      Uptime/Downtime
                    </Chip>
                    <Chip href="/it/tecnologia/conversione-colori/" icon="palette" ariaLabel="Conversione di Colori">
                      Conversione di Colori
                    </Chip>
                    <Chip href="/it/tecnologia/analisi-password/" icon="shield" ariaLabel="Analisi delle Password">
                      Analisi delle Password
                    </Chip>
                    <Chip href="/it/tecnologia/analisi-latenza/" icon="zap" ariaLabel="Analisi della Latenza">
                      Analisi della Latenza
                    </Chip>
                  </ChipsContainer>
                </div>

              </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <div className="mt-20 mb-12">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <p className="text-lg leading-relaxed mb-4">
                      Trova le migliori calcolatrici online gratuite per risolvere operazioni di matematica, finanza, salute, statistica e geometria in pochi secondi. Il nostro obiettivo è che tu possa eseguire i tuoi calcoli in modo rapido, preciso e semplice, senza bisogno di installare nulla sul tuo dispositivo.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Con più di 30 calcolatrici specializzate, potrai calcolare percentuali e frazioni, stimare il tuo indice di massa corporea o risolvere problemi di algebra e trigonometria.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
