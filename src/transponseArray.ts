/**
 * Transposes a 2D array (matrix).
 *
 * @param matrix - The input 2D array to transpose.
 * @returns A new 2D array representing the transpose of the input matrix.
 *          Returns an empty array if the input is empty or not a valid 2D array.
 *
 * @typeparam T - The type of elements in the array.
 *
 * @example
 * transposeArray([ [1, 2, 3], [4, 5, 6] ]) // returns [ [1, 4], [2, 5], [3, 6] ]
 */
export const transposeArray = <T>(matrix: T[][]): T[][] => {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return []; // Return empty array for empty or invalid input
  }

  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposedMatrix: T[][] = [];

  for (let j = 0; j < cols; j++) {
    transposedMatrix[j] = []; // Initialize each row of the transposed matrix
    for (let i = 0; i < rows; i++) {
      transposedMatrix[j][i] = matrix[i][j];
    }
  }

  return transposedMatrix;
};
