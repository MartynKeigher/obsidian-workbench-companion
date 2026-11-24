import { type App, type Plugin, PluginSettingTab, Setting } from 'obsidian';
import { type Feature, type FeatureContext, SECTIONS } from './feature';

// One heading per section that has features, then each feature's own settings.
export class CompanionSettingTab extends PluginSettingTab {
  constructor(
    app: App,
    plugin: Plugin,
    private readonly features: readonly Feature[],
    private readonly ctx: FeatureContext,
  ) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    for (const section of SECTIONS) {
      const inSection = this.features.filter((feature) => feature.section === section);
      if (inSection.length === 0) continue;
      new Setting(containerEl).setName(section).setHeading();
      for (const feature of inSection) feature.display(containerEl, this.ctx);
    }
  }
}
