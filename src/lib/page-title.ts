/**
 * Extrae el título de la calculadora del H1 y lo formatea para el page title
 */
export function extractCalculatorTitle(h1Text: string): string {
  // Si ya contiene "Calculadora de", lo devolvemos tal como está
  if (h1Text.includes('Calculadora de')) {
    return h1Text
  }
  
  // Si no, agregamos el prefijo "Calculadora de"
  return `Calculadora de ${h1Text}`
}

/**
 * Mapeo de rutas a títulos de calculadoras
 */
export const calculatorTitles: Record<string, string> = {
  '/matematicas/algebra': 'Calculadora de Álgebra',
  '/matematicas/trigonometria': 'Calculadora de Trigonometría',
  '/matematicas/matrices': 'Calculadora de Matrices',
  '/matematicas/combinatoria': 'Calculadora de Combinatoria',
  '/matematicas/derivadas': 'Calculadora de Derivadas',
  '/matematicas/progresiones': 'Calculadora de Progresiones',
  '/matematicas/potencias-raices': 'Calculadora de Potencias y Raíces',
  '/matematicas/fracciones': 'Calculadora de Fracciones',
  '/matematicas/porcentajes': 'Calculadora de Porcentajes',
}
