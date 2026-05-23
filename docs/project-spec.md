# Project Specification & Memory Bank: Lit Spatial Navigation System

이 문서는 Lit + Shadow DOM 환경의 공간 내비게이션 및 적층형(Stack) 화면 관리 시스템 프로젝트의 명세서이자 개발 상태를 기록하는 메모리 뱅크(Memory Bank) 역할을 수행합니다.

---

## 1. 프로젝트 개요 (Overview)

* **목적**: 모바일 웹 및 D-pad(방향키) 환경에서 사용할 수 있는 고성능 2D 공간 내비게이션(Spatial Navigation) 엔진과 모달/화면 전환을 위한 글로벌 비활성화 관리자(`Inert Manager`)를 구현합니다.
* **기술 스택**: Lit Element, TypeScript, Vanilla CSS, Vite, Vitest, Happy DOM (또는 JSDOM).
* **차별화 포인트**:
  * **Shadow DOM 관통**: 캡슐화된 Shadow DOM 경계를 무시하고 화면의 절대 좌표(`getBoundingClientRect`)를 사용하여 포커스 대상 탐색.
  * **스크롤 친화적**: 스크롤 컨테이너 자체는 포커싱에서 제외(TalkBack 문제 해결)하고, 자식 요소를 포커스할 때 자동으로 부드러운 스크롤을 연동.
  * **Inert-based Stack**: `inert` 속성을 이용해 비활성화된 뒷배경 화면을 물리적으로 차단하여 포커스 트랩 및 접근성 오류 원천 방지.

---

## 2. 시스템 아키텍처 (Architecture)

### A. Spatial Navigation Core
```
[User Input (Arrow Keys)] -> [manager.ts] -> [candidates.ts] (Collect active elements)
                                  |
                                  v
                           [geometry.ts] (Calculate closest element via 2D Rects)
                                  |
                                  v
                         [nextElement.focus()]
                                  |
                                  v
                        [Smooth Auto-Scroll]
```

* **`candidates.ts`**: 활성 DOM 트리(Shadow DOM 포함)를 순회하며 포커스 가능 대상을 탐색하고 `inert` 요소 및 숨김 요소를 차단합니다.
* **`geometry.ts`**: 현재 포커스된 사각형과 대상 사각형 사이의 거리를 계산합니다. 주축 가중치 및 교차축 미오버랩 페널티가 포함된 점수식(Score Formula)을 사용합니다.
* **`manager.ts`**: 전역 단일 이벤트를 처리하고 상태를 유지합니다.

### B. Inert Manager
* 전역 단일 인스턴스로 동작하는 화면 적층 관리자.
* **동작 방식**:
  1. `<lit-page>` 또는 `<lit-modal>`이 생성 및 활성화될 때 `InertManager.push(screen)` 호출.
  2. 스택에 들어온 화면 중 **가장 최상위(Top)** 화면만 `inert = false`로 두고, 하위 모든 화면은 `inert = true`로 강제 설정.
  3. 화면이 닫히면 `InertManager.pop()`을 실행하여 이전 화면의 `inert` 속성을 `false`로 돌려놓고 포커스 자동 복원.

### C. 디렉토리 구조 (Directory Tree Structure)
```
src/
├── main.ts                    # 데모 실행 및 화면 전환 테스트용 엔트리
├── index.css                  # 기본 스타일 정의 (포커스 링 애니메이션 등)
├── spatial-navigation/        # 공간 내비게이션 엔진 코어
│   ├── geometry.ts            # 2D 평면 절대 좌표 기하학 거리 연산
│   ├── candidates.ts          # Shadow DOM 관통 포커스 후보군 필터링 및 수집
│   └── manager.ts             # D-pad 키 바인딩 이벤트 및 부드러운 스크롤 핸들링
├── inert/                     # 화면 적층 관리 모듈
│   └── inert-manager.ts       # 전역 페이지/모달 Inert 스택 관리자
├── components/                # Lit 기반 커스텀 컴포넌트
│   ├── lit-page.ts            # 화면 스크린 컨테이너
│   ├── lit-modal.ts           # 팝업 다이얼로그
│   ├── lit-button.ts          # 포커스 가능한 D-pad 친화 버튼
│   ├── lit-list.ts            # 자동 스크롤을 트리거하는 리스트 박스 컨테이너
│   └── lit-list-item.ts       # 리스트 하위 개별 아이템 노드
└── tests/                     # TDD 단위 테스트 코드 모음
    ├── geometry.test.ts
    ├── candidates.test.ts
    ├── inert-manager.test.ts
    └── components.test.ts
```

