/**
 * Sorts items to handle dependencies within a batch.
 * An item is considered dependent on another if one of its properties (except 'id')
 * matches the 'id' of another item in the array.
 * This is a topological sort to ensure parents are processed before children,
 * helping to prevent not found errors with self-references in the same batch.
 * @param items The array of items to sort.
 * @returns A new array of sorted items.
 */
export const topologicalSortItems = <D extends { id?: any }>(
  items: D[],
): D[] => {
  if (items.length <= 1) {
    return items;
  }

  const itemsById = new Map<any, D>();
  for (const item of items) {
    if (item.id != null) {
      itemsById.set(item.id, item);
    }
  }

  const adj = new Map<D, D[]>();
  const inDegree = new Map<D, number>();

  for (const item of items) {
    adj.set(item, []);
    inDegree.set(item, 0);
  }

  for (const item of items) {
    for (const [key, value] of Object.entries(item)) {
      if (key !== "id" && value != null && itemsById.has(value)) {
        const parent = itemsById.get(value)!;
        if (parent === item) continue; // self-reference is not a dependency for sorting
        // item depends on parent. parent -> item
        adj.get(parent)!.push(item);
        inDegree.set(item, (inDegree.get(item) || 0) + 1);
      }
    }
  }

  const queue: D[] = [];
  for (const item of items) {
    if (inDegree.get(item) === 0) {
      queue.push(item);
    }
  }

  const sorted: D[] = [];
  while (queue.length > 0) {
    const u = queue.shift()!;
    sorted.push(u);

    for (const v of adj.get(u)!) {
      inDegree.set(v, inDegree.get(v)! - 1);
      if (inDegree.get(v) === 0) {
        queue.push(v);
      }
    }
  }

  if (sorted.length !== items.length) {
    console.warn(
      "topologicalSortItemsW1: Cycle detected in item dependencies, cannot sort topologically. Some items may fail to insert due to foreign key constraints.",
    );
    const unsorted = items.filter((item) => !sorted.includes(item));
    return [...sorted, ...unsorted];
  }

  return sorted;
};
