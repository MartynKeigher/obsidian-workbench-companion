import { describe, expect, it } from 'vitest';
import { isPopColorId, POP_COLORS, popClassFor } from '../src/pop-colors';

describe('pop colors', () => {
  it('lists None first, then the 8 colours alphabetically', () => {
    expect(POP_COLORS.map((c) => c.name)).toEqual([
      'None', 'Amber', 'Cobalt', 'Fuchsia', 'Lime', 'Raspberry', 'Signal Orange', 'Tomato', 'Ultraviolet',
    ]);
    expect(POP_COLORS.map((c) => c.id)).toEqual([
      'none', 'amber', 'cobalt', 'fuchsia', 'lime', 'raspberry', 'signal-orange', 'tomato', 'ultraviolet',
    ]);
  });

  it('maps an id to its body class, and None to no class', () => {
    expect(popClassFor('signal-orange')).toBe('wbc-pop-signal-orange');
    expect(popClassFor('none')).toBeNull();
  });

  it('recognises only known ids', () => {
    expect(isPopColorId('tomato')).toBe(true);
    for (const bad of ['Tomato', 'teal', '', null, undefined, 3, {}, 'toString']) {
      expect(isPopColorId(bad)).toBe(false);
    }
  });
});
