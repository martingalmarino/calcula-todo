/**
 * Utilidades para cálculo diferencial e integral
 */

export interface DerivativeResult {
  result: number;
  formula: string;
  steps: string[];
  method: string;
}

export interface IntegralResult {
  result: number;
  error?: number;
  formula: string;
  steps: string[];
  method: string;
}

/**
 * Calcula la derivada numérica usando diferencias centradas
 */
export function numericalDerivative(
  func: (x: number) => number, 
  x0: number, 
  h: number = 0.001
): DerivativeResult {
  const f_x0_plus_h = func(x0 + h);
  const f_x0_minus_h = func(x0 - h);
  const result = (f_x0_plus_h - f_x0_minus_h) / (2 * h);
  
  const formula = `f'(${x0}) ≈ [f(${x0 + h}) - f(${x0 - h})] / (2h)`;
  const steps = [
    `Método: Diferencias centradas`,
    `Paso h = ${h}`,
    `f(${x0 + h}) = f(${x0 + h}) = ${f_x0_plus_h}`,
    `f(${x0 - h}) = f(${x0 - h}) = ${f_x0_minus_h}`,
    `f'(${x0}) ≈ [${f_x0_plus_h} - ${f_x0_minus_h}] / (2 × ${h})`,
    `f'(${x0}) ≈ ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps, method: 'diferencias centradas' };
}

/**
 * Calcula la derivada numérica usando diferencias hacia adelante
 */
export function forwardDifferenceDerivative(
  func: (x: number) => number, 
  x0: number, 
  h: number = 0.001
): DerivativeResult {
  const f_x0 = func(x0);
  const f_x0_plus_h = func(x0 + h);
  const result = (f_x0_plus_h - f_x0) / h;
  
  const formula = `f'(${x0}) ≈ [f(${x0 + h}) - f(${x0})] / h`;
  const steps = [
    `Método: Diferencias hacia adelante`,
    `Paso h = ${h}`,
    `f(${x0}) = ${f_x0}`,
    `f(${x0 + h}) = f(${x0 + h}) = ${f_x0_plus_h}`,
    `f'(${x0}) ≈ [${f_x0_plus_h} - ${f_x0}] / ${h}`,
    `f'(${x0}) ≈ ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps, method: 'diferencias hacia adelante' };
}

/**
 * Calcula la derivada numérica usando diferencias hacia atrás
 */
export function backwardDifferenceDerivative(
  func: (x: number) => number, 
  x0: number, 
  h: number = 0.001
): DerivativeResult {
  const f_x0 = func(x0);
  const f_x0_minus_h = func(x0 - h);
  const result = (f_x0 - f_x0_minus_h) / h;
  
  const formula = `f'(${x0}) ≈ [f(${x0}) - f(${x0 - h})] / h`;
  const steps = [
    `Método: Diferencias hacia atrás`,
    `Paso h = ${h}`,
    `f(${x0}) = ${f_x0}`,
    `f(${x0 - h}) = f(${x0 - h}) = ${f_x0_minus_h}`,
    `f'(${x0}) ≈ [${f_x0} - ${f_x0_minus_h}] / ${h}`,
    `f'(${x0}) ≈ ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps, method: 'diferencias hacia atrás' };
}

/**
 * Calcula la integral numérica usando la regla de Simpson
 */
export function simpsonIntegral(
  func: (x: number) => number,
  a: number,
  b: number,
  n: number = 1000
): IntegralResult {
  if (n % 2 !== 0) {
    n += 1; // Asegurar que n sea par
  }
  
  const h = (b - a) / n;
  let sum = func(a) + func(b);
  
  // Suma de términos impares (multiplicados por 4)
  for (let i = 1; i < n; i += 2) {
    sum += 4 * func(a + i * h);
  }
  
  // Suma de términos pares (multiplicados por 2)
  for (let i = 2; i < n; i += 2) {
    sum += 2 * func(a + i * h);
  }
  
  const result = (h / 3) * sum;
  
  const formula = `∫[${a} to ${b}] f(x) dx ≈ (h/3) × [f(a) + 4f(x₁) + 2f(x₂) + ... + f(b)]`;
  const steps = [
    `Método: Regla de Simpson`,
    `Intervalo: [${a}, ${b}]`,
    `Número de subintervalos: ${n}`,
    `Paso h = (${b} - ${a}) / ${n} = ${h}`,
    `Aplicando la fórmula de Simpson:`,
    `∫[${a} to ${b}] f(x) dx ≈ (${h}/3) × [suma]`,
    `Resultado: ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps, method: 'regla de Simpson' };
}

/**
 * Calcula la integral numérica usando la regla del trapecio
 */
export function trapezoidalIntegral(
  func: (x: number) => number,
  a: number,
  b: number,
  n: number = 1000
): IntegralResult {
  const h = (b - a) / n;
  let sum = func(a) + func(b);
  
  for (let i = 1; i < n; i++) {
    sum += 2 * func(a + i * h);
  }
  
  const result = (h / 2) * sum;
  
  const formula = `∫[${a} to ${b}] f(x) dx ≈ (h/2) × [f(a) + 2f(x₁) + 2f(x₂) + ... + f(b)]`;
  const steps = [
    `Método: Regla del trapecio`,
    `Intervalo: [${a}, ${b}]`,
    `Número de subintervalos: ${n}`,
    `Paso h = (${b} - ${a}) / ${n} = ${h}`,
    `Aplicando la fórmula del trapecio:`,
    `∫[${a} to ${b}] f(x) dx ≈ (${h}/2) × [suma]`,
    `Resultado: ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps, method: 'regla del trapecio' };
}

/**
 * Calcula la integral numérica usando la regla del punto medio
 */
export function midpointIntegral(
  func: (x: number) => number,
  a: number,
  b: number,
  n: number = 1000
): IntegralResult {
  const h = (b - a) / n;
  let sum = 0;
  
  for (let i = 0; i < n; i++) {
    const midpoint = a + (i + 0.5) * h;
    sum += func(midpoint);
  }
  
  const result = h * sum;
  
  const formula = `∫[${a} to ${b}] f(x) dx ≈ h × [f(x₁/2) + f(x₃/2) + ... + f(xₙ₋₁/2)]`;
  const steps = [
    `Método: Regla del punto medio`,
    `Intervalo: [${a}, ${b}]`,
    `Número de subintervalos: ${n}`,
    `Paso h = (${b} - ${a}) / ${n} = ${h}`,
    `Aplicando la fórmula del punto medio:`,
    `∫[${a} to ${b}] f(x) dx ≈ ${h} × [suma de puntos medios]`,
    `Resultado: ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps, method: 'regla del punto medio' };
}

/**
 * Calcula la segunda derivada numérica
 */
export function secondDerivative(
  func: (x: number) => number,
  x0: number,
  h: number = 0.001
): DerivativeResult {
  const f_x0_plus_h = func(x0 + h);
  const f_x0 = func(x0);
  const f_x0_minus_h = func(x0 - h);
  const result = (f_x0_plus_h - 2 * f_x0 + f_x0_minus_h) / (h * h);
  
  const formula = `f''(${x0}) ≈ [f(${x0 + h}) - 2f(${x0}) + f(${x0 - h})] / h²`;
  const steps = [
    `Método: Segunda derivada numérica`,
    `Paso h = ${h}`,
    `f(${x0 + h}) = ${f_x0_plus_h}`,
    `f(${x0}) = ${f_x0}`,
    `f(${x0 - h}) = ${f_x0_minus_h}`,
    `f''(${x0}) ≈ [${f_x0_plus_h} - 2(${f_x0}) + ${f_x0_minus_h}] / ${h}²`,
    `f''(${x0}) ≈ ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps, method: 'segunda derivada numérica' };
}

/**
 * Funciones polinómicas predefinidas para pruebas
 */
export const polynomialFunctions = {
  linear: (x: number) => 2 * x + 3,
  quadratic: (x: number) => x * x - 4 * x + 3,
  cubic: (x: number) => x * x * x - 6 * x * x + 11 * x - 6,
  quartic: (x: number) => x * x * x * x - 10 * x * x * x + 35 * x * x - 50 * x + 24
};

/**
 * Calcula la derivada analítica de un polinomio
 */
export function analyticalDerivative(coefficients: number[], x: number): number {
  let result = 0;
  for (let i = 1; i < coefficients.length; i++) {
    result += i * coefficients[i] * Math.pow(x, i - 1);
  }
  return result;
}

/**
 * Calcula la integral analítica de un polinomio
 */
export function analyticalIntegral(coefficients: number[], a: number, b: number): number {
  let resultA = 0;
  let resultB = 0;
  
  for (let i = 0; i < coefficients.length; i++) {
    const power = i + 1;
    resultA += (coefficients[i] / power) * Math.pow(a, power);
    resultB += (coefficients[i] / power) * Math.pow(b, power);
  }
  
  return resultB - resultA;
}
