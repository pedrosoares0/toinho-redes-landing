import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CRITICAL_IMAGES = [
  'favicon.png',
  'logoToinho.png',
];

export default function ImagePreloader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    let loadedCount = 0;
    const total = CRITICAL_IMAGES.length;

    if (total === 0) {
      setLoaded(true);
      setShowContent(true);
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
      const elapsed = Date.now() - startTime;
      const minDuration = 2000; // Garantir pelo menos 2 segundos de loading
      const remainingTime = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setLoaded(true);
        setTimeout(() => {
          setShowContent(true);
          // Set animationFinished to true after the 1000ms transition completes to release stacking contexts
          setTimeout(() => {
            setAnimationFinished(true);
          }, 1050);
        }, 300); // Inicia o fade-in do site sincronizado com o fade-out do loader
      }, remainingTime);
    });
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
            <div className="absolute inset-0 z-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center select-none">
              {/* Logo container circular minimalista e sofisticado */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-24 h-24 mb-8 flex items-center justify-center rounded-full border border-white/40 bg-white/70 backdrop-blur-md shadow-[0_12px_40px_-10px_rgba(17,106,248,0.2)]"
              >
                <img
                  src="favicon.png"
                  alt="Logo"
                  className="w-12 h-12 object-contain relative z-10"
                />
              </motion.div>

              {/* Barra de carregamento Apple-inspired */}
              <div className="w-36 flex flex-col items-center">
                <div className="w-full h-[3px] bg-white/30 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#116AF8] to-[#20BCED] shadow-[0_0_8px_rgba(17,106,248,0.3)]"
                    style={{ width: `${progress}%` }}
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
