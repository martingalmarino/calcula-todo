/**
 * Utilidades para operaciones con matrices
 */

export interface Matrix {
  data: number[][];
  rows: number;
  cols: number;
}

export interface MatrixResult {
  result: Matrix | number;
  steps: string[];
  method: string;
}

/**
 * Crea una matriz
 */
export function createMatrix(data: number[][]): Matrix {
  const rows = data.length;
  const cols = data[0]?.length || 0;
  
  if (rows === 0 || cols === 0) {
    throw new Error('La matriz no puede estar vacía');
  }
  
  // Verificar que todas las filas tengan la misma longitud
  for (let i = 1; i < rows; i++) {
    if (data[i].length !== cols) {
      throw new Error('Todas las filas deben tener la misma longitud');
    }
  }
  
  return { data, rows, cols };
}

/**
 * Crea una matriz identidad
 */
export function identityMatrix(size: number): Matrix {
  const data: number[][] = [];
  for (let i = 0; i < size; i++) {
    const row: number[] = [];
    for (let j = 0; j < size; j++) {
      row.push(i === j ? 1 : 0);
    }
    data.push(row);
  }
  return createMatrix(data);
}

/**
 * Crea una matriz de ceros
 */
export function zeroMatrix(rows: number, cols: number): Matrix {
  const data: number[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    data.push(row);
  }
  return createMatrix(data);
}

/**
 * Suma dos matrices
 */
export function addMatrices(matrix1: Matrix, matrix2: Matrix): MatrixResult {
  if (matrix1.rows !== matrix2.rows || matrix1.cols !== matrix2.cols) {
    throw new Error('Las matrices deben tener las mismas dimensiones para la suma');
  }
  
  const resultData: number[][] = [];
  const steps: string[] = [];
  
  steps.push('Suma de matrices:');
  steps.push(`A = ${matrixToString(matrix1)}`);
  steps.push(`B = ${matrixToString(matrix2)}`);
  steps.push('C = A + B');
  steps.push('');
  
  for (let i = 0; i < matrix1.rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < matrix1.cols; j++) {
      const sum = matrix1.data[i][j] + matrix2.data[i][j];
      row.push(sum);
      steps.push(`c[${i}][${j}] = a[${i}][${j}] + b[${i}][${j}] = ${matrix1.data[i][j]} + ${matrix2.data[i][j]} = ${sum}`);
    }
    resultData.push(row);
  }
  
  steps.push('');
  steps.push(`Resultado: ${matrixToString(createMatrix(resultData))}`);
  
  return {
    result: createMatrix(resultData),
    steps,
    method: 'suma de matrices'
  };
}

/**
 * Resta dos matrices
 */
export function subtractMatrices(matrix1: Matrix, matrix2: Matrix): MatrixResult {
  if (matrix1.rows !== matrix2.rows || matrix1.cols !== matrix2.cols) {
    throw new Error('Las matrices deben tener las mismas dimensiones para la resta');
  }
  
  const resultData: number[][] = [];
  const steps: string[] = [];
  
  steps.push('Resta de matrices:');
  steps.push(`A = ${matrixToString(matrix1)}`);
  steps.push(`B = ${matrixToString(matrix2)}`);
  steps.push('C = A - B');
  steps.push('');
  
  for (let i = 0; i < matrix1.rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < matrix1.cols; j++) {
      const diff = matrix1.data[i][j] - matrix2.data[i][j];
      row.push(diff);
      steps.push(`c[${i}][${j}] = a[${i}][${j}] - b[${i}][${j}] = ${matrix1.data[i][j]} - ${matrix2.data[i][j]} = ${diff}`);
    }
    resultData.push(row);
  }
  
  steps.push('');
  steps.push(`Resultado: ${matrixToString(createMatrix(resultData))}`);
  
  return {
    result: createMatrix(resultData),
    steps,
    method: 'resta de matrices'
  };
}

/**
 * Multiplica dos matrices
 */
export function multiplyMatrices(matrix1: Matrix, matrix2: Matrix): MatrixResult {
  if (matrix1.cols !== matrix2.rows) {
    throw new Error('El número de columnas de la primera matriz debe ser igual al número de filas de la segunda');
  }
  
  const resultData: number[][] = [];
  const steps: string[] = [];
  
  steps.push('Multiplicación de matrices:');
  steps.push(`A = ${matrixToString(matrix1)}`);
  steps.push(`B = ${matrixToString(matrix2)}`);
  steps.push('C = A × B');
  steps.push('');
  
  for (let i = 0; i < matrix1.rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < matrix2.cols; j++) {
      let sum = 0;
      let step = `c[${i}][${j}] = `;
      for (let k = 0; k < matrix1.cols; k++) {
        const product = matrix1.data[i][k] * matrix2.data[k][j];
        sum += product;
        step += `${matrix1.data[i][k]} × ${matrix2.data[k][j]}`;
        if (k < matrix1.cols - 1) step += ' + ';
      }
      step += ` = ${sum}`;
      steps.push(step);
      row.push(sum);
    }
    resultData.push(row);
  }
  
  steps.push('');
  steps.push(`Resultado: ${matrixToString(createMatrix(resultData))}`);
  
  return {
    result: createMatrix(resultData),
    steps,
    method: 'multiplicación de matrices'
  };
}

