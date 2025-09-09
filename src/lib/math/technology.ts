/**
 * Funciones matemáticas para calculadoras de TECNOLOGÍA
 */

export interface StorageConversionResult {
  value: number;
  fromUnit: string;
  toUnit: string;
  convertedValue: number;
  base: 'decimal' | 'binary';
  comparison: string;
}

export interface DownloadSpeedResult {
  mbps: number;
  mbpsValue: number;
  downloadTime: {
    seconds: number;
    minutes: number;
    hours: number;
    formatted: string;
  };
  fileSize?: number;
  disclaimer: string;
}

export interface UptimeResult {
  uptimePercentage: number;
  period: 'day' | 'month' | 'year';
  downtime: {
    minutes: number;
    hours: number;
    days: number;
    formatted: string;
  };
  totalPeriod: {
    minutes: number;
    hours: number;
    days: number;
  };
}

export interface ColorConversionResult {
  hex: string;
  rgb: { r: number; g: number; b: number };
  cmyk: { c: number; m: number; y: number; k: number };
  hsl: { h: number; s: number; l: number };
  isValid: boolean;
}

export interface PasswordEntropyResult {
  password: string;
  entropy: number;
  strength: 'muy_débil' | 'débil' | 'medio' | 'fuerte' | 'muy_fuerte';
  crackTime: {
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    years: number;
    formatted: string;
  };
  suggestions: string[];
  hashMD5: string;
  hashSHA256: string;
}

export interface LatencyResult {
  pingMs: number;
  responseTime: {
    seconds: number;
    formatted: string;
  };
  category: 'excelente' | 'bueno' | 'aceptable' | 'lento';
  description: string;
  useCases: string[];
  theoreticalDistance?: number;
}

/**
 * Convierte entre unidades de almacenamiento digital
 */
