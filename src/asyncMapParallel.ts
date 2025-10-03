import { asyncMapLimit } from "./asyncMapLimit.js";

/**
 * Executes an asynchronous function for each element in an array in parallel with a concurrency limit.
 * @template T The type of elements in the input array.
 * @template U The return type of the asynchronous function.
 * @param {T[]} array The array to iterate over.
 * @param {(item: T, index: number, array: T[]) => U | Promise<U>} asyncFn The asynchronous function to execute for each element.
 * @param {number} concurrency The maximum number of promises to run in parallel.
 * @returns {Promise<U[]>} A promise that resolves to an array of the results of the asynchronous function calls, in the same order as the input array.
 */
export const asyncMapParallel = async <T, U>(
  array: T[],
  asyncFn: (item: T, index: number, array: T[]) => U | Promise<U>,
  concurrency: number,
): Promise<U[]> => Promise.all(asyncMapLimit(array, asyncFn, concurrency));
