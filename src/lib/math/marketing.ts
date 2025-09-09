/**
 * Funciones matemáticas para calculadoras de marketing
 */

/**
 * Calcula el Costo de Adquisición de Cliente (CAC)
 * @param inversionTotal - Inversión total en marketing y ventas
 * @param nuevosClientes - Cantidad de nuevos clientes adquiridos
 * @returns Objeto con CAC y detalles del cálculo
 */
export function calcularCAC(inversionTotal: number, nuevosClientes: number) {
  const cac = inversionTotal / nuevosClientes
  
  return {
    inversionTotal,
    nuevosClientes,
    cac,
    inversionPorCliente: cac
  }
}

/**
 * Calcula el Lifetime Value (LTV) de un cliente
 * @param ticketPromedio - Valor promedio por compra
 * @param frecuenciaCompra - Veces que compra por año
 * @param duracionRelacion - Años de duración de la relación
 * @returns Objeto con LTV y detalles del cálculo
 */
export function calcularLTV(ticketPromedio: number, frecuenciaCompra: number, duracionRelacion: number) {
  const ltv = ticketPromedio * frecuenciaCompra * duracionRelacion
  
  return {
    ticketPromedio,
    frecuenciaCompra,
    duracionRelacion,
    ltv,
    valorAnual: ticketPromedio * frecuenciaCompra
  }
}

/**
 * Calcula tasas de conversión en diferentes etapas del embudo
 * @param visitantes - Número de visitantes
 * @param leads - Número de leads generados
 * @param ventas - Número de ventas realizadas
 * @returns Objeto con tasas de conversión
 */
export function calcularConversion(visitantes: number, leads: number, ventas: number) {
  const tasaVisitasALeads = (leads / visitantes) * 100
  const tasaLeadsAVentas = (ventas / leads) * 100
  const tasaVisitasAVentas = (ventas / visitantes) * 100
  
  return {
    visitantes,
    leads,
    ventas,
    tasaVisitasALeads,
    tasaLeadsAVentas,
    tasaVisitasAVentas
  }
}

/**
 * Calcula el presupuesto recomendado de marketing
 * @param ingresosTotales - Ingresos totales de la empresa
 * @param porcentajeRecomendado - Porcentaje recomendado (por defecto 7.5%)
 * @returns Objeto con presupuesto y recomendaciones
 */
export function calcularPresupuestoMarketing(ingresosTotales: number, porcentajeRecomendado: number = 7.5) {
  const presupuestoRecomendado = (ingresosTotales * porcentajeRecomendado) / 100
  const presupuestoMinimo = (ingresosTotales * 5) / 100
  const presupuestoMaximo = (ingresosTotales * 10) / 100
  
  return {
    ingresosTotales,
    porcentajeRecomendado,
    presupuestoRecomendado,
    presupuestoMinimo,
    presupuestoMaximo
  }
}

/**
 * Calcula CPC (Costo Por Clic) y CPM (Costo Por Mil Impresiones)
 * @param inversionTotal - Inversión total en la campaña
 * @param clicks - Número de clicks recibidos
 * @param impresiones - Número de impresiones
 * @returns Objeto con CPC y CPM
 */
export function calcularCPCCPM(inversionTotal: number, clicks: number, impresiones: number) {
  const cpc = inversionTotal / clicks
  const cpm = (inversionTotal / impresiones) * 1000
  const ctr = (clicks / impresiones) * 100 // Click Through Rate
  
  return {
    inversionTotal,
    clicks,
    impresiones,
    cpc,
    cpm,
    ctr
  }
}

/**
 * Calcula el ROI (Retorno de Inversión) en marketing
 * @param ingresos - Ingresos generados por la campaña
 * @param inversion - Inversión realizada en la campaña
 * @returns Objeto con ROI y detalles del cálculo
 */
export function calcularROIMarketing(ingresos: number, inversion: number) {
  const roi = ((ingresos - inversion) / inversion) * 100
  const gananciaNeta = ingresos - inversion
  const ratioROI = ingresos / inversion
  
  return {
    ingresos,
    inversion,
    gananciaNeta,
    roi,
    ratioROI
  }
}
