import { Instagram, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer id="contato" className="bg-white text-brand-blue py-16 border-t border-gray-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full overflow-hidden mb-16"
      >
        <img 
          src="logoToinho.png" 
          alt="Toinho Redes" 
          className="w-full h-auto object-contain"
          style={{ width: '100vw' }}
        />
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start"
        >
          <div className="flex flex-col gap-8 md:col-span-1">
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-brand-blue/10 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300 text-brand-blue shadow-sm">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-brand-blue/10 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300 text-brand-blue shadow-sm">
                <Mail size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-brand-blue/10 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300 text-brand-blue shadow-sm">
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-12 md:col-span-2">
            <div>
              <h4 className="font-sans font-black mb-6 uppercase tracking-[0.3em] text-[10px] text-brand-blue/30">Menu</h4>
              <ul className="flex flex-col gap-3 text-xs font-sans font-black uppercase tracking-[0.2em]">
                <li><a href="#" className="hover:text-brand-lightBlue transition-colors">Início</a></li>
                <li><a href="#portfolio" className="hover:text-brand-lightBlue transition-colors">Portfólio</a></li>
                <li><a href="#catalogo" className="hover:text-brand-lightBlue transition-colors">Catálogo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans font-black mb-6 uppercase tracking-[0.3em] text-[10px] text-brand-blue/30">Contato</h4>
              <ul className="flex flex-col gap-3 text-xs font-sans font-black uppercase tracking-[0.2em]">
                <li><a href="#" className="hover:text-brand-lightBlue transition-colors">WhatsApp</a></li>
                <li><a href="#" className="hover:text-brand-lightBlue transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6"
        >
            <p className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-brand-blue/40">
              © 2024 Toinho Redes. Salvador - BA.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-brand-blue/30">Criado por</span>
              <a 
                href="https://github.com/pedrosoares0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img src="minha-logo.png" alt="Criador" className="h-6 w-auto object-contain" />
              </a>
            </div>
          </motion.div>
        </div>
    </footer>
  );
}
