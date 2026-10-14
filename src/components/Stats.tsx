import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * Contador numérico dinâmico que anima de 0 até o valor final assim que entra na tela.
 * Utiliza interpolação easeOutExpo para desaceleração suave e visual marcante.
 */
function CountUp({
  end,
  duration = 2.4,
  start,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  start: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!start || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTimestamp: number | null = null;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [start, end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  const stats = [
    {
      value: 930,
      prefix: "+",
      suffix: "",
      kicker: "Alcance Nacional",
      title: "Quadras no Brasil",
      description: "Presente em clubes tradicionais, condomínios e grandes arenas de norte a sul.",
    },
    {
      value: 200,
      prefix: "+",
      suffix: "",
      kicker: "Competições",
      title: "Torneios Oficiais",
      description: "A marca de confiança escolhida por federações e circuitos profissionais.",
    },
    {
      value: 10,
      prefix: "",
      suffix: " ANOS",
      kicker: "Tradição",
      title: "De Liderança",
      description: "Uma década de fabricação artesanal sob medida e acabamento reforçado.",
    },
    {
      value: 100,
      prefix: "",
      suffix: "%",
      kicker: "Qualidade",
      title: "Nylon Virgem",
      description: "Fibras de alta densidade com proteção solar anti-UV para máxima durabilidade.",
    },
  ];

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative w-full bg-white dark:bg-brand-darkBlue py-12 sm:py-16 md:py-20 text-brand-blue dark:text-white transition-colors duration-300 border-y border-brand-blue/10 dark:border-white/10"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Cabeçalho Editorial Equilibrado */}
        <div className="max-w-3xl mb-8 md:mb-12">
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
            A mais famosa <span className="text-brand-secondaryBlue dark:text-brand-lightBlue">da Bahia.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2.5 font-sans text-xs sm:text-sm font-medium leading-relaxed tracking-wide text-brand-blue/70 dark:text-white/70"
          >
            Liderança absoluta em redes esportivas profissionais. Desenvolvidas com 100% nylon virgem e proteção anti-UV para suportar sol forte, vento constante e maresia.
          </motion.p>
        </div>

        {/* Grid de Métricas: 4 Cards com Animação de Contagem Dinâmica */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl sm:rounded-3xl border border-brand-blue/10 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-brand-blue/20 dark:hover:border-white/20 flex flex-col justify-between"
            >
              <div>
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.25em] text-brand-secondaryBlue dark:text-brand-lightBlue">
                  {stat.kicker}
                </span>

                <div className="flex items-baseline gap-1 mt-2">
                  {stat.prefix && (
                    <span className="font-avenue font-black text-2xl sm:text-3xl text-brand-secondaryBlue dark:text-brand-lightBlue leading-none">
                      {stat.prefix}
                    </span>
                  )}
                  <span className="font-avenue font-black text-4xl sm:text-5xl lg:text-6xl text-brand-blue dark:text-white tracking-tighter leading-none">
                    <CountUp end={stat.value} start={isInView} suffix={stat.suffix} />
                  </span>
                </div>

                <h3 className="font-avenue text-base sm:text-lg font-black uppercase text-brand-blue dark:text-white tracking-tight mt-3">
                  {stat.title}
                </h3>
              </div>

              <p className="font-sans text-xs text-brand-blue/70 dark:text-white/60 leading-relaxed mt-2 pt-3 border-t border-brand-blue/5 dark:border-white/5">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
