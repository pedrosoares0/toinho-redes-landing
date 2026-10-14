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
      // Easing suave (exponential out)
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
      className="relative w-full bg-brand-darkBlue py-20 sm:py-28 md:py-36 overflow-hidden text-white transition-colors duration-300 border-t border-white/5"
    >
      {/* Luz ambiente sutil nas extremidades */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-brand-blue/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-brand-lightBlue/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1400px] px-6">
        {/* Cabeçalho Editorial */}
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-4"
          >
            <div className="h-px w-12 bg-brand-lightBlue/50" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.45em] text-brand-lightBlue">
              Autoridade & Tradição
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-avenue text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.88] text-white"
          >
            A mais famosa <br className="hidden sm:inline" />
            <span className="text-brand-lightBlue">da Bahia.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-2xl font-sans text-xs sm:text-sm font-medium leading-relaxed tracking-wide text-white/70"
          >
            Liderança absoluta em redes esportivas profissionais. Fabricadas com 100% nylon virgem e proteção anti-UV, projetadas para suportar o sol forte, o vento constante e a maresia das principais arenas do país.
          </motion.p>
        </div>

        {/* Composição Asimétrica: Foto dos Atletas em Destaque + 3 Métricas */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Lado Esquerdo: Enquadramento fotográfico de ação */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] w-full overflow-hidden rounded-3xl lg:rounded-[2.5rem] border border-white/10 shadow-2xl bg-[#03081d] group"
          >
            <img
              src="/img/stats-desktop.webp"
              alt="Partida oficial com rede Toinho Redes"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradiente cinemático para garantir contraste e profundidade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020617]/95 via-[#020617]/40 to-transparent" />

            {/* Selo minimalista no rodapé da foto */}
            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
              <p className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-lightBlue">
                Salvador · Bahia
              </p>
              <p className="font-avenue text-lg sm:text-xl font-black uppercase text-white tracking-tight mt-0.5">
                Padrão Oficial das Principais Arenas
              </p>
            </div>
          </motion.div>

          {/* Lado Direito: As 3 Métricas */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4 sm:gap-5">
            {/* Métrica 1: 930 Quadras */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl p-6 sm:p-7 lg:p-8 transition-all duration-300 hover:border-brand-lightBlue/30 hover:-translate-y-1"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-avenue font-black text-3xl sm:text-4xl text-brand-lightBlue leading-none">
                  +
                </span>
                <span className="font-avenue font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tighter leading-none drop-shadow-md">
                  <CountUp end={930} start={inView} />
                </span>
              </div>
              <h3 className="font-avenue text-lg sm:text-xl font-black uppercase text-white tracking-tight mt-3">
                Quadras Equipadas no Brasil
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed mt-1.5">
                Presente em clubes tradicionais, condomínios, centros esportivos e arenas profissionais de norte a sul.
              </p>
            </motion.div>

            {/* Métrica 2: 200 Eventos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl p-6 sm:p-7 lg:p-8 transition-all duration-300 hover:border-brand-lightBlue/30 hover:-translate-y-1"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-avenue font-black text-3xl sm:text-4xl text-brand-lightBlue leading-none">
                  +
                </span>
                <span className="font-avenue font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tighter leading-none drop-shadow-md">
                  <CountUp end={200} start={inView} />
                </span>
              </div>
              <h3 className="font-avenue text-lg sm:text-xl font-black uppercase text-white tracking-tight mt-3">
                Eventos & Campeonatos Oficiais
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed mt-1.5">
                A marca de confiança escolhida por federações, circuitos profissionais e grandes competições esportivas.
              </p>
            </motion.div>

            {/* Métrica 3: 10 Anos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl p-6 sm:p-7 lg:p-8 transition-all duration-300 hover:border-brand-lightBlue/30 hover:-translate-y-1"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-avenue font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tighter leading-none drop-shadow-md">
                  <CountUp end={10} start={inView} />
                </span>
                <span className="font-avenue font-black text-2xl sm:text-3xl text-brand-lightBlue">
                  ANOS
                </span>
              </div>
              <h3 className="font-avenue text-lg sm:text-xl font-black uppercase text-white tracking-tight mt-3">
                De Tradição & Liderança
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed mt-1.5">
                Uma década de fabricação artesanal sob medida, acabamento impecável e durabilidade comprovada.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
