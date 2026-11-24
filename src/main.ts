import { Plugin } from 'obsidian';
import type { Feature, FeatureContext } from './feature';
import { createFeatures } from './features';
import { CompanionSettingTab } from './settings-tab';
import { mergeSettings, type WorkbenchSettings } from './settings';

export default class WorkbenchCompanion extends Plugin {
  settings!: WorkbenchSettings;
  private features: Feature[] = [];

  async onload(): Promise<void> {
    this.settings = mergeSettings(await this.loadData());
    const ctx: FeatureContext = {
      settings: this.settings,
      save: () => this.saveData(this.settings),
    };

    this.features = createFeatures();
    for (const feature of this.features) feature.load(ctx);
    this.addSettingTab(new CompanionSettingTab(this.app, this, this.features, ctx));
  }

  onunload(): void {
    for (const feature of this.features) feature.unload();
  }
}