export function convertStorage(
  value: number,
  fromUnit: string,
  toUnit: string,
  base: 'decimal' | 'binary' = 'binary'
): StorageConversionResult {
  if (value < 0) {
    throw new Error('El valor debe ser positivo');
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const fromIndex = units.indexOf(fromUnit.toUpperCase());
  const toIndex = units.indexOf(toUnit.toUpperCase());

  if (fromIndex === -1 || toIndex === -1) {
    throw new Error('Unidades no válidas');
  }

  const multiplier = base === 'decimal' ? 1000 : 1024;
  const bytes = value * Math.pow(multiplier, fromIndex);
  const convertedValue = bytes / Math.pow(multiplier, toIndex);

  // Generar comparación divertida
  const comparisons = [
    `${Math.round(convertedValue * 100) / 100} ${toUnit} equivale a aproximadamente ${Math.round(convertedValue * 500)} canciones en MP3`,
    `${Math.round(convertedValue * 100) / 100} ${toUnit} equivale a ${Math.round(convertedValue * 1000)} fotos de alta resolución`,
    `${Math.round(convertedValue * 100) / 100} ${toUnit} equivale a ${Math.round(convertedValue * 2)} películas en HD`,
    `${Math.round(convertedValue * 100) / 100} ${toUnit} equivale a ${Math.round(convertedValue * 10000)} páginas de texto`
  ];

  const comparison = comparisons[Math.floor(Math.random() * comparisons.length)];

  return {
    value,
    fromUnit: fromUnit.toUpperCase(),
    toUnit: toUnit.toUpperCase(),
    convertedValue: Math.round(convertedValue * 1000000) / 1000000,
    base,
    comparison
  };
}

/**
 * Calcula velocidad de descarga y tiempo estimado
 */
export function calculateDownloadSpeed(
  mbps: number,
  fileSizeGB?: number
): DownloadSpeedResult {
  if (mbps <= 0) {
    throw new Error('La velocidad debe ser mayor a 0');
  }

  // Convertir Mbps a MB/s (dividir por 8)
  const mbpsValue = mbps / 8;
  
  let downloadTime = { seconds: 0, minutes: 0, hours: 0, formatted: '' };
  
  if (fileSizeGB && fileSizeGB > 0) {
    const fileSizeMB = fileSizeGB * 1024;
    const seconds = fileSizeMB / mbpsValue;
    
    downloadTime = {
      seconds: Math.round(seconds),
      minutes: Math.round(seconds / 60),
      hours: Math.round(seconds / 3600),
      formatted: formatTime(seconds)
    };
  }

  return {
    mbps,
    mbpsValue: Math.round(mbpsValue * 100) / 100,
    downloadTime,
    fileSize: fileSizeGB,
    disclaimer: 'Resultados aproximados. No incluye latencia, pérdidas de paquetes o limitaciones del servidor.'
  };
}

/**
 * Calcula uptime/downtime
 */
export function calculateUptime(
  uptimePercentage: number,
  period: 'day' | 'month' | 'year' = 'month'
): UptimeResult {
  if (uptimePercentage < 0 || uptimePercentage > 100) {
    throw new Error('El porcentaje de uptime debe estar entre 0 y 100');
  }

  const downtimePercentage = 100 - uptimePercentage;
  
  let totalMinutes: number;
  switch (period) {
    case 'day':
      totalMinutes = 24 * 60;
      break;
    case 'month':
      totalMinutes = 30 * 24 * 60; // 30 días
      break;
    case 'year':
      totalMinutes = 365 * 24 * 60; // 365 días
      break;
    default:
      totalMinutes = 30 * 24 * 60;
  }

  const downtimeMinutes = (downtimePercentage / 100) * totalMinutes;
  const downtimeHours = downtimeMinutes / 60;
  const downtimeDays = downtimeHours / 24;

  return {
    uptimePercentage: Math.round(uptimePercentage * 100) / 100,
    period,
    downtime: {
      minutes: Math.round(downtimeMinutes),
      hours: Math.round(downtimeHours * 100) / 100,
      days: Math.round(downtimeDays * 100) / 100,
      formatted: formatDowntime(downtimeMinutes)
    },
    totalPeriod: {
      minutes: totalMinutes,
      hours: totalMinutes / 60,
      days: totalMinutes / (24 * 60)
    }
  };
}

/**
 * Convierte colores entre formatos
 */
export function convertColor(
  input: string,
  fromFormat: 'hex' | 'rgb' | 'cmyk' | 'hsl'
): ColorConversionResult {
  let rgb = { r: 0, g: 0, b: 0 };
  let isValid = true;

  try {
    switch (fromFormat) {
      case 'hex':
        rgb = hexToRgb(input);
        break;
      case 'rgb':
        rgb = parseRgb(input);
        break;
      case 'cmyk':
        rgb = cmykToRgb(parseCmyk(input));
        break;
      case 'hsl':
        rgb = hslToRgb(parseHsl(input));
        break;
    }
  } catch {
    isValid = false;
  }

  const hex = rgbToHex(rgb);
  const cmyk = rgbToCmyk(rgb);
  const hsl = rgbToHsl(rgb);

  return {
    hex,
    rgb,
    cmyk,
    hsl,
    isValid
  };
}

/**
 * Analiza la entropía de una contraseña
 */
export function analyzePasswordEntropy(password: string): PasswordEntropyResult {
  if (!password) {
    return {
      password: '',
      entropy: 0,
      strength: 'muy_débil',
      crackTime: { seconds: 0, minutes: 0, hours: 0, days: 0, years: 0, formatted: 'instantáneo' },
      suggestions: ['Ingresa una contraseña para analizar'],
      hashMD5: '',
      hashSHA256: ''
    };
  }

  // Calcular entropía
  let charset = 0;
  if (/[a-z]/.test(password)) charset += 26;
  if (/[A-Z]/.test(password)) charset += 26;
  if (/[0-9]/.test(password)) charset += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charset += 32;

  const entropy = Math.log2(Math.pow(charset, password.length));

  // Determinar fortaleza
  let strength: PasswordEntropyResult['strength'];
  if (entropy < 20) strength = 'muy_débil';
  else if (entropy < 40) strength = 'débil';
  else if (entropy < 60) strength = 'medio';
  else if (entropy < 80) strength = 'fuerte';
  else strength = 'muy_fuerte';

  // Calcular tiempo de crackeo (aproximado)
  const crackTime = calculateCrackTime(entropy);

  // Generar sugerencias
  const suggestions = generatePasswordSuggestions(password, entropy);

  // Generar hashes (simplificado)
  const hashMD5 = generateSimpleHash(password, 'md5');
  const hashSHA256 = generateSimpleHash(password, 'sha256');

  return {
    password,
    entropy: Math.round(entropy * 100) / 100,
    strength,
    crackTime,
    suggestions,
    hashMD5,
    hashSHA256
  };
}

/**
 * Analiza latencia y tiempo de respuesta
 */
export function analyzeLatency(
  pingMs: number,
  distanceKm?: number
): LatencyResult {
  if (pingMs < 0) {
    throw new Error('El ping debe ser un valor positivo');
  }

  const responseTime = {
    seconds: pingMs / 1000,
    formatted: `${pingMs}ms (${(pingMs / 1000).toFixed(3)}s)`
  };

  let category: LatencyResult['category'];
  let description: string;
  let useCases: string[];

  if (pingMs < 20) {
    category = 'excelente';
    description = 'Latencia excelente, ideal para gaming competitivo y aplicaciones en tiempo real';
    useCases = ['Gaming competitivo', 'Videollamadas HD', 'Streaming en vivo', 'Trading en tiempo real'];
  } else if (pingMs < 50) {
    category = 'bueno';
    description = 'Latencia buena, adecuada para la mayoría de aplicaciones';
    useCases = ['Gaming casual', 'Videollamadas', 'Streaming', 'Navegación web'];
  } else if (pingMs < 100) {
    category = 'aceptable';
    description = 'Latencia aceptable, puede haber retrasos menores';
    useCases = ['Navegación web', 'Email', 'Streaming (con buffering)', 'Gaming casual'];
  } else {
    category = 'lento';
    description = 'Latencia alta, retrasos notables en interacciones';
    useCases = ['Navegación web básica', 'Email', 'Descargas', 'Evitar gaming competitivo'];
  }

  // Calcular distancia teórica si se proporciona
  let theoreticalDistance: number | undefined;
  if (distanceKm) {
    // Velocidad de la luz en fibra óptica ≈ 200,000 km/s
    const lightSpeed = 200000;
    theoreticalDistance = (pingMs / 1000) * lightSpeed / 2; // /2 por ida y vuelta
  }

  return {
    pingMs,
    responseTime,
    category,
    description,
    useCases,
    theoreticalDistance
  };
}

// Funciones auxiliares

function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)} segundos`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes} minuto${minutes !== 1 ? 's' : ''} ${remainingSeconds} segundo${remainingSeconds !== 1 ? 's' : ''}`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} hora${hours !== 1 ? 's' : ''} ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
  }
}

