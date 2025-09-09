"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeConfig } from '@/lib/i18n';

export function LanguageSelector() {
  const pathname = usePathname();
  const isItalian = pathname.startsWith('/it');
  
  return (
    <div className="flex gap-2 items-center">
      <Link 
        href={isItalian ? pathname.replace('/it', '') || '/' : pathname}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          !isItalian 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {localeConfig.es.flag} ES
      </Link>
      <Link 
        href={isItalian ? pathname : `/it${pathname}`}
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
