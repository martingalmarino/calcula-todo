#!/usr/bin/env node

/**
 * Script de prueba para verificar el sistema de enrutamiento de idiomas
 */

const { getLanguageSwitchUrl, hasEquivalentRoute, getEquivalentRoute } = require('../src/lib/route-equivalents');

// Casos de prueba
const testCases = [
  // Casos con equivalente
  {
    currentPath: '/matematicas/fracciones/',
    targetLocale: 'it',
    expected: '/it/matematicas/frazioni/',
    description: 'Fracciones español → italiano (con equivalente)'
  },
  {
    currentPath: '/it/matematicas/frazioni/',
    targetLocale: 'es',
    expected: '/matematicas/fracciones/',
    description: 'Frazioni italiano → español (con equivalente)'
  },
  {
    currentPath: '/',
    targetLocale: 'it',
    expected: '/it',
    description: 'Homepage español → italiano'
  },
  {
    currentPath: '/it',
    targetLocale: 'es',
    expected: '/',
    description: 'Homepage italiano → español'
  },
  
  // Casos sin equivalente (deben redirigir a homepage)
  {
    currentPath: '/otras/contador-palabras/',
    targetLocale: 'it',
    expected: '/it',
    description: 'Contador palabras español → italiano (sin equivalente)'
  },
  {
    currentPath: '/finanzas/hipoteca/',
    targetLocale: 'it',
    expected: '/it',
    description: 'Hipoteca español → italiano (sin equivalente)'
  },
  {
    currentPath: '/curiosas/cafe-ahorro/',
    targetLocale: 'it',
    expected: '/it',
    description: 'Café ahorro español → italiano (sin equivalente)'
  }
];

console.log('🧪 Probando sistema de enrutamiento de idiomas\n');

let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
  const result = getLanguageSwitchUrl(testCase.currentPath, testCase.targetLocale);
  const success = result === testCase.expected;
  
  console.log(`Test ${index + 1}: ${testCase.description}`);
  console.log(`  Ruta actual: ${testCase.currentPath}`);
  console.log(`  Idioma destino: ${testCase.targetLocale}`);
  console.log(`  Esperado: ${testCase.expected}`);
  console.log(`  Resultado: ${result}`);
  console.log(`  Estado: ${success ? '✅ PASS' : '❌ FAIL'}\n`);
  
  if (success) {
    passed++;
  } else {
    failed++;
  }
});

console.log(`📊 Resumen:`);
console.log(`  ✅ Pasaron: ${passed}`);
console.log(`  ❌ Fallaron: ${failed}`);
console.log(`  📈 Total: ${testCases.length}`);

if (failed === 0) {
  console.log('\n🎉 ¡Todos los tests pasaron! El sistema funciona correctamente.');
} else {
  console.log('\n⚠️  Algunos tests fallaron. Revisar la configuración.');
  process.exit(1);
}
