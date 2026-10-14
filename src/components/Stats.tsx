import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useInView } from '@/lib/hooks';

/**
 * Contador numérico com interpolação de física suave.
 * Atualiza direto no nó do DOM para zero re-renders do React e 60fps constantes.
 */
function CountUp({ end, duration = 2, start }: { end: number; duration?: number; start: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !start) return;

    let raf = 0;
    let t0 = 0;

    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / (duration * 1000), 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = Math.floor(eased * end).toLocaleString('pt-BR');
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, end, duration]);

  return <span ref={ref}>0</span>;
}

export default function Stats() {
  const [sectionRef, inView] = useInView<HTMLElement>('100px');

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative w-full bg-slate-50 dark:bg-brand-darkCard/40 py-10 sm:py-14 md:py-18 overflow-hidden text-brand-blue dark:text-white transition-colors duration-300 border-y border-brand-blue/10 dark:border-white/10"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Cabeçalho Editorial Profissional */}
        <div className="max-w-4xl mb-6 md:mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-2 flex items-center gap-3"
          >
            <div className="h-px w-8 bg-brand-blue/30 dark:bg-brand-lightBlue/40" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.45em] text-brand-blue/70 dark:text-brand-lightBlue">
              Autoridade & Tradição
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-avenue text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-brand-blue dark:text-white"
          >
            A tradição das <span className="text-brand-secondaryBlue dark:text-brand-lightBlue">principais quadras.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2.5 max-w-2xl font-sans text-xs sm:text-sm font-medium leading-relaxed tracking-wide text-brand-blue/70 dark:text-white/70"
          >
            Liderança absoluta em redes esportivas profissionais. Fabricação artesanal sob medida com 100% nylon virgem e proteção anti-UV contra sol, vento e maresia.
          </motion.p>
        </div>

        {/* Grid de Alta Performance: Foto de Ação + 3 Métricas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Lado Esquerdo: Foto Oficial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 relative min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] w-full overflow-hidden rounded-3xl border border-brand-blue/10 dark:border-white/10 shadow-lg bg-slate-900 group"
          >
            <img
              src="/img/stats-desktop.webp"
              alt="Partida oficial com rede Toinho Redes"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradiente sutil para legibilidade da legenda */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

            {/* Legenda minimalista */}
            <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
              <p className="font-sans text-[10px] font-black uppercase tracking-[0.25em] text-brand-lightBlue">
                Salvador · Bahia
              </p>
              <p className="font-avenue text-base sm:text-lg font-black uppercase text-white tracking-tight mt-0.5">
                Padrão Oficial das Principais Arenas
              </p>
            </div>
          </motion.div>

          {/* Lado Direito: Os 3 Cards de Métricas */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-3 sm:gap-4">
            {/* Métrica 1: 930 Quadras */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl sm:rounded-3xl border border-brand-blue/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-brand-blue/20 dark:hover:border-white/20"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-avenue font-black text-2xl sm:text-3xl text-brand-secondaryBlue dark:text-brand-lightBlue leading-none">
                  +
                </span>
                <span className="font-avenue font-black text-4xl sm:text-5xl lg:text-6xl text-brand-blue dark:text-white tracking-tighter leading-none">
                  <CountUp end={930} start={inView} />
                </span>
              </div>
              <h3 className="font-avenue text-base sm:text-lg font-black uppercase text-brand-blue dark:text-white tracking-tight mt-2">
                Quadras Equipadas no Brasil
              </h3>
              <p className="font-sans text-xs text-brand-blue/70 dark:text-white/60 leading-relaxed mt-1">
                Presente em clubes tradicionais, condomínios, centros esportivos e arenas profissionais de norte a sul.
              </p>
            </motion.div>

            {/* Métrica 2: 200 Eventos */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl sm:rounded-3xl border border-brand-blue/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-brand-blue/20 dark:hover:border-white/20"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-avenue font-black text-2xl sm:text-3xl text-brand-secondaryBlue dark:text-brand-lightBlue leading-none">
                  +
                </span>
                <span className="font-avenue font-black text-4xl sm:text-5xl lg:text-6xl text-brand-blue dark:text-white tracking-tighter leading-none">
                  <CountUp end={200} start={inView} />
                </span>
              </div>
              <h3 className="font-avenue text-base sm:text-lg font-black uppercase text-brand-blue dark:text-white tracking-tight mt-2">
                Eventos & Campeonatos Oficiais
              </h3>
              <p className="font-sans text-xs text-brand-blue/70 dark:text-white/60 leading-relaxed mt-1">
                A marca de confiança escolhida por federações, circuitos profissionais e grandes competições esportivas.
              </p>
            </motion.div>

            {/* Métrica 3: 10 Anos */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl sm:rounded-3xl border border-brand-blue/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-brand-blue/20 dark:hover:border-white/20"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-avenue font-black text-4xl sm:text-5xl lg:text-6xl text-brand-blue dark:text-white tracking-tighter leading-none">
                  <CountUp end={10} start={inView} />
                </span>
                <span className="font-avenue font-black text-xl sm:text-2xl text-brand-secondaryBlue dark:text-brand-lightBlue">
                  ANOS
                </span>
              </div>
              <h3 className="font-avenue text-base sm:text-lg font-black uppercase text-brand-blue dark:text-white tracking-tight mt-2">
                De Tradição & Liderança
              </h3>
              <p className="font-sans text-xs text-brand-blue/70 dark:text-white/60 leading-relaxed mt-1">
                Uma década de fabricação artesanal sob medida, acabamento reforçado e durabilidade comprovada.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
