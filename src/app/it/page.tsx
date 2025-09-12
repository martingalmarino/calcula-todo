import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { PromotionalBlock } from '@/components/PromotionalBlock'
import { NewLabel } from '@/components/NewLabel'
import { CategoryClusterIT } from '@/components/CategoryClusterIT'
import { PopularCalculatorsPillsIT } from '@/components/PopularCalculatorsPillsIT'
import { buildMeta } from '@/lib/seo'
import { getGamesStatsIT } from '@/lib/games-config-it'
import { getTriviasStatsIT, getTriviasByCategoryIT } from '@/lib/trivias-config-it'

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
  const gamesStatsIT = getGamesStatsIT()
  const triviasStatsIT = getTriviasStatsIT()
  const scienzaTrivias = getTriviasByCategoryIT('Scienza')
  
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
            <div className="text-center mb-8">
              <h1 className="text-blue-600 text-4xl md:text-5xl font-bold mb-6">
                Calcolatrici Online Gratuite
              </h1>
              <p className="text-gray-700 text-lg md:text-xl font-semibold max-w-3xl mx-auto">
                Facilitiamo i tuoi calcoli in finanza, salute, matematica, calendario, geometria e molto altro. 
                Calcolatrici online gratuite, veloci e user-friendly.
              </p>
            </div>

            {/* Pre-header per Giochi Matematici */}
            <div className="text-center mb-8 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Giochi Matematici */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl px-4 py-3 shadow-sm relative">
                    <div className="absolute -top-2 -right-2">
                      <NewLabel size="sm" />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">🎮</span>
                    </div>
                    <a 
                      href="/it/giochi-matematici" 
                      className="block text-blue-600 hover:text-blue-800 font-bold text-lg mb-1 transition-colors"
                    >
                      Giochi Matematici
                    </a>
                    <span className="text-blue-700 text-sm">
                      {gamesStatsIT.totalGames} giochi educativi
                    </span>
                  </div>

                  {/* Trivias */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl px-4 py-3 shadow-sm relative">
                    <div className="absolute -top-2 -right-2">
                      <NewLabel size="sm" />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <a 
                      href="/it/trivias" 
                      className="block text-green-600 hover:text-green-800 font-bold text-lg mb-1 transition-colors"
                    >
                      Trivie Educative
                    </a>
                    <span className="text-green-700 text-sm">
                      {triviasStatsIT.totalTrivias} trivie interattive
                    </span>
                  </div>

                  {/* Trivias de Ciencia */}
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl px-4 py-3 shadow-sm relative">
                    {scienzaTrivias.some(trivia => trivia.isNew) && (
                      <div className="absolute -top-2 -right-2">
                        <NewLabel size="sm" />
                      </div>
                    )}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">🔬</span>
                    </div>
                    <a 
                      href="/it/trivias/scienza" 
                      className="block text-purple-600 hover:text-purple-800 font-bold text-lg mb-1 transition-colors"
                    >
                      Trivie di Scienza
                    </a>
                    <span className="text-purple-700 text-sm">
                      {scienzaTrivias.length} trivie scientifiche
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="mt-8 py-8">
              <div className="max-w-7xl mx-auto">
              
              {/* Categories now handled by CategoryClusterIT component */}
              </div>
            </div>

            {/* Category Cluster Section */}
            <div className="mt-8 py-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Tutte le Categorie
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Esplora le nostre calcolatrici organizzate per categorie
                  </p>
                </div>
                
                <CategoryClusterIT />
              </div>
            </div>

            {/* Popular Calculators Pills Section */}
            <div className="mt-8 py-8 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <PopularCalculatorsPillsIT />
              </div>
            </div>

            {/* Promotional Block */}
            <PromotionalBlock
              title="Perché scegliere le nostre calcolatrici?"
              description="Offriamo strumenti precisi, gratuiti e facili da usare per tutti i tuoi calcoli"
              features={[
                {
                  title: "Veloce e Preciso",
                  description: "Risultati istantanei con calcoli precisi e affidabili",
                  icon: "⚡",
                  bgColor: "bg-blue-100"
                },
                {
                  title: "100% Gratuito",
                  description: "Tutte le calcolatrici sono completamente gratuite, senza limiti",
                  icon: "🆓",
                  bgColor: "bg-green-100"
                },
                {
                  title: "Responsive",
                  description: "Funziona perfettamente su computer, tablet e cellulare",
                  icon: "📱",
                  bgColor: "bg-purple-100"
                }
              ]}
            />
          </div>
        </Container>
      </div>
    </>
  )
}
