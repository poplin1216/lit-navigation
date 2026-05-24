import './index'; // 컴포넌트 자동 등록 사이드 이펙트 유지
import './components/spatial-debug-overlay';
import { JsSpatialNavigationManager } from './spatial-navigation/js-manager';

const debugOverlay = document.createElement('spatial-debug-overlay');
document.body.appendChild(debugOverlay);

// 1. D-pad 공간 내비게이션 엔진 전역 활성화 (새 매니저 사용)
// SpatialNavigationManager.start();
JsSpatialNavigationManager.start();

const pageHome = document.getElementById('page-home') as HTMLElement;
const pageDetail = document.getElementById('page-detail') as HTMLElement;
const modal = document.getElementById('modal-dialog') as any;

// 앱 컨테이너 확보
const appContainer = document.getElementById('app-container') as HTMLElement;

// 초기 설정: page-detail을 DOM에서 일시 분리하여 page-home만 스택 최상단 활성 상태로 시작
pageDetail.style.display = 'block'; // 숨김 속성 제거
// pageDetail.remove();

// 2. 페이지 1 -> 페이지 2 화면 전환 (물리적 unmount/mount 연동)
document.getElementById('btn-next')?.addEventListener('click', () => {
  // pageHome.remove();
  appContainer.appendChild(pageDetail);

  // 화면 전환 후 D-pad 첫 버튼 포커싱 유도
  setTimeout(() => {
    document.getElementById('btn-modal-open')?.focus();
  }, 10);
});

// 3. 페이지 2 -> 페이지 1 화면 전환 복구 (물리적 unmount/mount 연동)
document.getElementById('btn-back')?.addEventListener('click', () => {
  console.log('back button click');
  pageDetail.remove();
  // appContainer.appendChild(pageHome);

  // 화면 복구 후 D-pad 타깃 포커싱 유도
  setTimeout(() => {
    document.getElementById('btn-next')?.focus();
  }, 10);
});

// 4. 모달 열기 인터랙션
document.getElementById('btn-modal-open')?.addEventListener('click', () => {
  modal.open = true;

  // 모달 활성화 시 모달 내부의 취소 버튼으로 포커스 자동 이송
  setTimeout(() => {
    document.getElementById('btn-modal-close')?.focus();
  }, 10);
});

// 5. 모달 닫기
document.getElementById('btn-modal-close')?.addEventListener('click', () => {
  modal.open = false;

  // 모달이 닫히면 이전 트리거 버튼으로 안전하게 포커스 복원
  setTimeout(() => {
    document.getElementById('btn-modal-open')?.focus();
  }, 10);
});

// 6. 모달 동작 승인
document.getElementById('btn-modal-confirm')?.addEventListener('click', () => {
  alert('🎉 Premium Action Confirmed!');
  modal.open = false;

  setTimeout(() => {
    document.getElementById('btn-modal-open')?.focus();
  }, 10);
});
