import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

// Imagens servidas do próprio site (public/img) — geradas por `npm run optimize:images`
export const galleryImages = [
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
    title: "Praiana",
    location: "Salvador, BA",
    image: "/img/gallery-praiana.webp",
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

export type GalleryItem = (typeof galleryImages)[number];

// Enquadramentos verticais próprios para o mobile
const MOBILE_IMAGE_OVERRIDES: Partial<Record<GalleryItem["title"], string>> = {
  Mali: "/img/gallery-mali-mobile.webp",
  "Bahia Open Futevôlei": "/img/gallery-bahia-open-mobile.webp",
};

/** Intensidade do efeito de profundidade do stack mobile */
const DEPTH_SCALE = 0.08;
const DEPTH_SHADE = 0.55;

/**
 * Mobile: cada slide gruda no topo até o próximo cobrir por cima.
 */
export function MobileStickyStackGallery({ items }: { items: GalleryItem[] }) {
  const total = items.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const last: number[] = new Array(total).fill(-1);
    let ticking = false;
    let raf = 0;

    const update = () => {
      ticking = false;
      const slideH = slideRefs.current[0]?.offsetHeight || window.innerHeight;
      const rect = container.getBoundingClientRect();

      if (rect.bottom < -slideH || rect.top > window.innerHeight + slideH) return;

      const scrolled = -rect.top / slideH;

      for (let i = 0; i < total; i++) {
        const p = Math.min(1, Math.max(0, scrolled - i));
        const q = Math.round(p * 500) / 500;
        if (q === last[i]) continue;
        last[i] = q;

        const card = cardRefs.current[i];
        const shade = shadeRefs.current[i];
        if (card) card.style.transform = `scale(${1 - DEPTH_SCALE * q})`;
        if (shade) shade.style.opacity = String(DEPTH_SHADE * q);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [total]);

  return (
    <div ref={containerRef} className="relative isolate md:hidden motion-reduce:hidden">
      {items.map((item, idx) => (
        <div
          key={item.title}
          ref={(el) => {
            slideRefs.current[idx] = el;
          }}
          className="sticky top-0 h-svh w-full px-4 py-5"
          style={{ zIndex: idx + 1 }}
        >
          <div
            ref={(el) => {
              cardRefs.current[idx] = el;
            }}
            className={cn(
              "relative mx-auto h-[84svh] w-full max-w-md overflow-hidden rounded-3xl bg-brand-darkBlue shadow-2xl ring-1 ring-white/10 will-change-transform [transform-origin:50%_30%]"
            )}
          >
            <img
              className="absolute inset-0 z-0 h-full w-full object-cover object-center"
              src={MOBILE_IMAGE_OVERRIDES[item.title] ?? item.image}
              alt={item.title}
              loading={idx < 2 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />

            {/* Gradiente escuro para contraste puro */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-black/95 via-black/50 to-transparent"
              aria-hidden
            />

            {/* Conteúdo inferior: apenas localização e título */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pb-8">
              <div className="mb-2 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-brand-lightBlue shrink-0" />
                <p className="font-sans text-[11px] font-black uppercase tracking-[0.3em] text-brand-lightBlue drop-shadow-md">
                  {item.location}
                </p>
              </div>

              <h3 className="font-avenue text-2xl font-black uppercase leading-[0.95] tracking-tight text-white drop-shadow-lg">
                {item.title}
              </h3>
            </div>

            {/* Véu de profundidade */}
            <div
              ref={(el) => {
                shadeRefs.current[idx] = el;
              }}
              className="pointer-events-none absolute inset-0 z-30 bg-black opacity-0"
              aria-hidden
            />
          </div>
        </div>
      ))}
      <div className="h-svh" aria-hidden />
    </div>
  );
}

function MobileStaticGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="hidden flex-col gap-4 px-6 md:hidden motion-reduce:flex">
      {items.map((item) => (
        <article
          key={item.title}
          className="relative h-64 overflow-hidden rounded-2xl shadow-sm ring-1 ring-brand-blue/10"
        >
          <img
            className="h-full w-full object-cover object-center"
            src={MOBILE_IMAGE_OVERRIDES[item.title] ?? item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="mb-2 flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-brand-lightBlue" />
              <p className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-lightBlue">
                {item.location}
              </p>
            </div>
            <h3 className="font-avenue text-xl font-black uppercase tracking-tight text-white">
              {item.title}
            </h3>
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * Desktop: Accordion limpo e editorial.
 * Sem números em bolinhas e sem tags poluídas.
 * Apenas o visual imersivo da foto, nome da arena e localização.
 */
function DesktopAccordionGallery({ items }: { items: GalleryItem[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="hidden h-[620px] w-full max-w-[1400px] flex-row items-center gap-3.5 md:flex">
      {items.map((item, idx) => {
        const isActive = activeIdx === idx;

        return (
          <div
            key={item.title}
            onClick={() => setActiveIdx(idx)}
            onMouseEnter={() => setActiveIdx(idx)}
            onFocus={() => setActiveIdx(idx)}
            tabIndex={0}
            role="button"
            aria-label={`${item.title} - ${item.location}`}
            className={cn(
              "group relative h-full overflow-hidden rounded-3xl cursor-pointer select-none",
              "transition-[flex,box-shadow,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isActive
                ? "flex-[4] shadow-2xl ring-1 ring-white/20"
                : "flex-[0.85] hover:flex-[1.1] shadow-md ring-1 ring-white/10 opacity-80 hover:opacity-100"
            )}
          >
            <img
              className={cn(
                "h-full w-full object-cover object-center transition-transform duration-700 ease-out",
                isActive ? "scale-105" : "scale-100 group-hover:scale-105"
              )}
              src={item.image}
              alt={item.title}
              loading={idx < 2 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
            />

            {/* Overlay gradiente suave */}
            <div
              className={cn(
                "pointer-events-none absolute inset-0 transition-opacity duration-500",
                isActive
                  ? "bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent opacity-100"
                  : "bg-slate-950/50 group-hover:bg-slate-950/30 opacity-100"
              )}
            />

            {/* Card Expandido: Somente Localização e Título imponente */}
            {isActive && (
              <div className="absolute inset-x-0 bottom-0 z-20 p-8 lg:p-10 pointer-events-none">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-lightBlue drop-shadow" />
                    <p className="font-sans text-xs font-black uppercase tracking-[0.3em] text-brand-lightBlue drop-shadow-md">
                      {item.location}
                    </p>
                  </div>

                  <h3 className="font-avenue text-3xl lg:text-5xl font-black uppercase leading-[0.9] tracking-tight text-white drop-shadow-xl max-w-2xl">
                    {item.title}
                  </h3>
                </div>
              </div>
            )}

            {/* Card Colapsado: Título vertical editorial limpo */}
            {!isActive && (
              <div className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-none">
                <span className="[writing-mode:vertical-rl] rotate-180 font-avenue text-lg lg:text-xl font-black uppercase tracking-wider text-white/80 group-hover:text-white transition-colors truncate max-h-[440px] drop-shadow-md">
                  {item.title}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ImageGallery() {
  return (
    <>
      <MobileStaticGallery items={galleryImages} />
      <DesktopAccordionGallery items={galleryImages} />
    </>
  );
}


