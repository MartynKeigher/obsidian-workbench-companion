# Workbench Companion

An Obsidian plugin that goes alongside the [Workbench](https://github.com/MartynKeigher/obsidian-workbench) theme. It adds settings for the theme, starting with a pop color for links, tags, ticked tasks, highlights and callouts.

## Needs the Workbench theme

The plugin only switches classes on and off. Every colour and style lives in the Workbench theme, so with another theme the settings do nothing. With the plugin disabled or uninstalled, Workbench looks exactly as it always has.

## Settings

Open **Settings → Community plugins → Workbench Companion**.

### Appearance

**Pop color.** The color that makes your notes pop. Choose None, Amber, Cobalt, Fuchsia, Lime, Raspberry, Signal Orange, Tomato or Ultraviolet. Each has a shade for light mode and one for dark, and switches with the mode.

The pop goes on:

- internal and external links
- the active file in the file list
- tags
- ticked task checkboxes
- highlights
- default callouts
- the line under the note title
- the Sync icon in the status bar

Headings, body text, panes, buttons, toggles and text selection keep Workbench's own colours, or your Obsidian accent colour if you've set one. **None** leaves Workbench exactly as it looks without the plugin, and is the default.

## How it works

Each setting adds one class to `<body>`, such as `wbc-pop-tomato`, or none at all. The theme styles those classes. The plugin holds no colours, so the theme can retune a shade without a plugin update.

## Development

```powershell
npm install
npm run dev     # rebuilds main.js on every change
npm test        # unit tests
npm run build   # type check and production build
```

To try it in a vault without copying files, link the vault's plugin folder to this one, then enable **Workbench Companion** under Community plugins:

```powershell
New-Item -ItemType Junction -Path "<your vault>\.obsidian\plugins\workbench-companion" -Target "<this folder>"
```

## License

MIT
