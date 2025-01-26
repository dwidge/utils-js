export function findUnique<T>(data: T[]): T[] {
  return [...new Set(data)];
}
