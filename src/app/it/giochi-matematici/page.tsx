import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { buildMeta, jsonLdCollection } from '@/lib/seo'
import { gamesConfigIT, getGamesStatsIT } from '@/lib/games-config-it'
import { Gamepad2, Clock, Target, Users } from 'lucide-react'

export const metadata: Metadata = buildMeta({
  title: 'Giochi Matematici Online Gratuiti - CalcolaTodo',
  description: 'Divertiti con i nostri giochi matematici educativi! 21 giochi per migliorare le tue abilità matematiche, dalla logica al calcolo mentale. Gratuiti e sempre disponibili.',
  keywords: [
    'giochi matematici', 'giochi educativi', 'matematica', 'calcolo mentale', 'logica', 'puzzle matematici', 
    'apprendimento', 'divertimento', 'abilità matematiche', 'allenamento mentale', 'gratuiti', 'online'
  ]
})

export default function GiochiMatematiciPage() {
  const gamesStats = getGamesStatsIT()
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection({
            name: 'Giochi Matematici',
            description: 'Collezione di giochi matematici educativi per migliorare le abilità matematiche',
            url: 'https://calculatodo.online/it/giochi-matematici',
            calculators: gamesConfigIT.map(game => ({
              name: game.title,
              url: `https://calculatodo.online${game.href}`,
              description: game.description
            }))
          }))
        }}
      />
      
      <Container>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Gamepad2 className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-blue-600 text-4xl md:text-5xl font-bold">
              Giochi Matematici
            </h1>
          </div>
          <p className="text-gray-700 text-lg md:text-xl font-semibold max-w-3xl mx-auto">
            Divertiti e impara con i nostri giochi matematici educativi. 
            Migliora le tue abilità matematiche mentre ti diverti!
          </p>
        </div>

        {/* Statistiche */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-blue-600">{gamesStats.totalGames}</div>
              <div className="text-sm text-gray-600">Giochi Totali</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-green-600">{gamesStats.gamesByDifficulty.facile}</div>
              <div className="text-sm text-gray-600">Facili</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-yellow-600">{gamesStats.gamesByDifficulty.intermedio}</div>
              <div className="text-sm text-gray-600">Intermedi</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-red-600">{gamesStats.gamesByDifficulty.avanzato}</div>
              <div className="text-sm text-gray-600">Avanzati</div>
            </CardContent>
          </Card>
        </div>

        {/* Introduzione */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            🎮 Perché Giocare ai Giochi Matematici?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="font-semibold text-blue-700 mb-2">Sviluppa la Mente</h3>
              <p className="text-gray-600 text-sm">
                Migliora la tua agilità mentale, memoria e capacità di concentrazione
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold text-blue-700 mb-2">Impara Giocando</h3>
              <p className="text-gray-600 text-sm">
                Rafforza le tue abilità matematiche in modo divertente e coinvolgente
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-blue-700 mb-2">Sfida Te Stesso</h3>
              <p className="text-gray-600 text-sm">
                Misura i tuoi progressi e migliora le tue prestazioni nel tempo
              </p>
            </div>
          </div>
        </div>

        {/* Griglia dei Giochi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {gamesConfigIT.map((game) => {
            const IconComponent = game.icon
            return (
              <Card key={game.href} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-1">
                          {game.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            game.difficulty === 'facile' ? 'bg-green-100 text-green-700' :
                            game.difficulty === 'intermedio' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {game.difficulty === 'facile' ? 'Facile' :
                             game.difficulty === 'intermedio' ? 'Intermedio' : 'Avanzato'}
                          </span>
                          <span className="flex items-center text-gray-500 text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {game.timeRange}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {game.description}
                  </p>
                  
                  <Button 
                    asChild 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <a href={game.href}>
                      Gioca
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            🚀 Inizia a Giocare Ora!
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Scegli un gioco che ti interessa e inizia a migliorare le tue abilità matematiche. 
            Tutti i giochi sono gratuiti e non richiedono registrazione.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              variant="secondary" 
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <a href="#games-grid">
                Esplora i Giochi
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <a href="/it/matematicas">
                Calcolatrici Matematiche
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}
