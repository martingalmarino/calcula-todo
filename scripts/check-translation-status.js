#!/usr/bin/env node

/**
 * Script para verificar el estado de traducción de todas las calculadoras italianas
 * Identifica qué textos aún están en español
 */

const fs = require('fs');
const path = require('path');

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
    // Strings literales con caracteres españoles
    /['"`]([^'"`]*[áéíóúñü][^'"`]*)['"`]/g,
    // JSX text content
    />([^<]*[áéíóúñü][^<]*)</g,
    // Template literals
    /`([^`]*[áéíóúñü][^`]*)`/g,
    // Objetos con texto
    /(title|description|label|placeholder|question|answer):\s*['"`]([^'"`]*[áéíóúñü][^'"`]*)['"`]/g,
    // Textos específicos comunes
    /(Calculadora|Calcular|Resultado|Error|Ingresa|Selecciona|Ejemplo|Pregunta|Respuesta)/g
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const text = match[1] || match[2];
      if (text && text.trim().length > 2) {
        spanishTexts.push({
          text: text.trim(),
          line: content.substring(0, match.index).split('\n').length,
          context: getContext(content, match.index),
          pattern: pattern.source
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
  const start = Math.max(0, index - 100);
  const end = Math.min(content.length, index + 100);
  return content.substring(start, end).replace(/\n/g, ' ').trim();
}

/**
 * Verifica el estado de traducción de un archivo
 */
function checkFileTranslation(filePath) {
  const spanishTexts = extractSpanishTexts(filePath);
  
  return {
    file: path.relative(process.cwd(), filePath),
    totalTexts: spanishTexts.length,
    spanishTexts: spanishTexts,
    isFullyTranslated: spanishTexts.length === 0
  };
}

/**
 * Genera reporte de estado
 */
function generateReport(results) {
  const totalFiles = results.length;
  const fullyTranslated = results.filter(r => r.isFullyTranslated).length;
  const partiallyTranslated = results.filter(r => !r.isFullyTranslated).length;
  const totalSpanishTexts = results.reduce((sum, r) => sum + r.totalTexts, 0);
  
  console.log('📊 REPORTE DE ESTADO DE TRADUCCIÓN\n');
  console.log(`📁 Total de archivos: ${totalFiles}`);
  console.log(`✅ Completamente traducidos: ${fullyTranslated}`);
  console.log(`⚠️  Parcialmente traducidos: ${partiallyTranslated}`);
  console.log(`📝 Textos en español restantes: ${totalSpanishTexts}`);
  console.log(`📈 Porcentaje completado: ${Math.round((fullyTranslated / totalFiles) * 100)}%\n`);
  
  if (partiallyTranslated > 0) {
    console.log('⚠️  ARCHIVOS QUE NECESITAN TRADUCCIÓN:\n');
    
    results
      .filter(r => !r.isFullyTranslated)
      .forEach((result, index) => {
        console.log(`${index + 1}. ${result.file}`);
        console.log(`   📝 Textos en español: ${result.totalTexts}`);
        console.log(`   📋 Ejemplos:`);
        
        result.spanishTexts.slice(0, 3).forEach((text, i) => {
          console.log(`      ${i + 1}. "${text.text}" (línea ${text.line})`);
        });
        
        if (result.spanishTexts.length > 3) {
          console.log(`      ... y ${result.spanishTexts.length - 3} más`);
        }
        console.log('');
      });
  }
  
  if (fullyTranslated === totalFiles) {
    console.log('🎉 ¡TODAS las calculadoras italianas están 100% traducidas!');
  }
}

/**
 * Función principal
 */
function main() {
  console.log('🔍 Verificando estado de traducción de calculadoras italianas...\n');
  
  try {
    // Encontrar archivos
    const files = findItalianCalculatorFiles();
    console.log(`📁 Encontrados ${files.length} archivos de calculadoras italianas\n`);
    
    // Verificar cada archivo
    const results = files.map(checkFileTranslation);
    
    // Generar reporte
    generateReport(results);
    
    // Guardar reporte detallado
    const reportPath = path.join(__dirname, '..', 'translation-status.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Reporte detallado guardado en: ${reportPath}`);
    
  } catch (error) {
    console.error('❌ Error verificando traducciones:', error);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = {
  findItalianCalculatorFiles,
  extractSpanishTexts,
  checkFileTranslation,
  generateReport
};
