import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useSiteImages } from '../useSiteImages';

afterEach(() => {
  vi.unstubAllGlobals();
});

function Probe() {
  const { images, loading, error } = useSiteImages();

  return (
    <div>
      <div data-testid="loading">{String(loading)}</div>
      <div data-testid="error">{error ?? ''}</div>
      <div data-testid="images">{JSON.stringify(images)}</div>
    </div>
  );
}

describe('useSiteImages', () => {
  it('loads published images from the backend API', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        images: {
          hero_portrait: {
            url: 'https://cdn.example.com/hero.jpg',
            updatedAt: '2026-05-15T00:00:00.000Z',
          },
        },
      }),
    });

    vi.stubGlobal('fetch', fetchMock);

    render(<Probe />);

    expect(screen.getByTestId('loading')).toHaveTextContent('true');

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5050/api/public/site-images');
    expect(screen.getByTestId('error')).toHaveTextContent('');
    expect(screen.getByTestId('images')).toHaveTextContent('hero_portrait');
  });

  it('surfaces an error when the API fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', fetchMock);

    render(<Probe />);

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('error')).toHaveTextContent('Failed to fetch images');
    expect(errorSpy).toHaveBeenCalled();
  });
});