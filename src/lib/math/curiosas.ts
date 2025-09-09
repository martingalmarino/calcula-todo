/**
 * Funciones matemáticas para calculadoras curiosas
 */

/**
 * Calcula el ahorro a largo plazo si dejas de tomar café diario
 * @param precioCafe - Precio del café por día
 * @param años - Número de años
 * @param tasaInteres - Tasa de interés anual (por defecto 5%)
 * @returns Objeto con ahorro total y detalles
 */
export function calcularAhorroCafe(precioCafe: number, años: number, tasaInteres: number = 5) {
  const ahorroDiario = precioCafe;
  const ahorroAnual = ahorroDiario * 365;
  const tasaMensual = tasaInteres / 100 / 12;
  const meses = años * 12;
  
  // Fórmula de interés compuesto mensual
  const ahorroTotal = ahorroAnual * ((Math.pow(1 + tasaMensual, meses) - 1) / tasaMensual);
  const ahorroSinInteres = ahorroAnual * años;
  const gananciaInteres = ahorroTotal - ahorroSinInteres;
  
  return {
    precioCafe,
    años,
    tasaInteres,
    ahorroDiario,
    ahorroAnual,
    ahorroTotal,
    ahorroSinInteres,
    gananciaInteres
  };
}

/**
 * Calcula cuántas pizzas necesitas según personas y hambre
 * @param personas - Número de personas
 * @param nivelHambre - Nivel de hambre (1-5, donde 5 es muy hambriento)
 * @param tamañoPizza - Tamaño de la pizza ('pequeña', 'mediana', 'grande')
 * @returns Objeto con cantidad de pizzas y detalles
 */
export function calcularPizzasNecesarias(personas: number, nivelHambre: number, tamañoPizza: string) {
  const porcionesPorPizza = {
    'pequeña': 4,
    'mediana': 6,
    'grande': 8
  };
  
  const porcionesPorPersona = {
    1: 1, // Poco hambre
    2: 1.5, // Hambre normal
    3: 2, // Hambre moderada
    4: 2.5, // Mucha hambre
    5: 3 // Muy hambriento
  };
  
  const porcionesNecesarias = personas * porcionesPorPersona[nivelHambre as keyof typeof porcionesPorPersona];
  const pizzasNecesarias = Math.ceil(porcionesNecesarias / porcionesPorPizza[tamañoPizza as keyof typeof porcionesPorPizza]);
  
  return {
    personas,
    nivelHambre,
    tamañoPizza,
    porcionesNecesarias,
    pizzasNecesarias,
    porcionesPorPizza: porcionesPorPizza[tamañoPizza as keyof typeof porcionesPorPizza]
  };
}

/**
 * Calcula el impacto de la comida chatarra en la expectativa de vida
 * @param hamburguesas - Hamburguesas por semana
 * @param gaseosas - Gaseosas por semana
 * @param pizzas - Pizzas por semana
 * @returns Objeto con días perdidos y detalles
 */
export function calcularImpactoComidaChatarra(hamburguesas: number, gaseosas: number, pizzas: number) {
  // Estimaciones basadas en estudios (simplificadas para fines educativos)
  const diasPerdidosPorHamburguesa = 0.5;
  const diasPerdidosPorGaseosa = 0.1;
  const diasPerdidosPorPizza = 0.3;
  
  const diasPerdidosSemana = (hamburguesas * diasPerdidosPorHamburguesa) + 
                            (gaseosas * diasPerdidosPorGaseosa) + 
                            (pizzas * diasPerdidosPorPizza);
  
  const diasPerdidosAño = diasPerdidosSemana * 52;
  const diasPerdidosVida = diasPerdidosAño * 50; // Asumiendo 50 años de consumo
  
  return {
    hamburguesas,
    gaseosas,
    pizzas,
    diasPerdidosSemana,
    diasPerdidosAño,
    diasPerdidosVida,
    añosPerdidos: diasPerdidosVida / 365
  };
}

/**
 * Calcula calorías quemadas por actividades afectivas
 * @param actividad - Tipo de actividad ('besos', 'abrazos', 'risas')
 * @param minutos - Duración en minutos
 * @param intensidad - Intensidad (1-5, donde 5 es muy intenso)
 * @returns Objeto con calorías quemadas y equivalencias
 */
