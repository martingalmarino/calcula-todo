"use client";

import { useState } from 'react';
import { Calculator, Plus, Trash2, Share2, Info } from 'lucide-react';
import { CalculatorLayout } from '@/components/CalculatorLayout';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Card } from '@/components/Card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jsonLdCalculator } from '@/lib/seo';
import { getBreadcrumbs } from '@/lib/site.config';
import { calculateRecipeCalories } from '@/lib/math/gastronomy';
import { FAQ } from '@/components/FAQ';

const breadcrumbs = getBreadcrumbs('/gastronomia-hogar/calorias-receta/');

const jsonLd = jsonLdCalculator({
  name: 'Calculadora de Calorías por Receta',
  description: 'Calcula las calorías totales y por porción de tus recetas con análisis nutricional completo.',
  url: 'https://www.calculatodo.online/gastronomia-hogar/calorias-receta/',
  category: 'Gastronomía y Hogar'
});

// Base de datos de ingredientes con información nutricional
const ingredientsDatabase = [
  { name: 'Harina de trigo', caloriesPer100g: 364, protein: 10, carbs: 76, fat: 1 },
  { name: 'Azúcar blanca', caloriesPer100g: 387, protein: 0, carbs: 100, fat: 0 },
  { name: 'Mantequilla', caloriesPer100g: 717, protein: 1, carbs: 0, fat: 81 },
  { name: 'Aceite de oliva', caloriesPer100g: 884, protein: 0, carbs: 0, fat: 100 },
  { name: 'Huevos', caloriesPer100g: 155, protein: 13, carbs: 1, fat: 11 },
  { name: 'Leche entera', caloriesPer100g: 61, protein: 3, carbs: 5, fat: 3 },
  { name: 'Queso mozzarella', caloriesPer100g: 280, protein: 22, carbs: 2, fat: 22 },
  { name: 'Tomate', caloriesPer100g: 18, protein: 1, carbs: 4, fat: 0 },
  { name: 'Cebolla', caloriesPer100g: 40, protein: 1, carbs: 9, fat: 0 },
  { name: 'Ajo', caloriesPer100g: 149, protein: 6, carbs: 33, fat: 1 },
  { name: 'Pollo (pechuga)', caloriesPer100g: 165, protein: 31, carbs: 0, fat: 4 },
  { name: 'Carne molida', caloriesPer100g: 250, protein: 26, carbs: 0, fat: 15 },
  { name: 'Arroz blanco', caloriesPer100g: 130, protein: 3, carbs: 28, fat: 0 },
  { name: 'Pasta', caloriesPer100g: 131, protein: 5, carbs: 25, fat: 1 },
  { name: 'Papa', caloriesPer100g: 77, protein: 2, carbs: 17, fat: 0 },
  { name: 'Zanahoria', caloriesPer100g: 41, protein: 1, carbs: 10, fat: 0 },
  { name: 'Brócoli', caloriesPer100g: 34, protein: 3, carbs: 7, fat: 0 },
  { name: 'Espinaca', caloriesPer100g: 23, protein: 3, carbs: 4, fat: 0 },
  { name: 'Champiñones', caloriesPer100g: 22, protein: 3, carbs: 3, fat: 0 },
  { name: 'Pimiento', caloriesPer100g: 31, protein: 1, carbs: 7, fat: 0 }
];

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
  quantity: number;
  unit: string;
  caloriesPerUnit: number;
}

interface RecipeResult {
  totalCalories: number;
  caloriesPerServing: number;
  macronutrientsPerServing: {
    protein: number;
    carbs: number;
    fat: number;
  };
  ingredientBreakdown: Array<{
    name: string;
    quantity: number;
    unit: string;
    calories: number;
  }>;
}

