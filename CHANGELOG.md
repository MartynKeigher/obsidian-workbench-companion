# Changelog

All notable changes to Workbench Companion are listed here, newest first.

## [0.1.0] - 2026-11-24

### Added
- First version of Workbench Companion, a plugin that adds settings for the [Workbench](https://github.com/MartynKeigher/obsidian-workbench) theme.
- **Pop color** setting under **Settings → Community plugins → Workbench Companion → Appearance**. Choose None, Amber, Cobalt, Fuchsia, Lime, Raspberry, Signal Orange, Tomato or Ultraviolet. Each color has a light and a dark shade.
- The pop color goes on links, the active file in the file list, tags, ticked task checkboxes, highlights, default callouts, the line under the note title and the Sync icon in the status bar.
- **None** is the default and leaves Workbench looking exactly as it does without the plugin.
- Settings are saved with defaults filled in on load, so older or missing settings never break the plugin.
- The plugin only adds a class to `<body>` (such as `wbc-pop-tomato`); every color lives in the theme.
