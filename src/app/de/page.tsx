import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Chip, ChipsContainer } from '@/components/Chip'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Kostenlose Online-Rechner',
  description: 'Wir erleichtern Ihre Berechnungen in Finanzen, Gesundheit, Mathematik, Kalender, Geometrie und vielem mehr. Kostenlose Online-Rechner, schnell und benutzerfreundlich.',
  keywords: [
    'online rechner',
    'mathematik',
    'finanzen',
    'gesundheit',
    'kalender',
    'geometrie',
    'kostenlos',
    'bildung'
  ]
})

export default function GermanHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'CalculaAlles.online',
            description: 'Kostenlose Online-Rechner für Mathematik, Finanzen, Gesundheit und mehr. Schnelle und erklärte Ergebnisse Schritt für Schritt.',
            url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/de',
            inLanguage: 'de-DE',
            author: {
              '@type': 'Organization',
              name: 'CalculaAlles.online',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CalculaAlles.online',
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
                Kostenlose Online-Rechner
              </h1>
              <p className="text-gray-700 text-lg md:text-xl font-semibold max-w-3xl mx-auto">
                Wir erleichtern Ihre Berechnungen in Finanzen, Gesundheit, Mathematik, Kalender, Geometrie und vielem mehr. 
                Kostenlose Online-Rechner, schnell und benutzerfreundlich.
              </p>
            </div>

            {/* Categories Section */}
            <div className="mt-20 bg-gray-50 py-16 -mx-4 px-4">
              <div className="max-w-7xl mx-auto">
              
              {/* Categories Grid - Responsive */}
              <div className="space-y-12">
                
                {/* Mathematik Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🧮</span>
                    <h3 className="text-blue-900 text-xl font-bold">Mathematik</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/de/mathematik/bruche/" icon="divide" ariaLabel="Bruchrechner">
                      Bruchrechner
                    </Chip>
                    <Chip href="/de/mathematik/prozente/" icon="percent" ariaLabel="Prozentrechner">
                      Prozentrechner
                    </Chip>
                    <Chip href="/de/mathematik/potenzen-wurzeln/" icon="zap" ariaLabel="Potenz- und Wurzelrechner">
                      Potenz- und Wurzelrechner
                    </Chip>
                    <Chip href="/de/mathematik/algebra/" icon="x" ariaLabel="Algebra-Rechner">
                      Algebra-Rechner
                    </Chip>
                    <Chip href="/de/mathematik/trigonometrie/" icon="triangle" ariaLabel="Trigonometrie-Rechner">
                      Trigonometrie-Rechner
                    </Chip>
                    <Chip href="/de/mathematik/ableitungen/" icon="trending-up" ariaLabel="Ableitungsrechner">
                      Ableitungsrechner
                    </Chip>
                  </ChipsContainer>
                </div>
                
                {/* Kalender Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📅</span>
                    <h3 className="text-blue-900 text-xl font-bold">Kalender</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/de/kalender/alter-rechner/" icon="calendar" ariaLabel="Alter-Rechner">
                      Alter-Rechner
                    </Chip>
                    <Chip href="/de/kalender/tage-zwischen-daten/" icon="calendar-days" ariaLabel="Tage zwischen Daten">
                      Tage zwischen Daten
                    </Chip>
                    <Chip href="/de/kalender/urlaubstage/" icon="plane" ariaLabel="Urlaubstage">
                      Urlaubstage
                    </Chip>
                    <Chip href="/de/kalender/stunden-minuten/" icon="clock" ariaLabel="Stunden und Minuten">
                      Stunden und Minuten
                    </Chip>
                    <Chip href="/de/kalender/tage-addieren-subtrahieren/" icon="plus-minus" ariaLabel="Tage addieren/subtrahieren">
                      Tage addieren/subtrahieren
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Geometrie Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📐</span>
                    <h3 className="text-blue-900 text-xl font-bold">Geometrie</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/de/geometrie/kreis/" icon="circle" ariaLabel="Kreis-Rechner">
                      Kreis-Rechner
                    </Chip>
                    <Chip href="/de/geometrie/rechteck/" icon="rectangle-horizontal" ariaLabel="Rechteck-Rechner">
                      Rechteck-Rechner
                    </Chip>
                    <Chip href="/de/geometrie/dreieck/" icon="triangle" ariaLabel="Dreieck-Rechner">
                      Dreieck-Rechner
                    </Chip>
                    <Chip href="/de/geometrie/quadrat/" icon="square" ariaLabel="Quadrat-Rechner">
                      Quadrat-Rechner
                    </Chip>
                    <Chip href="/de/geometrie/raute/" icon="diamond" ariaLabel="Raute-Rechner">
                      Raute-Rechner
                    </Chip>
                    <Chip href="/de/geometrie/trapez/" icon="hexagon" ariaLabel="Trapez-Rechner">
                      Trapez-Rechner
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Gesundheit Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🏥</span>
                    <h3 className="text-blue-900 text-xl font-bold">Gesundheit</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/de/gesundheit/bmi/" icon="activity" ariaLabel="BMI-Rechner">
                      BMI-Rechner
                    </Chip>
                    <Chip href="/de/gesundheit/idealgewicht/" icon="user" ariaLabel="Idealgewicht-Rechner">
                      Idealgewicht-Rechner
                    </Chip>
                    <Chip href="/de/gesundheit/kalorien/" icon="flame" ariaLabel="Kalorien-Rechner">
                      Kalorien-Rechner
                    </Chip>
                    <Chip href="/de/gesundheit/wasser/" icon="droplets" ariaLabel="Wasser-Rechner">
                      Wasser-Rechner
                    </Chip>
                    <Chip href="/de/gesundheit/schlaf/" icon="moon" ariaLabel="Schlaf-Rechner">
                      Schlaf-Rechner
                    </Chip>
                    <Chip href="/de/gesundheit/sport/" icon="dumbbell" ariaLabel="Sport-Rechner">
                      Sport-Rechner
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Finanzen Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">💰</span>
                    <h3 className="text-blue-900 text-xl font-bold">Finanzen</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/de/finanzen/zinsen/" icon="percent" ariaLabel="Zins-Rechner">
                      Zins-Rechner
                    </Chip>
                    <Chip href="/de/finanzen/darlehen/" icon="home" ariaLabel="Darlehen-Rechner">
                      Darlehen-Rechner
                    </Chip>
                    <Chip href="/de/finanzen/inflation/" icon="trending-up" ariaLabel="Inflations-Rechner">
                      Inflations-Rechner
                    </Chip>
                    <Chip href="/de/finanzen/sparen/" icon="piggy-bank" ariaLabel="Spar-Rechner">
                      Spar-Rechner
                    </Chip>
                    <Chip href="/de/finanzen/abschreibung/" icon="car" ariaLabel="Abschreibungs-Rechner">
                      Abschreibungs-Rechner
                    </Chip>
                    <Chip href="/de/finanzen/zukunftswert/" icon="trending-up" ariaLabel="Zukunftswert-Rechner">
                      Zukunftswert-Rechner
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Kurioses Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🎯</span>
                    <h3 className="text-blue-900 text-xl font-bold">Kurioses</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/de/kurioses/kuss-kalorien/" icon="heart" ariaLabel="Kuss-Kalorien-Rechner">
                      Kuss-Kalorien-Rechner
                    </Chip>
                    <Chip href="/de/kurioses/kaffee-sparen/" icon="coffee" ariaLabel="Kaffee-Spar-Rechner">
                      Kaffee-Spar-Rechner
                    </Chip>
                    <Chip href="/de/kurioses/liebes-rechner/" icon="heart" ariaLabel="Liebes-Rechner">
                      Liebes-Rechner
                    </Chip>
                    <Chip href="/de/kurioses/bier-party/" icon="beer" ariaLabel="Bier-Party-Rechner">
                      Bier-Party-Rechner
                    </Chip>
                    <Chip href="/de/kurioses/alter-tiere/" icon="dog" ariaLabel="Alter-Tiere-Rechner">
                      Alter-Tiere-Rechner
                    </Chip>
                    <Chip href="/de/kurioses/pizza-person/" icon="pizza" ariaLabel="Pizza-Person-Rechner">
                      Pizza-Person-Rechner
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Andere Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🔧</span>
                    <h3 className="text-blue-900 text-xl font-bold">Andere</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/de/andere/notenskala/" icon="award" ariaLabel="Notenskala-Rechner">
                      Notenskala-Rechner
                    </Chip>
                    <Chip href="/de/andere/benzin-reise/" icon="car" ariaLabel="Benzin-Reise-Rechner">
                      Benzin-Reise-Rechner
                    </Chip>
                    <Chip href="/de/andere/wort-zeichen-zaehler/" icon="type" ariaLabel="Wort- und Zeichenzähler">
                      Wort- und Zeichenzähler
                    </Chip>
                    <Chip href="/de/andere/roemische-zahlen/" icon="hash" ariaLabel="Römische Zahlen">
                      Römische Zahlen
                    </Chip>
                    <Chip href="/de/andere/klick-zaehler/" icon="mouse-pointer" ariaLabel="Klick-Zähler">
                      Klick-Zähler
                    </Chip>
                    <Chip href="/de/andere/trinkgeld/" icon="coins" ariaLabel="Trinkgeld-Rechner">
                      Trinkgeld-Rechner
                    </Chip>
                  </ChipsContainer>
                </div>

              </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Bereit für Ihre Berechnungen?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Wählen Sie eine der Kategorien oben aus und beginnen Sie mit Ihren Berechnungen. 
                Alle Rechner sind kostenlos und sofort einsatzbereit.
              </p>
            </div>

          </div>
        </Container>
      </div>
    </>
  )
}
