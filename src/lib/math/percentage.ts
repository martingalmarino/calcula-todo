/**
 * Utilidades para cálculos de porcentajes
 */

export interface PercentageResult {
  result: number;
  formula: string;
  steps: string[];
}

/**
 * Calcula qué porcentaje es X de Y
 */
export function percentageOf(x: number, y: number): PercentageResult {
  if (y === 0) {
    throw new Error('El denominador no puede ser cero');
  }
  
  const result = (x / y) * 100;
  const formula = `(${x} ÷ ${y}) × 100`;
  const steps = [
    `Dividir ${x} entre ${y}: ${x / y}`,
    `Multiplicar por 100: ${x / y} × 100 = ${result.toFixed(2)}%`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula el X% de un número
 */
export function percentageOfNumber(percentage: number, base: number): PercentageResult {
  const result = (percentage / 100) * base;
  const formula = `(${percentage} ÷ 100) × ${base}`;
  const steps = [
    `Convertir ${percentage}% a decimal: ${percentage} ÷ 100 = ${percentage / 100}`,
    `Multiplicar por ${base}: ${percentage / 100} × ${base} = ${result}`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula el aumento de un valor en un porcentaje
 */
export function increase(value: number, percentage: number): PercentageResult {
  const increaseAmount = (percentage / 100) * value;
  const result = value + increaseAmount;
  const formula = `${value} + (${percentage}% de ${value})`;
  const steps = [
    `Calcular ${percentage}% de ${value}: ${percentage / 100} × ${value} = ${increaseAmount}`,
    `Sumar al valor original: ${value} + ${increaseAmount} = ${result}`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula el descuento de un valor en un porcentaje
 */
export function decrease(value: number, percentage: number): PercentageResult {
  const decreaseAmount = (percentage / 100) * value;
  const result = value - decreaseAmount;
  const formula = `${value} - (${percentage}% de ${value})`;
  const steps = [
    `Calcular ${percentage}% de ${value}: ${percentage / 100} × ${value} = ${decreaseAmount}`,
    `Restar del valor original: ${value} - ${decreaseAmount} = ${result}`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula la variación porcentual entre dos valores
 */
export function variationPercent(oldValue: number, newValue: number): PercentageResult {
  if (oldValue === 0) {
    throw new Error('El valor anterior no puede ser cero');
  }
  
  const variation = ((newValue - oldValue) / oldValue) * 100;
  const result = variation;
  const formula = `((${newValue} - ${oldValue}) ÷ ${oldValue}) × 100`;
  const steps = [
    `Calcular la diferencia: ${newValue} - ${oldValue} = ${newValue - oldValue}`,
    `Dividir por el valor anterior: ${newValue - oldValue} ÷ ${oldValue} = ${(newValue - oldValue) / oldValue}`,
    `Multiplicar por 100: ${(newValue - oldValue) / oldValue} × 100 = ${variation.toFixed(2)}%`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula el valor original antes de un aumento
 */
export function originalValueAfterIncrease(finalValue: number, percentage: number): PercentageResult {
  if (percentage === 0) {
    return { result: finalValue, formula: `${finalValue}`, steps: ['Sin aumento, el valor original es el mismo'] };
  }
  
  const result = finalValue / (1 + percentage / 100);
  const formula = `${finalValue} ÷ (1 + ${percentage} ÷ 100)`;
  const steps = [
    `Calcular el factor de aumento: 1 + ${percentage} ÷ 100 = ${1 + percentage / 100}`,
    `Dividir el valor final por el factor: ${finalValue} ÷ ${1 + percentage / 100} = ${result.toFixed(2)}`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula el valor original antes de un descuento
 */
export function originalValueAfterDecrease(finalValue: number, percentage: number): PercentageResult {
  if (percentage === 0) {
    return { result: finalValue, formula: `${finalValue}`, steps: ['Sin descuento, el valor original es el mismo'] };
  }
  
  const result = finalValue / (1 - percentage / 100);
  const formula = `${finalValue} ÷ (1 - ${percentage} ÷ 100)`;
  const steps = [
    `Calcular el factor de descuento: 1 - ${percentage} ÷ 100 = ${1 - percentage / 100}`,
    `Dividir el valor final por el factor: ${finalValue} ÷ ${1 - percentage / 100} = ${result.toFixed(2)}`
  ];
  
  return { result, formula, steps };
}
