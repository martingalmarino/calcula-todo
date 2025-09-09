export const locales = ['es', 'it'] as const;
export const defaultLocale = 'es' as const;
export type Locale = typeof locales[number];

export const localeConfig = {
  es: {
    name: 'Español',
    flag: '🇪🇸',
    path: '',
    domain: 'calculatodo.online'
  },
  it: {
    name: 'Italiano', 
    flag: '🇮🇹',
    path: '/it',
    domain: 'calculatodo.online'
  }
};

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/it')) return 'it';
  return 'es';
}

export function getPathWithLocale(path: string, locale: Locale): string {
  if (locale === 'es') return path;
  return `/it${path}`;
}
