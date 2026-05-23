import { describe, it, expect } from 'vitest';
import { getFocusableCandidates } from '../spatial-navigation/candidates';

describe('Spatial Navigation Candidates Finder', () => {
  it('should find interactive elements in a normal DOM tree', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <button id="btn1">Button 1</button>
      <a href="#" id="link1">Link 1</a>
      <div id="non-interactive">Text</div>
    `;
    document.body.appendChild(container);

    try {
      const candidates = getFocusableCandidates(container);
      const ids = candidates.map(c => c.id);
      expect(ids).toContain('btn1');
      expect(ids).toContain('link1');
      expect(ids).not.toContain('non-interactive');
    } finally {
      document.body.removeChild(container);
    }
  });

  it('should traverse Shadow DOM boundaries', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Shadow Host 요소 생성
    const shadowHost = document.createElement('div');
    container.appendChild(shadowHost);
    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <button id="shadow-btn">Shadow Button</button>
    `;

    try {
      const candidates = getFocusableCandidates(container);
      const ids = candidates.map(c => c.id);
      expect(ids).toContain('shadow-btn');
    } finally {
      document.body.removeChild(container);
    }
  });

  it('should exclude inert elements and their descendants', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <button id="active-btn">Active</button>
      <div inert id="inert-parent">
        <button id="inert-child">Inert Child</button>
      </div>
    `;
    document.body.appendChild(container);

    try {
      const candidates = getFocusableCandidates(container);
      const ids = candidates.map(c => c.id);
      expect(ids).toContain('active-btn');
      expect(ids).not.toContain('inert-child');
    } finally {
      document.body.removeChild(container);
    }
  });

  it('should exclude disabled or hidden elements', () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <button id="enabled-btn">Enabled</button>
      <button disabled id="disabled-btn">Disabled</button>
    `;
    document.body.appendChild(container);

    try {
      const candidates = getFocusableCandidates(container);
      const ids = candidates.map(c => c.id);
      expect(ids).toContain('enabled-btn');
      expect(ids).not.toContain('disabled-btn');
    } finally {
      document.body.removeChild(container);
    }
  });
});
