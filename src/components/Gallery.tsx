import MaterialCarousel from "./ui/MaterialCarousel";
import { motion } from "motion/react";
import TextReveal from "./ui/text-reveal";

export default function Gallery() {
  return (
    <section id="portfolio" className="relative bg-white dark:bg-brand-darkBlue py-16 md:py-28 transition-colors duration-300 overflow-hidden">
      {/* Cabeçalho */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 mb-8 md:mb-12">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-brand-blue/[0.02] dark:from-white/[0.01] to-transparent" />

        <div className="relative flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-3"
          >
            <div className="h-px w-10 bg-brand-blue/30 dark:bg-brand-lightBlue/40" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.45em] text-brand-blue/70 dark:text-brand-lightBlue">
              Showcase
            </span>
          </motion.div>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <h2 className="mb-3 font-avenue text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.85] tracking-tighter text-brand-blue dark:text-white flex flex-wrap gap-x-2 md:gap-x-4">
                <TextReveal text="Em" className="text-brand-blue dark:text-white" />
                <TextReveal text="Quadra" className="text-brand-lightBlue drop-shadow-sm" />
              </h2>
              <p className="max-w-xl font-sans text-xs sm:text-sm font-medium uppercase leading-relaxed tracking-[0.2em] text-brand-blue/60 dark:text-white/60">
                Performance & design presentes nas principais arenas do Brasil.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Material 3 Multi-Browse Carousel (Mobile + Desktop unificado) */}
      <MaterialCarousel />
    </section>
  );
}
