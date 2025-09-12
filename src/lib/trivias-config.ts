import { 
  Heart, 
  Brain, 
  Shield, 
  Zap, 
  Target, 
  Trophy, 
  Clock, 
  Apple,
  Moon,
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
  },
  {
    id: 'mitos-salud',
    title: 'Juego de Mitos de Salud',
    label: 'Juego de Mitos de Salud',
    description: 'Desmiente creencias comunes sobre salud de forma lúdica. ¿Sabes distinguir entre mitos y realidades?',
    href: '/trivias/mitos-salud',
    category: 'Salud',
    keywords: ['mitos salud', 'creencias', 'verdadero falso', 'nutrición', 'bienestar', 'desmentir'],
    difficulty: 'intermedio',
    icon: Shield,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/salud/imc'
  },
  {
    id: 'nutricion-calorias',
    title: 'Trivia de Nutrición Básica',
    label: 'Trivia de Nutrición Básica',
    description: 'Adivina las calorías de distintos alimentos y aprende sobre nutrición. Incluye comparaciones visuales y modo batalla.',
    href: '/trivias/nutricion-calorias',
    category: 'Salud',
    keywords: ['nutrición', 'calorías', 'alimentos', 'dieta', 'salud', 'comparaciones'],
    difficulty: 'intermedio',
    icon: Apple,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/salud/calorias'
  },
  {
    id: 'dormir-suficiente',
    title: '¿Dormís lo suficiente?',
    label: '¿Dormís lo suficiente?',
    description: 'Pon a prueba tus conocimientos sobre el sueño y los hábitos saludables. Aprende cuántas horas necesitas dormir según tu edad.',
    href: '/trivias/dormir-suficiente',
    category: 'Salud',
    keywords: ['sueño', 'dormir', 'hábitos saludables', 'insomnio', 'salud mental', 'descanso'],
    difficulty: 'básico',
    icon: Moon,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/salud/sueno'
  }
]

export function getTriviasStats() {
  const totalTrivias = triviasConfig.length
  const totalQuestions = triviasConfig.reduce((sum, trivia) => sum + trivia.totalQuestions, 0)
  const categories = [...new Set(triviasConfig.map(trivia => trivia.category))]
  
  // Calcular rango de tiempo dinámicamente
  const timeLimits = triviasConfig.map(trivia => trivia.timeLimit)
  const minTime = Math.min(...timeLimits) / 60
  const maxTime = Math.max(...timeLimits) / 60
  const timeRangeDisplay = minTime === maxTime 
    ? `${minTime} min` 
    : `${minTime}-${maxTime} min`
  
  // Calcular dificultades disponibles
  const difficulties = [...new Set(triviasConfig.map(trivia => trivia.difficulty))]
  
  return {
    totalTrivias,
    totalQuestions,
    timeRangeDisplay,
    categories,
    difficulties,
    avgQuestionsPerTrivia: Math.round(totalQuestions / totalTrivias)
  }
}

export function getRelatedTrivias(currentTriviaId: string, limit: number = 2): TriviaConfig[] {
  return triviasConfig
    .filter(trivia => trivia.id !== currentTriviaId)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit)
}

export function getTriviasByCategory(category: string): TriviaConfig[] {
  return triviasConfig.filter(trivia => trivia.category === category)
}

export function getTriviasByDifficulty(difficulty: 'básico' | 'intermedio' | 'avanzado'): TriviaConfig[] {
  return triviasConfig.filter(trivia => trivia.difficulty === difficulty)
}

export function getTriviaById(id: string): TriviaConfig | undefined {
  return triviasConfig.find(trivia => trivia.id === id)
}
