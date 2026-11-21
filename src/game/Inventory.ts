/**
 * Inventory — minimal session-only item store for the demo.
 * Not persisted between page reloads. No economy or crafting.
 */

export interface InventoryItem {
  key: string;
  displayName: string;
  count: number;
}

export class Inventory {
  private readonly items = new Map<string, InventoryItem>();

  /** Display names for known item keys. */
  private static readonly NAMES: Record<string, string> = {
    'fish-common': 'Cá thường',
    'fish-rare':   'Cá hiếm',
  };

  add(key: string, count = 1): void {
    const existing = this.items.get(key);
    if (existing) {
      existing.count += count;
    } else {
      this.items.set(key, {
        key,
        displayName: Inventory.NAMES[key] ?? key,
        count,
      });
    }
  }

  getAll(): InventoryItem[] {
    return [...this.items.values()];
  }

  getCount(key: string): number {
    return this.items.get(key)?.count ?? 0;
  }

  get totalItems(): number {
    let n = 0;
    this.items.forEach(i => { n += i.count; });
    return n;
  }
}
