import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { PromotionalBlock } from '@/components/PromotionalBlock'
import { NewLabel } from '@/components/NewLabel'
import { CategoryCluster } from '@/components/CategoryCluster'
import { PopularCalculatorsPills } from '@/components/PopularCalculatorsPills'
import { buildMeta, jsonLdWebSite } from '@/lib/seo'
import { getGamesStats } from '@/lib/games-config'
import { getTriviasStats, getCienciaTriviasStats } from '@/lib/trivias-config'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras Online Gratuitas',
  description: 'Facilitamos tus cálculos en temas de finanzas, salud, matemática, calendario, geometría y más. Calculadoras online gratuitas, rápidas y amigables.',
  keywords: [
    'calculadoras online',
    'matemáticas',
    'finanzas',
    'salud',
    'calendario',
    'geometría',
    'gratis',
    'educación'
  ]
})

export default function HomePage() {
  const gamesStats = getGamesStats()
  const triviasStats = getTriviasStats()
  const cienciaStats = getCienciaTriviasStats()
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdWebSite()),
        }}
      />
      
      <div className="min-h-screen bg-white">
        <Container>
          <div className="py-8">
            {/* Main Title */}
            <div className="text-center mb-8">
              <h1 className="text-blue-600 text-4xl md:text-5xl font-bold mb-6">
                Calculadoras Online Gratuitas
              </h1>
              <p className="text-gray-700 text-lg md:text-xl font-semibold max-w-3xl mx-auto">
                Facilitamos tus cálculos en temas de finanzas, salud, matemática, calendario, geometría y más. 
                Calculadoras online gratuitas, rápidas y amigables.
              </p>
            </div>

            {/* Pre-header para Juegos Matemáticos, Trivias y Trivias de Ciencia */}
            <div className="text-center mb-8 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {/* Juegos Matemáticos */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl px-4 py-3 shadow-sm relative">
                  <div className="absolute -top-2 -right-2">
                    <NewLabel size="sm" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <a 
                    href="/juegos-matematicos" 
                    className="block text-blue-600 hover:text-blue-800 font-bold text-lg mb-1 transition-colors"
                  >
                    Juegos Matemáticos
                  </a>
                  <span className="text-blue-700 text-sm">
                    {gamesStats.totalGames} juegos educativos
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
                    href="/trivias" 
                    className="block text-green-600 hover:text-green-800 font-bold text-lg mb-1 transition-colors"
                  >
                    Trivias Educativas
                  </a>
                  <span className="text-green-700 text-sm">
                    {triviasStats.totalTrivias} trivias interactivas
                  </span>
                </div>

                {/* Trivias de Ciencia */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-2xl px-4 py-3 shadow-sm relative">
                  {cienciaStats.hasNewTrivias && (
                    <div className="absolute -top-2 -right-2">
                      <NewLabel size="sm" />
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <a 
                    href="/trivias/ciencia" 
                    className="block text-purple-600 hover:text-purple-800 font-bold text-lg mb-1 transition-colors"
                  >
                    Trivias de Ciencia
                  </a>
                  <span className="text-purple-700 text-sm">
                    {cienciaStats.totalTrivias} trivias científicas
                  </span>
                </div>
              </div>
            </div>

            {/* Category Cluster Section */}
            <div className="mt-8 py-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Todas las Categorías
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Explora nuestras calculadoras organizadas por categorías
                  </p>
                </div>
                
                <CategoryCluster />
              </div>
            </div>

            {/* Popular Calculators Pills Section */}
            <div className="mt-8 py-8 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4">
                <PopularCalculatorsPills />
              </div>
            </div>

            {/* Promotional Block */}
            <PromotionalBlock
              title="¿Por qué elegir nuestras calculadoras?"
              description="Ofrecemos herramientas precisas, gratuitas y fáciles de usar para todos tus cálculos"
              features={[
                {
                  title: "Rápido y Preciso",
                  description: "Resultados instantáneos con cálculos precisos y confiables",
                  icon: "⚡",
                  bgColor: "bg-blue-100"
                },
                {
                  title: "100% Gratis",
                  description: "Todas las calculadoras son completamente gratuitas, sin límites",
                  icon: "🆓",
                  bgColor: "bg-green-100"
                },
                {
                  title: "Fácil de Usar",
                  description: "Interfaz intuitiva y amigable para usuarios de todos los niveles",
                  icon: "🎯",
                  bgColor: "bg-purple-100"
                },
                {
                  title: "Sin Registro",
                  description: "Usa todas las calculadoras sin necesidad de crear una cuenta",
                  icon: "🚀",
                  bgColor: "bg-orange-100"
                }
              ]}
            />
          </div>
        </Container>
      </div>
    </>
  )
}
