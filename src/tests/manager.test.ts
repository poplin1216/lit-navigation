import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { SpatialNavigationManager, getActiveElement } from '../spatial-navigation/manager';

describe('Spatial Navigation Manager', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    SpatialNavigationManager.start();
  });

  afterEach(() => {
    SpatialNavigationManager.stop();
    document.body.removeChild(container);
    document.body.innerHTML = '';
  });

  it('should focus the first candidate if no element is focused and ArrowDown is pressed', () => {
    container.innerHTML = `
      <button id="btn1">Button 1</button>
      <button id="btn2">Button 2</button>
    `;

    // 키보드 ArrowDown 이벤트 전송
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    window.dispatchEvent(event);

    const active = getActiveElement();
    expect(active?.id).toBe('btn1');
  });

  it('should move focus to the nearest element on keydown', () => {
    container.innerHTML = `
      <button id="btn1">Button 1</button>
      <button id="btn2">Button 2</button>
    `;
    const btn1 = document.getElementById('btn1') as HTMLButtonElement;
    const btn2 = document.getElementById('btn2') as HTMLButtonElement;

    // getBoundingClientRect 모킹 (btn1 아래에 btn2가 있도록 설계)
    btn1.getBoundingClientRect = () => ({
      left: 100, top: 100, right: 200, bottom: 200, width: 100, height: 100
    } as DOMRect);

    btn2.getBoundingClientRect = () => ({
      left: 100, top: 250, right: 200, bottom: 350, width: 100, height: 100
    } as DOMRect);

    // 먼저 btn1에 포커스
    btn1.focus();
    expect(getActiveElement()?.id).toBe('btn1');

    // ArrowDown 누름
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
    window.dispatchEvent(event);

    // 포커스가 btn2로 가야 함
    expect(getActiveElement()?.id).toBe('btn2');
  });
});
