import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { CategoryPageLayout } from '@/components/CategoryPageLayout'
import { Heart, Activity, Target } from 'lucide-react'
import { SaudeClientPT } from './SaudeClientPT'

export const metadata: Metadata = buildMeta({
  title: 'Calculadoras de Saúde - CalculaTudo.online',
  description: 'Calculadoras de saúde gratuitas: IMC, peso ideal, calorias, água, sono e exercício. Ferramentas precisas para cuidar da sua saúde.',
  keywords: ['calculadora saúde', 'IMC', 'peso ideal', 'calorias', 'água', 'sono', 'exercício', 'saúde']
})

const breadcrumbs = [
  { label: 'Início', href: '/pt/' },
  { label: 'Saúde', href: '/pt/saude/' }
]

const customStats = [
  {
    icon: Heart,
    value: '6',
    label: 'Calculadoras de Saúde',
    color: 'purple' as const
  },
  {
    icon: Activity,
    value: '100%',
    label: 'Gratuitas',
    color: 'green' as const
  },
  {
    icon: Target,
    value: 'Precisas',
    label: 'Cálculos',
    color: 'blue' as const
  }
]

export default function SaudePage() {
  return (
    <CategoryPageLayout
      category={{
        label: 'Saúde',
        description: 'Calculadoras de saúde para monitorar seu bem-estar físico e mental',
        href: '/pt/saude/',
        calculators: [
          {
            label: 'IMC',
            description: 'Calcule seu Índice de Massa Corporal e descubra sua categoria de peso',
            href: '/pt/saude/imc/',
            icon: 'activity',
            category: 'saude',
            keywords: ['IMC', 'peso', 'altura', 'massa corporal']
          },
          {
            label: 'Peso Ideal',
            description: 'Descubra qual é o peso ideal para sua altura e tipo corporal',
            href: '/pt/saude/peso-ideal/',
            icon: 'target',
            category: 'saude',
            keywords: ['peso ideal', 'altura', 'tipo corporal']
          },
          {
            label: 'Calorias',
            description: 'Calcule suas necessidades calóricas diárias baseadas em seu estilo de vida',
            href: '/pt/saude/calorias/',
            icon: 'flame',
            category: 'saude',
            keywords: ['calorias', 'TMB', 'metabolismo', 'dieta']
          },
          {
            label: 'Água',
            description: 'Descubra quanta água você deve beber por dia para manter-se hidratado',
            href: '/pt/saude/agua/',
            icon: 'droplets',
            category: 'saude',
            keywords: ['água', 'hidratação', 'líquidos']
          },
          {
            label: 'Sono',
            description: 'Calcule seus ciclos de sono e descubra os melhores horários para dormir',
            href: '/pt/saude/sono/',
            icon: 'moon',
            category: 'saude',
            keywords: ['sono', 'ciclos', 'descanso', 'horário']
          },
          {
            label: 'Exercício',
            description: 'Calcule calorias queimadas e intensidade de exercícios',
            href: '/pt/saude/exercicio/',
            icon: 'dumbbell',
            category: 'saude',
            keywords: ['exercício', 'calorias queimadas', 'atividade física']
          }
        ]
      }}
      customStats={customStats}
      breadcrumbs={breadcrumbs}
      faqItems={[
        {
          question: 'Como funcionam as calculadoras de saúde?',
          answer: 'Nossas calculadoras usam fórmulas científicas reconhecidas para fornecer estimativas precisas de parâmetros de saúde como IMC, necessidades calóricas e hidratação.'
        },
        {
          question: 'Os resultados são precisos?',
          answer: 'Sim, usamos fórmulas médicas e científicas validadas. No entanto, sempre consulte um profissional de saúde para diagnósticos e tratamentos.'
        },
        {
          question: 'Posso usar essas calculadoras para diagnóstico médico?',
          answer: 'Não. Estas calculadoras são apenas para fins informativos e educacionais. Sempre consulte um médico para diagnósticos e tratamentos médicos.'
        },
        {
          question: 'Com que frequência devo recalcular?',
          answer: 'Recomendamos recalcular periodicamente, especialmente se houver mudanças significativas no peso, altura, idade ou nível de atividade física.'
        }
      ]}
    >
      <SaudeClientPT />
    </CategoryPageLayout>
  )
}
