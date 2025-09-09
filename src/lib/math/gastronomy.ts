/**
 * Funciones matemáticas para calculadoras de GASTRONOMÍA Y HOGAR
 */

export interface KitchenConversionResult {
  value: number;
  fromUnit: string;
  toUnit: string;
  convertedValue: number;
  ingredient: string;
  density: number; // g/ml
  equivalencies: {
    cups: number;
    tablespoons: number;
    teaspoons: number;
    milliliters: number;
    grams: number;
  };
}

export interface RecipeCaloriesResult {
  totalCalories: number;
  caloriesPerServing: number;
  servings: number;
  macronutrients: {
    carbohydrates: number;
    proteins: number;
    fats: number;
  };
  ingredients: Array<{
    name: string;
    amount: number;
    unit: string;
    calories: number;
  }>;
}

export interface TemperatureConversionResult {
  celsius: number;
  fahrenheit: number;
  gasMark: number;
  description: string;
  bakingTips: string[];
}

export interface RecipeCostResult {
  totalCost: number;
  costPerServing: number;
  servings: number;
  ingredients: Array<{
    name: string;
    amount: number;
    unit: string;
    pricePerUnit: number;
    totalCost: number;
  }>;
  savings?: {
    homemadeCost: number;
    storeCost: number;
    savings: number;
    savingsPercent: number;
  };
}

export interface FermentationResult {
  temperature: number;
  yeastType: string;
  fermentationTime: number; // en horas
  proofingTime: number; // en horas
  totalTime: number; // en horas
  tips: string[];
  stages: Array<{
    stage: string;
    time: number;
    temperature: number;
    description: string;
  }>;
}

export interface ElectricityConsumptionResult {
  power: number; // watts
  hours: number;
  consumption: number; // kWh
  cost: number;
  costPerHour: number;
  comparison: Array<{
    appliance: string;
    power: number;
    consumption: number;
    cost: number;
  }>;
}

// Base de datos de ingredientes con densidades y calorías
const INGREDIENT_DATABASE = {
  'harina': { density: 0.6, calories: 364, carbs: 76, protein: 10, fat: 1 },
  'azucar': { density: 0.85, calories: 387, carbs: 100, protein: 0, fat: 0 },
  'arroz': { density: 0.75, calories: 365, carbs: 80, protein: 7, fat: 0.6 },
  'manteca': { density: 0.9, calories: 717, carbs: 0, protein: 0.9, fat: 81 },
  'aceite': { density: 0.92, calories: 884, carbs: 0, protein: 0, fat: 100 },
  'leche': { density: 1.03, calories: 42, carbs: 5, protein: 3.4, fat: 1 },
  'huevo': { density: 1.03, calories: 155, carbs: 1.1, protein: 13, fat: 11 },
  'queso': { density: 1.1, calories: 113, carbs: 1, protein: 7, fat: 9 },
  'tomate': { density: 1.0, calories: 18, carbs: 3.9, protein: 0.9, fat: 0.2 },
  'cebolla': { density: 0.6, calories: 40, carbs: 9.3, protein: 1.1, fat: 0.1 }
};

// Base de datos de calorías por 100g
const CALORIES_DATABASE = {
  'harina': { calories: 364, carbs: 76, protein: 10, fat: 1 },
  'azucar': { calories: 387, carbs: 100, protein: 0, fat: 0 },
  'arroz': { calories: 365, carbs: 80, protein: 7, fat: 0.6 },
  'manteca': { calories: 717, carbs: 0, protein: 0.9, fat: 81 },
  'aceite': { calories: 884, carbs: 0, protein: 0, fat: 100 },
  'leche': { calories: 42, carbs: 5, protein: 3.4, fat: 1 },
  'huevo': { calories: 155, carbs: 1.1, protein: 13, fat: 11 },
  'queso': { calories: 113, carbs: 1, protein: 7, fat: 9 },
  'tomate': { calories: 18, carbs: 3.9, protein: 0.9, fat: 0.2 },
  'cebolla': { calories: 40, carbs: 9.3, protein: 1.1, fat: 0.1 },
  'pollo': { calories: 165, carbs: 0, protein: 31, fat: 3.6 },
  'carne': { calories: 250, carbs: 0, protein: 26, fat: 15 },
  'papa': { calories: 77, carbs: 17, protein: 2, fat: 0.1 },
  'zanahoria': { calories: 41, carbs: 9.6, protein: 0.9, fat: 0.2 }
};

/**
 * Convierte medidas de cocina entre diferentes unidades
 */
