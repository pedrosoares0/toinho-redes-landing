import ImageGallery, { MobileStickyStackGallery, galleryImages } from "./ui/image-gallery";
import { motion } from "framer-motion";
import TextReveal from "./ui/text-reveal";

export default function Gallery() {
  return (
    <section id="portfolio" className="relative bg-white dark:bg-brand-darkBlue py-16 md:py-32 transition-colors duration-300">
      {/* Cabeçalho */}
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-brand-blue/[0.02] dark:from-white/[0.01] to-transparent" />

        <div className="relative mb-10 flex flex-col md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-4"
          >
            <div className="h-px w-12 bg-brand-blue/30" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.5em] text-brand-blue/60 dark:text-white/60">
              Showcase
            </span>
          </motion.div>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <h2 className="mb-6 font-avenue text-5xl font-black uppercase leading-[0.8] tracking-tighter text-brand-blue dark:text-white md:text-8xl flex flex-wrap gap-x-2 md:gap-x-4">
                <TextReveal text="Em" className="text-brand-blue dark:text-white" />
                <TextReveal text="Quadra" className="text-brand-lightBlue drop-shadow-sm" />
              </h2>
              <p className="max-w-xl font-sans text-[10px] font-bold uppercase leading-relaxed tracking-[0.3em] text-brand-blue/50 dark:text-white/50 md:text-xs">
                Performance & design presentes nas principais arenas do Brasil.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 md:hidden"
            >
              <div className="flex flex-col">
                <span className="font-avenue text-3xl font-black text-brand-blue dark:text-white">+900</span>
                <span className="font-sans text-[8px] font-black uppercase tracking-widest text-brand-blue/40 dark:text-white/40">
                  Instalações
                </span>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-blue/10 dark:border-white/10">
                <img src="favicon.png" alt="Logo" className="h-6 w-6 object-contain" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden items-center gap-6 md:flex"
            >
              <div className="flex flex-col items-end">
                <span className="font-avenue text-4xl font-black text-brand-blue dark:text-white">+900</span>
                <span className="font-sans text-[8px] font-black uppercase tracking-widest text-brand-blue/40 dark:text-white/40">
                  Instalações
                </span>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-blue/10 dark:border-white/10">
                <img src="favicon.png" alt="Logo" className="h-8 w-8 object-contain" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop: galeria accordion dentro do container */}
        <div className="hidden md:block">
          <ImageGallery />
        </div>
      </div>

      {/* Mobile: stack sticky em largura total — fora de padding/overflow */}
      <MobileStickyStackGallery items={galleryImages} />
    </section>
  );
}
