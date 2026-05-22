import InteractiveSelector from "./ui/interactive-selector";
import { motion } from "framer-motion";

export default function Gallery() {
  return (
    <section id="portfolio" className="py-32 md:py-48 bg-white overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-blue/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-[1800px] mx-auto px-6 relative">
        <div className="flex flex-col mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-brand-blue/30" />
            <span className="text-brand-blue/60 text-[10px] font-sans font-black uppercase tracking-[0.5em]">
              Showcase
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <h2 className="text-7xl md:text-[11rem] font-avenue font-black tracking-tighter text-brand-blue uppercase leading-[0.75] mb-8">
                Em
                <span className="text-brand-lightBlue drop-shadow-sm">Quadra</span>
              </h2>
              <p className="text-brand-blue/50 text-xs md:text-sm font-sans font-bold uppercase tracking-[0.3em] max-w-xl leading-relaxed">
                A excelência técnica encontra o design de alta performance nas melhores arenas do Brasil.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:flex items-center gap-8"
            >
              <div className="flex flex-col items-end">
                <span className="text-brand-blue font-avenue text-5xl font-black">+900</span>
                <span className="text-brand-blue/40 text-[9px] font-sans font-black uppercase tracking-widest">Instalações</span>
              </div>
              <div className="w-20 h-20 border-2 border-brand-blue/10 border-t-brand-blue rounded-full flex items-center justify-center animate-spin-slow">
                 <div className="w-2 h-2 bg-brand-blue rounded-full shadow-[0_0_15px_rgba(7,50,193,0.4)]" />
              </div>
            </motion.div>
          </div>
        </div>

        <InteractiveSelector />
      </div>
    </section>
  );
}