export function convertKitchenMeasure(
  value: number,
  fromUnit: string,
  toUnit: string,
  ingredient: string
): KitchenConversionResult {
  if (value <= 0) {
    throw new Error('El valor debe ser mayor a 0');
  }

  const ingredientData = INGREDIENT_DATABASE[ingredient as keyof typeof INGREDIENT_DATABASE];
  if (!ingredientData) {
    throw new Error('Ingrediente no encontrado en la base de datos');
  }

  // Convertir a gramos primero
  let grams: number;
  switch (fromUnit) {
    case 'g':
      grams = value;
      break;
    case 'ml':
      grams = value * ingredientData.density;
      break;
    case 'taza':
      grams = value * 240 * ingredientData.density; // 1 taza = 240 ml
      break;
    case 'cucharada':
      grams = value * 15 * ingredientData.density; // 1 cucharada = 15 ml
      break;
    case 'cucharadita':
      grams = value * 5 * ingredientData.density; // 1 cucharadita = 5 ml
      break;
    default:
      throw new Error('Unidad de origen no válida');
  }

  // Convertir de gramos a unidad destino
  let convertedValue: number;
  switch (toUnit) {
    case 'g':
      convertedValue = grams;
      break;
    case 'ml':
      convertedValue = grams / ingredientData.density;
      break;
    case 'taza':
      convertedValue = grams / (240 * ingredientData.density);
      break;
    case 'cucharada':
      convertedValue = grams / (15 * ingredientData.density);
      break;
    case 'cucharadita':
      convertedValue = grams / (5 * ingredientData.density);
      break;
    default:
      throw new Error('Unidad de destino no válida');
  }

  // Calcular equivalencias
  const equivalencies = {
    cups: grams / (240 * ingredientData.density),
    tablespoons: grams / (15 * ingredientData.density),
    teaspoons: grams / (5 * ingredientData.density),
    milliliters: grams / ingredientData.density,
    grams: grams
  };

  return {
    value,
    fromUnit,
    toUnit,
    convertedValue: Math.round(convertedValue * 100) / 100,
    ingredient,
    density: ingredientData.density,
    equivalencies: {
      cups: Math.round(equivalencies.cups * 100) / 100,
      tablespoons: Math.round(equivalencies.tablespoons * 100) / 100,
      teaspoons: Math.round(equivalencies.teaspoons * 100) / 100,
      milliliters: Math.round(equivalencies.milliliters * 100) / 100,
      grams: Math.round(equivalencies.grams * 100) / 100
    }
  };
}

/**
 * Calcula calorías de una receta
 */
export function calculateRecipeCalories(
  ingredients: Array<{ name: string; amount: number; unit: string }>,
  servings: number
): RecipeCaloriesResult {
  if (servings <= 0) {
    throw new Error('El número de porciones debe ser mayor a 0');
  }

  let totalCalories = 0;
  let totalCarbs = 0;
  let totalProteins = 0;
  let totalFats = 0;

  const ingredientDetails = ingredients.map(ingredient => {
    const ingredientData = CALORIES_DATABASE[ingredient.name as keyof typeof CALORIES_DATABASE];
    if (!ingredientData) {
      throw new Error(`Ingrediente "${ingredient.name}" no encontrado en la base de datos`);
    }

    // Convertir cantidad a gramos
    let grams: number;
    switch (ingredient.unit) {
      case 'g':
        grams = ingredient.amount;
        break;
      case 'kg':
        grams = ingredient.amount * 1000;
        break;
      case 'ml':
        grams = ingredient.amount * 1; // Asumiendo densidad de agua para líquidos
        break;
      case 'l':
        grams = ingredient.amount * 1000;
        break;
      case 'taza':
        grams = ingredient.amount * 240; // 1 taza = 240 ml
        break;
      default:
        grams = ingredient.amount;
    }

    const calories = (grams / 100) * ingredientData.calories;
    const carbs = (grams / 100) * ingredientData.carbs;
    const protein = (grams / 100) * ingredientData.protein;
    const fat = (grams / 100) * ingredientData.fat;

    totalCalories += calories;
    totalCarbs += carbs;
    totalProteins += protein;
    totalFats += fat;

    return {
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      calories: Math.round(calories * 100) / 100
    };
  });

  return {
    totalCalories: Math.round(totalCalories * 100) / 100,
    caloriesPerServing: Math.round((totalCalories / servings) * 100) / 100,
    servings,
    macronutrients: {
      carbohydrates: Math.round(totalCarbs * 100) / 100,
      proteins: Math.round(totalProteins * 100) / 100,
      fats: Math.round(totalFats * 100) / 100
    },
    ingredients: ingredientDetails
  };
}