### D. 런타임 논리 컴포넌트 구조 (Logical Runtime Component Tree)
애플리케이션이 실행되는 동안 DOM과 접근성 트리 상에서 컴포넌트들이 어떻게 적층되고 `inert` 상태가 적용되는지를 도식화한 논리 트리 구조입니다.

```
[document.body] (전역 keydown 리스너 작동 범위)
 ├── <lit-page id="page-1" inert="true">         <-- (과거 스택: 비활성화 상태)
 │    ├── <lit-list id="list-1">
 │    │    ├── <lit-list-item>Button A</lit-list-item>  <-- (포커스 진입 불가)
 │    │    └── <lit-list-item>Button B</lit-list-item>
 │    └── <lit-button>Next Screen</lit-button>
 │
 ├── <lit-page id="page-2" inert="true">         <-- (직전 스택: 비활성화 상태)
 │    └── <lit-button>Open Modal</lit-button>
 │
 └── <lit-modal id="modal-1">                    <-- (최상위 스택: 활성화 상태, inert 없음)
      ├── #shadow-root (Shadow DOM 경계 관통 탐색 대상)
      │    ├── <lit-button>Cancel</lit-button>   <-- (D-pad 포커스 가능!)
      │    └── <lit-button>Confirm</lit-button>  <-- (D-pad 포커스 가능!)
```

---

## 3. 핵심 컴포넌트 규격 (Components Specification)

| 컴포넌트 명 | 태그명 | 설명 | 포커스 특징 |
| :--- | :--- | :--- | :--- |
| **Page** | `<lit-page>` | 단일 스크린 래퍼. 화면이 활성화될 때 스택에 적층됨. | 컨테이너 역할만 수행 (포커스 직접 받지 않음) |
| **Modal** | `<lit-modal>` | 다이얼로그 팝업. 열릴 때 스택 최상단에 배치되며 뒷배경을 inert화함. | 내부 자식들만 포커스 가능, 닫힐 때 포커스 복원 |
| **Button** | `<lit-button>` | 기본 리프 노드 인터랙티브 요소. D-pad 및 키보드 조작 핵심 대상. | 실제 DOM `.focus()` 지원, TalkBack 낭독 가능 |
| **List** | `<lit-list>` | 내부 스크롤이 가능한 컨테이너 요소. | 자체 포커스는 불가하나 내부 자식 포커스 시 자동 스크롤 트리거 |
| **ListItem** | `<lit-list-item>` | 리스트 안에 들어가는 포커스 가능 아이템 요소. | 포커스를 받으면 부모 `<lit-list>`가 스크롤 연산 수행 |

---

## 4. 개발 계획 및 진행 상태 (Task Log)

- [ ] **Phase 1: Project Setup**
  - [ ] Vite `lit-ts` 프로젝트 생성 및 폴더 정리
  - [ ] Vitest 및 Happy DOM 테스트 환경 구성
- [ ] **Phase 2: Core Spatial Navigation & TDD**
  - [ ] `candidates.ts` 구현 및 테스트 코드 통과
  - [ ] `geometry.ts` 구현 및 테스트 코드 통과
  - [ ] `manager.ts` 구현 및 자동 스크롤 통합 테스트 통과
- [ ] **Phase 3: Inert Manager & TDD**
  - [ ] `inert-manager.ts` 구현 및 스택 기능 단위 테스트 통과
- [ ] **Phase 4: Custom Elements & Integration**
  - [ ] `<lit-button>`, `<lit-page>`, `<lit-modal>`, `<lit-list>`, `<lit-list-item>` 구현
  - [ ] 컴포넌트 결합 테스트 및 연계 동작 확인
- [ ] **Phase 5: Demo & Verification**
  - [ ] 다중 스크린 및 모달 적층 데모 작성
  - [ ] D-pad 조작 수동 검증 및 접근성 트래킹
