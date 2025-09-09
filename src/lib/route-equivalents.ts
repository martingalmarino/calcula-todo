/**
 * Configuración de rutas equivalentes entre idiomas
 * Define qué rutas tienen equivalente en ambos idiomas (español e italiano)
 */

export interface RouteEquivalent {
  es: string;  // Ruta en español
  it: string;  // Ruta en italiano
  category: string;  // Categoría para organización
}

/**
 * Mapeo de rutas equivalentes entre español e italiano
 * Solo incluir rutas que realmente existen en ambos idiomas
 */
export const routeEquivalents: RouteEquivalent[] = [
  // Homepage
  {
    es: '/',
    it: '/it',
    category: 'homepage'
  },
  
  // Matemáticas
  {
    es: '/matematicas/fracciones/',
    it: '/it/matematicas/frazioni/',
    category: 'matematicas'
  },
  {
    es: '/matematicas/porcentajes/',
    it: '/it/matematicas/percentuali/',
    category: 'matematicas'
  },
  {
    es: '/matematicas/potencias-raices/',
    it: '/it/matematicas/potenze-e-radici/',
    category: 'matematicas'
  },
  {
    es: '/matematicas/algebra/',
    it: '/it/matematicas/algebra/',
    category: 'matematicas'
  },
  {
    es: '/matematicas/trigonometria/',
    it: '/it/matematicas/trigonometria/',
    category: 'matematicas'
  },
  {
    es: '/matematicas/derivadas/',
    it: '/it/matematicas/derivate/',
    category: 'matematicas'
  },
  
  // Salud
  {
    es: '/salud/imc/',
    it: '/it/salud/imc/',
    category: 'salud'
  },
  
  // Categorías principales
  {
    es: '/matematicas/',
    it: '/it/matematicas/',
    category: 'categorias'
  },
  {
    es: '/salud/',
    it: '/it/salud/',
    category: 'categorias'
  }
];

/**
 * Obtiene la ruta equivalente en el idioma de destino
 * @param currentPath - Ruta actual
 * @param targetLocale - Idioma de destino ('es' o 'it')
 * @returns Ruta equivalente o null si no existe
 */
export function getEquivalentRoute(currentPath: string, targetLocale: 'es' | 'it'): string | null {
  const equivalent = routeEquivalents.find(route => {
    if (targetLocale === 'it') {
      return route.es === currentPath;
    } else {
      return route.it === currentPath;
    }
  });
  
  if (equivalent) {
    return targetLocale === 'it' ? equivalent.it : equivalent.es;
  }
  
  return null;
}

/**
 * Verifica si una ruta tiene equivalente en el idioma de destino
 * @param currentPath - Ruta actual
 * @param targetLocale - Idioma de destino ('es' o 'it')
 * @returns true si tiene equivalente, false si no
 */
export function hasEquivalentRoute(currentPath: string, targetLocale: 'es' | 'it'): boolean {
  return getEquivalentRoute(currentPath, targetLocale) !== null;
}

/**
 * Obtiene todas las rutas equivalentes para un idioma específico
 * @param locale - Idioma ('es' o 'it')
 * @returns Array de rutas en el idioma especificado
 */
export function getRoutesForLocale(locale: 'es' | 'it'): string[] {
  return routeEquivalents.map(route => locale === 'it' ? route.it : route.es);
}

/**
 * Obtiene la homepage para un idioma específico
 * @param locale - Idioma ('es' o 'it')
 * @returns Ruta de la homepage
 */
export function getHomepageForLocale(locale: 'es' | 'it'): string {
  return locale === 'it' ? '/it' : '/';
}

/**
 * Obtiene la URL de destino para cambio de idioma
 * @param currentPath - Ruta actual
 * @param targetLocale - Idioma de destino ('es' o 'it')
 * @returns URL de destino (equivalente o homepage)
 */
export function getLanguageSwitchUrl(currentPath: string, targetLocale: 'es' | 'it'): string {
  const equivalentRoute = getEquivalentRoute(currentPath, targetLocale);
  
  if (equivalentRoute) {
    return equivalentRoute;
  }
  
  // Si no hay equivalente, redirigir a la homepage del idioma de destino
  return getHomepageForLocale(targetLocale);
}
