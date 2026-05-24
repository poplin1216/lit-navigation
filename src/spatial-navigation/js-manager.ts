import * as _computeScrollIntoView from 'compute-scroll-into-view';
// @ts-ignore
import SpatialNavigation from 'spatial-navigation-js';

// CJS/ESM 호환성 처리 (기존 manager.ts와 동일)
let computeScrollIntoView: any = null;
try {
  const rawImport: any = _computeScrollIntoView;
  computeScrollIntoView = typeof rawImport === 'function'
    ? rawImport
    : rawImport?.default || (rawImport as any)?.computeScrollIntoView;
} catch (e) {
  console.warn('compute-scroll-into-view import failed, falling back to native scrollIntoView', e);
}

export class JsSpatialNavigationManager {
  private static isListening = false;

  public static start() {
    if (this.isListening) return;

    // spatial-navigation-js 초기화
    SpatialNavigation.init();

    // 포커스 대상 지정: tabindex="0"을 가진 모든 요소
    // inert 속성이 부여된 요소와 그 하위 요소는 포커스 대상에서 제외합니다.
    SpatialNavigation.add({
      selector: '[tabindex="0"]',
      navigableFilter: (element: HTMLElement) => {
        return !element.closest('[inert]');
      }
    });

    // 기본적으로 DOM에 있는 엘리먼트들을 포커스 가능 상태로 만듦
    SpatialNavigation.makeFocusable();

    // 부드러운 스크롤을 위해 커스텀 포커스 완료 이벤트 리스닝
    window.addEventListener('sn:focused', this.handleFocused as EventListener);

    this.isListening = true;
  }

  public static stop() {
    if (!this.isListening) return;

    // spatial-navigation-js 이벤트 리스너 등 초기화 해제
    SpatialNavigation.uninit();

    window.removeEventListener('sn:focused', this.handleFocused as EventListener);

    this.isListening = false;
  }

  public static getPredictNextTarget(direction: 'up' | 'down' | 'left' | 'right', currentElement?: HTMLElement): HTMLElement | null {
    console.log('[DEBUG] SpatialNavigation.findNextTarget type:', typeof (SpatialNavigation as any).findNextTarget);
    if (typeof (SpatialNavigation as any).findNextTarget === 'function') {
      return (SpatialNavigation as any).findNextTarget(direction, { target: currentElement });
    }
    return null;
  }

  private static handleFocused = (event: CustomEvent) => {
    // 포커스된 엘리먼트를 찾음 (event.target 이 포커스된 요소임)
    const element = event.target as HTMLElement;
    if (!element) return;

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
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    } catch (e) {
      console.warn('Scroll interaction error:', e);
    }
  };
}
