/**
 * Utilidades para combinatoria
 */

export interface CombinatoricsResult {
  result: number;
  formula: string;
  steps: string[];
  explanation: string;
}

/**
 * Calcula el factorial de un número
 */
export function factorial(n: number): CombinatoricsResult {
  if (n < 0) {
    throw new Error('El factorial no está definido para números negativos');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('El factorial solo está definido para números enteros');
  }
  
  if (n > 170) {
    throw new Error('El número es demasiado grande para calcular el factorial');
  }
  
  let result = 1;
  const steps: string[] = [];
  
  if (n === 0 || n === 1) {
    result = 1;
    steps.push(`${n}! = 1`);
  } else {
    steps.push(`${n}! = ${n} × ${n - 1} × ${n - 2} × ... × 1`);
    steps.push(`${n}! = `);
    
    let calculation = '';
    for (let i = n; i >= 1; i--) {
      result *= i;
      calculation += i.toString();
      if (i > 1) calculation += ' × ';
    }
    
    steps.push(`${n}! = ${calculation}`);
    steps.push(`${n}! = ${result}`);
  }
  
  const explanation = `El factorial de ${n} (${n}!) es el producto de todos los números enteros positivos desde 1 hasta ${n}.`;
  
  return {
    result,
    formula: `${n}!`,
    steps,
    explanation
  };
}

/**
 * Calcula permutaciones sin repetición P(n,r) = n!/(n-r)!
 */
