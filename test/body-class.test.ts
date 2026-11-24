import { beforeEach, describe, expect, it } from 'vitest';
import { BodyClassGroup } from '../src/body-class';

const popClasses = () => [...document.body.classList].filter((c) => c.startsWith('wbc-pop-'));

describe('BodyClassGroup', () => {
  let g: BodyClassGroup;

  beforeEach(() => {
    document.body.className = 'theme-light';
    g = new BodyClassGroup('wbc-pop-');
  });

  it('adds one class', () => {
    g.set('wbc-pop-amber');
    expect(popClasses()).toEqual(['wbc-pop-amber']);
  });

  it('swaps rather than stacks', () => {
    g.set('wbc-pop-amber');
    g.set('wbc-pop-tomato');
    expect(popClasses()).toEqual(['wbc-pop-tomato']);
  });

  it('adds nothing for null (None)', () => {
    g.set('wbc-pop-amber');
    g.set(null);
    expect(popClasses()).toEqual([]);
  });

  it('removes a stray class left by something else', () => {
    document.body.classList.add('wbc-pop-old', 'wbc-pop-lime');
    g.set('wbc-pop-cobalt');
    expect(popClasses()).toEqual(['wbc-pop-cobalt']);
  });

  it('leaves other classes alone', () => {
    g.set('wbc-pop-lime');
    g.clear();
    expect(document.body.className).toBe('theme-light');
  });

  it('rejects a class outside its prefix', () => {
    expect(() => g.set('theme-dark')).toThrow();
  });

  it('works on an element other than body', () => {
    const el = document.createElement('div');
    new BodyClassGroup('wbc-x-', el).set('wbc-x-on');
    expect(el.className).toBe('wbc-x-on');
  });
});
