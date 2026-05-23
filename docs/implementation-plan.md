# Lit + Shadow DOM Spatial Navigation Engine

이 계획서는 Lit Element 및 Shadow DOM 환경에 적합한 공간 내비게이션(Spatial Navigation) 엔진, 중첩 화면 관리를 위한 전역 `Inert Manager`, 커스텀 UI 컴포넌트(`Page`, `Modal`, `Button`, `List`)를 TDD 기반으로 설계 및 구현하기 위한 계획서입니다.

---

## User Review Required

> [!IMPORTANT]
> **1. Shadow DOM 관통을 위한 2D Viewport 좌표계 기반 기하학 계산**
> * 모든 요소의 거리는 `getBoundingClientRect()` 값을 활용해 화면 절대 좌표 기준으로 계산하여 Shadow DOM 경계에 구애받지 않도록 합니다.
>
> **2. 가상 포커스(Virtual Focus) 및 브라우저 포커스의 이원화**
> * 스크롤 컨테이너는 포커스 그래프에는 등록되어 스크롤 조작은 받지만, 실제 DOM `.focus()`는 호출되지 않고 가상 클래스만 부여됩니다.
> * 일반 버튼 등은 실제 DOM `.focus()`를 받아 TalkBack과 유연하게 통합됩니다.
>
> **3. Inert Manager를 통한 Stack 구조 화면 관리**
> * 모달이나 새로운 페이지가 적층될 때 이전 레이어 전체에 `inert` 속성을 부여하여 포커스 대상에서 완전히 배제합니다.
>
> **4. TDD 및 Vitest 환경 구축**
> * Lit 컴포넌트와 브라우저 환경 API(`getBoundingClientRect`, `inert` 등)를 검증하기 위해 Node.js 환경에서 작동하는 `vitest` + `jsdom`/`happy-dom` 기반의 가상 DOM 테스트 환경을 구축합니다.

---

## Proposed Changes

프로젝트 전체 구성 요소 및 설계 구조는 다음과 같습니다.

### 1. Project Initialization & Setup

Vite의 `lit-ts` 템플릿을 사용하여 프로젝트를 시작하고, TDD용 테스트 패키지(`vitest`, `@testing-library/dom`, `happy-dom`)를 설치합니다.

이 프로젝트는 **1) 웹 데모 앱 빌드(Vite App)**와 **2) 패키지화 가능한 npm 라이브러리 빌드(Vite Library Mode)** 두 가지를 모두 만족하도록 설계합니다.

* **데모 앱 빌드**: `npm run build:demo` -> 결과물이 `dist-demo/` 폴더에 생성되어 단독 테스트 가능.
* **라이브러리 빌드**: `npm run build:lib` -> 결과물이 `dist/` 폴더에 ESM/UMD 모듈 및 `.d.ts` 타입 정의서 형태로 자동 생성되어 배포 가능.

#### [NEW] [package.json](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/package.json)
* Vite + Lit + TypeScript + Vitest 설정 및 두 가지 모드의 빌드 스크립트 탑재.

#### [NEW] [vite.config.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/vite.config.ts)
* 환경 변수 또는 빌드 Mode를 조건문으로 판단하여 데모용 번들러와 NPM 라이브러리 모듈(Rollup/dts 연동)을 동적으로 처리.

#### [NEW] [vitest.config.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/vitest.config.ts)
* `happy-dom` 환경 및 테스트 매핑 설정

---

### 2. Spatial Navigation Core

#### [NEW] [geometry.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/spatial-navigation/geometry.ts)
* 4방향(ArrowUp, ArrowDown, ArrowLeft, ArrowRight)에 대한 거리 계산 함수 구현.
* 주축(Primary Axis) 거리, 교차축(Secondary Axis) 거리 및 오버랩(Overlap) 가중치를 이용해 최적의 대상 선정.
* Formula: `Score = PrimaryDistance * 2 + SecondaryDistance * (HasOverlap ? 1 : 4)`

#### [NEW] [candidates.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/spatial-navigation/candidates.ts)
* Shadow DOM을 재귀적으로 탐색하여 포커스 가능한 요소 수집.
* `inert`가 선언되었거나 disabled/숨겨진 요소는 후보군에서 제외.

#### [NEW] [manager.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/spatial-navigation/manager.ts)
* 전역 Spatial Navigation 매니저 클래스.
* `window`에 단일 `keydown` 리스너 등록 및 D-pad 제어.
* 포커스 이동 후 `compute-scroll-into-view`와 유사한 부드러운 자동 스크롤 연동.

---

### 3. Inert Manager

#### [NEW] [inert-manager.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/inert/inert-manager.ts)
* 페이지와 모달 다이얼로그의 적층(Stack) 관리.
* 스택 최상단 화면을 제외한 하위의 모든 페이지에 `inert` 속성을 부여하여 렌더링 스크린 리더와 공간 내비게이션 대상에서 임시 제거.

---

### 4. Custom Lit Components

#### [NEW] [lit-button.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/components/lit-button.ts)
* 포커스 가능한 기본 버튼 요소. 스타일 테마 및 포커스 링 애니메이션 탑재.

#### [NEW] [lit-page.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/components/lit-page.ts)
* 단일 스크린 화면 컴포넌트. `connectedCallback`에서 `InertManager`에 자기 자신을 push.

#### [NEW] [lit-modal.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/components/lit-modal.ts)
* 다이얼로그 팝업 컴포넌트. 열릴 때 `InertManager`에 push되어 하위 화면을 inert화하고, 닫힐 때 pop 처리.

#### [NEW] [lit-list.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/components/lit-list.ts) & [lit-list-item.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/components/lit-list-item.ts)
* 스크롤 가능한 컨테이너 컴포넌트와 그 내부 리스트 아이템.

---

### 5. Verification & TDD Tests

TDD 방식에 근거하여, 코드를 작성하기 전이나 동시에 테스트를 작성하여 검증합니다.

#### [NEW] [geometry.test.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/tests/geometry.test.ts)
* 여러 배치 상태의 사각형(Rect)들에 대해 4방향 최적 타깃 선정 알고리즘 검증.

#### [NEW] [candidates.test.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/tests/candidates.test.ts)
* 일반 DOM 및 Shadow DOM 관통, `inert` 부모 하위 요소 제외 처리 등 포커스 후보군 수집 검증.

#### [NEW] [inert-manager.test.ts](file:///C:/Users/popli/.gemini/antigravity/worktrees/lit-navigation/explain-new-worktree-functionality/src/tests/inert-manager.test.ts)
* 모달 다이얼로그나 스크린 적층 시 하위 스택 inert 처리 및 pop 시 복구 상태 검증.

---

## Verification Plan

### Automated Tests
* Vitest를 이용한 유닛 및 가상 DOM 테스트 러너 구동:
  ```bash
  npm run test
  ```

### Manual Verification
* 테스트용 빌드 후 데모 실행:
  ```bash
  npm run dev
  ```
* 브라우저에서 D-pad(방향키) 입력 및 스크롤 영역 자동 스크롤 인터랙션 수동 조작 검증.
* 개발자 도구의 Accessibility 탭을 활성화하여 `inert` 속성이 하위 적층 스택에 제대로 들어갔는지 확인.
