/**
 * Utilidades para logaritmos
 */

export interface LogResult {
  result: number;
  formula: string;
  steps: string[];
  explanation: string;
}

/**
 * Calcula el logaritmo en base b de x
 */
export function logBase(x: number, base: number): LogResult {
  if (x <= 0) {
    throw new Error('El argumento del logaritmo debe ser positivo');
  }
  
  if (base <= 0 || base === 1) {
    throw new Error('La base del logaritmo debe ser positiva y diferente de 1');
  }
  
  const result = Math.log(x) / Math.log(base);
  
  const formula = `log_${base}(${x})`;
  const steps = [
    `log_${base}(${x}) = ln(${x}) / ln(${base})`,
    `log_${base}(${x}) = ${Math.log(x)} / ${Math.log(base)}`,
    `log_${base}(${x}) = ${result}`
  ];
  
  const explanation = `El logaritmo en base ${base} de ${x} es ${result}. Esto significa que ${base}^${result} = ${x}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el logaritmo natural (base e)
 */
export function ln(x: number): LogResult {
  if (x <= 0) {
    throw new Error('El argumento del logaritmo natural debe ser positivo');
  }
  
  const result = Math.log(x);
  
  const formula = `ln(${x})`;
  const steps = [
    `ln(${x}) = ${result}`
  ];
  
  const explanation = `El logaritmo natural de ${x} es ${result}. Esto significa que e^${result} = ${x}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el logaritmo en base 10
 */
export function log10(x: number): LogResult {
  if (x <= 0) {
    throw new Error('El argumento del logaritmo debe ser positivo');
  }
  
  const result = Math.log10(x);
  
  const formula = `log₁₀(${x})`;
  const steps = [
    `log₁₀(${x}) = ${result}`
  ];
  
  const explanation = `El logaritmo en base 10 de ${x} es ${result}. Esto significa que 10^${result} = ${x}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el logaritmo en base 2
 */
export function log2(x: number): LogResult {
  if (x <= 0) {
    throw new Error('El argumento del logaritmo debe ser positivo');
  }
  
  const result = Math.log2(x);
  
  const formula = `log₂(${x})`;
  const steps = [
    `log₂(${x}) = ${result}`
  ];
  
  const explanation = `El logaritmo en base 2 de ${x} es ${result}. Esto significa que 2^${result} = ${x}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Cambia la base de un logaritmo
 */
export function changeBase(x: number, fromBase: number, toBase: number): LogResult {
  if (x <= 0) {
    throw new Error('El argumento del logaritmo debe ser positivo');
  }
  
  if (fromBase <= 0 || fromBase === 1) {
    throw new Error('La base origen debe ser positiva y diferente de 1');
  }
  
  if (toBase <= 0 || toBase === 1) {
    throw new Error('La base destino debe ser positiva y diferente de 1');
  }
  
  const result = Math.log(x) / Math.log(toBase);
  
  const formula = `log_${toBase}(${x})`;
  const steps = [
    `Cambio de base: log_${toBase}(${x}) = log_${fromBase}(${x}) / log_${fromBase}(${toBase})`,
    `log_${toBase}(${x}) = ln(${x}) / ln(${toBase})`,
    `log_${toBase}(${x}) = ${Math.log(x)} / ${Math.log(toBase)}`,
    `log_${toBase}(${x}) = ${result}`
  ];
  
  const explanation = `El logaritmo en base ${toBase} de ${x} es ${result}. Esto significa que ${toBase}^${result} = ${x}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el antilogaritmo (base elevada al logaritmo)
 */
export function antilog(base: number, logarithm: number): LogResult {
  if (base <= 0) {
    throw new Error('La base debe ser positiva');
  }
  
  const result = Math.pow(base, logarithm);
  
  const formula = `${base}^${logarithm}`;
  const steps = [
    `Antilogaritmo: ${base}^${logarithm} = ${result}`
  ];
  
  const explanation = `El antilogaritmo de ${logarithm} en base ${base} es ${result}. Esto significa que log_${base}(${result}) = ${logarithm}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el logaritmo de un producto
 */
export function logProduct(x: number, y: number, base: number = 10): LogResult {
  if (x <= 0 || y <= 0) {
    throw new Error('Los argumentos del logaritmo deben ser positivos');
  }
  
  if (base <= 0 || base === 1) {
    throw new Error('La base debe ser positiva y diferente de 1');
  }
  
  const result = Math.log(x * y) / Math.log(base);
  
  const formula = `log_${base}(${x} × ${y})`;
  const steps = [
    `Propiedad del logaritmo de un producto:`,
    `log_${base}(${x} × ${y}) = log_${base}(${x}) + log_${base}(${y})`,
    `log_${base}(${x} × ${y}) = ${Math.log(x) / Math.log(base)} + ${Math.log(y) / Math.log(base)}`,
    `log_${base}(${x} × ${y}) = ${result}`
  ];
  
  const explanation = `El logaritmo del producto ${x} × ${y} en base ${base} es ${result}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el logaritmo de un cociente
 */
export function logQuotient(x: number, y: number, base: number = 10): LogResult {
  if (x <= 0 || y <= 0) {
    throw new Error('Los argumentos del logaritmo deben ser positivos');
  }
  
  if (base <= 0 || base === 1) {
    throw new Error('La base debe ser positiva y diferente de 1');
  }
  
  const result = Math.log(x / y) / Math.log(base);
  
  const formula = `log_${base}(${x} ÷ ${y})`;
  const steps = [
    `Propiedad del logaritmo de un cociente:`,
    `log_${base}(${x} ÷ ${y}) = log_${base}(${x}) - log_${base}(${y})`,
    `log_${base}(${x} ÷ ${y}) = ${Math.log(x) / Math.log(base)} - ${Math.log(y) / Math.log(base)}`,
    `log_${base}(${x} ÷ ${y}) = ${result}`
  ];
  
  const explanation = `El logaritmo del cociente ${x} ÷ ${y} en base ${base} es ${result}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el logaritmo de una potencia
 */
export function logPower(x: number, exponent: number, base: number = 10): LogResult {
  if (x <= 0) {
    throw new Error('El argumento del logaritmo debe ser positivo');
  }
  
  if (base <= 0 || base === 1) {
    throw new Error('La base debe ser positiva y diferente de 1');
  }
  
  const result = Math.log(Math.pow(x, exponent)) / Math.log(base);
  
  const formula = `log_${base}(${x}^${exponent})`;
  const steps = [
    `Propiedad del logaritmo de una potencia:`,
    `log_${base}(${x}^${exponent}) = ${exponent} × log_${base}(${x})`,
    `log_${base}(${x}^${exponent}) = ${exponent} × ${Math.log(x) / Math.log(base)}`,
    `log_${base}(${x}^${exponent}) = ${result}`
  ];
  
  const explanation = `El logaritmo de ${x}^${exponent} en base ${base} es ${result}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el logaritmo de una raíz
 */
export function logRoot(x: number, rootIndex: number, base: number = 10): LogResult {
  if (x <= 0) {
    throw new Error('El argumento del logaritmo debe ser positivo');
  }
  
  if (rootIndex <= 0) {
    throw new Error('El índice de la raíz debe ser positivo');
  }
  
  if (base <= 0 || base === 1) {
    throw new Error('La base debe ser positiva y diferente de 1');
  }
  
  const result = Math.log(Math.pow(x, 1 / rootIndex)) / Math.log(base);
  
  const formula = `log_${base}(√[${rootIndex}](${x}))`;
  const steps = [
    `Propiedad del logaritmo de una raíz:`,
    `log_${base}(√[${rootIndex}](${x})) = (1/${rootIndex}) × log_${base}(${x})`,
    `log_${base}(√[${rootIndex}](${x})) = (1/${rootIndex}) × ${Math.log(x) / Math.log(base)}`,
    `log_${base}(√[${rootIndex}](${x})) = ${result}`
  ];
  
  const explanation = `El logaritmo de la raíz ${rootIndex}-ésima de ${x} en base ${base} es ${result}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Resuelve ecuaciones logarítmicas simples
 */
export function solveLogEquation(base: number, result: number): LogResult {
  if (base <= 0 || base === 1) {
    throw new Error('La base debe ser positiva y diferente de 1');
  }
  
  const x = Math.pow(base, result);
  
  const formula = `log_${base}(x) = ${result}`;
  const steps = [
    `Ecuación: log_${base}(x) = ${result}`,
    `Aplicando la definición de logaritmo:`,
    `x = ${base}^${result}`,
    `x = ${x}`
  ];
  
  const explanation = `La solución de la ecuación log_${base}(x) = ${result} es x = ${x}.`;
  
  return {
    result: x,
    formula,
    steps,
    explanation
  };
}

/**
 * Convierte entre escalas logarítmicas
 */
export function convertLogScale(value: number, fromBase: number, toBase: number): LogResult {
  if (value <= 0) {
    throw new Error('El valor debe ser positivo');
  }
  
  if (fromBase <= 0 || fromBase === 1 || toBase <= 0 || toBase === 1) {
    throw new Error('Las bases deben ser positivas y diferentes de 1');
  }
  
  const result = Math.pow(toBase, Math.log(value) / Math.log(fromBase));
  
  const formula = `Convertir ${value} de escala log_${fromBase} a escala log_${toBase}`;
  const steps = [
    `Conversión de escala logarítmica:`,
    `Valor en escala log_${toBase} = ${toBase}^(log_${fromBase}(${value}))`,
    `Valor en escala log_${toBase} = ${toBase}^(${Math.log(value) / Math.log(fromBase)})`,
    `Valor en escala log_${toBase} = ${result}`
  ];
  
  const explanation = `El valor ${value} en escala logarítmica base ${fromBase} equivale a ${result} en escala logarítmica base ${toBase}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula el pH (logaritmo negativo en base 10)
 */
export function calculatePH(hydrogenIonConcentration: number): LogResult {
  if (hydrogenIonConcentration <= 0) {
    throw new Error('La concentración de iones hidrógeno debe ser positiva');
  }
  
  const result = -Math.log10(hydrogenIonConcentration);
  
  const formula = `pH = -log₁₀([H⁺])`;
  const steps = [
    `pH = -log₁₀([H⁺])`,
    `pH = -log₁₀(${hydrogenIonConcentration})`,
    `pH = -${Math.log10(hydrogenIonConcentration)}`,
    `pH = ${result}`
  ];
  
  const explanation = `El pH de una solución con concentración de iones hidrógeno ${hydrogenIonConcentration} M es ${result}.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}

/**
 * Calcula la concentración de iones hidrógeno a partir del pH
 */
export function calculateHydrogenIonConcentration(pH: number): LogResult {
  const result = Math.pow(10, -pH);
  
  const formula = `[H⁺] = 10^(-pH)`;
  const steps = [
    `[H⁺] = 10^(-pH)`,
    `[H⁺] = 10^(-${pH})`,
    `[H⁺] = ${result}`
  ];
  
  const explanation = `La concentración de iones hidrógeno de una solución con pH ${pH} es ${result} M.`;
  
  return {
    result,
    formula,
    steps,
    explanation
  };
}
