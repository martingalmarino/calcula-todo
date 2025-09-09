// Funciones matemáticas para cálculos de geometría

export interface CircleResult {
  area: number;
  circumference: number;
  diameter: number;
  radius: number;
}

export interface RectangleResult {
  area: number;
  perimeter: number;
  length: number;
  width: number;
}

export interface TriangleResult {
  area: number;
  base: number;
  height: number;
  side1?: number;
  side2?: number;
  side3?: number;
}

export interface SquareResult {
  area: number;
  perimeter: number;
  side: number;
}

export interface RhombusResult {
  area: number;
  perimeter: number;
  side: number;
  diagonal1: number;
  diagonal2: number;
}

export interface TrapezoidResult {
  area: number;
  base1: number;
  base2: number;
  height: number;
  side1?: number;
  side2?: number;
}

// Círculo
export function calculateCircle(radius: number): CircleResult {
  if (radius <= 0) {
    throw new Error('El radio debe ser mayor a 0');
  }
  
  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;
  const diameter = 2 * radius;
  
  return {
    area: Math.round(area * 100) / 100,
    circumference: Math.round(circumference * 100) / 100,
    diameter: Math.round(diameter * 100) / 100,
    radius
  };
}

export function calculateCircleFromDiameter(diameter: number): CircleResult {
  if (diameter <= 0) {
    throw new Error('El diámetro debe ser mayor a 0');
  }
  
  const radius = diameter / 2;
  return calculateCircle(radius);
}

export function calculateCircleFromArea(area: number): CircleResult {
  if (area <= 0) {
    throw new Error('El área debe ser mayor a 0');
  }
  
  const radius = Math.sqrt(area / Math.PI);
  return calculateCircle(radius);
}

// Rectángulo
export function calculateRectangle(length: number, width: number): RectangleResult {
  if (length <= 0 || width <= 0) {
    throw new Error('La longitud y el ancho deben ser mayores a 0');
  }
  
  const area = length * width;
  const perimeter = 2 * (length + width);
  
  return {
    area: Math.round(area * 100) / 100,
    perimeter: Math.round(perimeter * 100) / 100,
    length,
    width
  };
}

export function calculateRectangleFromArea(area: number, length: number): RectangleResult {
  if (area <= 0 || length <= 0) {
    throw new Error('El área y la longitud deben ser mayores a 0');
  }
  
  const width = area / length;
  return calculateRectangle(length, width);
}

export function calculateRectangleFromPerimeter(perimeter: number, length: number): RectangleResult {
  if (perimeter <= 0 || length <= 0) {
    throw new Error('El perímetro y la longitud deben ser mayores a 0');
  }
  
  if (length >= perimeter / 2) {
    throw new Error('La longitud debe ser menor que la mitad del perímetro');
  }
  
  const width = (perimeter - 2 * length) / 2;
  return calculateRectangle(length, width);
}

// Triángulo
export function calculateTriangle(base: number, height: number): TriangleResult {
  if (base <= 0 || height <= 0) {
    throw new Error('La base y la altura deben ser mayores a 0');
  }
  
  const area = (base * height) / 2;
  
  return {
    area: Math.round(area * 100) / 100,
    base,
    height
  };
}

export function calculateTriangleFromSides(side1: number, side2: number, side3: number): TriangleResult {
  if (side1 <= 0 || side2 <= 0 || side3 <= 0) {
    throw new Error('Todos los lados deben ser mayores a 0');
  }
  
  // Verificar desigualdad triangular
  if (side1 + side2 <= side3 || side1 + side3 <= side2 || side2 + side3 <= side1) {
    throw new Error('Los lados no forman un triángulo válido');
  }
  
  // Fórmula de Herón
  const s = (side1 + side2 + side3) / 2;
  const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
  
  return {
    area: Math.round(area * 100) / 100,
    base: side1,
    height: (2 * area) / side1,
    side1,
    side2,
    side3
  };
}

