/**
 * Funciones matemáticas para cálculos financieros
 */

/**
 * Calcula el interés simple
 * @param capital - Capital inicial
 * @param tasa - Tasa de interés anual (en decimal, ej: 0.12 para 12%)
 * @param tiempo - Tiempo en años
 * @returns Objeto con el interés y monto total
 */
export function calcularInteresSimple(capital: number, tasa: number, tiempo: number) {
  const interes = capital * tasa * tiempo
  const montoTotal = capital + interes
  
  return {
    capital,
    tasa: tasa * 100, // Convertir a porcentaje para mostrar
    tiempo,
    interes,
    montoTotal
  }
}

/**
 * Calcula la depreciación de un vehículo usando método lineal
 * @param valorInicial - Valor inicial del vehículo
 * @param valorResidual - Valor residual estimado
 * @param vidaUtil - Vida útil en años
 * @returns Objeto con la depreciación anual y mensual
 */
export function calcularDepreciacionVehiculo(valorInicial: number, valorResidual: number, vidaUtil: number) {
  const depreciacionAnual = (valorInicial - valorResidual) / vidaUtil
  const depreciacionMensual = depreciacionAnual / 12
  
  return {
    valorInicial,
    valorResidual,
    vidaUtil,
    depreciacionAnual,
    depreciacionMensual,
    valorActual: valorInicial - depreciacionAnual
  }
}

/**
 * Calcula una hipoteca con desglose mensual
 * @param monto - Monto del préstamo
 * @param tasaAnual - Tasa de interés anual (en decimal)
 * @param plazoAnos - Plazo en años
 * @returns Objeto con cuota mensual, total de intereses y cronograma
 */
export function calcularHipoteca(monto: number, tasaAnual: number, plazoAnos: number) {
  const tasaMensual = tasaAnual / 12
  const numPagos = plazoAnos * 12
  
  // Fórmula de cuota fija
  const cuotaMensual = monto * (tasaMensual * Math.pow(1 + tasaMensual, numPagos)) / 
                      (Math.pow(1 + tasaMensual, numPagos) - 1)
  
  const totalPagos = cuotaMensual * numPagos
  const totalIntereses = totalPagos - monto
  
  // Generar cronograma de los primeros 12 meses
  const cronograma = []
  let saldoPendiente = monto
  
  for (let mes = 1; mes <= Math.min(12, numPagos); mes++) {
    const interesMensual = saldoPendiente * tasaMensual
    const capitalMensual = cuotaMensual - interesMensual
    saldoPendiente -= capitalMensual
    
    cronograma.push({
      mes,
      cuota: cuotaMensual,
      capital: capitalMensual,
      interes: interesMensual,
      saldo: Math.max(0, saldoPendiente)
    })
  }
  
  return {
    monto,
    tasaAnual: tasaAnual * 100,
    plazoAnos,
    cuotaMensual,
    totalPagos,
    totalIntereses,
    cronograma
  }
}

/**
 * Calcula el IPC y poder adquisitivo
 * @param monto - Monto a analizar
 * @param ipcInicial - IPC del año inicial
 * @param ipcFinal - IPC del año final
 * @returns Objeto con el poder adquisitivo y variación
 */
export function calcularIPC(monto: number, ipcInicial: number, ipcFinal: number) {
  const variacionIPC = ((ipcFinal - ipcInicial) / ipcInicial) * 100
  const poderAdquisitivo = monto * (ipcInicial / ipcFinal)
  const perdidaPoderAdquisitivo = monto - poderAdquisitivo
  
  return {
    monto,
    ipcInicial,
    ipcFinal,
    variacionIPC,
    poderAdquisitivo,
    perdidaPoderAdquisitivo
  }
}

/**
 * Calcula el ahorro mensual necesario para alcanzar un objetivo
 * @param objetivo - Meta de ahorro
 * @param tasaAnual - Tasa de interés anual (en decimal)
 * @param plazoAnos - Plazo en años
 * @returns Objeto con el ahorro mensual y total ahorrado
 */
export function calcularAhorroObjetivo(objetivo: number, tasaAnual: number, plazoAnos: number) {
  const tasaMensual = tasaAnual / 12
  const numPagos = plazoAnos * 12
  
  // Fórmula de anualidad
  const ahorroMensual = objetivo * tasaMensual / 
                       (Math.pow(1 + tasaMensual, numPagos) - 1)
  
  const totalAhorrado = ahorroMensual * numPagos
  const interesesGanados = objetivo - totalAhorrado
  
  return {
    objetivo,
    tasaAnual: tasaAnual * 100,
    plazoAnos,
    ahorroMensual,
    totalAhorrado,
    interesesGanados
  }
}

/**
 * Calcula el valor futuro de una inversión
 * @param valorPresente - Valor presente
 * @param tasaAnual - Tasa de interés anual (en decimal)
 * @param tiempoAnos - Tiempo en años
 * @returns Valor futuro
 */
export function calcularValorFuturo(valorPresente: number, tasaAnual: number, tiempoAnos: number) {
  return valorPresente * Math.pow(1 + tasaAnual, tiempoAnos)
}

/**
 * Calcula el valor presente de un monto futuro
 * @param valorFuturo - Valor futuro
 * @param tasaAnual - Tasa de descuento anual (en decimal)
 * @param tiempoAnos - Tiempo en años
 * @returns Valor presente
 */
export function calcularValorPresente(valorFuturo: number, tasaAnual: number, tiempoAnos: number) {
  return valorFuturo / Math.pow(1 + tasaAnual, tiempoAnos)
}
