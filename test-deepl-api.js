#!/usr/bin/env node

/**
 * Test simple para verificar la API key de DeepL
 */

const DEEPL_API_KEY = process.env.DEEPL_API_KEY || "6760ca2e-8bb4-4600-a299-6cd40b45f720:fx";
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

async function testDeepLAPI() {
  console.log('🧪 Probando API key de DeepL...\n');
  
  const params = new URLSearchParams({
    auth_key: DEEPL_API_KEY,
    text: 'Hola mundo',
    target_lang: 'IT',
    source_lang: 'ES'
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
    const translation = data.translations[0].text;
    
    console.log('✅ API key válida!');
    console.log(`📝 Test: "Hola mundo" → "${translation}"`);
    console.log('\n🚀 Listo para traducir todas las calculadoras italianas!');
    
    return true;
  } catch (error) {
    console.error('❌ Error con la API key:', error.message);
    return false;
  }
}

testDeepLAPI();
