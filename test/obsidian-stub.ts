// Stand-ins for the parts of the Obsidian API the tests touch. Each Setting
// records what it was given so tests can check the copy and drive its dropdown.

export class Plugin {}

export class PluginSettingTab {
  containerEl = document.createElement('div');
}

export class DropdownStub {
  options: { value: string; label: string }[] = [];
  value = '';
  selectEl = document.createElement('select');
  private handler: ((value: string) => unknown) | null = null;

  addOption(value: string, label: string): this {
    this.options.push({ value, label });
    return this;
  }

  setValue(value: string): this {
    this.value = value;
    return this;
  }

  onChange(handler: (value: string) => unknown): this {
    this.handler = handler;
    return this;
  }

  async change(value: string): Promise<void> {
    this.value = value;
    await this.handler?.(value);
  }
}

export const settingInstances: Setting[] = [];

export class Setting {
  settingEl = document.createElement('div');
  controlEl = document.createElement('div');
  name = '';
  desc = '';
  heading = false;
  dropdown: DropdownStub | null = null;

  constructor(containerEl: HTMLElement) {
    this.settingEl.appendChild(this.controlEl);
    containerEl.appendChild(this.settingEl);
    settingInstances.push(this);
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setDesc(desc: string): this {
    this.desc = desc;
    return this;
  }

  setHeading(): this {
    this.heading = true;
    return this;
  }

  addDropdown(cb: (dropdown: DropdownStub) => unknown): this {
    this.dropdown = new DropdownStub();
    this.controlEl.appendChild(this.dropdown.selectEl);
    cb(this.dropdown);
    return this;
  }
}
