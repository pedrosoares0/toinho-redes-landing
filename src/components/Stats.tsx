import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

/**
 * Contador numérico dinâmico rápido que passa por apenas 3 a 4 números
 * antes de fixar no valor final, proporcionando animação ágil e impactante.
 */
function CountUp({
  end,
  start,
  prefix = "",
  suffix = "",
}: {
  end: number;
  start: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!start || hasAnimated.current) return;
    hasAnimated.current = true;

    // Passa por apenas 3 a 4 números intermediários (curto e dinâmico)
    const steps = [
      Math.round(end * 0.22),
      Math.round(end * 0.58),
      Math.round(end * 0.86),
      end,
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      setCount(steps[stepIndex]);
      stepIndex++;
      if (stepIndex >= steps.length) {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [start, end]);

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
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const stats = [
    {
      value: 930,
      prefix: "+",
      suffix: "",
      kicker: "Alcance Nacional",
      title: "Quadras equipadas no Brasil",
      description: "Presente em clubes tradicionais, condomínios e grandes arenas esportivas.",
    },
    {
      value: 200,
      prefix: "+",
      suffix: "",
      kicker: "Competições",
      title: "Torneios oficiais disputados",
      description: "A marca de confiança escolhida por atletas, federações e circuitos.",
    },
    {
      value: 10,
      prefix: "+",
      suffix: "",
      kicker: "Tradição",
      title: "Anos de tradição e liderança",
      description: "Uma década de fabricação artesanal sob medida e acabamento reforçado.",
    },
    {
      value: 100,
      prefix: "",
      suffix: "%",
      kicker: "Qualidade",
      title: "Nylon virgem com filtro UV",
      description: "Fibras de alta densidade resistentes ao sol forte, vento constante e maresia.",
    },
  ];

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative w-full bg-white dark:bg-brand-darkBlue py-16 sm:py-20 md:py-24 text-brand-blue dark:text-white transition-colors duration-300"
    >
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Cabeçalho Editorial Equilibrado */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-px w-8 bg-brand-secondaryBlue" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.45em] text-brand-secondaryBlue">
              Autoridade & Tradição
            </span>
          </div>

          <h2 className="font-avenue text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-brand-blue dark:text-white">
            A mais famosa <span className="text-brand-secondaryBlue dark:text-brand-lightBlue">da Bahia.</span>
          </h2>

          <p className="mt-3 font-sans text-xs sm:text-sm font-medium leading-relaxed tracking-wide text-brand-blue/70 dark:text-white/70">
            Liderança absoluta em redes esportivas profissionais. Desenvolvidas com 100% nylon virgem e proteção anti-UV para suportar sol forte, vento constante e maresia.
          </p>
        </div>

        {/* Grid de Cards Brancos com Números Gigantes e Glow Azul Sutil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="relative rounded-[2.5rem] bg-white border border-brand-blue/10 p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(7,50,193,0.06)] hover:shadow-[0_20px_40px_rgba(7,50,193,0.12)] transition-all duration-500 hover:-translate-y-1.5 group min-h-[350px]"
            >
              {/* Linhas curvas wireframe decorativas em tom azul suave */}
              <svg
                viewBox="0 0 300 220"
                fill="none"
                stroke="#0732C1"
                className="absolute -top-4 -right-4 w-[280px] h-[200px] opacity-[0.08] pointer-events-none group-hover:opacity-[0.15] transition-opacity duration-500"
              >
                <circle cx="150" cy="50" r="35" strokeWidth="0.8" strokeOpacity="0.6" />
                <circle cx="150" cy="50" r="65" strokeWidth="0.8" strokeOpacity="0.5" />
                <circle cx="150" cy="50" r="100" strokeWidth="0.8" strokeOpacity="0.4" />
                <circle cx="150" cy="50" r="140" strokeWidth="0.8" strokeOpacity="0.3" />
                <circle cx="150" cy="50" r="185" strokeWidth="0.8" strokeOpacity="0.2" />
                <path d="M -20 80 Q 150 200 320 80" strokeWidth="0.8" strokeOpacity="0.4" />
                <path d="M -20 115 Q 150 230 320 115" strokeWidth="0.8" strokeOpacity="0.3" />
              </svg>

              {/* Glow azul radiante na base do card branco */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-28 bg-[#80C2FD]/40 rounded-full blur-[38px] pointer-events-none group-hover:bg-[#1371F9]/30 transition-colors duration-500" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-lightBlue/15 to-transparent pointer-events-none" />

              {/* Conteúdo Superior: Kicker, Título e Descrição */}
              <div className="relative z-10">
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-secondaryBlue block mb-2">
                  {stat.kicker}
                </span>

                <h3 className="font-sans text-base sm:text-lg font-bold tracking-tight text-brand-blue leading-snug">
                  {stat.title}
                </h3>

                <p className="font-sans text-xs text-brand-blue/70 leading-relaxed mt-2">
                  {stat.description}
                </p>
              </div>

              {/* Número Gigante na base com contagem rápida em azul escuro perfeitamente alinhado */}
              <div className="relative z-10 mt-8 pt-4 flex items-baseline">
                <div className="font-avenue font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter leading-none bg-gradient-to-b from-[#0732C1] via-[#1371F9] to-[#0732C1] bg-clip-text text-transparent drop-shadow-sm whitespace-nowrap">
                  <CountUp end={stat.value} start={isInView} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
