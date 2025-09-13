/**
 * Obtiene breadcrumbs para una ruta en alemán
 */
export function getBreadcrumbsDE(pathname: string): Array<{ label: string; href: string; current?: boolean }> {
  const breadcrumbs: Array<{ label: string; href: string; current?: boolean }> = [
    { label: 'Startseite', href: '/de' }
  ];
  
  if (pathname === '/de') {
    breadcrumbs[0].current = true;
    return breadcrumbs;
  }
  
  // Agregar categoría si estamos en geometría
  if (pathname.startsWith('/de/geometrie')) {
    const isCategoryPage = pathname === '/de/geometrie/';
    breadcrumbs.push({ 
      label: 'Geometrie', 
      href: '/de/geometrie/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en salud
  if (pathname.startsWith('/de/gesundheit')) {
    const isCategoryPage = pathname === '/de/gesundheit/';
    breadcrumbs.push({ 
      label: 'Gesundheit', 
      href: '/de/gesundheit/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en finanzas
  if (pathname.startsWith('/de/finanzen')) {
    const isCategoryPage = pathname === '/de/finanzen/';
    breadcrumbs.push({ 
      label: 'Finanzen', 
      href: '/de/finanzen/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en calendario
  if (pathname.startsWith('/de/kalender')) {
    const isCategoryPage = pathname === '/de/kalender/';
    breadcrumbs.push({ 
      label: 'Kalender', 
      href: '/de/kalender/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en curiosas
  if (pathname.startsWith('/de/kurioses')) {
    const isCategoryPage = pathname === '/de/kurioses/';
    breadcrumbs.push({ 
      label: 'Kurioses', 
      href: '/de/kurioses/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en otras
  if (pathname.startsWith('/de/andere')) {
    const isCategoryPage = pathname === '/de/andere/';
    breadcrumbs.push({ 
      label: 'Andere', 
      href: '/de/andere/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Para las calculadoras específicas, necesitamos obtener el nombre de la calculadora
  // Por ahora, vamos a extraer el nombre de la URL
  const pathParts = pathname.split('/').filter(part => part);
  if (pathParts.length >= 3) {
    const calculatorName = pathParts[pathParts.length - 1];
    // Convertir el nombre de la calculadora a un formato más legible
    const readableName = calculatorName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({ 
      label: readableName, 
      href: pathname,
      current: true
    });
  }
  
  return breadcrumbs;
}
