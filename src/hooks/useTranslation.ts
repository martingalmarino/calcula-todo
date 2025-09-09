"use client"

import { usePathname } from 'next/navigation';
import { translations, TranslationKey } from '@/lib/translations';
import { getLocaleFromPath } from '@/lib/i18n';

export function useTranslation() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  
  return (key: TranslationKey, params?: Record<string, string | number>): string => {
    let translation = translations[locale][key] || translations.es[key];
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }
    
    return translation;
  };
}
