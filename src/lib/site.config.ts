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
