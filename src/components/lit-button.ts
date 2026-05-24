import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-button')
export class LitButton extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  static styles = css`
    :host {
      display: inline-block;
      outline: none;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #ffffff;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
    }

    /* 포커스링 커스텀 스타일 (D-pad/Spatial Focus 상태 표현) */
    :host(:focus) button,
    :host(.is-spatial-focused) button {
      transform: scale(1.05);
      background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 1), 0 0 0 6px #6366f1, 0 10px 15px -3px rgba(79, 70, 229, 0.3);
    }

    button:active {
      transform: scale(0.98);
    }

    /* 비활성 상태 */
    :host([disabled]) button {
      background: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
      box-shadow: none;
      transform: none;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // 포커스 가능 속성을 호스트 요소에 부여
    if (!this.hasAttribute('tabindex') && !this.disabled) {
      this.setAttribute('tabindex', '0');
    }
  }

  // disabled 속성 변경 반영
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
      <button part="button" ?disabled=${this.disabled} tabindex="-1">
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-button': LitButton;
  }
}
