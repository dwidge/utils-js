/**
 * Filters out duplicate elements from an array based on a predicate function.
 *
 * This function iterates through the input array and uses a predicate function
 * to determine a unique key for each element. It keeps track of the keys that
 * have already been encountered. Only elements with keys that have not been
 * seen before are included in the resulting array.
 *
 * @typeparam T The type of elements in the input array.
 * @typeparam U The type of the value returned by the predicate function (used for comparison).
 * @param array The input array to filter.
 * @param predicate A function that takes an element from the array as input
 *                  and returns a value (of type U) that will be used to determine
 *                  uniqueness.  If two elements produce the same value from this
 *                  predicate, they are considered duplicates based on this criteria.
 * @returns A new array containing only the unique elements from the input array,
 *          as determined by the predicate function. The order of elements in the
 *          result array is preserved from the original array.
 *
 * @example
 * // Filter duplicates based on the 'id' property of objects
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Charlie' }, // Duplicate id
 *   { id: 3, name: 'David' },
 *   { id: 2, name: 'Eve' },     // Duplicate id
 * ];
 * const uniqueUsers = filterDuplicatesBy(users, user => user.id);
 * // uniqueUsers will be:
 * // [
 * //   { id: 1, name: 'Alice' },
 * //   { id: 2, name: 'Bob' },
 * //   { id: 3, name: 'David' },
 * // ]
 *
 * @example
 * // Filter duplicates based on the string value itself in a string array
 * const names = ['apple', 'banana', 'apple', 'orange', 'banana'];
 * const uniqueNames = filterDuplicatesBy(names, name => name);
 * // uniqueNames will be:
 * // ['apple', 'banana', 'orange']
 *
 * @example
 * // Filter duplicates based on the first letter of each string (case-insensitive)
 * const words = ['Apple', 'Banana', 'apricot', 'blueberry', 'Cherry'];
 * const uniqueWordsByFirstLetter = filterDuplicatesBy(words, word => word.charAt(0).toLowerCase());
 * // uniqueWordsByFirstLetter will be:
 * // ['Apple', 'Banana', 'Cherry']
 */
export const filterDuplicatesBy = <T, U>(
  array: T[],
  predicate: (item: T) => U,
): T[] => {
  const seenValues = new Set<U>();
  const result: T[] = [];

  for (const item of array) {
    const keyValue = predicate(item);
    if (!seenValues.has(keyValue)) {
      seenValues.add(keyValue);
      result.push(item);
    }
  }

  return result;
};
