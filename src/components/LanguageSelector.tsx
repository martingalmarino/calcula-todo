"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    <div className="flex gap-1 items-center">
      <Link 
        href={getTargetUrl('es')}
        className={`px-3 py-1 rounded text-sm font-bold transition-colors ${
          !isItalian && !isPortuguese
            ? 'bg-white text-blue-900' 
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
        title="Español"
      >
        ES
      </Link>
      <Link 
        href={getTargetUrl('it')}
        className={`px-3 py-1 rounded text-sm font-bold transition-colors ${
          isItalian 
            ? 'bg-white text-blue-900' 
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
        title="Italiano"
      >
        IT
      </Link>
      <Link 
        href={getTargetUrl('pt')}
        className={`px-3 py-1 rounded text-sm font-bold transition-colors ${
          isPortuguese 
            ? 'bg-white text-blue-900' 
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
        title="Português"
      >
        PT
      </Link>
    </div>
  );
}
