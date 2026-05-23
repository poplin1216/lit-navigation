import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { InertManager } from '../inert/inert-manager';

// 컴포넌트 임포트 (자동 등록)
import '../components/lit-button';
import '../components/lit-page';
import '../components/lit-modal';
import '../components/lit-list';
import '../components/lit-list-item';

describe('Lit Custom Elements Integration', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    InertManager.reset();
  });

  afterEach(() => {
    document.body.removeChild(container);
    document.body.innerHTML = '';
  });

  it('should render <lit-button> and make it focusable', async () => {
    container.innerHTML = `<lit-button id="btn">Click me</lit-button>`;
    const btn = container.querySelector('lit-button') as any;
    
    // Lit 비동기 렌더링 대기
    await btn.updateComplete;

    expect(btn).not.toBeNull();
    // Shadow DOM 내부의 버튼이 실제로 존재하는지 검증
    const innerButton = btn.shadowRoot.querySelector('button');
    expect(innerButton).not.toBeNull();

    // 포커스 가능 상태 검증
    expect(btn.getAttribute('tabindex')).toBe('0');
  });

  it('should push <lit-page> to InertManager on connection', async () => {
    container.innerHTML = `
      <lit-page id="page-1">Page 1</lit-page>
      <lit-page id="page-2">Page 2</lit-page>
    `;
    const page1 = document.getElementById('page-1') as any;
    const page2 = document.getElementById('page-2') as any;

    await Promise.all([page1.updateComplete, page2.updateComplete]);

    const stack = InertManager.getStack();
    expect(stack.length).toBe(2);
    expect(stack[0]).toBe(page1);
    expect(stack[1]).toBe(page2);

    // page1은 스택 밑이므로 inert 활성화
    expect(page1.inert).toBe(true);
    // page2는 스택 최상단이므로 inert 비활성화
    expect(page2.inert).toBe(false);
  });

  it('should manage <lit-modal> toggle and inert stacking correctly', async () => {
    container.innerHTML = `
      <lit-page id="page-main">Main Page</lit-page>
      <lit-modal id="modal-test">Modal Content</lit-modal>
    `;
    const page = document.getElementById('page-main') as any;
    const modal = document.getElementById('modal-test') as any;

    await Promise.all([page.updateComplete, modal.updateComplete]);

    // 모달이 닫힌 상태 (기본값)
    expect(modal.open).toBe(false);
    expect(page.inert).toBe(false); // 페이지 활성화 상태

    // 모달 열기
    modal.open = true;
    await modal.updateComplete;

    // 모달이 스택에 푸시되어 페이지가 inert가 됨
    expect(page.inert).toBe(true);
    expect(InertManager.getStack().length).toBe(2);

    // 모달 닫기
    modal.open = false;
    await modal.updateComplete;

    // 모달이 팝되고 페이지 활성화 복구
    expect(page.inert).toBe(false);
    expect(InertManager.getStack().length).toBe(1);
  });
});
