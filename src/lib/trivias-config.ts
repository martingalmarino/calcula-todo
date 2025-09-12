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
  Activity,
  Monitor,
  Lock,
  Wifi,
  Palette,
  Recycle,
  Leaf,
  Lightbulb,
  Coins,
  TrendingDown,
  Bone,
  Microscope,
  Ruler,
  Sun,
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
  isNew?: boolean
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
  },
  {
    id: 'ejercicio-fisico-oms',
    title: 'Ejercicio Físico Mínimo Recomendado (OMS)',
    label: 'Ejercicio Físico Mínimo Recomendado (OMS)',
    description: 'Aprende las recomendaciones oficiales de la OMS sobre actividad física. Descubre cuánto ejercicio necesitas para mantenerte saludable.',
    href: '/trivias/ejercicio-fisico-oms',
    category: 'Salud',
    keywords: ['ejercicio', 'actividad física', 'OMS', 'salud', 'deporte', 'fitness', 'recomendaciones'],
    difficulty: 'básico',
    icon: Activity,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/salud/calorias'
  },
  {
    id: 'tiempo-sentado-sedentarismo',
    title: '¿Cuánto tiempo pasás sentado? (Sedentarismo)',
    label: '¿Cuánto tiempo pasás sentado? (Sedentarismo)',
    description: 'Descubre los riesgos del sedentarismo y aprende cómo combatir los efectos de estar sentado demasiado tiempo. Conoce las recomendaciones para un estilo de vida más activo.',
    href: '/trivias/tiempo-sentado-sedentarismo',
    category: 'Salud',
    keywords: ['sedentarismo', 'tiempo sentado', 'salud', 'pausas activas', 'estilo de vida', 'trabajo', 'oficina'],
    difficulty: 'básico',
    icon: Monitor,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/salud/calorias'
  },
  {
    id: 'contrasenas-seguras',
    title: 'Quiz de Contraseñas Seguras',
    label: 'Quiz de Contraseñas Seguras',
    description: 'Aprende sobre ciberseguridad y buenas prácticas para crear contraseñas seguras. Descubre cómo proteger tus cuentas digitales de forma efectiva.',
    href: '/trivias/contrasenas-seguras',
    category: 'Tecnología',
    keywords: ['contraseñas', 'seguridad', 'ciberseguridad', 'protección', 'cuentas', 'digital', 'privacy'],
    difficulty: 'básico',
    icon: Lock,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/tecnologia/analisis-contraseñas'
  },
  {
    id: 'trivia-internet',
    title: 'Trivia de Internet',
    label: 'Trivia de Internet',
    description: 'Pon a prueba tus conocimientos sobre internet, redes y tecnología. Aprende conceptos básicos de conectividad, protocolos y velocidad de internet.',
    href: '/trivias/trivia-internet',
    category: 'Tecnología',
    keywords: ['internet', 'redes', 'velocidad', 'protocolos', 'conectividad', 'tecnología', 'banda ancha'],
    difficulty: 'básico',
    icon: Wifi,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/tecnologia/velocidad-descarga'
  },
  {
    id: 'adivina-color-hex-rgb',
    title: 'Adivina el Color (HEX ↔ RGB)',
    label: 'Adivina el Color (HEX ↔ RGB)',
    description: 'Pon a prueba tus conocimientos sobre códigos de color. Aprende a convertir entre códigos hexadecimales (HEX) y valores RGB de forma divertida.',
    href: '/trivias/adivina-color-hex-rgb',
    category: 'Tecnología',
    keywords: ['colores', 'hex', 'rgb', 'conversión', 'códigos', 'diseño', 'web', 'paleta'],
    difficulty: 'intermedio',
    icon: Palette,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/tecnologia/conversion-colores'
  },
  {
    id: 'trivia-reciclaje-contenedores',
    title: 'Trivia de Reciclaje: ¿Qué va en cada contenedor?',
    label: 'Trivia de Reciclaje: ¿Qué va en cada contenedor?',
    description: 'Aprende sobre la correcta clasificación de residuos y reciclaje. Descubre qué va en cada contenedor para cuidar el medio ambiente.',
    href: '/trivias/trivia-reciclaje-contenedores',
    category: 'Medio Ambiente',
    keywords: ['reciclaje', 'residuos', 'contenedores', 'medio ambiente', 'sostenibilidad', 'ecología', 'separación'],
    difficulty: 'básico',
    icon: Recycle,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/otras/calculadora-propinas'
  },
  {
    id: 'quiz-huella-carbono',
    title: 'Quiz de Huella de Carbono',
    label: 'Quiz de Huella de Carbono',
    description: 'Descubre cómo tus acciones diarias impactan el medio ambiente. Aprende sobre emisiones de CO₂, transporte sostenible y hábitos eco-friendly.',
    href: '/trivias/quiz-huella-carbono',
    category: 'Medio Ambiente',
    keywords: ['huella de carbono', 'CO2', 'emisiones', 'sostenibilidad', 'medio ambiente', 'transporte', 'dieta', 'energía'],
    difficulty: 'intermedio',
    icon: Leaf,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/otras/calculadora-propinas',
    isNew: true
  },
  {
    id: 'juego-consumo-electrico',
    title: 'Juego de Consumo Eléctrico',
    label: 'Juego de Consumo Eléctrico',
    description: 'Aprende sobre eficiencia energética y consumo eléctrico en el hogar. Descubre qué electrodomésticos gastan más energía y cómo ahorrar en tu factura.',
    href: '/trivias/juego-consumo-electrico',
    category: 'Medio Ambiente',
    keywords: ['consumo eléctrico', 'eficiencia energética', 'electrodomésticos', 'ahorro energético', 'factura de luz', 'sostenibilidad', 'energía'],
    difficulty: 'básico',
    icon: Lightbulb,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/otras/calculadora-propinas',
    isNew: true
  },
  {
    id: 'quiz-monedas-tipos-cambio',
    title: 'Quiz de Monedas y Tipos de Cambio',
    label: 'Quiz de Monedas y Tipos de Cambio',
    description: 'Aprende sobre las monedas oficiales de diferentes países del mundo. Descubre qué países usan qué monedas y expande tu conocimiento geográfico.',
    href: '/trivias/quiz-monedas-tipos-cambio',
    category: 'Finanzas',
    keywords: ['monedas', 'tipos de cambio', 'geografía', 'países', 'economía', 'divisas', 'finanzas internacionales'],
    difficulty: 'básico',
    icon: Coins,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/finanzas/conversion-monedas',
    isNew: true
  },
  {
    id: 'quiz-crisis-financieras',
    title: 'Quiz de Crisis Financieras',
    label: 'Quiz de Crisis Financieras',
    description: 'Aprende sobre las crisis financieras más importantes de la historia. Descubre qué causó cada crisis, cuándo ocurrieron y sus consecuencias globales.',
    href: '/trivias/quiz-crisis-financieras',
    category: 'Finanzas',
    keywords: ['crisis financieras', 'historia económica', 'Gran Depresión', 'crisis 2008', 'economía mundial', 'burbujas financieras', 'recesiones'],
    difficulty: 'intermedio',
    icon: TrendingDown,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/finanzas/conversion-monedas',
    isNew: true
  },
  {
    id: 'quiz-huesos-cuerpo-humano',
    title: 'Quiz sobre los huesos del cuerpo humano',
    label: 'Quiz sobre los huesos del cuerpo humano',
    description: 'Aprende sobre la anatomía ósea del cuerpo humano. Descubre cuántos huesos tenemos, cuáles son los más largos y pequeños, y sus funciones principales.',
    href: '/trivias/quiz-huesos-cuerpo-humano',
    category: 'Ciencia',
    keywords: ['huesos', 'anatomía', 'cuerpo humano', 'esqueleto', 'fémur', 'cráneo', 'columna vertebral', 'biología'],
    difficulty: 'básico',
    icon: Bone,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/salud/imc',
    isNew: true
  },
  {
    id: 'quiz-grandes-cientificos',
    title: 'Quiz de grandes científicos',
    label: 'Quiz de grandes científicos',
    description: 'Descubre los científicos más importantes de la historia. Aprende sobre sus descubrimientos, teorías y contribuciones que cambiaron el mundo de la ciencia.',
    href: '/trivias/quiz-grandes-cientificos',
    category: 'Ciencia',
    keywords: ['científicos', 'historia', 'descubrimientos', 'Einstein', 'Newton', 'Darwin', 'Marie Curie', 'Galileo', 'física', 'química', 'biología'],
    difficulty: 'intermedio',
    icon: Microscope,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/salud/imc',
    isNew: true
  },
  {
    id: 'quiz-unidades-medida',
    title: 'Quiz sobre unidades de medida',
    label: 'Quiz sobre unidades de medida',
    description: 'Aprende sobre el Sistema Internacional de Unidades y los instrumentos de medición. Descubre las unidades básicas de longitud, masa, volumen y más.',
    href: '/trivias/quiz-unidades-medida',
    category: 'Ciencia',
    keywords: ['unidades', 'medida', 'Sistema Internacional', 'SI', 'metro', 'kilogramo', 'litro', 'instrumentos', 'medición', 'física', 'química'],
    difficulty: 'básico',
    icon: Ruler,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/salud/imc',
    isNew: true
  },
  {
    id: 'quiz-sobre-el-sol',
    title: 'Trivia sobre el Sol',
    label: 'Trivia sobre el Sol',
    description: 'Descubre los secretos de nuestra estrella más cercana. Aprende sobre la composición, temperatura, actividad solar y fenómenos que afectan la Tierra.',
    href: '/trivias/quiz-sobre-el-sol',
    category: 'Ciencia',
    keywords: ['sol', 'estrella', 'astronomía', 'física solar', 'energía solar', 'fusión nuclear', 'hidrógeno', 'helio', 'tormentas solares', 'sistema solar'],
    difficulty: 'intermedio',
    icon: Sun,
    totalQuestions: 10,
    timeLimit: 300, // 5 minutos
    relatedCalculator: '/salud/imc',
    isNew: true
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

export function getCienciaTriviasStats() {
  const cienciaTrivias = getTriviasByCategory('Ciencia')
  const totalQuestions = cienciaTrivias.reduce((sum, trivia) => sum + trivia.totalQuestions, 0)
  
  return {
    totalTrivias: cienciaTrivias.length,
    totalQuestions,
    hasNewTrivias: cienciaTrivias.some(trivia => trivia.isNew)
  }
}
