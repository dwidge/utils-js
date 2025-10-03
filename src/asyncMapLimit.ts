import pLimit from "p-limit";

/**
 * Creates an array of promises for executing an asynchronous function for each element in an array in parallel with a concurrency limit.
 * The caller is responsible for awaiting the promises (e.g., using Promise.all or Promise.allSettled).
 * @template T The type of elements in the input array.
 * @template U The return type of the asynchronous function.
 * @param {T[]} array The array to iterate over.
 * @param {(item: T, index: number, array: T[]) => U | Promise<U>} asyncFn The asynchronous function to execute for each element.
 * @param {number} concurrency The maximum number of promises to run in parallel.
 * @returns {Promise<U>[]} An array of promises that resolve to the results of the asynchronous function calls, in the same order as the input array.
 */
export const asyncMapLimit = <T, U>(
  array: T[],
  asyncFn: (item: T, index: number, array: T[]) => U | Promise<U>,
  concurrency: number,
): Promise<U>[] => {
  const limit = pLimit(concurrency);
  return array.map((item, index) => limit(() => asyncFn(item, index, array)));
};
