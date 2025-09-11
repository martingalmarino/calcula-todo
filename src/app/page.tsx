import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Chip, ChipsContainer } from '@/components/Chip'
import { PromotionalBlock } from '@/components/PromotionalBlock'
import { buildMeta, jsonLdWebSite } from '@/lib/seo'

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


            {/* Additional Categories Section - New Responsive Design */}
            <div className="mt-8 py-8">
              <div className="max-w-7xl mx-auto">
              
              {/* Categories Grid - Responsive */}
              <div className="space-y-12">
                
                {/* Matemáticas Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🧮</span>
                    <h3 className="text-blue-900 text-xl font-bold">Matemáticas</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/matematicas/fracciones/" icon="divide" ariaLabel="Calculadora de Fracciones">
                      Calculadora de Fracciones
                    </Chip>
                    <Chip href="/matematicas/porcentajes/" icon="percent" ariaLabel="Calculadora de Porcentajes">
                      Calculadora de Porcentajes
                    </Chip>
                    <Chip href="/matematicas/potencias-raices/" icon="zap" ariaLabel="Calculadora de Potencias y Raíces">
                      Calculadora de Potencias y Raíces
                    </Chip>
                    <Chip href="/matematicas/algebra/" icon="x" ariaLabel="Calculadora de Álgebra">
                      Calculadora de Álgebra
                    </Chip>
                    <Chip href="/matematicas/trigonometria/" icon="triangle" ariaLabel="Calculadora de Trigonometría">
                      Calculadora de Trigonometría
                    </Chip>
                    <Chip href="/matematicas/derivadas/" icon="trending-up" ariaLabel="Calculadora de Derivadas">
                      Calculadora de Derivadas
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
                    <Chip href="/calendario/dias-entre-fechas/" icon="calendar" ariaLabel="Contador de Días entre Fechas">
                      Contador de Días entre Fechas
                    </Chip>
                    <Chip href="/calendario/calculadora-edad/" icon="user-round" ariaLabel="Calculadora de Edad">
                      Calculadora de Edad
                    </Chip>
                    <Chip href="/calendario/sumar-restar-dias/" icon="plus-minus" ariaLabel="Sumar/Restar Días a una Fecha">
                      Sumar/Restar Días a una Fecha
                    </Chip>
                    <Chip href="/calendario/horas-minutos/" icon="clock-8" ariaLabel="Calculadora de Horas y Minutos">
                      Calculadora de Horas y Minutos
                    </Chip>
                    <Chip href="/calendario/dias-vacaciones/" icon="calendar-days" ariaLabel="Días de Vacaciones">
                      Días de Vacaciones
                    </Chip>
                    <Chip href="/calendario/conversor-fechas/" icon="calendar-range" ariaLabel="Conversor de Fechas">
                      Conversor de Fechas
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Salud Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🏥</span>
                    <h3 className="text-blue-900 text-xl font-bold">Salud</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/salud/imc/" icon="heart-pulse" ariaLabel="Índice Masa Corporal (IMC)">
                      Índice Masa Corporal (IMC)
                    </Chip>
                    <Chip href="/salud/tmb/" icon="flame" ariaLabel="Tasa Metabólica Basal (TMB)">
                      Tasa Metabólica Basal (TMB)
                    </Chip>
                    <Chip href="/salud/grasa-corporal/" icon="percent" ariaLabel="Porcentaje Grasa Corporal">
                      Porcentaje Grasa Corporal
                    </Chip>
                    <Chip href="/salud/pafi/" icon="users-round" ariaLabel="Calculadora PaFi">
                      Calculadora PaFi
                    </Chip>
                    <Chip href="/salud/agua-diaria/" icon="droplets" ariaLabel="Agua Diaria Recomendada">
                      Agua Diaria Recomendada
                    </Chip>
                    <Chip href="/salud/ovulacion/" icon="calendar-heart" ariaLabel="Calculadora de Ovulación">
                      Calculadora de Ovulación
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Marketing Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📈</span>
                    <h3 className="text-blue-900 text-xl font-bold">Marketing</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/marketing/cac/" icon="users" ariaLabel="CAC (Costo de Adquisición)">
                      CAC (Costo de Adquisición)
                    </Chip>
                    <Chip href="/marketing/ltv/" icon="trending-up" ariaLabel="LTV (Lifetime Value)">
                      LTV (Lifetime Value)
                    </Chip>
                    <Chip href="/marketing/conversion/" icon="target" ariaLabel="Conversión">
                      Conversión
                    </Chip>
                    <Chip href="/marketing/presupuesto/" icon="dollar-sign" ariaLabel="Presupuesto de Marketing">
                      Presupuesto de Marketing
                    </Chip>
                    <Chip href="/marketing/cpc-cpm/" icon="mouse-pointer" ariaLabel="CPC / CPM">
                      CPC / CPM
                    </Chip>
                    <Chip href="/marketing/roi/" icon="bar-chart-3" ariaLabel="ROI en Marketing">
                      ROI en Marketing
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Curiosas Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🎉</span>
                    <h3 className="text-blue-900 text-xl font-bold">Curiosas</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/curiosas/cafe-ahorro/" icon="coffee" ariaLabel="Café vs. Ahorro">
                      Café vs. Ahorro
                    </Chip>
                    <Chip href="/curiosas/pizza-persona/" icon="pizza" ariaLabel="Pizza por Persona">
                      Pizza por Persona
                    </Chip>
                    <Chip href="/curiosas/expectativa-comida/" icon="heart" ariaLabel="Expectativa de Vida y Comida">
                      Expectativa de Vida y Comida
                    </Chip>
                    <Chip href="/curiosas/besos-calorias/" icon="heart" ariaLabel="Besos Quemacalorías">
                      Besos Quemacalorías
                    </Chip>
                    <Chip href="/curiosas/tiempo-peliculas/" icon="tv" ariaLabel="Tiempo en Películas">
                      Tiempo en Películas
                    </Chip>
                    <Chip href="/curiosas/nivel-friolento/" icon="thermometer" ariaLabel="Nivel de Friolento">
                      Nivel de Friolento
                    </Chip>
                  </ChipsContainer>
                </div>


                {/* Finanzas Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">💰</span>
                    <h3 className="text-blue-900 text-xl font-bold">Finanzas</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/finanzas/interes-simple/" icon="trending-up" ariaLabel="Interés Simple">
                      Interés Simple
                    </Chip>
                    <Chip href="/finanzas/depreciacion-vehiculos/" icon="car" ariaLabel="Depreciación de Vehículos">
                      Depreciación de Vehículos
                    </Chip>
                    <Chip href="/finanzas/hipoteca/" icon="home" ariaLabel="Calculadora de Hipoteca">
                      Calculadora de Hipoteca
                    </Chip>
                    <Chip href="/finanzas/ipc/" icon="bar-chart-3" ariaLabel="Calculadora del IPC">
                      Calculadora del IPC
                    </Chip>
                    <Chip href="/finanzas/ahorro-objetivo/" icon="piggy-bank" ariaLabel="Ahorro Objetivo">
                      Ahorro Objetivo
                    </Chip>
                    <Chip href="/finanzas/valor-futuro-presente/" icon="calculator" ariaLabel="Valor Futuro y Presente">
                      Valor Futuro y Presente
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Geometría Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📐</span>
                    <h3 className="text-blue-900 text-xl font-bold">Geometría</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/geometria/circulo/" icon="circle" ariaLabel="Área y Perímetro del Círculo">
                      Área y Perímetro del Círculo
                    </Chip>
                    <Chip href="/geometria/rectangulo/" icon="rectangle-horizontal" ariaLabel="Área y Perímetro del Rectángulo">
                      Área y Perímetro del Rectángulo
                    </Chip>
                    <Chip href="/geometria/triangulo/" icon="triangle" ariaLabel="Área del Triángulo">
                      Área del Triángulo
                    </Chip>
                    <Chip href="/geometria/cuadrado/" icon="square" ariaLabel="Área y Perímetro del Cuadrado">
                      Área y Perímetro del Cuadrado
                    </Chip>
                    <Chip href="/geometria/rombo/" icon="diamond" ariaLabel="Área y Perímetro del Rombo">
                      Área y Perímetro del Rombo
                    </Chip>
                    <Chip href="/geometria/trapecio/" icon="hexagon" ariaLabel="Área del Trapecio">
                      Área del Trapecio
                    </Chip>
                  </ChipsContainer>
                </div>

                {/* Tecnología Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">💻</span>
                    <h3 className="text-blue-900 text-xl font-bold">Tecnología</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/tecnologia/conversion-almacenamiento/" icon="hard-drive" ariaLabel="Conversión de Almacenamiento">
                      Conversión de Almacenamiento
                    </Chip>
                    <Chip href="/tecnologia/velocidad-descarga/" icon="download" ariaLabel="Velocidad de Descarga">
                      Velocidad de Descarga
                    </Chip>
                    <Chip href="/tecnologia/uptime-downtime/" icon="clock" ariaLabel="Uptime/Downtime">
                      Uptime/Downtime
                    </Chip>
                    <Chip href="/tecnologia/conversion-colores/" icon="palette" ariaLabel="Conversión de Colores">
                      Conversión de Colores
                    </Chip>
                    <Chip href="/tecnologia/analisis-contraseñas/" icon="shield" ariaLabel="Análisis de Contraseñas">
                      Análisis de Contraseñas
                    </Chip>
                    <Chip href="/tecnologia/analisis-latencia/" icon="zap" ariaLabel="Análisis de Latencia">
                      Análisis de Latencia
                    </Chip>
                  </ChipsContainer>
                </div>


                {/* Otras Calculadoras Section */}
                <div className="category-section-new">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">🔧</span>
                    <h3 className="text-blue-900 text-xl font-bold">Otras Calculadoras</h3>
                  </div>
                  <ChipsContainer>
                    <Chip href="/otras/escala-notas/" icon="graduation-cap" ariaLabel="Escala de Notas">
                      Escala de Notas
                    </Chip>
                    <Chip href="/otras/gasto-gasolina/" icon="fuel" ariaLabel="Gasto Gasolina para Viajes">
                      Gasto Gasolina para Viajes
                    </Chip>
                    <Chip href="/otras/contador-palabras/" icon="type" ariaLabel="Contador de Palabras y Caracteres">
                      Contador de Palabras y Caracteres
                    </Chip>
                    <Chip href="/otras/numeros-romanos/" icon="hash" ariaLabel="Conversor de Números Romanos">
                      Conversor de Números Romanos
                    </Chip>
                    <Chip href="/otras/contador-clicks/" icon="mouse-pointer" ariaLabel="Contador de Clicks (CPS Test)">
                      Contador de Clicks (CPS Test)
                    </Chip>
                    <Chip href="/otras/calculadora-propinas/" icon="receipt" ariaLabel="Calculadora de Propinas">
                      Calculadora de Propinas
                    </Chip>
                  </ChipsContainer>
                </div>

              </div>
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
                  title: "Responsivo",
                  description: "Funciona perfectamente en computadora, tablet y móvil",
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

