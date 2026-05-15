import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useIsMobile } from '../use-mobile';

afterEach(() => {
  vi.restoreAllMocks();
});

function Probe() {
  const isMobile = useIsMobile();
  return <div data-testid="mobile-state">{String(isMobile)}</div>;
}

function installMatchMediaMock() {
  const listeners = new Set<() => void>();
  const matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: window.innerWidth < 768,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((_event: string, listener: () => void) => listeners.add(listener)),
    removeEventListener: vi.fn((_event: string, listener: () => void) => listeners.delete(listener)),
    dispatchEvent: vi.fn(),
  }));

  window.matchMedia = matchMedia as unknown as typeof window.matchMedia;

  return {
    trigger: () => {
      listeners.forEach((listener) => listener());
    },
  };
}

describe('useIsMobile', () => {
  it('returns false on desktop widths', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    installMatchMediaMock();

    render(<Probe />);

    expect(screen.getByTestId('mobile-state')).toHaveTextContent('false');
  });

  it('updates when the viewport crosses the breakpoint', async () => {
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    const { trigger } = installMatchMediaMock();

    render(<Probe />);
    expect(screen.getByTestId('mobile-state')).toHaveTextContent('false');

    act(() => {
      window.innerWidth = 480;
      trigger();
    });

    expect(screen.getByTestId('mobile-state')).toHaveTextContent('true');
  });
});