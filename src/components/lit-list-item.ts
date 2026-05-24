import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-list-item')
export class LitListItem extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  static styles = css`
    :host {
      display: block;
      position: relative;
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

    /* 슬롯된 a11y 요소나 내부 fallback 요소가 포커스를 받을 때의 디자인 피드백 */
    :host(:focus-within) .item,
    :host(.is-spatial-focused) .item {
      background: #f1f5f9;
      color: #4f46e5;
      font-weight: 600;
      box-shadow: inset 4px 0 0 #4f46e5;
      transform: translateX(4px);
    }

    /* 포커스 아웃라인 제거 (내부 요소에 기본 포커스가 생기지 않도록) */
    [tabindex]:focus {
      outline: none;
    }

    /* 비활성 상태 */
    :host([disabled]) .item {
      color: #94a3b8;
      cursor: not-allowed;
      pointer-events: none;
    }
  `;

  @property({ type: String })
  private _contentLabel = '';

  private _a11yDiv: HTMLDivElement | null = null;

  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    // slot="a11y" 요소는 텍스트 추출에서 제외
    const nodes = slot.assignedNodes({ flatten: true }).filter(n => (n as HTMLElement).getAttribute?.('slot') !== 'a11y');
    const text = nodes.map(n => n.textContent || '').join('').trim();
    if (text !== this._contentLabel) {
      this._contentLabel = text;
      this._updateA11yDiv();
    }
  }

  private _updateA11yDiv() {
    if (!this._a11yDiv) {
      this._a11yDiv = document.createElement('div');
      this._a11yDiv.setAttribute('slot', 'a11y');
      // 외형적으로 공간을 차지하지 않도록 스타일 추가
      this._a11yDiv.style.position = 'absolute';
      this._a11yDiv.style.width = '100%';
      this._a11yDiv.style.height = '100%';
      this._a11yDiv.style.top = '0';
      this._a11yDiv.style.left = '0';
      this._a11yDiv.style.outline = 'none';
      this.appendChild(this._a11yDiv);
    }
    this._a11yDiv.setAttribute('aria-label', this._contentLabel);
    this._a11yDiv.setAttribute('tabindex', this.disabled ? '-1' : '0');
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      this._updateA11yDiv();
    }
  }

  render() {
    return html`
      <slot name="a11y"></slot>
      <div class="item">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-list-item': LitListItem;
  }
}
