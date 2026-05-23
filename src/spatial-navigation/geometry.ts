export interface Rect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export type Direction = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

/**
 * 두 사각형 간의 공간 내비게이션 거리를 계산하여 가중치 점수를 반환합니다.
 * 점수가 작을수록 더 가깝고 적합한 대상입니다. 대상이 방향이 아니면 Infinity를 반환합니다.
 */
export function calculateDistance(current: Rect, target: Rect, direction: Direction): number {
  const c1x = current.left + current.width / 2;
  const c1y = current.top + current.height / 2;
  const c2x = target.left + target.width / 2;
  const c2y = target.top + target.height / 2;

  // 1. 해당 방향에 존재하는지 1차 필터링
  switch (direction) {
    case 'ArrowDown':
      if (c2y <= c1y) return Infinity;
      break;
    case 'ArrowUp':
      if (c2y >= c1y) return Infinity;
      break;
    case 'ArrowRight':
      if (c2x <= c1x) return Infinity;
      break;
    case 'ArrowLeft':
      if (c2x >= c1x) return Infinity;
      break;
  }

  // 2. 주축(Primary) 및 교차축(Secondary) 거리 계산
  let dPrimary = 0;
  let dSecondary = 0;
  let hasOverlap = false;

  if (direction === 'ArrowDown' || direction === 'ArrowUp') {
    // 수직 탐색
    dPrimary = Math.abs(c2y - c1y);
    dSecondary = Math.abs(c2x - c1x);
    
    // X축 기준 오버랩 검사
    const overlap = Math.max(0, Math.min(current.right, target.right) - Math.max(current.left, target.left));
    hasOverlap = overlap > 0;
  } else {
    // 수평 탐색
    dPrimary = Math.abs(c2x - c1x);
    dSecondary = Math.abs(c2y - c1y);
    
    // Y축 기준 오버랩 검사
    const overlap = Math.max(0, Math.min(current.bottom, target.bottom) - Math.max(current.top, target.top));
    hasOverlap = overlap > 0;
  }

  // 3. 점수 계산 (오버랩이 없으면 가중 페널티 부과)
  const penalty = hasOverlap ? 1 : 4;
  return dPrimary * 2 + dSecondary * penalty;
}

/**
 * 후보군(Candidates) 중 특정 방향으로 가장 가까운 최적의 요소를 찾아 반환합니다.
 */
export function findNearest<T extends { rect: Rect }>(
  current: Rect,
  candidates: T[],
  direction: Direction
): T | null {
  let nearest: T | null = null;
  let minDistance = Infinity;

  for (const candidate of candidates) {
    // 자기 자신은 제외
    if (candidate.rect.left === current.left && 
        candidate.rect.top === current.top && 
        candidate.rect.right === current.right && 
        candidate.rect.bottom === current.bottom) {
      continue;
    }

    const dist = calculateDistance(current, candidate.rect, direction);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = candidate;
    }
  }

  return nearest;
}
