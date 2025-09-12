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

export interface TriviaConfigIT {
  id: string
  title: string
  label: string
  description: string
  href: string
  category: string
  keywords: string[]
  difficulty: 'base' | 'intermedio' | 'avanzato'
  icon: LucideIcon
  totalQuestions: number
  timeLimit: number
  relatedCalculator?: string
  isNew?: boolean
}

export const triviasConfigIT: TriviaConfigIT[] = [
  {
    id: 'quiz-imc-abitudini',
    title: 'Quiz su IMC e Abitudini Sane',
    label: 'Quiz su IMC e Abitudini Sane',
    description: 'Metti alla prova le tue conoscenze su salute corporea, IMC e abitudini sane. Impara divertendoti.',
    href: '/it/trivias/quiz-imc-abitudini',
    category: 'Salute',
    keywords: ['quiz salute', 'IMC', 'abitudini sane', 'salute corporea', 'benessere'],
    difficulty: 'base',
    icon: Heart,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/salute/imc'
  },
  {
    id: 'miti-salute',
    title: 'Gioco sui Miti della Salute',
    label: 'Gioco sui Miti della Salute',
    description: 'Smonta le credenze comuni sulla salute in modo ludico. Sai distinguere tra miti e realtà?',
    href: '/it/trivias/miti-salute',
    category: 'Salute',
    keywords: ['miti salute', 'credenze', 'vero falso', 'nutrizione', 'benessere', 'smentire'],
    difficulty: 'intermedio',
    icon: Shield,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/salute/imc'
  },
  {
    id: 'nutrizione-calorie',
    title: 'Trivia sulla Nutrizione Base',
    label: 'Trivia sulla Nutrizione Base',
    description: 'Indovina le calorie di diversi alimenti e impara sulla nutrizione. Include confronti visivi e modalità battaglia.',
    href: '/it/trivias/nutrizione-calorie',
    category: 'Salute',
    keywords: ['nutrizione', 'calorie', 'alimenti', 'dieta', 'salute', 'confronti'],
    difficulty: 'intermedio',
    icon: Apple,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/salute/calorie'
  },
  {
    id: 'dormire-abbastanza',
    title: 'Dormi abbastanza?',
    label: 'Dormi abbastanza?',
    description: 'Metti alla prova le tue conoscenze sul sonno e le abitudini sane. Impara quante ore hai bisogno di dormire secondo la tua età.',
    href: '/it/trivias/dormire-abbastanza',
    category: 'Salute',
    keywords: ['sonno', 'dormire', 'abitudini sane', 'insonnia', 'salute mentale', 'riposo'],
    difficulty: 'base',
    icon: Moon,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/salute/sonno'
  },
  {
    id: 'esercizio-fisico-oms',
    title: 'Esercizio Fisico Minimo Raccomandato (OMS)',
    label: 'Esercizio Fisico Minimo Raccomandato (OMS)',
    description: 'Impara le raccomandazioni ufficiali dell\'OMS sull\'attività fisica. Scopri quanto esercizio hai bisogno per rimanere sano.',
    href: '/it/trivias/esercizio-fisico-oms',
    category: 'Salute',
    keywords: ['esercizio', 'attività fisica', 'OMS', 'salute', 'sport', 'fitness', 'raccomandazioni'],
    difficulty: 'base',
    icon: Activity,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/salute/calorie'
  },
  {
    id: 'tempo-seduto-sedentarieta',
    title: 'Quanto tempo passi seduto? (Sedentarietà)',
    label: 'Quanto tempo passi seduto? (Sedentarietà)',
    description: 'Scopri i rischi della sedentarietà e impara come combattere gli effetti di stare seduto troppo tempo. Conosci le raccomandazioni per uno stile di vita più attivo.',
    href: '/it/trivias/tempo-seduto-sedentarieta',
    category: 'Salute',
    keywords: ['sedentarietà', 'tempo seduto', 'salute', 'pause attive', 'stile di vita', 'lavoro', 'ufficio'],
    difficulty: 'base',
    icon: Monitor,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/salute/calorie'
  },
  {
    id: 'password-sicure',
    title: 'Quiz sulle Password Sicure',
    label: 'Quiz sulle Password Sicure',
    description: 'Impara sulla cybersicurezza e le buone pratiche per creare password sicure. Scopri come proteggere i tuoi account digitali in modo efficace.',
    href: '/it/trivias/password-sicure',
    category: 'Tecnologia',
    keywords: ['password', 'sicurezza', 'cybersicurezza', 'protezione', 'account', 'digitale', 'privacy'],
    difficulty: 'base',
    icon: Lock,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/tecnologia/analisi-password'
  },
  {
    id: 'trivia-internet',
    title: 'Trivia su Internet',
    label: 'Trivia su Internet',
    description: 'Metti alla prova le tue conoscenze su internet, reti e tecnologia. Impara concetti base di connettività, protocolli e velocità internet.',
    href: '/it/trivias/trivia-internet',
    category: 'Tecnologia',
    keywords: ['internet', 'reti', 'velocità', 'protocolli', 'connettività', 'tecnologia', 'banda larga'],
    difficulty: 'base',
    icon: Wifi,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/tecnologia/velocita-download'
  },
  {
    id: 'indovina-colore-hex-rgb',
    title: 'Indovina il Colore (HEX ↔ RGB)',
    label: 'Indovina il Colore (HEX ↔ RGB)',
    description: 'Metti alla prova le tue conoscenze sui codici colore. Impara a convertire tra codici esadecimali (HEX) e valori RGB in modo divertente.',
    href: '/it/trivias/indovina-colore-hex-rgb',
    category: 'Tecnologia',
    keywords: ['colori', 'hex', 'rgb', 'conversione', 'codici', 'design', 'web', 'palette'],
    difficulty: 'intermedio',
    icon: Palette,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/tecnologia/conversione-colori'
  },
  {
    id: 'trivia-riciclaggio-contenitori',
    title: 'Trivia sul Riciclaggio: Cosa va in ogni contenitore?',
    label: 'Trivia sul Riciclaggio: Cosa va in ogni contenitore?',
    description: 'Impara sulla corretta classificazione dei rifiuti e riciclaggio. Scopri cosa va in ogni contenitore per prenderti cura dell\'ambiente.',
    href: '/it/trivias/trivia-riciclaggio-contenitori',
    category: 'Ambiente',
    keywords: ['riciclaggio', 'rifiuti', 'contenitori', 'ambiente', 'sostenibilità', 'ecologia', 'separazione'],
    difficulty: 'base',
    icon: Recycle,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/altre/calcolatrice-mance'
  },
  {
    id: 'quiz-impronta-carbonio',
    title: 'Quiz sull\'Impronta di Carbonio',
    label: 'Quiz sull\'Impronta di Carbonio',
    description: 'Scopri come le tue azioni quotidiane impattano l\'ambiente. Impara su emissioni di CO₂, trasporto sostenibile e abitudini eco-friendly.',
    href: '/it/trivias/quiz-impronta-carbonio',
    category: 'Ambiente',
    keywords: ['impronta carbonio', 'CO2', 'emissioni', 'sostenibilità', 'ambiente', 'trasporto', 'dieta', 'energia'],
    difficulty: 'intermedio',
    icon: Leaf,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/altre/calcolatrice-mance',
    isNew: true
  },
  {
    id: 'gioco-consumo-elettrico',
    title: 'Gioco sul Consumo Elettrico',
    label: 'Gioco sul Consumo Elettrico',
    description: 'Impara sull\'efficienza energetica e consumo elettrico in casa. Scopri quali elettrodomestici consumano più energia e come risparmiare in bolletta.',
    href: '/it/trivias/gioco-consumo-elettrico',
    category: 'Ambiente',
    keywords: ['consumo elettrico', 'efficienza energetica', 'elettrodomestici', 'risparmio energetico', 'bolletta luce', 'sostenibilità', 'energia'],
    difficulty: 'base',
    icon: Lightbulb,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/altre/calcolatrice-mance',
    isNew: true
  },
  {
    id: 'quiz-monete-tipi-cambio',
    title: 'Quiz su Monete e Tipi di Cambio',
    label: 'Quiz su Monete e Tipi di Cambio',
    description: 'Impara sulle monete ufficiali di diversi paesi del mondo. Scopri quali paesi usano quali monete e espandi le tue conoscenze geografiche.',
    href: '/it/trivias/quiz-monete-tipi-cambio',
    category: 'Finanze',
    keywords: ['monete', 'tipi cambio', 'geografia', 'paesi', 'economia', 'valute', 'finanze internazionali'],
    difficulty: 'base',
    icon: Coins,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/finanze/conversione-monete',
    isNew: true
  },
  {
    id: 'quiz-crisi-finanziarie',
    title: 'Quiz sulle Crisi Finanziarie',
    label: 'Quiz sulle Crisi Finanziarie',
    description: 'Impara sulle crisi finanziarie più importanti della storia. Scopri cosa ha causato ogni crisi, quando sono avvenute e le loro conseguenze globali.',
    href: '/it/trivias/quiz-crisi-finanziarie',
    category: 'Finanze',
    keywords: ['crisi finanziarie', 'storia economica', 'Grande Depressione', 'crisi 2008', 'economia mondiale', 'bolle finanziarie', 'recessioni'],
    difficulty: 'intermedio',
    icon: TrendingDown,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/finanze/conversione-monete',
    isNew: true
  },
  {
    id: 'quiz-ossa-corpo-umano',
    title: 'Quiz sulle ossa del corpo umano',
    label: 'Quiz sulle ossa del corpo umano',
    description: 'Impara sull\'anatomia ossea del corpo umano. Scopri quante ossa abbiamo, quali sono le più lunghe e piccole, e le loro funzioni principali.',
    href: '/it/trivias/quiz-ossa-corpo-umano',
    category: 'Scienza',
    keywords: ['ossa', 'anatomia', 'corpo umano', 'scheletro', 'femore', 'cranio', 'colonna vertebrale', 'biologia'],
    difficulty: 'base',
    icon: Bone,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/salute/imc',
    isNew: true
  },
  {
    id: 'quiz-grandi-scienziati',
    title: 'Quiz sui grandi scienziati',
    label: 'Quiz sui grandi scienziati',
    description: 'Scopri gli scienziati più importanti della storia. Impara sui loro scoperte, teorie e contributi che hanno cambiato il mondo della scienza.',
    href: '/it/trivias/quiz-grandi-scienziati',
    category: 'Scienza',
    keywords: ['scienziati', 'storia', 'scoperte', 'Einstein', 'Newton', 'Darwin', 'Marie Curie', 'Galileo', 'fisica', 'chimica', 'biologia'],
    difficulty: 'intermedio',
    icon: Microscope,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/salute/imc',
    isNew: true
  },
  {
    id: 'quiz-unita-misura',
    title: 'Quiz sulle unità di misura',
    label: 'Quiz sulle unità di misura',
    description: 'Impara sul Sistema Internazionale di Unità e gli strumenti di misurazione. Scopri le unità base di lunghezza, massa, volume e altro.',
    href: '/it/trivias/quiz-unita-misura',
    category: 'Scienza',
    keywords: ['unità', 'misura', 'Sistema Internazionale', 'SI', 'metro', 'chilogrammo', 'litro', 'strumenti', 'misurazione', 'fisica', 'chimica'],
    difficulty: 'base',
    icon: Ruler,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/salute/imc',
    isNew: true
  },
  {
    id: 'trivia-sul-sole',
    title: 'Trivia sul Sole',
    label: 'Trivia sul Sole',
    description: 'Scopri i segreti della nostra stella più vicina. Impara sulla composizione, temperatura, attività solare e fenomeni che influenzano la Terra.',
    href: '/it/trivias/trivia-sul-sole',
    category: 'Scienza',
    keywords: ['sole', 'stella', 'astronomia', 'fisica solare', 'energia solare', 'fusione nucleare', 'idrogeno', 'elio', 'tempeste solari', 'sistema solare'],
    difficulty: 'intermedio',
    icon: Sun,
    totalQuestions: 10,
    timeLimit: 300, // 5 minuti
    relatedCalculator: '/it/salute/imc',
    isNew: true
  }
]

