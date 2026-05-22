import { useEffect, useState } from 'react';

const CRITICAL_IMAGES = [
  'bgherolight.png',
  'favicon.png',
  'logoToinho.png',
];

export default function ImagePreloader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const total = CRITICAL_IMAGES.length;

    if (total === 0) {
      setLoaded(true);
      return;
    }

    const loadImage = (src: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; 
      });
    };

    Promise.all(CRITICAL_IMAGES.map(src => 
      loadImage(src).then(() => {
        loadedCount++;
        setProgress(Math.round((loadedCount / total) * 100));
      })
    )).then(() => {
      // Transition as soon as critical items are ready
      setLoaded(true);
    });
  }, []);

  if (!loaded) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
        <div className="relative w-20 h-20 mb-6">
          <img src="favicon.png" alt="Loading..." className="w-full h-full object-contain" />
        </div>
        <div className="w-32 h-[2px] bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-blue transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
