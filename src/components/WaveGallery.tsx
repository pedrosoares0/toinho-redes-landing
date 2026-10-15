import { useId, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';

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
const IMAGES_PER_COLUMN = 8;

/**
 * Cada coluna se desloca verticalmente conforme o scroll (parallax).
 * `travel` = quanto (em % da altura da própria coluna) ela percorre durante toda a passagem
 * da seção pela tela — valores baixos deixam o movimento lento e suave.
 */
const COLUMNS = Array.from({ length: COLUMN_COUNT }, (_, c) => ({
  images: Array.from({ length: IMAGES_PER_COLUMN }, (_, i) => ({
    src: IMAGES[(c * 2 + i) % IMAGES.length],
    ratio: RATIOS[(c + i * 2) % RATIOS.length],
  })),
  travel: [12, 17, 14, 19, 13, 16, 15][c],
  reverse: c % 2 === 1, // colunas alternam: umas sobem, outras descem
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

/**
 * Borda superior recortada em ondinhas contínuas (scalloped edge).
 * A "sombra" é uma segunda onda translúcida desenhada no próprio pattern —
 * sem CSS filter, que forçaria repaint sobre as colunas em movimento.
 */
function ScallopEdge() {
  const patternId = `scallop-${useId().replace(/:/g, '')}`;
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-20 h-[14px] w-full text-white dark:text-brand-darkBlue pointer-events-none"
    >
      <defs>
        <pattern id={patternId} width="24" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 0H24V5C19 5 17 12 12 12C7 12 5 5 0 5Z" fill="#02081F" fillOpacity="0.12" />
          <path d="M0 0H24V3C19 3 17 10 12 10C7 10 5 3 0 3Z" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="14" fill={`url(#${patternId})`} />
    </svg>
  );
}

function GalleryColumn({
  column,
  index,
  progress,
}: {
  column: (typeof COLUMNS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // Sobe: 0% → -travel% | Desce: -travel% → 0% (nunca abre buraco no topo da coluna)
  const y = useTransform(
    progress,
    [0, 1],
    column.reverse ? [`-${column.travel}%`, '0%'] : ['0%', `-${column.travel}%`]
  );

  return (
    <div className={`relative overflow-hidden ${columnVisibility(index)}`}>
      <motion.div className="flex flex-col will-change-transform" style={{ y }}>
        {column.images.map((img, i) => (
          <figure key={i} className={`relative w-full ${img.ratio} overflow-hidden m-0`}>
            <img
              src={img.src}
              alt="Quadra equipada com rede Toinho Redes"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
        ))}
      </motion.div>
    </div>
  );
}

export default function WaveGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Progresso de 0 → 1 enquanto a seção atravessa a viewport (entra por baixo, sai por cima)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Mola leve por cima do scroll: movimento sedoso e com leve inércia, sem "degraus"
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const progress = reduceMotion ? scrollYProgress : smoothProgress;

  return (
    <section
      ref={sectionRef}
      id="galeria"
      aria-label="Galeria de quadras com redes Toinho"
      className="relative w-full h-[85vh] min-h-[560px] md:h-[105vh] md:min-h-[720px] md:max-h-[1150px] overflow-hidden bg-brand-blue"
    >
      <ScallopEdge />

      {/* Grid levemente inclinado e maior que a tela para cobrir os cantos após a rotação */}
      <div className="absolute -inset-x-[10%] -inset-y-[8%] rotate-[-4deg] grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
        {COLUMNS.map((column, c) => (
          <GalleryColumn key={c} column={column} index={c} progress={progress} />
        ))}
      </div>

      {/* Leve vinheta inferior para assentar a transição com a próxima seção */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-brand-darkBlue/25 to-transparent" />
    </section>
  );
}
