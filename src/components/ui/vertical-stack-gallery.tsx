import { useState, useCallback, useRef, useEffect } from "react";
import { motion, type PanInfo, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

interface Product {
  name: string;
  tag: string;
  badgeTop: string;
  description: string;
  material: string;
  images: string[];
}

const products: Product[] = [
  {
    name: '3 Faixas',
    tag: 'A CLÁSSICA',
    badgeTop: 'PADRÃO',
    description: 'Rede profissional com tripla camada de reforço para máxima resistência.',
    material: '100% NYLON',
    images: ['https://anotabahia.com/wp-content/uploads/2022/11/anotabahia-bahia-open-de-futevolei-bahia-open-de-futevolei.jpg']
  },
  {
    name: '4 Faixas',
    tag: 'A MAIS PEDIDA',
    badgeTop: 'CAMPEÃ DE VENDAS',
    description: 'O máximo em durabilidade e tensão para jogos intensos e profissionais.',
    material: '100% NYLON',
    images: ['4faixas.png', '4faixas2.png']
  },
  {
    name: 'Orelha',
    tag: 'ESTILIZADA',
    badgeTop: 'DESIGN',
    description: 'Design clássico com fixação reforçada nas extremidades para maior estabilidade.',
    material: '100% NYLON',
    images: ['https://6d995b8381.cbaul-cdnwnd.com/38958216990b58d66c8d7fd8b0c6ff46/200000301-ad357ae2f3/IMG_5107-9.JPG?ph=6d995b8381']
  },
  {
    name: 'Profissional',
    tag: 'OFICIAIS',
    badgeTop: 'COMPETIÇÕES',
    description: 'Instalação de elite para grandes jogos e competições oficiais.',
    material: '100% NYLON',
    images: ['foto (1).jpeg']
  }
];

export function HorizontalStackGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const lastNavigationTime = useRef(0);
  const navigationCooldown = 600;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      navigate(1);
    } else if (info.offset.x > threshold) {
      navigate(-1);
    }
  };

  const getCardStyle = (index: number) => {
    const total = products.length;
    let diff = index - currentIndex;
    
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Mobile uses smaller offsets so adjacent cards peek from edges
    const offsets = isMobile
      ? { near: 220, far: 380, hidden: 600 }
      : { near: 450, far: 750, hidden: 1200 };

    if (diff === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 10, rotateY: 0, filter: "blur(0px)" };
    } else if (diff === -1) {
      return { x: -offsets.near, scale: 0.85, opacity: 0.4, zIndex: 5, rotateY: 15, filter: "blur(2px)" };
    } else if (diff === -2) {
      return { x: -offsets.far, scale: 0.7, opacity: 0.15, zIndex: 2, rotateY: 30, filter: "blur(4px)" };
    } else if (diff === 1) {
      return { x: offsets.near, scale: 0.85, opacity: 0.4, zIndex: 5, rotateY: -15, filter: "blur(2px)" };
    } else if (diff === 2) {
      return { x: offsets.far, scale: 0.7, opacity: 0.15, zIndex: 2, rotateY: -30, filter: "blur(4px)" };
    } else {
      return { x: diff > 0 ? offsets.hidden : -offsets.hidden, scale: 0.5, opacity: 0, zIndex: 0, rotateY: diff > 0 ? -45 : 45, filter: "blur(8px)" };
    }
  };

  const isVisible = (index: number) => {
    const total = products.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  const handleWhatsApp = (productName: string) => {
    const message = encodeURIComponent(`Olá! Gostaria de fazer um orçamento para o modelo: ${productName}`);
    window.open(`https://wa.me/5571992144574?text=${message}`, '_blank');
  };

  return (
    <div id="stack-gallery-container" className="relative flex h-[70svh] md:h-[90vh] w-full items-center justify-center overflow-hidden bg-transparent select-none">
      <style>{`
        .budget-button { 
          --black-700: hsla(0 0% 12% / 1); 
          --border_radius: 9999px; 
          --transtion: 0.3s ease-in-out; 
          --offset: 2px; 
          cursor: pointer; 
          position: relative; 
          display: flex; 
          align-items: center; 
          gap: 0.5rem; 
          transform-origin: center; 
          padding: 1.2rem 2.5rem; 
          background-color: transparent; 
          border: none; 
          border-radius: var(--border_radius); 
          transform: scale(calc(1 + (var(--active, 0) * 0.1))); 
          transition: transform var(--transtion); 
          z-index: 10;
        } 
        .budget-button::before { 
          content: ""; 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%); 
          width: 100%; 
          height: 100%; 
          background-color: var(--black-700); 
          border-radius: var(--border_radius); 
          box-shadow: inset 0 0.5px hsl(0, 0%, 100%), inset 0 -1px 2px 0 hsl(0, 0%, 0%), 
            0px 4px 10px -4px hsla(0 0% 0% / calc(1 - var(--active, 0))), 
            0 0 0 calc(var(--active, 0) * 0.375rem) rgba(0, 0, 0, 0.1); 
          transition: all var(--transtion); 
          z-index: 0; 
        } 
        .budget-button::after { 
          content: ""; 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%); 
          width: 100%; 
          height: 100%; 
          background-color: hsla(210, 100%, 50%, 0.75); 
          background-image: radial-gradient( 
              at 51% 89%, 
              hsla(210, 100%, 74%, 1) 0px, 
              transparent 50% 
            ), 
            radial-gradient(at 100% 100%, hsla(210, 100%, 60%, 1) 0px, transparent 50%), 
            radial-gradient(at 22% 91%, hsla(210, 100%, 60%, 1) 0px, transparent 50%); 
          background-position: top; 
          opacity: var(--active, 0); 
          border-radius: var(--border_radius); 
          transition: opacity var(--transtion); 
          z-index: 2; 
        } 
        .budget-button:is(:hover, :focus-visible) { 
          --active: 1; 
        } 
        .budget-button:active { 
          transform: scale(1); 
        } 
        .budget-button .dots_border { 
          --size_border: calc(100% + 2px); 
          overflow: hidden; 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          transform: translate(-50%, -50%); 
          width: var(--size_border); 
          height: var(--size_border); 
          background-color: transparent; 
          border-radius: var(--border_radius); 
          z-index: -10; 
        } 
        .budget-button .dots_border::before { 
          content: ""; 
          position: absolute; 
          top: 30%; 
          left: 50%; 
          transform: translate(-50%, -50%); 
          transform-origin: left; 
          transform: rotate(0deg); 
          width: 100%; 
          height: 2rem; 
          background-color: white; 
          mask: linear-gradient(transparent 0%, white 120%); 
          -webkit-mask: linear-gradient(transparent 0%, white 120%);
          animation: rotate 2s linear infinite; 
        } 
        @keyframes rotate { 
          to { transform: rotate(360deg); } 
        } 
        .budget-button .sparkle { 
          position: relative; 
          z-index: 10; 
          width: 1.75rem; 
        } 
        .budget-button .sparkle .path { 
          fill: currentColor; 
          stroke: currentColor; 
          transform-origin: center; 
          color: hsl(0, 0%, 100%); 
        } 
        .budget-button:is(:hover, :focus) .sparkle .path { 
          animation: path 1.5s linear 0.5s infinite; 
        } 
        .budget-button .sparkle .path:nth-child(1) { --scale_path_1: 1.2; } 
        .budget-button .sparkle .path:nth-child(2) { --scale_path_2: 1.2; } 
        .budget-button .sparkle .path:nth-child(3) { --scale_path_3: 1.2; } 
        @keyframes path { 
          0%, 34%, 71%, 100% { transform: scale(1); } 
          17% { transform: scale(var(--scale_path_1, 1)); } 
          49% { transform: scale(var(--scale_path_2, 1)); } 
          83% { transform: scale(var(--scale_path_3, 1)); } 
        } 
        .budget-button .text_button { 
          position: relative; 
          z-index: 10; 
          background-image: linear-gradient( 
            90deg, 
            hsla(0 0% 100% / 1) 0%, 
            hsla(0 0% 100% / var(--active, 0)) 120% 
          ); 
          background-clip: text; 
          -webkit-background-clip: text;
          font-size: 1rem; 
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: transparent; 
        }
      `}</style>
      
      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-black/[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Card Stack */}
      <div className="relative flex h-[60svh] md:h-[700px] w-full items-center justify-center" style={{ perspective: "1500px" }}>
        {products.map((product, index) => {
          if (!isVisible(index)) return null;
          const style = getCardStyle(index);
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={product.name}
              className="absolute w-[88vw] max-w-[380px] md:w-[920px] md:max-w-none"
              animate={{
                x: style.x,
                scale: style.scale,
                opacity: style.opacity,
                rotateY: style.rotateY,
                zIndex: style.zIndex,
                filter: style.filter,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
                mass: 1,
              }}
              drag={isCurrent ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              style={{
                transformStyle: "preserve-3d",
                zIndex: style.zIndex,
              }}
            >
              <div
                className={`relative aspect-[4/5] md:aspect-[16/10] w-full overflow-hidden rounded-2xl md:rounded-[4.5rem] bg-black border border-white/15 md:border-2 md:border-white transition-shadow duration-500 ${
                  isCurrent ? "md:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)]" : "shadow-none"
                }`}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="absolute inset-0 object-cover w-full h-full pointer-events-none"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Premium Badge (Top Right) */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30">
                  <div className="px-3 py-1 md:px-4 md:py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-lightBlue animate-pulse" />
                    <span className="text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                      {product.badgeTop}
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isCurrent && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute inset-0 p-5 pb-6 md:p-12 flex flex-col justify-end items-center text-center"
                    >
                      <div className="flex flex-col gap-1 md:gap-2 mb-4 md:mb-8">
                        <p className="text-white/60 text-[9px] md:text-xs font-sans font-black uppercase tracking-[0.4em]">
                          {product.tag}
                        </p>
                        <h3 className="text-white text-4xl md:text-7xl font-avenue font-black uppercase tracking-tighter leading-none">
                          {product.name}
                        </h3>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={() => handleWhatsApp(product.name)}
                          className="budget-button"
                        >
                          <div className="dots_border" /> 
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="sparkle"> 
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black" fill="black" d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z" /> 
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black" fill="black" d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z" /> 
                            <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black" fill="black" d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z" /> 
                          </svg> 
                          <span className="text_button">Fazer orçamento</span> 
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

      {/* Navigation Dots (Bottom) */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentIndex 
                ? "w-10 h-1.5 bg-brand-blue" 
                : "w-1.5 h-1.5 bg-brand-blue/20 hover:bg-brand-blue/40"
            }`}
            aria-label={`Ir para produto ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter (Bottom Left) */}
      <div className="absolute left-8 md:left-12 bottom-8 z-20 hidden md:flex items-end gap-3">
        <span className="text-5xl font-avenue font-black text-brand-blue tabular-nums leading-none">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <div className="h-8 w-[1px] bg-brand-blue/10 mb-2" />
        <span className="text-sm font-sans font-black text-brand-blue/30 tabular-nums mb-2">
          {String(products.length).padStart(2, "0")}
        </span>
      </div>

      {/* Instruction Hint */}
      <motion.div
        className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-sans font-black text-brand-blue/40 uppercase tracking-[0.3em]">
            Arraste para navegar
          </span>
        </div>
      </motion.div>
    </div>
  );
}
