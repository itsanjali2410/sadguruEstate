import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollSequenceAnimationProps {
  frameCount: number;
  framePath: string;
  framePrefix: string;
  frameExtension?: string;
  height?: string;
  mobileFramePath?: string;
  mobileFramePrefix?: string;
  mobileFrameCount?: number;
  onLoadComplete?: () => void;
}

export default function ScrollSequenceAnimation({
  frameCount,
  framePath,
  framePrefix,
  frameExtension = 'jpg',
  height = '500vh',
  mobileFramePath,
  mobileFramePrefix,
  mobileFrameCount,
  onLoadComplete,
}: ScrollSequenceAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const actualPath = isMobile && mobileFramePath ? mobileFramePath : framePath;
  const actualPrefix = isMobile && mobileFramePrefix ? mobileFramePrefix : framePrefix;
  const actualCount = isMobile && mobileFrameCount ? mobileFrameCount : frameCount;

  // Pad frame number: 1 -> "001"
  const getFrameSrc = useCallback(
    (index: number) => {
      const padded = String(index + 1).padStart(3, '0');
      return `${actualPath}${actualPrefix}${padded}.${frameExtension}`;
    },
    [actualPath, actualPrefix, frameExtension]
  );

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < actualCount; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === actualCount) {
          setLoaded(true);
          onLoadComplete?.();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === actualCount) {
          setLoaded(true);
          onLoadComplete?.();
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [actualCount, getFrameSrc, onLoadComplete]);

  // Draw frame on canvas
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const img = imagesRef.current[frameIndex];

      if (!canvas || !ctx || !img || !img.complete) return;

      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cover fit
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const x = (canvas.width - img.naturalWidth * scale) / 2;
      const y = (canvas.height - img.naturalHeight * scale) / 2;

      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    },
    []
  );

  // Scroll handler
  useEffect(() => {
    if (!loaded) return;

    // Draw first frame immediately
    drawFrame(0);

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollHeight = container.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / scrollHeight));
        const frameIndex = Math.min(
          Math.floor(progress * (actualCount - 1)),
          actualCount - 1
        );

        if (frameIndex !== currentFrameRef.current && frameIndex >= 0) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, actualCount, drawFrame]);

  return (
    <div ref={containerRef} className="relative" style={{ height }}>
      <div className="sticky top-0 h-screen w-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: loaded ? 'block' : 'none' }}
        />

        {/* Loading state */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0a1628]">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-white/60 text-sm">Loading experience...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
