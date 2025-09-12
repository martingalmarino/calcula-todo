/**
 * Configuración centralizada del sitio web
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface Calculator {
  label: string;
  href: string;
  description: string;
  icon?: string;
  category: string;
  keywords: string[];
}

export interface Category {
  label: string;
  href: string;
  description: string;
  calculators: Calculator[];
  subcategories?: Array<{
    label: string;
    href: string;
    description: string;
  }>;
}

export interface SiteConfig {
  baseUrl: string;
  name: string;
  description: string;
  nav: NavItem[];
  clusters: Record<string, Category>;
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
  };
}

export const SITE: SiteConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://calculatodo.online',
  name: 'CalculaTodo.online',
  description: 'Calculadoras matemáticas online gratuitas: fracciones, porcentajes, álgebra, trigonometría y más. Resultados rápidos y explicados paso a paso.',
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Matemáticas', href: '/matematicas/' },
    { label: 'Finanzas', href: '/finanzas/' },
    { label: 'Marketing', href: '/marketing/' },
    { label: 'Curiosas', href: '/curiosas/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Acerca', href: '/acerca/' },
    { label: 'Contacto', href: '/contacto/' },
  ],
  clusters: {
    matematicas: {
      label: 'Matemáticas',
      href: '/matematicas/',
      description: 'Calculadoras matemáticas para resolver operaciones de fracciones, porcentajes, álgebra, trigonometría, cálculo y más.',
      calculators: [
        {
          label: 'Fracciones',
          href: '/matematicas/fracciones/',
          description: 'Simplificar, convertir, sumar, restar, multiplicar y dividir fracciones',
          icon: 'fraction',
          category: 'aritmética',
          keywords: ['fracciones', 'simplificar', 'sumar', 'restar', 'multiplicar', 'dividir', 'decimal']
        },
        {
          label: 'Porcentajes',
          href: '/matematicas/porcentajes/',
          description: 'Calcular porcentajes, descuentos, aumentos y variaciones porcentuales',
          icon: 'percentage',
          category: 'aritmética',
          keywords: ['porcentajes', 'descuentos', 'aumentos', 'variación', 'proporción']
        },
        {
          label: 'Potencias y Raíces',
          href: '/matematicas/potencias-raices/',
          description: 'Calcular potencias, raíces cuadradas, cúbicas y n-ésimas',
          icon: 'power',
          category: 'aritmética',
          keywords: ['potencias', 'raíces', 'cuadrada', 'cúbica', 'exponente', 'radical']
        },
        {
          label: 'Álgebra',
          href: '/matematicas/algebra/',
          description: 'Resolver ecuaciones lineales, cuadráticas y sistemas de ecuaciones',
          icon: 'algebra',
          category: 'álgebra',
          keywords: ['ecuaciones', 'lineales', 'cuadráticas', 'sistemas', 'álgebra', 'incógnitas']
        },
        {
          label: 'Trigonometría',
          href: '/matematicas/trigonometria/',
          description: 'Calcular seno, coseno, tangente y funciones trigonométricas inversas',
          icon: 'trigonometry',
          category: 'trigonometría',
          keywords: ['trigonometría', 'seno', 'coseno', 'tangente', 'grados', 'radianes']
        },
        {
          label: 'Derivadas',
          href: '/matematicas/derivadas/',
          description: 'Calcular derivadas numéricas y analíticas de funciones',
          icon: 'derivative',
          category: 'cálculo',
          keywords: ['derivadas', 'cálculo', 'diferencial', 'pendiente', 'función']
        },
        {
          label: 'Integrales',
          href: '/matematicas/integrales/',
          description: 'Calcular integrales definidas e indefinidas numéricamente',
          icon: 'integral',
          category: 'cálculo',
          keywords: ['integrales', 'cálculo', 'área', 'antiderivada', 'simpson']
        },
        {
          label: 'Matrices',
          href: '/matematicas/matrices/',
          description: 'Operaciones con matrices: suma, multiplicación, determinante e inversa',
          icon: 'matrix',
          category: 'álgebra lineal',
          keywords: ['matrices', 'determinante', 'inversa', 'multiplicación', 'gauss']
        },
        {
          label: 'Combinatoria',
          href: '/matematicas/combinatoria/',
          description: 'Calcular permutaciones, combinaciones y factoriales',
          icon: 'combinatorics',
          category: 'combinatoria',
          keywords: ['combinatoria', 'permutaciones', 'combinaciones', 'factorial', 'probabilidad']
        },
        {
          label: 'Progresiones',
          href: '/matematicas/progresiones/',
          description: 'Progresiones aritméticas y geométricas: términos y sumas',
          icon: 'progression',
          category: 'secuencias',
          keywords: ['progresiones', 'aritméticas', 'geométricas', 'secuencias', 'series']
        },
        {
          label: 'Logaritmos',
          href: '/matematicas/logaritmos/',
          description: 'Calcular logaritmos en diferentes bases y cambio de base',
          icon: 'logarithm',
          category: 'logaritmos',
          keywords: ['logaritmos', 'base', 'natural', 'decimal', 'cambio de base']
        },
        {
          label: 'Coeficiente Binomial',
          href: '/matematicas/coeficiente-binomial/',
          description: 'Calcular el coeficiente binomial C(n,k) para combinaciones y probabilidades',
          icon: 'function',
          category: 'combinatoria',
          keywords: ['coeficiente binomial', 'combinaciones', 'C(n,k)', 'probabilidad', 'matemáticas discretas']
        }
      ],
      subcategories: [
        {
          label: 'Simplificar Fracciones',
          href: '/matematicas/fracciones/simplificar/',
          description: 'Simplificar fracciones a su forma irreducible'
        },
        {
          label: 'Operaciones con Fracciones',
          href: '/matematicas/fracciones/operaciones/',
          description: 'Sumar, restar, multiplicar y dividir fracciones'
        },
        {
          label: 'Descuentos',
          href: '/matematicas/porcentajes/descuento/',
          description: 'Calcular descuentos y precios finales'
        },
        {
          label: 'Aumentos',
          href: '/matematicas/porcentajes/aumento/',
          description: 'Calcular aumentos y precios finales'
        },
        {
          label: 'Ecuaciones Lineales',
          href: '/matematicas/algebra/ecuaciones-lineales/',
          description: 'Resolver ecuaciones de primer grado'
        },
        {
          label: 'Ecuaciones Cuadráticas',
          href: '/matematicas/algebra/ecuaciones-cuadraticas/',
          description: 'Resolver ecuaciones de segundo grado'
        },
        {
          label: 'Sistemas de Ecuaciones',
          href: '/matematicas/algebra/sistemas/',
          description: 'Resolver sistemas de ecuaciones lineales'
        },
        {
          label: 'Determinante',
          href: '/matematicas/matrices/determinante/',
          description: 'Calcular el determinante de una matriz'
        },
        {
          label: 'Matriz Inversa',
          href: '/matematicas/matrices/inversa/',
          description: 'Calcular la matriz inversa'
        }
      ]
    },
    finanzas: {
      label: 'Finanzas',
      href: '/finanzas/',
      description: 'Calculadoras financieras para interés simple, hipotecas, depreciación de vehículos, IPC, ahorro objetivo y valor futuro/presente.',
      calculators: [
        {
          label: 'Interés Simple',
          href: '/finanzas/interes-simple/',
          description: 'Calcular interés simple para préstamos cortos, descuentos y deudas básicas',
          icon: 'interest',
          category: 'interés',
          keywords: ['interés simple', 'préstamos', 'descuentos', 'deudas', 'capital', 'tasa']
        },
        {
          label: 'Depreciación de Vehículos',
          href: '/finanzas/depreciacion-vehiculos/',
          description: 'Calcular la depreciación de vehículos usando métodos estándar del mercado',
          icon: 'depreciation',
          category: 'depreciación',
          keywords: ['depreciación', 'vehículos', 'automóviles', 'valor residual', 'vida útil']
        },
        {
          label: 'Hipoteca',
          href: '/finanzas/hipoteca/',
          description: 'Calcular hipotecas con desglose mensual de capital e intereses',
          icon: 'mortgage',
          category: 'hipoteca',
          keywords: ['hipoteca', 'préstamo hipotecario', 'capital', 'intereses', 'cuota mensual']
        },
        {
          label: 'IPC',
          href: '/finanzas/ipc/',
          description: 'Calcular el Índice de Precios al Consumidor y poder adquisitivo',
          icon: 'inflation',
          category: 'inflación',
          keywords: ['IPC', 'inflación', 'poder adquisitivo', 'precios', 'consumo']
        },
        {
          label: 'Ahorro Objetivo',
          href: '/finanzas/ahorro-objetivo/',
          description: 'Calcular cuánto ahorrar mensualmente para alcanzar una meta financiera',
          icon: 'savings',
          category: 'ahorro',
          keywords: ['ahorro', 'objetivo', 'meta financiera', 'planificación', 'inversión']
        },
        {
          label: 'Valor Futuro y Presente',
          href: '/finanzas/valor-futuro-presente/',
          description: 'Calcular valor futuro (FV) y valor presente (PV) para comparar inversiones',
          icon: 'future-value',
          category: 'valor temporal',
          keywords: ['valor futuro', 'valor presente', 'FV', 'PV', 'inversiones', 'tasa de descuento']
        }
      ]
    },
    marketing: {
      label: 'Marketing',
      href: '/marketing/',
      description: 'Calculadoras de marketing para CAC, LTV, conversión, presupuesto, CPC/CPM y ROI de campañas.',
      calculators: [
        {
          label: 'CAC (Costo de Adquisición)',
          href: '/marketing/cac/',
          description: 'Calcular el costo de adquisición de cliente dividiendo inversión total entre nuevos clientes',
          icon: 'users',
          category: 'adquisición',
          keywords: ['CAC', 'costo adquisición', 'cliente', 'marketing', 'ventas', 'startup']
        },
        {
          label: 'LTV (Lifetime Value)',
          href: '/marketing/ltv/',
          description: 'Estimar el valor total de un cliente en el tiempo basado en ticket promedio y frecuencia',
          icon: 'trending-up',
          category: 'valor cliente',
          keywords: ['LTV', 'lifetime value', 'valor cliente', 'ticket promedio', 'frecuencia']
        },
        {
          label: 'Conversión',
          href: '/marketing/conversion/',
          description: 'Calcular tasas de conversión entre visitantes, leads y ventas en cada etapa',
          icon: 'target',
          category: 'conversión',
          keywords: ['conversión', 'tasa conversión', 'leads', 'ventas', 'embudo']
        },
        {
          label: 'Presupuesto de Marketing',
          href: '/marketing/presupuesto/',
          description: 'Definir cuánto invertir en marketing basado en ingresos totales (5-10% recomendado)',
          icon: 'dollar-sign',
          category: 'presupuesto',
          keywords: ['presupuesto', 'marketing', 'inversión', 'ingresos', 'porcentaje']
        },
        {
          label: 'CPC / CPM',
          href: '/marketing/cpc-cpm/',
          description: 'Calcular costo por clic (CPC) y costo por mil impresiones (CPM) para campañas publicitarias',
          icon: 'mouse-pointer',
          category: 'publicidad',
          keywords: ['CPC', 'CPM', 'costo clic', 'impresiones', 'Google Ads', 'Meta Ads']
        },
        {
          label: 'ROI en Marketing',
          href: '/marketing/roi/',
          description: 'Medir el retorno de inversión de campañas de marketing y publicidad',
          icon: 'bar-chart-3',
          category: 'ROI',
          keywords: ['ROI', 'retorno inversión', 'marketing', 'campañas', 'publicidad']
        }
      ]
    },
    curiosas: {
      label: 'Curiosas',
      href: '/curiosas/',
      description: 'Calculadoras divertidas y curiosas para descubrir datos sorprendentes sobre café, pizza, comida chatarra, besos, películas, mascotas, cerveza, transporte y más.',
      calculators: [
        {
          label: 'Café vs. Ahorro',
          href: '/curiosas/cafe-ahorro/',
          description: 'Calcula cuánto ahorrarías si dejaras de tomar café diario con interés compuesto',
          icon: 'coffee',
          category: 'ahorro',
          keywords: ['café', 'ahorro', 'starbucks', 'interés compuesto', 'finanzas personales']
        },
        {
          label: 'Pizza por Persona',
          href: '/curiosas/pizza-persona/',
          description: 'Calcula cuántas pizzas necesitas según personas, hambre y tamaño',
          icon: 'pizza',
          category: 'comida',
          keywords: ['pizza', 'personas', 'hambre', 'tamaño', 'fiesta']
        },
        {
          label: 'Expectativa de Vida y Comida',
          href: '/curiosas/expectativa-comida/',
          description: 'Descubre el impacto de la comida chatarra en tu expectativa de vida',
          icon: 'heart',
          category: 'salud',
          keywords: ['expectativa vida', 'comida chatarra', 'hamburguesas', 'salud', 'alimentación']
        },
        {
          label: 'Besos Quemacalorías',
          href: '/curiosas/besos-calorias/',
          description: 'Calcula las calorías quemadas por besos, abrazos y risas',
          icon: 'heart',
          category: 'ejercicio',
          keywords: ['besos', 'abrazos', 'calorías', 'ejercicio', 'risas']
        },
        {
          label: 'Tiempo en Películas',
          href: '/curiosas/tiempo-peliculas/',
          description: 'Calcula cuántos años de vida dedicas a ver películas y series',
          icon: 'tv',
          category: 'entretenimiento',
          keywords: ['películas', 'series', 'tiempo', 'entretenimiento', 'cine']
        },
        {
          label: 'Nivel de Friolento',
          href: '/curiosas/nivel-friolento/',
          description: 'Descubre en qué ciudades del mundo estarías siempre cómodo según tu temperatura ideal',
          icon: 'thermometer',
          category: 'clima',
          keywords: ['temperatura', 'clima', 'ciudades', 'friolento', 'cómodo']
        },
        {
          label: 'Edad de tu Mascota',
          href: '/curiosas/edad-mascota/',
          description: 'Convierte años humanos a años perro o años gato con tablas científicas',
          icon: 'dog',
          category: 'mascotas',
          keywords: ['mascotas', 'perros', 'gatos', 'edad', 'años humanos', 'años perro', 'años gato']
        },
        {
          label: 'Cerveza por Fiesta',
          href: '/curiosas/cerveza-fiesta/',
          description: 'Calcula cuántos litros de cerveza necesitas para tu fiesta según invitados y consumo',
          icon: 'beer',
          category: 'fiesta',
          keywords: ['cerveza', 'fiesta', 'litros', 'invitados', 'consumo', 'costo']
        },
        {
          label: 'Tiempo en Transporte',
          href: '/curiosas/tiempo-transporte/',
          description: 'Calcula cuántos días y años de vida gastas en transporte público',
          icon: 'bus',
          category: 'transporte',
          keywords: ['transporte', 'público', 'tiempo', 'vida', 'días', 'años', 'viaje']
        },
        {
          label: 'Expectativa de Vida Animales',
          href: '/curiosas/expectativa-animales/',
          description: 'Tu edad expresada en vidas de tortuga, años de colibrí o días de mosca',
          icon: 'turtle',
          category: 'animales',
          keywords: ['animales', 'tortuga', 'colibrí', 'mosca', 'expectativa vida', 'comparación']
        },
        {
          label: 'Calculadora de Amor',
          href: '/curiosas/calculadora-amor/',
          description: 'Calcula el porcentaje de compatibilidad entre dos nombres (divertido y viral)',
          icon: 'heart',
          category: 'amor',
          keywords: ['amor', 'compatibilidad', 'nombres', 'pareja', 'porcentaje', 'viral']
        },
        {
          label: 'Tiempo en Netflix',
          href: '/curiosas/tiempo-netflix/',
          description: 'Calcula cuántas temporadas viste, años de vida dedicados y qué podrías haber hecho',
          icon: 'tv',
          category: 'streaming',
          keywords: ['netflix', 'streaming', 'series', 'temporadas', 'tiempo', 'vida']
        }
      ]
    },
    tecnologia: {
      label: 'Tecnología',
      href: '/tecnologia/',
      description: 'Herramientas especializadas en tecnología para desarrolladores, diseñadores y técnicos. Convierte unidades, analiza rendimiento, maneja colores y más.',
      calculators: [
        {
          label: 'Conversión de Almacenamiento',
          href: '/tecnologia/conversion-almacenamiento/',
          description: 'Convierte entre KB, MB, GB, TB con base decimal y binaria',
          icon: 'hard-drive',
          category: 'conversion',
          keywords: ['almacenamiento', 'conversión', 'KB', 'MB', 'GB', 'TB', 'bytes']
        },
        {
          label: 'Velocidad de Descarga',
          href: '/tecnologia/velocidad-descarga/',
          description: 'Convierte Mbps a MB/s y calcula tiempo de descarga',
          icon: 'download',
          category: 'internet',
          keywords: ['velocidad', 'descarga', 'Mbps', 'MB/s', 'internet', 'banda ancha']
        },
        {
          label: 'Uptime/Downtime',
          href: '/tecnologia/uptime-downtime/',
          description: 'Calcula porcentaje de disponibilidad y tiempo de caída',
          icon: 'clock',
          category: 'servicios',
          keywords: ['uptime', 'downtime', 'disponibilidad', 'servicios', 'hosting']
        },
        {
          label: 'Conversión de Colores',
          href: '/tecnologia/conversion-colores/',
          description: 'Convierte entre HEX, RGB, CMYK y HSL con vista previa',
          icon: 'palette',
          category: 'diseño',
          keywords: ['colores', 'HEX', 'RGB', 'CMYK', 'HSL', 'diseño', 'desarrollo']
        },
        {
          label: 'Análisis de Contraseñas',
          href: '/tecnologia/analisis-contraseñas/',
          description: 'Analiza fortaleza y entropía de contraseñas',
          icon: 'shield',
          category: 'seguridad',
          keywords: ['contraseñas', 'seguridad', 'entropía', 'hash', 'crackeo']
        },
        {
          label: 'Análisis de Latencia',
          href: '/tecnologia/analisis-latencia/',
          description: 'Analiza ping y tiempo de respuesta para gaming y apps',
          icon: 'zap',
          category: 'redes',
          keywords: ['latencia', 'ping', 'tiempo respuesta', 'gaming', 'redes']
        }
      ]
    },
    geometria: {
      label: 'Geometría',
      href: '/geometria/',
      description: 'Calculadoras geométricas para calcular áreas, perímetros y propiedades de figuras planas como círculos, rectángulos, triángulos, cuadrados, rombos y trapecios.',
      calculators: [
        {
          label: 'Área y Perímetro del Círculo',
          href: '/geometria/circulo/',
          description: 'Calcula el área, perímetro, diámetro y radio de un círculo',
          icon: 'circle',
          category: 'figuras circulares',
          keywords: ['círculo', 'área', 'perímetro', 'radio', 'diámetro', 'circunferencia']
        },
        {
          label: 'Área y Perímetro del Rectángulo',
          href: '/geometria/rectangulo/',
          description: 'Calcula el área y perímetro de un rectángulo conociendo sus dimensiones',
          icon: 'rectangle-horizontal',
          category: 'cuadriláteros',
          keywords: ['rectángulo', 'área', 'perímetro', 'largo', 'ancho', 'dimensiones']
        },
        {
          label: 'Área del Triángulo',
          href: '/geometria/triangulo/',
          description: 'Calcula el área de un triángulo con base y altura o usando la fórmula de Herón',
          icon: 'triangle',
          category: 'triángulos',
          keywords: ['triángulo', 'área', 'base', 'altura', 'fórmula herón', 'lados']
        },
        {
          label: 'Área y Perímetro del Cuadrado',
          href: '/geometria/cuadrado/',
          description: 'Calcula el área y perímetro de un cuadrado conociendo su lado',
          icon: 'square',
          category: 'cuadriláteros',
          keywords: ['cuadrado', 'área', 'perímetro', 'lado', 'figuras regulares']
        },
        {
          label: 'Área y Perímetro del Rombo',
          href: '/geometria/rombo/',
          description: 'Calcula el área y perímetro de un rombo conociendo sus diagonales o lado y diagonal',
          icon: 'diamond',
          category: 'cuadriláteros',
          keywords: ['rombo', 'área', 'perímetro', 'diagonales', 'lado', 'paralelogramo']
        },
        {
          label: 'Área del Trapecio',
          href: '/geometria/trapecio/',
          description: 'Calcula el área de un trapecio conociendo sus bases y altura',
          icon: 'hexagon',
          category: 'cuadriláteros',
          keywords: ['trapecio', 'área', 'bases', 'altura', 'lados paralelos']
        }
      ]
    },
    salud: {
      label: 'Salud',
      href: '/salud/',
      description: 'Calculadoras de salud para evaluar tu bienestar físico: IMC, TMB, porcentaje de grasa corporal, PaFi, agua diaria recomendada y ovulación.',
      calculators: [
        {
          label: 'Calculadora de IMC',
          href: '/salud/imc/',
          description: 'Calcula tu Índice de Masa Corporal y evalúa tu peso ideal',
          icon: 'scale',
          category: 'peso',
          keywords: ['IMC', 'índice masa corporal', 'peso ideal', 'obesidad', 'delgadez']
        },
        {
          label: 'Calculadora de TMB',
          href: '/salud/tmb/',
          description: 'Calcula tu Tasa Metabólica Basal y las calorías que quemas en reposo',
          icon: 'activity',
          category: 'metabolismo',
          keywords: ['TMB', 'tasa metabólica basal', 'calorías', 'metabolismo', 'reposo']
        },
        {
          label: 'Porcentaje de Grasa Corporal',
          href: '/salud/grasa-corporal/',
          description: 'Estima tu porcentaje de grasa corporal usando diferentes métodos',
          icon: 'heart',
          category: 'composición corporal',
          keywords: ['grasa corporal', 'porcentaje grasa', 'composición corporal', 'fitness']
        },
        {
          label: 'Calculadora de PaFi',
          href: '/salud/pafi/',
          description: 'Calcula el índice PaFi (Presión Arterial / Frecuencia Cardíaca)',
          icon: 'zap',
          category: 'cardiovascular',
          keywords: ['PaFi', 'presión arterial', 'frecuencia cardíaca', 'cardiovascular']
        },
        {
          label: 'Agua Diaria Recomendada',
          href: '/salud/agua-diaria/',
          description: 'Calcula cuánta agua debes beber diariamente según tu peso y actividad',
          icon: 'droplets',
          category: 'hidratación',
          keywords: ['agua', 'hidratación', 'líquidos', 'salud', 'recomendación diaria']
        },
        {
          label: 'Ovulación y Días Fértiles',
          href: '/salud/ovulacion/',
          description: 'Calcula tus días fértiles y fecha de ovulación basándose en tu ciclo menstrual',
          icon: 'calendar',
          category: 'reproductivo',
          keywords: ['ovulación', 'días fértiles', 'ciclo menstrual', 'fertilidad', 'planificación']
        },
        {
          label: 'Necesidades Energéticas Diarias',
          href: '/salud/necesidades-energeticas/',
          description: 'Calcula tus necesidades energéticas diarias (NED) para mantener el equilibrio energético',
          icon: 'zap',
          category: 'nutrición',
          keywords: ['necesidades energéticas', 'NED', 'EER', 'calorías diarias', 'metabolismo', 'energía']
        },
        {
          label: 'Fecha de Concepción de Embarazo',
          href: '/salud/fecha-concepcion/',
          description: 'Calcula la fecha probable de concepción basándose en la fecha de parto o última menstruación',
          icon: 'heart',
          category: 'reproductivo',
          keywords: ['concepción', 'embarazo', 'fecha concepción', 'gestación', 'parto', 'menstruación']
        }
      ]
    },
    calendario: {
      label: 'Calendario',
      href: '/calendario/',
      description: 'Herramientas de calendario y fechas: calcular días entre fechas, edad exacta, sumar/restar días, horas y minutos, y días de vacaciones.',
      calculators: [
        {
          label: 'Días entre Fechas',
          href: '/calendario/dias-entre-fechas/',
          description: 'Calcula la diferencia en días entre dos fechas específicas',
          icon: 'calendar',
          category: 'fechas',
          keywords: ['días entre fechas', 'diferencia fechas', 'calendario', 'tiempo transcurrido']
        },
        {
          label: 'Calculadora de Edad',
          href: '/calendario/calculadora-edad/',
          description: 'Calcula tu edad exacta en años, meses y días',
          icon: 'user',
          category: 'edad',
          keywords: ['edad', 'años', 'meses', 'días', 'cumpleaños', 'fecha nacimiento']
        },
        {
          label: 'Sumar / Restar Días',
          href: '/calendario/sumar-restar-dias/',
          description: 'Suma o resta días a una fecha específica',
          icon: 'plus',
          category: 'fechas',
          keywords: ['sumar días', 'restar días', 'fecha futura', 'fecha pasada', 'calendario']
        },
        {
          label: 'Horas y Minutos',
          href: '/calendario/horas-minutos/',
          description: 'Calcula y convierte entre horas y minutos',
          icon: 'clock',
          category: 'tiempo',
          keywords: ['horas', 'minutos', 'conversión tiempo', 'cálculo tiempo', 'duración']
        },
        {
          label: 'Días de Vacaciones',
          href: '/calendario/dias-vacaciones/',
          description: 'Calcula los días de vacaciones entre dos fechas',
          icon: 'plane',
          category: 'vacaciones',
          keywords: ['vacaciones', 'días libres', 'tiempo libre', 'descanso', 'planificación']
        }
      ]
    },
    otras: {
      label: 'Otras Calculadoras',
      href: '/otras/',
      description: 'Calculadoras útiles para diversas situaciones: propinas, gasto de gasolina, contador de palabras, números romanos, contador de clicks y escala de notas.',
      calculators: [
        {
          label: 'Calculadora de Propinas',
          href: '/otras/calculadora-propinas/',
          description: 'Calcula la propina y el total a pagar en restaurantes',
          icon: 'dollar-sign',
          category: 'restaurantes',
          keywords: ['propinas', 'restaurante', 'servicio', 'pago', 'gastronomía']
        },
        {
          label: 'Escala de Notas',
          href: '/otras/escala-notas/',
          description: 'Convierte puntuaciones numéricas a escala de calificaciones A, B, C, D, F',
          icon: 'graduation-cap',
          category: 'educación',
          keywords: ['notas', 'calificaciones', 'escala', 'educación', 'puntuación']
        },
        {
          label: 'Gasto Gasolina',
          href: '/otras/gasto-gasolina/',
          description: 'Calcula el costo de combustible para un viaje específico',
          icon: 'fuel',
          category: 'transporte',
          keywords: ['gasolina', 'combustible', 'viaje', 'costo', 'transporte', 'automóvil']
        },
        {
          label: 'Contador de Palabras',
          href: '/otras/contador-palabras/',
          description: 'Cuenta palabras, caracteres y párrafos en un texto',
          icon: 'type',
          category: 'texto',
          keywords: ['contador palabras', 'caracteres', 'texto', 'escritura', 'conteo']
        },
        {
          label: 'Números Romanos',
          href: '/otras/numeros-romanos/',
          description: 'Convierte entre números arábigos y números romanos',
          icon: 'hash',
          category: 'conversión',
          keywords: ['números romanos', 'conversión', 'arábigos', 'romanos', 'numeración']
        },
        {
          label: 'Contador de Clicks (CPS)',
          href: '/otras/contador-clicks/',
          description: 'Mide tu velocidad de clicks por segundo (CPS Test)',
          icon: 'mouse-pointer',
          category: 'juegos',
          keywords: ['clicks', 'CPS', 'velocidad', 'juegos', 'test', 'destreza']
        }
      ]
    }
  },
  social: {
    // Agregar cuando estén disponibles
  },
  contact: {
    email: 'contacto@calculadoras-online.com'
  }
} as const;

/**
 * Obtiene todas las calculadoras de una categoría
 */
