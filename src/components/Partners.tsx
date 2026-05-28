import { Sparkles } from "./ui/Sparkles";
import { motion } from "framer-motion";
import TextReveal from "./ui/text-reveal";
export default function Partners() {
  const row1 = [
    { name: 'Amstel', logo: 'logo-amstel.png' },
    { name: 'Caffeine', logo: 'logo-caffeine.png' },
    { name: 'Clube', logo: 'logo-clube.png' },
    { name: 'Corona', logo: 'logo-corona.png' },
    { name: 'Gatorade', logo: 'logo-gatorade.png' },
    { name: 'Nu', logo: 'logo-nu.png' }
  ];

  const row2 = [
    { name: 'Mikasa', logo: 'logo-mikasa.png' },
    { name: 'Sol', logo: 'logo-sol.png' },
    { name: 'Vitória', logo: 'logo-vitoria.png' },
    { name: 'Sudesb', logo: 'logo-sudesb.png' },
    { name: 'Fafeb', logo: 'logo-fafeb.png' }
  ];

  return (
    <section className="py-24 bg-white dark:bg-brand-darkBlue relative overflow-hidden transition-colors duration-300">
      {/* Sparkles Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Sparkles
          id="partners-sparkles"
          background="transparent"
          minSize={0.6}
          size={1.4}
          density={80}
          className="w-full h-full"
          color="#0732C1"
        />
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
          {/* Row 1: Left Infinite Scroll */}
          <div className="flex overflow-hidden py-2">
            <div className="flex animate-infinite-scroll whitespace-nowrap items-center w-max">
              {[...row1, ...row1].map((partner, i) => (
                <div
                  key={`${partner.name}-r1-${i}`}
                  className="flex items-center justify-center px-6 md:px-32 group cursor-default flex-shrink-0"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-8 md:h-20 w-auto object-contain transition-all duration-500 group-hover:scale-110 dark:brightness-0 dark:invert dark:opacity-60 dark:group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right Infinite Scroll */}
          <div className="flex overflow-hidden py-2">
            <div className="flex animate-infinite-scroll-reverse whitespace-nowrap items-center w-max">
              {[...row2, ...row2].map((partner, i) => (
                <div
                  key={`${partner.name}-r2-${i}`}
                  className="flex items-center justify-center px-6 md:px-32 group cursor-default flex-shrink-0"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-8 md:h-20 w-auto object-contain transition-all duration-500 group-hover:scale-110 dark:brightness-0 dark:invert dark:opacity-60 dark:group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Side Blur Gradients */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 z-20 pointer-events-none bg-gradient-to-r from-white dark:from-brand-darkBlue to-transparent" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 z-20 pointer-events-none bg-gradient-to-l from-white dark:from-brand-darkBlue to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 16s linear infinite;
        }
        .animate-infinite-scroll-reverse {
          animation: infinite-scroll 16s linear infinite reverse;
        }
        @media (min-width: 768px) {
          .animate-infinite-scroll {
            animation: infinite-scroll 28s linear infinite;
          }
          .animate-infinite-scroll-reverse {
            animation: infinite-scroll 28s linear infinite reverse;
          }
        }
        .animate-infinite-scroll:hover, .animate-infinite-scroll-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
