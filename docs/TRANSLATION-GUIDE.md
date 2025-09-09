# Guía de Traducción con DeepL

## 🌍 Sistema de Traducción Recomendado

### **DeepL API (Recomendado)**
- **Calidad**: Excelente para italiano
- **Gratuito**: 500,000 caracteres/mes
- **Integración**: Fácil con Cursor AI
- **Ventajas**: Traducciones naturales, contexto preservado

## 🔧 Configuración Inicial

### 1. **Obtener API Key de DeepL**

```bash
# 1. Ve a https://www.deepl.com/pro-api
# 2. Regístrate (gratis)
# 3. Obtén tu API key
# 4. Configura la variable de entorno
export DEEPL_API_KEY="tu-api-key-aqui"
```

### 2. **Verificar Configuración**

```bash
# Verificar que la API key esté configurada
echo $DEEPL_API_KEY
```

## 🚀 Uso del Sistema

### **Opción 1: Script Automático**

```bash
# Ejecutar script de traducción
node scripts/translate-content.js
```

### **Opción 2: Uso Programático**

```typescript
import { translateToItalian } from '@/lib/translation-service';

// Traducir texto individual
const translated = await translateToItalian('Calculadora de fracciones');
console.log(translated); // "Calcolatrice di frazioni"
```

### **Opción 3: Hook en Componentes**

```typescript
import { useTranslation } from '@/lib/translation-service';

function MyComponent() {
  const { translate } = useTranslation();
  
  const handleTranslate = async () => {
    const result = await translate('Texto a traducir');
    console.log(result);
  };
  
  return <button onClick={handleTranslate}>Traducir</button>;
}
```

## 📝 Elementos a Traducir

### **1. Textos de Interfaz**
- Botones y CTAs
- Mensajes de error
- Placeholders de inputs
- Tooltips y ayudas

### **2. Contenido de Calculadoras**
- Títulos y descripciones
- Ejemplos y casos de uso
- FAQ y ayudas
- Resultados y explicaciones

### **3. Navegación**
- Menús y breadcrumbs
- Enlaces y botones
- Categorías y subcategorías

### **4. SEO y Metadatos**
- Meta descriptions
- Títulos de página
- Alt text de imágenes
- Schema markup

## 🔄 Proceso de Traducción

### **Paso 1: Identificar Elementos**
```bash
# Buscar textos en español que necesitan traducción
grep -r "Calculadora de" src/app/it/
grep -r "Calcular" src/app/it/
grep -r "Resultado" src/app/it/
```

### **Paso 2: Traducir en Lote**
```bash
# Ejecutar script de traducción
node scripts/translate-content.js
```

### **Paso 3: Revisar y Ajustar**
- Revisar traducciones automáticas
- Ajustar contexto específico
- Verificar consistencia terminológica

### **Paso 4: Integrar en Código**
```typescript
// Reemplazar textos hardcodeados
const title = 'Calculadora de Fracciones'; // ❌
const title = t('fractions.title'); // ✅
```

## 🛠️ Herramientas Adicionales

### **1. Cursor AI Integration**
```typescript
// Usar Cursor AI para traducir código
// Prompt: "Traduce este componente al italiano manteniendo la funcionalidad"
```

### **2. VS Code Extensions**
- **DeepL Translate**: Traducción directa en editor
- **Auto Translate**: Traducción automática de strings
- **i18n Ally**: Gestión de internacionalización

### **3. Herramientas Online**
- **DeepL Web**: https://www.deepl.com/translator
- **Google Translate**: https://translate.google.com
- **Linguee**: https://www.linguee.com (contexto)

## 📊 Límites y Consideraciones

### **DeepL API Limits**
- **Gratuito**: 500,000 caracteres/mes
- **Rate Limit**: 5 requests/segundo
- **Tamaño**: 50 textos por request

### **Optimizaciones**
```typescript
// Traducir en lotes para eficiencia
const batchSize = 50;
const batches = chunk(texts, batchSize);

for (const batch of batches) {
  await translateBatch(batch);
  await delay(1000); // Pausa entre lotes
}
```

## 🎯 Mejores Prácticas

### **1. Consistencia Terminológica**
```typescript
// Usar diccionario de términos
const terms = {
  'calculadora': 'calcolatrice',
  'calcular': 'calcolare',
  'resultado': 'risultato'
};
```

### **2. Contexto Específico**
```typescript
// Traducir con contexto
const context = 'matemáticas';
const translated = await translateWithContext(text, context);
```

### **3. Validación de Calidad**
```typescript
// Verificar traducciones críticas
const criticalTexts = ['títulos', 'CTAs', 'errores'];
for (const text of criticalTexts) {
  const translation = await translate(text);
  await validateTranslation(text, translation);
}
```

## 🔍 Troubleshooting

### **Problema: API Key no funciona**
```bash
# Verificar configuración
echo $DEEPL_API_KEY
# Debe mostrar tu API key
```

### **Problema: Rate limiting**
```typescript
// Agregar pausas entre requests
await new Promise(resolve => setTimeout(resolve, 200));
```

### **Problema: Traducciones incorrectas**
```typescript
// Usar contexto específico
const translation = await translateText(text, 'IT', 'ES', {
  context: 'matemáticas'
});
```

## 📈 Monitoreo y Métricas

### **Uso de API**
```typescript
// Monitorear uso de caracteres
const usage = await getDeepLUsage();
console.log(`Caracteres usados: ${usage.character_count}/${usage.character_limit}`);
```

### **Calidad de Traducciones**
```typescript
// Guardar traducciones para revisión
const translations = await translateBatch(texts);
fs.writeFileSync('translations.json', JSON.stringify(translations, null, 2));
```

## 🚀 Próximos Pasos

1. **Configurar DeepL API key**
2. **Ejecutar script de traducción**
3. **Revisar traducciones generadas**
4. **Integrar en componentes**
5. **Probar en sitio italiano**

## 💡 Tips para Cursor AI

### **Prompts Efectivos**
```
"Traduce este componente React al italiano manteniendo la funcionalidad y el contexto matemático"

"Convierte estos textos de interfaz al italiano usando terminología técnica apropiada"

"Traduce las FAQ de esta calculadora al italiano manteniendo el tono educativo"
```

### **Contexto Específico**
```
"Este es un sitio de calculadoras matemáticas. Traduce al italiano usando terminología técnica precisa y manteniendo el tono educativo y profesional."
```