export function calcularCaloriasAfectivas(actividad: string, minutos: number, intensidad: number) {
  const caloriasPorMinuto = {
    'besos': 2 * intensidad,
    'abrazos': 1.5 * intensidad,
    'risas': 1 * intensidad
  };
  
  const caloriasQuemadas = caloriasPorMinuto[actividad as keyof typeof caloriasPorMinuto] * minutos;
  
  // Equivalencias divertidas
  const equivalencias = {
    chocolate: Math.round(caloriasQuemadas / 50), // 50 cal por chocolate pequeño
    manzana: Math.round(caloriasQuemadas / 80), // 80 cal por manzana
    minutosCaminando: Math.round(caloriasQuemadas / 3) // 3 cal por minuto caminando
  };
  
  return {
    actividad,
    minutos,
    intensidad,
    caloriasQuemadas,
    equivalencias
  };
}

/**
 * Calcula tiempo de vida dedicado a películas y series
 * @param horasSemanales - Horas por semana viendo contenido
 * @param edadActual - Edad actual
 * @param expectativaVida - Expectativa de vida (por defecto 80 años)
 * @returns Objeto con tiempo total y equivalencias
 */
export function calcularTiempoPeliculas(horasSemanales: number, edadActual: number, expectativaVida: number = 80) {
  const horasAnuales = horasSemanales * 52;
  const añosRestantes = expectativaVida - edadActual;
  const horasTotalesVida = horasAnuales * añosRestantes;
  
  const añosDedicados = horasTotalesVida / (365 * 24);
  const peliculasCompletas = Math.round(horasTotalesVida / 2); // Asumiendo 2 horas por película
  const seriesCompletas = Math.round(horasTotalesVida / 8); // Asumiendo 8 horas por temporada
  
  return {
    horasSemanales,
    edadActual,
    expectativaVida,
    horasAnuales,
    añosRestantes,
    horasTotalesVida,
    añosDedicados,
    peliculasCompletas,
    seriesCompletas
  };
}

/**
 * Encuentra ciudades con temperatura ideal para el usuario
 * @param temperaturaIdeal - Temperatura ideal en grados Celsius
 * @param tolerancia - Tolerancia en grados (por defecto 3)
 * @returns Objeto con ciudades y detalles climáticos
 */
export function encontrarCiudadesIdeal(temperaturaIdeal: number, tolerancia: number = 3) {
  // Base de datos simplificada de ciudades y sus temperaturas promedio anuales
  const ciudades = [
    { nombre: 'Barcelona, España', temperatura: 16, pais: 'España' },
    { nombre: 'San Diego, USA', temperatura: 17, pais: 'Estados Unidos' },
    { nombre: 'Niza, Francia', temperatura: 15, pais: 'Francia' },
    { nombre: 'Lisboa, Portugal', temperatura: 17, pais: 'Portugal' },
    { nombre: 'Atenas, Grecia', temperatura: 18, pais: 'Grecia' },
    { nombre: 'Roma, Italia', temperatura: 16, pais: 'Italia' },
    { nombre: 'Valencia, España', temperatura: 18, pais: 'España' },
    { nombre: 'Málaga, España', temperatura: 19, pais: 'España' },
    { nombre: 'Palma de Mallorca, España', temperatura: 17, pais: 'España' },
    { nombre: 'Cannes, Francia', temperatura: 16, pais: 'Francia' },
    { nombre: 'Monte Carlo, Mónaco', temperatura: 16, pais: 'Mónaco' },
    { nombre: 'Florencia, Italia', temperatura: 15, pais: 'Italia' },
    { nombre: 'Venecia, Italia', temperatura: 14, pais: 'Italia' },
    { nombre: 'Nápoles, Italia', temperatura: 17, pais: 'Italia' },
    { nombre: 'Palermo, Italia', temperatura: 18, pais: 'Italia' }
  ];
  
  const ciudadesIdeal = ciudades.filter(ciudad => 
    Math.abs(ciudad.temperatura - temperaturaIdeal) <= tolerancia
  );
  
  const ciudadesCercanas = ciudades.filter(ciudad => 
    Math.abs(ciudad.temperatura - temperaturaIdeal) <= tolerancia + 2 &&
    !ciudadesIdeal.includes(ciudad)
  );
  
  return {
    temperaturaIdeal,
    tolerancia,
    ciudadesIdeal,
    ciudadesCercanas,
    totalCiudadesIdeal: ciudadesIdeal.length
  };
}
