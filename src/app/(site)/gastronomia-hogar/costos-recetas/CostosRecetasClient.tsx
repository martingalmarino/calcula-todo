"use client";

import { useState } from 'react';
import { DollarSign, Plus, Trash2, Download, TrendingDown } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jsonLdCalculator } from '@/lib/seo';
import { getBreadcrumbs } from '@/lib/site.config';
import { calculateRecipeCost } from '@/lib/math/gastronomy';
import { FAQ } from '@/components/FAQ';

const breadcrumbs = getBreadcrumbs('/gastronomia-hogar/costos-recetas/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Costos de Recetas',
  description: 'Calcula el costo total y por porción de tus recetas con análisis detallado de ingredientes.',
  url: 'https://www.calculatodo.online/gastronomia-hogar/costos-recetas/',
  category: 'Gastronomía y Hogar'
});

const units = [
  { value: 'g', label: 'Gramos (g)' },
  { value: 'kg', label: 'Kilogramos (kg)' },
  { value: 'ml', label: 'Mililitros (ml)' },
  { value: 'l', label: 'Litros (l)' },
  { value: 'taza', label: 'Taza' },
  { value: 'cda', label: 'Cucharada' },
  { value: 'cdta', label: 'Cucharadita' },
  { value: 'unidad', label: 'Unidad' }
];

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  pricePerUnit: number;
}

