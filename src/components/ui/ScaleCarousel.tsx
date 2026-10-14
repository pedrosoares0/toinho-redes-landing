import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface ScaleCarouselItem {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  tag: string;
  description: string;
  material: string;
  specs: string[];
  image: string;
  whatsappUrl: string;
}

export interface ScaleCarouselProps<ItemT extends ScaleCarouselItem = ScaleCarouselItem> {
  data?: ItemT[];
  renderItem?: ({ item, index }: { item: ItemT; index: number }) => ReactNode;
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
    subtitle: "A Mais Pedida do Brasil",
    badge: "CAMPEÃ DE VENDAS",
    tag: "A MAIS PEDIDA",
    description:
      "O modelo mais resistente do mercado. Quatro faixas reforçadas que garantem tensão perfeita, sem afrouxar com o impacto de bolas potentes.",
    material: "100% NYLON VIRGEM",
    specs: ["Tensão Máxima", "4 Faixas Reforçadas", "Proteção Solar UV", "Acabamento Militar"],
    image: "/4faixas.webp",
    whatsappUrl:
      "https://wa.me/5571987974822?text=Fala%20Toinho!%20Queria%20saber%20mais%20sobre%20a%20rede%20de%204%20faixas.",
  },
  {
    id: "3faixas",
    name: "3 Faixas",
    subtitle: "A Clássica Praiana",
    badge: "PADRÃO PRAIANO",
    tag: "A CLÁSSICA",
    description:
      "Rede profissional com tripla camada de reforço nas faixas superior e laterais. Ideal para treinos e jogos de futevôlei e vôlei de praia.",
    material: "100% NYLON VIRGEM",
    specs: ["Triplo Reforço", "Proteção Solar UV", "Anti-Maresia", "Lona Impermeável"],
    image: "/3faixas3.webp",
    whatsappUrl:
      "https://wa.me/5571987974822?text=Fala%20Toinho!%20Queria%20um%20or%C3%A7amento%20da%20rede%20de%203%20faixas.",
  },
  {
    id: "orelha",
    name: "Orelha",
    subtitle: "Design com Abas de Ajuste",
    badge: "DESIGN REFORÇADO",
    tag: "ESTILIZADA",
    description:
      "Fixação lateral anatômica com abas reforçadas em formato 'orelha'. Ajuste milimétrico sem deformação nos postes de madeira ou ferro.",
    material: "100% NYLON VIRGEM",
    specs: ["Fixação Anatômica", "Zero Deformação", "Costura Trançada", "Proteção UV"],
    image: "/img/catalog-orelha.webp",
    whatsappUrl:
      "https://wa.me/5571987974822?text=Fala%20Toinho!%20Queria%20saber%20mais%20sobre%20a%20rede%20orelha.",
  },
  {
    id: "profissional",
    name: "Profissional",
    subtitle: "Padrão de Competições",
    badge: "OFICIAL TORNEIOS",
    tag: "COMPETIÇÕES",
    description:
      "Configuração de elite homologada para campeonatos oficiais e grandes arenas. Cabo interno de aço encapado e malha de alta densidade.",
    material: "100% NYLON VIRGEM",
    specs: ["Cabo de Aço Encapado", "Malha Oficial CBV", "Costura Dupla", "Anti-UV"],
    image: "/foto (1).jpeg",
    whatsappUrl:
      "https://wa.me/5571987974822?text=Fala%20Toinho!%20Vou%20precisar%20de%20redes%20profissionais%20para%20um%20campeonato.",
  },
];

export default function ScaleCarousel<ItemT extends ScaleCarouselItem>({
  data = defaultProducts as unknown as ItemT[],
  renderItem,
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
    ? Math.min(containerWidth - 32, 360)
    : isTablet
    ? Math.min(containerWidth - 80, 580)
    : 720;

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
    if (dragOffset < -50) next();
    else if (dragOffset > 50) prev();

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
                transition: isDragging
                  ? "none"
                  : "opacity 400ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={cn(
                "shrink-0 flex flex-col rounded-3xl bg-white dark:bg-brand-darkCard/85 border border-brand-blue/10 dark:border-white/10 overflow-hidden shadow-xl",
                isFocal
                  ? "opacity-100 ring-1 ring-brand-blue/20 dark:ring-white/20 shadow-2xl"
                  : "opacity-60 hover:opacity-85 scale-[0.96]"
              )}
            >
              {/* Image Container com Scale & Rotation interpolados */}
              <div
                style={{
                  height: isMobile ? "260px" : isTablet ? "320px" : "360px",
                }}
                className="relative w-full overflow-hidden bg-slate-950 flex items-center justify-center select-none"
              >
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
                    className="h-full w-full object-cover object-center will-change-transform"
                  />
                )}

                {/* Badge Superior */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-brand-blue/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-sans font-black uppercase tracking-[0.22em] text-white border border-white/15 shadow-sm">
                    {item.badge}
                  </span>
                </div>

                {/* Gradiente inferior suave para contraste */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
              </div>

              {/* Conteúdo do Item (renderItem ou default) */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                {renderItem ? (
                  renderItem({ item, index })
                ) : (
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="font-sans text-[11px] font-black uppercase tracking-[0.25em] text-brand-lightBlue">
                        {item.tag}
                      </span>
                      <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-blue/50 dark:text-white/40">
                        {item.material}
                      </span>
                    </div>

                    <h3 className="font-avenue text-3xl sm:text-4xl md:text-5xl font-black uppercase text-brand-blue dark:text-white tracking-tight leading-none mb-2">
                      {item.name}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-brand-blue/70 dark:text-white/70 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Especificações em Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.specs.map((spec) => (
                        <span
                          key={spec}
                          className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-brand-blue/10 dark:border-white/10 font-sans text-[10px] font-bold uppercase tracking-wider text-brand-blue/80 dark:text-white/80"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Botão de Solicitação Direta via WhatsApp */}
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-4 border-t border-brand-blue/10 dark:border-white/10">
                      <a
                        href={item.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-black text-xs uppercase tracking-[0.16em] shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 active:scale-95"
                      >
                        <FaWhatsapp className="h-4 w-4" />
                        Pedir pelo WhatsApp
                      </a>

                      <span className="font-sans text-[11px] font-black uppercase tracking-widest text-brand-blue/50 dark:text-white/50">
                        Fabricação Sob Medida
                      </span>
                    </div>
                  </div>
                )}
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
