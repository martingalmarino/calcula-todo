"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeConfig } from '@/lib/i18n';
import { getLanguageSwitchUrl } from '@/lib/route-equivalents';

export function LanguageSelector() {
  const pathname = usePathname();
  const isItalian = pathname.startsWith('/it');
  const isPortuguese = pathname.startsWith('/pt');
  
  // Función para obtener la URL de destino
  const getTargetUrl = (targetLocale: 'es' | 'it' | 'pt'): string => {
    if (targetLocale === 'it') {
      // Si vamos a italiano
      if (isItalian) {
        // Ya estamos en italiano, mantener la ruta actual
        return pathname;
      } else {
        // Estamos en español o portugués, obtener URL de destino
        return getLanguageSwitchUrl(pathname, 'it');
      }
    } else if (targetLocale === 'pt') {
      // Si vamos a portugués
      if (isPortuguese) {
        // Ya estamos en portugués, mantener la ruta actual
        return pathname;
      } else {
        // Estamos en español o italiano, obtener URL de destino
        return getLanguageSwitchUrl(pathname, 'pt');
      }
    } else {
      // Si vamos a español
      if (!isItalian && !isPortuguese) {
        // Ya estamos en español, mantener la ruta actual
        return pathname;
      } else {
        // Estamos en italiano o portugués, obtener URL de destino
        return getLanguageSwitchUrl(pathname, 'es');
      }
    }
  };
  
  return (
    <div className="flex gap-2 items-center">
      <Link 
        href={getTargetUrl('es')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          !isItalian && !isPortuguese
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
      <Link 
        href={getTargetUrl('pt')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          isPortuguese 
            ? 'bg-yellow-600 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        🇧🇷 PT
      </Link>
    </div>
  );
}
