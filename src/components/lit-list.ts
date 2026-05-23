import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('lit-list')
export class LitList extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-height: 320px;
      overflow-y: auto;
      border-radius: 16px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      box-sizing: border-box;
      padding: 8px;
    }

    /* 프리미엄 커스텀 스크롤바 디자인 */
    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-list': LitList;
  }
}
