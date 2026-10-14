import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer
      id="contato"
      className="relative bg-[#060811] text-white pt-20 md:pt-28 pb-0 overflow-hidden border-t border-white/10 select-none"
    >
      {/* Atmosfera sutil de fundo estilo imagem de referência (misty twilight + dark gradient) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#131b2e]/30 via-[#060811] to-[#04050a] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-secondaryBlue/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Grid com 3 colunas e linha divisória fina no topo de cada uma (MENU, SOCIALS, RESOURCES) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 pb-12 md:pb-16"
        >
          {/* Coluna 1: MENU */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-5">
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white font-sans">
                MENU
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-white/70 font-sans">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Início
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors duration-200">
                  Em Quadra (Galeria)
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors duration-200">
                  Nossos Modelos
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors duration-200">
                  Números & Tradição
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors duration-200">
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 2: REDES SOCIAIS */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-5">
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white font-sans">
                REDES SOCIAIS
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-white/70 font-sans">
              <li>
                <a
                  href="https://www.instagram.com/toinhoredessalvador/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5571987974822"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
                >
                  WhatsApp Oficial
                </a>
              </li>
              <li className="text-white/45 text-sm pt-1">
                Salvador — Bahia, Brasil
              </li>
            </ul>
          </div>

          {/* Coluna 3: ATENDIMENTO / CONTATO COM BOTÃO PILL */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/20 mb-5">
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-white font-sans">
                ATENDIMENTO
              </h3>
            </div>
            <div className="space-y-2 text-sm text-white/70 font-sans mb-6">
              <p className="text-white/80">Redes sob medida de alta performance</p>
              <p className="text-white/45 text-xs">Atendimento consultivo direto de fábrica</p>
            </div>

            <a
              href="https://wa.me/5571987974822?text=Ol%C3%A1%20Toinho!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20rede."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-2.5 text-xs md:text-sm font-normal text-white hover:bg-white hover:text-[#060811] transition-all duration-300 tracking-wide active:scale-95 shadow-sm"
            >
              Enviar mensagem
            </a>
          </div>
        </motion.div>
      </div>

      {/* Tipografia Monumental Edge-to-Edge idêntica à referência ("KEXSIO" -> "TOINHO REDES") com gradiente vertical */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full overflow-hidden flex justify-center items-end select-none pointer-events-none -mb-3 sm:-mb-5 md:-mb-8 lg:-mb-12"
      >
        <h2 className="text-[14.5vw] font-avenue font-black uppercase tracking-[-0.035em] leading-[0.76] text-center whitespace-nowrap bg-gradient-to-b from-[#8d95a5] via-[#2f3748] to-[#060811] bg-clip-text text-transparent">
          TOINHO REDES
        </h2>
      </motion.div>

      {/* Barra de Direitos e Créditos */}
      <div className="relative z-10 border-t border-white/10 bg-[#04060c] py-5 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] md:text-[11px] text-white/40 font-sans uppercase tracking-widest">
          <span>© 2026 Toinho Redes. Salvador - BA. Sem Rede, Sem Jogo.</span>
          <div className="flex items-center gap-3">
            <span>Criado por</span>
            <a
              href="https://github.com/pedrosoares0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors font-medium flex items-center gap-1.5"
            >
              Pedro Soares
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
