/**
 * Utilidades para operaciones con fracciones
 */

import { getMathTranslations, type Language } from '../translations/math';

export interface Fraction {
  numerator: number;
  denominator: number;
}

export interface FractionResult {
  result: Fraction;
  decimal: number;
  steps: string[];
}

/**
 * Calcula el máximo común divisor (MCD)
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  
  return a;
}

/**
 * Simplifica una fracción
 */
export function simplify(numerator: number, denominator: number, language: Language = 'es'): FractionResult {
  const t = getMathTranslations(language);
  
  if (denominator === 0) {
    throw new Error(t.errors.denominatorCannotBeZero);
  }
  
  const mcd = gcd(numerator, denominator);
  const simplifiedNumerator = numerator / mcd;
  const simplifiedDenominator = denominator / mcd;
  
  const steps = [
    `${t.fractions.originalFraction}: ${numerator}/${denominator}`,
    `${t.fractions.gcd}(${numerator}, ${denominator}) = ${mcd}`,
    `${t.fractions.simplify}: ${numerator} ÷ ${mcd} = ${simplifiedNumerator}`,
    `${t.fractions.simplify}: ${denominator} ÷ ${mcd} = ${simplifiedDenominator}`,
    `${t.fractions.simplifiedFraction}: ${simplifiedNumerator}/${simplifiedDenominator}`
  ];
  
  return {
    result: { numerator: simplifiedNumerator, denominator: simplifiedDenominator },
    decimal: simplifiedNumerator / simplifiedDenominator,
    steps
  };
}

/**
 * Convierte una fracción a decimal
 */
export function toDecimal(numerator: number, denominator: number, language: Language = 'es'): number {
  const t = getMathTranslations(language);
  
  if (denominator === 0) {
    throw new Error(t.errors.denominatorCannotBeZero);
  }
  
  return numerator / denominator;
}

/**
 * Convierte un decimal a fracción
 */
export function fromDecimal(decimal: number, precision: number = 6, language: Language = 'es'): FractionResult {
  const t = getMathTranslations(language);
  const sign = decimal < 0 ? -1 : 1;
  decimal = Math.abs(decimal);
  
  // Contar decimales
  const decimalStr = decimal.toString();
  const decimalPlaces = decimalStr.includes('.') ? decimalStr.split('.')[1].length : 0;
  
  // Convertir a fracción
  const denominator = Math.pow(10, Math.min(decimalPlaces, precision));
  const numerator = Math.round(decimal * denominator) * sign;
  
  const steps = [
    `${t.fractions.decimal}: ${decimal}`,
    `${t.fractions.multiplyBy} ${denominator}: ${decimal} × ${denominator} = ${numerator}`,
    `${t.fractions.originalFraction}: ${numerator}/${denominator}`
  ];
  
  // Simplificar
  const simplified = simplify(numerator, denominator, language);
  
  return {
    result: simplified.result,
    decimal: simplified.decimal,
    steps: [...steps, ...simplified.steps.slice(1)]
  };
}

/**
 * Suma dos fracciones
 */
export function add(fraction1: Fraction, fraction2: Fraction, language: Language = 'es'): FractionResult {
  const t = getMathTranslations(language);
  const numerator = fraction1.numerator * fraction2.denominator + fraction2.numerator * fraction1.denominator;
  const denominator = fraction1.denominator * fraction2.denominator;
  
  const steps = [
    `${t.fractions.fraction1}: ${fraction1.numerator}/${fraction1.denominator}`,
    `${t.fractions.fraction2}: ${fraction2.numerator}/${fraction2.denominator}`,
    `${t.fractions.numerator}: ${fraction1.numerator} × ${fraction2.denominator} + ${fraction2.numerator} × ${fraction1.denominator} = ${numerator}`,
    `${t.fractions.denominator}: ${fraction1.denominator} × ${fraction2.denominator} = ${denominator}`,
    `Risultato: ${numerator}/${denominator}`
  ];
  
  const simplified = simplify(numerator, denominator, language);
  
  return {
    result: simplified.result,
    decimal: simplified.decimal,
    steps: [...steps, ...simplified.steps.slice(1)]
  };
}

/**
 * Resta dos fracciones
 */
