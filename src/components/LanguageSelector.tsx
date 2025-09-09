"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeConfig } from '@/lib/i18n';
import { getLanguageSwitchUrl } from '@/lib/route-equivalents';

export function LanguageSelector() {
  const pathname = usePathname();
  const isItalian = pathname.startsWith('/it');
  
  // Función para obtener la URL de destino
  const getTargetUrl = (targetLocale: 'es' | 'it'): string => {
    if (targetLocale === 'it') {
      // Si vamos a italiano
      if (isItalian) {
        // Ya estamos en italiano, mantener la ruta actual
        return pathname;
      } else {
        // Estamos en español, obtener URL de destino
        return getLanguageSwitchUrl(pathname, 'it');
      }
    } else {
      // Si vamos a español
      if (!isItalian) {
        // Ya estamos en español, mantener la ruta actual
        return pathname;
      } else {
        // Estamos en italiano, obtener URL de destino
        return getLanguageSwitchUrl(pathname, 'es');
      }
    }
  };
  
  return (
    <div className="flex gap-2 items-center">
      <Link 
        href={getTargetUrl('es')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          !isItalian 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {localeConfig.es.flag} ES
      </Link>
      <Link 
        href={getTargetUrl('it')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          isItalian 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {localeConfig.it.flag} IT
      </Link>
    </div>
  );
}
