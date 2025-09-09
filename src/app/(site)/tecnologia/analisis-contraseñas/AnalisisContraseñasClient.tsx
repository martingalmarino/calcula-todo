"use client";

import { useState } from 'react';
import { Calculator, Shield, Clock, Copy, Check, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { analyzePasswordEntropy } from '@/lib/math/technology';
import { getRelatedCalculators, getBreadcrumbs } from '@/lib/site.config';
import { jsonLdCalculator } from '@/lib/seo';

export default function AnalisisContraseñasClient() {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [resultado, setResultado] = useState<{
    password: string;
    entropy: number;
    strength: 'muy_débil' | 'débil' | 'medio' | 'fuerte' | 'muy_fuerte';
    crackTime: {
      seconds: number;
      minutes: number;
      hours: number;
      days: number;
      years: number;
      formatted: string;
    };
    suggestions: string[];
    hashMD5: string;
    hashSHA256: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResultado(null);

    if (!password.trim()) {
      setError('Por favor, ingresa una contraseña para analizar.');
      return;
    }

    try {
      const resultado = analyzePasswordEntropy(password);
      setResultado(resultado);
    } catch {
      setError('Error al analizar la contraseña. Verifica el valor ingresado.');
    }
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const examples = [
    {
      label: 'password123',
      values: { password: 'password123' }
    },
    {
      label: 'MyStr0ng!P@ss',
      values: { password: 'MyStr0ng!P@ss' }
    },
    {
      label: 'SuperSecure2024!',
      values: { password: 'SuperSecure2024!' }
    }
  ];

  const faqItems = [
    {
      question: '¿Qué es la entropía de una contraseña?',
      answer: 'La entropía mide la impredecibilidad de una contraseña. Se calcula como log₂(charset^length), donde charset es el número de caracteres posibles y length es la longitud.'
    },
    {
      question: '¿Qué hace una contraseña fuerte?',
      answer: 'Una contraseña fuerte tiene al menos 12 caracteres, incluye mayúsculas, minúsculas, números y símbolos especiales. Evita palabras comunes y patrones predecibles.'
    },
    {
      question: '¿Son precisos los tiempos de crackeo?',
      answer: 'Son estimaciones teóricas basadas en ataques de fuerza bruta. Los tiempos reales pueden variar según el hardware, algoritmos de hash y técnicas de ataque utilizadas.'
    },
    {
      question: '¿Qué son los hashes MD5 y SHA-256?',
      answer: 'Son algoritmos de hash criptográfico. MD5 es más rápido pero menos seguro. SHA-256 es más lento pero mucho más seguro y resistente a ataques.'
    }
  ];

  const relatedLinks = getRelatedCalculators('tecnologia', 'analisis-contraseñas').map(calc => ({
    label: calc.label,
    href: calc.href,
    description: calc.description
  }));

  const handleExampleClick = (values: Record<string, unknown>) => {
    setPassword(values.password as string);
    setResultado(null);
    setError(null);
  };

  const breadcrumbs = getBreadcrumbs('/tecnologia/analisis-contraseñas/');

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'muy_débil': return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
      case 'débil': return { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
      case 'medio': return { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
      case 'fuerte': return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
      case 'muy_fuerte': return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
      default: return { color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  const getStrengthLabel = (strength: string) => {
    switch (strength) {
      case 'muy_débil': return 'Muy Débil';
      case 'débil': return 'Débil';
      case 'medio': return 'Medio';
      case 'fuerte': return 'Fuerte';
      case 'muy_fuerte': return 'Muy Fuerte';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCalculator({
            name: 'Analizador de Contraseñas',
            description: 'Analiza la fortaleza y entropía de contraseñas con tiempo de crackeo',
            url: '/tecnologia/analisis-contraseñas/',
            category: 'tecnologia'
          }))
        }}
      />
      
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="py-8">
          <CalculatorLayout
            title="Análisis de Contraseñas"
            description="Analiza la fortaleza y entropía de contraseñas. Calcula tiempo de crackeo, genera hashes MD5/SHA-256 y proporciona sugerencias de mejora."
            examples={examples}
            faqItems={faqItems}
            onExampleClick={handleExampleClick}
            relatedLinks={relatedLinks}
          >
            <div className="grid gap-4">
              <div>
                <Label htmlFor="password">Contraseña a Analizar</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">⚠️ No compartas contraseñas reales. Esta herramienta es solo para análisis educativo.</p>
              </div>
              
              <div className="mt-4">
                <Button onClick={handleCalculate} className="calculator-button">
                  <Calculator className="h-4 w-4" />
                  Analizar Contraseña
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {resultado && (
                <Card className="mt-4 bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-700 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Análisis de Seguridad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Fortaleza</span>
                        </div>
                        <p className={`text-2xl font-bold ${getStrengthColor(resultado.strength).color}`}>
                          {getStrengthLabel(resultado.strength)}
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                          <Calculator className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-600">Entropía</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{resultado.entropy} bits</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Clock className="h-5 w-5 text-red-600" />
                          <span className="text-sm text-gray-600">Tiempo Estimado de Crackeo</span>
                        </div>
                        <p className="text-3xl font-bold text-red-600">{resultado.crackTime.formatted}</p>
                        <p className="text-sm text-gray-500 mt-1">Con hardware moderno (GPU)</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg border ${getStrengthColor(resultado.strength).bg} ${getStrengthColor(resultado.strength).border}`}>
                      <h4 className={`font-semibold ${getStrengthColor(resultado.strength).color} mb-2`}>
                        📊 Evaluación de Seguridad
                      </h4>
                      <p className={`text-sm ${getStrengthColor(resultado.strength).color}`}>
                        <strong>{getStrengthLabel(resultado.strength)}</strong> - 
                        {resultado.strength === 'muy_débil' && ' Contraseña extremadamente vulnerable'}
                        {resultado.strength === 'débil' && ' Contraseña fácil de descifrar'}
                        {resultado.strength === 'medio' && ' Contraseña con seguridad moderada'}
                        {resultado.strength === 'fuerte' && ' Contraseña con buena seguridad'}
                        {resultado.strength === 'muy_fuerte' && ' Contraseña muy segura'}
                      </p>
                    </div>

                    {/* Hashes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Hash MD5</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopy(resultado.hashMD5, 'md5')}
                          >
                            {copied === 'md5' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                        <p className="text-sm font-mono text-gray-800 break-all">{resultado.hashMD5}</p>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Hash SHA-256</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopy(resultado.hashSHA256, 'sha256')}
                          >
                            {copied === 'sha256' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                        <p className="text-sm font-mono text-gray-800 break-all">{resultado.hashSHA256}</p>
                      </div>
                    </div>

                    {/* Sugerencias */}
                    {resultado.suggestions.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">💡 Sugerencias de Mejora</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {resultado.suggestions.map((suggestion, index) => (
                            <li key={index}>• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">📊 Detalles Técnicos</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• <strong>Longitud:</strong> {resultado.password.length} caracteres</p>
                        <p>• <strong>Entropía:</strong> {resultado.entropy} bits</p>
                        <p>• <strong>Fortaleza:</strong> {getStrengthLabel(resultado.strength)}</p>
                        <p>• <strong>Tiempo de crackeo:</strong> {resultado.crackTime.formatted}</p>
                        <p>• <strong>Combinaciones posibles:</strong> 2^{resultado.entropy}</p>
                      </div>
                    </div>

                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>⚠️ Advertencia de Seguridad</AlertTitle>
                      <AlertDescription>
                        Esta herramienta es solo para análisis educativo. Nunca compartas contraseñas reales. 
                        Los hashes mostrados son simplificados y no deben usarse para seguridad real.
                      </AlertDescription>
                    </Alert>

                    {copied && (
                      <Alert>
                        <Check className="h-4 w-4" />
                        <AlertTitle>¡Copiado!</AlertTitle>
                        <AlertDescription>
                          El hash {copied.toUpperCase()} ha sido copiado al portapapeles.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </div>
  );
}
