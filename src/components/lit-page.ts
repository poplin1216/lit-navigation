import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { InertManager } from '../inert/inert-manager';

@customElement('lit-page')
export class LitPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
      background-color: #f8fafc;
      color: #0f172a;
      box-sizing: border-box;
      padding: 24px;
      transition: opacity 0.3s ease, filter 0.3s ease;
    }

    /* 뒷배경으로 깔려 inert화 되었을 때의 흐릿한 시각적 효과 피드백 */
    :host([inert]) {
      opacity: 0.6;
      filter: grayscale(40%) blur(1px);
      pointer-events: none;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // 스택에 자기 자신을 푸시하여 비활성 화면들 잠금 처리
    InertManager.push(this);
  }

  disconnectedCallback() {
    // 화면 이탈 시 스택에서 팝 처리하여 이전 화면 복구
    InertManager.pop();
    super.disconnectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-page': LitPage;
  }
}
