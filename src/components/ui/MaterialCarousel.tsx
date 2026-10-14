import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItemData {
  title: string;
  location: string;
  image: string;
}

export const galleryItems: CarouselItemData[] = [
  {
    title: "Clube Bahiano de Tênis",
    location: "Salvador, BA",
    image: "/img/gallery-clube-baiano.webp",
  },
  {
    title: "Federação Baiana de Futevôlei",
    location: "Bahia",
    image: "/foto (5).webp",
  },
  {
    title: "Mali",
    location: "Salvador, BA",
    image: "/img/gallery-mali.webp",
  },
  {
    title: "Bahia Open Futevôlei",
    location: "Lauro de Freitas, BA",
    image: "/img/gallery-bahia-open.webp",
  },
  {
    title: "AABB - Associação Atlética",
    location: "Salvador, Valença, Itabuna - BA",
    image: "/4faixas2.webp",
  },
];

interface MaterialCarouselProps {
  items?: CarouselItemData[];
  className?: string;
}

export default function MaterialCarousel({
  items = galleryItems,
  className = "",
}: MaterialCarouselProps) {
  const maliIndex = items.findIndex((item) =>
    item.title.toLowerCase().includes("mali")
  );
  const [activeIndex, setActiveIndex] = useState(
    maliIndex !== -1 ? maliIndex : 0
  );
  const [containerWidth, setContainerWidth] = useState(1200);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const total = items.length;

  // Medir largura do container dinamicamente
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

  const prev = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? total - 1 : current - 1));
  }, [total]);

  const next = useCallback(() => {
    setActiveIndex((current) => (current === total - 1 ? 0 : current + 1));
  }, [total]);

  // Navegação por teclado
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

  // Cálculo das larguras e gaps seguindo as proporções do Material 3 Carousel
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;

  const gap = isMobile ? 12 : 20;

  const getItemWidth = useCallback(
    (index: number, active: number) => {
      const diff = Math.abs(index - active);
      if (diff === 0) {
        // Focal Card (Hero)
        if (isMobile) return Math.min(containerWidth - 64, 340);
        if (isTablet) return 480;
        return 640;
      }
      if (diff === 1) {
        // Medium Card
        if (isMobile) return 72;
        if (isTablet) return 130;
        return 180;
      }
      // Small Card
      if (isMobile) return 40;
      if (isTablet) return 70;
      return 100;
    },
    [isMobile, isTablet, containerWidth]
  );

  // Calcula o offset para manter o card ativo perfeitamente centralizado
  let offsetToActive = 0;
  for (let i = 0; i < activeIndex; i++) {
    offsetToActive += getItemWidth(i, activeIndex) + gap;
  }
  const activeWidth = getItemWidth(activeIndex, activeIndex);
  const targetTranslateX =
    containerWidth / 2 - (offsetToActive + activeWidth / 2);

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

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      aria-label="Carrossel de Arenas em Quadra"
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
      {/* Trilho Deslizante (Hardware accelerated translate3d) */}
      <div
        className={cn(
          "flex items-center py-4",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{
          transform: `translate3d(${targetTranslateX + dragOffset}px, 0, 0)`,
          transition: isDragging
            ? "none"
            : "transform 550ms cubic-bezier(0.16, 1, 0.3, 1)",
          gap: `${gap}px`,
        }}
      >
        {items.map((item, index) => {
          const diff = Math.abs(index - activeIndex);
          const isFocal = diff === 0;
          const isMedium = diff === 1;
          const itemWidth = getItemWidth(index, activeIndex);

          return (
            <div
              key={item.title}
              onClick={() => setActiveIndex(index)}
              role="button"
              aria-label={`${item.title} - ${item.location}`}
              tabIndex={0}
              style={{
                width: `${itemWidth}px`,
                transition: isDragging
                  ? "none"
                  : "width 550ms cubic-bezier(0.16, 1, 0.3, 1), transform 550ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease",
              }}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl",
                "h-[390px] sm:h-[460px] md:h-[520px] lg:h-[560px]",
                "border border-brand-blue/10 dark:border-white/10",
                isFocal &&
                  "scale-100 opacity-100 shadow-2xl ring-1 ring-white/20 z-20",
                isMedium &&
                  "scale-[0.94] opacity-70 hover:opacity-90 shadow-md ring-1 ring-white/10 z-10",
                !isFocal &&
                  !isMedium &&
                  "scale-[0.88] opacity-40 hover:opacity-60 shadow-sm ring-1 ring-white/5 z-0"
              )}
            >
              {/* Imagem com zoom sutil no card focal */}
              <img
                src={item.image}
                alt={item.title}
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className={cn(
                  "h-full w-full object-cover object-center transition-transform duration-700 ease-out",
                  isFocal ? "scale-105" : "scale-100"
                )}
              />

              {/* Overlay de gradiente */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 transition-opacity duration-500",
                  isFocal
                    ? "bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-95"
                    : "bg-slate-950/60 opacity-100"
                )}
              />

              {/* Informações da Arena (apenas no card focal com transição suave) */}
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-9 pointer-events-none transition-all duration-500",
                  isFocal
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-3.5 w-3.5 text-brand-lightBlue drop-shadow shrink-0" />
                  <p className="font-sans text-[10px] sm:text-xs font-black uppercase tracking-[0.28em] text-brand-lightBlue drop-shadow-md">
                    {item.location}
                  </p>
                </div>

                <h3 className="font-avenue text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-[0.9] tracking-tight text-white drop-shadow-xl max-w-xl">
                  {item.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controles de Navegação (Dots e Setas) */}
      <div className="mt-4 sm:mt-6 flex items-center justify-between px-4 sm:px-8">
        {/* Indicador de Dots + Contador Numérico */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Ir para o slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "w-7 sm:w-8 bg-brand-lightBlue shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                    : "w-2 bg-brand-blue/20 dark:bg-white/20 hover:bg-brand-blue/40 dark:hover:bg-white/40"
                )}
              />
            ))}
          </div>

          <span className="font-sans text-[10px] sm:text-xs font-bold text-brand-blue/50 dark:text-white/50 tracking-wider ml-2">
            {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Botões Prev / Next */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={prev}
            aria-label="Arena anterior"
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-brand-blue/15 dark:border-white/15 bg-white/80 dark:bg-brand-darkCard/80 backdrop-blur-md text-brand-blue dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Próxima arena"
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-brand-blue/15 dark:border-white/15 bg-white/80 dark:bg-brand-darkCard/80 backdrop-blur-md text-brand-blue dark:text-white shadow-sm hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
