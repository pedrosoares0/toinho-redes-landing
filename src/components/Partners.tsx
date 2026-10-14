import TextReveal from "./ui/text-reveal";
import { useInView } from "@/lib/hooks";

const row1 = [
  { name: 'Amstel', logo: '/logo-amstel.webp' },
  { name: 'Caffeine', logo: '/logo-caffeine.webp' },
  { name: 'Clube', logo: '/logo-clube.webp' },
  { name: 'Corona', logo: '/logo-corona.webp' },
  { name: 'Gatorade', logo: '/logo-gatorade.webp' },
  { name: 'Nu', logo: '/logo-nu.webp' },
];

const row2 = [
  { name: 'Mikasa', logo: '/logo-mikasa.webp' },
  { name: 'Sol', logo: '/logo-sol.webp' },
  { name: 'Vitória', logo: '/logo-vitoria.webp' },
  { name: 'Sudesb', logo: '/logo-sudesb.webp' },
  { name: 'Fafeb', logo: '/logo-fafeb.webp' },
];

function MarqueeRow({ items, reverse = false, paused }: { items: typeof row1; reverse?: boolean; paused: boolean }) {
  return (
    <div className="flex overflow-hidden py-2">
      <div
        className={`marquee-track${reverse ? ' reverse' : ''} flex whitespace-nowrap items-center w-max`}
        data-paused={paused}
      >
        {[...items, ...items].map((partner, i) => (
          <div
            key={`${partner.name}-${i}`}
            className="flex items-center justify-center px-6 md:px-24 group cursor-default flex-shrink-0"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-9 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-110 opacity-75 group-hover:opacity-100 dark:brightness-0 dark:invert dark:opacity-60 dark:group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  // Marquee só roda enquanto a seção está perto da viewport
  const [sectionRef, inView] = useInView<HTMLElement>('300px');

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white dark:bg-brand-darkBlue relative overflow-hidden transition-colors duration-300 border-b border-brand-blue/5 dark:border-white/5"
    >
      <div className="w-full relative z-10">
        <div className="mb-10 md:mb-14 text-center px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-brand-blue/30 dark:bg-brand-lightBlue/40" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.45em] text-brand-blue/70 dark:text-brand-lightBlue">
              Parcerias de Peso
            </span>
            <div className="h-px w-8 bg-brand-blue/30 dark:bg-brand-lightBlue/40" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-avenue font-black tracking-tighter text-brand-blue dark:text-white uppercase leading-none">
            <TextReveal text="A escolha das" className="text-brand-blue dark:text-white" />{" "}
            <TextReveal text="grandes marcas." className="text-brand-lightBlue" />
          </h2>

          <p className="mt-3 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.18em] text-brand-blue/60 dark:text-white/60">
            Presente nos principais eventos, torneios oficiais e arenas do país.
          </p>
        </div>

        <div className="relative flex flex-col gap-4 sm:gap-6 overflow-hidden py-4 md:py-8">
          <MarqueeRow items={row1} paused={!inView} />
          <MarqueeRow items={row2} reverse paused={!inView} />

          {/* Gradientes de fade lateral suaves e elegantes */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-r from-white dark:from-brand-darkBlue to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-l from-white dark:from-brand-darkBlue to-transparent" />
        </div>
      </div>
    </section>
  );
}
