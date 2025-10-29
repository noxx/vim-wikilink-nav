# Vim Wikilink Suggest Navigation

Vim-style **Ctrl+N / Ctrl+P** to navigate the **inline wikilink** suggestion popup (`[[ ... ]]`).  
**Enter** or **Ctrl+Enter** accepts the highlighted suggestion.  
Blocks global hotkeys (e.g., “New note”) **only while** the popup is open. Desktop-only. Vim-safe.

## Features
- Ctrl+N / Ctrl+P: move selection in the wikilink suggest list
- Enter / Ctrl+Enter: accept selection
- Works with Vim mode ON or OFF
- No settings, tiny footprint

## Scope
- **Inline wikilink suggestions only** (`[[ ... ]]`)
- Does **not** affect Quick Switcher, Command Palette, or tag `#` suggestions

## Install
- From Community Plugins (after approval), or
- Manual: copy `manifest.json` + `main.js` into `.obsidian/plugins/vim-wikilink-nav/` and enable

## Compatibility
- Obsidian ≥ **1.4.0**
- Windows/Linux (desktop). macOS works if you map Ctrl keys; Cmd support could be added later.

## Notes
- Relies on `.suggestion-container` / `.suggestion-item`. If Obsidian changes these, update the selectors.

## License
MIT © noxx