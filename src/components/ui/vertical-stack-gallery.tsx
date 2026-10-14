import { useState, useCallback, useRef } from "react";
import { motion, type PanInfo, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useIsMobile } from "@/lib/hooks";

interface Product {
  name: string;
  tag: string;
  badgeTop: string;
  description: string;
  material: string;
  features: string[];
  images: string[];
  whatsappUrl: string;
}

const products: Product[] = [
  {
    name: '3 Faixas',
    tag: 'A CLÁSSICA',
    badgeTop: 'PADRÃO PRAIANO',
    description: 'Rede profissional com tripla camada de reforço para máxima resistência e durabilidade.',
    material: '100% NYLON VIRGEM',
    features: ['Reforço Triplo', 'Proteção UV', 'Anti-Maresia'],
    images: ['/3faixas3.webp'],
    whatsappUrl: 'https://wa.me/5571987974822?text=Fala%20Toinho!%20Queria%20um%20or%C3%A7amento%20da%20rede%20de%203%20faixas.'
  },
  {
    name: '4 Faixas',
    tag: 'A MAIS PEDIDA',
    badgeTop: 'CAMPEÃ DE VENDAS',
    description: 'O máximo em durabilidade, tensão e estabilidade para jogos intensos e quadras de alto fluxo.',
    material: '100% NYLON VIRGEM',
    features: ['Máxima Tensão', 'Lona Especial', 'Alto Rendimento'],
    images: ['/4faixas.webp', '/4faixas2.webp'],
    whatsappUrl: 'https://wa.me/5571987974822?text=Fala%20Toinho!%20Queria%20saber%20mais%20sobre%20a%20rede%20de%204%20faixas.'
  },
  {
    name: 'Orelha',
    tag: 'ESTILIZADA',
    badgeTop: 'DESIGN REFORÇADO',
    description: 'Fixação lateral com abas reforçadas para ajuste milimétrico e zero deformação nos postes.',
    material: '100% NYLON VIRGEM',
    features: ['Fixação Lateral', 'Anti-Deformação', 'Design Exclusivo'],
    images: ['/img/catalog-orelha.webp'],
    whatsappUrl: 'https://wa.me/5571987974822?text=Fala%20Toinho!%20Queria%20saber%20mais%20sobre%20a%20rede%20orelha.'
  },
  {
    name: 'Profissional',
    tag: 'COMPETIÇÕES',
    badgeTop: 'OFICIAL CBV',
    description: 'Configuração de elite para campeonatos, arenas fechadas e grandes eventos esportivos.',
    material: '100% NYLON VIRGEM',
    features: ['Gabarito Oficial', 'Costura Dupla', 'Aço Galvanizado'],
    images: ['/foto (1).jpeg'],
    whatsappUrl: 'https://wa.me/5571987974822?text=Fala%20Toinho!%20Vou%20precisar%20de%20redes%20profissionais%20para%20um%20campeonato.'
  }
];

