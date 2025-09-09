#!/usr/bin/env node

/**
 * Script completo para traducir TODAS las calculadoras italianas al 100%
 * Ejecuta verificación, traducción y validación
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 INICIANDO TRADUCCIÓN COMPLETA AL 100% DE CALCULADORAS ITALIANAS\n');

async function runStep(stepName, command) {
  console.log(`\n📋 PASO: ${stepName}`);
  console.log('=' * 50);
  
  try {
    if (typeof command === 'string') {
      execSync(command, { stdio: 'inherit' });
    } else {
      await command();
    }
    console.log(`✅ ${stepName} completado\n`);
  } catch (error) {
    console.error(`❌ Error en ${stepName}:`, error.message);
    throw error;
  }
}

async function main() {
  try {
    // Paso 1: Verificar estado actual
    await runStep('Verificando estado actual de traducciones', () => {
      execSync('node scripts/check-translation-status.js', { stdio: 'inherit' });
    });

    // Paso 2: Traducir todas las calculadoras
    await runStep('Traduciendo todas las calculadoras', () => {
      execSync('node scripts/translate-all-calculators.js', { stdio: 'inherit' });
    });

    // Paso 3: Verificar estado final
    await runStep('Verificando estado final de traducciones', () => {
      execSync('node scripts/check-translation-status.js', { stdio: 'inherit' });
    });

    // Paso 4: Generar reporte final
    await runStep('Generando reporte final', () => {
      const reportPath = path.join(__dirname, '..', 'translation-status.json');
      if (fs.existsSync(reportPath)) {
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        const fullyTranslated = report.filter(r => r.isFullyTranslated).length;
        const total = report.length;
        
        console.log('\n🎯 REPORTE FINAL:');
        console.log(`📁 Total de archivos: ${total}`);
        console.log(`✅ Completamente traducidos: ${fullyTranslated}`);
        console.log(`📈 Porcentaje completado: ${Math.round((fullyTranslated / total) * 100)}%`);
        
        if (fullyTranslated === total) {
          console.log('\n🎉 ¡TODAS las calculadoras italianas están 100% traducidas!');
        } else {
          console.log('\n⚠️  Algunas calculadoras aún necesitan traducción manual.');
        }
      }
    });

    console.log('\n🎉 PROCESO COMPLETADO');
    console.log('💡 Próximos pasos:');
    console.log('   1. Revisar traducciones en el sitio');
    console.log('   2. Probar funcionalidad de calculadoras');
    console.log('   3. Hacer commit de cambios');

  } catch (error) {
    console.error('\n❌ PROCESO FALLÓ:', error.message);
    console.log('\n🔧 Soluciones:');
    console.log('   1. Verificar que DEEPL_API_KEY esté configurada');
    console.log('   2. Verificar conexión a internet');
    console.log('   3. Revisar logs de error');
    process.exit(1);
  }
}

// Ejecutar
main();
