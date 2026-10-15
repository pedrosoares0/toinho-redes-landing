import { useId, useRef, type CSSProperties } from 'react';
import { useInView } from 'motion/react';

/** Imagens de teste — trocar pelas fotos reais das quadras depois. */
const IMAGES = [
  'https://i.pinimg.com/736x/84/ea/eb/84eaeb559c2fcde8ff9c6cf4b704ab08.jpg',
  'https://i.pinimg.com/736x/5a/b2/1e/5ab21ea4c3984ebbf6b1b7fa8eee11b8.jpg',
  'https://i.pinimg.com/736x/64/05/15/6405159aeea8b8fb7bc48ea7c34fd591.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBB-1eNzNMpzF9FF-U9J8dKHlyEfQhTUKl-PR3VSSjr4X5PzUvXAYeMk&s=10',
  'https://i.pinimg.com/736x/e7/2b/98/e72b98b6322ee37cb009bf1c763c043d.jpg',
  'https://i.pinimg.com/1200x/d8/8a/97/d88a97dbb18e57958f4a495426057d00.jpg',
];

/** Proporções alternadas para o efeito "masonry" (alturas desencontradas entre colunas). */
const RATIOS = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-[2/3]', 'aspect-square', 'aspect-[3/5]'];

const COLUMN_COUNT = 7;
const IMAGES_PER_COLUMN = 5;

const COLUMNS = Array.from({ length: COLUMN_COUNT }, (_, c) => ({
  images: Array.from({ length: IMAGES_PER_COLUMN }, (_, i) => ({
    src: IMAGES[(c * 2 + i) % IMAGES.length],
    ratio: RATIOS[(c + i * 2) % RATIOS.length],
  })),
  duration: 46 + (c % 3) * 9, // velocidades levemente diferentes
  delay: -(c * 6.5), // começa cada coluna num ponto diferente do loop
  reverse: c % 2 === 1, // colunas alternam subindo / descendo
}));

/**
 * Visibilidade por breakpoint: o grid rotacionado é 20% mais largo que a tela,
 * então 4 / 5 / 7 colunas renderizadas ≈ 3 / 4 / 6 colunas visíveis.
 */
function columnVisibility(index: number) {
  if (index >= 5) return 'hidden lg:block';
  if (index >= 4) return 'hidden md:block';
  return 'block';
}

/** Borda superior recortada em ondinhas contínuas (scalloped edge). */
function ScallopEdge() {
  const patternId = `scallop-${useId().replace(/:/g, '')}`;
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-20 h-[12px] w-full text-white dark:text-brand-darkBlue pointer-events-none [filter:drop-shadow(0_3px_4px_rgba(2,8,31,0.18))]"
    >
      <defs>
        <pattern id={patternId} width="24" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 0H24V3C19 3 17 10 12 10C7 10 5 3 0 3Z" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill={`url(#${patternId})`} />
    </svg>
  );
}

export default function WaveGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  // Pausa as animações fora da viewport (economia de GPU/bateria)
  const isInView = useInView(sectionRef, { amount: 0 });

  return (
    <section
      ref={sectionRef}
      id="galeria"
      aria-label="Galeria de quadras com redes Toinho"
      data-paused={!isInView}
      className="wave-gallery relative w-full h-[70vh] min-h-[480px] md:h-[85vh] md:max-h-[920px] overflow-hidden bg-brand-blue"
    >
      <ScallopEdge />

      {/* Grid levemente inclinado e maior que a tela para cobrir os cantos após a rotação */}
      <div className="absolute -inset-x-[10%] -inset-y-[25%] rotate-[-4deg] grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
        {COLUMNS.map((column, c) => (
          <div key={c} className={`wave-gallery-col relative overflow-hidden ${columnVisibility(c)}`}>
            <div
              className="wave-gallery-track flex flex-col"
              data-reverse={column.reverse}
              style={
                {
                  '--wg-duration': `${column.duration}s`,
                  '--wg-delay': `${column.delay}s`,
                } as CSSProperties
              }
            >
              {/* Conteúdo duplicado = loop infinito sem emenda (translateY 0 → -50%) */}
              {[0, 1].map((copy) =>
                column.images.map((img, i) => (
                  <figure
                    key={`${copy}-${i}`}
                    aria-hidden={copy === 1}
                    className={`group relative w-full ${img.ratio} overflow-hidden m-0`}
                  >
                    <img
                      src={img.src}
                      alt={copy === 0 ? 'Quadra equipada com rede Toinho Redes' : ''}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-brand-darkBlue/0 transition-colors duration-500 group-hover:bg-brand-darkBlue/10" />
                  </figure>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Leve vinheta inferior para assentar a transição com a próxima seção */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-brand-darkBlue/25 to-transparent" />
    </section>
  );
}
