/**
 * Utilidades para progresiones aritméticas y geométricas
 */

export interface ProgressionResult {
  result: number;
  formula: string;
  steps: string[];
  explanation: string;
}

export interface ProgressionTerms {
  terms: number[];
  formula: string;
  steps: string[];
}

/**
 * Calcula el n-ésimo término de una progresión aritmética
 */
export function arithmeticNthTerm(a1: number, d: number, n: number): ProgressionResult {
  if (n < 1) {
    throw new Error('n debe ser mayor o igual a 1');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('n debe ser un número entero');
  }
  
  const result = a1 + (n - 1) * d;
  
  const formula = `aₙ = a₁ + (n-1)d`;
  const steps = [
    `Fórmula del n-ésimo término: aₙ = a₁ + (n-1)d`,
    `a₁ = ${a1}, d = ${d}, n = ${n}`,
    `aₙ = ${a1} + (${n}-1) × ${d}`,
    `aₙ = ${a1} + ${n - 1} × ${d}`,
    `aₙ = ${a1} + ${(n - 1) * d}`,
    `aₙ = ${result}`
  ];
  
  const explanation = `El ${n}-ésimo término de la progresión aritmética con primer término ${a1} y diferencia común ${d} es ${result}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula la suma de los primeros n términos de una progresión aritmética
 */
export function arithmeticSum(a1: number, d: number, n: number): ProgressionResult {
  if (n < 1) {
    throw new Error('n debe ser mayor o igual a 1');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('n debe ser un número entero');
  }
  
  const an = a1 + (n - 1) * d;
  const result = (n / 2) * (a1 + an);
  
  const formula = `Sₙ = (n/2)(a₁ + aₙ)`;
  const steps = [
    `Fórmula de la suma: Sₙ = (n/2)(a₁ + aₙ)`,
    `a₁ = ${a1}, d = ${d}, n = ${n}`,
    `Primero calculamos aₙ:`,
    `aₙ = a₁ + (n-1)d = ${a1} + (${n}-1) × ${d} = ${an}`,
    `Ahora calculamos la suma:`,
    `Sₙ = (${n}/2)(${a1} + ${an})`,
    `Sₙ = ${n / 2} × ${a1 + an}`,
    `Sₙ = ${result}`
  ];
  
  const explanation = `La suma de los primeros ${n} términos de la progresión aritmética con primer término ${a1} y diferencia común ${d} es ${result}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el n-ésimo término de una progresión geométrica
 */
export function geometricNthTerm(a1: number, r: number, n: number): ProgressionResult {
  if (n < 1) {
    throw new Error('n debe ser mayor o igual a 1');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('n debe ser un número entero');
  }
  
  const result = a1 * Math.pow(r, n - 1);
  
  const formula = `aₙ = a₁ × r^(n-1)`;
  const steps = [
    `Fórmula del n-ésimo término: aₙ = a₁ × r^(n-1)`,
    `a₁ = ${a1}, r = ${r}, n = ${n}`,
    `aₙ = ${a1} × ${r}^(${n}-1)`,
    `aₙ = ${a1} × ${r}^${n - 1}`,
    `aₙ = ${a1} × ${Math.pow(r, n - 1)}`,
    `aₙ = ${result}`
  ];
  
  const explanation = `El ${n}-ésimo término de la progresión geométrica con primer término ${a1} y razón común ${r} es ${result}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula la suma de los primeros n términos de una progresión geométrica
 */
export function geometricSum(a1: number, r: number, n: number): ProgressionResult {
  if (n < 1) {
    throw new Error('n debe ser mayor o igual a 1');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('n debe ser un número entero');
  }
  
  let result: number;
  let formula: string;
  let steps: string[];
  
  if (r === 1) {
    result = a1 * n;
    formula = `Sₙ = a₁ × n (cuando r = 1)`;
    steps = [
      `Cuando r = 1, todos los términos son iguales a a₁`,
      `Sₙ = a₁ × n`,
      `Sₙ = ${a1} × ${n}`,
      `Sₙ = ${result}`
    ];
  } else {
    result = a1 * (Math.pow(r, n) - 1) / (r - 1);
    formula = `Sₙ = a₁(r^n - 1)/(r - 1)`;
    steps = [
      `Fórmula de la suma: Sₙ = a₁(r^n - 1)/(r - 1)`,
      `a₁ = ${a1}, r = ${r}, n = ${n}`,
      `Sₙ = ${a1}(${r}^${n} - 1)/(${r} - 1)`,
      `Sₙ = ${a1}(${Math.pow(r, n)} - 1)/${r - 1}`,
      `Sₙ = ${a1} × ${Math.pow(r, n) - 1}/${r - 1}`,
      `Sₙ = ${result}`
    ];
  }
  
  const explanation = `La suma de los primeros ${n} términos de la progresión geométrica con primer término ${a1} y razón común ${r} es ${result}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula la suma infinita de una progresión geométrica (cuando |r| < 1)
 */
export function geometricInfiniteSum(a1: number, r: number): ProgressionResult {
  if (Math.abs(r) >= 1) {
    throw new Error('La suma infinita solo converge cuando |r| < 1');
  }
  
  const result = a1 / (1 - r);
  
  const formula = `S∞ = a₁/(1 - r)`;
  const steps = [
    `Fórmula de la suma infinita: S∞ = a₁/(1 - r)`,
    `a₁ = ${a1}, r = ${r}`,
    `Como |r| = ${Math.abs(r)} < 1, la serie converge`,
    `S∞ = ${a1}/(1 - ${r})`,
    `S∞ = ${a1}/${1 - r}`,
    `S∞ = ${result}`
  ];
  
  const explanation = `La suma infinita de la progresión geométrica con primer término ${a1} y razón común ${r} converge a ${result} porque |r| = ${Math.abs(r)} < 1.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Genera los primeros n términos de una progresión aritmética
 */
export function generateArithmeticTerms(a1: number, d: number, n: number): ProgressionTerms {
  if (n < 1) {
    throw new Error('n debe ser mayor o igual a 1');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('n debe ser un número entero');
  }
  
  const terms: number[] = [];
  const steps: string[] = [];
  
  steps.push(`Progresión aritmética: a₁ = ${a1}, d = ${d}`);
  steps.push(`Términos:`);
  
  for (let i = 0; i < n; i++) {
    const term = a1 + i * d;
    terms.push(term);
    steps.push(`a${i + 1} = ${a1} + ${i} × ${d} = ${term}`);
  }
  
  const formula = `aₙ = ${a1} + (n-1) × ${d}`;
  
  return {
    terms,
    formula,
    steps
  };
}

/**
 * Genera los primeros n términos de una progresión geométrica
 */
export function generateGeometricTerms(a1: number, r: number, n: number): ProgressionTerms {
  if (n < 1) {
    throw new Error('n debe ser mayor o igual a 1');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('n debe ser un número entero');
  }
  
  const terms: number[] = [];
  const steps: string[] = [];
  
  steps.push(`Progresión geométrica: a₁ = ${a1}, r = ${r}`);
  steps.push(`Términos:`);
  
  for (let i = 0; i < n; i++) {
    const term = a1 * Math.pow(r, i);
    terms.push(term);
    steps.push(`a${i + 1} = ${a1} × ${r}^${i} = ${term}`);
  }
  
  const formula = `aₙ = ${a1} × ${r}^(n-1)`;
  
  return {
    terms,
    formula,
    steps
  };
}

/**
 * Encuentra la diferencia común de una progresión aritmética dados dos términos
 */
export function findArithmeticDifference(a1: number, an: number, n: number): ProgressionResult {
  if (n < 2) {
    throw new Error('n debe ser mayor o igual a 2');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('n debe ser un número entero');
  }
  
  const result = (an - a1) / (n - 1);
  
  const formula = `d = (aₙ - a₁)/(n - 1)`;
  const steps = [
    `Fórmula para encontrar la diferencia: d = (aₙ - a₁)/(n - 1)`,
    `a₁ = ${a1}, aₙ = ${an}, n = ${n}`,
    `d = (${an} - ${a1})/(${n} - 1)`,
    `d = ${an - a1}/${n - 1}`,
    `d = ${result}`
  ];
  
  const explanation = `La diferencia común de la progresión aritmética con primer término ${a1} y ${n}-ésimo término ${an} es ${result}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Encuentra la razón común de una progresión geométrica dados dos términos
 */
export function findGeometricRatio(a1: number, an: number, n: number): ProgressionResult {
  if (n < 2) {
    throw new Error('n debe ser mayor o igual a 2');
  }
  
  if (!Number.isInteger(n)) {
    throw new Error('n debe ser un número entero');
  }
  
  if (a1 === 0) {
    throw new Error('El primer término no puede ser cero');
  }
  
  const result = Math.pow(an / a1, 1 / (n - 1));
  
  const formula = `r = (aₙ/a₁)^(1/(n-1))`;
  const steps = [
    `Fórmula para encontrar la razón: r = (aₙ/a₁)^(1/(n-1))`,
    `a₁ = ${a1}, aₙ = ${an}, n = ${n}`,
    `r = (${an}/${a1})^(1/(${n}-1))`,
    `r = (${an / a1})^(1/${n - 1})`,
    `r = ${result}`
  ];
  
  const explanation = `La razón común de la progresión geométrica con primer término ${a1} y ${n}-ésimo término ${an} es ${result}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Verifica si una secuencia es una progresión aritmética
 */
export function isArithmeticProgression(terms: number[]): { isArithmetic: boolean; difference?: number; steps: string[] } {
  if (terms.length < 2) {
    return {
      isArithmetic: false,
      steps: ['Se necesitan al menos 2 términos para verificar una progresión aritmética']
    };
  }
  
  const steps: string[] = [];
  steps.push(`Verificando si la secuencia [${terms.join(', ')}] es una progresión aritmética:`);
  
  const differences: number[] = [];
  for (let i = 1; i < terms.length; i++) {
    const diff = terms[i] - terms[i - 1];
    differences.push(diff);
    steps.push(`d${i} = a${i + 1} - a${i} = ${terms[i]} - ${terms[i - 1]} = ${diff}`);
  }
  
  const firstDifference = differences[0];
  const isArithmetic = differences.every(diff => diff === firstDifference);
  
  if (isArithmetic) {
    steps.push(`Todas las diferencias son iguales a ${firstDifference}`);
    steps.push(`✓ Es una progresión aritmética con diferencia común d = ${firstDifference}`);
  } else {
    steps.push(`Las diferencias no son todas iguales: [${differences.join(', ')}]`);
    steps.push(`✗ No es una progresión aritmética`);
  }
  
  return {
    isArithmetic,
    difference: isArithmetic ? firstDifference : undefined,
    steps
  };
}

/**
 * Verifica si una secuencia es una progresión geométrica
 */
export function isGeometricProgression(terms: number[]): { isGeometric: boolean; ratio?: number; steps: string[] } {
  if (terms.length < 2) {
    return {
      isGeometric: false,
      steps: ['Se necesitan al menos 2 términos para verificar una progresión geométrica']
    };
  }
  
  const steps: string[] = [];
  steps.push(`Verificando si la secuencia [${terms.join(', ')}] es una progresión geométrica:`);
  
  const ratios: number[] = [];
  for (let i = 1; i < terms.length; i++) {
    if (terms[i - 1] === 0) {
      return {
        isGeometric: false,
        steps: [...steps, 'No se puede calcular la razón cuando hay un término cero']
      };
    }
    const ratio = terms[i] / terms[i - 1];
    ratios.push(ratio);
    steps.push(`r${i} = a${i + 1}/a${i} = ${terms[i]}/${terms[i - 1]} = ${ratio}`);
  }
  
  const firstRatio = ratios[0];
  const isGeometric = ratios.every(ratio => Math.abs(ratio - firstRatio) < 1e-10);
  
  if (isGeometric) {
    steps.push(`Todas las razones son iguales a ${firstRatio}`);
    steps.push(`✓ Es una progresión geométrica con razón común r = ${firstRatio}`);
  } else {
    steps.push(`Las razones no son todas iguales: [${ratios.join(', ')}]`);
    steps.push(`✗ No es una progresión geométrica`);
  }
  
  return {
    isGeometric,
    ratio: isGeometric ? firstRatio : undefined,
    steps
  };
}
