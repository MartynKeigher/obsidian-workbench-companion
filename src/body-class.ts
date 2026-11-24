// Keeps at most one class from a set (every class starting with `prefix`) on an
// element, document.body by default. Features use one group each.
export class BodyClassGroup {
  constructor(
    private readonly prefix: string,
    private readonly el: HTMLElement = document.body,
  ) {}

  // Removes every class in the set, then adds `className` unless it's null.
  set(className: string | null): void {
    if (className !== null && !className.startsWith(this.prefix)) {
      throw new Error(`"${className}" does not start with "${this.prefix}"`);
    }
    const stale = [...this.el.classList].filter((c) => c.startsWith(this.prefix) && c !== className);
    this.el.classList.remove(...stale);
    if (className !== null) this.el.classList.add(className);
  }

  clear(): void {
    this.set(null);
  }
}
