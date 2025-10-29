const { Plugin, Scope } = require('obsidian');

module.exports = class CtrlNPSuggestNav extends Plugin {
  onload() {
    this._scope = null;
    this._onKeyDown = (e) => this._handle(e);
    window.addEventListener('keydown', this._onKeyDown, true);
  }
  onunload() {
    window.removeEventListener('keydown', this._onKeyDown, true);
    this._popScope();
  }

  _getPopup() {
    const nodes = document.querySelectorAll('.suggestion-container');
    for (const el of nodes) {
      if (el.closest('.modal-container')) continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0' || cs.pointerEvents === 'none') continue;
      const r = el.getBoundingClientRect();
      if (!r || r.width <= 0 || r.height <= 0) continue;
      if (!el.querySelector('.suggestion-item')) continue;
      return el;
    }
    return null;
  }
  _isEditorEvent(e) {
    const t = e.target;
    return !!(t && (t.closest?.('.cm-editor') || t.classList?.contains('cm-content')));
  }
  _handle(e) {
    const popup = this._getPopup();
    this._syncScope(!!popup);
    if (!popup || !this._isEditorEvent(e)) return;

    const key = (e.key || '').toLowerCase();
    const ctrlOnly = e.ctrlKey && !e.metaKey && !e.altKey;

    // Enter (plain or Ctrl) accepts
    if (key === 'enter' && (!e.ctrlKey || ctrlOnly)) {
      e.preventDefault(); e.stopImmediatePropagation(); e.stopPropagation();
      return this._accept(popup);
    }

    // Ctrl+N / Ctrl+P navigate
    if (ctrlOnly && (key === 'n' || key === 'p')) {
      e.preventDefault(); e.stopImmediatePropagation(); e.stopPropagation();
      return this._move(popup, key === 'n' ? +1 : -1);
    }
  }

  _move(container, dir) {
    const items = Array.from(container.querySelectorAll('.suggestion-item'));
    if (!items.length) return;
    let i = items.findIndex(x => x.classList.contains('is-selected'));
    if (i === -1) i = dir > 0 ? -1 : 0;
    let next = i + dir;
    if (next < 0) next = items.length - 1;
    if (next >= items.length) next = 0;
    const el = items[next], r = el.getBoundingClientRect();
    const ev = { bubbles: true, cancelable: false, clientX: r.left + 2, clientY: r.top + 2 };
    el.dispatchEvent(new MouseEvent('mouseover', ev));
    el.dispatchEvent(new MouseEvent('mousemove', ev));
    el.scrollIntoView({ block: 'nearest' });
  }

  _accept(container) {
    const el = container.querySelector('.suggestion-item.is-selected') || container.querySelector('.suggestion-item');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const ev = { bubbles: true, cancelable: true, clientX: r.left + 4, clientY: r.top + 4 };
    el.dispatchEvent(new MouseEvent('mousedown', ev));
    el.dispatchEvent(new MouseEvent('mouseup', ev));
    el.dispatchEvent(new MouseEvent('click', ev));
  }

  _syncScope(visible) {
    if (visible && !this._scope) {
      const s = new Scope(this.app.scope);
      s.register(['Ctrl'], 'N', () => true);
      s.register(['Ctrl'], 'P', () => true);
      s.register(['Ctrl'], 'Enter', () => true);
      this.app.keymap.pushScope(s);
      this._scope = s;
    } else if (!visible && this._scope) {
      this._popScope();
    }
  }
  _popScope() {
    if (!this._scope) return;
    this.app.keymap.popScope(this._scope);
    this._scope = null;
  }
};
