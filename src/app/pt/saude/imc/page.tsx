import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import IMCClientPT from './IMCClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de IMC - Índice de Massa Corporal | CalculaTudo.online',
  description: 'Calcule seu Índice de Massa Corporal (IMC) gratuitamente. Descubra sua categoria de peso e receba recomendações personalizadas para uma vida saudável.',
  keywords: ['calculadora IMC', 'índice massa corporal', 'peso ideal', 'categoria peso', 'saúde'],
  path: '/pt/saude/imc/'
})

const breadcrumbs = [
  { label: 'Início', href: '/pt/' },
  { label: 'Saúde', href: '/pt/saude/' },
  { label: 'IMC', href: '/pt/saude/imc/' }
]

export default function IMCPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdCalculator({
            name: 'Calculadora de IMC',
            description: 'Calcule seu Índice de Massa Corporal e descubra sua categoria de peso',
            url: 'https://calculatudo.online/pt/saude/imc/',
            category: 'Saúde'
          })
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de IMC"
            description="Calcule seu Índice de Massa Corporal e descubra sua categoria de peso"
            examples={[
              {
                label: 'Pessoa de 70kg e 1.75m',
                values: { peso: '70', altura: '175' }
              },
              {
                label: 'Pessoa de 60kg e 1.65m',
                values: { peso: '60', altura: '165' }
              },
              {
                label: 'Pessoa de 80kg e 1.80m',
                values: { peso: '80', altura: '180' }
              }
            ]}
            faqItems={[
              {
                question: 'O que é o IMC?',
                answer: 'O Índice de Massa Corporal (IMC) é uma medida que relaciona peso e altura para avaliar se uma pessoa está com peso adequado.'
              },
              {
                question: 'Como é calculado o IMC?',
                answer: 'O IMC é calculado dividindo o peso (em kg) pela altura ao quadrado (em metros): IMC = peso / (altura)²'
              },
              {
                question: 'Quais são as categorias de IMC?',
                answer: 'Abaixo do peso (&lt; 18.5), Peso normal (18.5-24.9), Sobrepeso (25-29.9) e Obesidade (&gt;= 30).'
              },
              {
                question: 'O IMC é preciso para todos?',
                answer: 'O IMC é uma ferramenta útil, mas pode não ser preciso para atletas, idosos ou pessoas com muita massa muscular.'
              }
            ]}
            disclaimer="Esta calculadora é apenas para fins informativos. Consulte um profissional de saúde para avaliação médica."
          >
            <IMCClientPT />
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
