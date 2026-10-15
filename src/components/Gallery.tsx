import MaterialCarousel from "./ui/MaterialCarousel";
import { motion } from "motion/react";
import TextReveal from "./ui/text-reveal";

export default function Gallery() {
  return (
    <section id="portfolio" className="relative bg-transparent py-10 sm:py-14 md:py-16 transition-colors duration-300 overflow-hidden">
      {/* Cabeçalho */}
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 mb-4 sm:mb-6">
        <div className="relative flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-2 flex items-center gap-3"
          >
            <div className="h-px w-8 bg-brand-blue/30 dark:bg-brand-lightBlue/40" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.45em] text-brand-blue/70 dark:text-brand-lightBlue">
              Showcase
            </span>
          </motion.div>

          <div className="flex flex-col justify-between gap-2 sm:gap-4 md:flex-row md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <h2 className="mb-1.5 font-avenue text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-none tracking-tight text-brand-blue dark:text-white flex flex-wrap gap-x-2 md:gap-x-3">
                <TextReveal text="Em" className="text-brand-blue dark:text-white" />
                <TextReveal text="Quadra" className="text-brand-lightBlue drop-shadow-sm" />
              </h2>
              <p className="max-w-xl font-sans text-xs sm:text-sm font-medium uppercase leading-relaxed tracking-[0.16em] text-brand-blue/60 dark:text-white/60">
                Performance & design presentes nas principais arenas do Brasil.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Material 3 Multi-Browse Carousel */}
      <MaterialCarousel />
    </section>
  );
}
