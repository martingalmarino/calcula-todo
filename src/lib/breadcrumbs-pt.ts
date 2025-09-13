/**
 * Obtiene breadcrumbs para una ruta en portugués
 */
export function getBreadcrumbsPT(pathname: string): Array<{ label: string; href: string; current?: boolean }> {
  const breadcrumbs: Array<{ label: string; href: string; current?: boolean }> = [
    { label: 'Início', href: '/pt' }
  ];
  
  if (pathname === '/pt') {
    breadcrumbs[0].current = true;
    return breadcrumbs;
  }
  
  // Agregar categoría si estamos en matemática
  if (pathname.startsWith('/pt/matematica')) {
    const isCategoryPage = pathname === '/pt/matematica/';
    breadcrumbs.push({ 
      label: 'Matemática', 
      href: '/pt/matematica/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en geometría
  if (pathname.startsWith('/pt/geometria')) {
    const isCategoryPage = pathname === '/pt/geometria/';
    breadcrumbs.push({ 
      label: 'Geometria', 
      href: '/pt/geometria/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en salud
  if (pathname.startsWith('/pt/saude')) {
    const isCategoryPage = pathname === '/pt/saude/';
    breadcrumbs.push({ 
      label: 'Saúde', 
      href: '/pt/saude/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en finanzas
  if (pathname.startsWith('/pt/financas')) {
    const isCategoryPage = pathname === '/pt/financas/';
    breadcrumbs.push({ 
      label: 'Finanças', 
      href: '/pt/financas/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en tecnología
  if (pathname.startsWith('/pt/tecnologia')) {
    const isCategoryPage = pathname === '/pt/tecnologia/';
    breadcrumbs.push({ 
      label: 'Tecnologia', 
      href: '/pt/tecnologia/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en calendario
  if (pathname.startsWith('/pt/calendario')) {
    const isCategoryPage = pathname === '/pt/calendario/';
    breadcrumbs.push({ 
      label: 'Calendário', 
      href: '/pt/calendario/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en curiosas
  if (pathname.startsWith('/pt/curiosas')) {
    const isCategoryPage = pathname === '/pt/curiosas/';
    breadcrumbs.push({ 
      label: 'Curiosas', 
      href: '/pt/curiosas/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en otras
  if (pathname.startsWith('/pt/outras')) {
    const isCategoryPage = pathname === '/pt/outras/';
    breadcrumbs.push({ 
      label: 'Outras', 
      href: '/pt/outras/',
      current: isCategoryPage
    });
    
    if (isCategoryPage) return breadcrumbs;
  }
  
  // Agregar categoría si estamos en jogos matemáticos
  if (pathname.startsWith('/pt/jogos-matematicos')) {
    const isCategoryPage = pathname === '/pt/jogos-matematicos/';
    breadcrumbs.push({ 
      label: 'Jogos Matemáticos', 
      href: '/pt/jogos-matematicos/',
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