/**
 * Calcula el determinante de una matriz cuadrada
 */
export function determinant(matrix: Matrix): MatrixResult {
  if (matrix.rows !== matrix.cols) {
    throw new Error('La matriz debe ser cuadrada para calcular el determinante');
  }
  
  const steps: string[] = [];
  steps.push('Cálculo del determinante:');
  steps.push(`A = ${matrixToString(matrix)}`);
  steps.push('');
  
  let result: number;
  
  if (matrix.rows === 1) {
    result = matrix.data[0][0];
    steps.push(`det(A) = ${result}`);
  } else if (matrix.rows === 2) {
    result = matrix.data[0][0] * matrix.data[1][1] - matrix.data[0][1] * matrix.data[1][0];
    steps.push(`det(A) = (${matrix.data[0][0]} × ${matrix.data[1][1]}) - (${matrix.data[0][1]} × ${matrix.data[1][0]})`);
    steps.push(`det(A) = ${matrix.data[0][0] * matrix.data[1][1]} - ${matrix.data[0][1] * matrix.data[1][0]}`);
    steps.push(`det(A) = ${result}`);
  } else if (matrix.rows === 3) {
    // Regla de Sarrus
    const a = matrix.data[0][0], b = matrix.data[0][1], c = matrix.data[0][2];
    const d = matrix.data[1][0], e = matrix.data[1][1], f = matrix.data[1][2];
    const g = matrix.data[2][0], h = matrix.data[2][1], i = matrix.data[2][2];
    
    result = a * e * i + b * f * g + c * d * h - c * e * g - b * d * i - a * f * h;
    
    steps.push('Usando la regla de Sarrus:');
    steps.push(`det(A) = aei + bfg + cdh - ceg - bdi - afh`);
    steps.push(`det(A) = (${a} × ${e} × ${i}) + (${b} × ${f} × ${g}) + (${c} × ${d} × ${h}) - (${c} × ${e} × ${g}) - (${b} × ${d} × ${i}) - (${a} × ${f} × ${h})`);
    steps.push(`det(A) = ${a * e * i} + ${b * f * g} + ${c * d * h} - ${c * e * g} - ${b * d * i} - ${a * f * h}`);
    steps.push(`det(A) = ${result}`);
  } else {
    // Expansión por cofactores (primer fila)
    result = 0;
    steps.push('Usando expansión por cofactores (primera fila):');
    
    for (let j = 0; j < matrix.cols; j++) {
      const cofactor = Math.pow(-1, j) * matrix.data[0][j] * determinantMinor(matrix, 0, j);
      result += cofactor;
      steps.push(`Cofactor[0][${j}] = (-1)^${j} × ${matrix.data[0][j]} × det(menor) = ${cofactor}`);
    }
    
    steps.push(`det(A) = ${result}`);
  }
  
  return { result, steps, method: 'determinante' };
}

/**
 * Calcula el menor de una matriz (eliminando fila i y columna j)
 */
function determinantMinor(matrix: Matrix, row: number, col: number): number {
  const minorData: number[][] = [];
  
  for (let i = 0; i < matrix.rows; i++) {
    if (i === row) continue;
    const minorRow: number[] = [];
    for (let j = 0; j < matrix.cols; j++) {
      if (j === col) continue;
      minorRow.push(matrix.data[i][j]);
    }
    minorData.push(minorRow);
  }
  
  const minor = createMatrix(minorData);
  return determinant(minor).result as number;
}

/**
 * Calcula la matriz inversa usando Gauss-Jordan
 */
export function inverseMatrix(matrix: Matrix): MatrixResult {
  if (matrix.rows !== matrix.cols) {
    throw new Error('La matriz debe ser cuadrada para calcular la inversa');
  }
  
  const det = determinant(matrix);
  if (det.result === 0) {
    throw new Error('La matriz no tiene inversa (determinante = 0)');
  }
  
  const steps: string[] = [];
  steps.push('Cálculo de la matriz inversa:');
  steps.push(`A = ${matrixToString(matrix)}`);
  steps.push(`det(A) = ${det.result}`);
  steps.push('');
  
  // Crear matriz aumentada [A|I]
  const augmentedData: number[][] = [];
  for (let i = 0; i < matrix.rows; i++) {
    const row: number[] = [];
    // Agregar fila de A
    for (let j = 0; j < matrix.cols; j++) {
      row.push(matrix.data[i][j]);
    }
    // Agregar fila de I
    for (let j = 0; j < matrix.cols; j++) {
      row.push(i === j ? 1 : 0);
    }
    augmentedData.push(row);
  }
  
  steps.push('Matriz aumentada [A|I]:');
  steps.push(matrixToString(createMatrix(augmentedData)));
  steps.push('');
  
  // Aplicar eliminación gaussiana
  const result = gaussJordanElimination(createMatrix(augmentedData));
  
  // Extraer la parte derecha (matriz inversa)
  const inverseData: number[][] = [];
  for (let i = 0; i < matrix.rows; i++) {
    const row: number[] = [];
    for (let j = matrix.cols; j < 2 * matrix.cols; j++) {
      row.push(result.data[i][j]);
    }
    inverseData.push(row);
  }
  
  steps.push('Matriz inversa:');
  steps.push(matrixToString(createMatrix(inverseData)));
  
  return {
    result: createMatrix(inverseData),
    steps,
    method: 'Gauss-Jordan'
  };
}

