import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { jsonLdCalculator } from '@/lib/seo'
import { CalculatorLayout } from '@/components/CalculatorLayout'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import ExercicioClientPT from './ExercicioClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadora de Exercício - Calorias Queimadas | CalculaTudo.online',
  description: 'Calcule as calorias queimadas durante exercícios físicos baseado no tipo de atividade, duração, peso e intensidade.',
  keywords: ['exercício', 'calorias queimadas', 'atividade física', 'treino', 'fitness'],
  path: '/pt/saude/exercicio/'
})

const breadcrumbs = [
  { label: 'Início', href: '/pt/' },
  { label: 'Saúde', href: '/pt/saude/' },
  { label: 'Exercício', href: '/pt/saude/exercicio/' }
]

export default function ExercicioPage() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdCalculator({
            name: 'Calculadora de Exercício',
            description: 'Calcule calorias queimadas durante exercícios',
            url: 'https://calculatudo.online/pt/saude/exercicio/',
            category: 'Saúde'
          })
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Calculadora de Exercício"
            description="Calcule calorias queimadas e intensidade de exercícios"
            examples={[
              {
                label: 'Corrida moderada de 30 min, 70kg',
                values: { peso: '70', duracao: '30', exercicio: 'running', intensidade: 'moderate' }
              },
              {
                label: 'Caminhada leve de 45 min, 60kg',
                values: { peso: '60', duracao: '45', exercicio: 'walking', intensidade: 'low' }
              },
              {
                label: 'Musculação alta de 60 min, 80kg',
                values: { peso: '80', duracao: '60', exercicio: 'weightlifting', intensidade: 'high' }
              }
            ]}
            faqItems={[
              {
                question: 'O que são METs?',
                answer: 'METs (Metabolic Equivalent of Task) são uma medida da intensidade do exercício. 1 MET equivale ao gasto energético em repouso.'
              },
              {
                question: 'Como são calculadas as calorias queimadas?',
                answer: 'Usamos a fórmula: Calorias = METs × peso (kg) × duração (horas). Os METs variam conforme o tipo e intensidade do exercício.'
              },
              {
                question: 'Qual é a diferença entre intensidades?',
                answer: 'Baixa: esforço leve, Moderada: esforço moderado, Alta: esforço intenso. A intensidade real pode variar conforme sua condição física.'
              },
              {
                question: 'Como usar essas informações?',
                answer: 'Use para planejar sua dieta, acompanhar progresso e equilibrar calorias consumidas vs. queimadas durante exercícios.'
              }
            ]}
            disclaimer="Esta calculadora é apenas para fins informativos. Consulte um personal trainer para um programa de exercícios personalizado."
          >
            <ExercicioClientPT />
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  )
}
