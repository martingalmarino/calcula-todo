/**
 * Funciones matemáticas para calculadoras de CALENDARIO
 */

export interface DaysBetweenResult {
  days: number;
  weeks: number;
  months: number;
  years: number;
  totalDays: number;
  breakdown: {
    startDate: string;
    endDate: string;
    isLeapYear: boolean;
  };
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  breakdown: {
    birthDate: string;
    currentDate: string;
    isLeapYear: boolean;
  };
}

export interface DateOperationResult {
  originalDate: string;
  operation: 'add' | 'subtract';
  days: number;
  resultDate: string;
  dayOfWeek: string;
  breakdown: {
    originalDayOfWeek: string;
    daysAdded: number;
    isLeapYear: boolean;
  };
}

export interface TimeCalculationResult {
  hours: number;
  minutes: number;
  totalMinutes: number;
  totalHours: number;
  breakdown: {
    operation: string;
    time1: string;
    time2: string;
  };
}

export interface VacationDaysResult {
  startDate: string;
  endDate: string;
  totalDays: number;
  workingDays: number;
  weekendDays: number;
  breakdown: {
    startDayOfWeek: string;
    endDayOfWeek: string;
    isLeapYear: boolean;
  };
}

/**
 * Calcula días entre dos fechas
 */
export function calculateDaysBetween(startDate: string, endDate: string): DaysBetweenResult {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Fechas inválidas');
  }
  
  if (start > end) {
    throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
  }

  const timeDiff = end.getTime() - start.getTime();
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  const days = end.getDate() - start.getDate();
  
  const weeks = Math.floor(totalDays / 7);
  
  const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  return {
    days: Math.abs(days),
    weeks,
    months: Math.abs(months + years * 12),
    years: Math.abs(years),
    totalDays,
    breakdown: {
      startDate: start.toLocaleDateString('es-ES'),
      endDate: end.toLocaleDateString('es-ES'),
      isLeapYear: isLeapYear(start.getFullYear()) || isLeapYear(end.getFullYear())
    }
  };
}

/**
 * Calcula la edad exacta
 */
export function calculateAge(birthDate: string, currentDate?: string): AgeResult {
  const birth = new Date(birthDate);
  const current = currentDate ? new Date(currentDate) : new Date();
  
  if (isNaN(birth.getTime()) || isNaN(current.getTime())) {
    throw new Error('Fechas inválidas');
  }
  
  if (birth > current) {
    throw new Error('La fecha de nacimiento debe ser anterior a la fecha actual');
  }

  let years = current.getFullYear() - birth.getFullYear();
  let months = current.getMonth() - birth.getMonth();
  let days = current.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const timeDiff = current.getTime() - birth.getTime();
  const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));

  const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  return {
    years,
    months,
    days,
    totalDays,
    breakdown: {
      birthDate: birth.toLocaleDateString('es-ES'),
      currentDate: current.toLocaleDateString('es-ES'),
      isLeapYear: isLeapYear(birth.getFullYear()) || isLeapYear(current.getFullYear())
    }
  };
}

/**
 * Suma o resta días a una fecha
 */
export function addSubtractDays(date: string, days: number, operation: 'add' | 'subtract'): DateOperationResult {
  const originalDate = new Date(date);
  
  if (isNaN(originalDate.getTime())) {
    throw new Error('Fecha inválida');
  }

  const resultDate = new Date(originalDate);
  const daysToAdd = operation === 'add' ? days : -days;
  resultDate.setDate(resultDate.getDate() + daysToAdd);

  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const originalDayOfWeek = dayNames[originalDate.getDay()];
  const resultDayOfWeek = dayNames[resultDate.getDay()];

  const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  return {
    originalDate: originalDate.toLocaleDateString('es-ES'),
    operation,
    days,
    resultDate: resultDate.toLocaleDateString('es-ES'),
    dayOfWeek: resultDayOfWeek,
    breakdown: {
      originalDayOfWeek,
      daysAdded: daysToAdd,
      isLeapYear: isLeapYear(originalDate.getFullYear()) || isLeapYear(resultDate.getFullYear())
    }
  };
}

/**
 * Calcula operaciones con horas y minutos
 */
export function calculateTimeOperation(
  time1: string, 
  time2: string, 
  operation: 'add' | 'subtract'
): TimeCalculationResult {
  const [hours1, minutes1] = time1.split(':').map(Number);
  const [hours2, minutes2] = time2.split(':').map(Number);

  if (isNaN(hours1) || isNaN(minutes1) || isNaN(hours2) || isNaN(minutes2)) {
    throw new Error('Formato de hora inválido. Use HH:MM');
  }

  if (hours1 < 0 || hours1 > 23 || minutes1 < 0 || minutes1 > 59 ||
      hours2 < 0 || hours2 > 23 || minutes2 < 0 || minutes2 > 59) {
    throw new Error('Horas deben estar entre 0-23 y minutos entre 0-59');
  }

  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  let resultMinutes: number;
  if (operation === 'add') {
    resultMinutes = totalMinutes1 + totalMinutes2;
  } else {
    resultMinutes = totalMinutes1 - totalMinutes2;
    if (resultMinutes < 0) {
      resultMinutes += 24 * 60; // Añadir un día si es negativo
    }
  }

  // Normalizar a 24 horas
  resultMinutes = resultMinutes % (24 * 60);
  if (resultMinutes < 0) {
    resultMinutes += 24 * 60;
  }

  const hours = Math.floor(resultMinutes / 60);
  const minutes = resultMinutes % 60;

  return {
    hours,
    minutes,
    totalMinutes: resultMinutes,
    totalHours: Math.round((resultMinutes / 60) * 100) / 100,
    breakdown: {
      operation: operation === 'add' ? 'Suma' : 'Resta',
      time1,
      time2
    }
  };
}

/**
 * Calcula días de vacaciones (excluyendo fines de semana)
 */
export function calculateVacationDays(startDate: string, endDate: string): VacationDaysResult {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Fechas inválidas');
  }
  
  if (start > end) {
    throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
  }

  let totalDays = 0;
  let workingDays = 0;
  let weekendDays = 0;
  
  const currentDate = new Date(start);
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  
  while (currentDate <= end) {
    totalDays++;
    const dayOfWeek = currentDate.getDay();
    
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Domingo o Sábado
      weekendDays++;
    } else {
      workingDays++;
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  return {
    startDate: start.toLocaleDateString('es-ES'),
    endDate: end.toLocaleDateString('es-ES'),
    totalDays,
    workingDays,
    weekendDays,
    breakdown: {
      startDayOfWeek: dayNames[start.getDay()],
      endDayOfWeek: dayNames[end.getDay()],
      isLeapYear: isLeapYear(start.getFullYear()) || isLeapYear(end.getFullYear())
    }
  };
}
