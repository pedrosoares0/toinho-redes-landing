import { HorizontalStackGallery } from "./ui/vertical-stack-gallery";
import { motion } from "framer-motion";

export default function Catalogue() {
  return (
    <section id="catalogo" className="py-24 md:py-32 bg-white dark:bg-brand-darkCard overflow-hidden relative min-h-screen flex flex-col justify-center transition-colors duration-300">
      {/* Background Decorative Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="text-[20vw] font-avenue font-black text-brand-blue/[0.02] dark:text-white/[0.015] uppercase tracking-tighter whitespace-nowrap">
          Nossos Modelos
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col mb-4 md:mb-12 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-brand-blue/30 dark:bg-white/30" />
            <span className="text-brand-blue/60 dark:text-white/60 text-[10px] font-sans font-black uppercase tracking-[0.5em]">
              Catálogo
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <h2 className="text-5xl md:text-8xl font-avenue font-black tracking-tighter text-brand-blue dark:text-white uppercase leading-[0.8] mb-6">
                Nossos
                <span className="text-brand-lightBlue drop-shadow-sm"> Modelos</span>
              </h2>
              <p className="text-brand-blue/50 dark:text-white/50 text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.3em] max-w-xl leading-relaxed">
                Desenvolvidos com tecnologia de ponta para atender desde o lazer até o alto rendimento profissional.
              </p>
            </motion.div>
          </div>
        </div>

        <HorizontalStackGallery />
      </div>
    </section>
  );
}
