#!/usr/bin/env node

/**
 * Script para actualizar automáticamente los page titles de todas las calculadoras
 * para que usen el H1 como título de página
 */

const fs = require('fs');
const path = require('path');

// Mapeo de rutas a títulos H1
const calculatorH1Titles = {
  '/matematicas/algebra/': 'Álgebra',
  '/matematicas/trigonometria/': 'Trigonometría',
  '/matematicas/matrices/': 'Matrices',
  '/matematicas/combinatoria/': 'Combinatoria',
  '/matematicas/derivadas/': 'Derivadas',
  '/matematicas/progresiones/': 'Progresiones',
  '/matematicas/potencias-raices/': 'Potencias y Raíces',
  '/matematicas/fracciones/': 'Fracciones',
  '/matematicas/porcentajes/': 'Porcentajes',
  '/salud/imc/': 'IMC',
  '/salud/tmb/': 'TMB',
  '/salud/grasa-corporal/': 'Grasa Corporal',
  '/salud/pafi/': 'PaFi',
  '/salud/agua-diaria/': 'Agua Diaria',
  '/salud/ovulacion/': 'Ovulación',
  '/otras/escala-notas/': 'Escala de Notas',
  '/otras/gasto-gasolina/': 'Gasto de Gasolina',
  '/otras/contador-palabras/': 'Contador de Palabras',
  '/otras/numeros-romanos/': 'Números Romanos',
  '/otras/contador-clicks/': 'Contador de Clicks',
  '/otras/calculadora-propinas/': 'Propinas',
  '/tecnologia/conversion-almacenamiento/': 'Conversión de Almacenamiento',
  '/tecnologia/velocidad-descarga/': 'Velocidad de Descarga',
  '/tecnologia/uptime-downtime/': 'Uptime/Downtime',
  '/tecnologia/conversion-colores/': 'Conversión de Colores',
  '/tecnologia/analisis-contraseñas/': 'Análisis de Contraseñas',
  '/tecnologia/analisis-latencia/': 'Análisis de Latencia',
  '/calendario/dias-entre-fechas/': 'Días entre Fechas',
  '/calendario/calculadora-edad/': 'Calculadora de Edad',
  '/calendario/sumar-restar-dias/': 'Sumar/Restar Días',
  '/calendario/horas-minutos/': 'Horas y Minutos',
  '/calendario/dias-vacaciones/': 'Días de Vacaciones',
  '/finanzas/interes-simple/': 'Interés Simple',
  '/finanzas/depreciacion-vehiculos/': 'Depreciación de Vehículos',
  '/finanzas/hipoteca/': 'Hipoteca',
  '/finanzas/ipc/': 'IPC',
  '/finanzas/ahorro-objetivo/': 'Ahorro Objetivo',
  '/finanzas/valor-futuro-presente/': 'Valor Futuro y Presente',
  '/marketing/cac/': 'CAC',
  '/marketing/ltv/': 'LTV',
  '/marketing/conversion/': 'Conversión',
  '/marketing/presupuesto/': 'Presupuesto de Marketing',
  '/marketing/cpc-cpm/': 'CPC/CPM',
  '/marketing/roi/': 'ROI en Marketing',
  '/curiosas/cafe-ahorro/': 'Café vs. Ahorro',
  '/curiosas/pizza-persona/': 'Pizza por Persona',
  '/curiosas/expectativa-comida/': 'Expectativa de Vida y Comida Chatarra',
  '/curiosas/besos-calorias/': 'Besos Quemacalorías',
  '/curiosas/tiempo-peliculas/': 'Tiempo de Vida en Películas',
  '/curiosas/nivel-friolento/': 'Nivel de Friolento',
  '/curiosas/edad-mascota/': 'Edad de tu Mascota',
  '/curiosas/cerveza-fiesta/': 'Cerveza por Fiesta',
  '/curiosas/tiempo-transporte/': 'Tiempo en Transporte Público',
  '/curiosas/expectativa-animales/': 'Expectativa de Vida en Animales',
  '/curiosas/calculadora-amor/': 'Calculadora de Amor',
  '/curiosas/tiempo-netflix/': 'Tiempo en Netflix',
};

function updatePageFile(filePath, h1Title, canonical) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Verificar si ya tiene h1Title
  if (content.includes('h1Title:')) {
    console.log(`✅ ${filePath} ya tiene h1Title configurado`);
    return;
  }
  
  // Crear el nuevo contenido
  const newContent = content
    .replace(
      /import { buildMeta } from '@\/lib\/seo'/,
      `import { buildMeta } from '@/lib/seo'
import { getOptimizedPageTitle } from '@/lib/h1-title-extractor'`
    )
    .replace(
      /export const metadata: Metadata = buildMeta\(\{([^}]+)\}\)/,
      (match, config) => {
        // Remover autoTitle si existe
        const cleanConfig = config.replace(/autoTitle:\s*true,?\s*/g, '');
        
        return `export const metadata: Metadata = buildMeta({
  ${cleanConfig}
  h1Title: getOptimizedPageTitle('${h1Title}'),
  canonical: '${canonical}'
})`;
      }
    );
  
  fs.writeFileSync(filePath, newContent);
  console.log(`✅ Actualizado: ${filePath}`);
}

function findCalculatorPages(dir) {
  const pages = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item === 'page.tsx') {
        pages.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return pages;
}

function main() {
  const siteDir = path.join(__dirname, '..', 'src', 'app', '(site)');
  const pages = findCalculatorPages(siteDir);
  
  console.log(`🔍 Encontradas ${pages.length} páginas de calculadoras`);
  
  let updated = 0;
  
  for (const pagePath of pages) {
    // Extraer la ruta relativa
    const relativePath = pagePath.replace(siteDir, '').replace('/page.tsx', '');
    const canonical = relativePath + '/';
    
    if (calculatorH1Titles[canonical]) {
      const h1Title = calculatorH1Titles[canonical];
      updatePageFile(pagePath, h1Title, canonical);
      updated++;
    } else {
      console.log(`⚠️  No se encontró título H1 para: ${canonical}`);
    }
  }
  
  console.log(`\n🎉 Proceso completado. ${updated} páginas actualizadas.`);
}

if (require.main === module) {
  main();
}

module.exports = { updatePageFile, findCalculatorPages };
