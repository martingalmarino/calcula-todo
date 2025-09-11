import { Calculator, Gamepad2, Target, TrendingUp, Grid3X3, LucideIcon } from 'lucide-react'

export interface GameConfig {
  title: string
  label: string
  description: string
  href: string
  category: string
  keywords: string[]
  icon: LucideIcon
  difficulty: 'básico' | 'intermedio' | 'avanzado'
  timeRange: string
}

export const gamesConfig: GameConfig[] = [
  {
    title: 'Sumas y Restas contra Reloj',
    label: 'Sumas y Restas contra Reloj',
    description: 'Resuelve operaciones de suma y resta en 30 segundos. ¡Demuestra tu velocidad mental!',
    href: '/juegos-matematicos/sumas-restas',
    category: 'Juegos Matemáticos',
    keywords: ['sumas', 'restas', 'velocidad', 'cálculo mental', 'agilidad'],
    icon: Calculator,
    difficulty: 'básico',
    timeRange: '30s'
  },
  {
    title: 'Encuentra el Número Faltante',
    label: 'Encuentra el Número Faltante',
    description: 'Completa las ecuaciones encontrando el número que falta. ¡Pon a prueba tu lógica!',
    href: '/juegos-matematicos/numero-faltante',
    category: 'Juegos Matemáticos',
    keywords: ['ecuaciones', 'números faltantes', 'lógica', 'álgebra básica'],
    icon: Target,
    difficulty: 'básico',
    timeRange: '30s'
  },
  {
    title: 'Rompecabezas de Fracciones',
    label: 'Rompecabezas de Fracciones',
    description: 'Identifica fracciones visuales con pizzas divididas. ¡Aprende fracciones de forma visual!',
    href: '/juegos-matematicos/fracciones',
    category: 'Juegos Matemáticos',
    keywords: ['fracciones', 'visual', 'pizzas', 'matemáticas visuales'],
    icon: Gamepad2,
    difficulty: 'básico',
    timeRange: '30s'
  },
  {
    title: 'Desafío de Múltiplos y Divisores',
    label: 'Desafío de Múltiplos y Divisores',
    description: 'Identifica múltiplos y divisores rápidamente. ¡Filtra números por sus propiedades!',
    href: '/juegos-matematicos/multiplos-divisores',
    category: 'Juegos Matemáticos',
    keywords: ['múltiplos', 'divisores', 'números', 'propiedades', 'filtrado'],
    icon: Target,
    difficulty: 'intermedio',
    timeRange: '30s'
  },
  {
    title: 'Rompecabezas de Porcentajes',
    label: 'Rompecabezas de Porcentajes',
    description: 'Calcula descuentos y aumentos con porcentajes. ¡Domina los cálculos comerciales!',
    href: '/juegos-matematicos/porcentajes',
    category: 'Juegos Matemáticos',
    keywords: ['porcentajes', 'descuentos', 'aumentos', 'cálculos comerciales'],
    icon: Calculator,
    difficulty: 'intermedio',
    timeRange: '30s'
  },
  {
    title: 'Secuencias Numéricas',
    label: 'Secuencias Numéricas',
    description: 'Descubre el patrón y completa la secuencia. ¡Desarrolla tu pensamiento lógico!',
    href: '/juegos-matematicos/secuencias',
    category: 'Juegos Matemáticos',
    keywords: ['secuencias', 'patrones', 'lógica', 'progresiones', 'series'],
    icon: TrendingUp,
    difficulty: 'intermedio',
    timeRange: '30s'
  },
  {
    title: 'Sudoku de Operaciones Matemáticas',
    label: 'Sudoku de Operaciones Matemáticas',
    description: 'Resuelve grillas donde cada fila y columna debe sumar el mismo resultado. ¡Desafía tu lógica matemática!',
    href: '/juegos-matematicos/sudoku-operaciones',
    category: 'Juegos Matemáticos',
    keywords: ['sudoku', 'operaciones', 'grilla', 'lógica matemática', 'sumas'],
    icon: Grid3X3,
    difficulty: 'avanzado',
    timeRange: '45s'
  },
  {
    title: 'Ecuaciones Exprés',
    label: 'Ecuaciones Exprés',
    description: 'Resuelve ecuaciones de primer y segundo grado en tiempo limitado. ¡Desafía tu agilidad algebraica!',
    href: '/juegos-matematicos/ecuaciones-expres',
    category: 'Juegos Matemáticos',
    keywords: ['ecuaciones', 'álgebra', 'primer grado', 'segundo grado', 'avanzado'],
    icon: Calculator,
    difficulty: 'avanzado',
    timeRange: '60s'
  }
]

// Función para obtener estadísticas dinámicas
export const getGamesStats = () => {
  const totalGames = gamesConfig.length
  const timeRanges = [...new Set(gamesConfig.map(game => game.timeRange))]
  const difficulties = [...new Set(gamesConfig.map(game => game.difficulty))]
  
  return {
    totalGames,
    timeRanges,
    difficulties,
    timeRangeDisplay: timeRanges.length > 1 ? `${timeRanges[0]}-${timeRanges[timeRanges.length - 1]}` : timeRanges[0]
  }
}
