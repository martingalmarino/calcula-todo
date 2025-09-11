/**
 * Configuración de rutas equivalentes entre idiomas
 * Define qué rutas tienen equivalente en ambos idiomas (español e italiano)
 */

export interface RouteEquivalent {
  es: string;  // Ruta en español
  it: string;  // Ruta en italiano
  pt: string;  // Ruta en portugués
  de: string;  // Ruta en alemán
  category: string;  // Categoría para organización
}

/**
 * Mapeo de rutas equivalentes entre español, italiano y portugués
 * Solo incluir rutas que realmente existen en todos los idiomas
 */
export const routeEquivalents: RouteEquivalent[] = [
  // Homepage
  {
    es: '/',
    it: '/it',
    pt: '/pt',
    de: '/de',
    category: 'homepage'
  },
  
  // Matemáticas
  // {
  //   es: '/matematicas/fracciones/',
  //   it: '/it/matematicas/frazioni/',
  //   pt: '/pt/matematica/fracoes/',
  //   de: '/de/mathematik/bruche/',
  //   category: 'matematicas'
  // },
  // {
  //   es: '/matematicas/porcentajes/',
  //   it: '/it/matematicas/percentuali/',
  //   pt: '/pt/matematica/percentuais/',
  //   de: '/de/mathematik/prozente/',
  //   category: 'matematicas'
  // },
  // {
  //   es: '/matematicas/potencias-raices/',
  //   it: '/it/matematicas/potenze-e-radici/',
  //   pt: '/pt/matematica/potencias-e-raizes/',
  //   de: '/de/mathematik/potenzen-wurzeln/',
  //   category: 'matematicas'
  // },
  // {
  //   es: '/matematicas/algebra/',
  //   it: '/it/matematicas/algebra/',
  //   pt: '/pt/matematica/algebra/',
  //   de: '/de/mathematik/algebra/',
  //   category: 'matematicas'
  // },
  // {
  //   es: '/matematicas/trigonometria/',
  //   it: '/it/matematicas/trigonometria/',
  //   pt: '/pt/matematica/trigonometria/',
  //   de: '/de/mathematik/trigonometrie/',
  //   category: 'matematicas'
  // },
  // {
  //   es: '/matematicas/derivadas/',
  //   it: '/it/matematicas/derivate/',
  //   pt: '/pt/matematica/derivadas/',
  //   de: '/de/mathematik/ableitungen/',
  //   category: 'matematicas'
  // },
  
  // Salud
  // {
  //   es: '/salud/imc/',
  //   it: '/it/salud/imc/',
  //   pt: '/pt/saude/imc/',
  //   de: '/de/gesundheit/bmi/',
  //   category: 'salud'
  // },
  
  // Categorías principales
  // {
  //   es: '/matematicas/',
  //   it: '/it/matematicas/',
  //   pt: '/pt/matematica/',
  //   de: '/de/mathematik/',
  //   category: 'categorias'
  // },
  // {
  //   es: '/salud/',
  //   it: '/it/salud/',
  //   pt: '/pt/saude/',
  //   de: '/de/gesundheit/',
  //   category: 'categorias'
  // }
];

/**
 * Obtiene la ruta equivalente en el idioma de destino
 * @param currentPath - Ruta actual
 * @param targetLocale - Idioma de destino ('es', 'it' o 'pt')
 * @returns Ruta equivalente o null si no existe
 */
export function getEquivalentRoute(currentPath: string, targetLocale: 'es' | 'it' | 'pt' | 'de'): string | null {
  const equivalent = routeEquivalents.find(route => {
    if (targetLocale === 'it') {
      return route.es === currentPath;
    } else if (targetLocale === 'pt') {
      return route.es === currentPath;
    } else if (targetLocale === 'de') {
      return route.es === currentPath;
    } else {
      return route.it === currentPath || route.pt === currentPath || route.de === currentPath;
    }
  });
  
  if (equivalent) {
    if (targetLocale === 'it') {
      return equivalent.it;
    } else if (targetLocale === 'pt') {
      return equivalent.pt;
    } else if (targetLocale === 'de') {
      return equivalent.de;
    } else {
      return equivalent.es;
    }
  }
  
  return null;
}

/**
 * Verifica si una ruta tiene equivalente en el idioma de destino
 * @param currentPath - Ruta actual
 * @param targetLocale - Idioma de destino ('es', 'it' o 'pt')
 * @returns true si tiene equivalente, false si no
 */
export function hasEquivalentRoute(currentPath: string, targetLocale: 'es' | 'it' | 'pt'): boolean {
  return getEquivalentRoute(currentPath, targetLocale) !== null;
}

/**
 * Obtiene todas las rutas equivalentes para un idioma específico
 * @param locale - Idioma ('es', 'it' o 'pt')
 * @returns Array de rutas en el idioma especificado
 */
export function getRoutesForLocale(locale: 'es' | 'it' | 'pt'): string[] {
  return routeEquivalents.map(route => {
    if (locale === 'it') return route.it;
    if (locale === 'pt') return route.pt;
    return route.es;
  });
}

/**
 * Obtiene la homepage para un idioma específico
 * @param locale - Idioma ('es', 'it' o 'pt')
 * @returns Ruta de la homepage
 */
export function getHomepageForLocale(locale: 'es' | 'it' | 'pt' | 'de'): string {
  if (locale === 'it') return '/it';
  if (locale === 'pt') return '/pt';
  if (locale === 'de') return '/de';
  return '/';
}

/**
 * Obtiene la URL de destino para cambio de idioma
 * @param currentPath - Ruta actual
 * @param targetLocale - Idioma de destino ('es', 'it' o 'pt')
 * @returns URL de destino (equivalente o homepage)
 */
export function getLanguageSwitchUrl(currentPath: string, targetLocale: 'es' | 'it' | 'pt' | 'de'): string {
  const equivalentRoute = getEquivalentRoute(currentPath, targetLocale);
  
  if (equivalentRoute) {
    return equivalentRoute;
  }
  
  // Si no hay equivalente, redirigir a la homepage del idioma de destino
  return getHomepageForLocale(targetLocale);
}
