import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import SonoClientPT from './SonoClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Sono - Ciclos de Sono e Horários | CalculaTudo.online',
  description: 'Calcule seus ciclos de sono e descubra os melhores horários para dormir e acordar baseado na ciência do sono.',
  keywords: ['sono', 'ciclos de sono', 'horário de dormir', 'descanso', 'qualidade do sono']
})

const breadcrumbs = [
  { label: 'Início', href: '/pt/' },
  { label: 'Saúde', href: '/pt/saude/' },
  { label: 'Sono', href: '/pt/saude/sono/' }
]

export default function SonoPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdCalculator({
            name: 'Calculadora de Sono',
            description: 'Calcule seus ciclos de sono e horários ideais',
            url: 'https://calculatudo.online/pt/saude/sono/',
            category: 'Saúde'
          })
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Sono"
            description="Calcule seus ciclos de sono e descubra os melhores horários para dormir"
            examples={[
              {
                label: 'Acordar às 7:00',
                values: { horarioDespertar: '07:00' }
              },
              {
                label: 'Acordar às 6:30',
                values: { horarioDespertar: '06:30' }
              },
              {
                label: 'Acordar às 8:00',
                values: { horarioDespertar: '08:00' }
              }
            ]}
            faqItems={[
              {
                question: 'O que são ciclos de sono?',
                answer: 'Os ciclos de sono são períodos de aproximadamente 90 minutos que incluem diferentes fases do sono (leve, profundo e REM).'
              },
              {
                question: 'Quantos ciclos de sono são recomendados?',
                answer: '5 ciclos completos (7.5 horas) são ideais para a maioria das pessoas, proporcionando descanso adequado.'
              },
              {
                question: 'Por que é importante completar os ciclos?',
                answer: 'Acordar no meio de um ciclo pode causar sonolência e fadiga. É melhor acordar no final de um ciclo.'
              },
              {
                question: 'Como melhorar a qualidade do sono?',
                answer: 'Mantenha horários regulares, evite telas antes de dormir, crie um ambiente escuro e silencioso, e evite cafeína à tarde.'
              }
            ]}
            disclaimer="Esta calculadora é apenas para fins informativos. Consulte um médico se tiver problemas persistentes de sono."
          >
            <SonoClientPT />
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
