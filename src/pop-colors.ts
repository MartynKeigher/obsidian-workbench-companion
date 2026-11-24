// The Pop color options. Ids only: the Workbench theme holds every colour value.
export type PopColorId =
  | 'none'
  | 'amber'
  | 'cobalt'
  | 'fuchsia'
  | 'lime'
  | 'raspberry'
  | 'signal-orange'
  | 'tomato'
  | 'ultraviolet';

export interface PopColor {
  id: PopColorId;
  name: string;
}

// None first, then the colours in alphabetical order. Keep new ones alphabetical.
export const POP_COLORS: readonly PopColor[] = [
  { id: 'none', name: 'None' },
  { id: 'amber', name: 'Amber' },
  { id: 'cobalt', name: 'Cobalt' },
  { id: 'fuchsia', name: 'Fuchsia' },
  { id: 'lime', name: 'Lime' },
  { id: 'raspberry', name: 'Raspberry' },
  { id: 'signal-orange', name: 'Signal Orange' },
  { id: 'tomato', name: 'Tomato' },
  { id: 'ultraviolet', name: 'Ultraviolet' },
];

export const POP_CLASS_PREFIX = 'wbc-pop-';

export function isPopColorId(value: unknown): value is PopColorId {
  return POP_COLORS.some((color) => color.id === value);
}

// The class the theme styles for this colour, or null for None.
export function popClassFor(id: PopColorId): string | null {
  return id === 'none' ? null : `${POP_CLASS_PREFIX}${id}`;
}
