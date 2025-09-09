#!/usr/bin/env node

/**
 * Script para traducir textos específicos que aún están en español
 */

const fs = require('fs');
const path = require('path');

const DEEPL_API_KEY = "6760ca2e-8bb4-4600-a299-6cd40b45f720:fx";
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

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
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Error traduciendo:', text, error.message);
    return text; // Retornar original si falla
  }
}

// Textos específicos que necesitan traducción
const textsToTranslate = [
  'Inserisci valori numerici validi',
  'Errore nel calcolo',
  'Inserisci un numero decimale valido',
  'Risultato',
  'Domande Frequenti',
  'Risposte alle domande più comuni su questa calcolatrice'
];

async function main() {
  console.log('🔄 Traduciendo textos específicos...\n');
  
  for (const text of textsToTranslate) {
    try {
      console.log(`📝 Texto: "${text}"`);
      const translated = await translateText(text);
      console.log(`✅ Traducido: "${translated}"`);
      console.log('');
      
      // Pausa para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }
  }
  
  console.log('🎉 Proceso completado!');
}

main();