/**
 * Eliminación gaussiana con Jordan
 */
function gaussJordanElimination(matrix: Matrix): Matrix {
  const data = matrix.data.map(row => [...row]);
  const result = createMatrix(data);
  
  const n = result.rows;
  
  // Eliminación hacia adelante
  for (let i = 0; i < n; i++) {
    // Buscar el pivote
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(result.data[k][i]) > Math.abs(result.data[maxRow][i])) {
        maxRow = k;
      }
    }
    
    // Intercambiar filas
    if (maxRow !== i) {
      [result.data[i], result.data[maxRow]] = [result.data[maxRow], result.data[i]];
    }
    
    // Hacer el pivote igual a 1
    const pivot = result.data[i][i];
    if (pivot !== 0) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] /= pivot;
      }
    }
    
    // Eliminar elementos por debajo del pivote
    for (let k = i + 1; k < n; k++) {
      const factor = result.data[k][i];
      for (let j = 0; j < result.cols; j++) {
        result.data[k][j] -= factor * result.data[i][j];
      }
    }
  }
  
  // Eliminación hacia atrás
  for (let i = n - 1; i >= 0; i--) {
    for (let k = i - 1; k >= 0; k--) {
      const factor = result.data[k][i];
      for (let j = 0; j < result.cols; j++) {
        result.data[k][j] -= factor * result.data[i][j];
      }
    }
  }
  
  return result;
}

/**
 * Multiplica una matriz por un escalar
 */
export function scalarMultiply(matrix: Matrix, scalar: number): MatrixResult {
  const resultData: number[][] = [];
  const steps: string[] = [];
  
  steps.push('Multiplicación por escalar:');
  steps.push(`A = ${matrixToString(matrix)}`);
  steps.push(`k = ${scalar}`);
  steps.push('B = k × A');
  steps.push('');
  
  for (let i = 0; i < matrix.rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < matrix.cols; j++) {
      const product = scalar * matrix.data[i][j];
      row.push(product);
      steps.push(`b[${i}][${j}] = ${scalar} × ${matrix.data[i][j]} = ${product}`);
    }
    resultData.push(row);
  }
  
  steps.push('');
  steps.push(`Resultado: ${matrixToString(createMatrix(resultData))}`);
  
  return {
    result: createMatrix(resultData),
    steps,
    method: 'multiplicación por escalar'
  };
}

/**
 * Transpone una matriz
 */
export function transpose(matrix: Matrix): MatrixResult {
  const resultData: number[][] = [];
  const steps: string[] = [];
  
  steps.push('Transposición de matriz:');
  steps.push(`A = ${matrixToString(matrix)}`);
  steps.push('A^T = transpuesta de A');
  steps.push('');
  
  for (let j = 0; j < matrix.cols; j++) {
    const row: number[] = [];
    for (let i = 0; i < matrix.rows; i++) {
      row.push(matrix.data[i][j]);
      steps.push(`a^T[${j}][${i}] = a[${i}][${j}] = ${matrix.data[i][j]}`);
    }
    resultData.push(row);
  }
  
  steps.push('');
  steps.push(`Resultado: ${matrixToString(createMatrix(resultData))}`);
  
  return {
    result: createMatrix(resultData),
    steps,
    method: 'transposición'
  };
}

/**
 * Convierte una matriz a string para mostrar
 */
export function matrixToString(matrix: Matrix): string {
  const rows = matrix.data.map(row => 
    `[${row.map(val => val.toString()).join(', ')}]`
  );
  return `[${rows.join(', ')}]`;
}

/**
 * Crea matrices predefinidas para ejemplos
 */
export const predefinedMatrices = {
  identity2x2: () => identityMatrix(2),
  identity3x3: () => identityMatrix(3),
  zero2x2: () => zeroMatrix(2, 2),
  zero3x3: () => zeroMatrix(3, 3),
  example2x2: () => createMatrix([[1, 2], [3, 4]]),
  example3x3: () => createMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
};
