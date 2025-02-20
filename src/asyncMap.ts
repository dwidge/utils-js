/**
 * Executes an asynchronous function for each element in an array sequentially.
 * This is useful when the order of operations matters.
 * @template T The type of elements in the input array.
 * @template U The return type of the asynchronous function.
 * @param {T[]} array The array to iterate over.
 * @param {(item: T, index: number, array: T[]) => Promise<U>} asyncFn The asynchronous function to execute for each element.
 * @returns {Promise<U[]>} A promise that resolves to an array of the results of the asynchronous function calls, in the same order as the input array.
 */
export const asyncMap = async <T, U>(
  array: T[],
  asyncFn: (item: T, index: number, array: T[]) => U | Promise<U>,
): Promise<U[]> => {
  const results: U[] = [];
  for (let i = 0; i < array.length; i++) {
    const result = await asyncFn(array[i]!, i, array);
    results.push(result);
  }
  return results;
};
