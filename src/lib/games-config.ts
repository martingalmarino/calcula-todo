import { Gamepad2, Target, TrendingUp, Grid3X3, Dice1, Brain, Map, ArrowUp, Hash, Zap, Percent, Shapes, LucideIcon } from 'lucide-react'

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
    icon: Zap,
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
    icon: Percent,
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
    icon: Gamepad2,
    difficulty: 'avanzado',
    timeRange: '60s'
  },
  {
    title: 'Juego de Probabilidad',
    label: 'Juego de Probabilidad',
    description: 'Calcula probabilidades con dados, cartas y monedas en tiempo limitado. ¡Desafía tu comprensión estadística!',
    href: '/juegos-matematicos/probabilidad',
    category: 'Juegos Matemáticos',
    keywords: ['probabilidad', 'estadística', 'dados', 'cartas', 'monedas', 'avanzado'],
    icon: Dice1,
    difficulty: 'avanzado',
    timeRange: '45s'
  },
  {
    title: 'Razonamiento Lógico con Patrones',
    label: 'Razonamiento Lógico con Patrones',
    description: 'Descubre patrones matemáticos en secuencias de símbolos y números. ¡Desafía tu pensamiento lógico y razonamiento abstracto!',
    href: '/juegos-matematicos/patrones-logicos',
    category: 'Juegos Matemáticos',
    keywords: ['patrones', 'lógica', 'secuencias', 'razonamiento', 'símbolos', 'pensamiento abstracto'],
    icon: Brain,
    difficulty: 'avanzado',
    timeRange: '40s'
  },
  {
    title: 'El Laberinto Algebraico',
    label: 'El Laberinto Algebraico',
    description: 'Navega por un laberinto resolviendo operaciones algebraicas en cada paso. ¡Desafía tu agilidad matemática y pensamiento estratégico!',
    href: '/juegos-matematicos/laberinto-algebraico',
    category: 'Juegos Matemáticos',
    keywords: ['laberinto', 'álgebra', 'operaciones', 'navegación', 'matemáticas', 'estrategia', 'pensamiento lógico'],
    icon: Map,
    difficulty: 'avanzado',
    timeRange: '50s'
  },
  {
    title: 'Mayor o Menor',
    label: 'Mayor o Menor',
    description: 'Compara números rápidamente y elige cuál es mayor o menor. ¡Desafía tu agilidad mental y sentido numérico!',
    href: '/juegos-matematicos/mayor-menor',
    category: 'Juegos Matemáticos',
    keywords: ['mayor', 'menor', 'comparación', 'números', 'agilidad mental', 'sentido numérico', 'decimales', 'fracciones'],
    icon: ArrowUp,
    difficulty: 'básico',
    timeRange: '30s'
  },
  {
    title: 'Par o Impar Exprés',
    label: 'Par o Impar Exprés',
    description: 'Clasifica números como pares o impares antes de que termine el tiempo. ¡Desafía tu agilidad mental y reconocimiento numérico!',
    href: '/juegos-matematicos/par-impar',
    category: 'Juegos Matemáticos',
    keywords: ['par', 'impar', 'números pares', 'números impares', 'clasificación', 'agilidad mental', 'reconocimiento numérico', 'velocidad'],
    icon: Hash,
    difficulty: 'básico',
    timeRange: '30s'
  },
  {
    title: 'Rompecabezas Geométrico Simple',
    label: 'Rompecabezas Geométrico Simple',
    description: 'Calcula perímetros y áreas de figuras geométricas simples. ¡Desafía tu conocimiento de geometría básica!',
    href: '/juegos-matematicos/rompecabezas-geometrico',
    category: 'Juegos Matemáticos',
    keywords: ['geometría', 'perímetro', 'área', 'rectángulo', 'cuadrado', 'triángulo', 'figuras geométricas', 'matemáticas visuales'],
    icon: Shapes,
    difficulty: 'intermedio',
    timeRange: '45s'
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
