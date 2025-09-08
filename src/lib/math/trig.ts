/**
 * Utilidades para trigonometría
 */

export interface TrigResult {
  result: number;
  formula: string;
  steps: string[];
}

export type AngleUnit = 'degrees' | 'radians';

/**
 * Convierte grados a radianes
 */
export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Convierte radianes a grados
 */
export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

/**
 * Calcula el seno
 */
export function sin(angle: number, unit: AngleUnit = 'radians'): TrigResult {
  const radianAngle = unit === 'degrees' ? toRadians(angle) : angle;
  const result = Math.sin(radianAngle);
  
  const formula = unit === 'degrees' ? `sin(${angle}°)` : `sin(${angle})`;
  const steps = [
    unit === 'degrees' 
      ? `Convertir ${angle}° a radianes: ${angle}° × π/180 = ${radianAngle.toFixed(6)} rad`
      : `Ángulo en radianes: ${angle}`,
    `sin(${radianAngle.toFixed(6)}) = ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula el coseno
 */
export function cos(angle: number, unit: AngleUnit = 'radians'): TrigResult {
  const radianAngle = unit === 'degrees' ? toRadians(angle) : angle;
  const result = Math.cos(radianAngle);
  
  const formula = unit === 'degrees' ? `cos(${angle}°)` : `cos(${angle})`;
  const steps = [
    unit === 'degrees' 
      ? `Convertir ${angle}° a radianes: ${angle}° × π/180 = ${radianAngle.toFixed(6)} rad`
      : `Ángulo en radianes: ${angle}`,
    `cos(${radianAngle.toFixed(6)}) = ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula la tangente
 */
export function tan(angle: number, unit: AngleUnit = 'radians'): TrigResult {
  const radianAngle = unit === 'degrees' ? toRadians(angle) : angle;
  const result = Math.tan(radianAngle);
  
  const formula = unit === 'degrees' ? `tan(${angle}°)` : `tan(${angle})`;
  const steps = [
    unit === 'degrees' 
      ? `Convertir ${angle}° a radianes: ${angle}° × π/180 = ${radianAngle.toFixed(6)} rad`
      : `Ángulo en radianes: ${angle}`,
    `tan(${radianAngle.toFixed(6)}) = ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula la cotangente
 */
export function cot(angle: number, unit: AngleUnit = 'radians'): TrigResult {
  const radianAngle = unit === 'degrees' ? toRadians(angle) : angle;
  const tanValue = Math.tan(radianAngle);
  
  if (Math.abs(tanValue) < 1e-10) {
    throw new Error('La cotangente no está definida para este ángulo');
  }
  
  const result = 1 / tanValue;
  
  const formula = unit === 'degrees' ? `cot(${angle}°)` : `cot(${angle})`;
  const steps = [
    unit === 'degrees' 
      ? `Convertir ${angle}° a radianes: ${angle}° × π/180 = ${radianAngle.toFixed(6)} rad`
      : `Ángulo en radianes: ${angle}`,
    `cot(${radianAngle.toFixed(6)}) = 1/tan(${radianAngle.toFixed(6)}) = 1/${tanValue.toFixed(6)} = ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula la secante
 */
export function sec(angle: number, unit: AngleUnit = 'radians'): TrigResult {
  const radianAngle = unit === 'degrees' ? toRadians(angle) : angle;
  const cosValue = Math.cos(radianAngle);
  
  if (Math.abs(cosValue) < 1e-10) {
    throw new Error('La secante no está definida para este ángulo');
  }
  
  const result = 1 / cosValue;
  
  const formula = unit === 'degrees' ? `sec(${angle}°)` : `sec(${angle})`;
  const steps = [
    unit === 'degrees' 
      ? `Convertir ${angle}° a radianes: ${angle}° × π/180 = ${radianAngle.toFixed(6)} rad`
      : `Ángulo en radianes: ${angle}`,
    `sec(${radianAngle.toFixed(6)}) = 1/cos(${radianAngle.toFixed(6)}) = 1/${cosValue.toFixed(6)} = ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula la cosecante
 */
export function csc(angle: number, unit: AngleUnit = 'radians'): TrigResult {
  const radianAngle = unit === 'degrees' ? toRadians(angle) : angle;
  const sinValue = Math.sin(radianAngle);
  
  if (Math.abs(sinValue) < 1e-10) {
    throw new Error('La cosecante no está definida para este ángulo');
  }
  
  const result = 1 / sinValue;
  
  const formula = unit === 'degrees' ? `csc(${angle}°)` : `csc(${angle})`;
  const steps = [
    unit === 'degrees' 
      ? `Convertir ${angle}° a radianes: ${angle}° × π/180 = ${radianAngle.toFixed(6)} rad`
      : `Ángulo en radianes: ${angle}`,
    `csc(${radianAngle.toFixed(6)}) = 1/sin(${radianAngle.toFixed(6)}) = 1/${sinValue.toFixed(6)} = ${result.toFixed(6)}`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula el arcoseno (función inversa del seno)
 */
export function asin(value: number, unit: AngleUnit = 'radians'): TrigResult {
  if (value < -1 || value > 1) {
    throw new Error('El valor debe estar entre -1 y 1 para el arcoseno');
  }
  
  const result = Math.asin(value);
  const resultInUnit = unit === 'degrees' ? toDegrees(result) : result;
  
  const formula = `arcsin(${value})`;
  const steps = [
    `arcsin(${value}) = ${result.toFixed(6)} rad`,
    unit === 'degrees' 
      ? `Convertir a grados: ${result.toFixed(6)} × 180/π = ${resultInUnit.toFixed(6)}°`
      : `Resultado en radianes: ${result.toFixed(6)}`
  ];
  
  return { result: resultInUnit, formula, steps };
}

/**
 * Calcula el arcocoseno (función inversa del coseno)
 */
export function acos(value: number, unit: AngleUnit = 'radians'): TrigResult {
  if (value < -1 || value > 1) {
    throw new Error('El valor debe estar entre -1 y 1 para el arcocoseno');
  }
  
  const result = Math.acos(value);
  const resultInUnit = unit === 'degrees' ? toDegrees(result) : result;
  
  const formula = `arccos(${value})`;
  const steps = [
    `arccos(${value}) = ${result.toFixed(6)} rad`,
    unit === 'degrees' 
      ? `Convertir a grados: ${result.toFixed(6)} × 180/π = ${resultInUnit.toFixed(6)}°`
      : `Resultado en radianes: ${result.toFixed(6)}`
  ];
  
  return { result: resultInUnit, formula, steps };
}

/**
 * Calcula el arcotangente (función inversa de la tangente)
 */
export function atan(value: number, unit: AngleUnit = 'radians'): TrigResult {
  const result = Math.atan(value);
  const resultInUnit = unit === 'degrees' ? toDegrees(result) : result;
  
  const formula = `arctan(${value})`;
  const steps = [
    `arctan(${value}) = ${result.toFixed(6)} rad`,
    unit === 'degrees' 
      ? `Convertir a grados: ${result.toFixed(6)} × 180/π = ${resultInUnit.toFixed(6)}°`
      : `Resultado en radianes: ${result.toFixed(6)}`
  ];
  
  return { result: resultInUnit, formula, steps };
}

/**
 * Calcula la hipotenusa usando el teorema de Pitágoras
 */
export function hypotenuse(a: number, b: number): TrigResult {
  const result = Math.sqrt(a * a + b * b);
  
  const formula = `√(a² + b²)`;
  const steps = [
    `Teorema de Pitágoras: c = √(a² + b²)`,
    `c = √(${a}² + ${b}²)`,
    `c = √(${a * a} + ${b * b})`,
    `c = √${a * a + b * b}`,
    `c = ${result}`
  ];
  
  return { result, formula, steps };
}

/**
 * Calcula un cateto usando el teorema de Pitágoras
 */
export function cathetus(hypotenuse: number, otherCathetus: number): TrigResult {
  if (otherCathetus >= hypotenuse) {
    throw new Error('El cateto debe ser menor que la hipotenusa');
  }
  
  const result = Math.sqrt(hypotenuse * hypotenuse - otherCathetus * otherCathetus);
  
  const formula = `√(c² - b²)`;
  const steps = [
    `Teorema de Pitágoras: a = √(c² - b²)`,
    `a = √(${hypotenuse}² - ${otherCathetus}²)`,
    `a = √(${hypotenuse * hypotenuse} - ${otherCathetus * otherCathetus})`,
    `a = √${hypotenuse * hypotenuse - otherCathetus * otherCathetus}`,
    `a = ${result}`
  ];
  
  return { result, formula, steps };
}

/**
 * Obtiene valores trigonométricos para ángulos especiales
 */
export function specialAngles(unit: AngleUnit = 'degrees'): Array<{
  angle: number;
  sin: number;
  cos: number;
  tan: number;
}> {
  const angles = unit === 'degrees' 
    ? [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360]
    : [0, Math.PI/6, Math.PI/4, Math.PI/3, Math.PI/2, 2*Math.PI/3, 3*Math.PI/4, 5*Math.PI/6, Math.PI, 7*Math.PI/6, 5*Math.PI/4, 4*Math.PI/3, 3*Math.PI/2, 5*Math.PI/3, 7*Math.PI/4, 11*Math.PI/6, 2*Math.PI];
  
  return angles.map(angle => {
    const radianAngle = unit === 'degrees' ? toRadians(angle) : angle;
    return {
      angle,
      sin: Math.sin(radianAngle),
      cos: Math.cos(radianAngle),
      tan: Math.tan(radianAngle)
    };
  });
}
