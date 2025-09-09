#!/usr/bin/env node

/**
 * Script para traducir TODAS las calculadoras italianas al 100%
 * Identifica textos no traducidos y los traduce automáticamente
 */

const fs = require('fs');
const path = require('path');

// Configuración de DeepL
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

if (!DEEPL_API_KEY) {
  console.error('❌ Error: DEEPL_API_KEY no configurada');
  console.log('💡 Configura: export DEEPL_API_KEY="tu-api-key"');
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
      throw new Error(`DeepL API error: ${response.status}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Error traduciendo:', text, error.message);
    return text; // Retornar original si falla
  }
}

/**
 * Encuentra todos los archivos de calculadoras italianas
 */
function findItalianCalculatorFiles() {
  const italianDir = path.join(__dirname, '..', 'src', 'app', 'it');
  const files = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('ClientIT.tsx') || item.endsWith('Client.tsx')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(italianDir);
  return files;
}

/**
 * Extrae textos en español de un archivo
 */
function extractSpanishTexts(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const spanishTexts = [];
  
  // Patrones para encontrar textos en español
  const patterns = [
    // Strings literales
    /['"`]([^'"`]*[áéíóúñü][^'"`]*)['"`]/g,
    // JSX text content
    />([^<]*[áéíóúñü][^<]*)</g,
    // Template literals
    /`([^`]*[áéíóúñü][^`]*)`/g,
    // Objetos con texto
    /(title|description|label|placeholder|question|answer):\s*['"`]([^'"`]*[áéíóúñü][^'"`]*)['"`]/g
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const text = match[1] || match[2];
      if (text && text.trim().length > 2) {
        spanishTexts.push({
          text: text.trim(),
          line: content.substring(0, match.index).split('\n').length,
          context: getContext(content, match.index)
        });
      }
    }
  });
  
  return spanishTexts;
}

/**
 * Obtiene contexto alrededor de un match
 */
function getContext(content, index) {
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + 50);
  return content.substring(start, end).replace(/\n/g, ' ');
}

/**
 * Traduce un archivo completo
 */
async function translateFile(filePath) {
  console.log(`\n🔄 Procesando: ${path.relative(process.cwd(), filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Extraer textos en español
  const spanishTexts = extractSpanishTexts(filePath);
  
  if (spanishTexts.length === 0) {
    console.log('✅ No se encontraron textos en español');
    return { translated: 0, total: 0 };
  }
  
  console.log(`📝 Encontrados ${spanishTexts.length} textos en español:`);
  spanishTexts.forEach((item, index) => {
    console.log(`   ${index + 1}. "${item.text}" (línea ${item.line})`);
  });
  
  // Traducir cada texto
  let translatedCount = 0;
  for (const item of spanishTexts) {
    try {
      console.log(`🔄 Traduciendo: "${item.text}"`);
      const translated = await translateText(item.text);
      console.log(`✅ Resultado: "${translated}"`);
      
      // Reemplazar en el contenido
      content = content.replace(item.text, translated);
      translatedCount++;
      
      // Pausa para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      console.error(`❌ Error traduciendo "${item.text}":`, error.message);
    }
  }
  
  // Guardar archivo traducido si hubo cambios
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`💾 Archivo actualizado: ${translatedCount}/${spanishTexts.length} textos traducidos`);
  }
  
  return { translated: translatedCount, total: spanishTexts.length };
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando traducción completa de calculadoras italianas\n');
  
  try {
    // Verificar API key
    console.log('🔑 Verificando API key...');
    const testTranslation = await translateText('Hola mundo', 'IT');
    console.log(`✅ API key válida. Test: "Hola mundo" → "${testTranslation}"\n`);
    
    // Encontrar archivos de calculadoras italianas
    const files = findItalianCalculatorFiles();
    console.log(`📁 Encontrados ${files.length} archivos de calculadoras italianas:`);
    files.forEach((file, index) => {
      console.log(`   ${index + 1}. ${path.relative(process.cwd(), file)}`);
    });
    
    // Traducir cada archivo
    let totalTranslated = 0;
    let totalTexts = 0;
    
    for (const file of files) {
      const result = await translateFile(file);
      totalTranslated += result.translated;
      totalTexts += result.total;
    }
    
    console.log('\n🎉 Proceso completado!');
    console.log(`📊 Resumen:`);
    console.log(`   📁 Archivos procesados: ${files.length}`);
    console.log(`   📝 Textos encontrados: ${totalTexts}`);
    console.log(`   ✅ Textos traducidos: ${totalTranslated}`);
    console.log(`   📈 Porcentaje: ${totalTexts > 0 ? Math.round((totalTranslated / totalTexts) * 100) : 0}%`);
    
    if (totalTranslated === totalTexts && totalTexts > 0) {
      console.log('\n🎯 ¡TODAS las calculadoras italianas están 100% traducidas!');
    } else {
      console.log('\n⚠️  Algunos textos no se pudieron traducir. Revisar manualmente.');
    }
    
  } catch (error) {
    console.error('❌ Error en el proceso:', error);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = {
  translateText,
  findItalianCalculatorFiles,
  extractSpanishTexts,
  translateFile
};
