/**
 * Funciones matemáticas para cálculos de salud
 */

export interface IMCResult {
  imc: number;
  category: string;
  description: string;
  recommendation: string;
}

export interface TMBResult {
  tmb: number;
  method: string;
  explanation: string;
  recommendations: string[];
}

export interface BodyFatResult {
  bodyFat: number;
  category: string;
  description: string;
  recommendations: string[];
}

export interface PaFiResult {
  pafi: number;
  category: string;
  description: string;
  interpretation: string;
}

export interface WaterIntakeResult {
  dailyWater: number;
  glasses: number;
  bottles: number;
  category: string;
  recommendations: string[];
}

export interface OvulationResult {
  nextOvulation: string;
  fertileWindow: {
    start: string;
    end: string;
  };
  nextPeriod: string;
  cycleLength: number;
  recommendations: string[];
}

/**
 * Calcula el Índice de Masa Corporal (IMC)
 */
export function calculateIMC(weight: number, height: number): IMCResult {
  if (weight <= 0 || height <= 0) {
    throw new Error('El peso y la altura deben ser valores positivos');
  }

  const heightInMeters = height / 100; // Convertir cm a metros
  const imc = weight / (heightInMeters * heightInMeters);

  let category: string;
  let description: string;
  let recommendation: string;

  if (imc < 18.5) {
    category = 'Bajo peso';
    description = 'Tu IMC indica bajo peso.';
    recommendation = 'Consulta con un profesional de la salud para evaluar tu estado nutricional.';
  } else if (imc < 25) {
    category = 'Peso normal';
    description = 'Tu IMC está dentro del rango normal.';
    recommendation = 'Mantén una dieta equilibrada y ejercicio regular.';
  } else if (imc < 30) {
    category = 'Sobrepeso';
    description = 'Tu IMC indica sobrepeso.';
    recommendation = 'Considera ajustar tu dieta y aumentar la actividad física.';
  } else {
    category = 'Obesidad';
    description = 'Tu IMC indica obesidad.';
    recommendation = 'Es importante consultar con un profesional de la salud para un plan de tratamiento.';
  }

  return {
    imc: Math.round(imc * 10) / 10,
    category,
    description,
    recommendation
  };
}

/**
 * Calcula la Tasa Metabólica Basal (TMB) usando la fórmula de Mifflin-St Jeor
 */
export function calculateTMB(weight: number, height: number, age: number, gender: 'male' | 'female'): TMBResult {
  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error('Todos los valores deben ser positivos');
  }

  let tmb: number;
  let method: string;
  let explanation: string;

  if (gender === 'male') {
    tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    method = 'Fórmula de Mifflin-St Jeor (Hombres)';
    explanation = 'TMB = (10 × peso) + (6.25 × altura) - (5 × edad) + 5';
  } else {
    tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    method = 'Fórmula de Mifflin-St Jeor (Mujeres)';
    explanation = 'TMB = (10 × peso) + (6.25 × altura) - (5 × edad) - 161';
  }

  const recommendations = [
    'La TMB representa las calorías que tu cuerpo quema en reposo.',
    'Para perder peso, consume menos calorías que tu TMB + actividad física.',
    'Para ganar peso, consume más calorías que tu TMB + actividad física.',
    'Consulta con un nutricionista para un plan personalizado.'
  ];

  return {
    tmb: Math.round(tmb),
    method,
    explanation,
    recommendations
  };
}

/**
 * Calcula el porcentaje de grasa corporal usando la fórmula de Deurenberg
 */
export function calculateBodyFat(weight: number, height: number, age: number, gender: 'male' | 'female'): BodyFatResult {
  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error('Todos los valores deben ser positivos');
  }

  const heightInMeters = height / 100;
  const imc = weight / (heightInMeters * heightInMeters);
  
  let bodyFat: number;
  let category: string;
  let description: string;

  if (gender === 'male') {
    bodyFat = (1.20 * imc) + (0.23 * age) - 16.2;
    category = 'Hombres';
  } else {
    bodyFat = (1.20 * imc) + (0.23 * age) - 5.4;
    category = 'Mujeres';
  }

  // Clasificación del porcentaje de grasa corporal
  if (gender === 'male') {
    if (bodyFat < 6) {
      category = 'Atlético';
      description = 'Porcentaje de grasa muy bajo, típico de atletas.';
    } else if (bodyFat < 14) {
      category = 'Bueno';
      description = 'Porcentaje de grasa saludable y atlético.';
    } else if (bodyFat < 18) {
      category = 'Aceptable';
      description = 'Porcentaje de grasa dentro del rango aceptable.';
    } else if (bodyFat < 25) {
      category = 'Sobrepeso';
      description = 'Porcentaje de grasa elevado.';
    } else {
      category = 'Obesidad';
      description = 'Porcentaje de grasa muy elevado.';
    }
  } else {
    if (bodyFat < 16) {
      category = 'Atlético';
      description = 'Porcentaje de grasa muy bajo, típico de atletas.';
    } else if (bodyFat < 20) {
      category = 'Bueno';
      description = 'Porcentaje de grasa saludable y atlético.';
    } else if (bodyFat < 25) {
      category = 'Aceptable';
      description = 'Porcentaje de grasa dentro del rango aceptable.';
    } else if (bodyFat < 32) {
      category = 'Sobrepeso';
      description = 'Porcentaje de grasa elevado.';
    } else {
      category = 'Obesidad';
      description = 'Porcentaje de grasa muy elevado.';
    }
  }

  const recommendations = [
    'El porcentaje de grasa corporal es un indicador más preciso que el IMC.',
    'Mantén una dieta equilibrada y ejercicio regular.',
    'Consulta con un profesional para mediciones más precisas.',
    'Considera el uso de básculas de bioimpedancia para mayor precisión.'
  ];

  return {
    bodyFat: Math.round(bodyFat * 10) / 10,
    category,
    description,
    recommendations
  };
}

