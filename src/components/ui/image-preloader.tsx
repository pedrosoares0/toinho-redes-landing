import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Tudo que aparece acima da dobra: o loader só some quando estiver pronto
const CRITICAL_IMAGES = [
  '/favicon.png',
  '/logoToinho.png',
  '/bgherolight.webp',
];

const MIN_DURATION = 1400; // ms — tempo mínimo para o loader ser percebido como "intencional"
const MAX_WAIT = 5000;     // ms — nunca prende o usuário em conexões ruins

export default function ImagePreloader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const timers: number[] = [];
    let cancelled = false;
    let loadedCount = 0;
    const total = CRITICAL_IMAGES.length;

    const loadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });

    const assets = Promise.all(
      CRITICAL_IMAGES.map((src) =>
        loadImage(src).then(() => {
          loadedCount++;
          if (!cancelled) setProgress(Math.round((loadedCount / total) * 100));
        }),
      ),
    );
    const timeout = new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, MAX_WAIT)));

    Promise.race([assets, timeout]).then(() => {
      if (cancelled) return;
      const remaining = Math.max(0, MIN_DURATION - (Date.now() - startTime));

      timers.push(window.setTimeout(() => {
        setProgress(100);
        setLoaded(true);
        timers.push(window.setTimeout(() => {
          setShowContent(true);
          // Libera os stacking contexts depois que a transição de 1s termina
          timers.push(window.setTimeout(() => setAnimationFinished(true), 1050));
        }, 300)); // fade-in do site sincronizado com o fade-out do loader
      }, remaining));
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-[9999] bg-gradient-to-tr from-[#CDF5FD] via-[#A0E9FF] to-[#20BCED]/60 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Ambient subtle light-blue grain overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.05] bg-noise pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center select-none">
              {/* Logo container circular minimalista e sofisticado */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-24 h-24 mb-8 flex items-center justify-center rounded-full border border-white/40 bg-white/70 shadow-[0_12px_40px_-10px_rgba(17,106,248,0.2)]"
              >
                <img
                  src="/favicon.png"
                  alt="Logo"
                  className="w-12 h-12 object-contain relative z-10"
                />
              </motion.div>

              {/* Barra de carregamento Apple-inspired */}
              <div className="w-36 flex flex-col items-center">
                <div className="w-full h-[3px] bg-white/30 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#116AF8] to-[#20BCED] shadow-[0_0_8px_rgba(17,106,248,0.3)]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={animationFinished ? "" : "transition-all duration-1000"}
        style={animationFinished ? { opacity: 1 } : {
          opacity: showContent ? 1 : 0,
          transform: showContent ? "none" : "scale(1.04)",
          transformOrigin: "center top",
          transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)"
        }}
      >
        {children}
      </div>
    </>
  );
}
