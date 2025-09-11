import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Chip, ChipsContainer } from '@/components/Chip'
import { buildMeta } from '@/lib/seo'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras Online Grátis',
  description: 'Facilitamos seus cálculos em finanças, saúde, matemática, calendário, geometria e muito mais. Calculadoras online grátis, rápidas e fáceis de usar.',
  keywords: [
    'calculadoras online',
    'matemática',
    'finanças',
    'saúde',
    'calendário',
    'geometria',
    'grátis',
    'educação'
  ]
})

export default function PortugueseHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'CalculaTudo.online',
            description: 'Calculadoras online grátis para matemática, finanças, saúde e muito mais. Resultados rápidos e explicados passo a passo.',
            url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online') + '/pt',
            inLanguage: 'pt-BR',
            author: {
              '@type': 'Organization',
              name: 'CalculaTudo.online',
            },
            publisher: {
              '@type': 'Organization',
              name: 'CalculaTudo.online',
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
                Calculadoras Online Grátis
              </h1>
              <p className="text-gray-700 text-lg md:text-xl font-semibold max-w-3xl mx-auto">
                Facilitamos seus cálculos em finanças, saúde, matemática, calendário, geometria e muito mais. 
                Calculadoras online grátis, rápidas e fáceis de usar.
              </p>
            </div>

            {/* Categories Section */}
            <div className="mt-8 py-8">
              <div className="max-w-7xl mx-auto">
              
              {/* Categories Grid - Responsive */}
              <div className="space-y-12">
                
                {/* Seção Matemática */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🧮</span>
                    <h3 className="text-blue-900 text-xl font-bold">Matemática</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/pt/matematica/fracoes/" icon="divide" ariaLabel="Calculadora de Frações">
                      Calculadora de Frações
                    </Chip>
                    <Chip href="/pt/matematica/percentuais/" icon="percent" ariaLabel="Calculadora de Percentuais">
                      Calculadora de Percentuais
                    </Chip>
                    <Chip href="/pt/matematica/potencias-e-raizes/" icon="zap" ariaLabel="Calculadora de Potências e Raízes">
                      Calculadora de Potências e Raízes
                    </Chip>
                    <Chip href="/pt/matematica/algebra/" icon="x" ariaLabel="Calculadora de Álgebra">
                      Calculadora de Álgebra
                    </Chip>
                    <Chip href="/pt/matematica/trigonometria/" icon="triangle" ariaLabel="Calculadora de Trigonometria">
                      Calculadora de Trigonometria
                    </Chip>
                    <Chip href="/pt/matematica/derivadas/" icon="trending-up" ariaLabel="Calculadora de Derivadas">
                      Calculadora de Derivadas
                    </Chip>
                  </ChipsContainer>
                </div>
                
                {/* Calendário Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📅</span>
                    <h3 className="text-blue-900 text-xl font-bold">Calendário</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/pt/calendario/calculadora-idade/" icon="calendar" ariaLabel="Calculadora de Idade">
                      Calculadora de Idade
                    </Chip>
                    <Chip href="/pt/calendario/dias-entre-datas/" icon="calendar-days" ariaLabel="Dias entre Datas">
                      Dias entre Datas
                    </Chip>
                    <Chip href="/pt/calendario/dias-ferias/" icon="plane" ariaLabel="Dias de Férias">
                      Dias de Férias
                    </Chip>
                    <Chip href="/pt/calendario/horas-minutos/" icon="clock" ariaLabel="Horas e Minutos">
                      Horas e Minutos
                    </Chip>
                    <Chip href="/pt/calendario/somar-subtrair-dias/" icon="plus-minus" ariaLabel="Somar e Subtrair Dias">
                      Somar e Subtrair Dias
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Finanças Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">💰</span>
                    <h3 className="text-blue-900 text-xl font-bold">Finanças</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/pt/financas/juros-simples/" icon="percent" ariaLabel="Juros Simples">
                      Juros Simples
                    </Chip>
                    <Chip href="/pt/financas/depreciacao-veiculos/" icon="car" ariaLabel="Depreciação de Veículos">
                      Depreciação de Veículos
                    </Chip>
                    <Chip href="/pt/financas/calculadora-financiamento/" icon="home" ariaLabel="Calculadora de Financiamento">
                      Calculadora de Financiamento
                    </Chip>
                    <Chip href="/pt/financas/calculadora-ipca/" icon="trending-up" ariaLabel="Calculadora do IPCA">
                      Calculadora do IPCA
                    </Chip>
                    <Chip href="/pt/financas/poupanca-objetivo/" icon="target" ariaLabel="Poupança Objetivo">
                      Poupança Objetivo
                    </Chip>
                    <Chip href="/pt/financas/valor-futuro-presente/" icon="dollar-sign" ariaLabel="Valor Futuro e Presente">
                      Valor Futuro e Presente
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Geometria Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📐</span>
                    <h3 className="text-blue-900 text-xl font-bold">Geometria</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/pt/geometria/circulo/" icon="circle" ariaLabel="Área e Perímetro do Círculo">
                      Área e Perímetro do Círculo
                    </Chip>
                    <Chip href="/pt/geometria/retangulo/" icon="rectangle-horizontal" ariaLabel="Área e Perímetro do Retângulo">
                      Área e Perímetro do Retângulo
                    </Chip>
                    <Chip href="/pt/geometria/triangulo/" icon="triangle" ariaLabel="Área do Triângulo">
                      Área do Triângulo
                    </Chip>
                    <Chip href="/pt/geometria/quadrado/" icon="square" ariaLabel="Área e Perímetro do Quadrado">
                      Área e Perímetro do Quadrado
                    </Chip>
                    <Chip href="/pt/geometria/losango/" icon="diamond" ariaLabel="Área e Perímetro do Losango">
                      Área e Perímetro do Losango
                    </Chip>
                    <Chip href="/pt/geometria/trapezio/" icon="hexagon" ariaLabel="Área do Trapézio">
                      Área do Trapézio
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Saúde Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🏥</span>
                    <h3 className="text-blue-900 text-xl font-bold">Saúde</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/pt/saude/imc/" icon="activity" ariaLabel="Calculadora de IMC">
                      Calculadora de IMC
                    </Chip>
                    <Chip href="/pt/saude/peso-ideal/" icon="target" ariaLabel="Calculadora de Peso Ideal">
                      Calculadora de Peso Ideal
                    </Chip>
                    <Chip href="/pt/saude/calorias/" icon="flame" ariaLabel="Calculadora de Calorias">
                      Calculadora de Calorias
                    </Chip>
                    <Chip href="/pt/saude/agua/" icon="droplets" ariaLabel="Calculadora de Água">
                      Calculadora de Água
                    </Chip>
                    <Chip href="/pt/saude/sono/" icon="moon" ariaLabel="Calculadora de Sono">
                      Calculadora de Sono
                    </Chip>
                    <Chip href="/pt/saude/exercicio/" icon="dumbbell" ariaLabel="Calculadora de Exercício">
                      Calculadora de Exercício
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Curiosas Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🤔</span>
                    <h3 className="text-blue-900 text-xl font-bold">Curiosas</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/pt/curiosas/beijos-calorias/" icon="heart" ariaLabel="Beijos e Calorias">
                      Beijos e Calorias
                    </Chip>
                    <Chip href="/pt/curiosas/cafe-economia/" icon="coffee" ariaLabel="Café e Economia">
                      Café e Economia
                    </Chip>
                    <Chip href="/pt/curiosas/calculadora-amor/" icon="heart" ariaLabel="Calculadora do Amor">
                      Calculadora do Amor
                    </Chip>
                    <Chip href="/pt/curiosas/cerveja-festa/" icon="beer" ariaLabel="Cerveja e Festa">
                      Cerveja e Festa
                    </Chip>
                    <Chip href="/pt/curiosas/idade-animal/" icon="dog" ariaLabel="Idade do Animal">
                      Idade do Animal
                    </Chip>
                    <Chip href="/pt/curiosas/expectativa-animais/" icon="paw-print" ariaLabel="Expectativa de Animais">
                      Expectativa de Animais
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Outras Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🔧</span>
                    <h3 className="text-blue-900 text-xl font-bold">Outras</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/pt/outras/escala-notas/" icon="award" ariaLabel="Escala de Notas">
                      Escala de Notas
                    </Chip>
                    <Chip href="/pt/outras/gasto-gasolina/" icon="car" ariaLabel="Gasto de Gasolina em Viagem">
                      Gasto de Gasolina em Viagem
                    </Chip>
                    <Chip href="/pt/outras/contador-palavras/" icon="type" ariaLabel="Contador de Palavras e Caracteres">
                      Contador de Palavras e Caracteres
                    </Chip>
                    <Chip href="/pt/outras/numeros-romanos/" icon="hash" ariaLabel="Conversor de Números Romanos">
                      Conversor de Números Romanos
                    </Chip>
                    <Chip href="/pt/outras/contador-cliques/" icon="mouse-pointer" ariaLabel="Contador de Cliques (CPS)">
                      Contador de Cliques (CPS)
                    </Chip>
                    <Chip href="/pt/outras/calculadora-gorjeta/" icon="dollar-sign" ariaLabel="Calculadora de Gorjeta">
                      Calculadora de Gorjeta
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
                    <Chip href="/pt/tecnologia/conversao-armazenamento/" icon="hard-drive" ariaLabel="Conversão de Armazenamento">
                      Conversão de Armazenamento
                    </Chip>
                    <Chip href="/pt/tecnologia/velocidade-download/" icon="download" ariaLabel="Velocidade de Download">
                      Velocidade de Download
                    </Chip>
                    <Chip href="/pt/tecnologia/uptime-downtime/" icon="clock" ariaLabel="Uptime/Downtime">
                      Uptime/Downtime
                    </Chip>
                    <Chip href="/pt/tecnologia/conversao-cores/" icon="palette" ariaLabel="Conversão de Cores">
                      Conversão de Cores
                    </Chip>
                    <Chip href="/pt/tecnologia/analise-senhas/" icon="shield" ariaLabel="Análise de Senhas">
                      Análise de Senhas
                    </Chip>
                    <Chip href="/pt/tecnologia/analise-latencia/" icon="zap" ariaLabel="Análise de Latência">
                      Análise de Latência
                    </Chip>
                  </ChipsContainer>
                </div>

              </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Por que escolher nossas calculadoras?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Oferecemos ferramentas precisas, gratuitas e fáceis de usar para todos os seus cálculos
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Rápido e Preciso</h3>
                  <p className="text-gray-600">
                    Resultados instantâneos com cálculos precisos e confiáveis
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🆓</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">100% Grátis</h3>
                  <p className="text-gray-600">
                    Todas as calculadoras são completamente gratuitas, sem limites
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Responsivo</h3>
                  <p className="text-gray-600">
                    Funciona perfeitamente em computador, tablet e celular
                  </p>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </div>
    </>
  )
}
