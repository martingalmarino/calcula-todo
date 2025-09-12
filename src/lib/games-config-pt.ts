import { Gamepad2, Target, TrendingUp, Grid3X3, Dice1, Brain, Map, ArrowUp, Hash, Zap, Percent, Shapes, Calculator, ArrowUpDown, MemoryStick, Plus, Search, Divide, Scale, LucideIcon } from 'lucide-react'

export interface GameConfigPT {
  title: string
  label: string
  description: string
  href: string
  category: string
  keywords: string[]
  icon: LucideIcon
  difficulty: 'iniciante' | 'intermediário' | 'avançado'
  timeRange: string
}

export const gamesConfigPT: GameConfigPT[] = [
  {
    title: 'Soma e Subtração contra Relógio',
    label: 'Soma e Subtração contra Relógio',
    description: 'Resolva operações de soma e subtração em 30 segundos. Demonstre sua velocidade mental!',
    href: '/pt/jogos-matematicos/soma-subtracao',
    category: 'Jogos Matemáticos',
    keywords: ['soma', 'subtração', 'cálculo mental', 'agilidade mental', 'matemática', 'prática', 'velocidade', 'adição'],
    icon: TrendingUp,
    difficulty: 'iniciante',
    timeRange: '30s'
  },
  {
    title: 'Encontre o Número Faltante',
    label: 'Encontre o Número Faltante',
    description: 'Complete as equações encontrando o número que falta. Teste sua lógica!',
    href: '/pt/jogos-matematicos/numero-faltante',
    category: 'Jogos Matemáticos',
    keywords: ['equações', 'números faltantes', 'lógica', 'álgebra básica'],
    icon: Target,
    difficulty: 'iniciante',
    timeRange: '30s'
  },
  {
    title: 'Quebra-cabeça de Frações',
    label: 'Quebra-cabeça de Frações',
    description: 'Identifique frações visuais com pizzas divididas. Aprenda frações de forma visual!',
    href: '/pt/jogos-matematicos/fracoes',
    category: 'Jogos Matemáticos',
    keywords: ['frações', 'visual', 'pizzas', 'matemáticas visuais'],
    icon: Gamepad2,
    difficulty: 'iniciante',
    timeRange: '30s'
  },
  {
    title: 'Desafio de Múltiplos e Divisores',
    label: 'Desafio de Múltiplos e Divisores',
    description: 'Identifique múltiplos e divisores rapidamente. Filtre números por suas propriedades!',
    href: '/pt/jogos-matematicos/multiplos-divisores',
    category: 'Jogos Matemáticos',
    keywords: ['múltiplos', 'divisores', 'números', 'propriedades', 'filtrado'],
    icon: Target,
    difficulty: 'intermediário',
    timeRange: '30s'
  },
  {
    title: 'Quebra-cabeça de Porcentagens',
    label: 'Quebra-cabeça de Porcentagens',
    description: 'Calcule descontos e aumentos com porcentagens. Domine os cálculos comerciais!',
    href: '/pt/jogos-matematicos/percentuais',
    category: 'Jogos Matemáticos',
    keywords: ['porcentagens', 'descontos', 'aumentos', 'cálculos comerciais'],
    icon: Percent,
    difficulty: 'intermediário',
    timeRange: '30s'
  },
  {
    title: 'Sequências Numéricas',
    label: 'Sequências Numéricas',
    description: 'Descubra o padrão e complete a sequência. Desenvolva seu pensamento lógico!',
    href: '/pt/jogos-matematicos/sequencias',
    category: 'Jogos Matemáticos',
    keywords: ['sequências', 'padrões', 'lógica', 'progressões', 'séries'],
    icon: TrendingUp,
    difficulty: 'intermediário',
    timeRange: '30s'
  },
  {
    title: 'Sudoku de Operações Matemáticas',
    label: 'Sudoku de Operações Matemáticas',
    description: 'Resolva grades onde cada linha e coluna deve somar o mesmo resultado. Desafie sua lógica matemática!',
    href: '/pt/jogos-matematicos/sudoku-operacoes',
    category: 'Jogos Matemáticos',
    keywords: ['sudoku', 'operações', 'grade', 'lógica matemática', 'somas'],
    icon: Grid3X3,
    difficulty: 'avançado',
    timeRange: '45s'
  },
  {
    title: 'Equações Express',
    label: 'Equações Express',
    description: 'Resolva equações de primeiro e segundo grau em tempo limitado. Desafie sua agilidade algébrica!',
    href: '/pt/jogos-matematicos/equacoes-express',
    category: 'Jogos Matemáticos',
    keywords: ['equações', 'álgebra', 'primeiro grau', 'segundo grau', 'avançado'],
    icon: Gamepad2,
    difficulty: 'avançado',
    timeRange: '60s'
  },
  {
    title: 'Jogo de Probabilidade',
    label: 'Jogo de Probabilidade',
    description: 'Calcule probabilidades com dados, cartas e moedas em tempo limitado. Desafie sua compreensão estatística!',
    href: '/pt/jogos-matematicos/probabilidade',
    category: 'Jogos Matemáticos',
    keywords: ['probabilidade', 'estatística', 'dados', 'cartas', 'moedas', 'avançado'],
    icon: Dice1,
    difficulty: 'avançado',
    timeRange: '45s'
  },
  {
    title: 'Raciocínio Lógico com Padrões',
    label: 'Raciocínio Lógico com Padrões',
    description: 'Descubra padrões matemáticos em sequências de símbolos e números. Desafie seu pensamento lógico e raciocínio abstrato!',
    href: '/pt/jogos-matematicos/raciocinio-logico',
    category: 'Jogos Matemáticos',
    keywords: ['padrões', 'lógica', 'sequências', 'raciocínio', 'símbolos', 'pensamento abstrato'],
    icon: Brain,
    difficulty: 'avançado',
    timeRange: '40s'
  },
  {
    title: 'O Labirinto Algébrico',
    label: 'O Labirinto Algébrico',
    description: 'Navegue por um labirinto resolvendo operações algébricas em cada passo. Desafie sua agilidade matemática e pensamento estratégico!',
    href: '/pt/jogos-matematicos/labirinto-algebrico',
    category: 'Jogos Matemáticos',
    keywords: ['labirinto', 'álgebra', 'operações', 'navegação', 'matemáticas', 'estratégia', 'pensamento lógico'],
    icon: Map,
    difficulty: 'avançado',
    timeRange: '50s'
  },
  {
    title: 'Maior ou Menor',
    label: 'Maior ou Menor',
    description: 'Compare números rapidamente e escolha qual é maior ou menor. Desafie sua agilidade mental e senso numérico!',
    href: '/pt/jogos-matematicos/maior-menor',
    category: 'Jogos Matemáticos',
    keywords: ['maior', 'menor', 'comparação', 'números', 'agilidade mental', 'senso numérico', 'decimais', 'frações'],
    icon: ArrowUp,
    difficulty: 'iniciante',
    timeRange: '30s'
  },
  {
    title: 'Par ou Ímpar Express',
    label: 'Par ou Ímpar Express',
    description: 'Classifique números como pares ou ímpares antes que o tempo termine. Desafie sua agilidade mental e reconhecimento numérico!',
    href: '/pt/jogos-matematicos/par-impar',
    category: 'Jogos Matemáticos',
    keywords: ['par', 'ímpar', 'números pares', 'números ímpares', 'classificação', 'agilidade mental', 'reconhecimento numérico', 'velocidade'],
    icon: Hash,
    difficulty: 'iniciante',
    timeRange: '30s'
  },
  {
    title: 'Quebra-cabeça Geométrico Simples',
    label: 'Quebra-cabeça Geométrico Simples',
    description: 'Calcule perímetros e áreas de figuras geométricas simples. Desafie seu conhecimento de geometria básica!',
    href: '/pt/jogos-matematicos/puzzle-geometrico',
    category: 'Jogos Matemáticos',
    keywords: ['geometria', 'perímetro', 'área', 'retângulo', 'quadrado', 'triângulo', 'figuras geométricas', 'matemáticas visuais'],
    icon: Shapes,
    difficulty: 'intermediário',
    timeRange: '45s'
  },
  {
    title: 'Calculadora Mental de Multiplicações',
    label: 'Calculadora Mental de Multiplicações',
    description: 'Pratique multiplicações de 2-3 dígitos em tempo limitado. Desafie sua agilidade mental e melhore seu cálculo mental!',
    href: '/pt/jogos-matematicos/multiplicacoes',
    category: 'Jogos Matemáticos',
    keywords: ['multiplicações', 'cálculo mental', 'agilidade mental', 'matemática', 'prática', 'velocidade', 'multiplicar'],
    icon: Calculator,
    difficulty: 'intermediário',
    timeRange: '45s'
  },
  {
    title: 'Ordene os Números',
    label: 'Ordene os Números',
    description: 'Ordene números em sequência crescente ou decrescente em tempo limitado. Desafie sua agilidade mental e senso numérico!',
    href: '/pt/jogos-matematicos/ordena-numeros',
    category: 'Jogos Matemáticos',
    keywords: ['ordenar números', 'sequências', 'crescente', 'decrescente', 'agilidade mental', 'senso numérico', 'ordenação'],
    icon: ArrowUpDown,
    difficulty: 'intermediário',
    timeRange: '40s'
  },
  {
    title: 'Memória Matemática',
    label: 'Memória Matemática',
    description: 'Lembre-se de sequências de operações matemáticas e repita-as corretamente. Desafie sua memória e concentração!',
    href: '/pt/jogos-matematicos/memoria-matematica',
    category: 'Jogos Matemáticos',
    keywords: ['memória matemática', 'sequências', 'operações', 'concentração', 'memória', 'treinamento mental', 'lembrar'],
    icon: MemoryStick,
    difficulty: 'intermediário',
    timeRange: '50s'
  },
  {
    title: 'Operações Mistas Rápidas',
    label: 'Operações Mistas Rápidas',
    description: 'Resolva operações mistas de soma, subtração, multiplicação e divisão em tempo limitado. Desafie sua agilidade mental!',
    href: '/pt/jogos-matematicos/operacoes-mistas',
    category: 'Jogos Matemáticos',
    keywords: ['operações mistas', 'soma', 'subtração', 'multiplicação', 'divisão', 'agilidade mental', 'cálculo mental', 'expressões'],
    icon: Plus,
    difficulty: 'intermediário',
    timeRange: '35s'
  },
  {
    title: 'Adivinhe o Resultado',
    label: 'Adivinhe o Resultado',
    description: 'Observe operações passo a passo e adivinhe o resultado final. Desafie sua capacidade de acompanhamento matemático!',
    href: '/pt/jogos-matematicos/adivinha-resultado',
    category: 'Jogos Matemáticos',
    keywords: ['adivinhe resultado', 'operações passo a passo', 'acompanhamento matemático', 'cálculo mental', 'agilidade mental', 'observação'],
    icon: Search,
    difficulty: 'intermediário',
    timeRange: '40s'
  },
  {
    title: 'Calculadora Mental de Divisões',
    label: 'Calculadora Mental de Divisões',
    description: 'Pratique divisões mentais em tempo limitado. Desafie sua agilidade mental e melhore seu cálculo mental!',
    href: '/pt/jogos-matematicos/divisoes',
    category: 'Jogos Matemáticos',
    keywords: ['divisões', 'cálculo mental', 'agilidade mental', 'matemática', 'prática', 'velocidade', 'dividir'],
    icon: Divide,
    difficulty: 'intermediário',
    timeRange: '50s'
  },
  {
    title: 'Comparação de Números',
    label: 'Comparação de Números',
    description: 'Compare números e determine qual é maior, menor ou igual. Desafie seu senso numérico e agilidade mental!',
    href: '/pt/jogos-matematicos/comparacao-numeros',
    category: 'Jogos Matemáticos',
    keywords: ['comparação de números', 'maior que', 'menor que', 'igual que', 'senso numérico', 'agilidade mental', 'comparar'],
    icon: Scale,
    difficulty: 'intermediário',
    timeRange: '45s'
  }
]

// Função para obter estatísticas dinâmicas
export const getGamesStatsPT = () => {
  const totalGames = gamesConfigPT.length
  const timeRanges = [...new Set(gamesConfigPT.map(game => game.timeRange))]
  const difficulties = [...new Set(gamesConfigPT.map(game => game.difficulty))]
  
  return {
    totalGames,
    timeRanges,
    difficulties,
    timeRangeDisplay: '30s-60s',
    gamesByDifficulty: {
      iniciante: gamesConfigPT.filter(game => game.difficulty === 'iniciante').length,
      intermediário: gamesConfigPT.filter(game => game.difficulty === 'intermediário').length,
      avançado: gamesConfigPT.filter(game => game.difficulty === 'avançado').length
    }
  }
}

// Função para obter jogos relacionados (excluindo o jogo atual)
export const getRelatedGamesPT = (currentGameHref: string, count: number = 2): GameConfigPT[] => {
  const otherGames = gamesConfigPT.filter(game => game.href !== currentGameHref)
  const shuffled = otherGames.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
