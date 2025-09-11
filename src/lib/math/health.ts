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
export function calculateIMC(weight: number, height: number, language: 'es' | 'it' | 'pt' | 'de' = 'es'): IMCResult {
  if (weight <= 0 || height <= 0) {
    const errorMessage = language === 'it' 
      ? 'Il peso e l\'altezza devono essere valori positivi'
      : language === 'pt'
        ? 'O peso e a altura devem ser valores positivos'
        : language === 'de'
          ? 'Gewicht und Größe müssen positive Werte sein'
          : 'El peso y la altura deben ser valores positivos';
    throw new Error(errorMessage);
  }

  const heightInMeters = height / 100; // Convertir cm a metros
  const imc = weight / (heightInMeters * heightInMeters);

  let category: string;
  let description: string;
  let recommendation: string;

  if (language === 'it') {
    // Traducciones italianas
    if (imc < 18.5) {
      category = 'Sottopeso';
      description = 'Il tuo IMC indica sottopeso.';
      recommendation = 'Consulta un professionista della salute per valutare il tuo stato nutrizionale.';
    } else if (imc < 25) {
      category = 'Peso normale';
      description = 'Il tuo IMC è nel range normale.';
      recommendation = 'Mantieni una dieta equilibrata e esercizio regolare.';
    } else if (imc < 30) {
      category = 'Sovrappeso';
      description = 'Il tuo IMC indica sovrappeso.';
      recommendation = 'Considera di aggiustare la tua dieta e aumentare l\'attività fisica.';
    } else {
      category = 'Obesità';
      description = 'Il tuo IMC indica obesità.';
      recommendation = 'È importante consultare un professionista della salute per un piano di trattamento.';
    }
  } else if (language === 'pt') {
    // Traducciones portuguesas
    if (imc < 18.5) {
      category = 'Abaixo do peso';
      description = 'Seu IMC indica abaixo do peso.';
      recommendation = 'Consulte um profissional de saúde para avaliar seu estado nutricional.';
    } else if (imc < 25) {
      category = 'Peso normal';
      description = 'Seu IMC está dentro da faixa normal.';
      recommendation = 'Mantenha uma dieta equilibrada e exercício regular.';
    } else if (imc < 30) {
      category = 'Sobrepeso';
      description = 'Seu IMC indica sobrepeso.';
      recommendation = 'Considere ajustar sua dieta e aumentar a atividade física.';
    } else {
      category = 'Obesidade';
      description = 'Seu IMC indica obesidade.';
      recommendation = 'É importante consultar um profissional de saúde para um plano de tratamento.';
    }
  } else if (language === 'de') {
    // Traducciones alemanas
    if (imc < 18.5) {
      category = 'Untergewicht';
      description = 'Ihr BMI zeigt Untergewicht.';
      recommendation = 'Konsultieren Sie einen Gesundheitsfachmann zur Bewertung Ihres Ernährungszustands.';
    } else if (imc < 25) {
      category = 'Normalgewicht';
      description = 'Ihr BMI liegt im normalen Bereich.';
      recommendation = 'Halten Sie eine ausgewogene Ernährung und regelmäßige Bewegung ein.';
    } else if (imc < 30) {
      category = 'Übergewicht';
      description = 'Ihr BMI zeigt Übergewicht.';
      recommendation = 'Erwägen Sie eine Anpassung Ihrer Ernährung und mehr körperliche Aktivität.';
    } else {
      category = 'Adipositas';
      description = 'Ihr BMI zeigt Adipositas.';
      recommendation = 'Es ist wichtig, einen Gesundheitsfachmann für einen Behandlungsplan zu konsultieren.';
    }
  } else {
    // Traducciones españolas (por defecto)
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

// Interfaces para las nuevas funciones
export interface IdealWeightResult {
  idealWeight: number;
  range: {
    min: number;
    max: number;
  };
  method: string;
  recommendations: string[];
}

export interface CaloriesResult {
  tmb: number;
  totalCalories: number;
  activityLevel: string;
  recommendations: string[];
}

export interface SleepResult {
  sleepCycles: number;
  wakeUpTime: string;
  bedTime: string;
  recommendations: string[];
}

export interface ExerciseResult {
  caloriesBurned: number;
  duration: number;
  intensity: string;
  recommendations: string[];
}

/**
 * Calcula el peso ideal usando la fórmula de Devine
 */
export function calculateIdealWeight(height: number, gender: 'male' | 'female', language: 'es' | 'it' | 'pt' | 'de' = 'es'): IdealWeightResult {
  if (height <= 0) {
    const errorMessage = language === 'it' 
      ? 'L\'altezza deve essere un valore positivo'
      : language === 'pt'
        ? 'A altura deve ser um valor positivo'
        : language === 'de'
          ? 'Die Größe muss ein positiver Wert sein'
          : 'La altura debe ser un valor positivo';
    throw new Error(errorMessage);
  }

  const heightInInches = height / 2.54; // Convertir cm a pulgadas
  let idealWeight: number;
  let method: string;

  if (gender === 'male') {
    idealWeight = 50 + (2.3 * (heightInInches - 60));
    method = language === 'it' 
      ? 'Formula di Devine (Uomini)'
      : language === 'pt'
        ? 'Fórmula de Devine (Homens)'
        : language === 'de'
          ? 'Devine-Formel (Männer)'
          : 'Fórmula de Devine (Hombres)';
  } else {
    idealWeight = 45.5 + (2.3 * (heightInInches - 60));
    method = language === 'it' 
      ? 'Formula di Devine (Donne)'
      : language === 'pt'
        ? 'Fórmula de Devine (Mulheres)'
        : language === 'de'
          ? 'Devine-Formel (Frauen)'
          : 'Fórmula de Devine (Mujeres)';
  }

  const range = {
    min: Math.round(idealWeight * 0.9),
    max: Math.round(idealWeight * 1.1)
  };

  const recommendations = language === 'it' 
    ? [
        'Il peso ideale è solo una stima basata su formule matematiche.',
        'Considera la composizione corporea, massa muscolare e struttura ossea.',
        'Consulta un nutrizionista per un piano personalizzato.',
        'Il peso ideale può variare in base all\'età e al livello di attività.'
      ]
    : language === 'pt'
      ? [
          'O peso ideal é apenas uma estimativa baseada em fórmulas matemáticas.',
          'Considere a composição corporal, massa muscular e estrutura óssea.',
          'Consulte um nutricionista para um plano personalizado.',
          'O peso ideal pode variar com base na idade e nível de atividade.'
        ]
      : language === 'de'
        ? [
            'Das Idealgewicht ist nur eine Schätzung basierend auf mathematischen Formeln.',
            'Berücksichtigen Sie die Körperzusammensetzung, Muskelmasse und Knochenstruktur.',
            'Konsultieren Sie einen Ernährungsberater für einen personalisierten Plan.',
            'Das Idealgewicht kann je nach Alter und Aktivitätsniveau variieren.'
          ]
        : [
            'El peso ideal es solo una estimación basada en fórmulas matemáticas.',
            'Considera la composición corporal, masa muscular y estructura ósea.',
            'Consulta con un nutricionista para un plan personalizado.',
            'El peso ideal puede variar según la edad y nivel de actividad.'
          ];

  return {
    idealWeight: Math.round(idealWeight),
    range,
    method,
    recommendations
  };
}

/**
 * Calcula las calorías diarias necesarias
 */
export function calculateCalories(weight: number, height: number, age: number, gender: 'male' | 'female', activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active', language: 'es' | 'it' | 'pt' | 'de' = 'es'): CaloriesResult {
  if (weight <= 0 || height <= 0 || age <= 0) {
    const errorMessage = language === 'it' 
      ? 'Tutti i valori devono essere positivi'
      : language === 'pt'
        ? 'Todos os valores devem ser positivos'
        : language === 'de'
          ? 'Alle Werte müssen positiv sein'
          : 'Todos los valores deben ser positivos';
    throw new Error(errorMessage);
  }

  // Calcular TMB usando Mifflin-St Jeor
  let tmb: number;
  if (gender === 'male') {
    tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }

  // Factores de actividad
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };

  const totalCalories = Math.round(tmb * activityFactors[activityLevel]);

  const activityLevels = language === 'it' 
    ? {
        sedentary: 'Sedentario',
        light: 'Leggero',
        moderate: 'Moderato',
        active: 'Attivo',
        very_active: 'Molto attivo'
      }
    : language === 'pt'
      ? {
          sedentary: 'Sedentário',
          light: 'Leve',
          moderate: 'Moderado',
          active: 'Ativo',
          very_active: 'Muito ativo'
        }
      : language === 'de'
        ? {
            sedentary: 'Sitzend',
            light: 'Leicht',
            moderate: 'Moderat',
            active: 'Aktiv',
            very_active: 'Sehr aktiv'
          }
        : {
            sedentary: 'Sedentario',
            light: 'Ligero',
            moderate: 'Moderado',
            active: 'Activo',
            very_active: 'Muy activo'
          };

  const recommendations = language === 'it' 
    ? [
        'Le calorie totali includono TMB + attività fisica.',
        'Per perdere peso, consuma 500 calorie in meno al giorno.',
        'Per aumentare di peso, consuma 500 calorie in più al giorno.',
        'Consulta un nutrizionista per un piano personalizzato.'
      ]
    : language === 'pt'
      ? [
          'As calorias totais incluem TMB + atividade física.',
          'Para perder peso, consuma 500 calorias a menos por dia.',
          'Para ganhar peso, consuma 500 calorias a mais por dia.',
          'Consulte um nutricionista para um plano personalizado.'
        ]
      : language === 'de'
        ? [
            'Die Gesamtkalorien umfassen BMR + körperliche Aktivität.',
            'Um Gewicht zu verlieren, verbrauchen Sie 500 Kalorien weniger pro Tag.',
            'Um Gewicht zu gewinnen, verbrauchen Sie 500 Kalorien mehr pro Tag.',
            'Konsultieren Sie einen Ernährungsberater für einen personalisierten Plan.'
          ]
        : [
            'Las calorías totales incluyen TMB + actividad física.',
            'Para perder peso, consume 500 calorías menos al día.',
            'Para ganar peso, consume 500 calorías más al día.',
            'Consulta con un nutricionista para un plan personalizado.'
          ];

  return {
    tmb: Math.round(tmb),
    totalCalories,
    activityLevel: activityLevels[activityLevel],
    recommendations
  };
}

/**
 * Calcula los ciclos de sueño
 */
export function calculateSleep(wakeUpTime: string, language: 'es' | 'it' | 'pt' | 'de' = 'es'): SleepResult {
  const wakeUp = new Date(`2000-01-01T${wakeUpTime}`);
  if (isNaN(wakeUp.getTime())) {
    const errorMessage = language === 'it' 
      ? 'Ora di risveglio non valida'
      : language === 'pt'
        ? 'Horário de despertar inválido'
        : language === 'de'
          ? 'Ungültige Aufwachzeit'
          : 'Hora de despertar inválida';
    throw new Error(errorMessage);
  }

  // Cada ciclo de sueño dura aproximadamente 90 minutos
  const cycleDuration = 90; // minutos
  const sleepCycles = 5; // ciclos recomendados

  // Calcular hora de acostarse (5 ciclos antes)
  const bedTime = new Date(wakeUp);
  bedTime.setMinutes(bedTime.getMinutes() - (sleepCycles * cycleDuration));

  const recommendations = language === 'it' 
    ? [
        'Ogni ciclo di sonno dura circa 90 minuti.',
        '5 cicli completi (7.5 ore) sono ideali per la maggior parte delle persone.',
        'Vai a letto alla stessa ora ogni sera per mantenere un ritmo regolare.',
        'Evita schermi luminosi 1 ora prima di dormire.',
        'Crea un ambiente fresco, buio e silenzioso per dormire.'
      ]
    : language === 'pt'
      ? [
          'Cada ciclo de sono dura aproximadamente 90 minutos.',
          '5 ciclos completos (7.5 horas) são ideais para a maioria das pessoas.',
          'Vá para a cama no mesmo horário todas as noites para manter um ritmo regular.',
          'Evite telas brilhantes 1 hora antes de dormir.',
          'Crie um ambiente fresco, escuro e silencioso para dormir.'
        ]
      : language === 'de'
        ? [
            'Jeder Schlafzyklus dauert etwa 90 Minuten.',
            '5 vollständige Zyklen (7.5 Stunden) sind ideal für die meisten Menschen.',
            'Gehen Sie jeden Abend zur gleichen Zeit ins Bett, um einen regelmäßigen Rhythmus zu halten.',
            'Vermeiden Sie helle Bildschirme 1 Stunde vor dem Schlafengehen.',
            'Schaffen Sie eine kühle, dunkle und ruhige Umgebung zum Schlafen.'
          ]
        : [
            'Cada ciclo de sueño dura aproximadamente 90 minutos.',
            '5 ciclos completos (7.5 horas) son ideales para la mayoría de personas.',
            'Ve a la cama a la misma hora cada noche para mantener un ritmo regular.',
            'Evita pantallas brillantes 1 hora antes de dormir.',
            'Crea un ambiente fresco, oscuro y silencioso para dormir.'
          ];

  return {
    sleepCycles,
    wakeUpTime: wakeUp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    bedTime: bedTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    recommendations
  };
}

/**
 * Calcula calorías quemadas en ejercicio
 */
export function calculateExercise(weight: number, duration: number, exerciseType: 'walking' | 'running' | 'cycling' | 'swimming' | 'weightlifting', intensity: 'low' | 'moderate' | 'high', language: 'es' | 'it' | 'pt' | 'de' = 'es'): ExerciseResult {
  if (weight <= 0 || duration <= 0) {
    const errorMessage = language === 'it' 
      ? 'Peso e durata devono essere valori positivi'
      : language === 'pt'
        ? 'Peso e duração devem ser valores positivos'
        : language === 'de'
          ? 'Gewicht und Dauer müssen positive Werte sein'
          : 'El peso y la duración deben ser valores positivos';
    throw new Error(errorMessage);
  }

  // METs (Metabolic Equivalent of Task) para diferentes ejercicios
  const mets = {
    walking: { low: 2.5, moderate: 3.5, high: 4.5 },
    running: { low: 6.0, moderate: 8.0, high: 10.0 },
    cycling: { low: 4.0, moderate: 6.0, high: 8.0 },
    swimming: { low: 5.0, moderate: 7.0, high: 9.0 },
    weightlifting: { low: 3.0, moderate: 5.0, high: 7.0 }
  };

  const met = mets[exerciseType][intensity];
  const caloriesBurned = Math.round((met * weight * duration) / 60); // Convertir minutos a horas

  const intensities = language === 'it' 
    ? {
        low: 'Bassa',
        moderate: 'Moderata',
        high: 'Alta'
      }
    : language === 'pt'
      ? {
          low: 'Baixa',
          moderate: 'Moderada',
          high: 'Alta'
        }
      : language === 'de'
        ? {
            low: 'Niedrig',
            moderate: 'Moderat',
            high: 'Hoch'
          }
        : {
            low: 'Baja',
            moderate: 'Moderada',
            high: 'Alta'
          };

  const recommendations = language === 'it' 
    ? [
        'Le calorie bruciate sono una stima basata su METs standard.',
        'L\'intensità effettiva può variare in base alla forma fisica individuale.',
        'Combina esercizio cardio e allenamento della forza per risultati ottimali.',
        'Aumenta gradualmente l\'intensità per evitare lesioni.',
        'Consulta un personal trainer per un programma personalizzato.'
      ]
    : language === 'pt'
      ? [
          'As calorias queimadas são uma estimativa baseada em METs padrão.',
          'A intensidade real pode variar com base na forma física individual.',
          'Combine exercício cardio e treinamento de força para resultados ótimos.',
          'Aumente gradualmente a intensidade para evitar lesões.',
          'Consulte um personal trainer para um programa personalizado.'
        ]
      : language === 'de'
        ? [
            'Die verbrannten Kalorien sind eine Schätzung basierend auf Standard-METs.',
            'Die tatsächliche Intensität kann je nach individueller Fitness variieren.',
            'Kombinieren Sie Cardio- und Krafttraining für optimale Ergebnisse.',
            'Erhöhen Sie die Intensität schrittweise, um Verletzungen zu vermeiden.',
            'Konsultieren Sie einen Personal Trainer für ein personalisiertes Programm.'
          ]
        : [
            'Las calorías quemadas son una estimación basada en METs estándar.',
            'La intensidad real puede variar según la forma física individual.',
            'Combina ejercicio cardio y entrenamiento de fuerza para resultados óptimos.',
            'Aumenta gradualmente la intensidad para evitar lesiones.',
            'Consulta con un entrenador personal para un programa personalizado.'
          ];

  return {
    caloriesBurned,
    duration,
    intensity: intensities[intensity],
    recommendations
  };
}
