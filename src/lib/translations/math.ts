/**
 * Traducciones para funciones matemáticas
 */

export type Language = 'es' | 'it';

export interface MathTranslations {
  fractions: {
    originalFraction: string;
    gcd: string;
    simplify: string;
    simplifiedFraction: string;
    fraction1: string;
    fraction2: string;
    numerator: string;
    denominator: string;
    invertFraction: string;
    multiply: string;
    decimal: string;
    multiplyBy: string;
  };
  errors: {
    denominatorCannotBeZero: string;
    indexCannotBeZero: string;
    equationInfiniteSolutions: string;
    equationNoSolution: string;
    coefficientACannotBeZero: string;
    systemNoUniqueSolution: string;
    discriminantNegative: string;
    invalidExpression: string;
    errorEvaluatingExpression: string;
    allValuesMustBePositive: string;
    systolicMustBeGreater: string;
    cycleLengthInvalid: string;
    invalidDate: string;
  };
  algebra: {
    cannotFactorize: string;
    discriminantNegative: string;
  };
}

const translations: Record<Language, MathTranslations> = {
  es: {
    fractions: {
      originalFraction: 'Fracción original',
      gcd: 'MCD',
      simplify: 'Simplificar',
      simplifiedFraction: 'Fracción simplificada',
      fraction1: 'Fracción 1',
      fraction2: 'Fracción 2',
      numerator: 'Numerador',
      denominator: 'Denominador',
      invertFraction: 'Invertir fracción',
      multiply: 'Multiplicar',
      decimal: 'Decimal',
      multiplyBy: 'Multiplicar por',
    },
    errors: {
      denominatorCannotBeZero: 'El denominador no puede ser cero',
      indexCannotBeZero: 'El índice de la raíz no puede ser cero',
      equationInfiniteSolutions: 'La ecuación 0x + 0 = 0 tiene infinitas soluciones',
      equationNoSolution: 'La ecuación 0x + b = 0 no tiene solución',
      coefficientACannotBeZero: 'El coeficiente a no puede ser cero en una ecuación cuadrática',
      systemNoUniqueSolution: 'El sistema no tiene solución única (determinante = 0)',
      discriminantNegative: 'El discriminante es negativo, no hay factorización real',
      invalidExpression: 'Expresión no válida',
      errorEvaluatingExpression: 'Error al evaluar la expresión',
      allValuesMustBePositive: 'Todos los valores deben ser positivos',
      systolicMustBeGreater: 'La presión sistólica debe ser mayor que la diastólica',
      cycleLengthInvalid: 'La duración del ciclo debe estar entre 21 y 35 días',
      invalidDate: 'Fecha de último período inválida',
    },
    algebra: {
      cannotFactorize: 'No se puede factorizar (raíces complejas)',
      discriminantNegative: 'El discriminante es negativo, no hay factorización real',
    },
  },
  it: {
    fractions: {
      originalFraction: 'Frazione originale',
      gcd: 'MCD',
      simplify: 'Semplifica',
      simplifiedFraction: 'Frazione semplificata',
      fraction1: 'Frazione 1',
      fraction2: 'Frazione 2',
      numerator: 'Numeratore',
      denominator: 'Denominatore',
      invertFraction: 'Inverti frazione',
      multiply: 'Moltiplica',
      decimal: 'Decimale',
      multiplyBy: 'Moltiplica per',
    },
    errors: {
      denominatorCannotBeZero: 'Il denominatore non può essere zero',
      indexCannotBeZero: 'L\'indice della radice non può essere zero',
      equationInfiniteSolutions: 'L\'equazione 0x + 0 = 0 ha infinite soluzioni',
      equationNoSolution: 'L\'equazione 0x + b = 0 non ha soluzione',
      coefficientACannotBeZero: 'Il coefficiente a non può essere zero in un\'equazione quadratica',
      systemNoUniqueSolution: 'Il sistema non ha soluzione unica (determinante = 0)',
      discriminantNegative: 'Il discriminante è negativo, non c\'è fattorizzazione reale',
      invalidExpression: 'Espressione non valida',
      errorEvaluatingExpression: 'Errore nella valutazione dell\'espressione',
      allValuesMustBePositive: 'Tutti i valori devono essere positivi',
      systolicMustBeGreater: 'La pressione sistolica deve essere maggiore della diastolica',
      cycleLengthInvalid: 'La durata del ciclo deve essere tra 21 e 35 giorni',
      invalidDate: 'Data dell\'ultimo periodo non valida',
    },
    algebra: {
      cannotFactorize: 'Non si può fattorizzare (radici complesse)',
      discriminantNegative: 'Il discriminante è negativo, non c\'è fattorizzazione reale',
    },
  },
};

export function getMathTranslations(language: Language = 'es'): MathTranslations {
  return translations[language];
}

export function t(language: Language = 'es') {
  return getMathTranslations(language);
}
