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

/**
 * Convierte años humanos a años de mascota (perro o gato)
 * @param añosHumanos - Edad en años humanos
 * @param tipoMascota - Tipo de mascota ('perro' o 'gato')
 * @returns Objeto con edad convertida y descripción
 */
export function convertirEdadMascota(añosHumanos: number, tipoMascota: 'perro' | 'gato'): {
  edadMascota: number;
  descripcion: string;
  etapa: string;
} {
  let edadMascota: number;
  let etapa: string;

  if (tipoMascota === 'perro') {
    // Fórmula científica aproximada para perros
    if (añosHumanos <= 2) {
      edadMascota = añosHumanos * 10.5;
    } else {
      edadMascota = 21 + (añosHumanos - 2) * 4;
    }

    if (edadMascota < 15) etapa = 'cachorro';
    else if (edadMascota < 35) etapa = 'adulto joven';
    else if (edadMascota < 60) etapa = 'adulto';
    else etapa = 'senior';
  } else {
    // Fórmula para gatos
    if (añosHumanos <= 1) {
      edadMascota = añosHumanos * 15;
    } else if (añosHumanos <= 2) {
      edadMascota = 15 + (añosHumanos - 1) * 9;
    } else {
      edadMascota = 24 + (añosHumanos - 2) * 4;
    }

    if (edadMascota < 15) etapa = 'gatito';
    else if (edadMascota < 30) etapa = 'adulto joven';
    else if (edadMascota < 60) etapa = 'adulto';
    else etapa = 'senior';
  }

  const descripcion = `Tu ${tipoMascota} de ${añosHumanos} años humanos tiene aproximadamente ${Math.round(edadMascota)} años de ${tipoMascota} (etapa: ${etapa})`;

  return {
    edadMascota: Math.round(edadMascota),
    descripcion,
    etapa
  };
}

/**
 * Calcula la cantidad de cerveza necesaria para una fiesta
 * @param invitados - Número de invitados
 * @param nivelConsumo - Nivel de consumo (1=bajo, 2=moderado, 3=alto)
 * @param duracionHoras - Duración de la fiesta en horas
 * @param precioLitro - Precio por litro de cerveza
 * @returns Objeto con cálculos de cerveza
 */
export function calcularCervezaFiesta(
  invitados: number, 
  nivelConsumo: number, 
  duracionHoras: number, 
  precioLitro: number
): {
  litrosNecesarios: number;
  costoTotal: number;
  tiempoTerminacion: number;
  mensaje: string;
} {
  // Consumo por persona por hora según nivel
  const consumoPorHora = {
    1: 0.3, // Bajo: 300ml por hora
    2: 0.5, // Moderado: 500ml por hora
    3: 0.8  // Alto: 800ml por hora
  };

  const litrosNecesarios = invitados * duracionHoras * consumoPorHora[nivelConsumo as keyof typeof consumoPorHora];
  const costoTotal = litrosNecesarios * precioLitro;
  const tiempoTerminacion = duracionHoras; // Asumiendo que se consume durante toda la fiesta

  const niveles = ['bajo', 'moderado', 'alto'];
  const mensaje = `Para ${invitados} invitados con consumo ${niveles[nivelConsumo - 1]} durante ${duracionHoras}h, necesitas ${litrosNecesarios.toFixed(1)} litros (costo: $${costoTotal.toFixed(0)})`;

  return {
    litrosNecesarios: Math.round(litrosNecesarios * 10) / 10,
    costoTotal: Math.round(costoTotal),
    tiempoTerminacion,
    mensaje
  };
}

/**
 * Calcula el tiempo de vida gastado en transporte público
 * @param minutosDiarios - Minutos diarios en transporte
 * @param diasLaborales - Días laborales por año (por defecto 250)
 * @param añosTrabajo - Años trabajando (por defecto 40)
 * @returns Objeto con tiempo calculado
 */
export function calcularTiempoTransporte(
  minutosDiarios: number, 
  diasLaborales: number = 250, 
  añosTrabajo: number = 40
): {
  minutosTotales: number;
  horasTotales: number;
  diasTotales: number;
  añosTotales: number;
  porcentajeVida: number;
  mensaje: string;
} {
  const minutosTotales = minutosDiarios * diasLaborales * añosTrabajo;
  const horasTotales = minutosTotales / 60;
  const diasTotales = horasTotales / 24;
  const añosTotales = diasTotales / 365;
  const porcentajeVida = (añosTotales / añosTrabajo) * 100;

  const mensaje = `En ${añosTrabajo} años de trabajo, gastarás ${Math.round(diasTotales)} días (${añosTotales.toFixed(1)} años) en transporte público`;

  return {
    minutosTotales,
    horasTotales: Math.round(horasTotales),
    diasTotales: Math.round(diasTotales),
    añosTotales: Math.round(añosTotales * 10) / 10,
    porcentajeVida: Math.round(porcentajeVida * 10) / 10,
    mensaje
  };
}

