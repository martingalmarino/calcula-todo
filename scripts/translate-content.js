#!/usr/bin/env node

/**
 * Script para traducir contenido del sitio usando DeepL API
 * Uso: node scripts/translate-content.js
 */

const fs = require('fs');
const path = require('path');

// Configuración de DeepL
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

if (!DEEPL_API_KEY) {
  console.error('❌ Error: DEEPL_API_KEY no configurada en variables de entorno');
  console.log('💡 Para obtener una API key gratuita:');
  console.log('   1. Ve a https://www.deepl.com/pro-api');
  console.log('   2. Regístrate (500,000 caracteres gratis/mes)');
  console.log('   3. Configura: export DEEPL_API_KEY="tu-api-key"');
  process.exit(1);
}

/**
 * Traduce texto usando DeepL API
 */
async function translateText(text, targetLang = 'IT', sourceLang = 'ES') {
  const params = new URLSearchParams({
    auth_key: DEEPL_API_KEY,
    text: text,
    target_lang: targetLang,
    source_lang: sourceLang,
    preserve_formatting: '1'
  });

  try {
    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params
    });

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Error en traducción:', error);
    throw error;
  }
}

/**
 * Traduce un objeto de traducciones
 */
async function translateObject(translations, targetLang = 'IT') {
  const translated = {};
  
  for (const [key, value] of Object.entries(translations)) {
    if (typeof value === 'string') {
      console.log(`🔄 Traduciendo: "${value}"`);
      translated[key] = await translateText(value, targetLang);
      console.log(`✅ Resultado: "${translated[key]}"`);
      
      // Pausa para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } else if (typeof value === 'object' && value !== null) {
      translated[key] = await translateObject(value, targetLang);
    } else {
      translated[key] = value;
    }
  }
  
  return translated;
}

/**
 * Traduce archivos de configuración del sitio
 */
async function translateSiteConfig() {
  console.log('🌍 Traduciendo configuración del sitio...\n');
  
  try {
    // Leer configuración actual
    const configPath = path.join(__dirname, '..', 'src', 'lib', 'site.config.ts');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Extraer objetos de traducción (esto es un ejemplo básico)
    // En un caso real, necesitarías un parser más sofisticado
    
    console.log('📝 Archivo de configuración encontrado');
    console.log('💡 Para traducir automáticamente, necesitarías:');
    console.log('   1. Parser de TypeScript/JavaScript');
    console.log('   2. Extracción de strings literales');
    console.log('   3. Reemplazo con traducciones');
    
  } catch (error) {
    console.error('Error leyendo configuración:', error);
  }
}

/**
 * Traduce ejemplos de calculadoras
 */
async function translateCalculatorExamples() {
  console.log('🧮 Traduciendo ejemplos de calculadoras...\n');
  
  const examples = [
    'Calcula el área de un círculo',
    'Resuelve ecuaciones lineales',
    'Convierte fracciones a decimales',
    'Calcula porcentajes y descuentos',
    'Encuentra el valor de una hipoteca',
    'Determina tu índice de masa corporal'
  ];
  
  console.log('📋 Ejemplos a traducir:');
  examples.forEach((example, index) => {
    console.log(`   ${index + 1}. ${example}`);
  });
  
  console.log('\n🔄 Iniciando traducción...\n');
  
  const translatedExamples = [];
  
  for (const example of examples) {
    try {
      const translated = await translateText(example);
      translatedExamples.push({
        original: example,
        translated: translated
      });
      console.log(`✅ "${example}" → "${translated}"`);
    } catch (error) {
      console.error(`❌ Error traduciendo "${example}":`, error.message);
    }
    
    // Pausa para evitar rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  return translatedExamples;
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando proceso de traducción con DeepL\n');
  
  try {
    // Verificar API key
    console.log('🔑 Verificando API key...');
    const testTranslation = await translateText('Hola mundo', 'IT');
    console.log(`✅ API key válida. Test: "Hola mundo" → "${testTranslation}"\n`);
    
    // Traducir ejemplos
    const examples = await translateCalculatorExamples();
    
    // Guardar resultados
    const outputPath = path.join(__dirname, '..', 'translation-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(examples, null, 2));
    console.log(`\n💾 Resultados guardados en: ${outputPath}`);
    
    console.log('\n🎉 Proceso de traducción completado!');
    console.log('\n💡 Próximos pasos:');
    console.log('   1. Revisar traducciones en translation-results.json');
    console.log('   2. Integrar traducciones en el código');
    console.log('   3. Probar en el sitio');
    
  } catch (error) {
    console.error('❌ Error en el proceso de traducción:', error);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = {
  translateText,
  translateObject,
  translateSiteConfig,
  translateCalculatorExamples
};
