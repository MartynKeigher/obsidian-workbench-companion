import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS, mergeSettings } from '../src/settings';

describe('mergeSettings', () => {
  it('returns the defaults for a fresh install', () => {
    for (const saved of [undefined, null, 'x', 42, []]) {
      expect(mergeSettings(saved)).toEqual({ popColor: 'none' });
    }
  });

  it('keeps a saved pop color', () => {
    expect(mergeSettings({ popColor: 'lime' }).popColor).toBe('lime');
  });

  it('gives older settings without popColor the default and keeps their other keys', () => {
    expect(mergeSettings({ futureThing: true })).toEqual({ popColor: 'none', futureThing: true });
  });

  it('resets an unknown pop color to None and keeps other keys', () => {
    expect(mergeSettings({ popColor: 'teal', other: 1 })).toEqual({ popColor: 'none', other: 1 });
  });

  it('never hands back the defaults object itself', () => {
    const merged = mergeSettings(undefined);
    merged.popColor = 'amber';
    expect(DEFAULT_SETTINGS.popColor).toBe('none');
  });
});