/**
 * Convierte edad humana a expectativa de vida de animales
 * @param edadHumana - Edad en años humanos
 * @param animal - Tipo de animal ('tortuga', 'colibri', 'mosca')
 * @returns Objeto con comparación
 */
export function convertirEdadAnimales(edadHumana: number, animal: 'tortuga' | 'colibri' | 'mosca'): {
  vidasAnimal: number;
  descripcion: string;
  expectativaAnimal: number;
} {
  const expectativas = {
    tortuga: 150, // años
    colibri: 5,   // años
    mosca: 0.02   // años (7 días)
  };

  const expectativaAnimal = expectativas[animal];
  const vidasAnimal = edadHumana / expectativaAnimal;

  let descripcion: string;
  if (animal === 'tortuga') {
    descripcion = `Tu edad de ${edadHumana} años equivale a ${vidasAnimal.toFixed(2)} vidas de tortuga`;
  } else if (animal === 'colibri') {
    descripcion = `Tu edad de ${edadHumana} años equivale a ${vidasAnimal.toFixed(1)} años de colibrí`;
  } else {
    descripcion = `Tu edad de ${edadHumana} años equivale a ${Math.round(vidasAnimal)} días de mosca`;
  }

  return {
    vidasAnimal: Math.round(vidasAnimal * 100) / 100,
    descripcion,
    expectativaAnimal
  };
}

/**
 * Calcula compatibilidad de amor entre dos nombres (algoritmo divertido)
 * @param nombre1 - Primer nombre
 * @param nombre2 - Segundo nombre
 * @returns Objeto con porcentaje y mensaje
 */
export function calcularCompatibilidadAmor(nombre1: string, nombre2: string): {
  porcentaje: number;
  mensaje: string;
  nivel: string;
} {
  // Algoritmo "científico" basado en caracteres y posiciones
  const n1 = nombre1.toLowerCase().replace(/\s/g, '');
  const n2 = nombre2.toLowerCase().replace(/\s/g, '');
  
  let score = 0;
  
  // Suma de códigos ASCII
  for (let i = 0; i < n1.length; i++) {
    score += n1.charCodeAt(i);
  }
  for (let i = 0; i < n2.length; i++) {
    score += n2.charCodeAt(i);
  }
  
  // Factor de longitud
  const factorLongitud = Math.abs(n1.length - n2.length) + 1;
  
  // Cálculo final
  let porcentaje = (score % 100) / factorLongitud;
  if (porcentaje > 100) porcentaje = 100 - (porcentaje % 100);
  if (porcentaje < 10) porcentaje = 10 + (score % 20);
  
  let nivel: string;
  if (porcentaje >= 90) nivel = 'Soulmates';
  else if (porcentaje >= 80) nivel = 'Muy Compatibles';
  else if (porcentaje >= 70) nivel = 'Compatibles';
  else if (porcentaje >= 60) nivel = 'Moderadamente Compatibles';
  else if (porcentaje >= 50) nivel = 'Neutrales';
  else if (porcentaje >= 40) nivel = 'Poco Compatibles';
  else nivel = 'Incompatibles';

  const mensaje = `${nombre1} y ${nombre2} tienen un ${Math.round(porcentaje)}% de compatibilidad (${nivel})`;

  return {
    porcentaje: Math.round(porcentaje),
    mensaje,
    nivel
  };
}

/**
 * Calcula estadísticas de tiempo en Netflix
 * @param horasSemanales - Horas semanales viendo Netflix
 * @param añosViendo - Años viendo Netflix
 * @returns Objeto con estadísticas
 */
export function calcularTiempoNetflix(horasSemanales: number, añosViendo: number): {
  horasTotales: number;
  diasTotales: number;
  temporadasVistas: number;
  seriesCompletas: number;
  actividadesAlternativas: string[];
  mensaje: string;
} {
  const horasTotales = horasSemanales * 52 * añosViendo;
  const diasTotales = horasTotales / 24;
  const temporadasVistas = Math.round(horasTotales / 8); // 8 horas por temporada promedio
  const seriesCompletas = Math.round(temporadasVistas / 3); // 3 temporadas por serie promedio

  const actividadesAlternativas = [
    `Leer ${Math.round(horasTotales / 2)} libros`,
    `Aprender ${Math.round(horasTotales / 40)} idiomas nuevos`,
    `Hacer ${Math.round(horasTotales / 3)} viajes de fin de semana`,
    `Escribir ${Math.round(horasTotales / 10)} novelas`,
    `Hacer ejercicio ${Math.round(horasTotales / 1.5)} horas`,
    `Trabajar en ${Math.round(horasTotales / 20)} proyectos personales`
  ];

  const mensaje = `En ${añosViendo} años has visto ${temporadasVistas} temporadas (${seriesCompletas} series completas) en ${Math.round(diasTotales)} días de Netflix`;

  return {
    horasTotales: Math.round(horasTotales),
    diasTotales: Math.round(diasTotales),
    temporadasVistas,
    seriesCompletas,
    actividadesAlternativas,
    mensaje
  };
}
