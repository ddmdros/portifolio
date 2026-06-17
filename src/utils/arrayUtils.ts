/**
 * Return a new array with the item at `index` updated with `updates`.
 */
export function updateItemAtIndex<T>(list: T[], index: number, updates: Partial<T> | ((item: T) => T)): T[] {
  return list.map((item, idx) => {
    if (idx !== index) return item;
    if (typeof updates === "function") {
      return (updates as (item: T) => T)(item);
    }
    return { ...item, ...updates };
  });
}
