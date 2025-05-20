export type NavItem = { id: string; label: string };

export const defaultNav: NavItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: `item-${i + 1}`,
  label: `Item ${i + 1}`,
}));
