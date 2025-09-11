"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLanguageSwitchUrl } from '@/lib/route-equivalents';
import { Globe, ChevronDown } from 'lucide-react';

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

  // Determinar el idioma actual
  const getCurrentLanguage = () => {
    if (isItalian) return 'IT';
    if (isPortuguese) return 'PT';
    return 'ES';
  };
  
  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
        <Globe className="h-4 w-4 text-white" />
        <span className="text-white font-bold text-sm">{getCurrentLanguage()}</span>
        <ChevronDown className="h-3 w-3 text-white" />
      </div>
      
      {/* Dropdown menu */}
      <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          <Link 
            href={getTargetUrl('es')}
            className={`block px-4 py-2 text-sm font-medium transition-colors ${
              !isItalian && !isPortuguese
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            ES - Español
          </Link>
          <Link 
            href={getTargetUrl('it')}
            className={`block px-4 py-2 text-sm font-medium transition-colors ${
              isItalian 
                ? 'bg-green-50 text-green-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            IT - Italiano
          </Link>
          <Link 
            href={getTargetUrl('pt')}
            className={`block px-4 py-2 text-sm font-medium transition-colors ${
              isPortuguese 
                ? 'bg-yellow-50 text-yellow-600' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            PT - Português
          </Link>
        </div>
      </div>
    </div>
  );
}
