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
  '/matematicas/algebra/': 'Calculadora de Álgebra',
  '/matematicas/trigonometria/': 'Calculadora de Trigonometría',
  '/matematicas/matrices/': 'Calculadora de Matrices',
  '/matematicas/combinatoria/': 'Calculadora de Combinatoria',
  '/matematicas/derivadas/': 'Calculadora de Derivadas',
  '/matematicas/progresiones/': 'Calculadora de Progresiones',
  '/matematicas/potencias-raices/': 'Calculadora de Potencias y Raíces',
  '/matematicas/fracciones/': 'Calculadora de Fracciones',
  '/matematicas/porcentajes/': 'Calculadora de Porcentajes',
  '/salud/imc/': 'Calculadora de IMC - Índice de Masa Corporal',
  '/salud/tmb/': 'Calculadora de TMB - Tasa Metabólica Basal',
  '/salud/grasa-corporal/': 'Calculadora de Porcentaje de Grasa Corporal',
  '/salud/pafi/': 'Calculadora PaFi - Presión Arterial y Frecuencia Cardíaca',
  '/salud/agua-diaria/': 'Calculadora de Agua Diaria Recomendada - Hidratación Saludable',
  '/salud/ovulacion/': 'Calculadora de Ovulación y Días Fértiles - Ciclo Menstrual',
  '/otras/escala-notas/': 'Calculadora de Escala de Notas - Conversión A B C D F',
  '/otras/gasto-gasolina/': 'Calculadora de Gasto de Gasolina - Costo por Kilómetro',
  '/otras/contador-palabras/': 'Contador de Palabras y Caracteres Online',
  '/otras/numeros-romanos/': 'Conversor de Números Romanos - Romano a Arábigo',
  '/otras/contador-clicks/': 'Contador de Clicks - CPS Test Online',
  '/calendario/dias-entre-fechas/': 'Calculadora de Días entre Fechas - Contador de Días',
  '/calendario/calculadora-edad/': 'Calculadora de Edad - Calcular Edad Exacta',
  '/calendario/sumar-restar-dias/': 'Sumar y Restar Días a una Fecha - Calculadora de Fechas',
  '/calendario/horas-minutos/': 'Calculadora de Horas y Minutos - Suma y Resta de Tiempo',
  '/calendario/dias-vacaciones/': 'Calculadora de Días de Vacaciones - Días Laborables',
}
