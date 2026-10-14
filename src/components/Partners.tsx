import { Sparkles } from "./ui/Sparkles";
import TextReveal from "./ui/text-reveal";
import { useInView, useIsMobile } from "@/lib/hooks";

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
            className="flex items-center justify-center px-6 md:px-32 group cursor-default flex-shrink-0"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-8 md:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-110 dark:brightness-0 dark:invert dark:opacity-60 dark:group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  const isMobile = useIsMobile();
  // Partículas e marquee só rodam enquanto a seção está perto da viewport
  const [sectionRef, inView] = useInView<HTMLElement>('300px');

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white dark:bg-brand-darkBlue relative overflow-hidden transition-colors duration-300"
    >
      {/* Sparkles Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {inView && (
          <Sparkles
            id="partners-sparkles"
            background="transparent"
            minSize={0.6}
            size={1.4}
            density={isMobile ? 35 : 80}
            className="w-full h-full"
            color="#0732C1"
          />
        )}
      </div>

      <div className="w-full relative z-10">
        <div className="mb-16 text-center px-4">
          {/* Mobile-only Title */}
          <div className="block md:hidden">
            <TextReveal
              text="Escolhido por gigantes."
              className="text-4xl font-avenue font-black tracking-tighter text-brand-blue dark:text-white uppercase leading-none"
            />
          </div>
          {/* Desktop Title */}
          <div className="hidden md:block text-6xl font-avenue font-black tracking-tighter text-brand-blue dark:text-white uppercase leading-none">
            <TextReveal text="Marcas que exigem o melhor" className="text-brand-blue dark:text-white" />
            <br />
            <TextReveal text="escolheram Toinho!" className="text-brand-lightBlue mt-1" />
          </div>
        </div>

        <div className="relative flex flex-col gap-6 overflow-hidden py-12 md:py-16">
          <MarqueeRow items={row1} paused={!inView} />
          <MarqueeRow items={row2} reverse paused={!inView} />

          {/* Side Blur Gradients */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 z-20 pointer-events-none bg-gradient-to-r from-white dark:from-brand-darkBlue to-transparent" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 z-20 pointer-events-none bg-gradient-to-l from-white dark:from-brand-darkBlue to-transparent" />
        </div>
      </div>
    </section>
  );
}
