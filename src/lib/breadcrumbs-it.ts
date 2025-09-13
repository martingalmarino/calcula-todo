import { SITE_IT } from './site-config-it'

/**
 * Obtiene breadcrumbs para una ruta en italiano
 */
export function getBreadcrumbsIT(pathname: string): Array<{ label: string; href: string; current?: boolean }> {
  const breadcrumbs: Array<{ label: string; href: string; current?: boolean }> = [
    { label: 'Inizio', href: '/it' }
  ];
  
  if (pathname === '/it') {
    breadcrumbs[0].current = true;
    return breadcrumbs;
  }
  
  // Agregar categoría si estamos en matemáticas
  if (pathname.startsWith('/it/matematicas')) {
    const isCategoryPage = pathname === '/it/matematicas/';
    breadcrumbs.push({ 
      label: 'Matematica', 
      href: '/it/matematicas/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en geometría
  if (pathname.startsWith('/it/geometria')) {
    const isCategoryPage = pathname === '/it/geometria/';
    breadcrumbs.push({ 
      label: 'Geometria', 
      href: '/it/geometria/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en salud
  if (pathname.startsWith('/it/salute')) {
    const isCategoryPage = pathname === '/it/salute/';
    breadcrumbs.push({ 
      label: 'Salute', 
      href: '/it/salute/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en finanzas
  if (pathname.startsWith('/it/finanze')) {
    const isCategoryPage = pathname === '/it/finanze/';
    breadcrumbs.push({ 
      label: 'Finanze', 
      href: '/it/finanze/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en marketing
  if (pathname.startsWith('/it/marketing')) {
    const isCategoryPage = pathname === '/it/marketing/';
    breadcrumbs.push({ 
      label: 'Marketing', 
      href: '/it/marketing/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en tecnología
  if (pathname.startsWith('/it/tecnologia')) {
    const isCategoryPage = pathname === '/it/tecnologia/';
    breadcrumbs.push({ 
      label: 'Tecnologia', 
      href: '/it/tecnologia/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en calendario
  if (pathname.startsWith('/it/calendario')) {
    const isCategoryPage = pathname === '/it/calendario/';
    breadcrumbs.push({ 
      label: 'Calendario', 
      href: '/it/calendario/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en curiosas
  if (pathname.startsWith('/it/curiosas')) {
    const isCategoryPage = pathname === '/it/curiosas/';
    breadcrumbs.push({ 
      label: 'Curiose', 
      href: '/it/curiosas/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en otras
  if (pathname.startsWith('/it/altre')) {
    const isCategoryPage = pathname === '/it/altre/';
    breadcrumbs.push({ 
      label: 'Altre', 
      href: '/it/altre/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en trivias
  if (pathname.startsWith('/it/trivias')) {
    const isCategoryPage = pathname === '/it/trivias/';
    breadcrumbs.push({ 
      label: 'Quiz', 
      href: '/it/trivias/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar calculadora específica
  const calculator = Object.values(SITE_IT.clusters)
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
