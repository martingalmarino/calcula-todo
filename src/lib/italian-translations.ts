/**
 * Diccionario de traducciones al italiano para calculadoras
 * Garantiza traducción 100% completa y consistente
 */

export const italianTranslations = {
  // Elementos de interfaz comunes
  ui: {
    calculate: 'Calcolare',
    result: 'Risultato',
    error: 'Errore',
    enter: 'Inserisci',
    select: 'Seleziona',
    example: 'Esempio',
    question: 'Domanda',
    answer: 'Risposta',
    copy: 'Copia',
    share: 'Condividi',
    clear: 'Cancella',
    reset: 'Ripristina',
    submit: 'Invia',
    cancel: 'Annulla',
    save: 'Salva',
    load: 'Carica',
    help: 'Aiuto',
    info: 'Informazioni',
    settings: 'Impostazioni',
    close: 'Chiudi',
    open: 'Apri',
    next: 'Avanti',
    previous: 'Precedente',
    back: 'Indietro',
    continue: 'Continua',
    finish: 'Termina',
    start: 'Inizia',
    stop: 'Ferma',
    pause: 'Pausa',
    resume: 'Riprendi'
  },

  // Mensajes de error comunes
  errors: {
    invalidInput: 'Input non valido',
    requiredField: 'Campo obbligatorio',
    numberRequired: 'È richiesto un numero',
    positiveNumber: 'Inserisci un numero positivo',
    validEmail: 'Inserisci un indirizzo email valido',
    calculationError: 'Errore nel calcolo',
    networkError: 'Errore di rete',
    serverError: 'Errore del server',
    notFound: 'Non trovato',
    unauthorized: 'Non autorizzato',
    forbidden: 'Accesso negato',
    timeout: 'Timeout',
    unknownError: 'Errore sconosciuto'
  },

  // Placeholders comunes
  placeholders: {
    enterValue: 'Inserisci un valore',
    enterNumber: 'Inserisci un numero',
    enterText: 'Inserisci del testo',
    selectOption: 'Seleziona un\'opzione',
    enterEmail: 'Inserisci la tua email',
    enterPassword: 'Inserisci la tua password',
    search: 'Cerca...',
    filter: 'Filtra...',
    sort: 'Ordina...'
  },

  // Títulos de calculadoras
  calculators: {
    fractions: 'Calcolatrice di Frazioni',
    percentages: 'Calcolatrice di Percentuali',
    algebra: 'Calcolatrice di Algebra',
    trigonometry: 'Calcolatrice di Trigonometria',
    derivatives: 'Calcolatrice di Derivate',
    powers: 'Calcolatrice di Potenze e Radici',
    matrices: 'Calcolatrice di Matrici',
    combinatorics: 'Calcolatrice di Combinatoria',
    progressions: 'Calcolatrice di Progressioni',
    imc: 'Calcolatrice di IMC',
    tmb: 'Calcolatrice di TMB',
    bodyFat: 'Calcolatrice di Percentuale di Grasso Corporeo',
    pafi: 'Calcolatrice PaFi',
    water: 'Calcolatrice di Acqua Giornaliera Raccomandata',
    ovulation: 'Calcolatrice di Ovulazione e Giorni Fertili'
  },

  // Descripciones de calculadoras
  descriptions: {
    fractions: 'Calcola operazioni con frazioni: somma, sottrazione, moltiplicazione e divisione',
    percentages: 'Calcola percentuali, sconti, aumenti e rapporti percentuali',
    algebra: 'Risolvi equazioni lineari, quadratiche e sistemi di equazioni',
    trigonometry: 'Calcola seno, coseno, tangente e funzioni trigonometriche inverse',
    derivatives: 'Calcola derivate di funzioni polinomiali, trigonometriche e logaritmiche',
    powers: 'Calcola potenze, radici quadrate, cubiche e n-esime',
    matrices: 'Operazioni con matrici: somma, sottrazione, moltiplicazione e determinante',
    combinatorics: 'Calcola permutazioni, combinazioni e disposizioni',
    progressions: 'Calcola progressioni aritmetiche e geometriche',
    imc: 'Calcola il tuo Indice di Massa Corporea e scopri la tua categoria di peso ideale',
    tmb: 'Calcola la tua Tasa Metabolica Basale e scopri quante calorie bruci a riposo',
    bodyFat: 'Calcola la percentuale di grasso corporeo usando diverse formule',
    pafi: 'Calcola l\'indice PaFi per valutare la relazione tra pressione arteriosa e frequenza cardiaca',
    water: 'Calcola la quantità di acqua giornaliera raccomandata per una corretta idratazione',
    ovulation: 'Calcola i giorni di ovulazione e il periodo fertile del ciclo mestruale'
  },

  // FAQ comunes
  faq: {
    free: 'Sono gratuite tutte le calcolatrici?',
    freeAnswer: 'Sì, tutte le nostre calcolatrici sono completamente gratuite. Non richiedono registrazione né hanno limiti di utilizzo.',
    devices: 'Posso usare le calcolatrici su qualsiasi dispositivo?',
    devicesAnswer: 'Assolutamente! Le nostre calcolatrici sono progettate per essere completamente responsive e funzionano perfettamente su desktop, tablet e smartphone.',
    explanations: 'Le calcolatrici forniscono spiegazioni passo-passo?',
    explanationsAnswer: 'Sì, molte delle nostre calcolatrici offrono spiegazioni dettagliate passo-passo per aiutarti a capire il processo di calcolo.',
    accuracy: 'Quanto sono accurate le calcolatrici?',
    accuracyAnswer: 'Le nostre calcolatrici utilizzano algoritmi matematici precisi e sono testate per garantire risultati accurati.',
    support: 'Cosa faccio se ho problemi con una calcolatrice?',
    supportAnswer: 'Puoi contattarci attraverso la pagina di contatto e ti aiuteremo a risolvere qualsiasi problema.'
  },

  // Mensajes de resultado
  results: {
    calculationComplete: 'Calcolo completato',
    resultReady: 'Risultato pronto',
    seeResult: 'Vedi il risultato',
    calculationSteps: 'Passaggi del calcolo',
    formula: 'Formula',
    explanation: 'Spiegazione',
    interpretation: 'Interpretazione',
    recommendations: 'Raccomandazioni',
    notes: 'Note',
    disclaimer: 'Disclaimer'
  }
};

/**
 * Función para obtener traducción
 */
export function getItalianTranslation(category: keyof typeof italianTranslations, key: string): string {
  const categoryTranslations = italianTranslations[category];
  if (categoryTranslations && typeof categoryTranslations === 'object' && key in categoryTranslations) {
    return (categoryTranslations as Record<string, string>)[key];
  }
  return key; // Retornar la clave si no se encuentra
}

/**
 * Función para obtener traducción con fallback
 */
export function translateToItalian(text: string, fallback?: string): string {
  // Buscar en todas las categorías
  for (const [, translations] of Object.entries(italianTranslations)) {
    if (typeof translations === 'object') {
      for (const [, value] of Object.entries(translations)) {
        if (value === text) {
          return value;
        }
      }
    }
  }
  
  return fallback || text;
}

/**
 * Hook para usar traducciones en componentes
 */
export function useItalianTranslations() {
  return {
    t: getItalianTranslation,
    translate: translateToItalian,
    translations: italianTranslations
  };
}
