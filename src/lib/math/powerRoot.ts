/**
 * Utilidades para potencias y raíces
 */

import { getMathTranslations, type Language } from '../translations/math';

export interface PowerResult {
  result: number;
  formula: string;
  steps: string[];
}

export interface RootResult {
  result: number;
  formula: string;
  steps: string[];
  isValid: boolean;
}

/**
 * Calcula una potencia
 */
export function pow(base: number, exponent: number): PowerResult {
  const result = Math.pow(base, exponent);
  
  let formula: string;
  let steps: string[];
  
  if (exponent === 0) {
    formula = `${base}^0`;
    steps = [`Cualquier número elevado a 0 es igual a 1: ${base}^0 = 1`];
  } else if (exponent === 1) {
    formula = `${base}^1`;
    steps = [`Cualquier número elevado a 1 es igual a sí mismo: ${base}^1 = ${base}`];
  } else if (exponent > 0) {
    formula = `${base}^${exponent}`;
    steps = [`Calcular ${base} elevado a ${exponent}: ${base}^${exponent} = ${result}`];
    
    if (Number.isInteger(exponent) && exponent <= 10) {
      const calculationSteps = [];
      let current = 1;
      for (let i = 1; i <= exponent; i++) {
        current *= base;
        calculationSteps.push(`Paso ${i}: ${current / base} × ${base} = ${current}`);
      }
      steps = [...steps, ...calculationSteps];
    }
  } else {
    formula = `${base}^${exponent}`;
    steps = [
      `${base}^${exponent} = 1 / (${base}^${Math.abs(exponent)})`,
      `1 / ${Math.pow(base, Math.abs(exponent))} = ${result}`
    ];
  }
  
  return { result, formula, steps };
}

/**
 * Calcula una raíz n-ésima
 */
export function root(value: number, index: number, language: Language = 'es'): RootResult {
  const t = getMathTranslations(language);
  
  if (index === 0) {
    throw new Error(t.errors.indexCannotBeZero);
  }
  
  if (value < 0 && index % 2 === 0) {
    return {
      result: NaN,
      formula: `√[${index}](${value})`,
      steps: [`No existe raíz par de un número negativo: √[${index}](${value})`],
      isValid: false
    };
  }
  
  const result = Math.pow(value, 1 / index);
  const formula = `√[${index}](${value})`;
  
  let steps: string[];
  if (index === 2) {
    steps = [`Raíz cuadrada de ${value}: √${value} = ${result}`];
  } else if (index === 3) {
    steps = [`Raíz cúbica de ${value}: ∛${value} = ${result}`];
  } else {
    steps = [`Raíz ${index}-ésima de ${value}: √[${index}](${value}) = ${result}`];
  }
  
  // Verificación
  const verification = Math.pow(result, index);
  steps.push(`Verificación: ${result}^${index} = ${verification}`);
  
  return { result, formula, steps, isValid: true };
}

/**
 * Calcula la raíz cuadrada
 */
export function sqrt(value: number): RootResult {
  return root(value, 2);
}

/**
 * Calcula la raíz cúbica
 */
export function cbrt(value: number): RootResult {
  return root(value, 3);
}

/**
 * Convierte a notación científica
 */
export function toScientificNotation(value: number): { coefficient: number; exponent: number; notation: string } {
  if (value === 0) {
    return { coefficient: 0, exponent: 0, notation: '0' };
  }
  
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const coefficient = value / Math.pow(10, exponent);
  
  return {
    coefficient: Math.round(coefficient * 1000000) / 1000000, // 6 decimales
    exponent,
    notation: `${coefficient.toFixed(6)} × 10^${exponent}`
  };
}

/**
 * Calcula potencias de 10
 */
export function powerOfTen(exponent: number): PowerResult {
  const result = Math.pow(10, exponent);
  const formula = `10^${exponent}`;
  
  let steps: string[];
  if (exponent === 0) {
    steps = ['10^0 = 1'];
  } else if (exponent > 0) {
    steps = [`10^${exponent} = ${result}`];
    if (exponent <= 6) {
      steps.push(`Es un 1 seguido de ${exponent} ceros`);
    }
  } else {
    steps = [
      `10^${exponent} = 1 / 10^${Math.abs(exponent)}`,
      `1 / ${Math.pow(10, Math.abs(exponent))} = ${result}`
    ];
  }
  
  return { result, formula, steps };
}

/**
 * Calcula raíces de números perfectos
 */
export function perfectRoot(value: number, index: number): RootResult | null {
  const result = Math.pow(value, 1 / index);
  
  // Verificar si es un número entero
  if (Number.isInteger(result) && result > 0) {
    const formula = `√[${index}](${value})`;
    const steps = [
      `${value} es un ${index === 2 ? 'cuadrado' : index === 3 ? 'cubo' : `${index}-ésima potencia`} perfecto`,
      `√[${index}](${value}) = ${result}`
    ];
    
    return { result, formula, steps, isValid: true };
  }
  
  return null;
}

/**
 * Calcula potencias de números perfectos
 */
export function perfectPower(base: number, maxExponent: number = 10): Array<{ exponent: number; result: number }> {
  const powers = [];
  
  for (let exp = 1; exp <= maxExponent; exp++) {
    const result = Math.pow(base, exp);
    powers.push({ exponent: exp, result });
  }
  
  return powers;
}