export function subtract(fraction1: Fraction, fraction2: Fraction, language: Language = 'es'): FractionResult {
  const t = getMathTranslations(language);
  const numerator = fraction1.numerator * fraction2.denominator - fraction2.numerator * fraction1.denominator;
  const denominator = fraction1.denominator * fraction2.denominator;
  
  const steps = [
    `${t.fractions.fraction1}: ${fraction1.numerator}/${fraction1.denominator}`,
    `${t.fractions.fraction2}: ${fraction2.numerator}/${fraction2.denominator}`,
    `${t.fractions.numerator}: ${fraction1.numerator} × ${fraction2.denominator} - ${fraction2.numerator} × ${fraction1.denominator} = ${numerator}`,
    `${t.fractions.denominator}: ${fraction1.denominator} × ${fraction2.denominator} = ${denominator}`,
    `Risultato: ${numerator}/${denominator}`
  ];
  
  const simplified = simplify(numerator, denominator, language);
  
  return {
    result: simplified.result,
    decimal: simplified.decimal,
    steps: [...steps, ...simplified.steps.slice(1)]
  };
}

/**
 * Multiplica dos fracciones
 */
export function multiply(fraction1: Fraction, fraction2: Fraction, language: Language = 'es'): FractionResult {
  const t = getMathTranslations(language);
  const numerator = fraction1.numerator * fraction2.numerator;
  const denominator = fraction1.denominator * fraction2.denominator;
  
  const steps = [
    `${t.fractions.fraction1}: ${fraction1.numerator}/${fraction1.denominator}`,
    `${t.fractions.fraction2}: ${fraction2.numerator}/${fraction2.denominator}`,
    `${t.fractions.numerator}: ${fraction1.numerator} × ${fraction2.numerator} = ${numerator}`,
    `${t.fractions.denominator}: ${fraction1.denominator} × ${fraction2.denominator} = ${denominator}`,
    `Risultato: ${numerator}/${denominator}`
  ];
  
  const simplified = simplify(numerator, denominator, language);
  
  return {
    result: simplified.result,
    decimal: simplified.decimal,
    steps: [...steps, ...simplified.steps.slice(1)]
  };
}

/**
 * Divide dos fracciones
 */
export function divide(fraction1: Fraction, fraction2: Fraction, language: Language = 'es'): FractionResult {
  const t = getMathTranslations(language);
  
  if (fraction2.numerator === 0) {
    throw new Error(t.errors.denominatorCannotBeZero);
  }
  
  const numerator = fraction1.numerator * fraction2.denominator;
  const denominator = fraction1.denominator * fraction2.numerator;
  
  const steps = [
    `${t.fractions.fraction1}: ${fraction1.numerator}/${fraction1.denominator}`,
    `${t.fractions.fraction2}: ${fraction2.numerator}/${fraction2.denominator}`,
    `${t.fractions.invertFraction} 2: ${fraction2.denominator}/${fraction2.numerator}`,
    `${t.fractions.multiply}: ${fraction1.numerator}/${fraction1.denominator} × ${fraction2.denominator}/${fraction2.numerator}`,
    `${t.fractions.numerator}: ${fraction1.numerator} × ${fraction2.denominator} = ${numerator}`,
    `${t.fractions.denominator}: ${fraction1.denominator} × ${fraction2.numerator} = ${denominator}`,
    `Risultato: ${numerator}/${denominator}`
  ];
  
  const simplified = simplify(numerator, denominator, language);
  
  return {
    result: simplified.result,
    decimal: simplified.decimal,
    steps: [...steps, ...simplified.steps.slice(1)]
  };
}

/**
 * Convierte una fracción a número mixto
 */
export function toMixedNumber(numerator: number, denominator: number): { whole: number; fraction: Fraction } {
  if (denominator === 0) {
    throw new Error('El denominador no puede ser cero');
  }
  
  const whole = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  
  return {
    whole,
    fraction: { numerator: remainder, denominator }
  };
}

/**
 * Convierte un número mixto a fracción impropia
 */
export function fromMixedNumber(whole: number, numerator: number, denominator: number): Fraction {
  const newNumerator = whole * denominator + numerator;
  return { numerator: newNumerator, denominator };
}
