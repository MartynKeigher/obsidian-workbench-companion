import { Setting } from 'obsidian';
import { BodyClassGroup } from '../body-class';
import type { Feature } from '../feature';
import { isPopColorId, POP_CLASS_PREFIX, POP_COLORS, popClassFor } from '../pop-colors';

// Pop color: puts wbc-pop-<id> on <body> (nothing for None). The Workbench theme
// turns that class into --wb-pop and colours links, tags, tasks and the rest.
export function createPopColorFeature(): Feature {
  const classes = new BodyClassGroup(POP_CLASS_PREFIX);

  return {
    id: 'pop-color',
    section: 'Appearance',

    load(ctx) {
      classes.set(popClassFor(ctx.settings.popColor));
    },

    unload() {
      classes.clear();
    },

    display(containerEl, ctx) {
      const setting = new Setting(containerEl)
        .setName('Pop color')
        .setDesc('The color that makes your notes pop: links, tags, ticked tasks, highlights and callouts.')
        .addDropdown((dropdown) => {
          for (const color of POP_COLORS) dropdown.addOption(color.id, color.name);
          dropdown.setValue(ctx.settings.popColor);
          dropdown.onChange(async (value) => {
            if (!isPopColorId(value)) return;
            ctx.settings.popColor = value;
            classes.set(popClassFor(value));
            await ctx.save();
          });
        });

      // An empty swatch the theme colours with the current pop.
      const swatch = document.createElement('span');
      swatch.className = 'wbc-pop-swatch';
      swatch.setAttribute('aria-hidden', 'true');
      setting.controlEl.prepend(swatch);
    },
  };
}
