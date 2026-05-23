/**
 * 특정 루트 엘리먼트 하위에서 포커스 가능한 모든 후보 요소를 수집합니다.
 * Shadow DOM 경계를 관통하여 탐색하며, inert 속성이 걸린 영역이나 비활성 요소는 제외합니다.
 */
export function getFocusableCandidates(root: HTMLElement | ShadowRoot = document.body): HTMLElement[] {
  const candidates: HTMLElement[] = [];

  function walk(node: Node) {
    // 1. Element 노드나 DocumentFragment(ShadowRoot)가 아니면 건너뜁니다.
    if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;

    const isElement = node.nodeType === Node.ELEMENT_NODE;
    const el = isElement ? (node as HTMLElement) : null;

    // 2. inert 속성이 적용된 엘리먼트와 그 하위는 일체 탐색하지 않습니다.
    if (el && (el.inert || el.hasAttribute('inert'))) {
      return;
    }

    // 3. Shadow DOM이 있으면 내부로 들어가 재귀적으로 탐색합니다.
    if (el && el.shadowRoot) {
      walk(el.shadowRoot);
    }

    // 4. 자식 요소들 탐색 (Element 또는 ShadowRoot 둘 다 children이 존재할 수 있음)
    const children = (node as any).children;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;

        if (isFocusable(child)) {
          candidates.push(child);
        }
        
        walk(child);
      }
    }
  }

  walk(root);
  return candidates;
}

/**
 * 엘리먼트가 공간 내비게이션 포커스를 받을 수 있는 대상인지 판단합니다.
 */
function isFocusable(el: HTMLElement): boolean {
  // 1. disabled 상태 요소 제외
  if ((el as any).disabled || el.hasAttribute('disabled')) {
    return false;
  }

  // 2. 명시적으로 화면에서 display: none 이나 visibility: hidden 처리된 요소 제외
  if (el.style) {
    if (el.style.display === 'none' || el.style.visibility === 'hidden') {
      return false;
    }
  }

  const tagName = el.tagName.toLowerCase();

  // 3. 기본적으로 인터랙티브한 태그들 검사
  const isDefaultInteractive = ['button', 'input', 'select', 'textarea'].includes(tagName);
  if (isDefaultInteractive) return true;

  // 4. a(링크) 태그는 href 속성이 있어야 포커스 가능
  if (tagName === 'a' && el.hasAttribute('href')) {
    return true;
  }

  // 5. tabindex 속성이 있고 0 이상인 경우 포커스 가능
  const tabIndexAttr = el.getAttribute('tabindex');
  if (tabIndexAttr !== null) {
    const tabIndex = parseInt(tabIndexAttr, 10);
    return !isNaN(tabIndex) && tabIndex >= 0;
  }

  return false;
}
