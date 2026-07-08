import { useEffect } from 'react';
import { updateMetaTags, SEOMetaTags, addStructuredData } from '../utils/seoUtils';

/**
 * Custom React hook for managing SEO meta tags and structured data
 * Usage in components:
 *
 * useSEO({
 *   title: 'Page Title',
 *   description: 'Page description',
 *   keywords: 'keyword1, keyword2',
 *   ogTitle: 'Open Graph Title',
 *   ogDescription: 'Open Graph Description',
 *   ogImage: 'https://example.com/image.jpg',
 *   ogUrl: 'https://example.com/page'
 * });
 */
export const useSEO = (seo: SEOMetaTags) => {
  useEffect(() => {
    updateMetaTags(seo);
  }, [seo]);
};

/**
 * Hook for managing structured data (JSON-LD)
 */
export const useStructuredData = (data: any) => {
  useEffect(() => {
    addStructuredData(data);
  }, [data]);
};

export default useSEO;