function formatDowntime(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} minutos`;
  } else if (minutes < 1440) { // menos de 24 horas
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours} hora${hours !== 1 ? 's' : ''} ${remainingMinutes} minuto${remainingMinutes !== 1 ? 's' : ''}`;
  } else {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    return `${days} día${days !== 1 ? 's' : ''} ${hours} hora${hours !== 1 ? 's' : ''}`;
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error('Formato HEX inválido');
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

function rgbToHex(rgb: { r: number; g: number; b: number }): string {
  return `#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1).toUpperCase()}`;
}

function parseRgb(rgb: string): { r: number; g: number; b: number } {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) throw new Error('Formato RGB inválido');
  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3])
  };
}

function rgbToCmyk(rgb: { r: number; g: number; b: number }): { c: number; m: number; y: number; k: number } {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const k = 1 - Math.max(r, g, b);
  const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
  const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
  const y = k === 1 ? 0 : (1 - b - k) / (1 - k);
  
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  };
}

function parseCmyk(cmyk: string): { c: number; m: number; y: number; k: number } {
  const match = cmyk.match(/cmyk\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) throw new Error('Formato CMYK inválido');
  return {
    c: parseInt(match[1]),
    m: parseInt(match[2]),
    y: parseInt(match[3]),
    k: parseInt(match[4])
  };
}

function cmykToRgb(cmyk: { c: number; m: number; y: number; k: number }): { r: number; g: number; b: number } {
  const c = cmyk.c / 100;
  const m = cmyk.m / 100;
  const y = cmyk.y / 100;
  const k = cmyk.k / 100;
  
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  
  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b)
  };
}

function parseHsl(hsl: string): { h: number; s: number; l: number } {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) throw new Error('Formato HSL inválido');
  return {
    h: parseInt(match[1]),
    s: parseInt(match[2]),
    l: parseInt(match[3])
  };
}

function hslToRgb(hsl: { h: number; s: number; l: number }): { r: number; g: number; b: number } {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;
  
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

function rgbToHsl(rgb: { r: number; g: number; b: number }): { h: number; s: number; l: number } {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function calculateCrackTime(entropy: number): PasswordEntropyResult['crackTime'] {
  // Aproximación: 10^12 intentos por segundo con GPU moderna
  const attemptsPerSecond = Math.pow(10, 12);
  const totalCombinations = Math.pow(2, entropy);
  const seconds = totalCombinations / (2 * attemptsPerSecond); // /2 para promedio
  
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;
  
  let formatted: string;
  if (seconds < 1) {
    formatted = 'instantáneo';
  } else if (seconds < 60) {
    formatted = `${Math.round(seconds)} segundos`;
  } else if (minutes < 60) {
    formatted = `${Math.round(minutes)} minutos`;
  } else if (hours < 24) {
    formatted = `${Math.round(hours)} horas`;
  } else if (days < 365) {
    formatted = `${Math.round(days)} días`;
  } else {
    formatted = `${Math.round(years)} años`;
  }
  
  return {
    seconds: Math.round(seconds),
    minutes: Math.round(minutes),
    hours: Math.round(hours),
    days: Math.round(days),
    years: Math.round(years),
    formatted
  };
}

function generatePasswordSuggestions(password: string, entropy: number): string[] {
  const suggestions: string[] = [];
  
  if (password.length < 8) {
    suggestions.push('Usa al menos 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    suggestions.push('Agrega letras mayúsculas');
  }
  if (!/[a-z]/.test(password)) {
    suggestions.push('Agrega letras minúsculas');
  }
  if (!/[0-9]/.test(password)) {
    suggestions.push('Agrega números');
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    suggestions.push('Agrega símbolos especiales (!@#$%^&*)');
  }
  if (entropy < 40) {
    suggestions.push('Considera usar una frase de contraseña más larga');
  }
  
  return suggestions.length > 0 ? suggestions : ['¡Excelente contraseña!'];
}

function generateSimpleHash(input: string, algorithm: 'md5' | 'sha256'): string {
  // Implementación simplificada para demostración
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  if (algorithm === 'md5') {
    return Math.abs(hash).toString(16).padStart(8, '0').repeat(4);
  } else {
    return Math.abs(hash).toString(16).padStart(8, '0').repeat(8);
  }
}
