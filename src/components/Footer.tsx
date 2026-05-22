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
          {/* Info */}
          <div className="flex flex-col gap-6">
            <p className="text-brand-blue/60 text-xs font-sans font-black uppercase tracking-[0.3em] leading-relaxed max-w-xs">
              Liderança absoluta em redes esportivas de alta performance por todo o território nacional.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-brand-blue/10 flex items-center justify-center hover:bg-brand-blue/5 transition-colors text-brand-blue">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-blue/10 flex items-center justify-center hover:bg-brand-blue/5 transition-colors text-brand-blue">
                <Mail size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-brand-blue/10 flex items-center justify-center hover:bg-brand-blue/5 transition-colors text-brand-blue">
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-12">
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
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-brand-blue/30">Criado por</span>
              <div className="flex gap-1">
                <span className="bg-brand-lightBlue/20 text-brand-lightBlue px-2 py-0.5 rounded text-[8px] font-black uppercase">PA</span>
                <span className="bg-brand-blue/10 text-brand-blue/60 px-2 py-0.5 rounded text-[8px] font-black uppercase">STUDIO</span>
              </div>
            </div>
          </motion.div>
        </div>
    </footer>
  );
}