export function HorizontalStackGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const lastNavigationTime = useRef(0);
  const navigationCooldown = 450;

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now();
    if (now - lastNavigationTime.current < navigationCooldown) return;
    lastNavigationTime.current = now;

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === products.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? products.length - 1 : prev - 1;
    });
  }, []);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 40;
    if (info.offset.x < -threshold) {
      navigate(1);
    } else if (info.offset.x > threshold) {
      navigate(-1);
    }
  };

  const getDiff = (index: number) => {
    const total = products.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const getCardStyle = (index: number) => {
    const diff = getDiff(index);

    const offsets = isMobile
      ? { near: 200, far: 340, hidden: 500 }
      : { near: 440, far: 720, hidden: 1100 };

    const blur = (px: number) => (isMobile ? {} : { filter: `blur(${px}px)` });

    if (diff === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 10, rotateY: 0, ...blur(0) };
    } else if (diff === -1) {
      return { x: -offsets.near, scale: 0.88, opacity: 0.45, zIndex: 5, rotateY: 12, ...blur(2) };
    } else if (diff === -2) {
      return { x: -offsets.far, scale: 0.74, opacity: 0.18, zIndex: 2, rotateY: 24, ...blur(4) };
    } else if (diff === 1) {
      return { x: offsets.near, scale: 0.88, opacity: 0.45, zIndex: 5, rotateY: -12, ...blur(2) };
    } else if (diff === 2) {
      return { x: offsets.far, scale: 0.74, opacity: 0.18, zIndex: 2, rotateY: -24, ...blur(4) };
    }
    return { x: diff > 0 ? offsets.hidden : -offsets.hidden, scale: 0.5, opacity: 0, zIndex: 0, rotateY: diff > 0 ? -40 : 40, ...blur(8) };
  };

  const isVisible = (index: number) => Math.abs(getDiff(index)) <= (isMobile ? 1 : 2);

  const handleWhatsApp = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="stack-gallery-container"
      role="group"
      aria-roledescription="carrossel de modelos"
      aria-label="Modelos de redes esportivas Toinho"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'ArrowLeft') navigate(-1);
      }}
      className="relative flex h-[68svh] sm:h-[72svh] md:h-[720px] lg:h-[760px] w-full items-center justify-center overflow-hidden bg-transparent select-none outline-none"
    >
      {/* Botões de Navegação Flutuantes para Desktop */}
      <div className="hidden md:flex absolute inset-x-4 top-1/2 -translate-y-1/2 justify-between z-30 pointer-events-none max-w-[1240px] mx-auto w-full">
        <button
          onClick={() => navigate(-1)}
          aria-label="Modelo anterior"
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 dark:bg-black/60 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-lightBlue dark:hover:text-brand-darkBlue backdrop-blur-xl border border-black/10 dark:border-white/15 text-brand-blue dark:text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => navigate(1)}
          aria-label="Próximo modelo"
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 dark:bg-black/60 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-lightBlue dark:hover:text-brand-darkBlue backdrop-blur-xl border border-black/10 dark:border-white/15 text-brand-blue dark:text-white flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Card Stack */}
      <div className="relative flex h-[58svh] sm:h-[62svh] md:h-[620px] w-full items-center justify-center" style={{ perspective: "1400px" }}>
        {products.map((product, index) => {
          if (!isVisible(index)) return null;
          const style = getCardStyle(index);
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={product.name}
              className="absolute w-[90vw] max-w-[370px] sm:max-w-[420px] md:w-[860px] lg:w-[940px] md:max-w-none cursor-grab active:cursor-grabbing"
              animate={style}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 26,
                mass: 0.95,
              }}
              drag={isCurrent ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
                willChange: "transform, opacity",
              }}
            >
              <div
                className={`relative aspect-[4/5] md:aspect-[16/10] w-full overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-slate-950 border border-white/20 md:border-2 md:border-white/30 transition-all duration-500 ${
                  isCurrent
                    ? "shadow-[0_30px_70px_-15px_rgba(7,50,193,0.35)] md:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/20"
                    : "shadow-md opacity-90"
                }`}
              >
                {/* Imagem do Produto */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 object-cover w-full h-full pointer-events-none transition-transform duration-700 hover:scale-105"
                />

                {/* Scrims Escuros Graduais */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent h-28" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 z-30 flex items-center justify-between">
                  {/* Material Tag */}
                  <div className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 rounded-full shadow-md flex items-center gap-1.5">
                    <span className="text-white/80 text-[8px] md:text-[9px] font-sans font-bold uppercase tracking-[0.2em]">
                      {product.material}
                    </span>
                  </div>

                  {/* Top Right Status Badge */}
                  <div className="px-3 py-1 md:px-4 md:py-1.5 bg-brand-blue/80 backdrop-blur-md border border-brand-lightBlue/40 rounded-full shadow-lg flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-lightBlue animate-pulse" />
                    <span className="text-white text-[8px] md:text-[10px] font-sans font-black uppercase tracking-[0.2em]">
                      {product.badgeTop}
                    </span>
                  </div>
                </div>

                {/* Conteúdo do Card Ativo */}
                <AnimatePresence mode="wait">
                  {isCurrent && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute inset-0 p-5 sm:p-6 md:p-10 lg:p-12 flex flex-col justify-end items-center text-center z-20 pointer-events-none"
                    >
                      {/* Features Pills */}
                      <div className="hidden sm:flex items-center gap-2 mb-3">
                        {product.features.map((feat) => (
                          <span
                            key={feat}
                            className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[9px] md:text-[10px] font-sans font-semibold text-white/90 uppercase tracking-wider"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>

                      {/* Header Title */}
                      <div className="flex flex-col gap-1 mb-2 md:mb-3">
                        <span className="text-brand-lightBlue text-[9px] md:text-[11px] font-sans font-black uppercase tracking-[0.35em] drop-shadow-sm">
                          {product.tag}
                        </span>
                        <h3 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-avenue font-black uppercase tracking-tighter leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                          {product.name}
                        </h3>
                      </div>

                      {/* Descrição curta */}
                      <p className="text-white/80 text-[10px] sm:text-xs md:text-sm font-sans font-medium leading-relaxed max-w-sm md:max-w-md mb-4 sm:mb-6 line-clamp-2 md:line-clamp-none">
                        {product.description}
                      </p>

                      {/* Botão de Orçamento WhatsApp (Pointer-events auto) */}
                      <div className="pointer-events-auto">
                        <button
                          onClick={() => handleWhatsApp(product.whatsappUrl)}
                          className="inline-flex items-center gap-2.5 px-6 py-3 md:px-8 md:py-3.5 rounded-full bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 text-white font-sans font-black text-xs md:text-sm uppercase tracking-wider shadow-[0_12px_30px_-8px_rgba(34,197,94,0.6)] hover:shadow-[0_16px_36px_-6px_rgba(34,197,94,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 border border-green-300/40"
                        >
                          <FaWhatsapp className="text-lg md:text-xl text-white" />
                          <span>Fazer Orçamento</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Dots & Counter - Posicionados com folga e sem colisão */}
      <div className="absolute bottom-1 md:bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/20 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="p-1.5 group"
              aria-label={`Ir para produto ${index + 1}`}
              aria-current={index === currentIndex}
            >
              <span
                className={`block transition-all duration-500 rounded-full ${
                  index === currentIndex
                    ? "w-8 sm:w-10 h-1.5 bg-brand-blue dark:bg-brand-lightBlue"
                    : "w-1.5 h-1.5 bg-brand-blue/20 dark:bg-white/20 group-hover:bg-brand-blue/50"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Hint limpo, apenas mobile e espaçado */}
        <span className="md:hidden text-[9px] font-sans font-bold text-brand-blue/40 dark:text-white/40 uppercase tracking-[0.25em]">
          Arraste para o lado
        </span>
      </div>

      {/* Counter (Bottom Left) Desktop */}
      <div className="absolute left-8 md:left-12 bottom-6 z-20 hidden md:flex items-end gap-3">
        <span className="text-4xl lg:text-5xl font-avenue font-black text-brand-blue dark:text-white tabular-nums leading-none">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <div className="h-6 w-[1px] bg-brand-blue/20 dark:bg-white/20 mb-1.5" />
        <span className="text-xs font-sans font-black text-brand-blue/40 dark:text-white/40 tabular-nums mb-1.5">
          {String(products.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
