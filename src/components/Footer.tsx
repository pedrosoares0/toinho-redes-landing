export default function Footer() {
  return (
    <footer
      id="contato"
      className="relative bg-white text-brand-blue pt-16 md:pt-24 pb-0 overflow-hidden border-t border-brand-blue/10 select-none transition-colors duration-300"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Grid com 3 colunas e linha divisória fina no topo de cada uma (MENU, REDES SOCIAIS, ATENDIMENTO) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 pb-8 md:pb-12">
          {/* Coluna 1: MENU */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-blue/20 mb-5">
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-brand-blue font-sans">
                MENU
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-brand-blue/70 font-sans">
              <li>
                <a href="#" className="hover:text-brand-blue transition-colors duration-200">
                  Início
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-brand-blue transition-colors duration-200">
                  Em Quadra (Galeria)
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-brand-blue transition-colors duration-200">
                  Nossos Modelos
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-brand-blue transition-colors duration-200">
                  Números & Tradição
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-blue transition-colors duration-200">
                  Dúvidas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 2: REDES SOCIAIS */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-blue/20 mb-5">
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-brand-blue font-sans">
                REDES SOCIAIS
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-brand-blue/70 font-sans">
              <li>
                <a
                  href="https://www.instagram.com/toinhoredessalvador/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-blue transition-colors duration-200 inline-flex items-center gap-2"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5571987974822"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-blue transition-colors duration-200 inline-flex items-center gap-2"
                >
                  WhatsApp Oficial
                </a>
              </li>
              <li className="text-brand-blue/50 text-sm pt-1">
                Salvador — Bahia, Brasil
              </li>
            </ul>
          </div>

          {/* Coluna 3: ATENDIMENTO / CONTATO COM BOTÃO PILL */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-brand-blue/20 mb-5">
              <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-brand-blue font-sans">
                ATENDIMENTO
              </h3>
            </div>
            <div className="space-y-2 text-sm text-brand-blue/70 font-sans mb-6">
              <p className="text-brand-blue/90 font-medium">Redes sob medida de alta performance</p>
              <p className="text-brand-blue/55 text-xs">Atendimento consultivo direto de fábrica</p>
            </div>

            <a
              href="https://wa.me/5571987974822?text=Ol%C3%A1%20Toinho!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20rede."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-brand-blue/30 px-6 py-2.5 text-xs md:text-sm font-semibold text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 tracking-wide active:scale-95 shadow-sm"
            >
              Enviar mensagem
            </a>
          </div>
        </div>
      </div>

      {/* Tipografia Monumental no limite horizontal da tela, sangrando suavemente nas bordas */}
      <div className="w-full overflow-hidden flex justify-center items-end select-none pointer-events-none pt-2 pb-0">
        <h2 className="text-[14.5vw] sm:text-[16vw] md:text-[17.5vw] lg:text-[19vw] font-avenue font-black uppercase tracking-[-0.04em] leading-[0.76] text-center whitespace-nowrap bg-gradient-to-b from-white via-[#80C2FD] to-[#0732C1] bg-clip-text text-transparent">
          TOINHO REDES
        </h2>
      </div>

      {/* Barra de Direitos e Créditos */}
      <div className="relative z-10 border-t border-brand-blue/10 bg-slate-50/80 py-5 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] md:text-[11px] text-brand-blue/50 font-sans uppercase tracking-widest">
          <span>© 2026 Toinho Redes. Salvador - BA. Sem Rede, Sem Jogo.</span>
          <div className="flex items-center gap-3">
            <span>Criado por</span>
            <a
              href="https://github.com/pedrosoares0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue/70 hover:text-brand-blue transition-colors font-bold flex items-center gap-1.5"
            >
              Pedro Soares
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