export function permutations(n: number, r: number): CombinatoricsResult {
  if (n < 0 || r < 0) {
    throw new Error('Los valores deben ser no negativos');
  }
  
  if (!Number.isInteger(n) || !Number.isInteger(r)) {
    throw new Error('Los valores deben ser números enteros');
  }
  
  if (r > n) {
    throw new Error('r no puede ser mayor que n');
  }
  
  const nFactorial = factorial(n).result;
  const nMinusRFactorial = factorial(n - r).result;
  const result = nFactorial / nMinusRFactorial;
  
  const formula = `P(${n},${r}) = ${n}!/(${n}-${r})!`;
  const steps = [
    `P(${n},${r}) = ${n}!/(${n}-${r})!`,
    `P(${n},${r}) = ${n}!/${n - r}!`,
    `P(${n},${r}) = ${nFactorial}/${nMinusRFactorial}`,
    `P(${n},${r}) = ${result}`
  ];
  
  const explanation = `Las permutaciones P(${n},${r}) representan el número de formas de ordenar ${r} elementos de un conjunto de ${n} elementos, donde el orden importa y no hay repetición.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula combinaciones sin repetición C(n,r) = n!/(r!(n-r)!)
 */
export function combinations(n: number, r: number): CombinatoricsResult {
  if (n < 0 || r < 0) {
    throw new Error('Los valores deben ser no negativos');
  }
  
  if (!Number.isInteger(n) || !Number.isInteger(r)) {
    throw new Error('Los valores deben ser números enteros');
  }
  
  if (r > n) {
    throw new Error('r no puede ser mayor que n');
  }
  
  const nFactorial = factorial(n).result;
  const rFactorial = factorial(r).result;
  const nMinusRFactorial = factorial(n - r).result;
  const result = nFactorial / (rFactorial * nMinusRFactorial);
  
  const formula = `C(${n},${r}) = ${n}!/(${r}!(${n}-${r})!)`;
  const steps = [
    `C(${n},${r}) = ${n}!/(${r}!(${n}-${r})!)`,
    `C(${n},${r}) = ${n}!/(${r}! × ${n - r}!)`,
    `C(${n},${r}) = ${nFactorial}/(${rFactorial} × ${nMinusRFactorial})`,
    `C(${n},${r}) = ${nFactorial}/${rFactorial * nMinusRFactorial}`,
    `C(${n},${r}) = ${result}`
  ];
  
  const explanation = `Las combinaciones C(${n},${r}) representan el número de formas de seleccionar ${r} elementos de un conjunto de ${n} elementos, donde el orden no importa y no hay repetición.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula permutaciones con repetición
 */
export function permutationsWithRepetition(n: number, r: number): CombinatoricsResult {
  if (n < 0 || r < 0) {
    throw new Error('Los valores deben ser no negativos');
  }
  
  if (!Number.isInteger(n) || !Number.isInteger(r)) {
    throw new Error('Los valores deben ser números enteros');
  }
  
  const result = Math.pow(n, r);
  
  const formula = `P^r(${n},${r}) = ${n}^${r}`;
  const steps = [
    `P^r(${n},${r}) = ${n}^${r}`,
    `P^r(${n},${r}) = ${result}`
  ];
  
  const explanation = `Las permutaciones con repetición P^r(${n},${r}) representan el número de formas de ordenar ${r} elementos de un conjunto de ${n} elementos, donde el orden importa y sí hay repetición.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula combinaciones con repetición
 */
export function combinationsWithRepetition(n: number, r: number): CombinatoricsResult {
  if (n < 0 || r < 0) {
    throw new Error('Los valores deben ser no negativos');
  }
  
  if (!Number.isInteger(n) || !Number.isInteger(r)) {
    throw new Error('Los valores deben ser números enteros');
  }
  
  const numerator = factorial(n + r - 1).result;
  const denominator = factorial(r).result * factorial(n - 1).result;
  const result = numerator / denominator;
  
  const formula = `C^r(${n},${r}) = (${n}+${r}-1)!/(${r}!(${n}-1)!)`;
  const steps = [
    `C^r(${n},${r}) = (${n}+${r}-1)!/(${r}!(${n}-1)!)`,
    `C^r(${n},${r}) = ${n + r - 1}!/(${r}! × ${n - 1}!)`,
    `C^r(${n},${r}) = ${numerator}/(${denominator})`,
    `C^r(${n},${r}) = ${result}`
  ];
  
  const explanation = `Las combinaciones con repetición C^r(${n},${r}) representan el número de formas de seleccionar ${r} elementos de un conjunto de ${n} elementos, donde el orden no importa y sí hay repetición.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el número de subconjuntos de un conjunto
 */
export function numberOfSubsets(n: number): CombinatoricsResult {
  if (n < 0) {
    throw new Error('El número de elementos debe ser no negativo');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('El número de elementos debe ser un entero');
  }
  
  const result = Math.pow(2, n);
  
  const formula = `2^${n}`;
  const steps = [
    `Número de subconjuntos de un conjunto con ${n} elementos = 2^${n}`,
    `2^${n} = ${result}`
  ];
  
  const explanation = `Un conjunto con ${n} elementos tiene 2^${n} subconjuntos, incluyendo el conjunto vacío y el conjunto completo.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el número de permutaciones circulares
 */
export function circularPermutations(n: number): CombinatoricsResult {
  if (n < 0) {
    throw new Error('El número de elementos debe ser no negativo');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('El número de elementos debe ser un entero');
  }
  
  if (n === 0) {
    return {
      result: 0,
      formula: '0',
      steps: ['No hay permutaciones circulares para 0 elementos'],
      explanation: 'No hay permutaciones circulares para 0 elementos.'
    };
  }
  
  const result = factorial(n - 1).result;
  
  const formula = `(${n}-1)!`;
  const steps = [
    `Permutaciones circulares de ${n} elementos = (${n}-1)!`,
    `(${n}-1)! = ${n - 1}!`,
    `(${n}-1)! = ${result}`
  ];
  
  const explanation = `Las permutaciones circulares de ${n} elementos son (${n}-1)! porque en un círculo, una rotación no cuenta como una permutación diferente.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el número de arreglos con elementos indistinguibles
 */
export function arrangementsWithIndistinguishable(n: number, ...groups: number[]): CombinatoricsResult {
  if (n < 0 || groups.some(g => g < 0)) {
    throw new Error('Los valores deben ser no negativos');
  }
  
  if (!Number.isInteger(n) || groups.some(g => !Number.isInteger(g))) {
    throw new Error('Los valores deben ser números enteros');
  }
  
  const sumOfGroups = groups.reduce((sum, g) => sum + g, 0);
  if (sumOfGroups !== n) {
    throw new Error('La suma de los grupos debe ser igual a n');
  }
  
  const numerator = factorial(n).result;
  const denominator = groups.reduce((prod, g) => prod * factorial(g).result, 1);
  const result = numerator / denominator;
  
  const formula = `${n}!/(${groups.map(g => `${g}!`).join(' × ')})`;
  const steps = [
    `Arreglos con elementos indistinguibles = ${n}!/(${groups.map(g => `${g}!`).join(' × ')})`,
    `= ${numerator}/${denominator}`,
    `= ${result}`
  ];
  
  const explanation = `El número de arreglos de ${n} elementos donde hay ${groups.length} grupos de elementos indistinguibles (con ${groups.join(', ')} elementos respectivamente) es ${n}! dividido por el producto de los factoriales de cada grupo.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el coeficiente binomial usando el triángulo de Pascal
 */
export function binomialCoefficient(n: number, k: number): CombinatoricsResult {
  return combinations(n, k);
}

/**
 * Genera los primeros n números del triángulo de Pascal
 */
export function pascalsTriangle(n: number): number[][] {
  if (n < 0) {
    throw new Error('n debe ser no negativo');
  }
  
  const triangle: number[][] = [];
  
  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        row.push(1);
      } else {
        row.push(triangle[i - 1][j - 1] + triangle[i - 1][j]);
      }
    }
    triangle.push(row);
  }
  
  return triangle;
}
