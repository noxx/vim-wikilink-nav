# vim-wikilink-nav

Obsidian plugin. When the `[[ wikilink ]]` suggestion popup is open, Ctrl+N and Ctrl+P move the selection, and Enter or Ctrl+Enter accepts it. Same idea as scrolling completions in vim.

Scope is intentionally narrow. It only touches the wikilink popup. Quick Switcher, Command Palette, tag suggestions are untouched.

## Why

Obsidian's wikilink popup uses arrow keys. I use vim mode in Obsidian. Reaching for arrows every time I typed `[[` got old fast. Couldn't find an existing plugin that did just this without trying to remap the whole app, so I wrote it.

## Install

If it's been approved into the Community Plugins list, install it from there.

Otherwise, copy `manifest.json` and `main.js` into `.obsidian/plugins/vim-wikilink-nav/` and enable the plugin in Settings.

## Notes

- Desktop only (Windows / Linux). I don't have a Mac to test Cmd bindings. PR welcome if you do.
- Requires Obsidian 1.4.0 or newer.
- Global Ctrl+N (New note) is suppressed while the popup is open and restored when it closes. If a new note appears when you didn't ask for one, that's a bug, please open an issue.
- The plugin works by reading `.suggestion-container` / `.suggestion-item` DOM classes. If Obsidian changes these in a future version it will silently break. Fix is a one-line selector swap.

## License

MIT
