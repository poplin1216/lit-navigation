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
  // Compute center points (not used in edge distance but kept for reference)
  const currentCenterX = current.left + current.width / 2;
  const currentCenterY = current.top + current.height / 2;
  const targetCenterX = target.left + target.width / 2;
  const targetCenterY = target.top + target.height / 2;

  let dPrimary = 0;
  let dSecondary = 0;
  let hasOverlap = false;

  // Edge‑based primary distance and orthogonal secondary distance
  switch (direction) {
    case 'ArrowDown':
      if (targetCenterY <= currentCenterY) return Infinity;
      dPrimary = target.top - (current.top + current.height);
      dSecondary = Math.abs(targetCenterX - currentCenterX);
      hasOverlap = Math.max(0, Math.min(current.right, target.right) - Math.max(current.left, target.left)) > 0;
      break;
    case 'ArrowUp':
      if (targetCenterY >= currentCenterY) return Infinity;
      dPrimary = current.top - (target.top + target.height);
      dSecondary = Math.abs(targetCenterX - currentCenterX);
      hasOverlap = Math.max(0, Math.min(current.right, target.right) - Math.max(current.left, target.left)) > 0;
      break;
    case 'ArrowRight':
      if (targetCenterX <= currentCenterX) return Infinity;
      dPrimary = target.left - (current.left + current.width);
      dSecondary = Math.abs(targetCenterY - currentCenterY);
      hasOverlap = Math.max(0, Math.min(current.bottom, target.bottom) - Math.max(current.top, target.top)) > 0;
      break;
    case 'ArrowLeft':
      if (targetCenterX >= currentCenterX) return Infinity;
      dPrimary = current.left - (target.left + target.width);
      dSecondary = Math.abs(targetCenterY - currentCenterY);
      hasOverlap = Math.max(0, Math.min(current.bottom, target.bottom) - Math.max(current.top, target.top)) > 0;
      break;
  }

  // Apply penalty when there is no orthogonal overlap
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
    if (
      candidate.rect.left === current.left &&
      candidate.rect.top === current.top &&
      candidate.rect.right === current.right &&
      candidate.rect.bottom === current.bottom
    ) {
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
