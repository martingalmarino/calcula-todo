import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import AguaClientPT from './AguaClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Água - Ingestão Diária Recomendada | CalculaTudo.online',
  description: 'Calcule quanta água você deve beber por dia baseado no seu peso, idade e nível de atividade física.',
  keywords: ['água', 'hidratação', 'líquidos', 'ingestão diária', 'saúde']
})

const breadcrumbs = [
  { label: 'Início', href: '/pt/' },
  { label: 'Saúde', href: '/pt/saude/' },
  { label: 'Água', href: '/pt/saude/agua/' }
]

export default function AguaPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdCalculator({
            name: 'Calculadora de Água',
            description: 'Calcule sua ingestão diária recomendada de água',
            url: 'https://calculatudo.online/pt/saude/agua/',
            category: 'Saúde'
          })
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Água"
            description="Descubra quanta água você deve beber por dia para manter-se hidratado"
            examples={[
              {
                label: 'Pessoa de 70kg, 30 anos, atividade moderada',
                values: { peso: '70', idade: '30', atividade: 'moderate' }
              },
              {
                label: 'Pessoa de 60kg, 25 anos, atividade alta',
                values: { peso: '60', idade: '25', atividade: 'high' }
              },
              {
                label: 'Pessoa de 80kg, 40 anos, atividade baixa',
                values: { peso: '80', idade: '40', atividade: 'low' }
              }
            ]}
            faqItems={[
              {
                question: 'Por que é importante beber água?',
                answer: 'A água é essencial para o funcionamento do corpo, incluindo regulação da temperatura, transporte de nutrientes e eliminação de toxinas.'
              },
              {
                question: 'Como é calculada a ingestão de água?',
                answer: 'Baseamos no peso corporal (35ml por kg) com ajustes para idade e nível de atividade física.'
              },
              {
                question: 'O que conta como ingestão de líquidos?',
                answer: 'Água pura, chás, sucos naturais e outros líquidos não alcoólicos contam para a hidratação diária.'
              },
              {
                question: 'Como saber se estou bem hidratado?',
                answer: 'A cor da urina deve ser clara ou amarelo pálido. A sede é um indicador tardio de desidratação.'
              }
            ]}
            disclaimer="Esta calculadora é apenas para fins informativos. Consulte um médico se tiver condições especiais de saúde."
          >
            <AguaClientPT />
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