export function getCalculatorsByCategory(category: string): Calculator[] {
  return SITE.clusters[category]?.calculators || [];
}

/**
 * Obtiene una calculadora específica
 */
export function getCalculator(category: string, calculatorSlug: string): Calculator | undefined {
  const calculators = getCalculatorsByCategory(category);
  return calculators.find(calc => calc.href.includes(calculatorSlug));
}

/**
 * Obtiene calculadoras relacionadas
 */
export function getRelatedCalculators(category: string, currentCalculator: string, limit: number = 6): Calculator[] {
  const calculators = getCalculatorsByCategory(category);
  return calculators
    .filter(calc => !calc.href.includes(currentCalculator))
    .slice(0, limit);
}

/**
 * Obtiene todas las rutas del sitio para el sitemap
 */
export function getAllRoutes(): string[] {
  const routes: string[] = ['/'];
  
  // Agregar rutas de navegación
  SITE.nav.forEach(item => {
    if (item.href !== '/') {
      routes.push(item.href);
    }
  });
  
  // Agregar rutas de calculadoras
  Object.values(SITE.clusters).forEach(cluster => {
    routes.push(cluster.href);
    
    cluster.calculators.forEach(calc => {
      routes.push(calc.href);
    });
    
    if (cluster.subcategories) {
      cluster.subcategories.forEach(sub => {
        routes.push(sub.href);
      });
    }
  });
  
  return routes;
}

