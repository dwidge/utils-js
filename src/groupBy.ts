/**
 * Groups the elements of an iterable into an object,
 * keyed by the result of a provided callback function.
 *
 * @template T The type of the elements in the iterable.
 * @template K The type of the keys in the resulting object (must be a PropertyKey).
 * @param {Iterable<T>} items The iterable to group.
 * @param {(item: T, index: number) => K} callback A function to call on each element of the iterable.
 *                                                The return value of this function will be used as the key
 *                                                to group the element under.
 * @returns {Record<K, T[]>} An object where the keys are the values returned by the callback,
 *                            and the values are arrays containing the elements that correspond to
 *                            those keys.
 *
 * @example
 * const people = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 30 },
 *   { name: 'Charlie', age: 25 },
 * ];
 *
 * const groupedByAge = groupBy(people, person => person.age);
 * // groupedByAge will be:
 * // {
 * //   '25': [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
 * //   '30': [{ name: 'Bob', age: 30 }]
 * // }
 */
export function groupBy<T, K extends PropertyKey>(
  items: Iterable<T>,
  callback: (item: T, index: number) => K,
): Record<K, T[]> {
  const result: Record<K, T[]> = {} as Record<K, T[]>;
  let index = 0;
  for (const item of items) {
    const key = callback(item, index);
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      result[key].push(item);
    } else {
      result[key] = [item];
    }
    index++;
  }
  return result;
}
