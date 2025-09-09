# Sistema de Títulos SEO Automático

## 📋 Descripción

Este sistema garantiza que **siempre el H1 de la página viaje al title tag**, previniendo que los títulos SEO se pisen en futuros deploys.

## 🔧 Componentes del Sistema

### 1. **SEOTitleManager** (`src/components/SEOTitleManager.tsx`)
- Componente que extrae automáticamente el H1 de la página
- Actualiza el `document.title` y meta tags de Open Graph/Twitter
- Incluye observer para detectar cambios dinámicos en el H1
- Se ejecuta en el lado del cliente

### 2. **buildMeta** (`src/lib/seo.ts`)
- Función actualizada con prioridad de títulos:
  1. `h1Title` (más alta prioridad)
  2. `title` (título explícito)
  3. `autoTitle` basado en canonical
  4. fallback por defecto

### 3. **h1-title-extractor** (`src/lib/h1-title-extractor.ts`)
- Utilidades para extraer y formatear títulos del H1
- Mapeo de casos especiales para títulos optimizados
- Función `getOptimizedPageTitle()` para obtener títulos SEO-friendly

## 🚀 Cómo Usar

### Para Nuevas Calculadoras:

```typescript
// src/app/(site)/categoria/calculadora/page.tsx
import { Metadata } from 'next'
import { buildMeta } from '@/lib/seo'
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'
import CalculadoraClient from './CalculadoraClient'

export const metadata: Metadata = buildMeta({
  description: 'Descripción de la calculadora...',
  h1Title: getOptimizedPageTitle('Nombre del H1'), // ← CLAVE
  canonical: '/categoria/calculadora/'
})

export default function CalculadoraPage() {
  return <CalculadoraClient />
}
```

### Para Calculadoras Existentes:

1. **Agregar import:**
```typescript
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'
```

2. **Actualizar metadata:**
```typescript
export const metadata: Metadata = buildMeta({
  description: '...',
  h1Title: getOptimizedPageTitle('Nombre del H1'), // ← NUEVO
  canonical: '/ruta/calculadora/'
})
```

3. **Remover `autoTitle: true`** si existe

## 🛡️ Protecciones Implementadas

### 1. **Prioridad de Títulos**
- `h1Title` siempre tiene la máxima prioridad
- Previene que otros sistemas sobrescriban el título

### 2. **Detección Automática**
- `SEOTitleManager` detecta cambios en el H1
- Actualiza automáticamente el title tag
- Funciona con SPAs y contenido dinámico

### 3. **Fallbacks Robustos**
- Si no hay H1, usa el título del componente
- Si no hay título, usa fallback por defecto
- Nunca deja el title tag vacío

## 📝 Mapeo de Títulos H1

El sistema incluye un mapeo de títulos H1 a títulos de página optimizados:

```typescript
// Ejemplos del mapeo
'IMC' → 'Calculadora de IMC - Índice de Masa Corporal'
'TMB' → 'Calculadora de TMB - Tasa Metabólica Basal'
'Álgebra' → 'Calculadora de Álgebra'
```

## 🔍 Verificación

### Para Verificar que Funciona:

1. **Inspeccionar el HTML:**
```html
<title>Calculadora de IMC - Índice de Masa Corporal</title>
```

2. **Verificar meta tags:**
```html
<meta property="og:title" content="Calculadora de IMC - Índice de Masa Corporal">
<meta name="twitter:title" content="Calculadora de IMC - Índice de Masa Corporal">
```

3. **Verificar en DevTools:**
- El `document.title` debe coincidir con el H1
- Los meta tags deben estar actualizados

## ⚠️ Reglas Importantes

### ✅ HACER:
- Usar `h1Title: getOptimizedPageTitle('Nombre del H1')`
- Incluir `canonical` para SEO
- Mantener el H1 descriptivo y único

### ❌ NO HACER:
- Usar `autoTitle: true` (deprecated)
- Definir `title` explícito cuando se usa `h1Title`
- Cambiar el H1 sin actualizar el `h1Title`

## 🚀 Migración Automática

Para migrar calculadoras existentes, usar el script:

```bash
node scripts/update-calculator-titles.js
```

Este script:
- Encuentra todas las páginas de calculadoras
- Actualiza automáticamente los imports
- Configura `h1Title` basado en el mapeo
- Remueve `autoTitle: true`

## 📊 Beneficios

1. **Consistencia:** Todos los títulos siguen el mismo patrón
2. **Mantenibilidad:** Un solo lugar para cambiar la lógica
3. **SEO:** Títulos optimizados y descriptivos
4. **Prevención:** Imposible que se pisen los títulos
5. **Automatización:** Detección automática de cambios

## 🔧 Troubleshooting

### Problema: El título no se actualiza
**Solución:** Verificar que `SEOTitleManager` esté incluido en `CalculatorLayout`

### Problema: Título genérico
**Solución:** Agregar el H1 al mapeo en `h1-title-extractor.ts`

### Problema: Múltiples títulos
**Solución:** Verificar que solo se use `h1Title` o `title`, no ambos
