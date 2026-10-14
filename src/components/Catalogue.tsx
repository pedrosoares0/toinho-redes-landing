import { HorizontalStackGallery } from "./ui/vertical-stack-gallery";
import { motion } from "motion/react";
import TextReveal from "./ui/text-reveal";

export default function Catalogue() {
  return (
    <section id="catalogo" className="py-20 md:py-28 bg-slate-50 dark:bg-brand-darkCard/60 overflow-hidden relative min-h-screen flex flex-col justify-center transition-colors duration-300">
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand-lightBlue/10 dark:bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="flex flex-col mb-6 md:mb-10 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-10 bg-brand-blue/40 dark:bg-white/40" />
            <span className="text-brand-blue dark:text-brand-lightBlue text-[10px] font-sans font-black uppercase tracking-[0.45em]">
              Catálogo Oficial
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-avenue font-black tracking-tighter text-brand-blue dark:text-white uppercase leading-[0.9] mb-3 flex flex-wrap gap-x-2 sm:gap-x-4">
                <TextReveal text="Nossos" className="text-brand-blue dark:text-white" />
                <TextReveal text="Modelos" className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondaryBlue to-brand-lightBlue drop-shadow-sm" />
              </h2>
              <p className="text-brand-blue/60 dark:text-white/60 text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.2em] max-w-xl leading-relaxed">
                Fabricação artesanal sob medida com material virgem de alta densidade e proteção solar UV.
              </p>
            </motion.div>
          </div>
        </div>

        <HorizontalStackGallery />
      </div>
    </section>
  );
}
