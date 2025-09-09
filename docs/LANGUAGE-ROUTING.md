# Sistema de Enrutamiento de Idiomas

## 📋 Descripción

Este sistema maneja el cambio de idiomas de manera inteligente, evitando errores 404 cuando se cambia de idioma en rutas que no tienen equivalente en el idioma de destino.

## 🔧 Componentes del Sistema

### 1. **LanguageSelector** (`src/components/LanguageSelector.tsx`)
- Componente que permite cambiar entre español e italiano
- Usa `getLanguageSwitchUrl()` para determinar la URL de destino
- Evita errores 404 redirigiendo a homepage cuando no hay equivalente

### 2. **route-equivalents** (`src/lib/route-equivalents.ts`)
- Configuración centralizada de rutas equivalentes
- Define qué rutas existen en ambos idiomas
- Funciones utilitarias para manejo de rutas

## 🚀 Funcionamiento

### Lógica de Redirección:

1. **Si hay ruta equivalente**: Redirige a la ruta equivalente en el idioma de destino
2. **Si NO hay ruta equivalente**: Redirige a la homepage del idioma de destino

### Ejemplos:

#### ✅ Con Equivalente:
```
Español: /matematicas/fracciones/
Italiano: /it/matematicas/frazioni/
```

#### ❌ Sin Equivalente:
```
Español: /matematicas/fracciones/
Italiano: /it (homepage) ← Redirige aquí
```

## 📝 Configuración de Rutas Equivalentes

### Agregar Nueva Ruta Equivalente:

```typescript
// En src/lib/route-equivalents.ts
export const routeEquivalents: RouteEquivalent[] = [
  // ... rutas existentes
  {
    es: '/nueva-calculadora/',
    it: '/it/nuova-calcolatrice/',
    category: 'nueva-categoria'
  }
];
```

### Estructura de RouteEquivalent:

```typescript
interface RouteEquivalent {
  es: string;      // Ruta en español
  it: string;      // Ruta en italiano  
  category: string; // Categoría para organización
}
```

## 🛠️ Funciones Utilitarias

### `getLanguageSwitchUrl(currentPath, targetLocale)`
Obtiene la URL de destino para cambio de idioma.

```typescript
// Ejemplo de uso
const targetUrl = getLanguageSwitchUrl('/matematicas/fracciones/', 'it');
// Resultado: '/it/matematicas/frazioni/' (si existe) o '/it' (si no existe)
```

### `hasEquivalentRoute(currentPath, targetLocale)`
Verifica si una ruta tiene equivalente en el idioma de destino.

```typescript
// Ejemplo de uso
const hasEquivalent = hasEquivalentRoute('/matematicas/fracciones/', 'it');
// Resultado: true o false
```

### `getEquivalentRoute(currentPath, targetLocale)`
Obtiene la ruta equivalente específica.

```typescript
// Ejemplo de uso
const equivalentRoute = getEquivalentRoute('/matematicas/fracciones/', 'it');
// Resultado: '/it/matematicas/frazioni/' o null
```

## 📊 Rutas Equivalentes Actuales

### Homepage:
- ES: `/` ↔ IT: `/it`

### Matemáticas:
- ES: `/matematicas/fracciones/` ↔ IT: `/it/matematicas/frazioni/`
- ES: `/matematicas/porcentajes/` ↔ IT: `/it/matematicas/percentuali/`
- ES: `/matematicas/potencias-raices/` ↔ IT: `/it/matematicas/potenze-e-radici/`
- ES: `/matematicas/algebra/` ↔ IT: `/it/matematicas/algebra/`
- ES: `/matematicas/trigonometria/` ↔ IT: `/it/matematicas/trigonometria/`
- ES: `/matematicas/derivadas/` ↔ IT: `/it/matematicas/derivate/`

### Salud:
- ES: `/salud/imc/` ↔ IT: `/it/salud/imc/`

### Categorías:
- ES: `/matematicas/` ↔ IT: `/it/matematicas/`
- ES: `/salud/` ↔ IT: `/it/salud/`

## 🔍 Casos de Uso

### Caso 1: Usuario en ruta con equivalente
```
Usuario en: /matematicas/fracciones/
Clic en: 🇮🇹 IT
Resultado: /it/matematicas/frazioni/ ✅
```

### Caso 2: Usuario en ruta sin equivalente
```
Usuario en: /otras/contador-palabras/
Clic en: 🇮🇹 IT
Resultado: /it (homepage) ✅
```

### Caso 3: Usuario en homepage
```
Usuario en: /
Clic en: 🇮🇹 IT
Resultado: /it ✅
```

## ⚠️ Reglas Importantes

### ✅ HACER:
- Agregar nuevas rutas equivalentes al array `routeEquivalents`
- Mantener la consistencia en las rutas
- Usar las funciones utilitarias para manejo de rutas

### ❌ NO HACER:
- Hardcodear rutas en el componente LanguageSelector
- Crear rutas italianas sin agregar al mapeo
- Cambiar la lógica de redirección sin actualizar la documentación

## 🚀 Beneficios

1. **Sin errores 404**: Siempre redirige a una ruta válida
2. **Experiencia fluida**: Mantiene contexto cuando es posible
3. **Mantenible**: Configuración centralizada
4. **Escalable**: Fácil agregar nuevas rutas equivalentes
5. **Intuitivo**: Comportamiento predecible para usuarios

## 🔧 Troubleshooting

### Problema: Error 404 al cambiar idioma
**Solución**: Verificar que la ruta esté en `routeEquivalents` o que redirija a homepage

### Problema: No redirige a ruta equivalente
**Solución**: Verificar que la ruta esté correctamente configurada en el mapeo

### Problema: Redirige siempre a homepage
**Solución**: Verificar que la ruta actual esté en el array `routeEquivalents`
