import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Construye metadatos para App Router
 */
export function buildMeta(config: SEOConfig): Metadata {
  const {
    title,
    description,
    canonical,
    keywords = [],
    ogImage = '/og-image.jpg',
    noIndex = false
  } = config;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calculadoras-online.com';
  const fullTitle = title.includes('Calculadoras Online') ? title : `${title} | Calculadoras Online`;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'Calculadoras Online',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'es_AR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * Genera JSON-LD para una calculadora
 */
export function jsonLdCalculator(config: {
  name: string;
  description: string;
  url: string;
  category: string;
  applicationCategory?: string;
  operatingSystem?: string;
  price?: string;
  priceCurrency?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}) {
  const {
    name,
    description,
    url,
    category,
    applicationCategory = 'EducationalApplication',
    operatingSystem = 'Web Browser',
    price = '0',
    priceCurrency = 'USD',
    offers = { price: '0', priceCurrency: 'USD' }
  } = config;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calculadoras-online.com';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: fullUrl,
    applicationCategory,
    operatingSystem,
    category,
    price,
    priceCurrency,
    offers: {
      '@type': 'Offer',
      ...offers
    },
    author: {
      '@type': 'Organization',
      name: 'Calculadoras Online',
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calculadoras Online',
      url: baseUrl
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'es-AR',
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    screenshot: `${baseUrl}/screenshot-${category.toLowerCase().replace(/\s+/g, '-')}.jpg`
  };
}

/**
 * Genera JSON-LD para una página web
 */
export function jsonLdWebPage(config: {
  name: string;
  description: string;
  url: string;
  breadcrumb?: Array<{ name: string; url: string }>;
}) {
  const { name, description, url, breadcrumb = [] } = config;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calculadoras-online.com';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: fullUrl,
    inLanguage: 'es-AR',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Calculadoras Online',
      url: baseUrl
    },
    author: {
      '@type': 'Organization',
      name: 'Calculadoras Online',
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calculadoras Online',
      url: baseUrl
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0]
  };

  if (breadcrumb.length > 0) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        webPage,
        {
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumb.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
          }))
        }
      ]
    };
  }

  return webPage;
}

/**
 * Genera JSON-LD para FAQ
 */
export function jsonLdFAQ(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Genera JSON-LD para breadcrumbs
 */
export function jsonLdBreadcrumb(breadcrumbs: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calculadoras-online.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };
}

/**
 * Genera JSON-LD para el sitio web principal
 */
export function jsonLdWebSite() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calculadoras-online.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calculadoras Online',
    description: 'Calculadoras matemáticas online gratuitas: fracciones, porcentajes, álgebra, trigonometría y más. Resultados rápidos y explicados paso a paso.',
    url: baseUrl,
    inLanguage: 'es-AR',
    author: {
      '@type': 'Organization',
      name: 'Calculadoras Online',
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calculadoras Online',
      url: baseUrl
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/buscar?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    sameAs: [
      // Agregar redes sociales cuando estén disponibles
    ]
  };
}

/**
 * Genera JSON-LD para una organización
 */
export function jsonLdOrganization() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calculadoras-online.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calculadoras Online',
    description: 'Plataforma de calculadoras matemáticas online gratuitas y educativas.',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Spanish'
    },
    sameAs: [
      // Agregar redes sociales cuando estén disponibles
    ]
  };
}

/**
 * Genera JSON-LD para artículos del blog
 */
export function jsonLdArticle(config: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  const {
    title,
    description,
    url,
    datePublished,
    dateModified = datePublished,
    author = 'Calculadoras Online',
    image = '/og-image.jpg'
  } = config;
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calculadoras-online.com';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: fullUrl,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calculadoras Online',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    image: image.startsWith('http') ? image : `${baseUrl}${image}`,
    inLanguage: 'es-AR',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl
    }
  };
}

/**
 * Genera JSON-LD para una colección de calculadoras
 */
export function jsonLdCollection(config: {
  name: string;
  description: string;
  url: string;
  calculators: Array<{ name: string; url: string; description: string }>;
}) {
  const { name, description, url, calculators } = config;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calculadoras-online.com';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: fullUrl,
    inLanguage: 'es-AR',
    mainEntity: {
      '@type': 'ItemList',
      name: `${name} - Calculadoras`,
      description: `Lista de calculadoras de ${name.toLowerCase()}`,
      numberOfItems: calculators.length,
      itemListElement: calculators.map((calc, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: calc.name,
          description: calc.description,
          url: calc.url.startsWith('http') ? calc.url : `${baseUrl}${calc.url}`,
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Web Browser',
          isAccessibleForFree: true
        }
      }))
    }
  };
}

/**
 * Helper para generar el script JSON-LD
 */
export function generateJsonLdScript(jsonLd: Record<string, unknown>): string {
  return `<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>`;
}

/**
 * Metadatos por defecto para el sitio
 */
export const defaultSEO = {
  title: 'Calculadoras Online – Matemáticas Gratis y Paso a Paso',
  description: 'Calculadoras matemáticas online: fracciones, porcentajes, álgebra, trigonometría y más. Resultados rápidos y explicados, 100% gratis.',
  keywords: [
    'calculadoras online',
    'matemáticas',
    'fracciones',
    'porcentajes',
    'álgebra',
    'trigonometría',
    'derivadas',
    'integrales',
    'matrices',
    'combinatoria',
    'progresiones',
    'logaritmos',
    'gratis',
    'educación'
  ]
};

/**
 * Metadatos para la categoría de matemáticas
 */
export const matematicasSEO = {
  title: 'Calculadoras de Matemáticas – Resuelve operaciones online',
  description: 'Fracciones, porcentajes, potencias y raíces, álgebra, trigonometría, derivadas, integrales, matrices, combinatoria, progresiones y logaritmos.',
  keywords: [
    'calculadoras matemáticas',
    'fracciones',
    'porcentajes',
    'potencias',
    'raíces',
    'álgebra',
    'trigonometría',
    'derivadas',
    'integrales',
    'matrices',
    'combinatoria',
    'progresiones',
    'logaritmos',
    'ecuaciones',
    'matemáticas online'
  ]
};