/**
 * Convierte temperaturas entre Celsius, Fahrenheit y Gas Mark
 */
export function convertTemperature(
  value: number,
  fromUnit: 'celsius' | 'fahrenheit' | 'gasmark'
): TemperatureConversionResult {
  let celsius: number;
  let fahrenheit: number;
  let gasMark: number;

  switch (fromUnit) {
    case 'celsius':
      celsius = value;
      fahrenheit = (value * 9/5) + 32;
      break;
    case 'fahrenheit':
      celsius = (value - 32) * 5/9;
      fahrenheit = value;
      break;
    case 'gasmark':
      celsius = gasMarkToCelsius(value);
      fahrenheit = (celsius * 9/5) + 32;
      break;
    default:
      throw new Error('Unidad de temperatura no válida');
  }

  gasMark = celsiusToGasMark(celsius);

  const description = getTemperatureDescription(celsius);
  const bakingTips = getBakingTips(celsius);

  return {
    celsius: Math.round(celsius * 10) / 10,
    fahrenheit: Math.round(fahrenheit * 10) / 10,
    gasMark: Math.round(gasMark * 10) / 10,
    description,
    bakingTips
  };
}

/**
 * Calcula costos de recetas
 */
export function calculateRecipeCost(
  ingredients: Array<{ name: string; amount: number; unit: string; pricePerUnit: number }>,
  servings: number,
  storeAlternative?: { name: string; price: number }
): RecipeCostResult {
  if (servings <= 0) {
    throw new Error('El número de porciones debe ser mayor a 0');
  }

  let totalCost = 0;
  const ingredientDetails = ingredients.map(ingredient => {
    const totalCost = ingredient.amount * ingredient.pricePerUnit;
    totalCost += totalCost;
    return {
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
      pricePerUnit: ingredient.pricePerUnit,
      totalCost: Math.round(totalCost * 100) / 100
    };
  });

  const costPerServing = totalCost / servings;
  let savings;
  
  if (storeAlternative) {
    const savingsAmount = storeAlternative.price - totalCost;
    const savingsPercent = (savingsAmount / storeAlternative.price) * 100;
    savings = {
      homemadeCost: Math.round(totalCost * 100) / 100,
      storeCost: storeAlternative.price,
      savings: Math.round(savingsAmount * 100) / 100,
      savingsPercent: Math.round(savingsPercent * 100) / 100
    };
  }

  return {
    totalCost: Math.round(totalCost * 100) / 100,
    costPerServing: Math.round(costPerServing * 100) / 100,
    servings,
    ingredients: ingredientDetails,
    savings
  };
}

/**
 * Calcula tiempos de fermentación
 */
export function calculateFermentation(
  temperature: number,
  yeastType: 'fresh' | 'dry' | 'instant',
  doughWeight: number = 1000 // gramos
): FermentationResult {
  if (temperature < 0 || temperature > 50) {
    throw new Error('La temperatura debe estar entre 0°C y 50°C');
  }

  // Factores de tiempo según tipo de levadura
  const yeastFactors = {
    'fresh': 1.0,
    'dry': 1.5,
    'instant': 0.8
  };

  // Tiempo base de fermentación (a 25°C)
  const baseTime = 1.5; // horas
  const temperatureFactor = Math.exp((25 - temperature) / 10);
  
  const fermentationTime = baseTime * temperatureFactor * yeastFactors[yeastType];
  const proofingTime = fermentationTime * 0.3; // 30% del tiempo de fermentación
  const totalTime = fermentationTime + proofingTime;

  const tips = getFermentationTips(temperature, yeastType);
  const stages = getFermentationStages(fermentationTime, proofingTime, temperature);

  return {
    temperature,
    yeastType,
    fermentationTime: Math.round(fermentationTime * 100) / 100,
    proofingTime: Math.round(proofingTime * 100) / 100,
    totalTime: Math.round(totalTime * 100) / 100,
    tips,
    stages
  };
}

/**
 * Calcula consumo eléctrico de electrodomésticos
 */
