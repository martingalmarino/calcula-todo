import { Gamepad2, Target, TrendingUp, Grid3X3, Dice1, Brain, Map, ArrowUp, Hash, Zap, Percent, Shapes, Calculator, ArrowUpDown, MemoryStick, Plus, Search, Divide, Scale, LucideIcon } from 'lucide-react'

export interface GameConfigIT {
  title: string
  label: string
  description: string
  href: string
  category: string
  keywords: string[]
  icon: LucideIcon
  difficulty: 'facile' | 'intermedio' | 'avanzato'
  timeRange: string
}

export const gamesConfigIT: GameConfigIT[] = [
  {
    title: 'Somme e Sottrazioni',
    label: 'Somme e Sottrazioni',
    description: 'Pratica somme e sottrazioni contro il tempo. Sfida la tua agilità mentale e migliora il calcolo mentale!',
    href: '/it/giochi-matematici/somme-sottrazioni',
    category: 'Giochi Matematici',
    keywords: ['somme', 'sottrazioni', 'calcolo mentale', 'agilità mentale', 'matematica', 'pratica', 'velocità', 'addizione'],
    icon: TrendingUp,
    difficulty: 'facile',
    timeRange: '30s'
  },
  {
    title: 'Trova il Numero Mancante',
    label: 'Trova il Numero Mancante',
    description: 'Trova il numero mancante nelle sequenze matematiche. Sfida la tua logica e capacità di ragionamento!',
    href: '/it/giochi-matematici/numero-mancante',
    category: 'Giochi Matematici',
    keywords: ['numero mancante', 'sequenze', 'logica', 'ragionamento', 'pattern', 'matematica', 'indovinare'],
    icon: Hash,
    difficulty: 'intermedio',
    timeRange: '35s'
  },
  {
    title: 'Puzzle delle Frazioni',
    label: 'Puzzle delle Frazioni',
    description: 'Risolvi puzzle visivi con frazioni. Sfida la tua comprensione delle frazioni e migliora le tue abilità matematiche!',
    href: '/it/giochi-matematici/frazioni',
    category: 'Giochi Matematici',
    keywords: ['frazioni', 'puzzle', 'visivo', 'comprensione', 'matematica', 'risolvere', 'abilità'],
    icon: Percent,
    difficulty: 'intermedio',
    timeRange: '40s'
  },
  {
    title: 'Maggiore o Minore',
    label: 'Maggiore o Minore',
    description: 'Confronta numeri e determina quale è maggiore o minore. Sfida il tuo senso numerico e agilità mentale!',
    href: '/it/giochi-matematici/maggiore-minore',
    category: 'Giochi Matematici',
    keywords: ['maggiore', 'minore', 'confronto', 'numeri', 'senso numerico', 'agilità mentale', 'confrontare'],
    icon: ArrowUp,
    difficulty: 'facile',
    timeRange: '30s'
  },
  {
    title: 'Pari o Dispari Express',
    label: 'Pari o Dispari Express',
    description: 'Identifica rapidamente se i numeri sono pari o dispari. Sfida la tua velocità di riconoscimento numerico!',
    href: '/it/giochi-matematici/pari-dispari',
    category: 'Giochi Matematici',
    keywords: ['pari', 'dispari', 'numeri', 'velocità', 'riconoscimento', 'identificare', 'rapido'],
    icon: Zap,
    difficulty: 'facile',
    timeRange: '30s'
  },
  {
    title: 'Sfida Multipli e Divisori',
    label: 'Sfida Multipli e Divisori',
    description: 'Identifica multipli e divisori in tempo limitato. Sfida la tua comprensione dei numeri e delle loro relazioni!',
    href: '/it/giochi-matematici/multipli-divisori',
    category: 'Giochi Matematici',
    keywords: ['multipli', 'divisori', 'numeri', 'relazioni', 'comprensione', 'identificare', 'sfida'],
    icon: Target,
    difficulty: 'intermedio',
    timeRange: '45s'
  },
  {
    title: 'Puzzle delle Percentuali',
    label: 'Puzzle delle Percentuali',
    description: 'Risolvi puzzle con percentuali e calcoli percentuali. Sfida la tua comprensione delle percentuali!',
    href: '/it/giochi-matematici/percentuali',
    category: 'Giochi Matematici',
    keywords: ['percentuali', 'puzzle', 'calcoli', 'comprensione', 'risolvere', 'matematica', 'percentuale'],
    icon: Percent,
    difficulty: 'intermedio',
    timeRange: '40s'
  },
  {
    title: 'Sequenze Numeriche',
    label: 'Sequenze Numeriche',
    description: 'Completa sequenze numeriche e trova il pattern. Sfida la tua logica e capacità di riconoscimento dei pattern!',
    href: '/it/giochi-matematici/sequenze',
    category: 'Giochi Matematici',
    keywords: ['sequenze', 'numeriche', 'pattern', 'logica', 'completare', 'riconoscimento', 'sequenza'],
    icon: ArrowUpDown,
    difficulty: 'intermedio',
    timeRange: '45s'
  },
  {
    title: 'Sudoku delle Operazioni',
    label: 'Sudoku delle Operazioni',
    description: 'Risolvi sudoku matematici con operazioni. Sfida la tua logica e capacità di risoluzione dei problemi!',
    href: '/it/giochi-matematici/sudoku-operazioni',
    category: 'Giochi Matematici',
    keywords: ['sudoku', 'operazioni', 'logica', 'risoluzione', 'problemi', 'matematica', 'puzzle'],
    icon: Grid3X3,
    difficulty: 'avanzato',
    timeRange: '60s'
  },
  {
    title: 'Equazioni Express',
    label: 'Equazioni Express',
    description: 'Risolvi equazioni semplici in tempo limitato. Sfida la tua comprensione dell\'algebra di base!',
    href: '/it/giochi-matematici/equazioni-express',
    category: 'Giochi Matematici',
    keywords: ['equazioni', 'algebra', 'risolvere', 'tempo limitato', 'comprensione', 'base', 'express'],
    icon: Brain,
    difficulty: 'avanzato',
    timeRange: '50s'
  },
  {
    title: 'Ragionamento Logico con Modelli',
    label: 'Ragionamento Logico con Modelli',
    description: 'Risolvi problemi di ragionamento logico con pattern e modelli. Sfida la tua capacità di pensiero logico!',
    href: '/it/giochi-matematici/ragionamento-logico',
    category: 'Giochi Matematici',
    keywords: ['ragionamento', 'logico', 'modelli', 'pattern', 'pensiero', 'risolvere', 'problemi'],
    icon: Brain,
    difficulty: 'avanzato',
    timeRange: '55s'
  },
  {
    title: 'Gioco di Probabilità',
    label: 'Gioco di Probabilità',
    description: 'Risolvi problemi di probabilità e calcoli probabilistici. Sfida la tua comprensione della probabilità!',
    href: '/it/giochi-matematici/probabilita',
    category: 'Giochi Matematici',
    keywords: ['probabilità', 'calcoli', 'probabilistici', 'comprensione', 'risolvere', 'problemi', 'statistica'],
    icon: Dice1,
    difficulty: 'avanzato',
    timeRange: '50s'
  },
  {
    title: 'Il Labirinto Algebrico',
    label: 'Il Labirinto Algebrico',
    description: 'Naviga attraverso un labirinto risolvendo equazioni algebriche. Sfida la tua comprensione dell\'algebra!',
    href: '/it/giochi-matematici/labirinto-algebrico',
    category: 'Giochi Matematici',
    keywords: ['labirinto', 'algebrico', 'equazioni', 'navigare', 'algebra', 'comprensione', 'risolvere'],
    icon: Map,
    difficulty: 'avanzato',
    timeRange: '60s'
  },
  {
    title: 'Puzzle Geometrico',
    label: 'Puzzle Geometrico',
    description: 'Risolvi puzzle geometrici e problemi di forme. Sfida la tua comprensione della geometria!',
    href: '/it/giochi-matematici/puzzle-geometrico',
    category: 'Giochi Matematici',
    keywords: ['puzzle', 'geometrico', 'forme', 'geometria', 'comprensione', 'risolvere', 'problemi'],
    icon: Shapes,
    difficulty: 'intermedio',
    timeRange: '45s'
  },
  {
    title: 'Calcolatrice Mentale delle Moltiplicazioni',
    label: 'Calcolatrice Mentale delle Moltiplicazioni',
    description: 'Pratica moltiplicazioni di 2-3 cifre in tempo limitato. Sfida la tua agilità mentale e migliora il calcolo mentale!',
    href: '/it/giochi-matematici/moltiplicazioni',
    category: 'Giochi Matematici',
    keywords: ['moltiplicazioni', 'calcolo mentale', 'agilità mentale', 'matematica', 'pratica', 'velocità', 'moltiplicare'],
    icon: Calculator,
    difficulty: 'intermedio',
    timeRange: '45s'
  },
  {
    title: 'Ordina i Numeri',
    label: 'Ordina i Numeri',
    description: 'Ordina numeri in sequenza crescente o decrescente in tempo limitato. Sfida la tua agilità mentale e senso numerico!',
    href: '/it/giochi-matematici/ordina-numeri',
    category: 'Giochi Matematici',
    keywords: ['ordinare', 'numeri', 'sequenze', 'crescente', 'decrescente', 'agilità mentale', 'senso numerico', 'ordinamento'],
    icon: ArrowUpDown,
    difficulty: 'intermedio',
    timeRange: '40s'
  },
  {
    title: 'Memoria Matematica',
    label: 'Memoria Matematica',
    description: 'Ricorda sequenze di operazioni matematiche e ripetile correttamente. Sfida la tua memoria e concentrazione!',
    href: '/it/giochi-matematici/memoria-matematica',
    category: 'Giochi Matematici',
    keywords: ['memoria', 'matematica', 'sequenze', 'operazioni', 'concentrazione', 'memoria', 'allenamento mentale', 'ricordare'],
    icon: MemoryStick,
    difficulty: 'intermedio',
    timeRange: '50s'
  },
  {
    title: 'Operazioni Miste Rapide',
    label: 'Operazioni Miste Rapide',
    description: 'Risolvi operazioni miste di somma, sottrazione, moltiplicazione e divisione in tempo limitato. Sfida la tua agilità mentale!',
    href: '/it/giochi-matematici/operazioni-miste',
    category: 'Giochi Matematici',
    keywords: ['operazioni', 'miste', 'somma', 'sottrazione', 'moltiplicazione', 'divisione', 'agilità mentale', 'calcolo mentale', 'espressioni'],
    icon: Plus,
    difficulty: 'intermedio',
    timeRange: '35s'
  },
  {
    title: 'Indovina il Risultato',
    label: 'Indovina il Risultato',
    description: 'Osserva operazioni passo dopo passo e indovina il risultato finale. Sfida la tua capacità di seguimento matematico!',
    href: '/it/giochi-matematici/indovina-risultato',
    category: 'Giochi Matematici',
    keywords: ['indovina', 'risultato', 'operazioni', 'passo dopo passo', 'seguimento matematico', 'calcolo mentale', 'agilità mentale', 'osservazione'],
    icon: Search,
    difficulty: 'intermedio',
    timeRange: '40s'
  },
  {
    title: 'Calcolatrice Mentale delle Divisioni',
    label: 'Calcolatrice Mentale delle Divisioni',
    description: 'Pratica divisioni mentali in tempo limitato. Sfida la tua agilità mentale e migliora il calcolo mentale!',
    href: '/it/giochi-matematici/divisioni',
    category: 'Giochi Matematici',
    keywords: ['divisioni', 'calcolo mentale', 'agilità mentale', 'matematica', 'pratica', 'velocità', 'dividere'],
    icon: Divide,
    difficulty: 'intermedio',
    timeRange: '50s'
  },
  {
    title: 'Confronto dei Numeri',
    label: 'Confronto dei Numeri',
    description: 'Confronta numeri e determina quale è maggiore, minore o uguale. Sfida il tuo senso numerico e agilità mentale!',
    href: '/it/giochi-matematici/confronto-numeri',
    category: 'Giochi Matematici',
    keywords: ['confronto', 'numeri', 'maggiore', 'minore', 'uguale', 'senso numerico', 'agilità mentale', 'confrontare'],
    icon: Scale,
    difficulty: 'intermedio',
    timeRange: '45s'
  }
]

// Funzione per ottenere statistiche dinamiche
export const getGamesStatsIT = () => {
  const totalGames = gamesConfigIT.length
  const timeRanges = [...new Set(gamesConfigIT.map(game => game.timeRange))]
  const difficulties = [...new Set(gamesConfigIT.map(game => game.difficulty))]
  
  return {
    totalGames,
    timeRanges,
    difficulties,
    timeRangeDisplay: '30s-60s',
    gamesByDifficulty: {
      facile: gamesConfigIT.filter(game => game.difficulty === 'facile').length,
      intermedio: gamesConfigIT.filter(game => game.difficulty === 'intermedio').length,
      avanzato: gamesConfigIT.filter(game => game.difficulty === 'avanzato').length
    }
  }
}

// Funzione per ottenere giochi correlati (escludendo il gioco corrente)
export const getRelatedGamesIT = (currentGameHref: string, count: number = 2): GameConfigIT[] => {
  const otherGames = gamesConfigIT.filter(game => game.href !== currentGameHref)
  const shuffled = otherGames.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