export default function CaloriasRecetaClient() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', quantity: 0, unit: 'g', caloriesPerUnit: 0 }
  ]);
  const [servings, setServings] = useState<number>(4);
  const [result, setResult] = useState<RecipeResult | null>(null);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: 0, unit: 'g', caloriesPerUnit: 0 }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    
    // Si cambió el ingrediente, actualizar las calorías por unidad
    if (field === 'name') {
      const selectedIngredient = ingredientsDatabase.find(ing => ing.name === value);
      if (selectedIngredient) {
        updated[index].caloriesPerUnit = selectedIngredient.caloriesPer100g / 100;
      }
    }
    
    setIngredients(updated);
  };

  const calculate = () => {
    try {
      const validIngredients = ingredients.filter(ing => 
        ing.name && ing.quantity > 0 && ing.caloriesPerUnit > 0
      );

      if (validIngredients.length === 0) {
        alert('Por favor, agrega al menos un ingrediente válido');
        return;
      }

      if (servings <= 0) {
        alert('El número de porciones debe ser mayor a 0');
        return;
      }

      const ingredientsWithCalories = validIngredients.map(ing => ({
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
        caloriesPerUnit: ing.caloriesPerUnit
      }));

      const calculation = calculateRecipeCalories(ingredientsWithCalories.map(ing => ({
        name: ing.name,
        amount: ing.quantity,
        unit: ing.unit
      })), servings);
      
      // Convertir el resultado al formato esperado
      setResult({
        totalCalories: calculation.totalCalories,
        caloriesPerServing: calculation.caloriesPerServing,
        macronutrientsPerServing: {
          protein: calculation.macronutrients.proteins / servings,
          carbs: calculation.macronutrients.carbohydrates / servings,
          fat: calculation.macronutrients.fats / servings
        },
        ingredientBreakdown: calculation.ingredients.map(ing => ({
          name: ing.name,
          quantity: ing.amount,
          unit: ing.unit,
          calories: ing.calories
        }))
      });
    } catch (error) {
      alert('Error en el cálculo: ' + (error as Error).message);
    }
  };

  const shareRecipe = () => {
    if (!result) return;
    
    const recipeText = `🍽️ Receta Nutricional\n\n` +
      `📊 Total: ${result.totalCalories} calorías\n` +
      `👥 Porciones: ${servings}\n` +
      `🍽️ Por porción: ${result.caloriesPerServing} calorías\n\n` +
      `🥗 Macronutrientes por porción:\n` +
      `• Proteínas: ${result.macronutrientsPerServing.protein}g\n` +
      `• Carbohidratos: ${result.macronutrientsPerServing.carbs}g\n` +
      `• Grasas: ${result.macronutrientsPerServing.fat}g\n\n` +
      `Ingredientes:\n${result.ingredientBreakdown.map((ing) => 
        `• ${ing.name}: ${ing.quantity}${ing.unit} (${ing.calories} cal)`
      ).join('\n')}`;

    if (navigator.share) {
      navigator.share({
        title: 'Mi Receta Nutricional',
        text: recipeText
      });
    } else {
      navigator.clipboard.writeText(recipeText);
      alert('Receta copiada al portapapeles');
    }
  };

  const examples = [
    {
      name: 'Pizza Margherita',
      ingredients: [
        { name: 'Harina de trigo', quantity: 300, unit: 'g' },
        { name: 'Tomate', quantity: 200, unit: 'g' },
        { name: 'Queso mozzarella', quantity: 150, unit: 'g' },
        { name: 'Aceite de oliva', quantity: 20, unit: 'ml' }
      ],
      servings: 4
    },
    {
      name: 'Pasta con Pollo',
      ingredients: [
        { name: 'Pasta', quantity: 400, unit: 'g' },
        { name: 'Pollo (pechuga)', quantity: 300, unit: 'g' },
        { name: 'Tomate', quantity: 300, unit: 'g' },
        { name: 'Cebolla', quantity: 100, unit: 'g' }
      ],
      servings: 4
    }
  ];

  const handleExampleClick = (example: typeof examples[0]) => {
    const exampleIngredients = example.ingredients.map(ing => {
      const dbIngredient = ingredientsDatabase.find(db => db.name === ing.name);
      return {
        name: ing.name,
        quantity: ing.quantity,
        unit: ing.unit,
        caloriesPerUnit: dbIngredient ? dbIngredient.caloriesPer100g / 100 : 0
      };
    });
    
    setIngredients(exampleIngredients);
    setServings(example.servings);
    setResult(null);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorLayout
        title="Calculadora de Calorías por Receta"
        description="Calcula las calorías totales y por porción de tus recetas con análisis nutricional completo."
      >
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
                Calculadora de Calorías por Receta
              </h1>
              <p className="text-lg text-gray-600">
                Calcula las calorías totales y por porción de tus recetas con análisis nutricional completo
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Calculator className="text-blue-600" />
                    Ingredientes de la Receta
                  </h2>

                  <div className="space-y-4 mb-6">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ingrediente
                            </label>
                            <Select
                              value={ingredient.name}
                              onValueChange={(value) => updateIngredient(index, 'name', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona ingrediente" />
                              </SelectTrigger>
                              <SelectContent>
                                {ingredientsDatabase.map((ing) => (
                                  <SelectItem key={ing.name} value={ing.name}>
                                    {ing.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Cantidad
                            </label>
                            <Input
                              type="number"
                              value={ingredient.quantity}
                              onChange={(e) => updateIngredient(index, 'quantity', parseFloat(e.target.value) || 0)}
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
                        
                        {ingredient.name && (
                          <div className="text-sm text-gray-600 mb-2">
                            <Info className="inline w-4 h-4 mr-1" />
                            {ingredient.caloriesPerUnit.toFixed(1)} calorías por {ingredient.unit}
                          </div>
                        )}
                        
                        {ingredients.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeIngredient(index)}
                            className="text-red-600 hover:text-red-700"
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

                  <div className="mb-6">
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

                  <div className="mt-4">
                    <Button onClick={calculate} className="w-full">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calcular Calorías
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="space-y-6">
                {result && (
                  <Card>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Resultados Nutricionales
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 mb-2">Calorías Totales</h4>
                          <p className="text-2xl font-bold text-blue-600">
                            {result.totalCalories} calorías
                          </p>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Por Porción</h4>
                          <p className="text-xl font-bold text-green-600">
                            {result.caloriesPerServing} calorías
                          </p>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-800 mb-3">Macronutrientes por Porción</h4>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                              <p className="text-sm text-gray-600">Proteínas</p>
                              <p className="font-bold text-purple-600">{result.macronutrientsPerServing.protein}g</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Carbohidratos</p>
                              <p className="font-bold text-purple-600">{result.macronutrientsPerServing.carbs}g</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Grasas</p>
                              <p className="font-bold text-purple-600">{result.macronutrientsPerServing.fat}g</p>
                            </div>
                          </div>
                        </div>
                        
                        <Button onClick={shareRecipe} className="w-full">
                          <Share2 className="w-4 h-4 mr-2" />
                          Compartir Receta
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
                          className="w-full justify-start text-left"
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
              </div>
            </div>

            <FAQ
              title="Preguntas Frecuentes sobre Calorías en Recetas"
              items={[
                {
                  question: "¿Cómo se calculan las calorías por ingrediente?",
                  answer: "Las calorías se calculan multiplicando la cantidad del ingrediente por su valor calórico por unidad. Usamos una base de datos nutricional actualizada con valores por 100g de cada ingrediente."
                },
                {
                  question: "¿Son exactos los valores nutricionales?",
                  answer: "Los valores son aproximados basados en tablas nutricionales estándar. Para mayor precisión, consulta las etiquetas nutricionales de tus ingredientes específicos."
                },
                {
                  question: "¿Cómo interpreto los macronutrientes?",
                  answer: "Los macronutrientes muestran la distribución de proteínas, carbohidratos y grasas. Una dieta balanceada típicamente incluye 15-20% proteínas, 45-65% carbohidratos y 20-35% grasas."
                },
                {
                  question: "¿Puedo agregar ingredientes personalizados?",
                  answer: "Actualmente usamos una base de datos predefinida. Para ingredientes específicos, puedes consultar sus valores nutricionales y ajustar las cantidades en la calculadora."
                }
              ]}
            />
          </div>
        </Container>
      </CalculatorLayout>
    </>
  );
}
