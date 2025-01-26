export function findDuplicates<T>(data: T[]): T[] {
  const counts = new Map<T, number>();
  const duplicates: T[] = [];

  for (const item of data) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }

  for (const [item, count] of counts.entries()) {
    if (count > 1) {
      duplicates.push(item);
    }
  }

  return duplicates;
}
