// declare global {
//   interface ObjectConstructor {
//     groupBy<T, K extends PropertyKey>(
//       items: Iterable<T>,
//       callback: (item: T, index: number) => K,
//     ): Record<K, T[]>;
//   }
// }

import { groupBy } from "./groupBy.js";

if (!Object.groupBy) {
  Object.defineProperty(Object, "groupBy", {
    value: groupBy,
    writable: true,
    configurable: true,
  });
}
