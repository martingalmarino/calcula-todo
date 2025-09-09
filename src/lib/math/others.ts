/**
 * Funciones matemáticas para calculadoras OTRAS
 */

export interface GradeScaleResult {
  grade: string;
  percentage: number;
  description: string;
}

export interface GasExpenseResult {
  totalCost: number;
  costPerKm: number;
  costPerLiter: number;
  breakdown: {
    fuelCost: number;
    distance: number;
    consumption: number;
  };
}

export interface WordCountResult {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number; // en minutos
}

export interface RomanNumeralResult {
  roman: string;
  arabic: number;
  isValid: boolean;
}

export interface ClickTestResult {
  clicks: number;
  timeElapsed: number; // en segundos
  cps: number; // clicks per second
  averageTime: number; // tiempo promedio entre clicks en ms
}

/**
 * Convierte una nota numérica a escala de letras
 */
export function convertToGradeScale(score: number, maxScore: number = 100): GradeScaleResult {
  if (score < 0 || maxScore <= 0) {
    throw new Error('La puntuación y la puntuación máxima deben ser valores positivos');
  }

  const percentage = (score / maxScore) * 100;
  let grade: string;
  let description: string;

  if (percentage >= 90) {
    grade = 'A';
    description = 'Excelente';
  } else if (percentage >= 80) {
    grade = 'B';
    description = 'Bueno';
  } else if (percentage >= 70) {
    grade = 'C';
    description = 'Satisfactorio';
  } else if (percentage >= 60) {
    grade = 'D';
    description = 'Aprobado';
  } else {
    grade = 'F';
    description = 'Reprobado';
  }

  return {
    grade,
    percentage: Math.round(percentage * 10) / 10,
    description
  };
}

/**
 * Calcula el gasto de gasolina
 */
export function calculateGasExpense(
  distance: number, // km
  consumption: number, // L/100km
  pricePerLiter: number // precio por litro
): GasExpenseResult {
  if (distance <= 0 || consumption <= 0 || pricePerLiter <= 0) {
    throw new Error('Todos los valores deben ser positivos');
  }

  const litersUsed = (distance * consumption) / 100;
  const fuelCost = litersUsed * pricePerLiter;
  const costPerKm = fuelCost / distance;
  const costPerLiter = pricePerLiter;

  return {
    totalCost: Math.round(fuelCost * 100) / 100,
    costPerKm: Math.round(costPerKm * 100) / 100,
    costPerLiter: Math.round(costPerLiter * 100) / 100,
    breakdown: {
      fuelCost: Math.round(fuelCost * 100) / 100,
      distance,
      consumption: Math.round(litersUsed * 100) / 100
    }
  };
}

/**
 * Cuenta palabras, caracteres y otros elementos de texto
 */
export function countWordsAndCharacters(text: string): WordCountResult {
  if (!text) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: 0
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200); // 200 palabras por minuto

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    readingTime
  };
}

/**
 * Convierte números arábigos a romanos
 */
export function arabicToRoman(num: number): RomanNumeralResult {
  if (num <= 0 || num > 3999) {
    return {
      roman: '',
      arabic: num,
      isValid: false
    };
  }

  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  let result = '';
  let remaining = num;

  for (let i = 0; i < values.length; i++) {
    const count = Math.floor(remaining / values[i]);
    result += symbols[i].repeat(count);
    remaining -= values[i] * count;
  }

  return {
    roman: result,
    arabic: num,
    isValid: true
  };
}

/**
 * Convierte números romanos a arábigos
 */
export function romanToArabic(roman: string): RomanNumeralResult {
  if (!roman || !roman.trim()) {
    return {
      roman: roman,
      arabic: 0,
      isValid: false
    };
  }

  const romanUpper = roman.toUpperCase().trim();
  const romanMap: { [key: string]: number } = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
  };

  let result = 0;
  let prevValue = 0;

  for (let i = romanUpper.length - 1; i >= 0; i--) {
    const currentValue = romanMap[romanUpper[i]];
    
    if (currentValue === undefined) {
      return {
        roman: roman,
        arabic: 0,
        isValid: false
      };
    }

    if (currentValue < prevValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }

    prevValue = currentValue;
  }

  return {
    roman: roman,
    arabic: result,
    isValid: true
  };
}

/**
 * Calcula estadísticas de clicks
 */
export function calculateClickStats(clicks: number, timeElapsed: number): ClickTestResult {
  if (clicks < 0 || timeElapsed <= 0) {
    throw new Error('Los clicks y el tiempo deben ser valores válidos');
  }

  const cps = clicks / timeElapsed;
  const averageTime = timeElapsed > 0 ? (timeElapsed * 1000) / clicks : 0;

  return {
    clicks,
    timeElapsed: Math.round(timeElapsed * 100) / 100,
    cps: Math.round(cps * 100) / 100,
    averageTime: Math.round(averageTime * 100) / 100
  };
}
