import type { WorkbenchSettings } from './settings';

// Settings tab headings, in the order they appear. A feature names one of these;
// headings with no features are left out. Add new ones here as features arrive.
export const SECTIONS = ['Appearance'] as const;

export type SectionName = (typeof SECTIONS)[number];

export interface FeatureContext {
  settings: WorkbenchSettings;
  save(): Promise<void>;
}

// One plugin feature: its settings control, and what it does on load and unload.
export interface Feature {
  id: string;
  section: SectionName;
  load(ctx: FeatureContext): void;
  unload(): void;
  display(containerEl: HTMLElement, ctx: FeatureContext): void;
}
