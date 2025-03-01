/**
 * Converts keys of an object (and nested objects/arrays) from snake_case to camelCase.
 *
 * @param obj The object to convert keys in.
 * @returns A new object with keys converted to camelCase.
 */
export function camelcaseKeys<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    return obj; // Return primitives and null directly
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => camelcaseKeys(item)) as T; // Recursively process array items
  }

  const newObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = toCamelCase(key);
      newObj[camelCaseKey] = camelcaseKeys(obj[key]); // Recursive call for nested objects/arrays
    }
  }
  return newObj as T;
}

/**
 * Converts a snake_case string to camelCase.
 *
 * @param str The snake_case string.
 * @returns The camelCase string.
 */
export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}