/**
 * Calcula el índice PaFi (Presión arterial / Frecuencia cardíaca)
 */
export function calculatePaFi(systolicBP: number, diastolicBP: number, heartRate: number): PaFiResult {
  if (systolicBP <= 0 || diastolicBP <= 0 || heartRate <= 0) {
    throw new Error('Todos los valores deben ser positivos');
  }

  if (systolicBP <= diastolicBP) {
    throw new Error('La presión sistólica debe ser mayor que la diastólica');
  }

  const meanBP = (systolicBP + (2 * diastolicBP)) / 3;
  const pafi = meanBP / heartRate;

  let category: string;
  let description: string;
  let interpretation: string;

  if (pafi < 0.5) {
    category = 'Bajo';
    description = 'Índice PaFi bajo.';
    interpretation = 'Puede indicar hipotensión o taquicardia. Consulta con un médico.';
  } else if (pafi < 1.0) {
    category = 'Normal';
    description = 'Índice PaFi dentro del rango normal.';
    interpretation = 'Indica una relación normal entre presión arterial y frecuencia cardíaca.';
  } else if (pafi < 1.5) {
    category = 'Elevado';
    description = 'Índice PaFi elevado.';
    interpretation = 'Puede indicar hipertensión o bradicardia. Monitorea tus valores.';
  } else {
    category = 'Muy elevado';
    description = 'Índice PaFi muy elevado.';
    interpretation = 'Requiere evaluación médica inmediata.';
  }

  return {
    pafi: Math.round(pafi * 100) / 100,
    category,
    description,
    interpretation
  };
}

/**
 * Calcula la ingesta diaria recomendada de agua
 */
export function calculateWaterIntake(weight: number, age: number, activityLevel: 'low' | 'moderate' | 'high'): WaterIntakeResult {
  if (weight <= 0 || age <= 0) {
    throw new Error('El peso y la edad deben ser valores positivos');
  }

  // Fórmula básica: 35ml por kg de peso corporal
  let baseWater = weight * 35;

  // Ajuste por edad
  if (age < 18) {
    baseWater *= 0.9; // 10% menos para menores de 18
  } else if (age > 65) {
    baseWater *= 0.8; // 20% menos para mayores de 65
  }

  // Ajuste por nivel de actividad
  let activityMultiplier = 1;
  switch (activityLevel) {
    case 'low':
      activityMultiplier = 1;
      break;
    case 'moderate':
      activityMultiplier = 1.2;
      break;
    case 'high':
      activityMultiplier = 1.5;
      break;
  }

  const dailyWater = Math.round(baseWater * activityMultiplier);
  const glasses = Math.round(dailyWater / 250); // 250ml por vaso
  const bottles = Math.round(dailyWater / 500); // 500ml por botella

  let category: string;
  if (dailyWater < 2000) {
    category = 'Baja';
  } else if (dailyWater < 3000) {
    category = 'Moderada';
  } else {
    category = 'Alta';
  }

  const recommendations = [
    'Bebe agua a lo largo del día, no toda de una vez.',
    'Aumenta la ingesta en días calurosos o durante ejercicio.',
    'La sed es un indicador tardío de deshidratación.',
    'El color de la orina debe ser claro o amarillo pálido.',
    'Consulta con un médico si tienes condiciones especiales.'
  ];

  return {
    dailyWater,
    glasses,
    bottles,
    category,
    recommendations
  };
}

/**
 * Calcula la ovulación y días fértiles
 */
export function calculateOvulation(lastPeriod: string, cycleLength: number): OvulationResult {
  if (cycleLength < 21 || cycleLength > 35) {
    throw new Error('La duración del ciclo debe estar entre 21 y 35 días');
  }

  const lastPeriodDate = new Date(lastPeriod);
  if (isNaN(lastPeriodDate.getTime())) {
    throw new Error('Fecha de último período inválida');
  }

  // Calcular próxima ovulación (14 días antes del próximo período)
  const nextPeriodDate = new Date(lastPeriodDate);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

  const ovulationDate = new Date(nextPeriodDate);
  ovulationDate.setDate(ovulationDate.getDate() - 14);

  // Ventana fértil (5 días antes de la ovulación + día de ovulación)
  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(fertileStart.getDate() - 5);

  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(fertileEnd.getDate() + 1);

  const recommendations = [
    'La ventana fértil incluye 5 días antes de la ovulación y el día de ovulación.',
    'El espermatozoide puede vivir hasta 5 días en el tracto reproductivo.',
    'El óvulo vive aproximadamente 24 horas después de la ovulación.',
    'Para concebir, ten relaciones sexuales durante la ventana fértil.',
    'Para evitar embarazo, abstente o usa protección durante la ventana fértil.',
    'Estos cálculos son estimaciones. Consulta con un ginecólogo para mayor precisión.'
  ];

  return {
    nextOvulation: ovulationDate.toLocaleDateString('es-ES'),
    fertileWindow: {
      start: fertileStart.toLocaleDateString('es-ES'),
      end: fertileEnd.toLocaleDateString('es-ES')
    },
    nextPeriod: nextPeriodDate.toLocaleDateString('es-ES'),
    cycleLength,
    recommendations
  };
}
