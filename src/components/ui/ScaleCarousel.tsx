import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ScaleCarouselItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

export interface ScaleCarouselProps<ItemT extends ScaleCarouselItem = ScaleCarouselItem> {
  data?: ItemT[];
  itemWidth?: number;
  itemHeight?: number;
  spacing?: number;
  scaleRange?: [number, number, number];
  rotationRange?: [number, number, number];
  className?: string;
}

export const defaultProducts: ScaleCarouselItem[] = [
  {
    id: "4faixas",
    name: "4 Faixas",
    subtitle: "A Mais Pedida",
    image: "/4faixas.webp",
  },
  {
    id: "3faixas",
    name: "3 Faixas",
    subtitle: "A Clássica Praiana",
    image: "/3faixas3.webp",
  },
  {
    id: "orelha",
    name: "Orelha",
    subtitle: "Design Reforçado",
    image: "/img/catalog-orelha.webp",
  },
  {
    id: "profissional",
    name: "Profissional",
    subtitle: "Competições Oficiais",
    image: "/foto (1).jpeg",
  },
];

export default function ScaleCarousel<ItemT extends ScaleCarouselItem>({
  data = defaultProducts as unknown as ItemT[],
  spacing = 20,
  scaleRange = [1.6, 1, 1.6],
  rotationRange = [15, 0, -10],
  className = "",
}: ScaleCarouselProps<ItemT>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const total = data.length;

  // Medir largura do viewport dinamicamente
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;

  // Largura de cada card no carrossel
  const itemWidth = isMobile
    ? Math.min(containerWidth - 48, 360)
    : isTablet
    ? Math.min(containerWidth - 100, 560)
    : 720;

  const itemHeight = isMobile ? 380 : isTablet ? 450 : 500;
  const gap = spacing;

  const prev = useCallback(() => {
    setCurrentIndex((current) => (current === 0 ? total - 1 : current - 1));
  }, [total]);

  const next = useCallback(() => {
    setCurrentIndex((current) => (current === total - 1 ? 0 : current + 1));
  }, [total]);

  // Teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const diff = e.touches[0].clientX - dragStartX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (dragStartX.current === null) return;
    if (dragOffset < -45) next();
    else if (dragOffset > 45) prev();

    dragStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging || dragStartX.current === null) return;
    if (dragOffset < -50) next();
    else if (dragOffset > 50) prev();

    dragStartX.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Cálculo da translação do trilho centralizado
  const activeCenterOffset =
    currentIndex * (itemWidth + gap) + itemWidth / 2;
  const targetTranslateX =
    containerWidth / 2 - activeCenterOffset;

  // Progresso efetivo do scroll (inclui arrasto dinâmico)
  const currentScrollValue =
    currentIndex - dragOffset / (itemWidth + gap);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      aria-label="Catálogo de Modelos Toinho Redes"
      className={cn(
        "relative w-full max-w-[1400px] mx-auto select-none focus:outline-none overflow-hidden py-4",
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Abas Superiores de Seleção Rápida dos Modelos */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 px-4 flex-wrap">
        {data.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "px-4 sm:px-6 py-2 rounded-full font-sans text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all duration-300",
                isActive
                  ? "bg-brand-blue dark:bg-white text-white dark:text-brand-darkBlue shadow-lg shadow-brand-blue/20 scale-105"
                  : "bg-slate-200/70 dark:bg-white/5 text-brand-blue/60 dark:text-white/60 hover:text-brand-blue dark:hover:text-white hover:bg-slate-300/70 dark:hover:bg-white/10"
              )}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Trilho do Carrossel (Hardware accelerated) */}
      <div
        className={cn(
          "flex items-stretch py-4",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{
          transform: `translate3d(${targetTranslateX + dragOffset}px, 0, 0)`,
          transition: isDragging
            ? "none"
            : "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          gap: `${gap}px`,
        }}
      >
        {data.map((item, index) => {
          // Diferença relativa ao ponto de foco
          const diff = index - currentScrollValue;

          // Interpolação de Scale: [1.6, 1, 1.6]
          // index - 1 => 1.6 | index => 1.0 | index + 1 => 1.6
          const absDiff = Math.min(Math.abs(diff), 1);
          const currentScale =
            scaleRange[1] + absDiff * (scaleRange[0] - scaleRange[1]);

          // Interpolação de Rotação: [15, 0, -10]
          // diff > 0 (à direita): rotação positiva até rotationRange[0] (15deg)
          // diff < 0 (à esquerda): rotação negativa até rotationRange[2] (-10deg)
          let currentRotation = 0;
          if (diff > 0) {
            currentRotation = Math.min(diff, 1) * rotationRange[0];
          } else if (diff < 0) {
            currentRotation = Math.min(Math.abs(diff), 1) * rotationRange[2];
          }

          const isFocal = Math.abs(diff) < 0.5;

          return (
            <div
              key={item.id}
              onClick={() => {
                if (index !== currentIndex) setCurrentIndex(index);
              }}
              style={{
                width: `${itemWidth}px`,
                height: `${itemHeight}px`,
                transition: isDragging
                  ? "none"
                  : "opacity 400ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-3xl bg-slate-950 border border-white/10 shadow-2xl select-none",
                isFocal
                  ? "opacity-100 ring-1 ring-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.6)] z-20"
                  : "opacity-45 hover:opacity-75 scale-[0.93] cursor-pointer z-10"
              )}
            >
              {/* Imagem de Fundo com Escala e Rotação interpoladas */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  style={{
                    transform: `scale(${currentScale}) rotate(${currentRotation}deg)`,
                    transition: isDragging
                      ? "none"
                      : "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
                />
              )}

              {/* Gradiente escuro sobre a imagem para contraste limpo */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

              {/* Textos DIRETO SOBRE A FOTO (Letras Brancas e Azul Bebê) */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10 pointer-events-none flex flex-col">
                <span className="font-sans text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-brand-lightBlue drop-shadow-md mb-1 sm:mb-2">
                  {item.subtitle}
                </span>

                <h3 className="font-avenue text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none drop-shadow-xl">
                  {item.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controles Inferiores (Dots + Prev / Next) */}
      <div className="mt-6 flex items-center justify-between px-4 sm:px-8">
        {/* Dots de Paginação + Contador */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Ir para o modelo ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === currentIndex
                    ? "w-8 bg-brand-lightBlue shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                    : "w-2 bg-brand-blue/20 dark:bg-white/20 hover:bg-brand-blue/40 dark:hover:bg-white/40"
                )}
              />
            ))}
          </div>

          <span className="font-sans text-[11px] sm:text-xs font-bold text-brand-blue/50 dark:text-white/50 tracking-wider ml-2">
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Setas Prev / Next */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={prev}
            aria-label="Modelo anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-blue/15 dark:border-white/15 bg-white/80 dark:bg-brand-darkCard/80 backdrop-blur-md text-brand-blue dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Próximo modelo"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-blue/15 dark:border-white/15 bg-white/80 dark:bg-brand-darkCard/80 backdrop-blur-md text-brand-blue dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
