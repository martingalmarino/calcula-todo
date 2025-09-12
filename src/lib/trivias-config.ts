import { 
  Heart, 
  Brain, 
  Shield, 
  Zap, 
  Target, 
  Trophy, 
  Clock, 
  LucideIcon 
} from 'lucide-react'

export interface TriviaConfig {
  id: string
  title: string
  label: string
  description: string
  href: string
  category: string
  keywords: string[]
  difficulty: 'básico' | 'intermedio' | 'avanzado'
  icon: LucideIcon
  totalQuestions: number
  timeLimit: number
  relatedCalculator?: string
}

export const triviasConfig: TriviaConfig[] = [
  {
    id: 'quiz-imc-habitos',
    title: 'Quiz de IMC y Hábitos Saludables',
    label: 'Quiz de IMC y Hábitos Saludables',
    description: 'Pon a prueba tus conocimientos sobre salud corporal, IMC y hábitos saludables. Aprende mientras te diviertes.',
    href: '/trivias/quiz-imc-habitos',
    category: 'Salud',
    keywords: ['quiz salud', 'IMC', 'hábitos saludables', 'salud corporal', 'bienestar'],
    difficulty: 'básico',
    icon: Heart,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/salud/imc'
  }
]

export function getTriviasStats() {
  return {
    totalTrivias: triviasConfig.length,
    totalQuestions: triviasConfig.reduce((sum, trivia) => sum + trivia.totalQuestions, 0),
    timeRangeDisplay: '5-10 min',
    categories: [...new Set(triviasConfig.map(trivia => trivia.category))]
  }
}

export function getRelatedTrivias(currentTriviaId: string, limit: number = 2): TriviaConfig[] {
  return triviasConfig
    .filter(trivia => trivia.id !== currentTriviaId)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit)
}