export function calculateElectricityConsumption(
  power: number,
  hours: number,
  costPerKwh: number
): ElectricityConsumptionResult {
  if (power <= 0 || hours <= 0 || costPerKwh <= 0) {
    throw new Error('Todos los valores deben ser mayores a 0');
  }

  const consumption = (power * hours) / 1000; // Convertir W a kW
  const cost = consumption * costPerKwh;
  const costPerHour = cost / hours;

  // Comparación con otros electrodomésticos
  const appliances = [
    { name: 'Horno eléctrico', power: 2000 },
    { name: 'Microondas', power: 1000 },
    { name: 'Air Fryer', power: 1500 },
    { name: 'Horno de convección', power: 1800 },
    { name: 'Plancha eléctrica', power: 1200 }
  ];

  const comparison = appliances.map(appliance => ({
    appliance: appliance.name,
    power: appliance.power,
    consumption: Math.round((appliance.power * hours / 1000) * 100) / 100,
    cost: Math.round((appliance.power * hours / 1000) * costPerKwh * 100) / 100
  }));

  return {
    power,
    hours,
    consumption: Math.round(consumption * 100) / 100,
    cost: Math.round(cost * 100) / 100,
    costPerHour: Math.round(costPerHour * 100) / 100,
    comparison
  };
}

// Funciones auxiliares

function gasMarkToCelsius(gasMark: number): number {
  const gasMarkTable = {
    1: 140, 2: 150, 3: 160, 4: 180, 5: 190,
    6: 200, 7: 220, 8: 230, 9: 240, 10: 250
  };
  return gasMarkTable[gasMark as keyof typeof gasMarkTable] || 180;
}

function celsiusToGasMark(celsius: number): number {
  if (celsius < 140) return 1;
  if (celsius < 150) return 2;
  if (celsius < 160) return 3;
  if (celsius < 180) return 4;
  if (celsius < 190) return 5;
  if (celsius < 200) return 6;
  if (celsius < 220) return 7;
  if (celsius < 230) return 8;
  if (celsius < 240) return 9;
  return 10;
}

function getTemperatureDescription(celsius: number): string {
  if (celsius < 100) return 'Temperatura baja - ideal para secar';
  if (celsius < 150) return 'Temperatura baja - para cocción lenta';
  if (celsius < 180) return 'Temperatura media - para horneado suave';
  if (celsius < 200) return 'Temperatura media-alta - para la mayoría de horneados';
  if (celsius < 220) return 'Temperatura alta - para dorar y asar';
  return 'Temperatura muy alta - para gratinar y asar';
}

function getBakingTips(celsius: number): string[] {
  const tips = [];
  
  if (celsius >= 200) {
    tips.push('Reduce 20°C si usas ventilador/convección');
    tips.push('Vigila el dorado para evitar que se queme');
  }
  
  if (celsius < 150) {
    tips.push('Ideal para secar hierbas y frutas');
    tips.push('Tiempo de cocción más largo requerido');
  }
  
  if (celsius >= 180 && celsius <= 200) {
    tips.push('Temperatura ideal para la mayoría de panes');
    tips.push('Perfecta para pasteles y galletas');
  }
  
  return tips;
}

function getFermentationTips(temperature: number, yeastType: string): string[] {
  const tips = [];
  
  if (temperature < 20) {
    tips.push('Temperatura baja: la fermentación será más lenta');
    tips.push('Considera usar más levadura o precalentar el ambiente');
  }
  
  if (temperature > 30) {
    tips.push('Temperatura alta: vigila que no se sobrefermente');
    tips.push('La masa puede volverse ácida rápidamente');
  }
  
  if (yeastType === 'fresh') {
    tips.push('Levadura fresca: más sabor pero menos estable');
  } else if (yeastType === 'instant') {
    tips.push('Levadura instantánea: más rápida y estable');
  }
  
  return tips;
}

function getFermentationStages(fermentationTime: number, proofingTime: number, temperature: number): Array<{
  stage: string;
  time: number;
  temperature: number;
  description: string;
}> {
  return [
    {
      stage: 'Mezcla inicial',
      time: 0,
      temperature: temperature,
      description: 'Mezclar ingredientes hasta formar una masa homogénea'
    },
    {
      stage: 'Primera fermentación',
      time: Math.round(fermentationTime * 100) / 100,
      temperature: temperature,
      description: 'Dejar reposar hasta que doble su volumen'
    },
    {
      stage: 'Formado',
      time: Math.round(fermentationTime * 100) / 100,
      temperature: temperature,
      description: 'Dar forma a la masa y colocarla en el molde'
    },
    {
      stage: 'Segunda fermentación (prueba)',
      time: Math.round((fermentationTime + proofingTime) * 100) / 100,
      temperature: temperature,
      description: 'Dejar reposar hasta que esté lista para hornear'
    }
  ];
}
