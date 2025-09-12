/**
 * Configuración específica para el sitio web en italiano
 */

import { SiteConfig } from './site.config'

export const SITE_IT: SiteConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online',
  name: 'CalculaTutto.online',
  description: 'Calcolatrici matematiche online gratuite: frazioni, percentuali, algebra, trigonometria e altro. Risultati rapidi e spiegati passo dopo passo.',
  nav: [
    { label: 'Inizio', href: '/it' },
    { label: 'Matematica', href: '/it/matematicas/' },
    { label: 'Finanze', href: '/it/finanze/' },
    { label: 'Salute', href: '/it/salute/' },
    { label: 'Geometria', href: '/it/geometria/' },
    { label: 'Marketing', href: '/it/marketing/' },
    { label: 'Tecnologia', href: '/it/tecnologia/' },
    { label: 'Calendario', href: '/it/calendario/' },
    { label: 'Curiose', href: '/it/curiosas/' },
    { label: 'Altre', href: '/it/altre/' },
    { label: 'Giochi', href: '/it/giochi-matematici/' },
    { label: 'Quiz', href: '/it/trivias/' }
  ],
  clusters: {
    matematicas: {
      label: 'Matematica',
      href: '/it/matematicas/',
      description: 'Calcolatrici matematiche per risolvere operazioni di frazioni, percentuali, algebra, trigonometria, calcolo e altro.',
      calculators: [
        {
          label: 'Frazioni',
          href: '/it/matematicas/frazioni/',
          description: 'Semplificare, convertire, sommare, sottrarre, moltiplicare e dividere frazioni',
          icon: 'fraction',
          category: 'aritmetica',
          keywords: ['frazioni', 'semplificare', 'sommare', 'sottrarre', 'moltiplicare', 'dividere', 'decimale']
        },
        {
          label: 'Percentuali',
          href: '/it/matematicas/percentuali/',
          description: 'Calcolare percentuali, sconti, aumenti e variazioni percentuali',
          icon: 'percentage',
          category: 'aritmetica',
          keywords: ['percentuali', 'sconti', 'aumenti', 'variazione', 'proporzione']
        },
        {
          label: 'Potenze e Radici',
          href: '/it/matematicas/potenze-e-radici/',
          description: 'Calcolare potenze, radici quadrate, cubiche e n-esime',
          icon: 'power',
          category: 'algebra',
          keywords: ['potenze', 'radici', 'quadrate', 'cubiche', 'esponenti']
        },
        {
          label: 'Algebra',
          href: '/it/matematicas/algebra/',
          description: 'Risolvere equazioni, sistemi e operazioni algebriche',
          icon: 'algebra',
          category: 'algebra',
          keywords: ['algebra', 'equazioni', 'sistemi', 'variabili', 'incognite']
        },
        {
          label: 'Trigonometria',
          href: '/it/matematicas/trigonometria/',
          description: 'Calcoli trigonometrici: seno, coseno, tangente e funzioni inverse',
          icon: 'trigonometry',
          category: 'geometria',
          keywords: ['trigonometria', 'seno', 'coseno', 'tangente', 'angoli', 'triangoli']
        },
        {
          label: 'Derivate',
          href: '/it/matematicas/derivate/',
          description: 'Calcolare derivate di funzioni matematiche',
          icon: 'derivative',
          category: 'calcolo',
          keywords: ['derivate', 'calcolo', 'funzioni', 'limiti', 'continuità']
        }
      ]
    },
    finanze: {
      label: 'Finanze',
      href: '/it/finanze/',
      description: 'Calcolatrici finanziarie per investimenti, prestiti, mutui, risparmio e analisi economica.',
      calculators: [
        {
          label: 'Interesse Semplice',
          href: '/it/finanze/interesse-semplice/',
          description: 'Calcolare interessi semplici su investimenti e prestiti',
          icon: 'interest',
          category: 'investimenti',
          keywords: ['interesse', 'semplice', 'investimenti', 'prestiti', 'capitale']
        },
        {
          label: 'Calcolatrice di Mutuo',
          href: '/it/finanze/calcolatrice-mutuo/',
          description: 'Calcolare rate mensili, interessi totali e ammortamento del mutuo',
          icon: 'mortgage',
          category: 'prestiti',
          keywords: ['mutuo', 'rate', 'ammortamento', 'casa', 'immobiliare']
        },
        {
          label: 'Deprezzamento Veicoli',
          href: '/it/finanze/deprezzamento-veicoli/',
          description: 'Calcolare la perdita di valore di auto e veicoli nel tempo',
          icon: 'depreciation',
          category: 'investimenti',
          keywords: ['deprezzamento', 'auto', 'veicoli', 'valore', 'perdita']
        },
        {
          label: 'Calcolatrice dell\'IPC',
          href: '/it/finanze/calcolatrice-ipc/',
          description: 'Calcolare l\'inflazione e l\'indice dei prezzi al consumo',
          icon: 'inflation',
          category: 'economia',
          keywords: ['inflazione', 'ipc', 'prezzi', 'consumo', 'economia']
        },
        {
          label: 'Risparmio Obiettivo',
          href: '/it/finanze/risparmio-obiettivo/',
          description: 'Pianificare il risparmio per raggiungere obiettivi finanziari',
          icon: 'savings',
          category: 'risparmio',
          keywords: ['risparmio', 'obiettivo', 'pianificazione', 'budget', 'mete']
        },
        {
          label: 'Valore Futuro e Presente',
          href: '/it/finanze/valore-futuro-presente/',
          description: 'Calcolare il valore attuale e futuro degli investimenti',
          icon: 'future-value',
          category: 'investimenti',
          keywords: ['valore', 'futuro', 'presente', 'investimenti', 'sconto']
        }
      ]
    },
    salute: {
      label: 'Salute',
      href: '/it/salute/',
      description: 'Calcolatrici per la salute: IMC, metabolismo, idratazione, ovulazione e benessere fisico.',
      calculators: [
        {
          label: 'Indice di Massa Corporea (IMC)',
          href: '/it/salute/imc/',
          description: 'Calcolare l\'indice di massa corporea per valutare il peso ideale',
          icon: 'bmi',
          category: 'peso',
          keywords: ['imc', 'peso', 'altezza', 'massa', 'corporea', 'ideale']
        },
        {
          label: 'Tasso Metabolico Basale (TMB)',
          href: '/it/salute/tmb/',
          description: 'Calcolare il metabolismo basale e il fabbisogno calorico giornaliero',
          icon: 'metabolism',
          category: 'metabolismo',
          keywords: ['tmb', 'metabolismo', 'basale', 'calorie', 'fabbisogno']
        },
        {
          label: 'Percentuale di Grasso Corporeo',
          href: '/it/salute/grasso-corporeo/',
          description: 'Stimare la percentuale di grasso corporeo con diversi metodi',
          icon: 'body-fat',
          category: 'composizione',
          keywords: ['grasso', 'corporeo', 'percentuale', 'composizione', 'corpo']
        },
        {
          label: 'Calcolatrice PaFi',
          href: '/it/salute/pafi/',
          description: 'Calcolare l\'indice PaFi per valutare la funzione polmonare',
          icon: 'lungs',
          category: 'respiratorio',
          keywords: ['pafi', 'polmoni', 'respirazione', 'ossigeno', 'funzione']
        },
        {
          label: 'Acqua Giornaliera Raccomandata',
          href: '/it/salute/acqua-giornaliera/',
          description: 'Calcolare la quantità di acqua da bere ogni giorno',
          icon: 'water',
          category: 'idratazione',
          keywords: ['acqua', 'idratazione', 'giornaliera', 'bere', 'salute']
        },
        {
          label: 'Calcolatrice di Ovulazione',
          href: '/it/salute/ovulazione/',
          description: 'Calcolare i giorni fertili e il periodo di ovulazione',
          icon: 'ovulation',
          category: 'riproduttivo',
          keywords: ['ovulazione', 'fertilità', 'ciclo', 'mestruale', 'gravidanza']
        }
      ]
    },
    geometria: {
      label: 'Geometria',
      href: '/it/geometria/',
      description: 'Calcolatrici geometriche per aree, perimetri, volumi e proprietà delle figure geometriche.',
      calculators: [
        {
          label: 'Area e Perimetro del Cerchio',
          href: '/it/geometria/cerchio/',
          description: 'Calcolare area, perimetro e proprietà del cerchio',
          icon: 'circle',
          category: 'figure piane',
          keywords: ['cerchio', 'area', 'perimetro', 'raggio', 'diametro', 'circonferenza']
        },
        {
          label: 'Area e Perimetro del Rettangolo',
          href: '/it/geometria/rettangolo/',
          description: 'Calcolare area, perimetro e diagonali del rettangolo',
          icon: 'rectangle',
          category: 'figure piane',
          keywords: ['rettangolo', 'area', 'perimetro', 'diagonali', 'lati']
        },
        {
          label: 'Area del Triangolo',
          href: '/it/geometria/triangolo/',
          description: 'Calcolare area e perimetro del triangolo con diverse formule',
          icon: 'triangle',
          category: 'figure piane',
          keywords: ['triangolo', 'area', 'perimetro', 'base', 'altezza', 'erone']
        },
        {
          label: 'Area e Perimetro del Quadrato',
          href: '/it/geometria/quadrato/',
          description: 'Calcolare area, perimetro e diagonali del quadrato',
          icon: 'square',
          category: 'figure piane',
          keywords: ['quadrato', 'area', 'perimetro', 'diagonali', 'lato']
        },
        {
          label: 'Area del Rombo',
          href: '/it/geometria/rombo/',
          description: 'Calcolare area e perimetro del rombo',
          icon: 'diamond',
          category: 'figure piane',
          keywords: ['rombo', 'area', 'perimetro', 'diagonali', 'lati']
        },
        {
          label: 'Area del Trapezio',
          href: '/it/geometria/trapezio/',
          description: 'Calcolare area e perimetro del trapezio',
          icon: 'trapezoid',
          category: 'figure piane',
          keywords: ['trapezio', 'area', 'perimetro', 'basi', 'altezza']
        }
      ]
    },
    marketing: {
      label: 'Marketing',
      href: '/it/marketing/',
      description: 'Calcolatrici per marketing digitale: CAC, LTV, ROI, conversioni e analisi delle campagne.',
      calculators: [
        {
          label: 'CAC - Costo di Acquisizione',
          href: '/it/marketing/cac/',
          description: 'Calcolare il costo di acquisizione cliente per campagne marketing',
          icon: 'cac',
          category: 'acquisizione',
          keywords: ['cac', 'costo', 'acquisizione', 'cliente', 'marketing']
        },
        {
          label: 'LTV - Lifetime Value',
          href: '/it/marketing/ltv/',
          description: 'Calcolare il valore a vita del cliente',
          icon: 'ltv',
          category: 'valore',
          keywords: ['ltv', 'lifetime', 'value', 'cliente', 'valore']
        },
        {
          label: 'Tasso di Conversione',
          href: '/it/marketing/conversione/',
          description: 'Calcolare il tasso di conversione delle campagne',
          icon: 'conversion',
          category: 'performance',
          keywords: ['conversione', 'tasso', 'campagne', 'performance', 'marketing']
        },
        {
          label: 'Budget di Marketing',
          href: '/it/marketing/budget/',
          description: 'Pianificare e ottimizzare il budget per campagne marketing',
          icon: 'budget',
          category: 'pianificazione',
          keywords: ['budget', 'marketing', 'pianificazione', 'spesa', 'ottimizzazione']
        },
        {
          label: 'CPC / CPM',
          href: '/it/marketing/cpc-cpm/',
          description: 'Calcolare costo per click e costo per mille impressioni',
          icon: 'cpc-cpm',
          category: 'pubblicità',
          keywords: ['cpc', 'cpm', 'click', 'impressioni', 'pubblicità']
        },
        {
          label: 'ROI in Marketing',
          href: '/it/marketing/roi/',
          description: 'Calcolare il ritorno sull\'investimento delle campagne marketing',
          icon: 'roi',
          category: 'performance',
          keywords: ['roi', 'ritorno', 'investimento', 'marketing', 'profitto']
        }
      ]
    },
    tecnologia: {
      label: 'Tecnologia',
      href: '/it/tecnologia/',
      description: 'Calcolatrici tecnologiche: conversione unità, velocità, archiviazione, colori e analisi di rete.',
      calculators: [
        {
          label: 'Conversione di Archiviazione',
          href: '/it/tecnologia/conversione-archiviazione/',
          description: 'Convertire tra byte, KB, MB, GB, TB e altre unità di archiviazione',
          icon: 'storage',
          category: 'conversione',
          keywords: ['archiviazione', 'byte', 'kb', 'mb', 'gb', 'tb', 'conversione']
        },
        {
          label: 'Velocità di Download',
          href: '/it/tecnologia/velocita-download/',
          description: 'Calcolare tempo di download e velocità di connessione',
          icon: 'download',
          category: 'rete',
          keywords: ['download', 'velocità', 'connessione', 'tempo', 'banda']
        },
        {
          label: 'Uptime/Downtime',
          href: '/it/tecnologia/uptime-downtime/',
          description: 'Calcolare uptime, downtime e disponibilità dei servizi',
          icon: 'uptime',
          category: 'disponibilità',
          keywords: ['uptime', 'downtime', 'disponibilità', 'servizi', 'tempo']
        },
        {
          label: 'Conversione di Colori',
          href: '/it/tecnologia/conversione-colori/',
          description: 'Convertire tra codici colore HEX, RGB, HSL e altri formati',
          icon: 'colors',
          category: 'design',
          keywords: ['colori', 'hex', 'rgb', 'hsl', 'conversione', 'design']
        },
        {
          label: 'Analisi delle Password',
          href: '/it/tecnologia/analisi-password/',
          description: 'Valutare la sicurezza e la forza delle password',
          icon: 'password',
          category: 'sicurezza',
          keywords: ['password', 'sicurezza', 'forza', 'analisi', 'protezione']
        },
        {
          label: 'Analisi della Latenza',
          href: '/it/tecnologia/analisi-latenza/',
          description: 'Calcolare latenza di rete e tempi di risposta',
          icon: 'latency',
          category: 'rete',
          keywords: ['latenza', 'rete', 'risposta', 'tempo', 'connessione']
        }
      ]
    },
    calendario: {
      label: 'Calendario',
      href: '/it/calendario/',
      description: 'Calcolatrici per date, età, giorni tra date, ore e minuti e operazioni temporali.',
      calculators: [
        {
          label: 'Contatore di Giorni tra Date',
          href: '/it/calendario/contatore-giorni-date/',
          description: 'Calcolare giorni, settimane e mesi tra due date',
          icon: 'calendar',
          category: 'date',
          keywords: ['giorni', 'date', 'calendario', 'tempo', 'differenza']
        },
        {
          label: 'Calcolatrice dell\'Età',
          href: '/it/calendario/calcolatrice-eta/',
          description: 'Calcolare l\'età esatta in anni, mesi e giorni',
          icon: 'age',
          category: 'età',
          keywords: ['età', 'anni', 'mesi', 'giorni', 'nascita']
        },
        {
          label: 'Aggiungi/Sottrai Giorni a una Data',
          href: '/it/calendario/aggiungi-sottrai-giorni/',
          description: 'Aggiungere o sottrarre giorni, settimane o mesi a una data',
          icon: 'date-add',
          category: 'operazioni',
          keywords: ['aggiungere', 'sottrarre', 'giorni', 'date', 'operazioni']
        },
        {
          label: 'Calcolatrice di Ore e Minuti',
          href: '/it/calendario/ore-minuti/',
          description: 'Calcolare somme, differenze e conversioni di ore e minuti',
          icon: 'time',
          category: 'tempo',
          keywords: ['ore', 'minuti', 'tempo', 'calcolo', 'conversione']
        },
        {
          label: 'Giorni di Vacanza',
          href: '/it/calendario/giorni-vacanza/',
          description: 'Calcolare giorni lavorativi e festivi per pianificare vacanze',
          icon: 'vacation',
          category: 'lavoro',
          keywords: ['vacanza', 'lavoro', 'festivi', 'giorni', 'pianificazione']
        },
        {
          label: 'Convertitore di Date',
          href: '/it/calendario/convertitore-date/',
          description: 'Convertire date tra diversi formati e calendari',
          icon: 'date-convert',
          category: 'conversione',
          keywords: ['date', 'conversione', 'formati', 'calendari', 'convertitore']
        }
      ]
    },
    curiosas: {
      label: 'Curiose',
      href: '/it/curiosas/',
      description: 'Calcolatrici curiose e divertenti per calcoli insoliti e interessanti.',
      calculators: [
        {
          label: 'Caffè vs. Risparmio',
          href: '/it/curiosas/caffe-risparmio/',
          description: 'Calcolare quanto risparmi evitando di comprare caffè al bar',
          icon: 'coffee',
          category: 'risparmio',
          keywords: ['caffè', 'risparmio', 'bar', 'denaro', 'abitudini']
        },
        {
          label: 'Pizza per Persona',
          href: '/it/curiosas/pizza-persona/',
          description: 'Calcolare quante pizze servono per un gruppo di persone',
          icon: 'pizza',
          category: 'cibo',
          keywords: ['pizza', 'persone', 'porzioni', 'cibo', 'gruppo']
        },
        {
          label: 'Aspettativa di Vita e Cibo',
          href: '/it/curiosas/aspettativa-vita-cibo/',
          description: 'Calcolare l\'impatto del cibo sull\'aspettativa di vita',
          icon: 'food-life',
          category: 'salute',
          keywords: ['aspettativa', 'vita', 'cibo', 'salute', 'alimentazione']
        },
        {
          label: 'Baci Brucia Calorie',
          href: '/it/curiosas/baci-brucia-calorie/',
          description: 'Calcolare quante calorie si bruciano baciando',
          icon: 'kiss',
          category: 'divertimento',
          keywords: ['baci', 'calorie', 'bruciare', 'divertimento', 'amore']
        },
        {
          label: 'Tempo nei Film',
          href: '/it/curiosas/tempo-film/',
          description: 'Calcolare il tempo effettivo di azione nei film',
          icon: 'movie',
          category: 'intrattenimento',
          keywords: ['film', 'tempo', 'azione', 'intrattenimento', 'cinema']
        },
        {
          label: 'Livello di Freddoloso',
          href: '/it/curiosas/livello-freddoloso/',
          description: 'Scoprire il tuo livello di freddolosità in base alle temperature',
          icon: 'cold',
          category: 'personale',
          keywords: ['freddo', 'temperatura', 'freddoloso', 'personale', 'clima']
        }
      ]
    },
    altre: {
      label: 'Altre',
      href: '/it/altre/',
      description: 'Calcolatrici varie per mance, voti, benzina, numeri romani e altre utilità.',
      calculators: [
        {
          label: 'Calcolatrice di Mance',
          href: '/it/altre/calcolatrice-mance/',
          description: 'Calcolare mance per camerieri, tassisti e servizi',
          icon: 'tip',
          category: 'servizi',
          keywords: ['mance', 'camerieri', 'tassisti', 'servizi', 'gratifica']
        },
        {
          label: 'Scala di Voti',
          href: '/it/altre/scala-di-voti/',
          description: 'Convertire voti tra diverse scale di valutazione',
          icon: 'grades',
          category: 'educazione',
          keywords: ['voti', 'scala', 'valutazione', 'educazione', 'conversione']
        },
        {
          label: 'Spesa Benzina per Viaggi',
          href: '/it/altre/spesa-benzina-viaggi/',
          description: 'Calcolare il costo del carburante per viaggi in auto',
          icon: 'fuel',
          category: 'trasporti',
          keywords: ['benzina', 'viaggi', 'auto', 'carburante', 'costo']
        },
        {
          label: 'Contatore di Parole e Caratteri',
          href: '/it/altre/contatore-parole-caratteri/',
          description: 'Contare parole, caratteri e spazi in un testo',
          icon: 'text',
          category: 'testo',
          keywords: ['parole', 'caratteri', 'testo', 'conteggio', 'spazi']
        },
        {
          label: 'Convertitore di Numeri Romani',
          href: '/it/altre/convertitore-numeri-romani/',
          description: 'Convertire tra numeri arabi e numeri romani',
          icon: 'roman',
          category: 'conversione',
          keywords: ['numeri', 'romani', 'arabi', 'conversione', 'storia']
        },
        {
          label: 'Contatore di Click (CPS Test)',
          href: '/it/altre/contatore-click-cps/',
          description: 'Testare la velocità di click al secondo',
          icon: 'click',
          category: 'test',
          keywords: ['click', 'cps', 'velocità', 'test', 'mouse']
        }
      ]
    }
  },
  social: {
    twitter: 'https://twitter.com/calculatodo',
    facebook: 'https://facebook.com/calculatodo',
    instagram: 'https://instagram.com/calculatodo'
  },
  contact: {
    email: 'info@calculatodo.online'
  }
}
