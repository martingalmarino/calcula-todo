/**
 * Servicio de traducción usando DeepL API
 * Facilita la traducción de elementos del sitio al italiano
 */

interface TranslationOptions {
  sourceLang?: string;
  targetLang: string;
  preserveFormatting?: boolean;
  splitSentences?: boolean;
}

interface TranslationResult {
  text: string;
  detectedSourceLang?: string;
}

class TranslationService {
  private apiKey: string;
  private baseUrl = 'https://api-free.deepl.com/v2/translate';

  constructor() {
    // Obtener API key desde variables de entorno
    this.apiKey = process.env.DEEPL_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('⚠️ DEEPL_API_KEY no configurada. Las traducciones no funcionarán.');
    }
  }

  /**
   * Traduce texto usando DeepL API
   */
  async translateText(
    text: string, 
    options: TranslationOptions
  ): Promise<TranslationResult> {
    if (!this.apiKey) {
      throw new Error('DeepL API key no configurada');
    }

    const params = new URLSearchParams({
      auth_key: this.apiKey,
      text: text,
      target_lang: options.targetLang,
      source_lang: options.sourceLang || 'ES',
      preserve_formatting: options.preserveFormatting ? '1' : '0',
      split_sentences: options.splitSentences ? '1' : '0'
    });

    try {
      const response = await fetch(this.baseUrl, {
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
      
      return {
        text: data.translations[0].text,
        detectedSourceLang: data.translations[0].detected_source_language
      };
    } catch (error) {
      console.error('Error en traducción:', error);
      throw error;
    }
  }

  /**
   * Traduce texto al italiano
   */
  async translateToItalian(text: string): Promise<string> {
    const result = await this.translateText(text, {
      targetLang: 'IT',
      sourceLang: 'ES'
    });
    return result.text;
  }

  /**
   * Traduce texto al español
   */
  async translateToSpanish(text: string): Promise<string> {
    const result = await this.translateText(text, {
      targetLang: 'ES',
      sourceLang: 'IT'
    });
    return result.text;
  }

  /**
   * Traduce múltiples textos en lote
   */
  async translateBatch(
    texts: string[], 
    options: TranslationOptions
  ): Promise<TranslationResult[]> {
    const results: TranslationResult[] = [];
    
    // DeepL permite hasta 50 textos por request
    const batchSize = 50;
    
    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(text => this.translateText(text, options))
      );
      results.push(...batchResults);
    }
    
    return results;
  }

  /**
   * Verifica si el servicio está disponible
   */
  isAvailable(): boolean {
    return !!this.apiKey;
  }
}

// Instancia singleton
export const translationService = new TranslationService();

/**
 * Funciones de conveniencia para uso directo
 */
export async function translateToItalian(text: string): Promise<string> {
  return translationService.translateToItalian(text);
}

export async function translateToSpanish(text: string): Promise<string> {
  return translationService.translateToSpanish(text);
}

/**
 * Hook para usar en componentes React
 */
export function useTranslation() {
  const translate = async (text: string, targetLang: 'IT' | 'ES' = 'IT') => {
    if (targetLang === 'IT') {
      return await translateToItalian(text);
    } else {
      return await translateToSpanish(text);
    }
  };

  return { translate, isAvailable: translationService.isAvailable() };
}
