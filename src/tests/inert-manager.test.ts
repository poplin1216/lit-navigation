import { describe, it, expect, beforeEach } from 'vitest';
import { InertManager } from '../inert/inert-manager';

describe('Inert Manager Stacking System', () => {
  let screen1: HTMLDivElement;
  let screen2: HTMLDivElement;
  let screen3: HTMLDivElement;

  beforeEach(() => {
    // 임시 엘리먼트 풀 구성
    screen1 = document.createElement('div');
    screen2 = document.createElement('div');
    screen3 = document.createElement('div');
    
    screen1.id = 'screen-1';
    screen2.id = 'screen-2';
    screen3.id = 'screen-3';

    document.body.appendChild(screen1);
    document.body.appendChild(screen2);
    document.body.appendChild(screen3);

    // 스택 강제 리셋
    InertManager.reset();
  });

  it('should push a screen and keep it active (not inert)', () => {
    InertManager.push(screen1);
    
    expect(screen1.inert).toBe(false);
    expect(screen1.hasAttribute('inert')).toBe(false);
  });

  it('should mark the previous screen as inert when a new one is pushed', () => {
    InertManager.push(screen1);
    InertManager.push(screen2);

    // screen2는 최상위 활성 상태이므로 inert가 아님
    expect(screen2.inert).toBe(false);
    
    // screen1은 스택 밑으로 내려갔으므로 inert여야 함
    expect(screen1.inert).toBe(true);
    expect(screen1.hasAttribute('inert')).toBe(true);
  });

  it('should restore the previous screen to active (not inert) when the top screen is popped', () => {
    InertManager.push(screen1);
    InertManager.push(screen2);
    InertManager.push(screen3);

    expect(screen1.inert).toBe(true);
    expect(screen2.inert).toBe(true);
    expect(screen3.inert).toBe(false);

    // screen3 팝(제거)
    const popped = InertManager.pop();
    expect(popped).toBe(screen3);

    // screen3은 팝되었으므로 비활성화(inert) 처리
    expect(screen3.inert).toBe(true);

    // screen2가 다시 최상위 활성이 되므로 inert 해제되어야 함
    expect(screen2.inert).toBe(false);
    expect(screen1.inert).toBe(true); // screen1은 여전히 밑에 있으므로 inert 유지
  });
});
