import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-list-item')
export class LitListItem extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  static styles = css`
    :host {
      display: block;
      outline: none;
      margin-bottom: 4px;
    }

    :host(:last-child) {
      margin-bottom: 0;
    }

    .item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-radius: 10px;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 14px;
      color: #334155;
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    /* 포커스 받았을 때의 프리미엄 디자인 피드백 */
    :host(:focus) .item,
    :host(.is-spatial-focused) .item {
      background: #f1f5f9;
      color: #4f46e5;
      font-weight: 600;
      box-shadow: inset 4px 0 0 #4f46e5;
      transform: translateX(4px);
    }

    /* 비활성 상태 */
    :host([disabled]) .item {
      color: #94a3b8;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex') && !this.disabled) {
      this.setAttribute('tabindex', '0');
    }
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    if (name === 'disabled') {
      if (this.disabled) {
        this.removeAttribute('tabindex');
      } else {
        this.setAttribute('tabindex', '0');
      }
    }
  }

  render() {
    return html`
      <div class="item">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-list-item': LitListItem;
  }
}
