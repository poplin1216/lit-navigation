import { describe, it, expect } from 'vitest';
import { calculateDistance, findNearest } from '../spatial-navigation/geometry';
import type { Rect } from '../spatial-navigation/geometry';

describe('Spatial Navigation Geometry', () => {
  const current: Rect = { left: 100, top: 100, right: 200, bottom: 200, width: 100, height: 100 };

  describe('calculateDistance', () => {
    it('should return a valid score for elements in the direction', () => {
      // 바로 아래에 배치된 요소 (Y축으로 50px 간격, 완벽 오버랩)
      const targetDown: Rect = { left: 100, top: 250, right: 200, bottom: 350, width: 100, height: 100 };
      const score = calculateDistance(current, targetDown, 'ArrowDown');
      expect(score).toBeGreaterThan(0);
    });

    it('should return Infinity for elements in the opposite direction', () => {
      // 위에 있는 요소를 '아래' 방향으로 비교할 때
      const targetUp: Rect = { left: 100, top: 0, right: 200, bottom: 80, width: 100, height: 80 };
      const score = calculateDistance(current, targetUp, 'ArrowDown');
      expect(score).toBe(Infinity);
    });

    it('should give a higher penalty to non-overlapping elements in the cross axis', () => {
      // 1. 바로 아래에 완벽 매칭된 요소 (오버랩 있음)
      const overlapped: Rect = { left: 100, top: 250, right: 200, bottom: 350, width: 100, height: 100 };
      // 2. 우측 아래 대각선에 걸친 요소 (오버랩 없음)
      const skewed: Rect = { left: 300, top: 250, right: 400, bottom: 350, width: 100, height: 100 };

      const scoreOverlapped = calculateDistance(current, overlapped, 'ArrowDown');
      const scoreSkewed = calculateDistance(current, skewed, 'ArrowDown');

      expect(scoreSkewed).toBeGreaterThan(scoreOverlapped);
    });
  });

  describe('findNearest', () => {
    it('should return the closest element from candidates', () => {
      const candidates = [
        {
          id: 'far-down',
          rect: { left: 100, top: 400, right: 200, bottom: 500, width: 100, height: 100 } as Rect,
        },
        {
          id: 'near-down',
          rect: { left: 100, top: 220, right: 200, bottom: 320, width: 100, height: 100 } as Rect,
        },
        {
          id: 'skewed-down', // 가깝지만 대각선에 있음
          rect: { left: 300, top: 210, right: 400, bottom: 310, width: 100, height: 100 } as Rect,
        },
      ];

      const nearest = findNearest(current, candidates, 'ArrowDown');
      expect(nearest).not.toBeNull();
      expect(nearest?.id).toBe('near-down');
    });

    it('should return null if no candidates are in the direction', () => {
      const candidates = [
        {
          id: 'up-element',
          rect: { left: 100, top: 0, right: 200, bottom: 50, width: 100, height: 50 } as Rect,
        },
      ];

      const nearest = findNearest(current, candidates, 'ArrowDown');
      expect(nearest).toBeNull();
    });
  });
});
