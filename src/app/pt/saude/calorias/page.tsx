import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CaloriasClientPT } from './CaloriasClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Calorias - Necessidades Calóricas Diárias | CalculaTudo.online',
  description: 'Calcule suas necessidades calóricas diárias baseadas em peso, altura, idade, sexo e nível de atividade física.',
  keywords: ['calorias', 'necessidades calóricas', 'TMB', 'metabolismo', 'dieta', 'atividade física'],
  path: '/pt/saude/calorias/'
})

const breadcrumbs = [
  { label: 'Início', href: '/pt/' },
  { label: 'Saúde', href: '/pt/saude/' },
  { label: 'Calorias', href: '/pt/saude/calorias/' }
]

export default function CaloriasPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdCalculator({
            name: 'Calculadora de Calorias',
            description: 'Calcule suas necessidades calóricas diárias',
            url: 'https://calculatudo.online/pt/saude/calorias/',
            category: 'Saúde'
          })
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Calorias"
            description="Calcule suas necessidades calóricas diárias baseadas em seu estilo de vida"
            examples={[
              {
                label: 'Homem ativo de 30 anos, 70kg, 1.75m',
                values: { peso: '70', altura: '175', idade: '30', sexo: 'male', atividade: 'active' }
              },
              {
                label: 'Mulher moderada de 25 anos, 60kg, 1.65m',
                values: { peso: '60', altura: '165', idade: '25', sexo: 'female', atividade: 'moderate' }
              },
              {
                label: 'Homem sedentário de 40 anos, 80kg, 1.80m',
                values: { peso: '80', altura: '180', idade: '40', sexo: 'male', atividade: 'sedentary' }
              }
            ]}
            faqItems={[
              {
                question: 'O que é TMB?',
                answer: 'TMB (Taxa Metabólica Basal) é a quantidade de calorias que seu corpo queima em repouso para manter funções básicas.'
              },
              {
                question: 'Como são calculadas as calorias totais?',
                answer: 'As calorias totais = TMB × fator de atividade física, que varia conforme seu nível de exercício.'
              },
              {
                question: 'Qual é a diferença entre os níveis de atividade?',
                answer: 'Sedentário (pouco exercício), Leve (exercício leve), Moderado (exercício moderado), Ativo (exercício intenso), Muito ativo (exercício muito intenso).'
              },
              {
                question: 'Como usar essas informações para dieta?',
                answer: 'Para perder peso, consuma menos calorias que o total calculado. Para ganhar peso, consuma mais calorias.'
              }
            ]}
            disclaimer="Esta calculadora é apenas para fins informativos. Consulte um nutricionista para um plano alimentar personalizado."
          >
            <CaloriasClientPT />
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
