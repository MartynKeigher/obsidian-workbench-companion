import { beforeEach, describe, expect, it, vi } from 'vitest';
import { settingInstances } from 'obsidian';
import type { FeatureContext } from '../src/feature';
import { createPopColorFeature } from '../src/features/pop-color';
import { POP_COLORS, type PopColorId } from '../src/pop-colors';

const popClasses = () => [...document.body.classList].filter((c) => c.startsWith('wbc-pop-'));
const ctx = (popColor: PopColorId): FeatureContext => ({ settings: { popColor }, save: vi.fn(async () => {}) });
const lastSetting = () => settingInstances[settingInstances.length - 1];

describe('Pop color feature', () => {
  let feature: ReturnType<typeof createPopColorFeature>;
  let el: HTMLElement;

  beforeEach(() => {
    document.body.className = 'theme-dark';
    settingInstances.length = 0;
    feature = createPopColorFeature();
    el = document.createElement('div');
  });

  it('sits under Appearance', () => {
    expect(feature.section).toBe('Appearance');
  });

  it('puts the saved colour on body at load', () => {
    feature.load(ctx('tomato'));
    expect(popClasses()).toEqual(['wbc-pop-tomato']);
  });

  it('adds no class for None', () => {
    feature.load(ctx('none'));
    expect(popClasses()).toEqual([]);
  });

  it('removes its class on unload and leaves the rest of body alone', () => {
    feature.load(ctx('lime'));
    feature.unload();
    expect(document.body.className).toBe('theme-dark');
  });

  it('shows the setting with exact copy and 9 options in order', () => {
    feature.display(el, ctx('none'));
    const s = lastSetting();
    expect(s.name).toBe('Pop color');
    expect(s.desc).toBe('The color that makes your notes pop: links, tags, ticked tasks, highlights and callouts.');
    expect(s.dropdown?.options.map((o) => o.label)).toEqual(POP_COLORS.map((c) => c.name));
    expect(s.dropdown?.options.map((o) => o.value)).toEqual(POP_COLORS.map((c) => c.id));
    expect(el.querySelector('.wbc-pop-swatch')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('starts the dropdown on the saved colour', () => {
    feature.display(el, ctx('fuchsia'));
    expect(lastSetting().dropdown?.value).toBe('fuchsia');
  });

  it('applies and saves a change at once', async () => {
    const c = ctx('none');
    feature.load(c);
    feature.display(el, c);
    await lastSetting().dropdown?.change('cobalt');
    expect(popClasses()).toEqual(['wbc-pop-cobalt']);
    expect(c.settings.popColor).toBe('cobalt');
    expect(c.save).toHaveBeenCalledTimes(1);
  });

  it('going back to None removes the class', async () => {
    const c = ctx('amber');
    feature.load(c);
    feature.display(el, c);
    await lastSetting().dropdown?.change('none');
    expect(popClasses()).toEqual([]);
    expect(c.settings.popColor).toBe('none');
  });

  it('ignores a value that is not a pop color', async () => {
    const c = ctx('amber');
    feature.load(c);
    feature.display(el, c);
    await lastSetting().dropdown?.change('teal');
    expect(popClasses()).toEqual(['wbc-pop-amber']);
    expect(c.save).not.toHaveBeenCalled();
  });
});
