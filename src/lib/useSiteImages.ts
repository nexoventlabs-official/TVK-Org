import { useState, useEffect } from 'react';

interface SiteImage {
  url: string;
  updatedAt: string;
}

interface SiteImages {
  [key: string]: SiteImage | null;
}

interface UseSiteImagesResult {
  images: SiteImages;
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch site images from the backend API.
 * Images are cached and only refetched if they've been updated.
 */
export function useSiteImages(): UseSiteImagesResult {
  const [images, setImages] = useState<SiteImages>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';
        const response = await fetch(`${BACKEND_URL}/api/public/site-images`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        
        if (data.ok && data.images) {
          setImages(data.images);
        }
      } catch (err) {
        console.error('Error fetching site images:', err);
        setError(err instanceof Error ? err.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, loading, error };
}