export function getTriviasStatsIT() {
  const totalTrivias = triviasConfigIT.length
  const totalQuestions = triviasConfigIT.reduce((sum, trivia) => sum + trivia.totalQuestions, 0)
  const categories = [...new Set(triviasConfigIT.map(trivia => trivia.category))]
  
  // Calcolare rango di tempo dinamicamente
  const timeLimits = triviasConfigIT.map(trivia => trivia.timeLimit)
  const minTime = Math.min(...timeLimits) / 60
  const maxTime = Math.max(...timeLimits) / 60
  const timeRangeDisplay = minTime === maxTime 
    ? `${minTime} min` 
    : `${minTime}-${maxTime} min`
  
  // Calcolare difficoltà disponibili
  const difficulties = [...new Set(triviasConfigIT.map(trivia => trivia.difficulty))]
  
  return {
    totalTrivias,
    totalQuestions,
    timeRangeDisplay,
    categories,
    difficulties,
    avgQuestionsPerTrivia: Math.round(totalQuestions / totalTrivias)
  }
}

export function getRelatedTriviasIT(currentTriviaId: string, limit: number = 2): TriviaConfigIT[] {
  return triviasConfigIT
    .filter(trivia => trivia.id !== currentTriviaId)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit)
}

export function getTriviasByCategoryIT(category: string): TriviaConfigIT[] {
  return triviasConfigIT.filter(trivia => trivia.category === category)
}

export function getTriviasByDifficultyIT(difficulty: 'base' | 'intermedio' | 'avanzato'): TriviaConfigIT[] {
  return triviasConfigIT.filter(trivia => trivia.difficulty === difficulty)
}

export function getTriviaByIdIT(id: string): TriviaConfigIT | undefined {
  return triviasConfigIT.find(trivia => trivia.id === id)
}

export function getScienzaTriviasStatsIT() {
  const scienzaTrivias = getTriviasByCategoryIT('Scienza')
  const totalQuestions = scienzaTrivias.reduce((sum, trivia) => sum + trivia.totalQuestions, 0)
  
  return {
    totalTrivias: scienzaTrivias.length,
    totalQuestions,
    hasNewTrivias: scienzaTrivias.some(trivia => trivia.isNew)
  }
}
