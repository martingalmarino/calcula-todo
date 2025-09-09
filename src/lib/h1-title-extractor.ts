/**
 * Utilidades para extraer títulos del H1 y usarlos como page titles
 */

/**
 * Extrae el título del H1 de una página
 * @param h1Text - Texto del H1
 * @returns Título formateado para usar como page title
 */
export function extractH1Title(h1Text: string): string {
  if (!h1Text) return ''
  
  // Limpiar el texto del H1
  const cleanTitle = h1Text.trim()
  
  // Si ya contiene "Calculadora de", lo devolvemos tal como está
  if (cleanTitle.includes('Calculadora de')) {
    return cleanTitle
  }
  
  // Si no, agregamos el prefijo "Calculadora de"
  return `Calculadora de ${cleanTitle}`
}

/**
 * Mapeo de títulos H1 a títulos de página para casos especiales
 */
export const h1ToPageTitleMap: Record<string, string> = {
  'IMC': 'Calculadora de IMC - Índice de Masa Corporal',
  'TMB': 'Calculadora de TMB - Tasa Metabólica Basal',
  'Grasa Corporal': 'Calculadora de Porcentaje de Grasa Corporal',
  'PaFi': 'Calculadora PaFi - Presión Arterial y Frecuencia Cardíaca',
  'Agua Diaria': 'Calculadora de Agua Diaria Recomendada - Hidratación Saludable',
  'Ovulación': 'Calculadora de Ovulación y Días Fértiles - Ciclo Menstrual',
  'Escala de Notas': 'Calculadora de Escala de Notas - Conversión A B C D F',
  'Gasto de Gasolina': 'Calculadora de Gasto de Gasolina - Costo por Kilómetro',
  'Contador de Palabras': 'Contador de Palabras y Caracteres Online',
  'Números Romanos': 'Conversor de Números Romanos - Romano a Arábigo',
  'Contador de Clicks': 'Contador de Clicks - CPS Test Online',
  'Propinas': 'Calculadora de Propinas - Calcular Propina y Dividir Cuenta',
  'Conversión de Almacenamiento': 'Calculadora de Conversión de Almacenamiento - KB, MB, GB, TB',
  'Velocidad de Descarga': 'Calculadora de Velocidad de Descarga - Mbps a MB/s',
  'Uptime/Downtime': 'Calculadora de Uptime/Downtime - Porcentaje de Disponibilidad',
  'Conversión de Colores': 'Calculadora de Conversión de Colores - HEX, RGB, CMYK, HSL',
  'Análisis de Contraseñas': 'Analizador de Contraseñas - Entropía y Fortaleza de Contraseñas',
  'Análisis de Latencia': 'Analizador de Latencia - Ping y Tiempo de Respuesta',
  'Días entre Fechas': 'Calculadora de Días entre Fechas - Contador de Días',
  'Calculadora de Edad': 'Calculadora de Edad - Calcular Edad Exacta',
  'Sumar/Restar Días': 'Sumar y Restar Días a una Fecha - Calculadora de Fechas',
  'Horas y Minutos': 'Calculadora de Horas y Minutos - Suma y Resta de Tiempo',
  'Días de Vacaciones': 'Calculadora de Días de Vacaciones - Días Laborables',
  'Interés Simple': 'Calculadora de Interés Simple - Préstamos y Deudas',
  'Depreciación de Vehículos': 'Calculadora de Depreciación de Vehículos - Valor Residual',
  'Hipoteca': 'Calculadora de Hipoteca - Préstamo Hipotecario',
  'IPC': 'Calculadora del IPC - Índice de Precios al Consumidor',
  'Ahorro Objetivo': 'Calculadora de Ahorro Objetivo - Meta Financiera',
  'Valor Futuro y Presente': 'Calculadora de Valor Futuro y Presente - FV y PV',
  'CAC': 'Calculadora de CAC - Costo de Adquisición de Cliente',
  'LTV': 'Calculadora de LTV - Lifetime Value del Cliente',
  'Conversión': 'Calculadora de Conversión - Tasas de Conversión por Etapas',
  'Presupuesto de Marketing': 'Calculadora de Presupuesto de Marketing - Inversión Recomendada',
  'CPC/CPM': 'Calculadora de CPC/CPM - Costo por Clic e Impresiones',
  'ROI en Marketing': 'Calculadora de ROI en Marketing - Retorno de Inversión',
  'Café vs. Ahorro': 'Calculadora de Café vs. Ahorro - Cuánto Ahorrarías Dejando el Café',
  'Pizza por Persona': 'Calculadora de Pizza por Persona - Cuántas Pizzas Necesitas',
  'Expectativa de Vida y Comida Chatarra': 'Calculadora de Expectativa de Vida y Comida Chatarra - Impacto en la Salud',
  'Besos Quemacalorías': 'Calculadora de Besos Quemacalorías - Calorías Quemadas por Besos y Abrazos',
  'Tiempo de Vida en Películas': 'Calculadora de Tiempo de Vida en Películas - Cuántos Años Dedicamos al Cine',
  'Nivel de Friolento': 'Calculadora de Nivel de Friolento - Ciudades Ideales para tu Temperatura',
  'Edad de tu Mascota': 'Calculadora de Edad de tu Mascota - Convierte Años Humanos a Años Perro y Gato',
  'Cerveza por Fiesta': 'Calculadora de Cerveza por Fiesta - Cuántos Litros Necesitas para tu Evento',
  'Tiempo en Transporte Público': 'Calculadora de Tiempo en Transporte Público - Cuántos Días de Vida Gastas Viajando',
  'Expectativa de Vida en Animales': 'Calculadora de Expectativa de Vida en Animales - Tu Edad en Vidas de Tortuga, Colibrí y Mosca',
  'Calculadora de Amor': 'Calculadora de Amor - Compatibilidad entre Nombres (Divertido y Viral)',
  'Tiempo en Netflix': 'Calculadora de Tiempo en Netflix - Cuántas Temporadas Viste y Qué Podrías Haber Hecho',
}

/**
 * Obtiene el título de página optimizado basado en el H1
 * @param h1Text - Texto del H1
 * @returns Título optimizado para SEO
 */
export function getOptimizedPageTitle(h1Text: string): string {
  if (!h1Text) return ''
  
  const cleanH1 = h1Text.trim()
  
  // Buscar en el mapeo de casos especiales
  if (h1ToPageTitleMap[cleanH1]) {
    return h1ToPageTitleMap[cleanH1]
  }
  
  // Si no está en el mapeo, usar la función genérica
  return extractH1Title(cleanH1)
}
