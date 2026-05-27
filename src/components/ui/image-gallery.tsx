import { cn } from "@/lib/utils";

export const galleryImages = [
  {
    title: "Clube Bahiano de Tênis",
    location: "Salvador, BA",
    image:
      "https://anotabahia.com/wp-content/uploads/2024/09/anotabahia-clube-baiano-de-tenis-recebe-o-ace-open-moura-dubeux-2024-whatsapp-image-2024-09-03-at-13.33.15-1200x800.jpeg",
  },
  {
    title: "Federação Baiana de Futevôlei",
    location: "Bahia",
    image: "foto (5).png",
  },
  {
    title: "Praiana",
    location: "Salvador, BA",
    image:
      "https://www.bahianoticias.com.br/fotos/hall_noticias/4901/mg/Soft%20opening%20Praiana_3.jpg",
  },
  {
    title: "Mali",
    location: "Salvador, BA",
    image:
      "https://cloudfront-us-east-1.images.arcpublishing.com/newr7/ZGVOOLIAXZDTNEBCOCTQGVCF4E.jpg",
  },
  {
    title: "BAHIA OPEN FUTEVOLEI",
    location: "lAURO DE FREITAS, BA",
    image:
      "https://anotabahia.com/wp-content/uploads/2022/11/anotabahia-bahia-open-de-futevolei-bahia-open-de-futevolei.jpg",
  },
  {
    title: "AABB - ASSOCIAÇÃO ATLÉTICA BANCO DO BRASIL",
    location: "SALVADOR, VALENÇA, ITABUNA - BA",
    image: "4faixas2.png",
  },
];

type GalleryItem = (typeof galleryImages)[number];

const MOBILE_IMAGE_OVERRIDES: Partial<Record<GalleryItem["title"], string>> = {
  Praiana:
    "https://www.bahianoticias.com.br/fotos/hall_noticias/4901/mg/Soft%20opening%20Praiana_3.jpg",
  Mali:
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/915c1b135567345.67b75ec924309.jpg",
  "BAHIA OPEN FUTEVOLEI":
    "https://canalgarra.com.br/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-08-at-14.27.29.jpeg.webp",
};

/** Mobile: cada slide gruda no topo até o próximo cobrir por cima */
export function MobileStickyStackGallery({ items }: { items: GalleryItem[] }) {
  const total = items.length;

  return (
    <div className="relative isolate md:hidden motion-reduce:hidden">
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="sticky top-0 h-svh w-full px-4 py-5"
          style={{ zIndex: idx + 1 }}
        >
          <div
            className={cn(
              "relative mx-auto h-[84svh] w-full max-w-md overflow-hidden rounded-3xl bg-transparent"
            )}
          >
            <img
              className="absolute inset-0 z-0 h-full w-full object-cover object-center"
              src={MOBILE_IMAGE_OVERRIDES[item.title] ?? item.image}
              alt={item.title}
              loading={idx < 2 ? "eager" : "lazy"}
            />

            {/* Só escurece a base — imagem permanece natural no resto */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
              aria-hidden
            />

            <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-3 py-1.5 backdrop-blur-sm">
              <span className="font-sans text-[9px] font-black uppercase tracking-[0.35em] text-white">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-white/40">/</span>
              <span className="font-sans text-[9px] font-black uppercase tracking-[0.35em] text-white/70">
                {String(total).padStart(2, "0")}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pb-12">
              <p className="mb-2 font-sans text-[10px] font-black uppercase tracking-[0.35em] text-brand-lightBlue drop-shadow-md">
                {item.location}
              </p>
              <h3 className="font-avenue text-2xl font-black uppercase leading-[0.95] tracking-tight text-white drop-shadow-lg">
                {item.title}
              </h3>
            </div>

            {idx === 0 && (
              <p
                className="absolute bottom-4 left-0 right-0 z-20 text-center font-sans text-[9px] font-black uppercase tracking-[0.4em] text-white/80 drop-shadow-md"
                aria-hidden
              >
                Role para a próxima
              </p>
            )}
          </div>
        </div>
      ))}
      {/* Permite scrollar além do último slide sticky */}
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
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6">
            <p className="mb-2 font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-lightBlue">
              {item.location}
            </p>
            <h3 className="font-avenue text-xl font-black uppercase tracking-tight text-white">
              {item.title}
            </h3>
          </div>
        </article>
      ))}
    </div>
  );
}

function DesktopAccordionGallery({ items }: { items: GalleryItem[] }) {
  return (
    <div className="hidden h-[600px] w-full max-w-7xl flex-row items-center gap-3 md:flex">
      {items.map((item, idx) => (
        <div
          key={item.title}
          className={cn(
            "group relative h-full w-24 flex-grow cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all duration-500 ease-in-out hover:w-[600px] hover:shadow-2xl"
          )}
        >
          <img
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            src={item.image}
            alt={item.title}
            loading={idx < 2 ? "eager" : "lazy"}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute bottom-0 left-0 w-full translate-y-8 p-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="mb-2 font-sans text-[10px] font-black uppercase tracking-[0.3em] text-brand-lightBlue">
              {item.location}
            </p>
            <h3 className="font-avenue text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
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
