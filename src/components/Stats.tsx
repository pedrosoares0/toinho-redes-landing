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
      prefix: "",
      suffix: " ANOS",
      kicker: "Tradição",
      title: "De liderança absoluta",
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

        {/* Grid de Cards no estilo da imagem de referência (Dark squircle + wireframe curves + neon bloom inferior + número monumental) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="relative rounded-[2.5rem] bg-[#080d1a] border border-white/10 p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 group min-h-[340px]"
            >
              {/* Linhas curvas wireframe decorativas no topo (estilo imagem de referência) */}
              <svg
                viewBox="0 0 300 220"
                fill="none"
                stroke="white"
                className="absolute -top-4 -right-4 w-[280px] h-[200px] opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity duration-500"
              >
                <circle cx="150" cy="50" r="35" strokeWidth="0.8" strokeOpacity="0.6" />
                <circle cx="150" cy="50" r="65" strokeWidth="0.8" strokeOpacity="0.5" />
                <circle cx="150" cy="50" r="100" strokeWidth="0.8" strokeOpacity="0.4" />
                <circle cx="150" cy="50" r="140" strokeWidth="0.8" strokeOpacity="0.3" />
                <circle cx="150" cy="50" r="185" strokeWidth="0.8" strokeOpacity="0.2" />
                <path d="M -20 80 Q 150 200 320 80" strokeWidth="0.8" strokeOpacity="0.4" />
                <path d="M -20 115 Q 150 230 320 115" strokeWidth="0.8" strokeOpacity="0.3" />
              </svg>

              {/* Glow neon radiante na base do card idêntico à imagem de referência */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-28 bg-[#1371F9] rounded-full blur-[42px] opacity-80 pointer-events-none group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-16 bg-[#80C2FD] rounded-full blur-[26px] opacity-75 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#1371F9]/30 to-transparent pointer-events-none" />

              {/* Conteúdo Superior: Kicker, Título e Descrição */}
              <div className="relative z-10">
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-[#80C2FD] block mb-2">
                  {stat.kicker}
                </span>

                <h3 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-white leading-snug">
                  {stat.title}
                </h3>

                <p className="font-sans text-xs text-white/55 leading-relaxed mt-2">
                  {stat.description}
                </p>
              </div>

              {/* Número Monumental na base com degradê de luz e animação CountUp */}
              <div className="relative z-10 mt-8 pt-4 flex items-baseline">
                <div className="font-avenue font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-none bg-gradient-to-b from-[#ffffff] via-[#e0f2fe] to-[#93c5fd]/80 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(19,113,249,0.35)]">
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