export default function CostosRecetasClient() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', amount: 0, unit: 'g', pricePerUnit: 0 }
  ]);
  const [servings, setServings] = useState<number>(4);
  const [storeAlternative, setStoreAlternative] = useState<number>(0);
  const [result, setResult] = useState<{
    totalCost: number;
    costPerServing: number;
    ingredientDetails: Array<{
      name: string;
      amount: number;
      unit: string;
      cost: number;
    }>;
    savings?: {
      amount: number;
      percentage: number;
    };
  } | null>(null);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: 0, unit: 'g', pricePerUnit: 0 }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setIngredients(updated);
  };

  const calculate = () => {
    try {
      const validIngredients = ingredients.filter(ing => 
        ing.name && ing.amount > 0 && ing.pricePerUnit > 0
      );

      if (validIngredients.length === 0) {
        alert('Por favor, agrega al menos un ingrediente válido');
        return;
      }

      if (servings <= 0) {
        alert('El número de porciones debe ser mayor a 0');
        return;
      }

      const calculation = calculateRecipeCost(validIngredients, servings, storeAlternative > 0 ? { name: 'Alternativa Comercial', price: storeAlternative } : undefined);
      
      // Convertir el resultado al formato esperado
      setResult({
        totalCost: calculation.totalCost,
        costPerServing: calculation.costPerServing,
        ingredientDetails: calculation.ingredients.map(ing => ({
          name: ing.name,
          amount: ing.amount,
          unit: ing.unit,
          cost: ing.totalCost
        })),
        savings: calculation.savings ? {
          amount: calculation.savings.savings,
          percentage: calculation.savings.savingsPercent
        } : undefined
      });
    } catch (error) {
      alert('Error en el cálculo: ' + (error as Error).message);
    }
  };

  const exportBudget = () => {
    if (!result) return;
    
    const budgetText = `💰 Presupuesto de Receta\n\n` +
      `📊 Costo Total: $${result.totalCost}\n` +
      `👥 Porciones: ${servings}\n` +
      `🍽️ Costo por Porción: $${result.costPerServing}\n\n` +
      `📋 Desglose de Ingredientes:\n${result.ingredientDetails.map((ing) => 
        `• ${ing.name}: ${ing.amount}${ing.unit} - $${ing.cost}`
      ).join('\n')}\n\n` +
      `${result.savings ? `💡 Ahorro vs Comercial: $${result.savings.amount} (${result.savings.percentage}%)` : ''}`;

    const blob = new Blob([budgetText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'presupuesto-receta.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const examples = [
    {
      label: 'Pizza Margherita Casera',
      values: {
        ingredients: [
          { name: 'Harina de trigo', amount: 300, unit: 'g', pricePerUnit: 0.8 },
          { name: 'Tomate triturado', amount: 200, unit: 'g', pricePerUnit: 1.2 },
          { name: 'Queso mozzarella', amount: 150, unit: 'g', pricePerUnit: 2.5 },
          { name: 'Aceite de oliva', amount: 20, unit: 'ml', pricePerUnit: 0.05 },
          { name: 'Sal', amount: 5, unit: 'g', pricePerUnit: 0.1 }
        ],
        servings: 4,
        storeAlternative: 12
      }
    },
    {
      label: 'Pasta con Pollo',
      values: {
        ingredients: [
          { name: 'Pasta', amount: 400, unit: 'g', pricePerUnit: 1.5 },
          { name: 'Pechuga de pollo', amount: 300, unit: 'g', pricePerUnit: 3.2 },
          { name: 'Tomate', amount: 300, unit: 'g', pricePerUnit: 1.0 },
          { name: 'Cebolla', amount: 100, unit: 'g', pricePerUnit: 0.8 },
          { name: 'Ajo', amount: 10, unit: 'g', pricePerUnit: 0.2 }
        ],
        servings: 4,
        storeAlternative: 15
      }
    }
  ];

  const handleExampleClick = (example: typeof examples[0]) => {
    setIngredients(example.values.ingredients);
    setServings(example.values.servings);
    setStoreAlternative(example.values.storeAlternative);
    setResult(null);
  };

  const faqItems = [
    {
      question: "¿Cómo obtengo precios actualizados de ingredientes?",
      answer: "Revisa los precios en supermercados locales, tiendas online o usa precios promedio de tu área. Los precios pueden variar según la temporada y ubicación."
    },
    {
      question: "¿Es más económico cocinar en casa?",
      answer: "Generalmente sí, especialmente para comidas familiares. La calculadora te permite comparar el costo casero vs. alternativas comerciales para tomar decisiones informadas."
    },
    {
      question: "¿Qué hacer si no conozco el precio exacto?",
      answer: "Usa precios aproximados basados en tu experiencia de compras. La calculadora te dará una estimación útil para planificar tu presupuesto de cocina."
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="py-8">
          <Breadcrumbs 
            items={breadcrumbs} 
            className="mb-8"
          />

          <CalculatorLayout
            title="Calculadora de Costos de Recetas"
            description="Calcula el costo total y por porción de tus recetas con análisis detallado de ingredientes."
            examples={examples}
            faqItems={faqItems}
            relatedLinks={relatedLinks}
            onExampleClick={handleExampleClick}
          >
            <div className="max-w-4xl mx-auto">

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <DollarSign className="text-blue-600" />
                    Ingredientes y Costos
                  </h2>

                  <div className="space-y-4 mb-6">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ingrediente
                            </label>
                            <Input
                              value={ingredient.name}
                              onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                              placeholder="Nombre del ingrediente"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cantidad
                            </label>
                            <Input
                              type="number"
                              value={ingredient.amount}
                              onChange={(e) => updateIngredient(index, 'amount', parseFloat(e.target.value) || 0)}
                              placeholder="0"
                              min="0"
                              step="0.1"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Unidad
                            </label>
                            <Select
                              value={ingredient.unit}
                              onValueChange={(value) => updateIngredient(index, 'unit', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {units.map((unit) => (
                                  <SelectItem key={unit.value} value={unit.value}>
                                    {unit.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Precio por {ingredient.unit}
                          </label>
                          <Input
                            type="number"
                            value={ingredient.pricePerUnit}
                            onChange={(e) => updateIngredient(index, 'pricePerUnit', parseFloat(e.target.value) || 0)}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        
                        {ingredients.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeIngredient(index)}
                            className="text-red-600 hover:text-red-700 mt-3"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Eliminar
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={addIngredient}
                    className="w-full mb-6"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Ingrediente
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Porciones
                      </label>
                      <Input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                        placeholder="4"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio Alternativa Comercial (opcional)
                      </label>
                      <Input
                        type="number"
                        value={storeAlternative}
                        onChange={(e) => setStoreAlternative(parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button onClick={calculate} className="w-full">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Calcular Costos
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="space-y-6">
                {result && (
                  <Card>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Análisis de Costos
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Costo Total</h4>
                          <p className="text-2xl font-bold text-green-600">
                            ${result.totalCost}
                          </p>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Costo por Porción</h4>
                          <p className="text-xl font-bold text-blue-600">
                            ${result.costPerServing}
                          </p>
                        </div>
                        
                        {result.savings && (
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                              <TrendingDown className="w-5 h-5" />
                              Ahorro vs Comercial
                            </h4>
                            <p className="text-lg font-bold text-purple-600">
                              ${result.savings.amount} ({result.savings.percentage}%)
                            </p>
                          </div>
                        )}
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-800 mb-3">Desglose por Ingrediente</h4>
                          <div className="space-y-2">
                            {result.ingredientDetails.map((ing, index: number) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span className="text-gray-700">
                                  {ing.name} ({ing.amount}{ing.unit})
                                </span>
                                <span className="font-medium text-gray-900">
                                  ${ing.cost}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button onClick={exportBudget} className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Exportar Presupuesto
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Ejemplos de Recetas
                    </h3>
                    
                    <div className="space-y-3">
                      {examples.map((example, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleExampleClick(example)}
                          className="w-full justify-start text-left h-auto p-3"
                        >
                          <div>
                            <p className="font-medium">{example.name}</p>
                            <p className="text-sm text-gray-600">
                              {example.ingredients.length} ingredientes • {example.servings} porciones
                            </p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Consejos para Ahorrar
                    </h3>
                    
                    <div className="space-y-4 text-sm text-gray-700">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-1">Comprar a Granel</h4>
                        <p>Los ingredientes básicos como harina, azúcar y especias son más baratos en cantidades grandes.</p>
                      </div>
                      
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-1">Temporada de Ingredientes</h4>
                        <p>Usa frutas y verduras de temporada para obtener mejores precios y calidad.</p>
                      </div>
                      
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-1">Planificar Menús</h4>
                        <p>Planifica tus comidas semanales para aprovechar ingredientes y evitar desperdicios.</p>
                      </div>
                      
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-1">Comparar Precios</h4>
                        <p>Revisa diferentes tiendas y marcas para encontrar los mejores precios por unidad.</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <FAQ
              title="Preguntas Frecuentes sobre Costos de Recetas"
              items={[
                {
                  question: "¿Cómo calculo el precio por unidad de un ingrediente?",
                  answer: "Divide el precio total del paquete entre la cantidad de unidades. Por ejemplo: si un paquete de 1kg de harina cuesta $2, el precio por gramo es $0.002."
                },
                {
                  question: "¿Debo incluir el costo de energía (gas/electricidad)?",
                  answer: "Para cálculos básicos no es necesario, pero para análisis más precisos puedes agregar un costo estimado de energía por receta (aproximadamente $0.10-0.50 por hora de cocción)."
                },
                {
                  question: "¿Cómo comparo con opciones comerciales?",
                  answer: "Investiga el precio de platos similares en restaurantes o comida preparada. Incluye este valor en 'Precio Alternativa Comercial' para ver tu ahorro."
                },
                {
                  question: "¿Qué hacer si no conozco el precio exacto?",
                  answer: "Usa precios aproximados basados en tu experiencia de compras. La calculadora te dará una estimación útil para planificar tu presupuesto de cocina."
                }
              ]}
            />
            </div>
          </CalculatorLayout>
        </div>
      </Container>
    </>
  );
}
