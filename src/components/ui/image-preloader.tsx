import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Tudo que aparece acima da dobra: o loader só some quando estiver pronto
const CRITICAL_IMAGES = [
  '/favicon.png',
  '/logoToinho.png',
  '/bgherolight.webp',
];

const MIN_DURATION = 1300; // ms — tempo ideal para percepção cinematográfica sem atrasar o usuário
const MAX_WAIT = 4500;     // ms — nunca prende o usuário em conexões lentas

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

    // Incremento suave e contínuo de progresso visual
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 80);

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
          if (!cancelled) {
            const calculated = Math.round((loadedCount / total) * 100);
            setProgress((prev) => Math.max(prev, calculated));
          }
        }),
      ),
    );
    const timeout = new Promise<void>((resolve) => timers.push(window.setTimeout(resolve, MAX_WAIT)));

    Promise.race([assets, timeout]).then(() => {
      if (cancelled) return;
      clearInterval(progressInterval);
      const remaining = Math.max(0, MIN_DURATION - (Date.now() - startTime));

      timers.push(
        window.setTimeout(() => {
          setProgress(100);
          timers.push(
            window.setTimeout(() => {
              setLoaded(true);
              timers.push(
                window.setTimeout(() => {
                  setShowContent(true);
                  // Libera stacking context após a animação de saída
                  timers.push(window.setTimeout(() => setAnimationFinished(true), 1000));
                }, 200),
              );
            }, 300),
          );
        }, remaining),
      );
    });

    return () => {
      cancelled = true;
      clearInterval(progressInterval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: 'blur(16px)',
              transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden select-none"
          >
            {/* Brilho radial ambiente azul profundo */}
            <div className="pointer-events-none absolute h-[600px] w-[600px] rounded-full bg-brand-blue/25 blur-[160px] -translate-y-12" />
            <div className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-brand-lightBlue/15 blur-[100px] translate-y-24" />

            <div className="relative z-10 flex flex-col items-center px-6 text-center">
              {/* Card central com o monograma/logo */}
              <motion.div
                initial={{ scale: 0.88, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-8 flex items-center justify-center"
              >
                {/* Halo pulsante */}
                <div className="absolute -inset-3 rounded-full bg-brand-lightBlue/20 blur-xl animate-pulse" />

                <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-2xl shadow-[0_20px_50px_-10px_rgba(7,50,193,0.5)]">
                  <img
                    src="/favicon.png"
                    alt="Toinho Redes"
                    className="h-12 w-12 sm:h-14 sm:w-14 object-contain drop-shadow-md"
                  />
                </div>
              </motion.div>

              {/* Tipografia de Marca Sofisticada */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                className="mb-8 flex flex-col items-center"
              >
                <h1 className="font-avenue text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
                  TOINHO REDES
                </h1>
                <p className="mt-1 font-sans text-[9px] sm:text-[10px] font-black uppercase tracking-[0.45em] text-brand-lightBlue">
                  Sem rede, sem jogo.
                </p>
              </motion.div>

              {/* Contador de Progresso Numérico + Barra Estilizada */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-col items-center w-52 sm:w-64"
              >
                <div className="flex items-center justify-between w-full mb-2 px-1">
                  <span className="font-sans text-[9px] font-black uppercase tracking-[0.3em] text-white/40">
                    Carregando
                  </span>
                  <span className="font-avenue text-sm sm:text-base font-black text-white tracking-wider">
                    {Math.min(100, progress)}%
                  </span>
                </div>

                <div className="h-[2px] w-full rounded-full bg-white/10 overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-blue via-brand-lightBlue to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                    style={{ width: `${Math.min(100, progress)}%` }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={animationFinished ? '' : 'transition-all duration-1000'}
        style={
          animationFinished
            ? { opacity: 1 }
            : {
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'none' : 'scale(1.02)',
                transformOrigin: 'center top',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }
        }
      >
        {children}
      </div>
    </>
  );
}
