import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PesoIdealClientPT } from './PesoIdealClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Peso Ideal - Descubra seu peso ideal | CalculaTudo.online',
  description: 'Calcule seu peso ideal baseado na fórmula de Devine. Descubra qual é o peso recomendado para sua altura e sexo.',
  keywords: ['peso ideal', 'calculadora peso', 'fórmula Devine', 'peso recomendado', 'altura'],
  path: '/pt/saude/peso-ideal/'
})

const breadcrumbs = [
  { label: 'Início', href: '/pt/' },
  { label: 'Saúde', href: '/pt/saude/' },
  { label: 'Peso Ideal', href: '/pt/saude/peso-ideal/' }
]

export default function PesoIdealPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdCalculator({
            name: 'Calculadora de Peso Ideal',
            description: 'Calcule seu peso ideal baseado na fórmula de Devine',
            url: 'https://calculatudo.online/pt/saude/peso-ideal/',
            category: 'Saúde'
          })
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Peso Ideal"
            description="Descubra qual é o peso ideal para sua altura e sexo"
            examples={[
              {
                label: 'Homem de 1.75m',
                values: { altura: '175', sexo: 'male' }
              },
              {
                label: 'Mulher de 1.65m',
                values: { altura: '165', sexo: 'female' }
              },
              {
                label: 'Homem de 1.80m',
                values: { altura: '180', sexo: 'male' }
              }
            ]}
            faqItems={[
              {
                question: 'O que é o peso ideal?',
                answer: 'O peso ideal é uma estimativa do peso corporal considerado saudável para uma determinada altura e sexo.'
              },
              {
                question: 'Como é calculado o peso ideal?',
                answer: 'Usamos a fórmula de Devine, que considera altura e sexo para calcular o peso ideal.'
              },
              {
                question: 'O peso ideal é o mesmo para todos?',
                answer: 'Não, o peso ideal varia com altura, sexo, idade, composição corporal e nível de atividade física.'
              },
              {
                question: 'Devo seguir exatamente o peso ideal?',
                answer: 'O peso ideal é uma referência. Considere sua composição corporal, massa muscular e consulte um profissional de saúde.'
              }
            ]}
            disclaimer="Esta calculadora é apenas para fins informativos. Consulte um profissional de saúde para avaliação médica."
          >
            <PesoIdealClientPT />
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
