/**
 * Utilidades para operaciones con fracciones
 */

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
export function simplify(numerator: number, denominator: number): FractionResult {
  if (denominator === 0) {
    throw new Error('El denominador no puede ser cero');
  }
  
  const mcd = gcd(numerator, denominator);
  const simplifiedNumerator = numerator / mcd;
  const simplifiedDenominator = denominator / mcd;
  
  const steps = [
    `Fracción original: ${numerator}/${denominator}`,
    `MCD(${numerator}, ${denominator}) = ${mcd}`,
    `Simplificar: ${numerator} ÷ ${mcd} = ${simplifiedNumerator}`,
    `Simplificar: ${denominator} ÷ ${mcd} = ${simplifiedDenominator}`,
    `Fracción simplificada: ${simplifiedNumerator}/${simplifiedDenominator}`
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
export function toDecimal(numerator: number, denominator: number): number {
  if (denominator === 0) {
    throw new Error('El denominador no puede ser cero');
  }
  
  return numerator / denominator;
}

/**
 * Convierte un decimal a fracción
 */
export function fromDecimal(decimal: number, precision: number = 6): FractionResult {
  const sign = decimal < 0 ? -1 : 1;
  decimal = Math.abs(decimal);
  
  // Contar decimales
  const decimalStr = decimal.toString();
  const decimalPlaces = decimalStr.includes('.') ? decimalStr.split('.')[1].length : 0;
  
  // Convertir a fracción
  const denominator = Math.pow(10, Math.min(decimalPlaces, precision));
  const numerator = Math.round(decimal * denominator) * sign;
  
  const steps = [
    `Decimal: ${decimal}`,
    `Multiplicar por ${denominator}: ${decimal} × ${denominator} = ${numerator}`,
    `Fracción: ${numerator}/${denominator}`
  ];
  
  // Simplificar
  const simplified = simplify(numerator, denominator);
  
  return {
    result: simplified.result,
    decimal: simplified.decimal,
    steps: [...steps, ...simplified.steps.slice(1)]
  };
}

/**
 * Suma dos fracciones
 */
export function add(fraction1: Fraction, fraction2: Fraction): FractionResult {
  const numerator = fraction1.numerator * fraction2.denominator + fraction2.numerator * fraction1.denominator;
  const denominator = fraction1.denominator * fraction2.denominator;
  
  const steps = [
    `Fracción 1: ${fraction1.numerator}/${fraction1.denominator}`,
    `Fracción 2: ${fraction2.numerator}/${fraction2.denominator}`,
    `Numerador: ${fraction1.numerator} × ${fraction2.denominator} + ${fraction2.numerator} × ${fraction1.denominator} = ${numerator}`,
    `Denominador: ${fraction1.denominator} × ${fraction2.denominator} = ${denominator}`,
    `Resultado: ${numerator}/${denominator}`
  ];
  
  const simplified = simplify(numerator, denominator);
  
  return {
    result: simplified.result,
    decimal: simplified.decimal,
    steps: [...steps, ...simplified.steps.slice(1)]
  };
}

/**
 * Resta dos fracciones
 */
export function subtract(fraction1: Fraction, fraction2: Fraction): FractionResult {
  const numerator = fraction1.numerator * fraction2.denominator - fraction2.numerator * fraction1.denominator;
  const denominator = fraction1.denominator * fraction2.denominator;
  
  const steps = [
    `Fracción 1: ${fraction1.numerator}/${fraction1.denominator}`,
    `Fracción 2: ${fraction2.numerator}/${fraction2.denominator}`,
    `Numerador: ${fraction1.numerator} × ${fraction2.denominator} - ${fraction2.numerator} × ${fraction1.denominator} = ${numerator}`,
    `Denominador: ${fraction1.denominator} × ${fraction2.denominator} = ${denominator}`,
    `Resultado: ${numerator}/${denominator}`
  ];
  
  const simplified = simplify(numerator, denominator);
  
  return {
    result: simplified.result,
    decimal: simplified.decimal,
    steps: [...steps, ...simplified.steps.slice(1)]
  };
}

/**
 * Multiplica dos fracciones
 */
export function multiply(fraction1: Fraction, fraction2: Fraction): FractionResult {
  const numerator = fraction1.numerator * fraction2.numerator;
  const denominator = fraction1.denominator * fraction2.denominator;
  
  const steps = [
    `Fracción 1: ${fraction1.numerator}/${fraction1.denominator}`,
    `Fracción 2: ${fraction2.numerator}/${fraction2.denominator}`,
    `Numerador: ${fraction1.numerator} × ${fraction2.numerator} = ${numerator}`,
    `Denominador: ${fraction1.denominator} × ${fraction2.denominator} = ${denominator}`,
    `Resultado: ${numerator}/${denominator}`
  ];
  
  const simplified = simplify(numerator, denominator);
  
  return {
    result: simplified.result,
    decimal: simplified.decimal,
    steps: [...steps, ...simplified.steps.slice(1)]
  };
}

/**
 * Divide dos fracciones
 */
export function divide(fraction1: Fraction, fraction2: Fraction): FractionResult {
  if (fraction2.numerator === 0) {
    throw new Error('No se puede dividir por cero');
  }
  
  const numerator = fraction1.numerator * fraction2.denominator;
  const denominator = fraction1.denominator * fraction2.numerator;
  
  const steps = [
    `Fracción 1: ${fraction1.numerator}/${fraction1.denominator}`,
    `Fracción 2: ${fraction2.numerator}/${fraction2.denominator}`,
    `Invertir fracción 2: ${fraction2.denominator}/${fraction2.numerator}`,
    `Multiplicar: ${fraction1.numerator}/${fraction1.denominator} × ${fraction2.denominator}/${fraction2.numerator}`,
    `Numerador: ${fraction1.numerator} × ${fraction2.denominator} = ${numerator}`,
    `Denominador: ${fraction1.denominator} × ${fraction2.numerator} = ${denominator}`,
    `Resultado: ${numerator}/${denominator}`
  ];
  
  const simplified = simplify(numerator, denominator);
  
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
