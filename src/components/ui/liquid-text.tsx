"use client";

import { useEffect, useRef } from "react";
import type { FC } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/hooks";

const MORPH_TIME = 1.5;
const COOLDOWN_TIME = 0.5;

/**
 * Efeito "gooey" de troca de texto.
 * Otimizações vs. versão anterior:
 *  - o loop só roda quando o componente está visível (antes rodava 60fps o tempo todo, mesmo fora da tela);
 *  - textContent só é escrito quando a palavra muda (antes era a cada frame);
 *  - estilos estáticos durante o cooldown são escritos uma única vez;
 *  - dt limitado para não "pular" a animação ao voltar para a aba.
 */
const useMorphingText = (texts: string[], active: boolean) => {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const state = useRef({ index: 0, morph: 0, cooldown: 0, settled: false });

  const apply = (fraction: number, index: number) => {
    const a = text1Ref.current;
    const b = text2Ref.current;
    if (!a || !b || texts.length === 0) return;

    b.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    b.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    const inverted = 1 - fraction;
    a.style.filter = `blur(${Math.min(8 / inverted - 8, 100)}px)`;
    a.style.opacity = `${Math.pow(inverted, 0.4) * 100}%`;

    const t1 = texts[index % texts.length];
    const t2 = texts[(index + 1) % texts.length];
    if (a.textContent !== t1) a.textContent = t1;
    if (b.textContent !== t2) b.textContent = t2;
  };

  // Estado inicial estático (mostra a 1ª palavra mesmo antes de entrar na tela)
  useEffect(() => {
    apply(0, state.current.index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts]);

  useEffect(() => {
    if (!active) return;

    const s = state.current;
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      s.cooldown -= dt;

      if (s.cooldown <= 0) {
        s.settled = false;
        s.morph += dt;
        let fraction = s.morph / MORPH_TIME;

        if (fraction > 1) {
          s.cooldown = COOLDOWN_TIME;
          fraction = 1;
        }

        apply(fraction, s.index);

        if (fraction === 1) s.index++;
      } else if (!s.settled) {
        // cooldown: palavra nova parada e nítida
        s.morph = 0;
        const a = text1Ref.current;
        const b = text2Ref.current;
        if (a && b) {
          b.style.filter = "none";
          b.style.opacity = "100%";
          a.style.filter = "none";
          a.style.opacity = "0%";
        }
        s.settled = true;
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, texts]);

  return { text1Ref, text2Ref };
};

interface MorphingTextProps {
  className?: string;
  texts: string[];
}

const Texts: FC<{ texts: string[]; active: boolean }> = ({ texts, active }) => {
  const { text1Ref, text2Ref } = useMorphingText(texts, active);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <span
        className="absolute inset-0 flex items-center justify-center text-center whitespace-nowrap"
        ref={text1Ref}
      />
      <span
        className="absolute inset-0 flex items-center justify-center text-center whitespace-nowrap"
        ref={text2Ref}
      />
    </div>
  );
};

const SvgFilters: FC = () => (
  // width/height 0 em vez de display:none — Safari/Firefox ignoram filtros dentro de display:none
  <svg aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0 }}>
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

const MorphingText: FC<MorphingTextProps> = ({ texts, className }) => {
  const [ref, inView] = useInView<HTMLDivElement>("50px");

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-32 w-full flex items-center justify-center font-avenue leading-none [filter:url(#threshold)_blur(0.6px)] text-[40pt] lg:text-[6rem]",
        className,
      )}
    >
      <Texts texts={texts} active={inView} />
      <SvgFilters />
    </div>
  );
};

export { MorphingText };