// Cuadrado
export function calculateSquare(side: number): SquareResult {
  if (side <= 0) {
    throw new Error('El lado debe ser mayor a 0');
  }
  
  const area = side * side;
  const perimeter = 4 * side;
  
  return {
    area: Math.round(area * 100) / 100,
    perimeter: Math.round(perimeter * 100) / 100,
    side
  };
}

export function calculateSquareFromArea(area: number): SquareResult {
  if (area <= 0) {
    throw new Error('El área debe ser mayor a 0');
  }
  
  const side = Math.sqrt(area);
  return calculateSquare(side);
}

export function calculateSquareFromPerimeter(perimeter: number): SquareResult {
  if (perimeter <= 0) {
    throw new Error('El perímetro debe ser mayor a 0');
  }
  
  const side = perimeter / 4;
  return calculateSquare(side);
}

// Rombo
export function calculateRhombus(diagonal1: number, diagonal2: number): RhombusResult {
  if (diagonal1 <= 0 || diagonal2 <= 0) {
    throw new Error('Las diagonales deben ser mayores a 0');
  }
  
  const area = (diagonal1 * diagonal2) / 2;
  const side = Math.sqrt((diagonal1 / 2) ** 2 + (diagonal2 / 2) ** 2);
  const perimeter = 4 * side;
  
  return {
    area: Math.round(area * 100) / 100,
    perimeter: Math.round(perimeter * 100) / 100,
    side: Math.round(side * 100) / 100,
    diagonal1,
    diagonal2
  };
}

export function calculateRhombusFromSideAndDiagonal(side: number, diagonal1: number): RhombusResult {
  if (side <= 0 || diagonal1 <= 0) {
    throw new Error('El lado y la diagonal deben ser mayores a 0');
  }
  
  if (diagonal1 >= 2 * side) {
    throw new Error('La diagonal debe ser menor que el doble del lado');
  }
  
  const diagonal2 = 2 * Math.sqrt(side * side - (diagonal1 / 2) ** 2);
  return calculateRhombus(diagonal1, diagonal2);
}

// Trapecio
export function calculateTrapezoid(base1: number, base2: number, height: number): TrapezoidResult {
  if (base1 <= 0 || base2 <= 0 || height <= 0) {
    throw new Error('Las bases y la altura deben ser mayores a 0');
  }
  
  const area = ((base1 + base2) * height) / 2;
  
  return {
    area: Math.round(area * 100) / 100,
    base1,
    base2,
    height
  };
}

export function calculateTrapezoidFromArea(area: number, base1: number, base2: number): TrapezoidResult {
  if (area <= 0 || base1 <= 0 || base2 <= 0) {
    throw new Error('El área y las bases deben ser mayores a 0');
  }
  
  const height = (2 * area) / (base1 + base2);
  return calculateTrapezoid(base1, base2, height);
}

// Funciones de utilidad
export function formatNumber(num: number, decimals: number = 2): string {
  return num.toFixed(decimals);
}

export function getShapeDescription(shape: string): string {
  const descriptions: Record<string, string> = {
    circle: 'Un círculo es una figura geométrica plana formada por todos los puntos que están a la misma distancia de un punto central llamado centro.',
    rectangle: 'Un rectángulo es un paralelogramo que tiene sus cuatro ángulos rectos y sus lados opuestos iguales y paralelos.',
    triangle: 'Un triángulo es una figura geométrica formada por tres lados que se unen en tres vértices.',
    square: 'Un cuadrado es un rectángulo que tiene sus cuatro lados iguales y sus cuatro ángulos rectos.',
    rhombus: 'Un rombo es un paralelogramo que tiene sus cuatro lados iguales, pero sus ángulos no son rectos.',
    trapezoid: 'Un trapecio es un cuadrilátero que tiene al menos un par de lados paralelos llamados bases.'
  };
  
  return descriptions[shape] || '';
}
