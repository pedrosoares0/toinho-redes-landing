import { Instagram, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer id="contato" className="bg-white dark:bg-brand-darkBlue text-brand-blue dark:text-white py-16 border-t border-gray-100 dark:border-white/5 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full overflow-hidden mb-12 flex justify-center px-6"
      >
        <img
          src="logoToinho.png"
          alt="Toinho Redes"
          className="max-w-[200px] md:max-w-[300px] w-full h-auto object-contain dark:brightness-0 dark:invert"
        />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-8 py-8"
        >
          {/* Brand/Subtitle */}
          <p className="text-center font-sans text-xs md:text-sm font-black uppercase tracking-[0.35em] text-brand-blue/60 max-w-md">
            LIDERANÇA ABSOLUTA EM REDES ESPORTIVAS DE ALTA PERFORMANCE.
          </p>

          {/* Sophisticated Social Icons (Only Instagram and WhatsApp) */}
          <div className="flex gap-6 justify-center">
            <a 
              href="https://www.instagram.com/toinhoredessalvador/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-14 h-14 rounded-2xl border border-brand-blue/10 dark:border-white/10 flex items-center justify-center bg-white dark:bg-brand-darkCard shadow-sm hover:-translate-y-1 hover:shadow-xl hover:bg-brand-blue hover:text-white transition-all duration-500 text-brand-blue dark:text-white group"
              aria-label="Instagram"
            >
              <Instagram size={24} className="group-hover:scale-110 transition-transform duration-500" />
            </a>
            <a 
              href="https://wa.me/5571987974822" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-14 h-14 rounded-2xl border border-brand-blue/10 dark:border-white/10 flex items-center justify-center bg-white dark:bg-brand-darkCard shadow-sm hover:-translate-y-1 hover:shadow-xl hover:bg-green-500 hover:text-white transition-all duration-500 text-brand-blue dark:text-white group"
              aria-label="WhatsApp"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 group-hover:scale-110 transition-transform duration-500"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-brand-blue/40 dark:text-white/40">
            © 2026 Toinho Redes. Salvador - BA.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-brand-blue/30 dark:text-white/30">Criado por</span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/pedrosoares0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img src="minha-logo.png" alt="Criador" className="h-6 w-auto object-contain" />
              </a>
              <div className="flex gap-2">
                <a
                  href="https://wa.me/5571993217001?text=Ol%C3%A1%20Pedro!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full border border-green-500/20 flex items-center justify-center bg-green-500/10 hover:bg-green-500 hover:text-white text-green-600 dark:text-green-400 transition-all duration-300 shadow-sm active:scale-90"
                  aria-label="WhatsApp Pedro"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/pedrosoares0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full border border-brand-blue/20 dark:border-white/20 flex items-center justify-center bg-brand-blue/10 dark:bg-white/10 hover:bg-brand-blue hover:text-white text-brand-blue dark:text-brand-lightBlue transition-all duration-300 shadow-sm active:scale-90"
                  aria-label="GitHub Pedro"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
