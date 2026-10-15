import ScaleCarousel from "./ui/ScaleCarousel";
import { motion } from "motion/react";
import TextReveal from "./ui/text-reveal";

export default function Catalogue() {
  return (
    <section id="catalogo" className="py-10 sm:py-14 md:py-16 bg-transparent overflow-hidden relative flex flex-col justify-center transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="flex flex-col mb-4 sm:mb-6 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="h-px w-8 bg-brand-blue/30 dark:bg-brand-lightBlue/40" />
            <span className="text-brand-blue/80 dark:text-brand-lightBlue text-[10px] font-sans font-black uppercase tracking-[0.45em]">
              Catálogo Oficial
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-avenue font-black tracking-tight text-brand-blue dark:text-white uppercase leading-none mb-1.5 flex flex-wrap gap-x-2 sm:gap-x-3">
                <TextReveal text="Nossos" className="text-brand-blue dark:text-white" />
                <TextReveal text="Modelos" className="text-brand-lightBlue drop-shadow-sm" />
              </h2>
              <p className="text-brand-blue/60 dark:text-white/60 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.16em] max-w-xl leading-relaxed">
                Fabricação artesanal sob medida com material virgem e proteção UV.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ScaleCarousel com rotação e escala dinâmica */}
        <ScaleCarousel />
      </div>
    </section>
  );
}