/**
 * Obtiene metadatos para una calculadora
 */
export function getCalculatorMeta(category: string, calculatorSlug: string) {
  const calculator = getCalculator(category, calculatorSlug);
  if (!calculator) return null;
  
  return {
    title: `${calculator.label} - Calculadora Online Gratis`,
    description: calculator.description,
    keywords: calculator.keywords.join(', ')
  };
}

/**
 * Obtiene breadcrumbs para una ruta
 */
export function getBreadcrumbs(pathname: string): Array<{ label: string; href: string; current?: boolean }> {
  const breadcrumbs: Array<{ label: string; href: string; current?: boolean }> = [
    { label: 'Inicio', href: '/' }
  ];
  
  if (pathname === '/') {
    breadcrumbs[0].current = true;
    return breadcrumbs;
  }
  
  // Agregar categoría si estamos en matemáticas
  if (pathname.startsWith('/matematicas')) {
    const isCategoryPage = pathname === '/matematicas/';
    breadcrumbs.push({ 
      label: 'Matemáticas', 
      href: '/matematicas/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en geometría
  if (pathname.startsWith('/geometria')) {
    const isCategoryPage = pathname === '/geometria/';
    breadcrumbs.push({ 
      label: 'Geometría', 
      href: '/geometria/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar calculadora específica
  const calculator = Object.values(SITE.clusters)
    .flatMap(cluster => cluster.calculators)
    .find(calc => calc.href === pathname);
  
  if (calculator) {
    breadcrumbs.push({ 
      label: calculator.label, 
      href: calculator.href,
      current: true
    });
  }
  
  return breadcrumbs;
}

/**
 * Configuración de ejemplos para cada calculadora
 */
export const calculatorExamples = {
  fracciones: [
    { label: 'Simplificar 12/18', values: { numerator: 12, denominator: 18 } },
    { label: 'Sumar 1/4 + 1/3', values: { operation: 'add', fraction1: { numerator: 1, denominator: 4 }, fraction2: { numerator: 1, denominator: 3 } } },
    { label: 'Convertir 0.75 a fracción', values: { decimal: 0.75 } }
  ],
  porcentajes: [
    { label: '25% de 200', values: { percentage: 25, base: 200 } },
    { label: '¿Qué % es 50 de 200?', values: { x: 50, y: 200 } },
    { label: 'Descuento del 20%', values: { value: 100, percentage: 20, type: 'decrease' } }
  ],
  'potencias-raices': [
    { label: '2^8', values: { base: 2, exponent: 8 } },
    { label: '√144', values: { value: 144, index: 2 } },
    { label: '∛27', values: { value: 27, index: 3 } }
  ],
  algebra: [
    { label: '2x + 5 = 13', values: { a: 2, b: 5, c: 13, type: 'linear' } },
    { label: 'x² - 5x + 6 = 0', values: { a: 1, b: -5, c: 6, type: 'quadratic' } },
    { label: 'Sistema 2x2', values: { a: 2, b: 3, c: 1, d: -1, e: 7, f: 1, type: 'system' } }
  ],
  trigonometria: [
    { label: 'sin(30°)', values: { angle: 30, unit: 'degrees', function: 'sin' } },
    { label: 'cos(π/4)', values: { angle: Math.PI/4, unit: 'radians', function: 'cos' } },
    { label: 'tan(45°)', values: { angle: 45, unit: 'degrees', function: 'tan' } }
  ],
  derivadas: [
    { label: 'f(x) = x² en x=2', values: { function: 'x^2', x0: 2 } },
    { label: 'f(x) = 3x³ en x=1', values: { function: '3x^3', x0: 1 } }
  ],
  integrales: [
    { label: '∫₀¹ x² dx', values: { function: 'x^2', a: 0, b: 1 } },
    { label: '∫₀² 2x dx', values: { function: '2x', a: 0, b: 2 } }
  ],
  matrices: [
    { label: 'Determinante 2x2', values: { operation: 'determinant', matrix: [[2, 3], [1, 4]] } },
    { label: 'Suma de matrices', values: { operation: 'add', matrix1: [[1, 2], [3, 4]], matrix2: [[5, 6], [7, 8]] } }
  ],
  combinatoria: [
    { label: '5!', values: { n: 5, operation: 'factorial' } },
    { label: 'C(10,3)', values: { n: 10, r: 3, operation: 'combinations' } },
    { label: 'P(8,3)', values: { n: 8, r: 3, operation: 'permutations' } }
  ],
  progresiones: [
    { label: 'PA: a₁=2, d=3, n=5', values: { a1: 2, d: 3, n: 5, type: 'arithmetic', operation: 'nthTerm' } },
    { label: 'PG: a₁=2, r=3, n=4', values: { a1: 2, r: 3, n: 4, type: 'geometric', operation: 'nthTerm' } }
  ],
  logaritmos: [
    { label: 'log₁₀(100)', values: { x: 100, base: 10 } },
    { label: 'ln(e)', values: { x: Math.E, base: 'e' } },
    { label: 'log₂(8)', values: { x: 8, base: 2 } }
  ]
} as const;
