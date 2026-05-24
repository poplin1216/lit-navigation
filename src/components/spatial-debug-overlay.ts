import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { JsSpatialNavigationManager } from '../spatial-navigation/js-manager';

@customElement('spatial-debug-overlay')
export class SpatialDebugOverlay extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      /* default hidden, will be updated dynamically */
      display: none;
      transition: all 0.15s ease;
    }
    .box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 3px solid rgba(255, 50, 50, 0.8);
      background: rgba(255, 50, 50, 0.1);
      box-sizing: border-box;
      box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
    }
    .target-box {
      position: absolute;
      border: 2px dashed rgba(50, 100, 255, 0.8);
      background: rgba(50, 100, 255, 0.1);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(50, 100, 255, 0.9);
      font-weight: bold;
      font-size: 32px;
      text-shadow: 0px 0px 4px white;
      transition: all 0.15s ease;
    }
  `;

  @property({ type: Boolean }) enabled = false;

  @state() private currentRect: DOMRect | null = null;
  @state() private targets: { direction: string; rect: DOMRect }[] = [];

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('sn:focused', this.handleFocus);
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('resize', this.updateOverlay);
    window.addEventListener('scroll', this.updateOverlay, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('sn:focused', this.handleFocus);
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('resize', this.updateOverlay);
    window.removeEventListener('scroll', this.updateOverlay, true);
  }

  private handleKeydown = (e: KeyboardEvent) => {
    // Ctrl + Shift + D to toggle debug mode
    if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
      e.preventDefault();
      this.enabled = !this.enabled;
      if (this.enabled) {
        this.updateOverlay();
      } else {
        this.style.display = 'none';
      }
    }
  };

  private handleFocus = () => {
    if (this.enabled) {
      setTimeout(() => this.updateOverlay(), 0);
    }
  };

  private updateOverlay = () => {
    if (!this.enabled) {
      this.style.display = 'none';
      return;
    }

    let active = document.activeElement as HTMLElement | null;

    while (active && active.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement as HTMLElement;
    }

    if (!active || active === document.body) {
      this.currentRect = null;
      this.targets = [];
      this.style.display = 'none';
      return;
    }

    this.currentRect = active.getBoundingClientRect();

    // Set the host to perfectly match the current active element
    this.style.display = 'block';
    this.style.top = `${this.currentRect.top}px`;
    this.style.left = `${this.currentRect.left}px`;
    this.style.width = `${this.currentRect.width}px`;
    this.style.height = `${this.currentRect.height}px`;

    const dirs = ['up', 'down', 'left', 'right'] as const;
    this.targets = [];

    for (const dir of dirs) {
      const next = JsSpatialNavigationManager.getPredictNextTarget(dir, active);

      console.log(next, dir);
      if (next) {
        this.targets.push({
          direction: dir,
          rect: next.getBoundingClientRect(),
        });
      }
    }
  };

  render() {
    if (!this.enabled || !this.currentRect) return html``;

    return html`
      <div class="box"></div>

      ${this.targets.map(t => html`
        <div class="target-box" style="
          top: ${t.rect.top - this.currentRect!.top}px;
          left: ${t.rect.left - this.currentRect!.left}px;
          width: ${t.rect.width}px;
          height: ${t.rect.height}px;
        ">
          ${t.direction === 'up' ? '↑' : t.direction === 'down' ? '↓' : t.direction === 'left' ? '←' : '→'}
        </div>
      `)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spatial-debug-overlay': SpatialDebugOverlay;
  }
}
