import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Scroll suave (Lenis) apenas em desktop.
 *  - Mobile usa o scroll nativo (inércia do iOS/Android é melhor e preserva position:sticky).
 *  - Respeita prefers-reduced-motion.
 *  - `autoRaf` usa um único loop de rAF interno e `anchors` faz os links #secao rolarem suave.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    let lenis: Lenis | null = null;

    const start = () => {
      if (lenis || !desktop.matches || reduced.matches) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        autoRaf: true,
        anchors: true,
      });
    };

    const stop = () => {
      lenis?.destroy();
      lenis = null;
    };

    const sync = () => (desktop.matches && !reduced.matches ? start() : stop());

    sync();
    desktop.addEventListener('change', sync);
    reduced.addEventListener('change', sync);

    return () => {
      desktop.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
      stop();
    };
  }, []);

  return null;
}
