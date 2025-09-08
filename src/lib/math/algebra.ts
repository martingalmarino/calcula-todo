/**
 * Utilidades para álgebra
 */

export interface LinearResult {
  x: number;
  formula: string;
  steps: string[];
}

export interface QuadraticResult {
  x1: number | null;
  x2: number | null;
  discriminant: number;
  nature: 'real-distinct' | 'real-equal' | 'complex';
  formula: string;
  steps: string[];
}

export interface System2x2Result {
  x: number;
  y: number;
  steps: string[];
  method: 'substitution' | 'elimination';
}

/**
 * Resuelve una ecuación lineal ax + b = 0
 */
export function solveLinear(a: number, b: number): LinearResult {
  if (a === 0) {
    if (b === 0) {
      throw new Error('La ecuación 0x + 0 = 0 tiene infinitas soluciones');
    } else {
      throw new Error('La ecuación 0x + b = 0 no tiene solución');
    }
  }
  
  const x = -b / a;
  const formula = `${a}x + ${b} = 0`;
  const steps = [
    `Ecuación: ${a}x + ${b} = 0`,
    `Restar ${b} a ambos lados: ${a}x = -${b}`,
    `Dividir por ${a}: x = ${-b}/${a}`,
    `Simplificar: x = ${x}`
  ];
  
  return { x, formula, steps };
}

/**
 * Resuelve una ecuación cuadrática ax² + bx + c = 0
 */
export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  if (a === 0) {
    throw new Error('El coeficiente a no puede ser cero en una ecuación cuadrática');
  }
  
  const discriminant = b * b - 4 * a * c;
  const formula = `${a}x² + ${b}x + ${c} = 0`;
  
  let x1: number | null = null;
  let x2: number | null = null;
  let nature: 'real-distinct' | 'real-equal' | 'complex';
  let steps: string[];
  
  if (discriminant > 0) {
    // Dos raíces reales distintas
    x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    nature = 'real-distinct';
    
    steps = [
      `Ecuación: ${a}x² + ${b}x + ${c} = 0`,
      `Discriminante: Δ = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`,
      `Como Δ > 0, hay dos raíces reales distintas`,
      `x₁ = (-b + √Δ) / 2a = (-${b} + √${discriminant}) / 2(${a}) = ${x1}`,
      `x₂ = (-b - √Δ) / 2a = (-${b} - √${discriminant}) / 2(${a}) = ${x2}`
    ];
  } else if (discriminant === 0) {
    // Una raíz real (doble)
    x1 = -b / (2 * a);
    x2 = x1;
    nature = 'real-equal';
    
    steps = [
      `Ecuación: ${a}x² + ${b}x + ${c} = 0`,
      `Discriminante: Δ = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`,
      `Como Δ = 0, hay una raíz real doble`,
      `x = -b / 2a = -${b} / 2(${a}) = ${x1}`
    ];
  } else {
    // Raíces complejas
    const realPart = -b / (2 * a);
    const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
    nature = 'complex';
    
    steps = [
      `Ecuación: ${a}x² + ${b}x + ${c} = 0`,
      `Discriminante: Δ = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`,
      `Como Δ < 0, las raíces son complejas`,
      `x₁ = ${realPart} + ${imaginaryPart}i`,
      `x₂ = ${realPart} - ${imaginaryPart}i`
    ];
  }
  
  return { x1, x2, discriminant, nature, formula, steps };
}

/**
 * Resuelve un sistema de ecuaciones lineales 2x2
 * ax + by = e
 * cx + dy = f
 */
export function solveSystem2x2(a: number, b: number, c: number, d: number, e: number, f: number): System2x2Result {
  const determinant = a * d - b * c;
  
  if (determinant === 0) {
    throw new Error('El sistema no tiene solución única (determinante = 0)');
  }
  
  const x = (e * d - b * f) / determinant;
  const y = (a * f - e * c) / determinant;
  
  const steps = [
    `Sistema de ecuaciones:`,
    `${a}x + ${b}y = ${e}`,
    `${c}x + ${d}y = ${f}`,
    ``,
    `Determinante: Δ = ad - bc = ${a}(${d}) - ${b}(${c}) = ${determinant}`,
    ``,
    `x = (ed - bf) / Δ = (${e}(${d}) - ${b}(${f})) / ${determinant} = ${x}`,
    `y = (af - ec) / Δ = (${a}(${f}) - ${e}(${c})) / ${determinant} = ${y}`,
    ``,
    `Verificación:`,
    `${a}(${x}) + ${b}(${y}) = ${a * x + b * y} = ${e} ✓`,
    `${c}(${x}) + ${d}(${y}) = ${c * x + d * y} = ${f} ✓`
  ];
  
  return { x, y, steps, method: 'elimination' };
}

/**
 * Factoriza una ecuación cuadrática
 */
export function factorQuadratic(a: number, b: number, c: number): { factors: string; steps: string[] } | null {
  if (a === 0) return null;
  
  const discriminant = b * b - 4 * a * c;
  
  if (discriminant < 0) {
    return {
      factors: 'No se puede factorizar (raíces complejas)',
      steps: ['El discriminante es negativo, no hay factorización real']
    };
  }
  
  const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  
  let factors: string;
  let steps: string[];
  
  if (a === 1) {
    factors = `(x - ${x1})(x - ${x2})`;
    steps = [
      `Ecuación: x² + ${b}x + ${c} = 0`,
      `Raíces: x₁ = ${x1}, x₂ = ${x2}`,
      `Factorización: (x - ${x1})(x - ${x2})`
    ];
  } else {
    factors = `${a}(x - ${x1})(x - ${x2})`;
    steps = [
      `Ecuación: ${a}x² + ${b}x + ${c} = 0`,
      `Raíces: x₁ = ${x1}, x₂ = ${x2}`,
      `Factorización: ${a}(x - ${x1})(x - ${x2})`
    ];
  }
  
  return { factors, steps };
}

/**
 * Calcula el vértice de una parábola
 */
export function vertexOfParabola(a: number, b: number, c: number): { x: number; y: number; steps: string[] } {
  const x = -b / (2 * a);
  const y = a * x * x + b * x + c;
  
  const steps = [
    `Parábola: y = ${a}x² + ${b}x + ${c}`,
    `Coordenada x del vértice: x = -b/(2a) = -${b}/(2(${a})) = ${x}`,
    `Coordenada y del vértice: y = ${a}(${x})² + ${b}(${x}) + ${c} = ${y}`,
    `Vértice: (${x}, ${y})`
  ];
  
  return { x, y, steps };
}

/**
 * Evalúa una expresión algebraica simple
 */
export function evaluateExpression(expression: string, x: number): number {
  // Reemplazar x con el valor dado
  const expr = expression.replace(/x/g, x.toString());
  
  // Evaluar la expresión (solo para expresiones simples y seguras)
  try {
    // Solo permitir operaciones matemáticas básicas
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
      throw new Error('Expresión no válida');
    }
    
    return Function(`"use strict"; return (${expr})`)();
  } catch {
    throw new Error('Error al evaluar la expresión');
  }
}
