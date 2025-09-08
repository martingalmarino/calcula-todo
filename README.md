# Calculadoras Online

Un sitio web de calculadoras matemáticas online gratuitas, construido con Next.js 14, TypeScript y Tailwind CSS. Diseñado para ser ultra rápido, 100% responsive, SEO-driven y escalable.

## 🚀 Características

- **11 Calculadoras Matemáticas**: Fracciones, porcentajes, potencias, álgebra, trigonometría, cálculo, matrices, combinatoria, progresiones y logaritmos
- **Explicaciones Paso a Paso**: Cada calculadora incluye explicaciones detalladas del proceso de resolución
- **100% Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **SEO Optimizado**: Metadatos completos, JSON-LD, sitemap dinámico
- **Modo Claro/Oscuro**: Toggle de tema con persistencia en localStorage
- **Accesibilidad**: Cumple estándares AA de accesibilidad
- **Performance**: Optimizado para Core Web Vitals "Good"
- **Escalable**: Arquitectura preparada para agregar nuevas categorías y calculadoras

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + CSS Variables
- **UI Components**: shadcn/ui + Radix UI
- **Iconos**: Lucide React
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel Ready

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o pnpm

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/calculadoras-online.git
   cd calculadoras-online
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con tus valores:
   ```env
   NEXT_PUBLIC_BASE_URL=https://tu-dominio.com
   GOOGLE_SITE_VERIFICATION=tu-codigo-verificacion
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   pnpm dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🏗️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con Turbopack
npm run build        # Construye la aplicación para producción
npm run start        # Inicia servidor de producción
npm run lint         # Ejecuta ESLint

# Testing
npm run test         # Ejecuta tests con Vitest
npm run test:ui      # Ejecuta tests con interfaz gráfica
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── (site)/            # Grupo de rutas del sitio
│   │   ├── matematicas/   # Categoría de matemáticas
│   │   │   ├── fracciones/
│   │   │   ├── porcentajes/
│   │   │   └── ...        # Otras calculadoras
│   │   ├── blog/
│   │   ├── acerca/
│   │   └── contacto/
│   ├── sitemap.xml/       # Sitemap dinámico
│   ├── robots.txt/        # Robots.txt dinámico
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── ui/               # Componentes UI base (shadcn/ui)
│   ├── CalculatorLayout.tsx
│   ├── CardCalculator.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/                  # Utilidades y configuración
│   ├── math/            # Funciones matemáticas
│   │   ├── fractions.ts
│   │   ├── percentage.ts
│   │   └── ...          # Otras utilidades
│   ├── seo.ts           # Helpers de SEO y JSON-LD
│   ├── site.config.ts   # Configuración del sitio
│   └── utils.ts         # Utilidades generales
└── styles/              # Estilos globales
    ├── globals.css
    └── themes.css
```

## 🧮 Calculadoras Disponibles

### Aritmética
- **Fracciones**: Simplificar, convertir, operaciones básicas
- **Porcentajes**: Calcular %, descuentos, aumentos, variaciones
- **Potencias y Raíces**: Potencias, raíces cuadradas, cúbicas, n-ésimas

### Álgebra
- **Ecuaciones Lineales**: Resolver ax + b = 0
- **Ecuaciones Cuadráticas**: Resolver ax² + bx + c = 0
- **Sistemas de Ecuaciones**: Sistemas 2x2

### Trigonometría
- **Funciones Trigonométricas**: Seno, coseno, tangente y sus inversas
- **Conversiones**: Grados ↔ Radianes

### Cálculo
- **Derivadas**: Derivadas numéricas con aproximación
- **Integrales**: Integrales numéricas con regla de Simpson

### Álgebra Lineal
- **Matrices**: Suma, multiplicación, determinante, inversa

### Combinatoria
- **Permutaciones y Combinaciones**: nPr, nCr, factoriales

### Secuencias
- **Progresiones**: Aritméticas y geométricas

### Logaritmos
- **Logaritmos**: Diferentes bases, cambio de base

## 🎨 Personalización

### Temas
Los temas se configuran en `src/styles/themes.css`. Puedes personalizar:
- Colores principales y secundarios
- Sombras y radios
- Espaciado y tipografía
- Transiciones

### Agregar Nueva Calculadora

1. **Crear utilidades matemáticas** en `src/lib/math/`
2. **Agregar configuración** en `src/lib/site.config.ts`
3. **Crear página** en `src/app/(site)/matematicas/nueva-calculadora/`
4. **Actualizar navegación** y enlaces relacionados

### Agregar Nueva Categoría

1. **Actualizar configuración** en `src/lib/site.config.ts`
2. **Crear estructura de carpetas** en `src/app/(site)/`
3. **Actualizar navegación** y sitemap

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test -- --watch

# Ejecutar tests con cobertura
npm run test -- --coverage
```

Los tests están ubicados en `src/tests/` y cubren:
- Funciones matemáticas
- Componentes principales
- Utilidades de SEO

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conectar repositorio** a Vercel
2. **Configurar variables de entorno** en el dashboard
3. **Deploy automático** en cada push a main

### Otras Plataformas

El proyecto es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📊 Performance

El sitio está optimizado para:
- **Lighthouse Performance**: ≥95
- **Lighthouse SEO**: 100
- **Lighthouse Accessibility**: ≥95
- **Core Web Vitals**: "Good"

### Optimizaciones Implementadas

- **ISR (Incremental Static Regeneration)**: Revalidación cada 24 horas
- **Image Optimization**: WebP/AVIF automático
- **Code Splitting**: Carga diferida de componentes pesados
- **Bundle Optimization**: Tree shaking y minificación
- **Caching**: Headers de cache optimizados

## 🔍 SEO

### Características SEO

- **Metadatos completos**: Title, description, keywords
- **JSON-LD**: Schema.org para calculadoras y FAQ
- **Sitemap dinámico**: Generado automáticamente
- **Robots.txt**: Configuración optimizada
- **Open Graph**: Metadatos para redes sociales
- **Twitter Cards**: Metadatos para Twitter
- **Breadcrumbs**: Navegación estructurada

### Herramientas SEO

- **Google Search Console**: Configurar para monitoreo
- **Google Analytics**: Integración preparada
- **Schema Markup**: Validar con Google Rich Results Test

## 🤝 Contribuir

1. **Fork** el repositorio
2. **Crear branch** para tu feature (`git checkout -b feature/nueva-calculadora`)
3. **Commit** tus cambios (`git commit -m 'Agregar calculadora de X'`)
4. **Push** al branch (`git push origin feature/nueva-calculadora`)
5. **Abrir Pull Request**

### Guías de Contribución

- **Código**: Seguir convenciones de TypeScript y ESLint
- **Tests**: Agregar tests para nuevas funcionalidades
- **Documentación**: Actualizar README si es necesario
- **Performance**: Verificar que no se degrade el rendimiento

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

- **Email**: contacto@calculadoras-online.com
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/calculadoras-online/issues)
- **Documentación**: [Wiki del proyecto](https://github.com/tu-usuario/calculadoras-online/wiki)

## 🙏 Agradecimientos

- **Next.js Team**: Por el excelente framework
- **Tailwind CSS**: Por el sistema de diseño
- **Radix UI**: Por los componentes accesibles
- **Lucide**: Por los iconos hermosos
- **Comunidad**: Por el feedback y contribuciones

---

**Desarrollado con ❤️ para hacer las matemáticas más accesibles**# Deploy trigger Mon Sep  8 00:37:26 -03 2025
# Responsive improvements Mon Sep  8 00:41:02 -03 2025
# Fix overlapping clusters Mon Sep  8 00:44:03 -03 2025
