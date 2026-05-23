import { getFocusableCandidates } from './candidates';
import { findNearest } from './geometry';
import type { Rect, Direction } from './geometry';
import * as _computeScrollIntoView from 'compute-scroll-into-view';

// 라이브러리 임포트 안전 확인 및 CJS/ESM 폴백 적용
let computeScrollIntoView: any = null;
try {
  // ESM/CJS interop를 보장하기 위해 기본 내보내기 속성을 검사합니다.
  const rawImport: any = _computeScrollIntoView;
  computeScrollIntoView = typeof rawImport === 'function'
    ? rawImport
    : rawImport?.default || (rawImport as any)?.computeScrollIntoView;
} catch (e) {
  console.warn('compute-scroll-into-view import failed, falling back to native scrollIntoView', e);
}

/**
 * Shadow DOM 경계를 관통하여 실제로 현재 포커스된 Leaf HTML 요소를 재귀적으로 탐색해 반환합니다.
 */
export function getActiveElement(root: Document | ShadowRoot = document): HTMLElement | null {
  let activeEl = root.activeElement as HTMLElement | null;
  if (!activeEl) return null;

  while (activeEl.shadowRoot && activeEl.shadowRoot.activeElement) {
    activeEl = activeEl.shadowRoot.activeElement as HTMLElement | null;
    if (!activeEl) break;
  }

  return activeEl;
}

export class SpatialNavigationManager {
  private static isListening = false;

  /**
   * 전역 공간 내비게이션 D-pad 리스너를 실행합니다.
   */
  public static start() {
    if (this.isListening) return;
    window.addEventListener('keydown', this.handleKeyDown, true);
    this.isListening = true;
  }

  /**
   * 전역 공간 내비게이션 D-pad 리스너를 중지합니다.
   */
  public static stop() {
    if (!this.isListening) return;
    window.removeEventListener('keydown', this.handleKeyDown, true);
    this.isListening = false;
  }

  private static handleKeyDown = (event: KeyboardEvent) => {
    const keys: Direction[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    const key = event.key as Direction;

    if (!keys.includes(key)) return;

    // 기본 동작 방지 (브라우저 기본 스크롤 등 차단)
    event.preventDefault();

    const activeEl = getActiveElement();
    
    // 브라우저에서 아무것도 포커싱되지 않은 기본 상태(document.body)는 포커스가 없는 것으로 간주합니다.
    const hasNoFocus = !activeEl || activeEl === document.body;
    
    const candidates = getFocusableCandidates();
    
    console.log(`[DEBUG] Key: ${key}, Active Element ID: ${activeEl?.id || 'body/none'}, HasNoFocus: ${hasNoFocus}, Candidates Count: ${candidates.length}`);

    // 1. 현재 포커스된 요소가 없다면, 모든 후보 중 최상단/최좌측에 있는 첫 번째 요소에 포커스
    if (hasNoFocus) {
      if (candidates.length > 0) {
        // y좌표가 작고, x좌표가 작은 순으로 정렬
        const sorted = [...candidates].sort((a, b) => {
          const rA = a.getBoundingClientRect();
          const rB = b.getBoundingClientRect();
          if (rA.top !== rB.top) return rA.top - rB.top;
          return rA.left - rB.left;
        });
        console.log(`[DEBUG] Focusing default first candidate: ${sorted[0].id}`);
        this.focusAndScroll(sorted[0]);
      }
      return;
    }

    // 2. 현재 포커스된 요소가 있을 때 거리 연산 수행
    const currentRect = activeEl!.getBoundingClientRect() as Rect;
    const candidatesWithRects = candidates
      .filter((el) => el !== activeEl)
      .map((el) => ({
        element: el,
        rect: el.getBoundingClientRect() as Rect,
      }));

    const nearest = findNearest(currentRect, candidatesWithRects, key);
    console.log(`[DEBUG] Nearest element for ${key}: ${nearest?.element?.id || 'none'}`);

    if (nearest) {
      this.focusAndScroll(nearest.element);
    }
  };

  /**
   * 특정 요소를 포커싱하고, 부모 스크롤 컨테이너들을 감지하여 화면 안으로 부드럽게 스크롤시킵니다.
   */
  private static focusAndScroll(element: HTMLElement) {
    console.log(`[DEBUG] focusAndScroll target: ${element.id}`);
    element.focus();

    try {
      if (typeof computeScrollIntoView === 'function') {
        const actions = computeScrollIntoView(element, {
          scrollMode: 'if-needed',
          block: 'nearest',
          inline: 'nearest',
        });

        actions.forEach(({ el, top, left }: { el: any; top: number; left: number }) => {
          if (typeof el.scrollTo === 'function') {
            el.scrollTo({ top, left, behavior: 'smooth' });
          } else {
            el.scrollTop = top;
            el.scrollLeft = left;
          }
        });
      } else {
        // computeScrollIntoView가 잡히지 않을 때의 네이티브 폴백 지원
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    } catch (e) {
      // 가상 환경 빌드 또는 미지원 시 예외 안전하게 처리
      console.warn('Scroll interaction error:', e);
    }
  }
}
