export class InertManager {
  private static stack: HTMLElement[] = [];

  /**
   * 새로운 스크린/모달을 스택에 추가하고 활성화합니다.
   * 기존 하위 스택은 모두 inert 속성을 부여하여 차단합니다.
   */
  public static push(element: HTMLElement) {
    if (this.stack.length > 0) {
      const prev = this.stack[this.stack.length - 1];
      prev.inert = true;
      prev.setAttribute('inert', '');
    }
    
    element.inert = false;
    element.removeAttribute('inert');
    this.stack.push(element);
  }

  /**
   * 최상위 스크린/모달을 제거하고 비활성화합니다.
   * 복원되는 이전 화면은 inert 속성을 해제하여 다시 활성화합니다.
   */
  public static pop(): HTMLElement | null {
    if (this.stack.length === 0) return null;
    
    const popped = this.stack.pop()!;
    popped.inert = true;
    popped.setAttribute('inert', '');

    if (this.stack.length > 0) {
      const prev = this.stack[this.stack.length - 1];
      prev.inert = false;
      prev.removeAttribute('inert');
    }
    
    return popped;
  }

  /**
   * 스택을 리셋하고 모든 스크린의 inert 상태를 정상으로 해제합니다.
   */
  public static reset() {
    this.stack.forEach((el) => {
      el.inert = false;
      el.removeAttribute('inert');
    });
    this.stack = [];
  }

  /**
   * 현재 스택의 깊이 및 전체 리스트를 조회합니다.
   */
  public static getStack(): HTMLElement[] {
    return [...this.stack];
  }
}
