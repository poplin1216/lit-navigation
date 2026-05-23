import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { InertManager } from '../inert/inert-manager';

@customElement('lit-modal')
export class LitModal extends LitElement {
  @property({ type: Boolean, reflect: true })
  open = false;

  static styles = css`
    :host {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    :host([open]) {
      display: flex;
    }

    .backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(8px);
      transition: all 0.3s ease;
    }

    .dialog {
      position: relative;
      background: #ffffff;
      border-radius: 20px;
      padding: 32px;
      width: 90%;
      max-width: 480px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(226, 232, 240, 0.8);
      z-index: 10000;
      transform: scale(0.95);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    :host([open]) .dialog {
      transform: scale(1);
      opacity: 1;
    }
  `;

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        InertManager.push(this);
      } else {
        // 이전에 열려 있던 상태에서 닫히는 경우에만 팝 처리
        if (changedProperties.get('open') === true) {
          InertManager.pop();
        }
      }
    }
  }

  disconnectedCallback() {
    if (this.open) {
      InertManager.pop();
    }
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class="backdrop" @click=${() => this.open = false}></div>
      <div class="dialog">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-modal': LitModal;
  }
}
